/**
 * Internal route for apartment-rent SEO hubs; public URLs are /apartments-for-rent-{hub}
 * (rewrites in next.config.ts). Zillow/Property24-style location + intent pages with
 * filtered inventory, CollectionPage JSON-LD, and pagination on the hyphen canonical URL.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { SeoBlueprintGrid } from "@/components/design-system/seo-blueprint-grid";
import { ListingCard } from "@/components/listings/ListingCard";
import { Button } from "@/components/ui/button";
import {
  APARTMENTS_RENT_HUB_SLUGS,
  APARTMENTS_RENT_SEO_HUBS,
  isApartmentsRentHubSlug,
  type ApartmentsRentHubSlug,
} from "@/lib/listings/apartments-rent-seo-hubs";
import { fetchListings } from "@/lib/listings/supabase-helpers";

const BASE = "https://www.nyumbazetu.com";

/**
 * Pre-renders hub variants at /apartments-for-rent/{hub} (served to users as hyphen URLs).
 */
export function generateStaticParams(): { hub: ApartmentsRentHubSlug }[] {
  return APARTMENTS_RENT_HUB_SLUGS.map((hub) => ({ hub }));
}

/**
 * Builds metadata with canonical URLs on the public /apartments-for-rent-{hub} path.
 */
export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ hub: string }>;
  searchParams: Promise<{ page?: string }>;
}): Promise<Metadata> {
  const { hub: raw } = await params;
  if (!isApartmentsRentHubSlug(raw)) {
    return { title: "Not found | Nyumba Zetu" };
  }
  const hub = raw;
  const config = APARTMENTS_RENT_SEO_HUBS[hub];
  const { page: pageStr } = await searchParams;
  const page = Math.max(1, parseInt(pageStr || "1", 10) || 1);
  const path = `/apartments-for-rent-${hub}`;
  const canonicalUrl = page <= 1 ? `${BASE}${path}` : `${BASE}${path}?page=${page}`;
  const title =
    page > 1
      ? `${config.metaTitle.replace(" | Nyumba Zetu", "")} — page ${page} | Nyumba Zetu`
      : config.metaTitle;

  return {
    title,
    description: config.metaDescription,
    alternates: { canonical: canonicalUrl },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description: config.metaDescription,
      url: canonicalUrl,
      type: "website",
      siteName: "Nyumba Zetu",
    },
  };
}

/**
 * Renders hub landing: blueprint hero, listing grid, sibling hub links, ItemList JSON-LD.
 */
export default async function ApartmentsForRentHubPage({
  params,
  searchParams,
}: {
  params: Promise<{ hub: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { hub: raw } = await params;
  if (!isApartmentsRentHubSlug(raw)) {
    notFound();
  }
  const hub = raw;
  const config = APARTMENTS_RENT_SEO_HUBS[hub];
  const { page: pageStr } = await searchParams;
  const page = Math.max(1, parseInt(pageStr || "1", 10) || 1);
  const path = `/apartments-for-rent-${hub}`;
  const canonicalBase = `${BASE}${path}`;

  const { listings, total, totalPages, perPage } = await fetchListings({
    ...config.filters,
    page,
    sort: "recommended",
  });

  const itemListOffset = (page - 1) * perPage;
  const itemListElements = listings.map((l, i) => ({
    "@type": "ListItem" as const,
    position: itemListOffset + i + 1,
    url: `${BASE}/listings/${l.slug}`,
    name: l.title,
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: config.h1,
    description: config.metaDescription,
    url: page <= 1 ? canonicalBase : `${canonicalBase}?page=${page}`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: total,
      itemListElement: itemListElements,
    },
  };

  const siblingHubs = APARTMENTS_RENT_HUB_SLUGS.filter((s) => s !== hub);

  return (
    <div className="min-h-screen bg-[#fafcfb] dark:bg-slate-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="relative overflow-hidden border-b border-teal-100/60 bg-gradient-to-b from-[#f0fdfa] via-white to-[#fafcfb] dark:border-teal-900/30 dark:from-slate-900 dark:via-slate-950 dark:to-slate-950">
        <SeoBlueprintGrid className="absolute inset-0" cellSizePx={28} />
        <div className="relative z-10 mx-auto max-w-[1600px] px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <nav className="mb-6 text-sm text-slate-600 dark:text-slate-400" aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1">
              <li>
                <Link href="/" className="inline-flex items-center gap-1 hover:text-[#0d9488] dark:hover:text-teal-400">
                  <Home className="h-4 w-4" aria-hidden />
                  Home
                </Link>
              </li>
              <ChevronRight className="h-4 w-4 shrink-0 opacity-50" aria-hidden />
              <li>
                <Link href="/listings" className="hover:text-[#0d9488] dark:hover:text-teal-400">
                  Listings
                </Link>
              </li>
              <ChevronRight className="h-4 w-4 shrink-0 opacity-50" aria-hidden />
              <li className="font-medium text-slate-900 dark:text-slate-100" aria-current="page">
                {config.h1}
              </li>
            </ol>
          </nav>
          <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl lg:text-5xl">
            {config.h1}
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600 dark:text-slate-400">{config.intro}</p>
        </div>
      </header>

      <div className="mx-auto max-w-[1600px] px-4 py-10 sm:px-6 lg:px-8">
        <section aria-labelledby="hub-listings-heading">
          <h2 id="hub-listings-heading" className="sr-only">
            Available apartments
          </h2>
          {listings.length === 0 ? (
            <div className="rounded-2xl border border-slate-200/80 bg-white/90 px-6 py-14 text-center dark:border-slate-700/80 dark:bg-slate-900/60">
              <p className="text-slate-600 dark:text-slate-400">
                No apartment rentals match this hub yet.{" "}
                <Link href="/listings/search" className="font-medium text-[#36b9a0] underline-offset-2 hover:underline">
                  Browse all listings
                </Link>{" "}
                or{" "}
                <Link href="/listings/post" className="font-medium text-[#36b9a0] underline-offset-2 hover:underline">
                  post a listing
                </Link>
                .
              </p>
            </div>
          ) : (
            <>
              <p className="mb-6 text-sm text-slate-600 dark:text-slate-400">
                {total} apartment{total !== 1 ? "s" : ""} for rent
                {hub !== "nairobi" ? ` in this area` : " in Nairobi"}.
              </p>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {listings.map((listing) => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
              {totalPages > 1 && (
                <nav className="mt-10 flex flex-wrap items-center justify-center gap-2" aria-label="Pagination">
                  {page > 1 && (
                    <Button asChild variant="outline" size="sm">
                      <Link href={page === 2 ? path : `${path}?page=${page - 1}`} rel="prev">
                        Previous
                      </Link>
                    </Button>
                  )}
                  <span className="px-3 text-sm text-slate-600 dark:text-slate-400">
                    Page {page} of {totalPages}
                  </span>
                  {page < totalPages && (
                    <Button asChild variant="outline" size="sm">
                      <Link href={`${path}?page=${page + 1}`} rel="next">
                        Next
                      </Link>
                    </Button>
                  )}
                </nav>
              )}
            </>
          )}
        </section>

        <section
          className="relative mt-16 overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 dark:border-slate-700/80 dark:bg-slate-900/50 sm:p-8"
          aria-labelledby="related-hubs-heading"
        >
          <SeoBlueprintGrid className="absolute inset-0 rounded-2xl opacity-[0.06] dark:opacity-[0.08]" darkMode />
          <div className="relative z-10">
            <h2 id="related-hubs-heading" className="font-display text-lg font-semibold text-slate-900 dark:text-slate-50">
              Browse apartments for rent nearby
            </h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Explore other Nairobi rental hubs—each page is built for how people search.
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {siblingHubs.map((s) => {
                const c = APARTMENTS_RENT_SEO_HUBS[s];
                return (
                  <li key={s}>
                    <Link
                      href={c.pathname}
                      className="inline-flex rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-800 transition-colors hover:border-[#36b9a0]/50 hover:bg-teal-50/80 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-teal-600/50"
                    >
                      {c.h1.replace(/^Apartments for rent in /i, "").replace(/, Nairobi$/i, "")}
                    </Link>
                  </li>
                );
              })}
              <li>
                <Link
                  href="/listings/search?listingPurpose=rent&propertyType=apartment&city=nairobi"
                  className="inline-flex rounded-lg border border-dashed border-slate-300 px-3 py-2 text-sm text-slate-600 hover:border-[#36b9a0] dark:border-slate-600 dark:text-slate-400"
                >
                  Advanced search
                </Link>
              </li>
            </ul>
          </div>
        </section>

        <p className="mt-10 text-center text-sm text-slate-500 dark:text-slate-500">
          Each property has its own{" "}
          <Link href="/listings" className="text-[#36b9a0] underline-offset-2 hover:underline">
            indexable listing page
          </Link>{" "}
          with photos, map and structured data—ideal for organic discovery.
        </p>
      </div>
    </div>
  );
}
