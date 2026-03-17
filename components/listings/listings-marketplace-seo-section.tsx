/**
 * Homepage value-proposition section for sellers and agents. It explains why listing on
 * Nyumba Zetu is worthwhile using concrete benefits around visibility, trust, and leads.
 */

import Link from "next/link";
import { TrendingUp, FileSearch, Search, SlidersHorizontal, Sparkles, ShieldCheck, Megaphone } from "lucide-react";
import { SeoBlueprintGrid } from "@/components/design-system/seo-blueprint-grid";

export interface ListingsMarketplaceSeoSectionProps {
  /** Optional extra classes on the outer article wrapper. */
  className?: string;
}

/**
 * Renders the "Why list with us" section with practical seller benefits and discovery links.
 *
 * @param props - Optional `className`.
 * @returns Static section for use inside `ListingsAnimatedSection`.
 */
export function ListingsMarketplaceSeoSection({ className }: ListingsMarketplaceSeoSectionProps) {
  return (
    <article
      className={`relative overflow-hidden rounded-2xl border border-emerald-200/80 bg-gradient-to-br from-[#fafcfb] via-[#f0fdfa]/90 to-slate-50/90 p-6 shadow-sm dark:border-emerald-900/40 dark:from-slate-900/80 dark:via-emerald-950/20 dark:to-slate-950/80 sm:p-8 lg:p-10 ${className ?? ""}`}
      aria-labelledby="why-list-with-us-heading"
    >
      <SeoBlueprintGrid className="absolute inset-0 rounded-2xl" cellSizePx={24} />

      <div className="relative z-10">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200/90 bg-emerald-50/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-800 dark:border-emerald-800/60 dark:bg-emerald-950/50 dark:text-emerald-300">
          <TrendingUp className="h-3.5 w-3.5" aria-hidden />
          Why list with us
        </div>

        <h2
          id="why-list-with-us-heading"
          className="font-display text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50 sm:text-3xl"
        >
          Why list with us
        </h2>

        <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-600 dark:text-slate-400">
          <strong className="font-semibold text-slate-800 dark:text-slate-200">
            Put your property in front of serious renters and buyers
          </strong>{" "}
          with a listing experience built to improve visibility, build trust, and generate direct
          inquiries. Clear pricing, strong photos, and complete details help the right listings stand
          out.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-2 lg:gap-10">
          <div className="grid gap-3">
            <div className="rounded-lg border border-slate-200/80 bg-white/90 p-4 dark:border-slate-700/80 dark:bg-slate-900/60">
              <div className="flex items-center gap-2 text-sm font-medium text-slate-900 dark:text-slate-50">
                <Megaphone className="h-4 w-4 text-[#36b9a0]" aria-hidden />
                Built for visibility
              </div>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                Your property is presented clearly so serious renters and buyers can spot it faster.
              </p>
            </div>
            <div className="rounded-lg border border-slate-200/80 bg-white/90 p-4 dark:border-slate-700/80 dark:bg-slate-900/60">
              <div className="flex items-center gap-2 text-sm font-medium text-slate-900 dark:text-slate-50">
                <ShieldCheck className="h-4 w-4 text-[#36b9a0]" aria-hidden />
                More trust, fewer tire-kickers
              </div>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                Verified details, clean presentation, and location context help people contact you with
                confidence instead of browsing casually.
              </p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-xl border border-slate-200/80 bg-white/90 p-6 dark:border-slate-700/80 dark:bg-slate-900/70">
            <SeoBlueprintGrid className="absolute inset-0 rounded-xl opacity-[0.07] dark:opacity-[0.1]" darkMode />
            <div className="relative z-10">
              <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
                <FileSearch className="h-4 w-4 text-[#36b9a0]" aria-hidden />
                What listing with us gives you
              </div>
              <div className="grid gap-3">
                <div className="rounded-lg border border-slate-200/80 bg-slate-50/80 p-4 dark:border-slate-700/70 dark:bg-slate-950/50">
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-900 dark:text-slate-50">
                    <Search className="h-4 w-4 text-[#36b9a0]" aria-hidden />
                    Better visibility in search
                  </div>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                    Your property appears alongside relevant searches and nearby alternatives, improving
                    the chance it gets seen by the right audience.
                  </p>
                </div>
                <div className="rounded-lg border border-slate-200/80 bg-slate-50/80 p-4 dark:border-slate-700/70 dark:bg-slate-950/50">
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-900 dark:text-slate-50">
                    <SlidersHorizontal className="h-4 w-4 text-[#36b9a0]" aria-hidden />
                    More qualified inquiries
                  </div>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                    Clear pricing, amenities, and location details help people self-select before they
                    contact you, which saves time on both sides.
                  </p>
                </div>
                <div className="rounded-lg border border-slate-200/80 bg-slate-50/80 p-4 dark:border-slate-700/70 dark:bg-slate-950/50">
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-900 dark:text-slate-50">
                    <Sparkles className="h-4 w-4 text-[#36b9a0]" aria-hidden />
                    Easy updates
                  </div>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                    Add, edit, or refresh listings as your availability changes so your inventory stays
                    current and accurate.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
