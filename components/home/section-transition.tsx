"use client";

/**
 * Visual transition between the hero and the next section on the homepage.
 * Renders a gradient from the hero background (white) to the following section (slate-50)
 * and an optional wave divider so the two blocks feel connected rather than separated by empty space.
 * Used between HeroSingleV2 and LegacyTransactions.
 */

import { cn } from "@/lib/utils";
import { AfricanPatternBackground } from "@/components/design-system";

interface SectionTransitionProps {
  /** Extra class names for the wrapper. */
  className?: string;
  /** Height of the transition strip in pixels; default 80. */
  height?: number;
  /** Whether to show the wave divider; default true. */
  showWave?: boolean;
  /** Optional id for scroll targets (e.g. hero "See how it works" link). */
  id?: string;
}

/**
 * Gradient + wave strip that bridges the hero (white) and the next section (slate-50).
 * Reduces the visual shock of a hard break and guides the eye downward.
 */
export function SectionTransition({
  className,
  height = 100,
  showWave = true,
  id,
}: SectionTransitionProps) {
  return (
    <div
      id={id}
      className={cn("relative w-full overflow-hidden", className)}
      style={{ height }}
      aria-hidden={!id}
    >
      {/* Gradient from hero (slate-950) to next section (light or dark content) */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900/80"
        style={{ height }}
      />
      <AfricanPatternBackground
        className="absolute inset-0"
        variant="stripes"
        opacity={0.12}
        dark
      />
      {/* Wave divider; fill matches next section background */}
      {showWave && (
        <svg
          className="absolute bottom-0 left-0 w-full h-12 text-slate-50 dark:text-slate-900"
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
