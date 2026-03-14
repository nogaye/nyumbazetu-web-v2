"use client";

/**
 * Listing amenities section: two-column list with icons and "Show all X amenities" expand.
 * Used on the listing detail page below the photo gallery.
 */

import { useState } from "react";
import {
  Wifi,
  Car,
  Tv,
  ChefHat,
  Briefcase,
  Waves,
  TreePine,
  Dog,
  Camera,
  Flame,
  Snowflake,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

/** Default amenity label to Lucide icon mapping for display. */
const AMENITY_ICONS: Record<string, LucideIcon> = {
  wifi: Wifi,
  "free parking": Car,
  parking: Car,
  tv: Tv,
  kitchen: ChefHat,
  "dedicated workspace": Briefcase,
  workspace: Briefcase,
  waterfront: Waves,
  pool: Waves,
  "hot tub": Flame,
  "air conditioning": Snowflake,
  heating: Flame,
  "pets allowed": Dog,
  pets: Dog,
  "security cameras": Camera,
  cameras: Camera,
  garden: TreePine,
  "24/7": ShieldCheck,
  security: ShieldCheck,
};

/** Resolve icon for an amenity label (case-insensitive match on keys). */
function getAmenityIcon(label: string): LucideIcon {
  const key = label.toLowerCase().trim();
  for (const [k, Icon] of Object.entries(AMENITY_ICONS)) {
    if (key.includes(k) || k.includes(key)) return Icon;
  }
  return Tv; // fallback
}

export interface ListingAmenitiesProps {
  /** List of amenity display names from the database. Pass [] when none; no default list is shown. */
  amenities?: string[];
  /** Max number of amenities to show before "Show all X amenities". Default 10. */
  initialCount?: number;
  className?: string;
}

/**
 * Renders a "What this place offers" section with amenities from the database only.
 * Uses only the passed list; empty or undefined shows no section (no default amenities).
 */
export function ListingAmenities({
  amenities,
  initialCount = 10,
  className,
}: ListingAmenitiesProps) {
  const [showAll, setShowAll] = useState(false);
  const list = amenities ?? [];
  const total = list.length;
  const visible = showAll ? total : Math.min(initialCount, total);
  const hasMore = total > initialCount;

  if (total === 0) return null;

  return (
    <section className={cn("", className)} aria-labelledby="amenities-heading">
      <h2
        id="amenities-heading"
        className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-4"
      >
        What this place offers
      </h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
        {list.slice(0, visible).map((label, i) => {
          const Icon = getAmenityIcon(label);
          return (
            <li
              key={`${label}-${i}`}
              className="flex items-start gap-3 text-slate-700 dark:text-slate-300"
            >
              <Icon
                className="h-5 w-5 shrink-0 text-slate-500 dark:text-slate-400 mt-0.5"
                aria-hidden
              />
              <span className="text-sm">{label}</span>
            </li>
          );
        })}
      </ul>
      {hasMore && !showAll && (
        <button
          type="button"
          onClick={() => setShowAll(true)}
          className="mt-4 text-sm font-medium text-slate-700 underline underline-offset-2 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100"
        >
          Show all {total} amenities
        </button>
      )}
    </section>
  );
}
