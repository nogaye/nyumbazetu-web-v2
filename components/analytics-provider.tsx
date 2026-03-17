"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { analytics } from "@/lib/analytics";

/**
 * Analytics Provider Component
 * 
 * This component initializes analytics scripts and tracks page views.
 * Add your analytics measurement IDs to environment variables:
 * - NEXT_PUBLIC_GA_MEASUREMENT_ID for Google Analytics
 * - NEXT_PUBLIC_PLAUSIBLE_DOMAIN for Plausible Analytics
 */
export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    // Track page view on route change
    analytics.trackPageView(pathname, document.title);
  }, [pathname]);

  /**
   * Defers GA/Plausible until the browser is idle (or after timeout) so first interaction
   * and paint are not delayed by analytics network and parse work.
   */
  useEffect(() => {
    const loadAnalytics = () => {
      const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
      if (gaId && typeof window !== "undefined") {
        const script1 = document.createElement("script");
        script1.async = true;
        script1.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
        document.head.appendChild(script1);

        const script2 = document.createElement("script");
        script2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${gaId}', {
          page_path: window.location.pathname,
        });
      `;
        document.head.appendChild(script2);
      }

      const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
      if (plausibleDomain && typeof window !== "undefined") {
        const script = document.createElement("script");
        script.defer = true;
        script.setAttribute("data-domain", plausibleDomain);
        script.src = "https://plausible.io/js/script.js";
        document.head.appendChild(script);
      }
    };

    if (typeof window === "undefined") return;
    let idleHandle: number | undefined;
    /** Browser setTimeout returns number; Node types use Timeout — use number for DOM. */
    let timeoutHandle: number | undefined;
    if (typeof window.requestIdleCallback === "function") {
      idleHandle = window.requestIdleCallback(loadAnalytics, { timeout: 6000 });
    } else {
      timeoutHandle = window.setTimeout(loadAnalytics, 3500) as number;
    }
    return () => {
      if (idleHandle != null && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleHandle);
      }
      if (timeoutHandle != null) clearTimeout(timeoutHandle);
    };
  }, []);

  return <>{children}</>;
}

