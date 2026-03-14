import { cn } from "@/lib/utils";

/**
 * Skeleton for ListingCard: same layout (image + copy block) for loading states.
 */
export function ListingCardSkeleton() {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200/80",
        "dark:bg-slate-900/50 dark:ring-slate-700/80"
      )}
    >
      <div className="aspect-[4/3] w-full bg-slate-200 dark:bg-slate-800">
        <div className="h-full w-full animate-pulse bg-slate-300/80 dark:bg-slate-700/80" />
      </div>
      <div className="space-y-2 p-3.5">
        <div className="h-4 w-3/4 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
        <div className="h-3 w-1/3 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
        <div className="mt-2 h-5 w-20 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
      </div>
    </div>
  );
}
