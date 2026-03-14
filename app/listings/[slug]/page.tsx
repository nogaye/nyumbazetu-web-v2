/**
 * Listing detail page: single property view with gallery, details, and contact CTA.
 * Layout and styling aligned with the marketplace index (minimal, content-first).
 */

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, MapPin, Bed, Bath, Square } from "lucide-react";
import {
  fetchPropertyBySlug,
  fetchPropertyImages,
} from "@/lib/listings/supabase-helpers";
import { PropertyImageGallery } from "@/components/listings/PropertyImageGallery";
import { ListingDetailBookingSection } from "@/components/listings/ListingDetailBookingSection";
import { Property } from "@/lib/listings/types";

async function getListing(slug: string): Promise<Property | null> {
  return fetchPropertyBySlug(slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const listing = await getListing(slug);

  if (!listing) {
    return {
      title: "Listing Not Found | Nyumba Zetu",
    };
  }

  return {
    title: `${listing.title} | Nyumba Zetu`,
    description: listing.description,
    openGraph: {
      title: `${listing.title} | Nyumba Zetu`,
      description: listing.description,
      type: "website",
    },
  };
}

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const listing = await getListing(slug);

  if (!listing) {
    notFound();
  }

  const formatBedrooms = (bedrooms: number): string => {
    if (bedrooms === 0) return "Studio";
    if (bedrooms === 1) return "1 bed";
    return `${bedrooms} beds`;
  };

  const propertyTypeLabels: Record<string, string> = {
    apartment: "Apartment",
    maisonette: "Maisonette",
    bedsitter: "Bedsitter",
    house: "House",
    studio: "Studio",
    office: "Office",
    shop: "Shop",
  };

  const propertyImages = await fetchPropertyImages(listing.id);

  const locationName = `${listing.area}, ${listing.city}`;

  return (
    <div className="min-h-screen bg-slate-100/70 dark:bg-slate-900/50">
      <div className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          href="/listings"
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to listings
        </Link>

        {/* Full-width gallery — larger photos */}
        <div className="mb-8">
          <PropertyImageGallery
            images={propertyImages}
            propertyTitle={listing.title}
            className="rounded-xl overflow-hidden"
          />
        </div>

        {/* Title, location, badges */}
        <header className="mb-6">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            {listing.is_verified && (
              <span className="rounded-md bg-slate-200/80 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-slate-600 dark:bg-slate-600 dark:text-slate-300">
                Verified
              </span>
            )}
            {listing.is_tps_available && (
              <span className="rounded-md bg-primary/90 px-2 py-0.5 text-[10px] font-medium text-primary-foreground">
                TPS
              </span>
            )}
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50 sm:text-3xl">
            {listing.title}
          </h1>
          <p className="mt-1.5 flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-400">
            <MapPin className="h-4 w-4 shrink-0" aria-hidden />
            {locationName}
          </p>
        </header>

        {/* Key specs */}
        <div className="mb-8 flex flex-wrap gap-6 border-y border-slate-200/80 py-5 dark:border-slate-700/80">
          <div className="flex items-center gap-2">
            <Bed
              className="h-5 w-5 text-slate-400 dark:text-slate-500"
              aria-hidden
            />
            <span className="text-sm font-medium text-slate-900 dark:text-slate-50">
              {formatBedrooms(listing.bedrooms)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Bath
              className="h-5 w-5 text-slate-400 dark:text-slate-500"
              aria-hidden
            />
            <span className="text-sm font-medium text-slate-900 dark:text-slate-50">
              {listing.bathrooms} {listing.bathrooms === 1 ? "bath" : "baths"}
            </span>
          </div>
          {listing.size_sqm != null && (
            <div className="flex items-center gap-2">
              <Square
                className="h-5 w-5 text-slate-400 dark:text-slate-500"
                aria-hidden
              />
              <span className="text-sm font-medium text-slate-900 dark:text-slate-50">
                {listing.size_sqm} m²
              </span>
            </div>
          )}
          <div className="text-sm font-medium text-slate-700 dark:text-slate-300">
            {propertyTypeLabels[listing.property_type] || listing.property_type}
          </div>
        </div>

        {/* Amenities + calendar (left) | Booking / contact card (right) */}
        <ListingDetailBookingSection
          propertyTitle={listing.title}
          propertyId={listing.id}
          propertySlug={listing.slug}
          monthlyRent={listing.monthly_rent}
          locationName={listing.city}
          cancellationPolicy="$0 today – Free cancellation before check-in"
        />

        {/* Description */}
        <section className="mt-10 mb-8">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-3">
            Description
          </h2>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            {listing.description}
          </p>
        </section>

        {/* TPS */}
        {listing.is_tps_available && (
          <section className="rounded-xl border border-primary/20 bg-primary/5 px-4 py-4 dark:border-primary/30 dark:bg-primary/10">
            <h3 className="text-sm font-semibold text-primary mb-1.5">
              Tenant Purchase Scheme (TPS)
            </h3>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              This property is available through our Rent-to-Own program.
              Contact us to learn more.
            </p>
          </section>
        )}
      </div>
    </div>
  );
}
