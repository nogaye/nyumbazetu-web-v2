import { Suspense } from "react";
import type { Metadata } from "next";
import { ListingsFilterBar } from "@/components/listings/ListingsFilterBar";
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
    if (filters.city && filters.area) {
      return `${filters.area}, ${filters.city}`;
    }
    if (filters.city) {
      return filters.city;
    }
    if (filters.area) {
      return filters.area;
    }
    return "Kenya";
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Filters */}
      <ListingsFilterBar filters={filters} />

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Results Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
              {total === 0 ? (
                "No homes found"
              ) : (
                <>
                  Showing {listings.length} {listings.length === 1 ? "home" : "homes"}
                  {total > listings.length && ` of ${total}`} in {getLocationText()}
                </>
              )}
            </h1>
            {total > 0 && (
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                {total === listings.length
                  ? "All results shown"
                  : `Page ${page} of ${totalPages}`}
              </p>
            )}
          </div>

          {/* Sort Dropdown (stub for future) */}
          {total > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-600 dark:text-slate-400">Sort:</span>
              <select
                className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50"
                defaultValue="recommended"
                aria-label="Sort listings"
              >
                <option value="recommended">Recommended</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest First</option>
              </select>
            </div>
          )}
        </div>

        {/* Empty State */}
        {total === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <p className="mb-4 text-lg text-slate-600 dark:text-slate-400">
              No homes found. Try adjusting your filters or exploring another area.
            </p>
            <Link href="/listings">
              <Button variant="outline">Clear Filters</Button>
            </Link>
          </div>
        )}

        {/* Listings Grid */}
        {total > 0 && (
          <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-6">
              {listings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-4">
                <Link
                  href={
                    page > 1
                      ? `/listings?${new URLSearchParams({
                          ...Object.fromEntries(
                            Object.entries(filters).filter(([_, v]) => v !== undefined)
                          ),
                          page: (page - 1).toString(),
                        } as any).toString()}`
                      : "#"
                  }
                >
                  <Button
                    variant="outline"
                    disabled={page === 1}
                    className="flex items-center gap-2"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                </Link>

                <div className="text-sm text-slate-600 dark:text-slate-400">
                  Page {page} of {totalPages}
                </div>

                <Link
                  href={
                    page < totalPages
                      ? `/listings?${new URLSearchParams({
                          ...Object.fromEntries(
                            Object.entries(filters).filter(([_, v]) => v !== undefined)
                          ),
                          page: (page + 1).toString(),
                        } as any).toString()}`
                      : "#"
                  }
                >
                  <Button
                    variant="outline"
                    disabled={page >= totalPages}
                    className="flex items-center gap-2"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default async function ListingsPage({ searchParams }: ListingsPageProps) {
  const resolvedSearchParams = await searchParams;

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
          <div className="sticky top-16 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-950/95">
            <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
              <div className="h-16 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
            </div>
          </div>
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="mb-6 h-8 w-64 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-6">
              {Array.from({ length: 12 }).map((_, i) => (
                <ListingCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
      }
    >
      <ListingsContent searchParams={resolvedSearchParams} />
    </Suspense>
  );
}

