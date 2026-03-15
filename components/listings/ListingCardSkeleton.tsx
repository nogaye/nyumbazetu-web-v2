/**
 * Skeleton for ListingCard: matches premium card layout (image, badges area, title, meta, price)
 * to minimize layout shift and provide consistent loading experience.
 */

import { cn } from "@/lib/utils";

export function ListingCardSkeleton() {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/80",
        "dark:bg-slate-900/60 dark:ring-slate-700/80"
      )}
    >
      <div className="aspect-[4/3] w-full bg-slate-200 dark:bg-slate-800">
        <div className="h-full w-full animate-pulse bg-slate-300/80 dark:bg-slate-700/80" />
      </div>
      <div className="space-y-3 p-4">
        <div className="h-3 w-1/3 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
        <div className="h-4 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
        <div className="h-4 w-3/4 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
        <div className="h-3 w-1/3 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
        <div className="flex justify-between gap-2 pt-1">
          <div className="h-6 w-24 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
          <div className="h-4 w-20 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
        </div>
      </div>
    </div>
  );
}
