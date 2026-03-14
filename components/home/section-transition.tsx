"use client";

/**
 * Visual transition between the hero and the next section on the homepage.
 * Renders a gradient from the hero background (white) to the following section (slate-50)
 * and an optional wave divider so the two blocks feel connected rather than separated by empty space.
 * Used between HeroSingleV2 and LegacyTransactions.
 */

import { cn } from "@/lib/utils";

interface SectionTransitionProps {
  /** Extra class names for the wrapper. */
  className?: string;
  /** Height of the transition strip in pixels; default 80. */
  height?: number;
  /** Whether to show the wave divider; default true. */
  showWave?: boolean;
}

/**
 * Gradient + wave strip that bridges the hero (white) and the next section (slate-50).
 * Reduces the visual shock of a hard break and guides the eye downward.
 */
export function SectionTransition({
  className,
  height = 80,
  showWave = true,
}: SectionTransitionProps) {
  return (
    <div
      className={cn("relative w-full overflow-hidden", className)}
      style={{ height }}
      aria-hidden
    >
      {/* Gradient from hero white to section slate-50 */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/80 to-slate-50 dark:from-slate-950 dark:via-slate-900/80 dark:to-slate-900/50"
        style={{ height }}
      />
      {/* Soft wave for a clear but gentle section boundary; fill matches next section bg */}
      {showWave && (
        <svg
          className="absolute bottom-0 left-0 w-full h-10 text-slate-50 dark:text-slate-900"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          fill="currentColor"
          aria-hidden
        >
          <path d="M0,64 C300,120 900,0 1200,64 L1200,120 L0,120 Z" />
        </svg>
      )}
    </div>
  );
}
