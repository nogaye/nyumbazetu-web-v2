"use client";

/**
 * Cookie consent banner: CSS-only visibility (no Framer Motion) to keep JS small for PSI.
 * Fixed bottom bar; respects reduced motion via standard transitions.
 */

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const COOKIE_CONSENT_KEY = "nyumbazetu-cookie-consent";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = typeof window !== "undefined" ? localStorage.getItem(COOKIE_CONSENT_KEY) : null;
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "declined");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white shadow-lg transition-transform duration-300 ease-out dark:border-slate-800 dark:bg-slate-900 motion-reduce:transition-none"
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-desc"
    >
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex-1">
            <p id="cookie-consent-title" className="sr-only">
              Cookie consent
            </p>
            <p id="cookie-consent-desc" className="text-sm text-slate-700 dark:text-slate-300">
              We use cookies to enhance your browsing experience, analyze site traffic, and personalize
              content. By clicking &quot;Accept All&quot;, you consent to our use of cookies.{" "}
              <a href="/privacy" className="font-medium text-primary hover:underline">
                Learn more
              </a>
            </p>
          </div>
          <div className="flex w-full shrink-0 flex-wrap items-center gap-3 sm:w-auto">
            <Button variant="outline" size="sm" onClick={handleDecline} className="min-w-[100px]">
              Decline
            </Button>
            <Button size="sm" onClick={handleAccept} className="min-w-[100px]">
              Accept All
            </Button>
            <button
              type="button"
              onClick={handleDecline}
              className="rounded-md p-2 text-slate-600 transition-colors hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:text-slate-400 dark:hover:text-slate-200"
              aria-label="Dismiss cookie consent"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
