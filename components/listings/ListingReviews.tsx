/**
 * Listing reviews section: displays guest/tenant reviews and aggregate rating.
 * Used on the listing detail page below description. Data comes from
 * tb_listing_comments where comment_type = 'review'.
 */

import { Star } from "lucide-react";
import type { ListingReviewDisplay } from "@/lib/listings/types";

export type ListingReview = ListingReviewDisplay;

export interface ListingReviewsProps {
  /** Property or listing title (for accessibility). */
  listingTitle: string;
  /** Aggregate rating 0–5 (e.g. average of all reviews). */
  averageRating: number;
  /** Total number of reviews. */
  totalReviews: number;
  /** List of reviews to show (from tb_listing_comments or sample data). */
  reviews: ListingReviewDisplay[];
  className?: string;
}

/**
 * Renders the reviews block: average rating summary and a list of review cards.
 * Uses mock/sample data when no backend is available; replace with fetched reviews.
 */
export function ListingReviews({
  listingTitle,
  averageRating,
  totalReviews,
  reviews,
  className,
}: ListingReviewsProps) {
  const fullStars = Math.floor(averageRating);
  const hasHalf = averageRating % 1 >= 0.5;

  return (
    <section
      className={className}
      aria-labelledby="reviews-heading"
    >
      <h2
        id="reviews-heading"
        className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-3"
      >
        Reviews
      </h2>

      {/* Summary: average rating + count */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="flex items-center gap-1" aria-label={`${averageRating} out of 5 stars`}>
          {[1, 2, 3, 4, 5].map((i) => (
            <Star
              key={i}
              className={`h-5 w-5 ${
                i <= fullStars
                  ? "fill-amber-400 text-amber-400"
                  : i === fullStars + 1 && hasHalf
                    ? "fill-amber-400/60 text-amber-400"
                    : "text-slate-200 dark:text-slate-600"
              }`}
              aria-hidden
            />
          ))}
        </div>
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {averageRating.toFixed(1)} · {totalReviews} {totalReviews === 1 ? "review" : "reviews"}
        </span>
      </div>

      {/* Review list */}
      <ul className="space-y-6" aria-label={`Reviews for ${listingTitle}`}>
        {reviews.map((review, idx) => (
          <li
            key={`${review.author}-${review.date}-${idx}`}
            className="rounded-lg border border-slate-200/80 bg-white p-4 dark:border-slate-700/80 dark:bg-slate-800/50"
          >
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="font-medium text-slate-900 dark:text-slate-50">
                {review.author}
              </span>
              {review.label && (
                <span className="rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-600 dark:bg-slate-700 dark:text-slate-400">
                  {review.label}
                </span>
              )}
              <span className="flex items-center gap-1 text-amber-500" aria-label={`${review.rating} stars`}>
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < review.rating ? "fill-amber-400 text-amber-400" : "text-slate-200 dark:text-slate-600"}`}
                    aria-hidden
                  />
                ))}
              </span>
              <time
                dateTime={review.date}
                className="text-xs text-slate-500 dark:text-slate-400"
              >
                {new Date(review.date).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </time>
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {review.body}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
