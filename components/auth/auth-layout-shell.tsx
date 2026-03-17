"use client";

/**
 * Auth layout shell: split-screen on desktop (branding left, form right), single column on mobile.
 * Wraps auth page content with consistent background and optional side panel.
 */

import * as React from "react";
import { AuthSidePanel } from "@/components/auth/auth-side-panel";
import { SavannahGradient } from "@/components/design-system";
import { cn } from "@/lib/utils";

export interface AuthLayoutShellProps {
  children: React.ReactNode;
  /** When true, hide the side panel (e.g. for minimal verify-email). Default false. */
  hideSidePanel?: boolean;
  /** Optional class for the outer container. */
  className?: string;
}

/**
 * Full-viewport auth layout: side panel on md+, centered form on the right (or full width on small screens).
 */
export function AuthLayoutShell({
  children,
  hideSidePanel = false,
  className,
}: AuthLayoutShellProps) {
  return (
    <div
      className={cn(
        "min-h-screen flex flex-col md:flex-row",
        className
      )}
      role="main"
    >
      {!hideSidePanel && (
        <aside
          className="hidden md:flex md:w-[42%] lg:w-[44%] flex-col justify-center p-6 lg:p-10 xl:p-12"
          aria-label="Branding and product information"
        >
          <AuthSidePanel showBackToHome />
        </aside>
      )}
      <SavannahGradient
        direction="to-b"
        dark={false}
        className={cn(
          "relative flex min-h-screen flex-1",
          !hideSidePanel && "md:pl-8 lg:pl-12"
        )}
      >
        {/**
         * Full-bleed inner column so routes (e.g. sign-in) can use absolute inset-0
         * overlays that cover the whole gradient, not just the form’s box.
         */}
        <div className="flex min-h-screen w-full min-w-0 flex-1 flex-col items-center justify-center p-4 sm:p-6">
          {children}
        </div>
      </SavannahGradient>
    </div>
  );
}
