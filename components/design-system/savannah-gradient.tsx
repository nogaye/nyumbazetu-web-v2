"use client";

/**
 * Savannah gradient component. Warm African sunset gradient for auth and empty states;
 * used as a full-bleed layer to add subtle Kenyan identity without affecting readability.
 */

/**
 * Warm gradient inspired by African savannah/sunset (#f5e6c8 → #ffffff).
 * Used on auth pages and empty states to add a subtle Kenyan identity without
 * affecting readability or premium SaaS feel.
 */

import * as React from "react";
import { cn } from "@/lib/utils";

export interface SavannahGradientProps {
  /** Child content. */
  children?: React.ReactNode;
  /** Optional class for the wrapper. */
  className?: string;
  /** Direction: 'to-b' (top to bottom), 'to-r', 'to-br'. Default 'to-b'. */
  direction?: "to-b" | "to-r" | "to-br";
  /** Use dark-mode variant (deeper tones). Default false. */
  dark?: boolean;
}

const LIGHT_STOPS = "#e8ddc4 0%, #f0e8d8 40%, #f8f4ed 75%, #ffffff 100%";
const DARK_STOPS = "#2d2618 0%, #1f1a12 50%, #0f172a 100%";
const DIR_MAP = {
  "to-b": "to bottom",
  "to-r": "to right",
  "to-br": "to bottom right",
} as const;

/**
 * Full-bleed gradient layer or wrapper. Use as auth form area background
 * or behind cards on empty states.
 */
export function SavannahGradient({
  children,
  className,
  direction = "to-b",
  dark = false,
}: SavannahGradientProps) {
  const stops = dark ? DARK_STOPS : LIGHT_STOPS;
  const background = `linear-gradient(${DIR_MAP[direction]}, ${stops})`;

  return (
    <div className={cn(className)} style={{ background }}>
      {children}
    </div>
  );
}
