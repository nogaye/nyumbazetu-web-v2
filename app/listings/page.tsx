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
import { Button } from "@/components/ui/button";
import { fetchListings, parseFilters } from "@/lib/listings/supabase-helpers";
import { ListingFilters } from "@/lib/listings/types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Apartments & Properties for Rent | Nyumba Zetu",
  description:
    "Browse verified apartments, maisonettes and TPS homes across Nairobi and other Kenyan cities using Nyumba Zetu.",
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

        <div className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8">
          {/* Result count — minimal */}
          <div className="mb-4 flex items-baseline justify-between gap-4">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {total === 0 ? (
                "No places found"
              ) : (
                <>
                  <span className="font-medium text-slate-900 dark:text-slate-50">
                    {total}
                  </span>{" "}
                  {total === 1 ? "place" : "places"} in {getLocationText()}
                  {totalPages > 1 && (
                    <span className="ml-1">
                      · Page {page} of {totalPages}
                    </span>
                  )}
                </>
              )}
            </p>
          </div>

          {/* Empty state */}
          {total === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="mb-4 text-slate-600 dark:text-slate-400">
                Try different filters or areas.
              </p>
              <Link href="/listings">
                <Button variant="outline" size="sm">
                  Clear filters
                </Button>
              </Link>
            </div>
          )}

          {/* Grid */}
          {total > 0 && (
            <>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {listings.map((listing) => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>

              {/* Pagination — minimal */}
              {totalPages > 1 && (
                <nav
                  className="mt-12 flex items-center justify-center gap-3"
                  aria-label="Pagination"
                >
                  <Link
                    href={
                      page > 1
                        ? `/listings?${new URLSearchParams({
                            ...Object.fromEntries(
                              Object.entries(filters).filter(
                                ([_k, v]) => v !== undefined
                              )
                            ),
                            page: (page - 1).toString(),
                          } as Record<string, string>).toString()}`
                        : "#"
                    }
                    aria-disabled={page === 1}
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={page === 1}
                      className="gap-1.5"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </Button>
                  </Link>
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    {page} / {totalPages}
                  </span>
                  <Link
                    href={
                      page < totalPages
                        ? `/listings?${new URLSearchParams({
                            ...Object.fromEntries(
                              Object.entries(filters).filter(
                                ([_k, v]) => v !== undefined
                              )
                            ),
                            page: (page + 1).toString(),
                          } as Record<string, string>).toString()}`
                        : "#"
                    }
                    aria-disabled={page >= totalPages}
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={page >= totalPages}
                      className="gap-1.5"
                    >
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </nav>
              )}
            </>
          )}
        </div>
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
