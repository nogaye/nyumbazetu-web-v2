"use client";

/**
 * Location card for the listings marketplace: shows a location/neighborhood with
 * listing count and optional image. Used on the listings homepage for "Popular locations".
 */

import Link from "next/link";
import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

export interface LocationCardProps {
  /** Display name (e.g. "Kilimani", "Westlands"). */
  name: string;
  /** Optional sublabel (e.g. "Nairobi"). */
  sublabel?: string;
  /** Number of listings to show; drives "X properties" text. */
  count: number;
  /** Link href (e.g. /listings/search?city=nairobi&area=kilimani). */
  href: string;
  /** Optional image URL for the card background. */
  imageUrl?: string;
  /** Optional class for the root. */
  className?: string;
}

/**
 * Renders a card that links to search results for the given location.
 * Image-forward when imageUrl is provided; otherwise a clean text card.
 */
export function LocationCard({
  name,
  sublabel,
  count,
  href,
  imageUrl,
  className,
}: LocationCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group block overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm",
        "transition-all duration-200 hover:shadow-md hover:border-slate-300/80",
        "dark:border-slate-700/80 dark:bg-slate-900/60 dark:hover:border-slate-600/80",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#344767] focus-visible:ring-offset-2",
        className
      )}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt=""
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <MapPin className="h-12 w-12 text-slate-300 dark:text-slate-600" aria-hidden />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <p className="font-display text-lg font-semibold">{name}</p>
          {sublabel && (
            <p className="mt-0.5 text-sm text-white/90">{sublabel}</p>
          )}
          <p className="mt-1 text-xs font-medium text-white/90">
            {count} {count === 1 ? "property" : "properties"}
          </p>
        </div>
      </div>
    </Link>
  );
}
