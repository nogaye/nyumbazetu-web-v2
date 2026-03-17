/**
 * Subtle blueprint-style grid overlay (light teal lines on warm off-white) used for
 * marketplace/SEO surfaces—mirrors common Zillow-style “technical trust” aesthetics.
 * Compose behind hero copy or cards via absolute positioning; does not capture pointer events.
 */

import { cn } from "@/lib/utils";

export interface SeoBlueprintGridProps {
  /** Positioning wrapper classes; typically `absolute inset-0` inside a `relative` parent. */
  className?: string;
  /** Grid line spacing in pixels; default 24 matches the listings marketplace SEO block. */
  cellSizePx?: number;
  /** Line opacity; slightly higher in dark mode for visibility on slate backgrounds. */
  lineOpacity?: number;
  /** When true, uses a cooler teal tuned for dark backgrounds. */
  darkMode?: boolean;
}

/**
 * Renders a repeating CSS grid of thin lines for a blueprint/technical backdrop.
 *
 * @param props - `className`, optional `cellSizePx`, `lineOpacity`, and `darkMode`.
 * @returns A decorative `div` (aria-hidden) suitable as the bottom layer of a section.
 */
export function SeoBlueprintGrid({
  className,
  cellSizePx = 24,
  lineOpacity,
  darkMode = false,
}: SeoBlueprintGridProps) {
  const opacity = lineOpacity ?? (darkMode ? 0.12 : 0.09);
  const color = darkMode ? "rgb(45 212 191)" : "rgb(13 148 136)";

  return (
    <div
      className={cn("pointer-events-none", className)}
      style={{
        backgroundImage: `linear-gradient(to right, ${color} 1px, transparent 1px),
          linear-gradient(to bottom, ${color} 1px, transparent 1px)`,
        backgroundSize: `${cellSizePx}px ${cellSizePx}px`,
        opacity,
      }}
      aria-hidden
    />
  );
}
