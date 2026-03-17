/**
 * Listing detail page: single property view with gallery, hero (price, title, badges),
 * key facts, sticky booking card, description, amenities, map, reviews, comments.
 * Mobile: sticky bottom CTA bar. SEO: JSON-LD Place/Product, OG image.
 */

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, MapPin, Bed, Bath, Square, CheckCircle2 } from "lucide-react";
import {
  fetchPropertyBySlug,
  fetchPropertyImages,
  fetchPropertyReviews,
  fetchPropertyComments,
  fetchPropertyAmenities,
} from "@/lib/listings/supabase-helpers";
import { PropertyImageGallery } from "@/components/listings/PropertyImageGallery";
import { ListingDetailBookingSection } from "@/components/listings/ListingDetailBookingSection";
import { ListingMap } from "@/components/listings/ListingMap";
import { ListingReviews } from "@/components/listings/ListingReviews";
import { ListingComments } from "@/components/listings/ListingComments";
import { ListingStickyCTA } from "@/components/listings/ListingStickyCTA";
import type { ListingCommentDisplay } from "@/lib/listings/types";
import { Property } from "@/lib/listings/types";
import {
  LISTING_PURPOSE_LABELS,
  LISTING_PROPERTY_TYPE_LABELS,
  LISTING_TYPE_LABELS,
  ListingPurpose,
} from "@/lib/listings/enums";

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

  const images = await fetchPropertyImages(String(listing.id));
  const firstImage = images[0]?.url;
  const description =
    listing.description.length > 160
      ? listing.description.slice(0, 157) + "..."
      : listing.description;

  return {
    title: `${listing.title} | Nyumba Zetu`,
    description,
    alternates: {
      canonical: `https://www.nyumbazetu.com/listings/${slug}`,
    },
    openGraph: {
      title: `${listing.title} | Nyumba Zetu`,
      description,
      type: "website",
      url: `https://www.nyumbazetu.com/listings/${slug}`,
      ...(firstImage && { images: [{ url: firstImage, alt: listing.title }] }),
    },
    twitter: {
      card: "summary_large_image",
      title: `${listing.title} | Nyumba Zetu`,
      description,
      ...(firstImage && { images: [firstImage] }),
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

  const purpose = listing.listing_purpose ?? ListingPurpose.Rent;
  const purposeLabel = LISTING_PURPOSE_LABELS[purpose as ListingPurpose] ?? "Rent";
  const propertyTypeLabel =
    LISTING_PROPERTY_TYPE_LABELS[listing.property_type as keyof typeof LISTING_PROPERTY_TYPE_LABELS] ??
    listing.property_type;
  /** Listing type (entire place, private room, shared room) shown only for short_stay. */
  const listingTypeLabel =
    purpose === ListingPurpose.ShortStay && listing.listing_type
      ? (LISTING_TYPE_LABELS[listing.listing_type as keyof typeof LISTING_TYPE_LABELS] ?? listing.listing_type)
      : null;

  const propertyImages = await fetchPropertyImages(String(listing.id));
  const { reviews: dbReviews, stats: reviewStats } = await fetchPropertyReviews(listing.id);
  const dbComments = await fetchPropertyComments(listing.id);
  const amenities = await fetchPropertyAmenities(listing.id);

  const reviews = dbReviews;
  const comments = dbComments;
  const averageRating = reviewStats.averageRating;
  const totalReviews = reviewStats.totalReviews;

  const locationName = `${listing.area}, ${listing.city}`;

  const displayPrice =
    purpose === ListingPurpose.ShortStay || purpose === ListingPurpose.Buy
      ? (listing.base_price ?? listing.monthly_rent)
      : listing.monthly_rent;

  const currency = listing.currency_code ?? "KES";
  const priceSuffix =
    purpose === ListingPurpose.ShortStay
      ? "/night"
      : purpose === ListingPurpose.Buy
        ? ""
        : "/mo";
  const formattedPrice = new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(displayPrice);

  const ctaLabel =
    purpose === ListingPurpose.Buy
      ? "Contact agent"
      : purpose === ListingPurpose.ShortStay
        ? "Request to book"
        : "Schedule a viewing";

  /** JSON-LD for SEO: Place + Offer. */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Place",
    name: listing.title,
    description: listing.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: listing.area,
      addressRegion: listing.city,
    },
    ...(listing.latitude != null &&
      listing.longitude != null && {
        geo: {
          "@type": "GeoCoordinates",
          latitude: listing.latitude,
          longitude: listing.longitude,
        },
      }),
    image: propertyImages.map((img) => img.url),
    offers: {
      "@type": "Offer",
      price: displayPrice,
      priceCurrency: currency,
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <div className="min-h-screen bg-slate-100/70 dark:bg-slate-900/50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-6" aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-slate-600 dark:text-slate-400">
            <li>
              <Link
                href="/listings"
                className="inline-flex items-center gap-1 transition-colors hover:text-slate-900 dark:hover:text-slate-100"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden />
                Listings
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link
                href={`/listings/search?city=${encodeURIComponent(listing.city)}`}
                className="transition-colors hover:text-slate-900 dark:hover:text-slate-100"
              >
                {listing.city}
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="font-medium text-slate-900 dark:text-slate-50" aria-current="page">
              <span className="line-clamp-1">{listing.title}</span>
            </li>
          </ol>
        </nav>

        {/* Gallery */}
        <div className="mb-8">
          <PropertyImageGallery
            images={propertyImages}
            propertyTitle={listing.title}
            className="rounded-2xl overflow-hidden"
          />
        </div>

        {/* Hero: price, title, location, badges */}
        <header className="mb-8">
          <div className="flex flex-wrap items-baseline gap-3">
            <p className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50 sm:text-3xl">
              {formattedPrice}
              {priceSuffix && (
                <span className="ml-1 text-lg font-normal text-slate-500 dark:text-slate-400">
                  {priceSuffix}
                </span>
              )}
            </p>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-slate-200/90 px-2.5 py-1 text-xs font-medium text-slate-700 dark:bg-slate-600 dark:text-slate-200">
              {purposeLabel}
            </span>
            <span className="rounded-full bg-slate-200/90 px-2.5 py-1 text-xs font-medium capitalize text-slate-700 dark:bg-slate-600 dark:text-slate-200">
              {propertyTypeLabel}
            </span>
            {listingTypeLabel && (
              <span className="rounded-full bg-slate-200/90 px-2.5 py-1 text-xs font-medium text-slate-700 dark:bg-slate-600 dark:text-slate-200">
                {listingTypeLabel}
              </span>
            )}
            {listing.is_verified && (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200">
                <CheckCircle2 className="h-3.5 w-3.5" aria-hidden />
                Verified
              </span>
            )}
            {listing.is_tps_available && (
              <span className="rounded-full bg-primary px-2.5 py-1 text-xs font-semibold text-primary-foreground">
                Rent-to-own
              </span>
            )}
          </div>
          <h1 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50 sm:text-3xl">
            {listing.title}
          </h1>
          <p className="mt-2 flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-400">
            <MapPin className="h-4 w-4 shrink-0" aria-hidden />
            {locationName}
          </p>
        </header>

        {/* Key facts */}
        <section
          className="mb-8 rounded-2xl border border-slate-200/80 bg-white px-5 py-5 dark:border-slate-700/80 dark:bg-slate-900/50"
          aria-labelledby="key-facts-heading"
        >
          <h2 id="key-facts-heading" className="sr-only">
            Key facts
          </h2>
          <div className="flex flex-wrap gap-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800">
                <Bed className="h-5 w-5 text-slate-600 dark:text-slate-400" aria-hidden />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Bedrooms
                </p>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                  {formatBedrooms(listing.bedrooms)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800">
                <Bath className="h-5 w-5 text-slate-600 dark:text-slate-400" aria-hidden />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Bathrooms
                </p>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                  {listing.bathrooms} {listing.bathrooms === 1 ? "bath" : "baths"}
                </p>
              </div>
            </div>
            {listing.size_sqm != null && (
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800">
                  <Square className="h-5 w-5 text-slate-600 dark:text-slate-400" aria-hidden />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Size
                  </p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                    {listing.size_sqm} m²
                  </p>
                </div>
              </div>
            )}
            <div className="flex items-center gap-3">
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Type
              </p>
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                {propertyTypeLabel}
              </p>
            </div>
          </div>
        </section>

        {/* Booking section: amenities + calendar (left) | sticky card (right) — full width */}
        <ListingDetailBookingSection
          propertyTitle={listing.title}
          propertyId={String(listing.id)}
          propertySlug={listing.slug}
          listingPurpose={purpose}
          monthlyRent={listing.monthly_rent}
          basePrice={listing.base_price ?? listing.monthly_rent}
          currencyCode={listing.currency_code ?? "KES"}
          locationName={listing.city}
          amenities={amenities}
          cancellationPolicy={
            purpose === ListingPurpose.ShortStay
              ? "Free cancellation before check-in"
              : undefined
          }
          buttonLabel={ctaLabel}
          className="mb-10"
        />

        {/* Description */}
        <section className="mb-10 pb-24 lg:pb-10" aria-labelledby="description-heading">
          <h2 id="description-heading" className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-3">
            About this property
          </h2>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
            {listing.description}
          </p>
        </section>

        {/* Map */}
        <ListingMap
          area={listing.area}
          city={listing.city}
          address={listing.address_line_1}
          latitude={listing.latitude}
          longitude={listing.longitude}
          listingTitle={listing.title}
          height={280}
          className="mb-10"
        />

        {/* Reviews */}
        <ListingReviews
          listingTitle={listing.title}
          averageRating={averageRating}
          totalReviews={totalReviews}
          reviews={reviews}
          className="mb-10"
        />

        {/* Comments */}
        <ListingComments
          listingTitle={listing.title}
          comments={comments}
          canComment={false}
          className="mb-10"
        />

        {/* TPS */}
        {listing.is_tps_available && (
          <section className="rounded-2xl border border-primary/20 bg-primary/5 px-5 py-5 dark:border-primary/30 dark:bg-primary/10">
            <h3 className="text-sm font-semibold text-primary mb-1.5">
              Tenant Purchase Scheme (Rent-to-own)
            </h3>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              This property is available through our Rent-to-Own program. Contact us to learn more.
            </p>
          </section>
        )}
      </div>

      {/* Mobile: sticky bottom CTA bar */}
      <ListingStickyCTA
        propertyTitle={listing.title}
        propertyId={String(listing.id)}
        propertySlug={listing.slug}
        buttonLabel={ctaLabel}
      />
    </div>
  );
}
