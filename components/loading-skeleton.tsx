export function LoadingSkeleton() {
  return (
    <div className="animate-pulse space-y-8">
      {/* Header skeleton */}
      <div className="space-y-4">
        <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded w-3/4 mx-auto"></div>
        <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-1/2 mx-auto"></div>
      </div>

      {/* Content skeleton */}
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="space-y-3">
          <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded w-1/3"></div>
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded"></div>
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-5/6"></div>
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-4/6"></div>
        </div>
        <div className="space-y-3">
          <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded w-1/3"></div>
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded"></div>
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-5/6"></div>
        </div>
      </div>

      {/* Cards skeleton */}
      <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {[1, 2].map((i) => (
          <div key={i} className="h-32 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
        ))}
      </div>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-48 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
    </div>
  );
}

export function FeatureCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-6 w-6 bg-slate-200 dark:bg-slate-800 rounded mb-4"></div>
      <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full mb-1"></div>
      <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-5/6"></div>
    </div>
  );
}

