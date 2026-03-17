/**
 * Compact strip on /listings/search linking to programmatic apartment-rent SEO hubs.
 * Reuses SeoBlueprintGrid so search discovery matches hub page visual language.
 */

import Link from "next/link";
import { SeoBlueprintGrid } from "@/components/design-system/seo-blueprint-grid";
import {
  APARTMENTS_RENT_HUB_SLUGS,
  APARTMENTS_RENT_SEO_HUBS,
} from "@/lib/listings/apartments-rent-seo-hubs";

export interface ListingsSearchSeoHubsStripProps {
  /** Optional outer wrapper classes (e.g. horizontal margins). */
  className?: string;
}

/**
 * Renders quick links to /apartments-for-rent-* hubs below the search header.
 *
 * @param props - Optional `className` on the outer section.
 */
export function ListingsSearchSeoHubsStrip({ className }: ListingsSearchSeoHubsStripProps) {
  return (
    <section
      className={`relative overflow-hidden border-b border-teal-100/50 bg-gradient-to-r from-[#f0fdfa]/90 to-white dark:border-teal-900/25 dark:from-slate-900/90 dark:to-slate-950 ${className ?? ""}`}
      aria-label="Popular apartment rental searches"
    >
      <SeoBlueprintGrid className="absolute inset-0 opacity-[0.08] dark:opacity-[0.1]" cellSizePx={22} />
      <div className="relative z-10 mx-auto flex max-w-[1600px] flex-wrap items-center gap-2 px-4 py-3 sm:px-6 lg:px-8">
        <span className="mr-2 text-xs font-semibold uppercase tracking-wide text-teal-800 dark:text-teal-300">
          Nairobi apartments
        </span>
        {APARTMENTS_RENT_HUB_SLUGS.map((slug) => {
          const hub = APARTMENTS_RENT_SEO_HUBS[slug];
          const short =
            slug === "nairobi"
              ? "All Nairobi"
              : hub.h1.replace(/^Apartments for rent in /i, "").replace(/, Nairobi$/i, "");
          return (
            <Link
              key={slug}
              href={hub.pathname}
              className="rounded-full border border-teal-200/80 bg-white/90 px-3 py-1 text-xs font-medium text-slate-800 shadow-sm transition-colors hover:border-[#36b9a0] hover:text-[#0d9488] dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-teal-500"
            >
              {short}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
