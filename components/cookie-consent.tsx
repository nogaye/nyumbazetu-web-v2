"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";

const COOKIE_CONSENT_KEY = "nyumbazetu-cookie-consent";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      // Show banner after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
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

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shadow-lg"
        >
          <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex-1">
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. By clicking "Accept All", you consent to our use of cookies.{" "}
                  <a
                    href="/privacy"
                    className="text-primary hover:underline font-medium"
                  >
                    Learn more
                  </a>
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDecline}
                  className="min-w-[100px]"
                >
                  Decline
                </Button>
                <Button
                  size="sm"
                  onClick={handleAccept}
                  className="min-w-[100px]"
                >
                  Accept All
                </Button>
                <button
                  onClick={handleDecline}
                  className="p-2 text-slate-600 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
                  aria-label="Close cookie consent"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

