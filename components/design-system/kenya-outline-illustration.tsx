"use client";

/**
 * Kenya outline illustration component for empty states and landing context.
 * Part of the African identity design system; stylized silhouette (not geographically
 * precise) to suggest location without cliché. Thin line, single color; use at low opacity.
 */

import * as React from "react";
import { cn } from "@/lib/utils";

export interface KenyaOutlineIllustrationProps {
  /** Optional class for the wrapper. */
  className?: string;
  /** Width in pixels or Tailwind class (e.g. w-32). Default 120. */
  width?: number | string;
  /** Stroke color. Default currentColor. */
  stroke?: string;
  /** Stroke width. Default 0.75. */
  strokeWidth?: number;
  /** Opacity of the shape. Default 0.4 for empty states. */
  opacity?: number;
}

/**
 * Simplified Kenya outline (stylized). Use in empty states, illustrations,
 * or as a subtle landmark on landing sections.
 */
export function KenyaOutlineIllustration({
  className,
  width = 120,
  stroke = "currentColor",
  strokeWidth = 0.75,
  opacity = 0.4,
}: KenyaOutlineIllustrationProps) {
  const w = typeof width === "number" ? width : 120;

  // Stylized Kenya-like outline: simplified polygon suggesting the shape.
  const pathD =
    "M60 8 L75 25 L82 45 L78 65 L70 82 L55 92 L42 88 L30 75 L22 55 L18 35 L25 18 Z";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
      className={cn("shrink-0", className)}
      style={{
        width: typeof width === "number" ? `${width}px` : undefined,
        opacity,
      }}
      aria-hidden
    >
      <path d={pathD} />
    </svg>
  );
}
