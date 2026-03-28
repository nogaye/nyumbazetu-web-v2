/**
 * Route: `/services/vendors/[slug]` — vendor profile (about, services, portfolio, reviews, trust).
 */

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckBadgeIcon, MapPinIcon, ClockIcon } from "@heroicons/react/24/solid";
import {
  getAllVendorSlugs,
  getVendorBySlug,
} from "@/lib/services/vendors-mock";
import { RatingStars } from "@/components/services/rating-stars";
import { ReviewCard } from "@/components/services/review-card";
import { Button } from "@/components/ui/button";
import { ServicesCtaSection } from "@/components/services/cta-section";

type PageProps = { params: Promise<{ slug: string }> };

/**
 * Pre-renders all mock vendor profiles at build time for fast static delivery.
 */
export function generateStaticParams() {
  return getAllVendorSlugs().map((slug) => ({ slug }));
}

/**
 * SEO title and description derived from the vendor record.
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const vendor = getVendorBySlug(slug);
  if (!vendor) {
    return { title: "Vendor not found" };
  }
  return {
    title: vendor.businessName,
    description: vendor.description.slice(0, 155),
    alternates: { canonical: `/services/vendors/${slug}` },
    openGraph: {
      title: `${vendor.businessName} | Nyumba Zetu`,
      description: vendor.description.slice(0, 200),
    },
  };
}

/** Mock star distribution for the summary histogram (percentages sum to 100). */
const RATING_BREAKDOWN = [
  { stars: 5, pct: 62 },
  { stars: 4, pct: 24 },
  { stars: 3, pct: 9 },
  { stars: 2, pct: 3 },
  { stars: 1, pct: 2 },
];

/**
 * Full vendor profile layout: hero, about, services, portfolio, reviews, badges, CTA.
 */
export default async function VendorProfilePage({ params }: PageProps) {
  const { slug } = await params;
  const vendor = getVendorBySlug(slug);
  if (!vendor) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <nav className="text-sm text-muted-foreground" aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/services" className="hover:text-primary">
              Services
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li>
            <Link href="/services/vendors" className="hover:text-primary">
              Vendors
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="text-foreground font-medium">{vendor.businessName}</li>
        </ol>
      </nav>

      <header className="mt-8 flex flex-col gap-8 rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm dark:border-slate-700/90 dark:bg-slate-900/45 lg:flex-row lg:items-center lg:justify-between lg:p-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br from-primary/25 to-secondary/25 ring-1 ring-slate-200 dark:ring-slate-600">
            {vendor.logoImageUrl ? (
              <Image
                src={vendor.logoImageUrl}
                alt={`${vendor.businessName} logo`}
                width={96}
                height={96}
                className="h-full w-full object-cover"
                priority
              />
            ) : (
              <span className="flex h-full w-full items-center justify-center font-display text-2xl font-bold text-secondary dark:text-slate-200">
                {vendor.logoMark}
              </span>
            )}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="font-display text-3xl font-bold text-secondary dark:text-slate-100">
                {vendor.businessName}
              </h1>
              {vendor.featured && (
                <span className="inline-flex items-center rounded-full bg-secondary/15 px-2.5 py-0.5 text-xs font-semibold text-secondary dark:bg-secondary/25 dark:text-slate-200">
                  Featured
                </span>
              )}
              {vendor.verified && (
                <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                  <CheckBadgeIcon className="h-4 w-4" aria-hidden />
                  Verified
                </span>
              )}
            </div>
            <div className="mt-3">
              <RatingStars rating={vendor.rating} reviewCount={vendor.reviewCount} size="md" />
            </div>
            <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <MapPinIcon className="h-4 w-4 text-primary" aria-hidden />
                {vendor.location}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ClockIcon className="h-4 w-4 text-primary" aria-hidden />
                {vendor.responseTime}
              </span>
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {vendor.categories.map((c) => (
                <span
                  key={c}
                  className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-800 dark:bg-slate-800 dark:text-slate-200"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto lg:flex-col">
          <Button asChild size="lg" className="w-full min-h-[48px] sm:w-auto lg:w-full">
            <Link href="/services/request">Request service</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="w-full min-h-[48px] sm:w-auto lg:w-full">
            <Link href="/contact">Save vendor</Link>
          </Button>
        </div>
      </header>

      <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
        <div className="space-y-12">
          <section aria-labelledby="about-heading">
            <h2
              id="about-heading"
              className="font-display text-xl font-bold text-secondary dark:text-slate-100"
            >
              About
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-600 dark:text-slate-300">
              {vendor.description}
            </p>
          </section>

          <section aria-labelledby="services-offered-heading">
            <h2
              id="services-offered-heading"
              className="font-display text-xl font-bold text-secondary dark:text-slate-100"
            >
              Services offered
            </h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {vendor.servicesOffered.map((s) => (
                <li
                  key={s}
                  className="rounded-xl border border-slate-200/90 bg-white px-4 py-3 text-sm font-medium text-slate-800 shadow-sm dark:border-slate-700/90 dark:bg-slate-900/40 dark:text-slate-100"
                >
                  {s}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="portfolio-heading">
            <h2
              id="portfolio-heading"
              className="font-display text-xl font-bold text-secondary dark:text-slate-100"
            >
              Portfolio
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Sample project photos (placeholders) — replace with real gallery when onboarding goes live.
            </p>
            <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:gap-4">
              {vendor.portfolioSeeds.map((seed) => (
                <li
                  key={seed}
                  className="overflow-hidden rounded-2xl border border-slate-200/80 shadow-sm dark:border-slate-700/80"
                >
                  <Image
                    src={`https://picsum.photos/seed/${encodeURIComponent(seed)}/600/400`}
                    alt={`${vendor.businessName} portfolio image`}
                    width={600}
                    height={400}
                    className="aspect-[3/2] h-auto w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="reviews-heading">
            <h2
              id="reviews-heading"
              className="font-display text-xl font-bold text-secondary dark:text-slate-100"
            >
              Reviews
            </h2>
            <div className="mt-6 grid gap-8 lg:grid-cols-[220px_1fr]">
              <div className="rounded-2xl border border-slate-200/90 bg-slate-50/80 p-5 dark:border-slate-700/90 dark:bg-slate-900/30">
                <p className="text-4xl font-bold tabular-nums text-secondary dark:text-slate-50">
                  {vendor.rating.toFixed(1)}
                </p>
                <RatingStars rating={vendor.rating} className="mt-2" />
                <p className="mt-2 text-sm text-muted-foreground">
                  Based on {vendor.reviewCount} reviews (mock aggregate)
                </p>
                <h3 className="mt-6 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Breakdown
                </h3>
                <ul className="mt-3 space-y-2">
                  {RATING_BREAKDOWN.map((row) => (
                    <li key={row.stars} className="flex items-center gap-2 text-xs">
                      <span className="w-8 tabular-nums text-muted-foreground">{row.stars}★</span>
                      <span
                        className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700"
                        role="presentation"
                      >
                        <span
                          className="block h-full rounded-full bg-primary"
                          style={{ width: `${row.pct}%` }}
                        />
                      </span>
                      <span className="w-8 text-right tabular-nums text-muted-foreground">
                        {row.pct}%
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4">
                {vendor.reviews.length > 0 ? (
                  vendor.reviews.map((r) => <ReviewCard key={r.id} review={r} />)
                ) : (
                  <p className="rounded-2xl border border-dashed border-slate-300 p-6 text-sm text-muted-foreground dark:border-slate-600">
                    No sample reviews for this vendor yet — aggregate rating is illustrative.
                  </p>
                )}
              </div>
            </div>
          </section>
        </div>

        <aside
          className="space-y-6 rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm dark:border-slate-700/90 dark:bg-slate-900/45 lg:sticky lg:top-24"
          aria-label="Trust badges"
        >
          <h2 className="font-display text-lg font-semibold text-secondary dark:text-slate-100">
            Trust badges
          </h2>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2 dark:bg-slate-800/50">
              <span>Featured</span>
              <span className="font-medium text-secondary dark:text-slate-200">
                {vendor.featured ? "Yes" : "—"}
              </span>
            </li>
            <li className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2 dark:bg-slate-800/50">
              <span>Verified on Nyumba Zetu</span>
              <span className="font-medium text-primary">{vendor.verified ? "Yes" : "Pending"}</span>
            </li>
            <li className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2 dark:bg-slate-800/50">
              <span>Insured</span>
              <span className="text-muted-foreground">Mock</span>
            </li>
            <li className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2 dark:bg-slate-800/50">
              <span>Top rated</span>
              <span className="text-muted-foreground">
                {vendor.rating >= 4.5 ? "Yes" : "—"}
              </span>
            </li>
          </ul>
          <Button asChild variant="secondary" className="w-full">
            <Link href="/services/vendors">Back to directory</Link>
          </Button>
        </aside>
      </div>

      <div className="mt-16">
        <ServicesCtaSection
          title="Need this vendor on a job?"
          description="Send a structured request with photos and urgency — we’ll notify matched vendors."
        />
      </div>
    </div>
  );
}
