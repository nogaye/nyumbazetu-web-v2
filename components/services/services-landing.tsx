/**
 * Composes all sections for `/services`: hero, how it works, featured vendors,
 * categories, audience value props, trust, and closing CTA. Server-rendered for SEO.
 */

import Link from "next/link";
import {
  ShieldCheckIcon,
  ChatBubbleBottomCenterTextIcon,
  DocumentCheckIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import { MOCK_VENDORS, SERVICE_CATEGORY_SLUGS } from "@/lib/services/vendors-mock";
import { HowItWorks } from "@/components/services/how-it-works";
import { VendorCard } from "@/components/services/vendor-card";
import { CategoryCard } from "@/components/services/category-card";
import { ServicesCtaSection } from "@/components/services/cta-section";
import { Button } from "@/components/ui/button";
import type { ServiceCategorySlug } from "@/lib/services/vendors-mock";

const FEATURED = MOCK_VENDORS.slice(0, 6);

/**
 * Renders the full services marketplace landing page body inside the main layout.
 */
export function ServicesLanding() {
  return (
    <>
      <header className="relative overflow-hidden border-b border-slate-200/80 bg-gradient-to-b from-slate-50 via-white to-white dark:border-slate-800 dark:from-slate-950 dark:via-slate-950 dark:to-slate-950">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35] dark:opacity-[0.2]"
          aria-hidden
          style={{
            backgroundImage:
              "radial-gradient(ellipse 80% 60% at 20% 10%, rgb(185 128 54 / 0.25), transparent 55%), radial-gradient(ellipse 70% 50% at 90% 30%, rgb(52 71 103 / 0.2), transparent 50%)",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Vendor marketplace
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold tracking-tight text-secondary dark:text-slate-50 sm:text-5xl">
            Trusted vendors for property maintenance and services.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">
            Find verified plumbers, electricians, cleaners, and more. Compare quotes, track work,
            and pay with confidence.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button asChild size="lg" className="min-h-[48px] px-8">
              <Link href="/services/request">Request a service</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="min-h-[48px] px-8">
              <Link href="/services/for-vendors">Join as vendor</Link>
            </Button>
            <Link
              href="/services/how-it-works"
              className="text-center text-sm font-medium text-primary underline-offset-4 hover:underline sm:ml-2"
            >
              How it works
            </Link>
          </div>
        </div>
      </header>

      <aside className="border-b border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-950/40">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div>
            <p className="text-sm font-semibold text-secondary dark:text-slate-100">
              Looking for a property management company?
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Browse firms by coverage, property type, and pricing — separate from maintenance vendors.
            </p>
          </div>
          <Button asChild variant="secondary" className="shrink-0">
            <Link href="/services/property-managers">Property manager marketplace</Link>
          </Button>
        </div>
      </aside>

      <div className="mx-auto max-w-7xl space-y-20 px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <HowItWorks />

        <section aria-labelledby="featured-vendors-heading">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2
                id="featured-vendors-heading"
                className="font-display text-2xl font-bold text-secondary dark:text-slate-100 sm:text-3xl"
              >
                Featured vendors
              </h2>
              <p className="mt-2 max-w-xl text-muted-foreground">
                Verified partners with strong response times across Nairobi (mock data for demo).
              </p>
            </div>
            <Button asChild variant="secondary">
              <Link href="/services/vendors">Browse all vendors</Link>
            </Button>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURED.map((v) => (
              <VendorCard key={v.slug} vendor={v} />
            ))}
          </div>
        </section>

        <section aria-labelledby="categories-heading">
          <h2
            id="categories-heading"
            className="font-display text-2xl font-bold text-secondary dark:text-slate-100 sm:text-3xl"
          >
            Browse by category
          </h2>
          <p className="mt-2 text-muted-foreground">
            Jump straight into the trade you need — each category lists matching vendors.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICE_CATEGORY_SLUGS.map((slug) => (
              <CategoryCard key={slug} slug={slug as ServiceCategorySlug} />
            ))}
          </div>
        </section>

        <section aria-labelledby="why-nyumba-heading">
          <h2
            id="why-nyumba-heading"
            className="font-display text-2xl font-bold text-secondary dark:text-slate-100 sm:text-3xl"
          >
            Why use Nyumba Zetu
          </h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            One marketplace tuned for owners, managers, and residents — without the noise.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <article className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm dark:border-slate-700/90 dark:bg-slate-900/40">
              <h3 className="font-display text-lg font-semibold text-secondary dark:text-slate-100">
                For vendors
              </h3>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li>Get consistent jobs from serious portfolios</li>
                <li>Build reputation with structured reviews</li>
                <li>Faster payments when work is confirmed</li>
              </ul>
            </article>
            <article className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm dark:border-slate-700/90 dark:bg-slate-900/40">
              <h3 className="font-display text-lg font-semibold text-secondary dark:text-slate-100">
                For property managers
              </h3>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li>Verified vendors only — less vetting overhead</li>
                <li>Compare quotes in one thread per job</li>
                <li>Track jobs centrally across blocks and units</li>
              </ul>
            </article>
            <article className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm dark:border-slate-700/90 dark:bg-slate-900/40">
              <h3 className="font-display text-lg font-semibold text-secondary dark:text-slate-100">
                For tenants
              </h3>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li>Easy issue reporting with photo context</li>
                <li>Transparent updates as vendors respond</li>
                <li>Trusted vendors aligned with your estate</li>
              </ul>
            </article>
          </div>
        </section>

        <section
          className="rounded-2xl border border-slate-200/90 bg-slate-50/80 px-6 py-10 dark:border-slate-700/90 dark:bg-slate-900/30 sm:px-10"
          aria-labelledby="trust-heading"
        >
          <h2
            id="trust-heading"
            className="font-display text-xl font-bold text-secondary dark:text-slate-100 sm:text-2xl"
          >
            Built for trust
          </h2>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <li className="flex gap-3">
              <ShieldCheckIcon className="h-8 w-8 shrink-0 text-primary" aria-hidden />
              <div>
                <p className="font-semibold text-secondary dark:text-slate-100">Verified vendors</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Identity and trade checks before badges are issued.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <ChatBubbleBottomCenterTextIcon
                className="h-8 w-8 shrink-0 text-primary"
                aria-hidden
              />
              <div>
                <p className="font-semibold text-secondary dark:text-slate-100">Real reviews</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Feedback tied to completed jobs, not anonymous stars.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <DocumentCheckIcon className="h-8 w-8 shrink-0 text-primary" aria-hidden />
              <div>
                <p className="font-semibold text-secondary dark:text-slate-100">Insurance-ready</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Placeholder for COI uploads and compliance packs.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <ChartBarIcon className="h-8 w-8 shrink-0 text-primary" aria-hidden />
              <div>
                <p className="font-semibold text-secondary dark:text-slate-100">
                  Performance tracking
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  SLA, revisit rate, and completion metrics for managers.
                </p>
              </div>
            </li>
          </ul>
        </section>

        <ServicesCtaSection
          title="Start finding trusted vendors today"
          description="Tell us what you need — we’ll route it to verified trades. Vendors: claim your profile when onboarding opens."
        />
      </div>
    </>
  );
}
