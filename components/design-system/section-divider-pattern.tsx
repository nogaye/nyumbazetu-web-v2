"use client";

/**
 * Section divider pattern component. Geometric divider between sections with
 * optional angled edge for rhythm; used between hero and content blocks.
 */

/**
 * Section divider with a subtle African-inspired geometric pattern.
 * Used between hero and content, or between feature sections, to add rhythm
 * without loud decoration. Keeps the UI minimal and premium.
 */

import * as React from "react";
import { cn } from "@/lib/utils";

export interface SectionDividerPatternProps {
  /** Optional class for the wrapper. */
  className?: string;
  /** Height in pixels. Default 64. */
  height?: number;
  /** Fill color (e.g. next section background). Default slate-50. */
  fillClass?: string;
  /** Whether to use a soft angled edge (triangle/diamond rhythm). Default true. */
  angled?: boolean;
}

/**
 * Renders a horizontal strip with a very light geometric pattern and optional
 * angled bottom edge for visual rhythm between sections.
 */
export function SectionDividerPattern({
  className,
  height = 64,
  fillClass = "text-slate-50 dark:text-slate-900",
  angled = true,
}: SectionDividerPatternProps) {
  return (
    <div
      className={cn("relative w-full overflow-hidden", fillClass, className)}
      style={{ height }}
      aria-hidden
    >
      {/* Soft angled bottom — triangular rhythm */}
      {angled && (
        <svg
          className="absolute bottom-0 left-0 w-full"
          viewBox="0 0 1200 80"
          preserveAspectRatio="none"
          fill="currentColor"
        >
          <path
            opacity={0.15}
            d="M0,40 L200,20 L400,40 L600,15 L800,40 L1000,25 L1200,40 L1200,80 L0,80 Z"
          />
          <path d="M0,50 Q300,0 600,50 T1200,50 L1200,80 L0,80 Z" />
        </svg>
      )}
      {/* Faint horizontal lines for rhythm */}
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        style={{ opacity: 0.03 }}
      >
        <defs>
          <pattern
            id="divider-lines"
            width="24"
            height="8"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M0 4h24"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#divider-lines)" />
      </svg>
    </div>
  );
}
