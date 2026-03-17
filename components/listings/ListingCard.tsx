/**
 * Premium marketplace listing card: image-first, clear price hierarchy, badges, and primary CTA.
 * Used on the listings grid; links to the listing detail page. Keeps the card server-rendered
 * so the initial listings grid avoids extra client-side animation work on mobile.
 */

import Link from "next/link";
import { CheckCircle2, Heart, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ListingWithCoverImage } from "@/lib/listings/types";
import { PropertyImage } from "@/components/listings/PropertyImage";
import {
  LISTING_PURPOSE_LABELS,
  LISTING_PROPERTY_TYPE_LABELS,
  LISTING_TYPE_LABELS,
  ListingPurpose,
} from "@/lib/listings/enums";
import { cn } from "@/lib/utils";

interface ListingCardProps {
  /** Listing data including cover image URL. */
  listing: ListingWithCoverImage;
}

/** Default currency when currency_code is missing. */
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

  const handleSaveClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // TODO: wire to auth + saved listings API
  };

  return (
    <article className="group relative">
      <Link
        href={`/listings/${listing.slug}`}
        className={cn(
          "block overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/80",
          "transition-all duration-200 hover:shadow-lg hover:ring-slate-300/80",
          "dark:bg-slate-900/60 dark:ring-slate-700/80 dark:hover:ring-slate-600/80",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        )}
      >
        {/* Image: premium aspect ratio, badges overlay */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
          <PropertyImage
            src={listing.cover_image_url}
            alt={listing.title}
            fill
            className="transition-transform duration-300 ease-out group-hover:scale-[1.03]"
            sizes="(min-width: 1536px) 25vw, (min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
            placeholder={listing.blur_data_url ? "blur" : "empty"}
            blurDataURL={listing.blur_data_url}
            loading="lazy"
            objectFit="cover"
          />
          {/* Badges: purpose + verified (top-left), save (top-right), TPS (bottom-left) */}
          <div className="absolute left-3 top-3 flex flex-wrap items-center gap-2">
            <Badge
              variant="secondary"
              className="!border-transparent !bg-white/95 !text-slate-800 text-[11px] font-semibold shadow-sm backdrop-blur-sm dark:!bg-slate-900/90 dark:!text-slate-100"
            >
              {purposeLabel}
            </Badge>
            {listing.is_verified && (
              <Badge
                variant="secondary"
                className="gap-1 !border-transparent !bg-white/95 !text-slate-700 text-[10px] shadow-sm backdrop-blur-sm dark:!bg-slate-900/90 dark:!text-slate-200"
                aria-label="Verified listing"
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden />
                Verified
              </Badge>
            )}
          </div>
          {listing.is_tps_available && (
            <Badge className="absolute bottom-3 left-3 shadow-md">
              Rent-to-own
            </Badge>
          )}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleSaveClick}
            className="absolute right-3 top-3 h-9 w-9 rounded-full bg-white/95 shadow-sm backdrop-blur-sm hover:bg-white dark:bg-slate-900/90 dark:hover:bg-slate-800"
            aria-label="Save listing"
          >
            <Heart className="h-4 w-4 text-slate-600 dark:text-slate-300" aria-hidden />
          </Button>
        </div>

        {/* Content: type, title, meta, location, price, CTA */}
        <div className="p-4">
          {(propertyTypeLabel || listingTypeLabel) && (
            <p className="mb-1 text-[11px] font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">
              {[propertyTypeLabel, listingTypeLabel].filter(Boolean).join(" · ")}
            </p>
          )}
          <h2 className="font-display line-clamp-2 text-base font-semibold leading-snug text-slate-900 dark:text-slate-50">
            {listing.title}
          </h2>
          {meta && (
            <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">
              {meta}
            </p>
          )}
          <p className="mt-1 flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400" aria-hidden>
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            <span className="line-clamp-1">{listing.area}, {listing.city}</span>
          </p>
          <div className="mt-3 flex flex-wrap items-baseline justify-between gap-2">
            <p className="text-lg font-semibold text-slate-900 dark:text-slate-50">
              {formatPrice(displayPrice, currency)}
              {priceSuffix && (
                <span className="ml-1 text-sm font-normal text-slate-500 dark:text-slate-400">
                  {priceSuffix}
                </span>
              )}
            </p>
            <span className="text-sm font-medium text-primary">View details</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
