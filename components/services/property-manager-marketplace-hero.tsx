/**
 * Premium hero for the property manager marketplace route.
 *
 * Presents the primary value proposition, dual CTAs (find vs list), and derived trust
 * stats from mock data. Rendered on the server inside `/services/property-managers`.
 */

import Link from "next/link";
import { Button } from "@/components/ui/button";

/** Numeric trust metrics shown beside the hero copy. */
export interface PropertyManagerMarketplaceHeroProps {
  /** Count of manager profiles in the mock catalogue. */
  managerCount: number;
  /** Sum of `propertiesManaged` across mock records (portfolio scale signal). */
  propertiesManaged: number;
  /** Mean star rating rounded to one decimal. */
  avgRating: number;
  /** Distinct city/corridor count derived from service areas. */
  citiesCovered: number;
}

/**
 * Renders headline, supporting text, CTAs, and a compact stats row.
 * @param props - Aggregated stats from `aggregateMarketplaceStats`.
 */
export function PropertyManagerMarketplaceHero({
  managerCount,
  propertiesManaged,
  avgRating,
  citiesCovered,
}: PropertyManagerMarketplaceHeroProps) {
  return (
    <header className="relative overflow-hidden border-b border-slate-200/80 bg-gradient-to-b from-slate-50 via-white to-white dark:border-slate-800 dark:from-slate-950 dark:via-slate-950 dark:to-slate-950">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.28] dark:opacity-[0.18]"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(ellipse 75% 55% at 15% 0%, rgb(52 71 103 / 0.18), transparent 55%), radial-gradient(ellipse 60% 45% at 92% 25%, rgb(185 128 54 / 0.14), transparent 50%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          Property manager marketplace
        </p>
        <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold tracking-tight text-secondary dark:text-slate-50 sm:text-5xl">
          Find the right property manager for your property
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">
          Compare verified firms, coverage, pricing models, and response standards — then
          request a consultation without hunting across dozens of sites.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button asChild size="lg" className="min-h-[48px] px-8">
            <Link href="#browse-managers">Find a property manager</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="min-h-[48px] px-8">
            <Link href="/contact">List your property management company</Link>
          </Button>
        </div>
        <dl className="mt-14 grid max-w-3xl grid-cols-2 gap-6 sm:grid-cols-4">
          <div className="rounded-xl border border-slate-200/90 bg-white/80 px-4 py-3 shadow-sm dark:border-slate-700/90 dark:bg-slate-900/50">
            <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Managers
            </dt>
            <dd className="mt-1 font-display text-2xl font-bold tabular-nums text-secondary dark:text-slate-100">
              {managerCount}+
            </dd>
          </div>
          <div className="rounded-xl border border-slate-200/90 bg-white/80 px-4 py-3 shadow-sm dark:border-slate-700/90 dark:bg-slate-900/50">
            <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Properties in network
            </dt>
            <dd className="mt-1 font-display text-2xl font-bold tabular-nums text-secondary dark:text-slate-100">
              {propertiesManaged.toLocaleString()}+
            </dd>
          </div>
          <div className="rounded-xl border border-slate-200/90 bg-white/80 px-4 py-3 shadow-sm dark:border-slate-700/90 dark:bg-slate-900/50">
            <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Avg. rating
            </dt>
            <dd className="mt-1 font-display text-2xl font-bold tabular-nums text-secondary dark:text-slate-100">
              {avgRating.toFixed(1)}
            </dd>
          </div>
          <div className="rounded-xl border border-slate-200/90 bg-white/80 px-4 py-3 shadow-sm dark:border-slate-700/90 dark:bg-slate-900/50">
            <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Cities & corridors
            </dt>
            <dd className="mt-1 font-display text-2xl font-bold tabular-nums text-secondary dark:text-slate-100">
              {citiesCovered}
            </dd>
          </div>
        </dl>
      </div>
    </header>
  );
}
