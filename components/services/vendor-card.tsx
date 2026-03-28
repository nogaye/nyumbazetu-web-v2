/**
 * Reusable vendor summary card for landing grid and directory grid.
 * Supports optional second CTA (“Request service”) and a “Featured” badge for curated vendors.
 */

import Image from "next/image";
import Link from "next/link";
import { CheckBadgeIcon, MapPinIcon, ClockIcon } from "@heroicons/react/24/solid";
import type { VendorRecord } from "@/lib/services/vendors-mock";
import { RatingStars } from "@/components/services/rating-stars";
import { Button } from "@/components/ui/button";

export interface VendorCardProps {
  /** Vendor row from mock data. */
  vendor: VendorRecord;
  /** When true, show primary + outline CTAs. */
  showRequestCta?: boolean;
}

/**
 * Renders avatar, name, categories, rating, location, response time, verified and featured badges, and links.
 * @param props - Vendor data and presentation options.
 */
export function VendorCard({
  vendor,
  showRequestCta = false,
}: VendorCardProps) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-lg dark:border-slate-700/90 dark:bg-slate-900/45">
      <div className="flex items-start gap-4">
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 ring-1 ring-slate-200/80 dark:ring-slate-600/80">
          {vendor.logoImageUrl ? (
            <Image
              src={vendor.logoImageUrl}
              alt={`${vendor.businessName} logo`}
              width={56}
              height={56}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="flex h-full w-full items-center justify-center font-display text-lg font-bold text-secondary dark:text-slate-200">
              {vendor.logoMark}
            </span>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-display truncate text-lg font-semibold text-secondary dark:text-slate-100">
              <Link
                href={`/services/vendors/${vendor.slug}`}
                className="hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
              >
                {vendor.businessName}
              </Link>
            </h3>
            {vendor.featured && (
              <span className="inline-flex shrink-0 items-center rounded-full bg-secondary/15 px-2 py-0.5 text-xs font-semibold text-secondary dark:bg-secondary/25 dark:text-slate-200">
                Featured
              </span>
            )}
            {vendor.verified && (
              <span className="inline-flex items-center gap-0.5 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                <CheckBadgeIcon className="h-3.5 w-3.5" aria-hidden />
                Verified
              </span>
            )}
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {vendor.categories.map((c) => (
              <span
                key={c}
                className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4">
        <RatingStars rating={vendor.rating} reviewCount={vendor.reviewCount} />
      </div>

      <div className="mt-3 space-y-1.5 text-sm text-muted-foreground">
        <p className="flex items-center gap-2">
          <MapPinIcon className="h-4 w-4 shrink-0 text-primary/80" aria-hidden />
          {vendor.location}
        </p>
        <p className="flex items-center gap-2">
          <ClockIcon className="h-4 w-4 shrink-0 text-primary/80" aria-hidden />
          {vendor.responseTime}
        </p>
      </div>

      <div className="mt-auto flex flex-col gap-2 pt-6 sm:flex-row sm:flex-wrap">
        <Button asChild className="w-full sm:w-auto">
          <Link href={`/services/vendors/${vendor.slug}`}>View profile</Link>
        </Button>
        {showRequestCta && (
          <Button asChild variant="outline" className="w-full sm:w-auto">
            <Link href="/services/request">Request service</Link>
          </Button>
        )}
      </div>
    </article>
  );
}
