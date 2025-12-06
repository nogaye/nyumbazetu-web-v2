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

  useEffect(() => {
    // Initialize Google Analytics if measurement ID is provided
    const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
    if (gaId && typeof window !== "undefined") {
      // Load GA4 script
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

    // Initialize Plausible Analytics if domain is provided
    const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
    if (plausibleDomain && typeof window !== "undefined") {
      const script = document.createElement("script");
      script.defer = true;
      script.setAttribute("data-domain", plausibleDomain);
      script.src = "https://plausible.io/js/script.js";
      document.head.appendChild(script);
    }
  }, []);

  return <>{children}</>;
}

