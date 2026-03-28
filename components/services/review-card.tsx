/**
 * Compact review block for vendor profile pages and property manager profiles (mock reviews).
 */

import type { VendorReview } from "@/lib/services/vendors-mock";
import { RatingStars } from "@/components/services/rating-stars";

/** Shared display fields for any review row shown in a card. */
export type ReviewCardData = Pick<VendorReview, "author" | "rating" | "comment" | "date">;

export interface ReviewCardProps {
  /** Review payload from mock data or future API. */
  review: ReviewCardData;
}

/**
 * Renders author, stars, date, and comment in a bordered card.
 * @param props - Single review object.
 */
export function ReviewCard({ review }: ReviewCardProps) {
  const formatted = new Intl.DateTimeFormat("en-KE", {
    dateStyle: "medium",
  }).format(new Date(review.date));

  return (
    <article className="rounded-2xl border border-slate-200/90 bg-card p-5 shadow-sm transition-shadow hover:shadow-md dark:border-slate-700/90 dark:bg-slate-900/40">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="font-semibold text-foreground">{review.author}</p>
        <time className="text-xs text-muted-foreground" dateTime={review.date}>
          {formatted}
        </time>
      </div>
      <div className="mt-2">
        <RatingStars rating={review.rating} size="sm" />
      </div>
      <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        {review.comment}
      </p>
    </article>
  );
}
