"use client";

/**
 * African pattern background component. Light Maasai/Kente-inspired SVG patterns
 * for hero, auth, and empty states. Keeps opacity very low for premium SaaS feel.
 */

/**
 * African-inspired geometric pattern background for hero, auth, and empty states.
 * Uses a light Maasai/Kente-inspired grid at 3–5% opacity so the product stays
 * minimal and premium. Implemented as inline SVG for performance.
 */

import * as React from "react";
import { cn } from "@/lib/utils";

export interface AfricanPatternBackgroundProps {
  /** Optional class for the wrapper (e.g. absolute inset-0). */
  className?: string;
  /** Opacity of the pattern layer. 0.1–0.18 is visible but subtle. Default 0.12. */
  opacity?: number;
  /** Pattern variant: grid (Kente-like), diamond (Maasai beadwork-inspired), or stripes. */
  variant?: "grid" | "diamond" | "stripes";
  /** Whether the pattern is for dark background (uses white strokes). Default false. */
  dark?: boolean;
}

/** Inline SVG pattern: small grid of diamonds for Kente/Maasai-inspired rhythm. */
const PATTERN_ID = "african-pattern-bg";

/**
 * Renders a full-bleed, non-interactive pattern layer. Place behind content.
 * Use in hero sections, auth panels, and empty state cards.
 */
export function AfricanPatternBackground({
  className,
  opacity = 0.12,
  variant = "grid",
  dark = false,
}: AfricanPatternBackgroundProps) {
  const stroke = dark ? "rgba(255,255,255,0.28)" : "rgba(0,0,0,0.18)";

  return (
    <div
      className={cn("pointer-events-none select-none", className)}
      aria-hidden
    >
      <svg
        className="h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        style={{ opacity }}
      >
        <defs>
          {variant === "grid" && (
            <pattern
              id={PATTERN_ID}
              width="24"
              height="24"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M0 12h24M12 0v24"
                fill="none"
                stroke={stroke}
                strokeWidth="0.6"
              />
              <circle cx="12" cy="12" r="1" fill={stroke} fillOpacity="0.6" />
            </pattern>
          )}
          {variant === "diamond" && (
            <pattern
              id={PATTERN_ID}
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M10 0L20 10L10 20L0 10Z"
                fill="none"
                stroke={stroke}
                strokeWidth="0.5"
              />
            </pattern>
          )}
          {variant === "stripes" && (
            <pattern
              id={PATTERN_ID}
              width="16"
              height="16"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M0 8L16 8"
                fill="none"
                stroke={stroke}
                strokeWidth="0.6"
              />
              <path
                d="M4 0L4 16M12 0L12 16"
                fill="none"
                stroke={stroke}
                strokeWidth="0.45"
              />
            </pattern>
          )}
        </defs>
        <rect width="100%" height="100%" fill={`url(#${PATTERN_ID})`} />
      </svg>
    </div>
  );
}
