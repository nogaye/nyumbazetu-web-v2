/**
 * Marketplace SEO explainer for the listings homepage with live links to programmatic
 * apartment-rent hubs (/apartments-for-rent-*). Uses SeoBlueprintGrid for the blueprint
 * backdrop shared with hub and search surfaces.
 */

import Link from "next/link";
import { TrendingUp, MapPin, FileSearch } from "lucide-react";
import { SeoBlueprintGrid } from "@/components/design-system/seo-blueprint-grid";
import {
  APARTMENTS_RENT_HUB_SLUGS,
  APARTMENTS_RENT_SEO_HUBS,
} from "@/lib/listings/apartments-rent-seo-hubs";

export interface ListingsMarketplaceSeoSectionProps {
  /** Optional extra classes on the outer article wrapper. */
  className?: string;
}

/**
 * Renders the Marketplace SEO value block: strategy copy, live hub links, and indexable-listing callout.
 *
 * @param props - Optional `className`.
 * @returns Static section for use inside `ListingsAnimatedSection`.
 */
export function ListingsMarketplaceSeoSection({ className }: ListingsMarketplaceSeoSectionProps) {
  return (
    <article
      className={`relative overflow-hidden rounded-2xl border border-emerald-200/80 bg-gradient-to-br from-[#fafcfb] via-[#f0fdfa]/90 to-slate-50/90 p-6 shadow-sm dark:border-emerald-900/40 dark:from-slate-900/80 dark:via-emerald-950/20 dark:to-slate-950/80 sm:p-8 lg:p-10 ${className ?? ""}`}
      aria-labelledby="marketplace-seo-heading"
    >
      <SeoBlueprintGrid className="absolute inset-0 rounded-2xl" cellSizePx={24} />

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
          Nyumba Zetu ships the same pattern with live hub pages below.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-2 lg:gap-10">
          <div>
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
              <MapPin className="h-4 w-4 text-[#36b9a0]" aria-hidden />
              Indexable location hubs
            </div>
            <p className="mb-4 text-sm text-slate-600 dark:text-slate-400">
              High-intent URLs mirror how people search—city and neighbourhood plus property type and
              rent. These pages update as inventory grows.
            </p>
            <ul className="space-y-2">
              {APARTMENTS_RENT_HUB_SLUGS.map((slug) => {
                const hub = APARTMENTS_RENT_SEO_HUBS[slug];
                return (
                  <li key={slug}>
                    <Link
                      href={hub.pathname}
                      className="flex rounded-lg border border-slate-200/90 bg-white/90 px-3 py-2 font-mono text-sm text-emerald-900 transition-colors hover:border-[#36b9a0]/60 hover:bg-teal-50/80 dark:border-slate-600/60 dark:bg-slate-900/60 dark:text-emerald-100/90 dark:hover:border-teal-600/50"
                    >
                      {hub.pathname}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="relative flex flex-col justify-center overflow-hidden rounded-xl border border-slate-200/80 bg-white/90 p-6 dark:border-slate-700/80 dark:bg-slate-900/70">
            <SeoBlueprintGrid className="absolute inset-0 rounded-xl opacity-[0.07] dark:opacity-[0.1]" darkMode />
            <div className="relative z-10">
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
      </div>
    </article>
  );
}
