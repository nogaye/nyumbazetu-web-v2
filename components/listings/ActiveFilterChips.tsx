"use client";

/**
 * Active filter chips for the listings page.
 * Shows applied filters as removable chips and a "Clear all" action for quick refinement
 * without reopening the sidebar. Used above the listing grid; supports sticky placement on desktop.
 */

import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ListingFilters } from "@/lib/listings/types";
import { cn } from "@/lib/utils";

export interface ActiveFilterChipsProps {
  /** Current filters from URL (server-parsed). Only non-empty values are shown as chips. */
  filters: ListingFilters;
  /** Optional class for the container. */
  className?: string;
}

/** Human-readable label for a filter key and value. */
function getChipLabel(key: keyof ListingFilters, value: unknown): string {
  if (value === undefined || value === null) return "";
  switch (key) {
    case "city":
      return value as string;
    case "area":
      return value as string;
    case "listingPurpose":
      return value === "short_stay" ? "Short stay" : String(value).charAt(0).toUpperCase() + String(value).slice(1);
    case "minPrice":
      return `Min ${new Intl.NumberFormat("en-KE", { style: "currency", currency: "KES", maximumFractionDigits: 0 }).format(value as number)}`;
    case "maxPrice":
      return `Max ${new Intl.NumberFormat("en-KE", { style: "currency", currency: "KES", maximumFractionDigits: 0 }).format(value as number)}`;
    case "bedrooms":
      return value === "3+" ? "3+ Beds" : `${value} Bed${(value as number) === 1 ? "" : "s"}`;
    case "propertyType":
      return String(value).charAt(0).toUpperCase() + String(value).slice(1);
    case "tps":
      return value ? "Rent-to-own" : "";
    default:
      return String(value);
  }
}

/**
 * Renders a row of chips for each active filter (except page, sort, search).
 * Each chip removes that single filter on click; "Clear all" resets to /listings.
 */
export function ActiveFilterChips({ filters, className }: ActiveFilterChipsProps) {
  const router = useRouter();

  const chipKeys: (keyof ListingFilters)[] = [
    "city",
    "area",
    "listingPurpose",
    "minPrice",
    "maxPrice",
    "bedrooms",
    "propertyType",
    "tps",
  ];
  const entries = chipKeys
    .filter((key) => {
      const v = filters[key];
      if (key === "tps") return v === true;
      return v !== undefined && v !== null && v !== "";
    })
    .map((key) => ({ key, value: filters[key], label: getChipLabel(key, filters[key]) }))
    .filter((e) => e.label);

  const removeFilter = (key: keyof ListingFilters) => {
    const params = new URLSearchParams();
    (Object.keys(filters) as (keyof ListingFilters)[]).forEach((k) => {
      if (k === key || k === "page") return;
      const v = filters[k];
      if (v !== undefined && v !== null && v !== "")
        params.set(k, String(v));
    });
    router.push(`/listings/search?${params.toString()}`);
  };

  const clearAll = () => {
    router.push("/listings/search");
  };

  if (entries.length === 0) return null;

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-2",
        className
      )}
      role="group"
      aria-label="Active filters"
    >
      {entries.map(({ key, label }) => (
        <Button
          key={key}
          type="button"
          variant="outline"
          size="sm"
          onClick={() => removeFilter(key)}
          className="h-auto gap-1.5 rounded-full border-slate-200 px-3 py-1.5 text-xs font-medium dark:border-slate-700 dark:bg-slate-800/80 dark:hover:bg-slate-700/80"
          aria-label={`Remove filter: ${label}`}
        >
          <span>{label}</span>
          <X className="h-3.5 w-3.5 shrink-0 opacity-70" aria-hidden />
        </Button>
      ))}
      <Button
        variant="ghost"
        size="sm"
        onClick={clearAll}
        className="h-8 text-xs font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
        aria-label="Clear all filters"
      >
        Clear all
      </Button>
    </div>
  );
}
