"use client";

/**
 * Left-column filter controls for the vendor directory (client-side mock filtering).
 * No URL sync yet: keeps implementation small until search APIs exist.
 */

import { useMemo } from "react";
import { FunnelIcon } from "@heroicons/react/24/outline";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  SERVICE_CATEGORY_SLUGS,
  categoryLabelFromSlug,
} from "@/lib/services/vendors-mock";
import type { VendorRecord } from "@/lib/services/vendors-mock";
import { cn } from "@/lib/utils";

/** All distinct location strings from the current vendor list (mock-derived options). */
function uniqueLocations(vendors: VendorRecord[]): string[] {
  return Array.from(new Set(vendors.map((v) => v.location))).sort();
}

export interface FilterSidebarProps {
  /** Full mock list; parent passes same array as the grid. */
  vendors: VendorRecord[];
  /** Currently selected category slug or "all". */
  category: string;
  /** Called when category changes. */
  onCategoryChange: (value: string) => void;
  /** Selected location or "all". */
  location: string;
  /** Called when location changes. */
  onLocationChange: (value: string) => void;
  /** Minimum star rating filter (inclusive). */
  minRating: number;
  /** Called when minimum rating changes. */
  onMinRatingChange: (value: number) => void;
  /** When true, only verified vendors pass the filter. */
  verifiedOnly: boolean;
  /** Toggle verified-only. */
  onVerifiedOnlyChange: (value: boolean) => void;
  /** Optional UI-only availability preset (not tied to data). */
  availability: string;
  /** Updates availability preset. */
  onAvailabilityChange: (value: string) => void;
  /** Optional class on aside. */
  className?: string;
}

/**
 * Renders category select, location select, rating radios, verified toggle, availability select.
 * @param props - Filter state and callbacks from parent directory client.
 */
export function FilterSidebar({
  vendors,
  category,
  onCategoryChange,
  location,
  onLocationChange,
  minRating,
  onMinRatingChange,
  verifiedOnly,
  onVerifiedOnlyChange,
  availability,
  onAvailabilityChange,
  className,
}: FilterSidebarProps) {
  const locations = useMemo(() => uniqueLocations(vendors), [vendors]);

  return (
    <aside
      className={cn(
        "rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm dark:border-slate-700/90 dark:bg-slate-900/45",
        className,
      )}
      aria-label="Filter vendors"
    >
      <div className="flex items-center gap-2 border-b border-slate-100 pb-4 dark:border-slate-800">
        <FunnelIcon className="h-5 w-5 text-primary" aria-hidden />
        <h2 className="font-display text-lg font-semibold text-secondary dark:text-slate-100">
          Filters
        </h2>
      </div>

      <div className="mt-5 space-y-5">
        <div>
          <Label htmlFor="filter-category" className="text-slate-700 dark:text-slate-200">
            Category
          </Label>
          <select
            id="filter-category"
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:border-slate-600 dark:bg-slate-950 dark:text-slate-100"
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
          >
            <option value="all">All categories</option>
            {SERVICE_CATEGORY_SLUGS.map((slug) => (
              <option key={slug} value={slug}>
                {categoryLabelFromSlug(slug)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <Label htmlFor="filter-location" className="text-slate-700 dark:text-slate-200">
            Location
          </Label>
          <select
            id="filter-location"
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:border-slate-600 dark:bg-slate-950 dark:text-slate-100"
            value={location}
            onChange={(e) => onLocationChange(e.target.value)}
          >
            <option value="all">All areas</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        <fieldset>
          <legend className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Minimum rating
          </legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {[0, 3, 4, 4.5].map((r) => (
              <label
                key={r}
                className={cn(
                  "cursor-pointer rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                  minRating === r
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-slate-200 text-slate-600 hover:border-primary/40 dark:border-slate-600 dark:text-slate-300",
                )}
              >
                <input
                  type="radio"
                  className="sr-only"
                  name="min-rating"
                  checked={minRating === r}
                  onChange={() => onMinRatingChange(r)}
                />
                {r === 0 ? "Any" : `${r}+`}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="flex items-center gap-3 rounded-xl border border-slate-100 px-3 py-3 dark:border-slate-800">
          <Checkbox
            id="verified-only"
            checked={verifiedOnly}
            onCheckedChange={(v) => onVerifiedOnlyChange(v === true)}
          />
          <Label
            htmlFor="verified-only"
            className="cursor-pointer text-sm font-normal text-slate-700 dark:text-slate-200"
          >
            Verified vendors only
          </Label>
        </div>

        <div>
          <Label htmlFor="filter-availability" className="text-slate-700 dark:text-slate-200">
            Availability (preview)
          </Label>
          <select
            id="filter-availability"
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:border-slate-600 dark:bg-slate-950 dark:text-slate-100"
            value={availability}
            onChange={(e) => onAvailabilityChange(e.target.value)}
          >
            <option value="any">Any</option>
            <option value="today">Today</option>
            <option value="week">This week</option>
          </select>
          <p className="mt-1 text-xs text-muted-foreground">
            UI placeholder; real availability will come from vendor calendars.
          </p>
        </div>
      </div>
    </aside>
  );
}
