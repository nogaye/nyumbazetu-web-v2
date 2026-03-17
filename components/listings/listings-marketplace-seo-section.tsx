/**
 * Marketplace SEO explainer for the listings homepage.
 * Communicates how leading property marketplaces (Zillow, Property24) win organic search
 * via programmatic location + inventory URLs, and how each listing detail page doubles as
 * an indexable landing page. Rendered on /listings to align listers with the product strategy.
 */

import { TrendingUp, MapPin, FileSearch } from "lucide-react";

/** Example SEO URL slugs shown to illustrate the marketplace playbook (not necessarily live routes). */
const EXAMPLE_SEO_PATHS = [
  "/apartments-for-rent-nairobi",
  "/apartments-for-rent-westlands",
  "/apartments-for-rent-kilimani",
  "/apartments-for-rent-ruaka",
] as const;

export interface ListingsMarketplaceSeoSectionProps {
  /** Optional extra classes on the outer article/card wrapper. */
  className?: string;
}

/**
 * Renders the "Marketplace SEO" value block: strategy copy, example URL patterns, and
 * the indexable-per-listing callout.
 *
 * @param props - Optional `className` for layout integration.
 * @returns A static section suitable for use inside `ListingsAnimatedSection`.
 */
export function ListingsMarketplaceSeoSection({ className }: ListingsMarketplaceSeoSectionProps) {
  return (
    <article
      className={`relative overflow-hidden rounded-2xl border border-emerald-200/80 bg-gradient-to-br from-white via-emerald-50/40 to-slate-50/90 p-6 shadow-sm dark:border-emerald-900/40 dark:from-slate-900/80 dark:via-emerald-950/20 dark:to-slate-950/80 sm:p-8 lg:p-10 ${className ?? ""}`}
      aria-labelledby="marketplace-seo-heading"
    >
      {/* Soft grid so the block feels intentional without competing with hero imagery */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035] dark:opacity-[0.06]"
        style={{
          backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
        aria-hidden
      />

      <div className="relative z-10">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200/90 bg-emerald-50/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-800 dark:border-emerald-800/60 dark:bg-emerald-950/50 dark:text-emerald-300">
          <TrendingUp className="h-3.5 w-3.5" aria-hidden />
          Your secret weapon
        </div>

        <h2
          id="marketplace-seo-heading"
          className="font-display text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50 sm:text-3xl"
        >
          Marketplace SEO
        </h2>

        <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-600 dark:text-slate-400">
          <strong className="font-semibold text-slate-800 dark:text-slate-200">
            Zillow and Property24 dominate search
          </strong>{" "}
          because they treat the marketplace as an SEO engine: thousands of location- and intent-based
          pages—plus every individual listing—compete for the queries renters and buyers actually type.
          That same strategy is how Nyumba Zetu scales organic discovery as inventory grows.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-2 lg:gap-10">
          <div>
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
              <MapPin className="h-4 w-4 text-[#36b9a0]" aria-hidden />
              Example indexable hubs
            </div>
            <p className="mb-4 text-sm text-slate-600 dark:text-slate-400">
              High-intent URLs mirror how people search—city and neighbourhood plus property type and
              transaction (rent vs buy). As you add listings, these surfaces compound.
            </p>
            <ul className="space-y-2 font-mono text-sm text-slate-800 dark:text-emerald-100/90">
              {EXAMPLE_SEO_PATHS.map((path) => (
                <li
                  key={path}
                  className="rounded-lg border border-slate-200/90 bg-white/80 px-3 py-2 dark:border-slate-600/60 dark:bg-slate-900/60"
                >
                  {path}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col justify-center rounded-xl border border-slate-200/80 bg-white/90 p-6 dark:border-slate-700/80 dark:bg-slate-900/70">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
              <FileSearch className="h-4 w-4 text-[#36b9a0]" aria-hidden />
              Every listing is a landing page
            </div>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              Each published property gets its own canonical URL with rich detail—photos, location,
              amenities, and structured data—so search engines can index it like a standalone page.
              More quality listings means more chances to rank for long-tail and local queries across
              Kenya.
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
