"use client";

/**
 * Client wrapper for `/services/vendors`: applies sidebar filters to mock vendors
 * and renders the responsive directory grid.
 */

import { useMemo, useState } from "react";
import type { VendorRecord } from "@/lib/services/vendors-mock";
import {
  categoryLabelFromSlug,
  isServiceCategorySlug,
} from "@/lib/services/vendors-mock";
import { VendorCard } from "@/components/services/vendor-card";
import { FilterSidebar } from "@/components/services/filter-sidebar";

export interface VendorsDirectoryClientProps {
  /** Complete mock vendor list from the server module. */
  vendors: VendorRecord[];
}

/**
 * Owns filter state, derives filtered list, and lays out sidebar + grid.
 * @param props - All vendors for filtering and display.
 */
export function VendorsDirectoryClient({ vendors }: VendorsDirectoryClientProps) {
  const [category, setCategory] = useState<string>("all");
  const [location, setLocation] = useState<string>("all");
  const [minRating, setMinRating] = useState(0);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [availability, setAvailability] = useState("any");

  const filtered = useMemo(() => {
    return vendors.filter((v) => {
      if (category !== "all") {
        if (!isServiceCategorySlug(category)) return false;
        const label = categoryLabelFromSlug(category);
        if (!v.categories.some((c) => c.toLowerCase() === label.toLowerCase())) {
          return false;
        }
      }
      if (location !== "all" && v.location !== location) return false;
      if (v.rating < minRating) return false;
      if (verifiedOnly && !v.verified) return false;
      return true;
    });
  }, [vendors, category, location, minRating, verifiedOnly]);

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,260px)_1fr] lg:items-start">
      <FilterSidebar
        vendors={vendors}
        category={category}
        onCategoryChange={setCategory}
        location={location}
        onLocationChange={setLocation}
        minRating={minRating}
        onMinRatingChange={setMinRating}
        verifiedOnly={verifiedOnly}
        onVerifiedOnlyChange={setVerifiedOnly}
        availability={availability}
        onAvailabilityChange={setAvailability}
        className="lg:sticky lg:top-24"
      />
      <div>
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-medium text-foreground">{filtered.length}</span>{" "}
          vendors
          {availability !== "any" && (
            <span className="sr-only">; availability filter is preview-only</span>
          )}
        </p>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-2">
          {filtered.map((v) => (
            <VendorCard key={v.slug} vendor={v} showRequestCta />
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="mt-10 rounded-2xl border border-dashed border-slate-300 p-8 text-center text-muted-foreground dark:border-slate-600">
            No vendors match these filters. Try clearing category or rating.
          </p>
        )}
      </div>
    </div>
  );
}
