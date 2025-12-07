import { cn } from "@/lib/utils";

export function ListingCardSkeleton() {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-slate-100 bg-white",
        "dark:border-slate-800 dark:bg-slate-900"
      )}
    >
      {/* Image Skeleton */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-200 dark:bg-slate-800">
        <div className="h-full w-full animate-pulse bg-slate-300 dark:bg-slate-700" />
      </div>

      {/* Text Section Skeleton */}
      <div className="p-4">
        {/* Title and Price */}
        <div className="mb-2 flex items-start justify-between gap-2">
          <div className="h-5 flex-1 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
          <div className="h-5 w-20 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
        </div>

        {/* Meta */}
        <div className="mb-2 flex items-center gap-2">
          <div className="h-4 w-16 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
          <div className="h-4 w-16 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
          <div className="h-4 w-16 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
        </div>

        {/* Location */}
        <div className="h-3 w-32 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
      </div>
    </div>
  );
}

