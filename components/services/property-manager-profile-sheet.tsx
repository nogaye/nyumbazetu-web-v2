"use client";

/**
 * Right-side sheet presenting a full property manager profile with tabbed sections.
 *
 * Used from featured cards and directory cards; closes on overlay click via parent
 * `Sheet` wiring. Content covers overview, services, reviews, pricing, and coverage
 * per the marketplace product spec.
 */

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import type { PropertyManagerRecord } from "@/lib/services/property-managers-mock";
import { labelForPricingModel } from "@/lib/services/property-managers-mock";
import { RatingStars } from "@/components/services/rating-stars";
import { ReviewCard } from "@/components/services/review-card";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

/** Tab keys matching the product brief (Overview, Services, Reviews, Pricing, Coverage). */
type ProfileTab = "overview" | "services" | "reviews" | "pricing" | "coverage";

export interface PropertyManagerProfileSheetProps {
  /** Currently selected manager; when null the sheet is not shown. */
  manager: PropertyManagerRecord | null;
  /** Controls sheet visibility. */
  open: boolean;
  /** Radix-style open change (false clears selection in parent). */
  onOpenChange: (open: boolean) => void;
}

const TABS: { id: ProfileTab; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "services", label: "Services" },
  { id: "reviews", label: "Reviews" },
  { id: "pricing", label: "Pricing" },
  { id: "coverage", label: "Coverage" },
];

/**
 * Renders the profile shell, tab strip, and tab panels for one manager.
 * @param props - Manager, open flag, and onOpenChange from parent state.
 */
export function PropertyManagerProfileSheet({
  manager,
  open,
  onOpenChange,
}: PropertyManagerProfileSheetProps) {
  const [tab, setTab] = useState<ProfileTab>("overview");
  const effectiveOpen = open && manager != null;

  useEffect(() => {
    if (manager) setTab("overview");
  }, [manager?.id]);

  return (
    <Sheet
      open={effectiveOpen}
      onOpenChange={(next) => {
        if (!next) onOpenChange(false);
      }}
    >
      {manager ? (
      <SheetContent className="w-full overflow-y-auto sm:max-w-xl dark:bg-slate-900">
        <SheetClose onClick={() => onOpenChange(false)} />
        <SheetHeader className="space-y-4 border-b border-slate-200 pb-4 dark:border-slate-800">
          <div className="flex items-start gap-4 pr-10">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-primary/15 to-secondary/15 ring-1 ring-slate-200/80 dark:ring-slate-600/80">
              {manager.logoUrl ? (
                <Image
                  src={manager.logoUrl}
                  alt={`${manager.companyName} logo`}
                  width={64}
                  height={64}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="flex h-full w-full items-center justify-center font-display text-xl font-bold text-secondary dark:text-slate-200">
                  {manager.initials}
                </span>
              )}
            </div>
            <div className="min-w-0 flex-1 text-left">
              <SheetTitle className="text-xl font-bold text-slate-900 dark:text-slate-50">
                {manager.companyName}
              </SheetTitle>
              <SheetDescription className="text-left text-base text-slate-600 dark:text-slate-400">
                {manager.tagline}
              </SheetDescription>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                {manager.verified && (
                  <span className="inline-flex items-center gap-0.5 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                    <CheckBadgeIcon className="h-3.5 w-3.5" aria-hidden />
                    Verified
                  </span>
                )}
                {manager.featured && (
                  <span className="rounded-full bg-secondary/15 px-2 py-0.5 text-xs font-semibold text-secondary dark:text-slate-200">
                    Featured
                  </span>
                )}
              </div>
            </div>
          </div>
          <RatingStars rating={manager.rating} reviewCount={manager.reviewCount} size="md" />
        </SheetHeader>

        <div className="px-6 pt-4">
          <div
            role="tablist"
            aria-label="Profile sections"
            className="flex flex-wrap gap-1 border-b border-slate-200 pb-2 dark:border-slate-800"
          >
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={tab === t.id}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  tab === t.id
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-slate-100 hover:text-foreground dark:hover:bg-slate-800",
                )}
                onClick={() => setTab(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="py-6" role="tabpanel">
            {tab === "overview" && (
              <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
                <p>{manager.fullDescription}</p>
                <dl className="grid grid-cols-2 gap-3 rounded-xl bg-slate-50 p-4 dark:bg-slate-800/50">
                  <div>
                    <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Years in business
                    </dt>
                    <dd className="mt-1 font-semibold text-secondary dark:text-slate-100">
                      {manager.yearsInBusiness}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Staff
                    </dt>
                    <dd className="mt-1 font-semibold text-secondary dark:text-slate-100">
                      {manager.staffCount}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Units managed
                    </dt>
                    <dd className="mt-1 font-semibold text-secondary dark:text-slate-100">
                      {manager.unitsManaged.toLocaleString()}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Properties
                    </dt>
                    <dd className="mt-1 font-semibold text-secondary dark:text-slate-100">
                      {manager.propertiesManaged}
                    </dd>
                  </div>
                </dl>
                {manager.certifications.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-secondary dark:text-slate-100">
                      Certifications & compliance
                    </h3>
                    <ul className="mt-2 list-inside list-disc space-y-1">
                      {manager.certifications.map((c) => (
                        <li key={c}>{c}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {manager.testimonials.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-secondary dark:text-slate-100">
                      Client voices
                    </h3>
                    <blockquote className="mt-2 border-l-2 border-primary/40 pl-4 italic text-muted-foreground">
                      “{manager.testimonials[0].quote}”
                      <footer className="mt-2 not-italic text-xs text-secondary dark:text-slate-300">
                        — {manager.testimonials[0].author}, {manager.testimonials[0].role}
                      </footer>
                    </blockquote>
                  </div>
                )}
              </div>
            )}

            {tab === "services" && (
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                {manager.servicesOffered.map((s) => (
                  <li
                    key={s}
                    className="flex items-center gap-2 rounded-lg border border-slate-200/80 px-3 py-2 dark:border-slate-700/80"
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                    {s}
                  </li>
                ))}
              </ul>
            )}

            {tab === "reviews" && (
              <div className="space-y-4">
                {manager.reviews.map((r) => (
                  <ReviewCard key={r.id} review={r} />
                ))}
                {manager.reviews.length === 0 && (
                  <p className="text-sm text-muted-foreground">No sample reviews for this profile.</p>
                )}
              </div>
            )}

            {tab === "pricing" && (
              <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                <p>
                  <span className="font-semibold text-secondary dark:text-slate-100">
                    {labelForPricingModel(manager.pricingModel)}
                  </span>
                </p>
                <p>{manager.pricingSummary}</p>
                <p className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800/50">{manager.samplePricing}</p>
              </div>
            )}

            {tab === "coverage" && (
              <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
                <div>
                  <h3 className="text-sm font-semibold text-secondary dark:text-slate-100">
                    Areas served
                  </h3>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {manager.serviceAreas.map((a) => (
                      <li
                        key={a}
                        className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium dark:bg-slate-800"
                      >
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-secondary dark:text-slate-100">
                    Property types
                  </h3>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {manager.propertyTypes.map((p) => (
                      <li
                        key={p}
                        className="rounded-full border border-slate-200 px-3 py-1 text-xs dark:border-slate-600"
                      >
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-secondary dark:text-slate-100">
                    Languages
                  </h3>
                  <p className="mt-2">{manager.languages.join(", ")}</p>
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-slate-200 pb-8 pt-4 dark:border-slate-800">
            <p className="text-xs text-muted-foreground">
              Contact (mock):{" "}
              <a className="text-primary underline-offset-2 hover:underline" href={`mailto:${manager.contactEmail}`}>
                {manager.contactEmail}
              </a>{" "}
              · {manager.contactPhone}
            </p>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <Button asChild className="w-full sm:flex-1">
                <Link href="/contact">Contact</Link>
              </Button>
              <Button asChild variant="outline" className="w-full sm:flex-1">
                <Link href="/contact">
                  {manager.consultationAvailable ? "Request consultation" : "Enquire"}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
      ) : null}
    </Sheet>
  );
}
