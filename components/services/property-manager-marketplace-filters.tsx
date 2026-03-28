"use client";

/**
 * Filter toolbar for the property manager marketplace listing.
 *
 * Binds Radix Selects and a verified checkbox to parent state so the directory
 * updates without a round-trip. Options are derived from the passed mock corpus.
 */

import { useMemo } from "react";
import type {
  PortfolioSizeBucket,
  PropertyManagerPricingModel,
  PropertyManagerRecord,
} from "@/lib/services/property-managers-mock";
import {
  PROPERTY_TYPE_OPTIONS,
  labelForPricingModel,
  uniqueServiceAreas,
  uniqueServicesOffered,
} from "@/lib/services/property-managers-mock";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

/** All filter dimensions controlled by the parent client container. */
export interface PropertyManagerMarketplaceFiltersProps {
  /** Full mock list for deriving option labels. */
  managers: PropertyManagerRecord[];
  /** Area filter: "all" or a specific service area string. */
  area: string;
  /** Area filter change handler. */
  onAreaChange: (v: string) => void;
  /** Property type: "all" or a `PROPERTY_TYPE_OPTIONS` value. */
  propertyType: string;
  /** Property type change handler. */
  onPropertyTypeChange: (v: string) => void;
  /** Pricing model filter. */
  pricingModel: "all" | PropertyManagerPricingModel;
  /** Pricing model change handler. */
  onPricingModelChange: (v: "all" | PropertyManagerPricingModel) => void;
  /** Minimum star rating (0–5). */
  minRating: number;
  /** Minimum rating change handler. */
  onMinRatingChange: (v: number) => void;
  /** Service line filter: "all" or a service string present on records. */
  serviceOffered: string;
  /** Service filter change handler. */
  onServiceOfferedChange: (v: string) => void;
  /** Portfolio size bucket. */
  portfolioSize: PortfolioSizeBucket;
  /** Portfolio bucket change handler. */
  onPortfolioSizeChange: (v: PortfolioSizeBucket) => void;
  /** When true, only verified managers match. */
  verifiedOnly: boolean;
  /** Verified toggle handler. */
  onVerifiedOnlyChange: (v: boolean) => void;
  /** Optional class for layout spacing from parent sections. */
  className?: string;
}

const PRICING_MODELS: PropertyManagerPricingModel[] = [
  "percentage_rent",
  "fixed_monthly",
  "per_unit",
  "custom",
];

/**
 * Renders a responsive grid of filter controls wired to controlled state.
 * @param props - Managers corpus plus values and callbacks for each filter.
 */
export function PropertyManagerMarketplaceFilters({
  managers,
  area,
  onAreaChange,
  propertyType,
  onPropertyTypeChange,
  pricingModel,
  onPricingModelChange,
  minRating,
  onMinRatingChange,
  serviceOffered,
  onServiceOfferedChange,
  portfolioSize,
  onPortfolioSizeChange,
  verifiedOnly,
  onVerifiedOnlyChange,
  className,
}: PropertyManagerMarketplaceFiltersProps) {
  const areas = useMemo(() => uniqueServiceAreas(managers), [managers]);
  const services = useMemo(() => uniqueServicesOffered(managers), [managers]);

  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm dark:border-slate-700/90 dark:bg-slate-900/40",
        className,
      )}
    >
      <h2 className="font-display text-lg font-semibold text-secondary dark:text-slate-100">
        Search & filters
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Narrow by coverage, asset class, fees, and trust signals. All matching is client-side on mock data.
      </p>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="pm-filter-area">Location / area served</Label>
          <Select value={area} onValueChange={onAreaChange}>
            <SelectTrigger id="pm-filter-area" className="w-full">
              <SelectValue placeholder="Area" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All areas</SelectItem>
              {areas.map((a) => (
                <SelectItem key={a} value={a}>
                  {a}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="pm-filter-type">Property type</Label>
          <Select value={propertyType} onValueChange={onPropertyTypeChange}>
            <SelectTrigger id="pm-filter-type" className="w-full">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All types</SelectItem>
              {PROPERTY_TYPE_OPTIONS.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="pm-filter-pricing">Pricing model</Label>
          <Select
            value={pricingModel}
            onValueChange={(v) =>
              onPricingModelChange(v as "all" | PropertyManagerPricingModel)
            }
          >
            <SelectTrigger id="pm-filter-pricing" className="w-full">
              <SelectValue placeholder="Pricing" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All models</SelectItem>
              {PRICING_MODELS.map((m) => (
                <SelectItem key={m} value={m}>
                  {labelForPricingModel(m)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="pm-filter-rating">Minimum rating</Label>
          <Select
            value={String(minRating)}
            onValueChange={(v) => onMinRatingChange(Number(v))}
          >
            <SelectTrigger id="pm-filter-rating" className="w-full">
              <SelectValue placeholder="Rating" />
            </SelectTrigger>
            <SelectContent>
              {[0, 3, 3.5, 4, 4.5].map((r) => (
                <SelectItem key={r} value={String(r)}>
                  {r === 0 ? "Any rating" : `${r}+ stars`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="pm-filter-service">Services offered</Label>
          <Select value={serviceOffered} onValueChange={onServiceOfferedChange}>
            <SelectTrigger id="pm-filter-service" className="w-full">
              <SelectValue placeholder="Service" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All services</SelectItem>
              {services.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="pm-filter-portfolio">Portfolio size</Label>
          <Select
            value={portfolioSize}
            onValueChange={(v) => onPortfolioSizeChange(v as PortfolioSizeBucket)}
          >
            <SelectTrigger id="pm-filter-portfolio" className="w-full">
              <SelectValue placeholder="Size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any size</SelectItem>
              <SelectItem value="small">Small (&lt; 300 units)</SelectItem>
              <SelectItem value="medium">Medium (300–999)</SelectItem>
              <SelectItem value="large">Large (1,000+)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-slate-200/80 pt-5 dark:border-slate-700/80">
        <input
          id="pm-filter-verified"
          type="checkbox"
          checked={verifiedOnly}
          onChange={(e) => onVerifiedOnlyChange(e.target.checked)}
          className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
        />
        <Label htmlFor="pm-filter-verified" className="cursor-pointer text-sm font-normal">
          Verified managers only
        </Label>
      </div>
    </div>
  );
}
