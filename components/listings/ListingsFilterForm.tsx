"use client";

/**
 * Reusable filter form for the listings marketplace.
 * Used in the desktop sidebar and mobile sheet. Syncs with URL via parent state/apply.
 */

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ListingFilters, PropertyType } from "@/lib/listings/types";

/** Filter options for property type (includes display-only types beyond strict DB enum). */
const PROPERTY_TYPES: { value: string; label: string }[] = [
  { value: "apartment", label: "Apartment" },
  { value: "maisonette", label: "Maisonette" },
  { value: "bedsitter", label: "Bedsitter" },
  { value: "house", label: "House" },
  { value: "studio", label: "Studio" },
  { value: "office", label: "Office" },
  { value: "shop", label: "Shop" },
];

const BEDROOM_OPTIONS = [
  { value: "0", label: "Studio" },
  { value: "1", label: "1 Bed" },
  { value: "2", label: "2 Beds" },
  { value: "3+", label: "3+ Beds" },
];

interface ListingsFilterFormProps {
  /** Initial filters from URL (server-parsed). */
  filters: ListingFilters;
  /** Optional compact layout for sidebar (smaller labels, tighter spacing). */
  variant?: "default" | "compact";
  /** Optional class for the root. */
  className?: string;
}

export function ListingsFilterForm({
  filters,
  variant = "default",
  className,
}: ListingsFilterFormProps) {
  const router = useRouter();
  const [localFilters, setLocalFilters] = useState<ListingFilters>(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const updateFilters = (newFilters: Partial<ListingFilters>) => {
    setLocalFilters((prev) => ({ ...prev, ...newFilters, page: 1 }));
  };

  const applyFilters = () => {
    const params = new URLSearchParams();
    if (localFilters.city) params.set("city", localFilters.city);
    if (localFilters.area) params.set("area", localFilters.area);
    if (localFilters.minPrice !== undefined)
      params.set("minPrice", localFilters.minPrice.toString());
    if (localFilters.maxPrice !== undefined)
      params.set("maxPrice", localFilters.maxPrice.toString());
    if (localFilters.bedrooms !== undefined)
      params.set("bedrooms", localFilters.bedrooms.toString());
    if (localFilters.propertyType)
      params.set("propertyType", localFilters.propertyType);
    if (localFilters.tps === true) params.set("tps", "true");
    router.push(`/listings?${params.toString()}`);
  };

  const clearFilters = () => {
    router.push("/listings");
  };

  const hasActiveFilters = Object.keys(filters).some(
    (key) =>
      key !== "page" && filters[key as keyof ListingFilters] !== undefined
  );

  const isCompact = variant === "compact";
  const labelClass = isCompact
    ? "text-xs font-medium text-slate-500 dark:text-slate-400"
    : "text-sm font-medium text-slate-700 dark:text-slate-300";
  const spaceY = isCompact ? "space-y-3" : "space-y-4";

  return (
    <div className={className}>
      <div className={spaceY}>
        <div className="space-y-1.5">
          <label htmlFor="listings-city" className={labelClass}>
            City
          </label>
          <Input
            id="listings-city"
            placeholder="Nairobi, Mombasa…"
            value={localFilters.city || ""}
            onChange={(e) =>
              updateFilters({ city: e.target.value || undefined })
            }
            className={isCompact ? "h-9 text-sm" : ""}
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="listings-area" className={labelClass}>
            Area / Estate
          </label>
          <Input
            id="listings-area"
            placeholder="Kilimani, Westlands…"
            value={localFilters.area || ""}
            onChange={(e) =>
              updateFilters({ area: e.target.value || undefined })
            }
            className={isCompact ? "h-9 text-sm" : ""}
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1.5">
            <label
              htmlFor="listings-minPrice"
              className={labelClass}
            >
              Min (KES)
            </label>
            <Input
              id="listings-minPrice"
              type="number"
              placeholder="0"
              value={localFilters.minPrice ?? ""}
              onChange={(e) =>
                updateFilters({
                  minPrice: e.target.value
                    ? parseInt(e.target.value, 10)
                    : undefined,
                })
              }
              className={isCompact ? "h-9 text-sm" : ""}
            />
          </div>
          <div className="space-y-1.5">
            <label
              htmlFor="listings-maxPrice"
              className={labelClass}
            >
              Max (KES)
            </label>
            <Input
              id="listings-maxPrice"
              type="number"
              placeholder="Any"
              value={localFilters.maxPrice ?? ""}
              onChange={(e) =>
                updateFilters({
                  maxPrice: e.target.value
                    ? parseInt(e.target.value, 10)
                    : undefined,
                })
              }
              className={isCompact ? "h-9 text-sm" : ""}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="listings-bedrooms" className={labelClass}>
            Bedrooms
          </label>
          <Select
            value={localFilters.bedrooms?.toString() ?? "all"}
            onValueChange={(value) =>
              updateFilters({
                bedrooms:
                  value === "all"
                    ? undefined
                    : value === "3+"
                      ? "3+"
                      : parseInt(value, 10),
              })
            }
          >
            <SelectTrigger
              id="listings-bedrooms"
              className={isCompact ? "h-9 text-sm" : ""}
            >
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any</SelectItem>
              {BEDROOM_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="listings-type" className={labelClass}>
            Type
          </label>
          <Select
            value={localFilters.propertyType ?? "all"}
            onValueChange={(value) =>
              updateFilters({
                propertyType:
                  value === "all" ? undefined : (value as PropertyType),
              })
            }
          >
            <SelectTrigger
              id="listings-type"
              className={isCompact ? "h-9 text-sm" : ""}
            >
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any</SelectItem>
              {PROPERTY_TYPES.map((t) => (
                <SelectItem key={t.value} value={t.value}>
                  {t.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={localFilters.tps === true}
            onChange={(e) =>
              updateFilters({ tps: e.target.checked || undefined })
            }
            className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
          />
          <span className={labelClass}>TPS (Rent-to-own)</span>
        </label>

        <div className="flex gap-2 pt-1">
          <Button
            onClick={applyFilters}
            className="flex-1"
            size={isCompact ? "sm" : "default"}
          >
            Apply
          </Button>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size={isCompact ? "sm" : "default"}
              onClick={clearFilters}
            >
              Clear
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
