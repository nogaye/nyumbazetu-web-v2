"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { ListingFilters, PropertyType } from "@/lib/listings/types";
import { cn } from "@/lib/utils";

interface ListingsFilterBarProps {
  filters: ListingFilters;
}

const PROPERTY_TYPES: { value: PropertyType; label: string }[] = [
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
  { value: "1", label: "1 Bedroom" },
  { value: "2", label: "2 Bedrooms" },
  { value: "3+", label: "3+ Bedrooms" },
];

export function ListingsFilterBar({ filters }: ListingsFilterBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState<ListingFilters>(filters);

  // Sync local filters with URL params
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const updateFilters = (newFilters: Partial<ListingFilters>) => {
    const updated = { ...localFilters, ...newFilters, page: 1 }; // Reset to page 1 on filter change
    setLocalFilters(updated);
  };

  const applyFilters = () => {
    const params = new URLSearchParams();

    if (localFilters.city) params.set("city", localFilters.city);
    if (localFilters.area) params.set("area", localFilters.area);
    if (localFilters.minPrice !== undefined) params.set("minPrice", localFilters.minPrice.toString());
    if (localFilters.maxPrice !== undefined) params.set("maxPrice", localFilters.maxPrice.toString());
    if (localFilters.bedrooms !== undefined) params.set("bedrooms", localFilters.bedrooms.toString());
    if (localFilters.propertyType) params.set("propertyType", localFilters.propertyType);
    if (localFilters.tps === true) params.set("tps", "true");

    router.push(`/listings?${params.toString()}`);
    setMobileFiltersOpen(false);
  };

  const clearFilters = () => {
    router.push("/listings");
    setMobileFiltersOpen(false);
  };

  const hasActiveFilters = Object.keys(filters).some(
    (key) => key !== "page" && filters[key as keyof ListingFilters] !== undefined
  );

  const FilterContent = () => (
    <div className="space-y-4">
      {/* Location */}
      <div className="space-y-2">
        <label htmlFor="city" className="text-sm font-medium text-slate-700 dark:text-slate-300">
          City
        </label>
        <Input
          id="city"
          placeholder="e.g. Nairobi, Mombasa"
          value={localFilters.city || ""}
          onChange={(e) => updateFilters({ city: e.target.value || undefined })}
        />
      </div>

      {/* Area */}
      <div className="space-y-2">
        <label htmlFor="area" className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Area / Estate
        </label>
        <Input
          id="area"
          placeholder="e.g. Kilimani, Westlands"
          value={localFilters.area || ""}
          onChange={(e) => updateFilters({ area: e.target.value || undefined })}
        />
      </div>

      {/* Price Range */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="minPrice" className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Min Price (KES)
          </label>
          <Input
            id="minPrice"
            type="number"
            placeholder="0"
            value={localFilters.minPrice || ""}
            onChange={(e) =>
              updateFilters({
                minPrice: e.target.value ? parseInt(e.target.value, 10) : undefined,
              })
            }
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="maxPrice" className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Max Price (KES)
          </label>
          <Input
            id="maxPrice"
            type="number"
            placeholder="Any"
            value={localFilters.maxPrice || ""}
            onChange={(e) =>
              updateFilters({
                maxPrice: e.target.value ? parseInt(e.target.value, 10) : undefined,
              })
            }
          />
        </div>
      </div>

      {/* Bedrooms */}
      <div className="space-y-2">
        <label htmlFor="bedrooms" className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Bedrooms
        </label>
        <Select
          value={localFilters.bedrooms?.toString() || "all"}
          onValueChange={(value) =>
            updateFilters({
              bedrooms: value === "all" ? undefined : value === "3+" ? "3+" : parseInt(value, 10),
            })
          }
        >
          <SelectTrigger id="bedrooms">
            <SelectValue placeholder="Any" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any</SelectItem>
            {BEDROOM_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Property Type */}
      <div className="space-y-2">
        <label htmlFor="propertyType" className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Property Type
        </label>
        <Select
          value={localFilters.propertyType || "all"}
          onValueChange={(value) =>
            updateFilters({ propertyType: value === "all" ? undefined : (value as PropertyType) })
          }
        >
          <SelectTrigger id="propertyType">
            <SelectValue placeholder="Any" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any</SelectItem>
            {PROPERTY_TYPES.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* TPS Toggle */}
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="tps"
          checked={localFilters.tps === true}
          onChange={(e) => updateFilters({ tps: e.target.checked || undefined })}
          className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
        />
        <label htmlFor="tps" className="text-sm font-medium text-slate-700 dark:text-slate-300">
          TPS Available (Rent-to-own)
        </label>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 pt-2">
        <Button onClick={applyFilters} className="flex-1">
          Apply Filters
        </Button>
        {hasActiveFilters && (
          <Button variant="outline" onClick={clearFilters}>
            Clear
          </Button>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Filters */}
      <div className="sticky top-16 z-40 hidden border-b border-slate-200 bg-white/95 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-950/95 lg:block">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end gap-4">
            {/* City */}
            <div className="flex-1 min-w-[150px]">
              <label htmlFor="desktop-city" className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-400">
                City
              </label>
              <Input
                id="desktop-city"
                placeholder="City"
                value={localFilters.city || ""}
                onChange={(e) => updateFilters({ city: e.target.value || undefined })}
                className="h-10"
              />
            </div>

            {/* Area */}
            <div className="flex-1 min-w-[150px]">
              <label htmlFor="desktop-area" className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-400">
                Area
              </label>
              <Input
                id="desktop-area"
                placeholder="Area / Estate"
                value={localFilters.area || ""}
                onChange={(e) => updateFilters({ area: e.target.value || undefined })}
                className="h-10"
              />
            </div>

            {/* Min Price */}
            <div className="w-32">
              <label htmlFor="desktop-minPrice" className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-400">
                Min Price
              </label>
              <Input
                id="desktop-minPrice"
                type="number"
                placeholder="Min"
                value={localFilters.minPrice || ""}
                onChange={(e) =>
                  updateFilters({
                    minPrice: e.target.value ? parseInt(e.target.value, 10) : undefined,
                  })
                }
                className="h-10"
              />
            </div>

            {/* Max Price */}
            <div className="w-32">
              <label htmlFor="desktop-maxPrice" className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-400">
                Max Price
              </label>
              <Input
                id="desktop-maxPrice"
                type="number"
                placeholder="Max"
                value={localFilters.maxPrice || ""}
                onChange={(e) =>
                  updateFilters({
                    maxPrice: e.target.value ? parseInt(e.target.value, 10) : undefined,
                  })
                }
                className="h-10"
              />
            </div>

            {/* Bedrooms */}
            <div className="w-36">
              <label htmlFor="desktop-bedrooms" className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-400">
                Bedrooms
              </label>
              <Select
                value={localFilters.bedrooms?.toString() || "all"}
                onValueChange={(value) =>
                  updateFilters({
                    bedrooms: value === "all" ? undefined : value === "3+" ? "3+" : parseInt(value, 10),
                  })
                }
              >
                <SelectTrigger id="desktop-bedrooms" className="h-10">
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any</SelectItem>
                  {BEDROOM_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Property Type */}
            <div className="w-40">
              <label htmlFor="desktop-propertyType" className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-400">
                Type
              </label>
              <Select
                value={localFilters.propertyType || "all"}
                onValueChange={(value) =>
                  updateFilters({ propertyType: value === "all" ? undefined : (value as PropertyType) })
                }
              >
                <SelectTrigger id="desktop-propertyType" className="h-10">
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any</SelectItem>
                  {PROPERTY_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* TPS Checkbox */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="desktop-tps"
                checked={localFilters.tps === true}
                onChange={(e) => updateFilters({ tps: e.target.checked || undefined })}
                className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
              />
              <label htmlFor="desktop-tps" className="text-sm font-medium text-slate-700 dark:text-slate-300 whitespace-nowrap">
                TPS
              </label>
            </div>

            {/* Search Button */}
            <Button onClick={applyFilters} className="h-10">
              Search
            </Button>

            {/* Clear Button */}
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="icon"
                onClick={clearFilters}
                className="h-10 w-10"
                aria-label="Clear filters"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Button */}
      <div className="sticky top-16 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-950/95 lg:hidden">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
          <Button
            variant="outline"
            onClick={() => setMobileFiltersOpen(true)}
            className="w-full justify-between"
          >
            <span className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filters
              {hasActiveFilters && (
                <span className="ml-2 rounded-full bg-primary px-2 py-0.5 text-xs text-white">
                  {Object.keys(filters).filter((k) => k !== "page" && filters[k as keyof ListingFilters] !== undefined).length}
                </span>
              )}
            </span>
          </Button>
        </div>
      </div>

      {/* Mobile Filters Sheet */}
      <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
        <SheetClose onClick={() => setMobileFiltersOpen(false)} />
        <SheetHeader>
          <SheetTitle>Filter Listings</SheetTitle>
        </SheetHeader>
        <div className="p-6">
          <FilterContent />
        </div>
      </Sheet>
    </>
  );
}

