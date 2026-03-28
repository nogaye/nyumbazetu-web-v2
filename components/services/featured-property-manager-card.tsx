/**
 * Highlight card for curated “featured” property managers in the marketplace strip.
 *
 * Shows logo, trust badges, coverage, pricing summary, and three CTAs (profile,
 * contact, consultation). Used only for records with `featured: true`.
 */

import Image from "next/image";
import Link from "next/link";
import { CheckBadgeIcon, MapPinIcon } from "@heroicons/react/24/solid";
import type { PropertyManagerRecord } from "@/lib/services/property-managers-mock";
import { labelForPricingModel } from "@/lib/services/property-managers-mock";
import { RatingStars } from "@/components/services/rating-stars";
import { Button } from "@/components/ui/button";

export interface FeaturedPropertyManagerCardProps {
  /** Manager row from mock data. */
  manager: PropertyManagerRecord;
  /** Opens the profile sheet when “View profile” is used from featured strip. */
  onViewProfile: (manager: PropertyManagerRecord) => void;
}

/**
 * Renders a dense but scannable featured tile with primary actions.
 * @param props - Manager data and profile callback.
 */
export function FeaturedPropertyManagerCard({
  manager,
  onViewProfile,
}: FeaturedPropertyManagerCardProps) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md dark:border-slate-700/90 dark:bg-slate-900/45">
      <div className="flex items-start gap-4">
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
            <span className="inline-flex shrink-0 rounded-full bg-secondary/15 px-2 py-0.5 text-xs font-semibold text-secondary dark:bg-secondary/25 dark:text-slate-200">
              Featured
            </span>
            {manager.verified && (
              <span className="inline-flex items-center gap-0.5 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                <CheckBadgeIcon className="h-3.5 w-3.5" aria-hidden />
                Verified
              </span>
            )}
          </div>
          <p className="mt-2 text-sm text-muted-foreground">{manager.tagline}</p>
        </div>
      </div>

      <div className="mt-4">
        <RatingStars rating={manager.rating} reviewCount={manager.reviewCount} />
      </div>

      <p className="mt-3 flex items-start gap-2 text-sm text-muted-foreground">
        <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-primary/80" aria-hidden />
        <span>{manager.serviceAreas.join(" · ")}</span>
      </p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {manager.propertyTypes.slice(0, 4).map((t) => (
          <span
            key={t}
            className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            {t}
          </span>
        ))}
      </div>

      <p className="mt-3 text-sm font-medium text-secondary dark:text-slate-200">
        {manager.unitsManaged.toLocaleString()} units ·{" "}
        {labelForPricingModel(manager.pricingModel)}
      </p>
      <p className="mt-1 text-xs text-muted-foreground">{manager.pricingSummary}</p>

      <div className="mt-auto flex flex-col gap-2 pt-6">
        <Button
          type="button"
          className="w-full"
          onClick={() => onViewProfile(manager)}
        >
          View profile
        </Button>
        <div className="grid grid-cols-2 gap-2">
          <Button type="button" variant="outline" asChild className="w-full">
            <Link href="/contact">Contact</Link>
          </Button>
          <Button type="button" variant="secondary" asChild className="w-full">
            <Link href="/contact">
              {manager.consultationAvailable ? "Request consultation" : "Enquire"}
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
