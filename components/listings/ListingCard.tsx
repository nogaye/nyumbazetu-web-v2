"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ListingWithCoverImage } from "@/lib/listings/types";
import { PropertyImage } from "@/components/listings/PropertyImage";
import { fadeInUp, springTransition } from "@/lib/motion";

/**
 * Minimalist marketplace card: image-first, clear price, one-line meta.
 * Used on the listings grid; links to the listing detail page.
 */
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
          {/* Image: dominant, no heavy badges */}
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
            {listing.is_verified && (
              <span
                className="absolute left-2.5 top-2.5 rounded-md bg-white/95 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-slate-600 dark:bg-slate-900/95 dark:text-slate-400"
                aria-label="Verified listing"
              >
                Verified
              </span>
            )}
            {listing.is_tps_available && (
              <span className="absolute bottom-2.5 left-2.5 rounded-md bg-primary px-2 py-0.5 text-[10px] font-medium text-primary-foreground">
                TPS
              </span>
            )}
          </div>

          {/* Copy: title, meta, location, price */}
          <div className="p-3.5">
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
              {formatPrice(listing.monthly_rent)}
              <span className="ml-0.5 text-xs font-normal text-slate-500">
                /mo
              </span>
            </p>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}
