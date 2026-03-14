"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { ListingWithCoverImage } from "@/lib/listings/types";
import { PropertyImage } from "@/components/listings/PropertyImage";
import { fadeInUp, springTransition } from "@/lib/motion";
import {
  LISTING_PURPOSE_LABELS,
  LISTING_PROPERTY_TYPE_LABELS,
  LISTING_TYPE_LABELS,
  ListingPurpose,
} from "@/lib/listings/enums";

/**
 * Minimalist marketplace card: image-first, clear price, one-line meta.
 * Price and badges depend on listing_purpose: short_stay shows nightly + check-in/out on detail;
 * rent shows /mo; buy shows sale price. Used on the listings grid; links to the listing detail page.
 */
interface ListingCardProps {
  listing: ListingWithCoverImage;
}

/** Default currency for display when currency_code is missing. */
const DEFAULT_CURRENCY = "KES";

export function ListingCard({ listing }: ListingCardProps) {
  const formatPrice = (price: number, currency = DEFAULT_CURRENCY): string => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatBedrooms = (bedrooms: number): string => {
    if (bedrooms === 0) return "Studio";
    if (bedrooms === 1) return "1 bed";
    return `${bedrooms} beds`;
  };

  const purpose = listing.listing_purpose ?? ListingPurpose.Rent;
  const isShortStay = purpose === ListingPurpose.ShortStay;
  const isBuy = purpose === ListingPurpose.Buy;

  const displayPrice =
    isShortStay || isBuy
      ? (listing.base_price ?? listing.monthly_rent)
      : listing.monthly_rent;
  const priceSuffix = isShortStay ? "/night" : isBuy ? "" : "/mo";
  const currency = listing.currency_code ?? DEFAULT_CURRENCY;

  const purposeLabel = LISTING_PURPOSE_LABELS[purpose as ListingPurpose] ?? "Rent";
  const propertyTypeLabel =
    LISTING_PROPERTY_TYPE_LABELS[listing.property_type as keyof typeof LISTING_PROPERTY_TYPE_LABELS] ??
    listing.property_type;
  /** Listing type (entire place, private room, shared room) shown only for short_stay. */
  const listingTypeLabel =
    isShortStay && listing.listing_type
      ? (LISTING_TYPE_LABELS[listing.listing_type as keyof typeof LISTING_TYPE_LABELS] ?? listing.listing_type)
      : null;

  const meta = [
    formatBedrooms(listing.bedrooms),
    `${listing.bathrooms} ${listing.bathrooms === 1 ? "bath" : "baths"}`,
    listing.size_sqm ? `${listing.size_sqm} m²` : null,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={fadeInUp}
      transition={springTransition}
      whileHover={{ y: -2, transition: springTransition }}
    >
      <Link href={`/listings/${listing.slug}`} className="group block">
        <article className="relative overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200/80 transition-all duration-200 hover:shadow-md hover:ring-slate-300/80 dark:bg-slate-900/50 dark:ring-slate-700/80 dark:hover:ring-slate-600/80">
          {/* Image with overlay badges: purpose (left), verified (right), TPS (bottom-left). */}
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
            <PropertyImage
              src={listing.cover_image_url}
              alt={listing.title}
              fill
              className="transition-transform duration-300 ease-out group-hover:scale-[1.02]"
              sizes="(min-width: 1536px) 25vw, (min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
              placeholder={listing.blur_data_url ? "blur" : "empty"}
              blurDataURL={listing.blur_data_url}
              loading="lazy"
              objectFit="cover"
            />
            {/* Single purpose badge: clear hierarchy, frosted so it reads on any image. */}
            <span
              className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-medium tracking-tight text-slate-700 shadow-sm backdrop-blur-sm dark:bg-slate-900/80 dark:text-slate-200"
              aria-label="Listing purpose"
            >
              {purposeLabel}
            </span>
            {/* Verified: compact pill with icon, top-right. */}
            {listing.is_verified && (
              <span
                className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-[10px] font-medium text-slate-600 shadow-sm backdrop-blur-sm dark:bg-slate-900/80 dark:text-slate-300"
                aria-label="Verified listing"
              >
                <CheckCircle2 className="h-3 w-3 text-emerald-600 dark:text-emerald-400" aria-hidden />
                Verified
              </span>
            )}
            {listing.is_tps_available && (
              <span className="absolute bottom-3 left-3 rounded-full bg-primary px-2.5 py-1 text-[10px] font-medium text-primary-foreground shadow-sm">
                TPS
              </span>
            )}
          </div>

          {/* Copy: type line (property + listing type), title, meta, location, price. */}
          <div className="p-3.5">
            {(propertyTypeLabel || listingTypeLabel) && (
              <p className="mb-1 text-[11px] font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">
                {[propertyTypeLabel, listingTypeLabel].filter(Boolean).join(" · ")}
              </p>
            )}
            <h3 className="line-clamp-2 text-sm font-medium text-slate-900 dark:text-slate-50">
              {listing.title}
            </h3>
            {meta && (
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                {meta}
              </p>
            )}
            <p className="mt-0.5 line-clamp-1 text-[11px] text-slate-400 dark:text-slate-500">
              {listing.area}, {listing.city}
            </p>
            <p className="mt-2 text-base font-semibold text-primary">
              {formatPrice(displayPrice, currency)}
              {priceSuffix && (
                <span className="ml-0.5 text-xs font-normal text-slate-500">
                  {priceSuffix}
                </span>
              )}
            </p>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}
