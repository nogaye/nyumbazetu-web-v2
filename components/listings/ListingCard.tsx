"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { ListingWithCoverImage } from "@/lib/listings/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ListingCardProps {
  listing: ListingWithCoverImage;
}

export function ListingCard({ listing }: ListingCardProps) {
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatBedrooms = (bedrooms: number): string => {
    if (bedrooms === 0) return "Studio";
    if (bedrooms === 1) return "1 bed";
    return `${bedrooms} beds`;
  };

  return (
    <Link href={`/listings/${listing.slug}`} className="group block">
      <article
        className={cn(
          "relative overflow-hidden rounded-2xl border border-slate-100 bg-white",
          "transition-all duration-300 hover:shadow-md",
          "dark:border-slate-800 dark:bg-slate-900"
        )}
      >
        {/* Image Section */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
          <Image
            src={listing.cover_image_url}
            alt={listing.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            placeholder={listing.blur_data_url ? "blur" : "empty"}
            blurDataURL={listing.blur_data_url}
            loading="lazy"
          />

          {/* Verified Badge */}
          {listing.is_verified && (
            <div className="absolute left-3 top-3 rounded-full bg-white/90 px-2 py-1 text-xs font-medium text-primary shadow-sm backdrop-blur-sm dark:bg-slate-900/90">
              Verified
            </div>
          )}

          {/* Save Button */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-3 top-3 h-9 w-9 rounded-full bg-white/90 shadow-sm backdrop-blur-sm hover:bg-white dark:bg-slate-900/90 dark:hover:bg-slate-800"
            aria-label="Save listing"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // TODO: Implement save/favorite functionality
            }}
          >
            <Heart className="h-4 w-4 text-slate-700 dark:text-slate-300" />
          </Button>

          {/* TPS Badge */}
          {listing.is_tps_available && (
            <div className="absolute bottom-3 left-3 rounded-full bg-primary/90 px-2 py-1 text-xs font-medium text-white shadow-sm backdrop-blur-sm">
              TPS Available
            </div>
          )}
        </div>

        {/* Text Section */}
        <div className="p-4">
          {/* First Row: Title and Price */}
          <div className="mb-2 flex items-start justify-between gap-2">
            <h3 className="line-clamp-1 flex-1 text-sm font-semibold text-secondary dark:text-slate-50 md:text-base">
              {listing.title}
            </h3>
            <div className="flex-shrink-0 text-sm font-semibold text-primary md:text-base">
              {formatPrice(listing.monthly_rent)}
              <span className="text-xs font-normal text-slate-500">/mo</span>
            </div>
          </div>

          {/* Second Row: Meta */}
          <div className="mb-2 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span>{formatBedrooms(listing.bedrooms)}</span>
            <span>•</span>
            <span>{listing.bathrooms} {listing.bathrooms === 1 ? "bath" : "baths"}</span>
            {listing.size_sqm && (
              <>
                <span>•</span>
                <span>{listing.size_sqm} m²</span>
              </>
            )}
          </div>

          {/* Third Row: Location */}
          <p className="line-clamp-1 text-[11px] text-slate-400 dark:text-slate-500">
            {listing.area}, {listing.city}
          </p>
        </div>
      </article>
    </Link>
  );
}

