"use client";

/**
 * Client shell for `/services/property-managers`: filter state, featured strip, sortable
 * directory (grid/list), and profile sheet. Filtering and sorting run entirely on the mock
 * corpus passed from the server page.
 */

import { useMemo, useState } from "react";
import Link from "next/link";
import { Squares2X2Icon, Bars3BottomLeftIcon } from "@heroicons/react/24/outline";
import type {
  PortfolioSizeBucket,
  PropertyManagerPricingModel,
  PropertyManagerRecord,
} from "@/lib/services/property-managers-mock";
import { portfolioBucketForUnits } from "@/lib/services/property-managers-mock";
import { FeaturedPropertyManagerCard } from "@/components/services/featured-property-manager-card";
import { PropertyManagerDirectoryCard } from "@/components/services/property-manager-directory-card";
import { PropertyManagerMarketplaceFilters } from "@/components/services/property-manager-marketplace-filters";
import { PropertyManagerProfileSheet } from "@/components/services/property-manager-profile-sheet";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

/** Sort modes advertised in the marketplace UI. */
export type PropertyManagerSortOption =
  | "recommended"
  | "rating"
  | "reviews"
  | "response"
  | "portfolio"
  | "newest";

export interface PropertyManagersMarketplaceClientProps {
  /** Full mock manager list from the server module. */
  managers: PropertyManagerRecord[];
}

/**
 * Applies sidebar-style filters to the mock corpus (client-side).
 */
function filterPropertyManagers(
  managers: PropertyManagerRecord[],
  opts: {
    area: string;
    propertyType: string;
    pricingModel: "all" | PropertyManagerPricingModel;
    minRating: number;
    serviceOffered: string;
    portfolioSize: PortfolioSizeBucket;
    verifiedOnly: boolean;
  },
): PropertyManagerRecord[] {
  return managers.filter((m) => {
    if (opts.verifiedOnly && !m.verified) return false;
    if (m.rating < opts.minRating) return false;
    if (opts.pricingModel !== "all" && m.pricingModel !== opts.pricingModel) return false;
    if (opts.propertyType !== "all" && !m.propertyTypes.includes(opts.propertyType)) {
      return false;
    }
    if (opts.area !== "all" && !m.serviceAreas.includes(opts.area)) return false;
    if (opts.serviceOffered !== "all" && !m.servicesOffered.includes(opts.serviceOffered)) {
      return false;
    }
    if (opts.portfolioSize !== "any") {
      const bucket = portfolioBucketForUnits(m.unitsManaged);
      if (bucket !== opts.portfolioSize) return false;
    }
    return true;
  });
}

/**
 * Stable sort helpers for the directory list.
 */
function sortPropertyManagers(
  list: PropertyManagerRecord[],
  sort: PropertyManagerSortOption,
): PropertyManagerRecord[] {
  const out = [...list];
  switch (sort) {
    case "recommended":
      return out.sort((a, b) => {
        if (a.featured !== b.featured) return a.featured ? -1 : 1;
        if (b.rating !== a.rating) return b.rating - a.rating;
        return b.reviewCount - a.reviewCount;
      });
    case "rating":
      return out.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
    case "reviews":
      return out.sort((a, b) => b.reviewCount - a.reviewCount);
    case "response":
      return out.sort((a, b) => a.responseHours - b.responseHours);
    case "portfolio":
      return out.sort((a, b) => b.unitsManaged - a.unitsManaged);
    case "newest":
      return out.sort((a, b) => b.marketplaceJoinOrder - a.marketplaceJoinOrder);
    default:
      return out;
  }
}

/**
 * Renders filters, featured managers, and the interactive directory.
 * @param props - Mock managers from `MOCK_PROPERTY_MANAGERS`.
 */
export function PropertyManagersMarketplaceClient({
  managers,
}: PropertyManagersMarketplaceClientProps) {
  const [area, setArea] = useState("all");
  const [propertyType, setPropertyType] = useState("all");
  const [pricingModel, setPricingModel] = useState<"all" | PropertyManagerPricingModel>("all");
  const [minRating, setMinRating] = useState(0);
  const [serviceOffered, setServiceOffered] = useState("all");
  const [portfolioSize, setPortfolioSize] = useState<PortfolioSizeBucket>("any");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sort, setSort] = useState<PropertyManagerSortOption>("recommended");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedManager, setSelectedManager] = useState<PropertyManagerRecord | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);

  const featuredManagers = useMemo(
    () => managers.filter((m) => m.featured),
    [managers],
  );

  const filtered = useMemo(
    () =>
      filterPropertyManagers(managers, {
        area,
        propertyType,
        pricingModel,
        minRating,
        serviceOffered,
        portfolioSize,
        verifiedOnly,
      }),
    [
      managers,
      area,
      propertyType,
      pricingModel,
      minRating,
      serviceOffered,
      portfolioSize,
      verifiedOnly,
    ],
  );

  const sorted = useMemo(() => sortPropertyManagers(filtered, sort), [filtered, sort]);

  /**
   * Opens the profile sheet for the chosen manager.
   * @param m - Record to display in the sheet.
   */
  function openProfile(m: PropertyManagerRecord) {
    setSelectedManager(m);
    setProfileOpen(true);
  }

  /**
   * Syncs sheet visibility with parent state and clears selection when dismissed.
   * @param open - Next open state from the sheet primitive.
   */
  function handleProfileOpenChange(open: boolean) {
    setProfileOpen(open);
    if (!open) setSelectedManager(null);
  }

  return (
    <>
      <div className="mx-auto max-w-7xl space-y-16 px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <PropertyManagerMarketplaceFilters
          managers={managers}
          area={area}
          onAreaChange={setArea}
          propertyType={propertyType}
          onPropertyTypeChange={setPropertyType}
          pricingModel={pricingModel}
          onPricingModelChange={setPricingModel}
          minRating={minRating}
          onMinRatingChange={setMinRating}
          serviceOffered={serviceOffered}
          onServiceOfferedChange={setServiceOffered}
          portfolioSize={portfolioSize}
          onPortfolioSizeChange={setPortfolioSize}
          verifiedOnly={verifiedOnly}
          onVerifiedOnlyChange={setVerifiedOnly}
        />

        <section aria-labelledby="featured-pm-heading">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2
                id="featured-pm-heading"
                className="font-display text-2xl font-bold text-secondary dark:text-slate-100 sm:text-3xl"
              >
                Featured property managers
              </h2>
              <p className="mt-2 max-w-xl text-muted-foreground">
                Curated operators with strong coverage and clear positioning (mock preview).
              </p>
            </div>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredManagers.map((m) => (
              <FeaturedPropertyManagerCard key={m.id} manager={m} onViewProfile={openProfile} />
            ))}
          </div>
        </section>

        <section id="browse-managers" aria-labelledby="directory-pm-heading">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2
                id="directory-pm-heading"
                className="font-display text-2xl font-bold text-secondary dark:text-slate-100 sm:text-3xl"
              >
                Browse property managers
              </h2>
              <p className="mt-2 text-muted-foreground">
                Showing{" "}
                <span className="font-medium text-foreground">{sorted.length}</span> firms matching
                your filters.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
              <div className="space-y-2 sm:w-56">
                <Label htmlFor="pm-sort">Sort by</Label>
                <Select
                  value={sort}
                  onValueChange={(v) => setSort(v as PropertyManagerSortOption)}
                >
                  <SelectTrigger id="pm-sort">
                    <SelectValue placeholder="Sort" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recommended">Recommended</SelectItem>
                    <SelectItem value="rating">Highest rated</SelectItem>
                    <SelectItem value="reviews">Most reviewed</SelectItem>
                    <SelectItem value="response">Fastest response</SelectItem>
                    <SelectItem value="portfolio">Largest portfolio</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex rounded-lg border border-slate-200 p-1 dark:border-slate-700">
                <Button
                  type="button"
                  variant={viewMode === "grid" ? "secondary" : "ghost"}
                  size="sm"
                  className="gap-2"
                  onClick={() => setViewMode("grid")}
                  aria-pressed={viewMode === "grid"}
                >
                  <Squares2X2Icon className="h-4 w-4" aria-hidden />
                  Cards
                </Button>
                <Button
                  type="button"
                  variant={viewMode === "list" ? "secondary" : "ghost"}
                  size="sm"
                  className="gap-2"
                  onClick={() => setViewMode("list")}
                  aria-pressed={viewMode === "list"}
                >
                  <Bars3BottomLeftIcon className="h-4 w-4" aria-hidden />
                  List
                </Button>
              </div>
            </div>
          </div>

          <div
            className={cn(
              "mt-10",
              viewMode === "grid"
                ? "grid gap-6 sm:grid-cols-2 xl:grid-cols-2"
                : "flex flex-col gap-4",
            )}
          >
            {sorted.map((m) => (
              <PropertyManagerDirectoryCard
                key={m.id}
                manager={m}
                listLayout={viewMode === "list"}
                onViewProfile={openProfile}
              />
            ))}
          </div>

          {sorted.length === 0 && (
            <div className="mt-12 rounded-2xl border border-dashed border-slate-300 bg-slate-50/50 p-10 text-center dark:border-slate-600 dark:bg-slate-900/30">
              <p className="font-medium text-secondary dark:text-slate-100">No matches yet</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Try clearing area, property type, or verified-only to see more firms.
              </p>
              <Button
                type="button"
                variant="outline"
                className="mt-6"
                onClick={() => {
                  setArea("all");
                  setPropertyType("all");
                  setPricingModel("all");
                  setMinRating(0);
                  setServiceOffered("all");
                  setPortfolioSize("any");
                  setVerifiedOnly(false);
                }}
              >
                Reset filters
              </Button>
            </div>
          )}
        </section>

        <p className="text-center text-sm text-muted-foreground">
          Maintenance vendors (plumbers, electricians, cleaners) live in the{" "}
          <Link href="/services/vendors" className="font-medium text-primary underline-offset-2 hover:underline">
            vendor directory
          </Link>
          — separate from property management firms.
        </p>
      </div>

      <PropertyManagerProfileSheet
        manager={selectedManager}
        open={profileOpen}
        onOpenChange={handleProfileOpenChange}
      />
    </>
  );
}
