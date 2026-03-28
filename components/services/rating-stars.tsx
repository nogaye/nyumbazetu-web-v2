/**
 * Accessible star rating display for vendor cards and review rows.
 * Renders full/half/empty stars from a 0–5 numeric rating (read-only).
 */

import { StarIcon } from "@heroicons/react/24/solid";
import { cn } from "@/lib/utils";

export interface RatingStarsProps {
  /** Average or per-review rating; clamped visually to 0–5. */
  rating: number;
  /** Optional CSS class on the wrapping row. */
  className?: string;
  /** Icon pixel size (Tailwind h/w). */
  size?: "sm" | "md";
  /** When set, shown after stars for screen readers and sighted users. */
  reviewCount?: number;
}

/**
 * Displays up to five stars with half-star support using two overlapped icons per position.
 * @param props - Rating, size, optional count and className.
 */
export function RatingStars({
  rating,
  className,
  size = "sm",
  reviewCount,
}: RatingStarsProps) {
  const clamped = Math.min(5, Math.max(0, rating));
  const starClass = size === "md" ? "h-5 w-5" : "h-4 w-4";
  const boxClass = size === "md" ? "h-5 w-5" : "h-4 w-4";

  return (
    <div
      className={cn("flex flex-wrap items-center gap-1", className)}
      role="img"
      aria-label={
        reviewCount != null
          ? `Rated ${clamped} out of 5 stars, ${reviewCount} reviews`
          : `Rated ${clamped} out of 5 stars`
      }
    >
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.min(1, Math.max(0, clamped - i));
        return (
          <span key={i} className={cn("relative inline-flex shrink-0", boxClass)} aria-hidden>
            <StarIcon
              className={cn(starClass, "absolute text-slate-200 dark:text-slate-600")}
            />
            {fill > 0 && (
              <span
                className="absolute overflow-hidden text-primary"
                style={{ width: `${fill * 100}%` }}
              >
                <StarIcon className={starClass} />
              </span>
            )}
          </span>
        );
      })}
      {reviewCount != null && (
        <span className="ml-1 text-sm text-muted-foreground tabular-nums">
          ({reviewCount})
        </span>
      )}
    </div>
  );
}
