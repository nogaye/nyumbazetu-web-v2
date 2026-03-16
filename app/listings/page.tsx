/**
 * Listings marketplace page: sidebar filters, compact header, grid of property cards.
 * Layout is intentionally different from the rest of the site (sidebar + full-bleed content).
 */

import { Suspense } from "react";
import type { Metadata } from "next";
import { ListingsFilterBar } from "@/components/listings/ListingsFilterBar";
import { ListingsHeaderStrip } from "@/components/listings/ListingsHeaderStrip";
import { ListingCard } from "@/components/listings/ListingCard";
import { ListingCardSkeleton } from "@/components/listings/ListingCardSkeleton";
import { ActiveFilterChips } from "@/components/listings/ActiveFilterChips";
import { Button } from "@/components/ui/button";
import { fetchListings, parseFilters } from "@/lib/listings/supabase-helpers";
import { ListingFilters } from "@/lib/listings/types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Property Listings | Rent, Buy & Short Stay | Nyumba Zetu",
  description:
    "Browse verified property listings: apartments, maisonettes and rent-to-own homes across Nairobi, Mombasa and Kenya. Rent, buy, or short stay.",
  keywords: [
    "property listings",
    "apartments for rent",
    "houses for rent",
    "Nairobi properties",
    "Mombasa properties",
    "rent to own",
    "TPS properties",
    "Kenya real estate",
  ],
  openGraph: {
    title: "Apartments & Properties for Rent | Nyumba Zetu",
    description:
      "Browse verified apartments, maisonettes and TPS homes across Nairobi and other Kenyan cities using Nyumba Zetu.",
    type: "website",
  },
};

interface ListingsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function ListingsContent({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const filters: ListingFilters = parseFilters(searchParams);
  const { listings, total, page, totalPages } = await fetchListings(filters);

  const getLocationText = () => {
    if (filters.city && filters.area) return `${filters.area}, ${filters.city}`;
    if (filters.city) return filters.city;
    if (filters.area) return filters.area;
    return "Kenya";
  };

  /** Builds query string for pagination (all current filters, no page). */
  const baseQuery: Record<string, string> = {};
  for (const [k, v] of Object.entries(filters)) {
    if (k === "page" || v === undefined || v === null) continue;
    baseQuery[k] = String(v);
  }
  const prevPageHref =
    page > 1
      ? `/listings?${new URLSearchParams({ ...baseQuery, page: (page - 1).toString() }).toString()}`
      : null;
  const nextPageHref =
    page < totalPages
      ? `/listings?${new URLSearchParams({ ...baseQuery, page: (page + 1).toString() }).toString()}`
      : null;

  return (
    <div className="min-h-screen bg-slate-100/70 dark:bg-slate-900/50">
      {/* Compact header: headline + search + sort */}
      <ListingsHeaderStrip
        currentSort={filters.sort ?? "recommended"}
        currentSearch={filters.search ?? ""}
        total={total}
      />

      {/* Sidebar (desktop) + mobile Filters button/sheet, then main content */}
      <div className="mx-auto flex max-w-[1600px] flex-col lg:flex-row">
        <ListingsFilterBar filters={filters} layout="sidebar" />

        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8" aria-label="Property listings">
          {/* Active filter chips */}
          <div className="mb-3">
            <ActiveFilterChips filters={filters} />
          </div>

          {/* Result summary: "Showing 1–24 of 156 in Kenya · Page 1 of 7" */}
          {total > 0 && (
            <p className="mb-4 text-sm text-slate-600 dark:text-slate-400" aria-live="polite">
              Showing {(page - 1) * 24 + 1}–{Math.min(page * 24, total)} of {total} in {getLocationText()}
              {totalPages > 1 && (
                <span aria-label={`Page ${page} of ${totalPages}`}>
                  {" "}· Page {page} of {totalPages}
                </span>
              )}
            </p>
          )}

          {/* Empty / no-results state */}
          {total === 0 && (
            <div
              className="flex flex-col items-center justify-center rounded-2xl border border-slate-200/80 bg-white py-16 text-center dark:border-slate-700/80 dark:bg-slate-900/50 sm:py-20"
              role="status"
              aria-live="polite"
            >
              <p className="text-base font-medium text-slate-900 dark:text-slate-50">
                No properties match your filters
              </p>
              <p className="mt-2 max-w-sm text-sm text-slate-600 dark:text-slate-400">
                Try adjusting location, price range, or property type — or browse all listings.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <Button asChild size="default">
                  <Link href="/listings">Clear filters</Link>
                </Button>
                <Button asChild variant="outline" size="default">
                  <Link href="/listings?city=nairobi">Browse Nairobi</Link>
                </Button>
                <Button asChild variant="outline" size="default">
                  <Link href="/listings?city=mombasa">Browse Mombasa</Link>
                </Button>
              </div>
            </div>
          )}

          {/* Listing grid */}
          {total > 0 && (
            <>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {listings.map((listing) => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>

              {/* Bottom CTA: list your property / get help */}
              <section className="mt-12 rounded-2xl border border-slate-200/80 bg-white p-6 text-center dark:border-slate-700/80 dark:bg-slate-900/40 sm:p-8">
                <p className="text-base font-medium text-slate-900 dark:text-slate-50">
                  Can&apos;t find what you need?
                </p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  List your property with Nyumba Zetu or get in touch and we&apos;ll help you find the right place.
                </p>
                <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
                  <Button asChild size="default" className="rounded-lg">
                    <Link href="/request-demo">List your property</Link>
                  </Button>
                  <Button asChild variant="outline" size="default" className="rounded-lg">
                    <Link href="/contact">Contact us</Link>
                  </Button>
                </div>
              </section>

              {/* Pagination */}
              {totalPages > 1 && (
                <nav
                  className="mt-14 flex flex-wrap items-center justify-center gap-2 sm:gap-3"
                  aria-label="Pagination"
                >
                  <span className="sr-only">
                    Page {page} of {totalPages}
                  </span>
                  {page > 1 && prevPageHref ? (
                    <Button variant="outline" size="default" className="gap-2" asChild>
                      <Link href={prevPageHref} aria-label="Previous page">
                        <ChevronLeft className="h-4 w-4" aria-hidden />
                        Previous
                      </Link>
                    </Button>
                  ) : (
                    <Button variant="outline" size="default" className="gap-2" disabled>
                      <ChevronLeft className="h-4 w-4" aria-hidden />
                      Previous
                    </Button>
                  )}
                  <span
                    className="min-w-[4rem] text-center text-sm font-medium text-slate-700 dark:text-slate-300"
                    aria-current="page"
                  >
                    {page} of {totalPages}
                  </span>
                  {page < totalPages && nextPageHref ? (
                    <Button variant="outline" size="default" className="gap-2" asChild>
                      <Link href={nextPageHref} aria-label="Next page">
                        Next
                        <ChevronRight className="h-4 w-4" aria-hidden />
                      </Link>
                    </Button>
                  ) : (
                    <Button variant="outline" size="default" className="gap-2" disabled>
                      Next
                      <ChevronRight className="h-4 w-4" aria-hidden />
                    </Button>
                  )}
                </nav>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default async function ListingsPage({ searchParams }: ListingsPageProps) {
  const resolvedSearchParams = await searchParams;

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-100/70 dark:bg-slate-900/50">
          <div className="border-b border-slate-200/80 bg-white/90 dark:border-slate-800 dark:bg-slate-950/90">
            <div className="mx-auto max-w-[1600px] px-4 py-5 sm:px-6 lg:px-8">
              <div className="h-10 w-48 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
            </div>
          </div>
          <div className="mx-auto flex max-w-[1600px]">
            <div className="hidden w-64 shrink-0 border-r border-slate-200/80 bg-white/80 dark:border-slate-800 dark:bg-slate-950/80 lg:block">
              <div className="p-4">
                <div className="space-y-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="h-9 animate-pulse rounded bg-slate-200 dark:bg-slate-800"
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8">
              <div className="mb-4 h-5 w-32 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <ListingCardSkeleton key={i} />
                ))}
              </div>
            </div>
          </div>
        </div>
      }
    >
      <ListingsContent searchParams={resolvedSearchParams} />
    </Suspense>
  );
}
