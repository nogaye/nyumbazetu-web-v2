"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Intercom Messenger provider for the Nyumba Zetu marketing site.
 * Loads the Intercom widget script and boots the messenger when NEXT_PUBLIC_INTERCOM_APP_ID is set.
 * Updates Intercom on route change so the messenger reflects the current page.
 * Renders nothing; script and side effects only.
 */

/** App ID from Intercom workspace settings (Settings → Installation). */
const INTERCOM_APP_ID = process.env.NEXT_PUBLIC_INTERCOM_APP_ID;

/** Extend Window for Intercom global. */
declare global {
  interface Window {
    Intercom?: (action: string, options?: Record<string, unknown>) => void;
    intercomSettings?: Record<string, unknown>;
  }
}

/**
 * Client component that loads and initializes the Intercom messenger.
 * Only loads when NEXT_PUBLIC_INTERCOM_APP_ID is set. Updates Intercom on pathname change.
 */
export function IntercomProvider() {
  const pathname = usePathname();

  /** Set Intercom settings before the widget script loads so it can boot with our app_id. */
  useEffect(() => {
    if (typeof window !== "undefined" && INTERCOM_APP_ID) {
      window.intercomSettings = { app_id: INTERCOM_APP_ID };
    }
  }, []);

  /** Notify Intercom of route changes so the messenger shows the correct page context. */
  useEffect(() => {
    if (typeof window === "undefined" || !INTERCOM_APP_ID || !window.Intercom) return;
    window.Intercom("update", {
      last_request_at: Math.floor(Date.now() / 1000),
    });
  }, [pathname]);

  if (!INTERCOM_APP_ID) return null;

  return (
    <Script
      id="intercom-script"
      strategy="afterInteractive"
      src={`https://widget.intercom.io/widget/${INTERCOM_APP_ID}`}
    />
  );
}
