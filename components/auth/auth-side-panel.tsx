"use client";

/**
 * Auth side panel for split-screen layout: branding, trust copy, and optional illustration.
 * Shown on the left (or top on small screens) to create a premium, trustworthy auth experience.
 */

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { AfricanPatternBackground } from "@/components/design-system";

export interface AuthSidePanelProps {
  /** Optional headline (e.g. "Welcome back"). */
  headline?: string;
  /** Short supporting copy or benefits. */
  description?: string;
  /** Optional list of trust/benefit bullets. */
  bullets?: string[];
  /** Optional class for the panel container. */
  className?: string;
  /** Whether to show "Back to home" link. */
  showBackToHome?: boolean;
}

/**
 * Branding/trust panel for auth split-screen. Visible on md+; can be hidden on small screens.
 */
export function AuthSidePanel({
  headline = "Nyumba Zetu",
  description = "Property management infrastructure for modern Kenyan real estate.",
  bullets = [
    "Manage properties, tenants, and rent in one place",
    "Secure sign-in with email or Google",
    "Your data is protected and private",
  ],
  className,
  showBackToHome = true,
}: AuthSidePanelProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col justify-between rounded-2xl bg-slate-900/95 p-8 text-white dark:bg-slate-950/95 md:p-10 lg:p-12 overflow-hidden",
        "bg-gradient-to-br from-slate-800 to-slate-900 dark:from-slate-900 dark:to-slate-950",
        className
      )}
      aria-label="Branding and product information"
    >
      <AfricanPatternBackground
        className="absolute inset-0 rounded-2xl"
        variant="diamond"
        opacity={0.14}
        dark
      />
      <div className="relative z-10 space-y-6">
        {showBackToHome && (
          <Link
            href="/"
            className="text-sm font-medium text-slate-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 rounded"
          >
            ← Back to home
          </Link>
        )}
        <div>
          <h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
            {headline}
          </h2>
          {description && (
            <p className="mt-2 text-sm text-slate-300 max-w-sm">
              {description}
            </p>
          )}
        </div>
        {bullets && bullets.length > 0 && (
          <ul className="space-y-3 text-sm text-slate-300">
            {bullets.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <p className="relative z-10 mt-8 text-xs text-slate-500">
        Secure sign-in. We never share your data.
      </p>
    </div>
  );
}
