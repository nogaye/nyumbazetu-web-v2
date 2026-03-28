/**
 * Standard marketplace card for the filterable grid or list layout.
 *
 * Surfaces trust signals, coverage, specialties, and a primary CTA; pairs with
 * `PropertyManagerProfileSheet` for deep detail.
 */

import Image from "next/image";
import Link from "next/link";
import { CheckBadgeIcon, ClockIcon, MapPinIcon } from "@heroicons/react/24/solid";
import type { PropertyManagerRecord } from "@/lib/services/property-managers-mock";
import { labelForPricingModel } from "@/lib/services/property-managers-mock";
import { RatingStars } from "@/components/services/rating-stars";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface PropertyManagerDirectoryCardProps {
  /** Manager row from mock data. */
  manager: PropertyManagerRecord;
  /** When true, use horizontal layout for list mode. */
  listLayout?: boolean;
  /** Opens the profile sheet. */
  onViewProfile: (manager: PropertyManagerRecord) => void;
}

/**
 * Renders avatar, badges, metrics, and CTA; adapts to grid vs list density.
 * @param props - Manager data, layout flag, and open-profile handler.
 */
export function PropertyManagerDirectoryCard({
  manager,
  listLayout = false,
  onViewProfile,
}: PropertyManagerDirectoryCardProps) {
  return (
    <article
      className={cn(
        "flex rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md dark:border-slate-700/90 dark:bg-slate-900/45",
        listLayout ? "flex-col gap-6 sm:flex-row sm:items-stretch" : "h-full flex-col",
      )}
    >
      <div
        className={cn(
          "flex gap-4",
          listLayout ? "sm:min-w-0 sm:flex-1" : "items-start",
        )}
      >
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-primary/15 to-secondary/15 ring-1 ring-slate-200/80 dark:ring-slate-600/80">
          {manager.logoUrl ? (
            <Image
              src={manager.logoUrl}
              alt={`${manager.companyName} logo`}
              width={56}
              height={56}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="flex h-full w-full items-center justify-center font-display text-lg font-bold text-secondary dark:text-slate-200">
              {manager.initials}
            </span>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-display text-lg font-semibold text-secondary dark:text-slate-100">
              {manager.companyName}
            </h3>
            {manager.verified && (
              <span className="inline-flex items-center gap-0.5 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                <CheckBadgeIcon className="h-3.5 w-3.5" aria-hidden />
                Verified
              </span>
            )}
            {manager.badges
              .filter((b) => b !== "Verified")
              .slice(0, 2)
              .map((b) => (
                <span
                  key={b}
                  className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200"
                >
                  {b}
                </span>
              ))}
          </div>
          <p className="mt-2 text-sm text-muted-foreground">{manager.shortDescription}</p>
        </div>
      </div>

      <div className={cn("flex flex-1 flex-col gap-3", !listLayout && "mt-4")}>
        <RatingStars rating={manager.rating} reviewCount={manager.reviewCount} />
        <div className="space-y-1.5 text-sm text-muted-foreground">
          <p className="flex items-center gap-2">
            <ClockIcon className="h-4 w-4 shrink-0 text-primary/80" aria-hidden />
            {manager.responseTime}
          </p>
          <p className="flex items-start gap-2">
            <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-primary/80" aria-hidden />
            <span>{manager.serviceAreas.join(" · ")}</span>
          </p>
        </div>
        {manager.occupancyRate != null && (
          <p className="text-xs font-medium text-secondary dark:text-slate-300">
            Occupancy (reported): {Math.round(manager.occupancyRate * 100)}%
          </p>
        )}
        <div className="flex flex-wrap gap-1.5">
          {manager.specialties.slice(0, 4).map((s) => (
            <span
              key={s}
              className="rounded-md border border-slate-200/80 px-2 py-0.5 text-xs text-slate-600 dark:border-slate-600 dark:text-slate-300"
            >
              {s}
            </span>
          ))}
        </div>
        <p className="text-sm text-secondary dark:text-slate-200">
          <span className="font-medium">{labelForPricingModel(manager.pricingModel)}</span>
          <span className="text-muted-foreground"> · </span>
          {manager.pricingSummary}
        </p>
        <p className="text-xs text-muted-foreground">
          {manager.unitsManaged.toLocaleString()} units · {manager.propertiesManaged}{" "}
          properties · {manager.yearsInBusiness} yrs experience
        </p>
      </div>

      <div
        className={cn(
          "flex flex-col gap-2 pt-2",
          listLayout ? "sm:w-44 sm:shrink-0 sm:justify-center sm:pt-0" : "mt-auto pt-4",
        )}
      >
        <Button type="button" className="w-full" onClick={() => onViewProfile(manager)}>
          View profile
        </Button>
        <Button asChild variant="outline" className="w-full">
          <Link href="/contact">Contact</Link>
        </Button>
      </div>
    </article>
  );
}
