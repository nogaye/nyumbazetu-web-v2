/**
 * Listings marketplace homepage: search hero, featured listings,
 * why list with us, marketplace SEO strategy block, trust strip, and CTA band.
 * Served at /listings; uses the listings layout shell.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { Shield, CheckCircle2, FileCheck, FileText } from "lucide-react";
import { ListingsHomeHero } from "@/components/listings/listings-home-hero";
import { ListingCard } from "@/components/listings/ListingCard";
import { ListingsCtaBand } from "@/components/listings/listings-cta-band";
import { KenyaOutlineIllustration, AfricanPatternBackground } from "@/components/design-system";
import { ListingsAnimatedSection } from "@/components/listings/listings-animated-section";
import { ListingsMarketplaceSeoSection } from "@/components/listings/listings-marketplace-seo-section";
import { ListingCardSkeleton } from "@/components/listings/ListingCardSkeleton";
import { Button } from "@/components/ui/button";
import { fetchListings } from "@/lib/listings/supabase-helpers";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Nyumba Zetu Listings | Find & List Properties in Kenya",
  description:
    "Browse and list apartments, houses, commercial spaces and short stays across Nairobi, Mombasa and Kenya. Verified listings, trusted listers.",
  keywords: [
    "property listings Kenya",
    "apartments for rent Nairobi",
    "houses for sale",
    "short stay",
    "Nyumba Zetu",
  ],
  openGraph: {
    title: "Nyumba Zetu Listings | Find & List Properties in Kenya",
    description: "Browse and list verified properties across Kenya.",
    type: "website",
  },
};

async function FeaturedListings() {
  const { listings } = await fetchListings({ sort: "newest", page: 1 });
  const featured = listings.slice(0, 8);
  if (featured.length === 0) {
    return (
      <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-12 text-center dark:border-slate-700/80 dark:bg-slate-900/50">
        <AfricanPatternBackground
          className="absolute inset-0 rounded-2xl"
          variant="diamond"
          opacity={0.07}
          dark={false}
        />
        <div className="relative z-10 mx-auto mb-4 text-primary">
          <KenyaOutlineIllustration
            width={100}
            stroke="currentColor"
            strokeWidth={1.2}
            opacity={0.7}
          />
        </div>
        <p className="relative z-10 text-slate-600 dark:text-slate-400">
          No listings yet. Add your first property.
        </p>
        <Button asChild className="relative z-10 mt-4 bg-[#344767] hover:bg-[#2a3952] text-white">
          <Link href="/listings/post">Post a listing</Link>
        </Button>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {featured.map((listing) => (
        <ListingCard key={listing.id} listing={listing} />
      ))}
    </div>
  );
}

export default function ListingsHomePage() {
  return (
    <div className="min-h-screen bg-slate-50/80 dark:bg-slate-950/80">
      {/* 1. Search hero */}
      <ListingsHomeHero />

      <div className="mx-auto max-w-[1600px] px-4 py-12 sm:px-6 lg:px-8">
        {/* Featured listings */}
        <ListingsAnimatedSection aria-labelledby="featured-heading" className="mb-16">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <h2 id="featured-heading" className="font-display text-2xl font-semibold text-slate-900 dark:text-slate-50">
              Featured listings
            </h2>
            <Button asChild variant="outline" size="sm">
              <Link href="/listings/search">View all</Link>
            </Button>
          </div>
          <Suspense
            fallback={
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <ListingCardSkeleton key={i} />
                ))}
              </div>
            }
          >
            <FeaturedListings />
          </Suspense>
        </ListingsAnimatedSection>

        {/* Why list with us */}
        <ListingsAnimatedSection aria-labelledby="why-list-heading" className="mb-16">
          <h2 id="why-list-heading" className="font-display text-2xl font-semibold text-slate-900 dark:text-slate-50 mb-6">
            Why list with us
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-200/80 bg-white p-6 dark:border-slate-700/80 dark:bg-slate-900/50">
              <p className="font-medium text-slate-900 dark:text-slate-50">Visibility</p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                Your listing reaches serious renters and buyers across Kenya.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200/80 bg-white p-6 dark:border-slate-700/80 dark:bg-slate-900/50">
              <p className="font-medium text-slate-900 dark:text-slate-50">Inquiries that convert</p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                Direct contact and viewing requests from interested parties.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200/80 bg-white p-6 dark:border-slate-700/80 dark:bg-slate-900/50">
              <p className="font-medium text-slate-900 dark:text-slate-50">Easy management</p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                Update, pause or boost listings from your portal anytime.
              </p>
            </div>
          </div>
        </ListingsAnimatedSection>

        {/* Marketplace SEO: Zillow / Property24-style programmatic discovery */}
        <ListingsAnimatedSection aria-labelledby="marketplace-seo-heading" className="mb-16">
          <ListingsMarketplaceSeoSection />
        </ListingsAnimatedSection>

        {/* Marketplace trust strip */}
        <ListingsAnimatedSection aria-label="Trust indicators" className="mb-16">
          <div className="flex flex-wrap items-center justify-center gap-8 rounded-2xl border border-slate-200/80 bg-white px-6 py-8 dark:border-slate-700/80 dark:bg-slate-900/50 sm:gap-12">
            <span className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
              <CheckCircle2 className="h-5 w-5 text-[#36b9a0]" aria-hidden />
              Verified listings
            </span>
            <span className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
              <Shield className="h-5 w-5 text-[#36b9a0]" aria-hidden />
              Professional listers
            </span>
            <span className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
              <FileCheck className="h-5 w-5 text-[#36b9a0]" aria-hidden />
              Secure inquiries
            </span>
            <span className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
              <FileText className="h-5 w-5 text-[#36b9a0]" aria-hidden />
              Transparent details
            </span>
          </div>
        </ListingsAnimatedSection>

        {/* CTA band */}
        <ListingsCtaBand />
      </div>
    </div>
  );
}
