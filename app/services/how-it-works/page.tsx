/**
 * Route: `/services/how-it-works` — standalone explanation of the request-to-completion flow.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { HowItWorks } from "@/components/services/how-it-works";
import { ServicesCtaSection } from "@/components/services/cta-section";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "From selecting a property to comparing vendor quotes: the Nyumba Zetu maintenance flow explained.",
  alternates: { canonical: "/services/how-it-works" },
};

/**
 * Dedicated how-it-works page with extra context and CTAs linking back to marketplace entry points.
 */
export default function ServicesHowItWorksPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
      <nav className="text-sm text-muted-foreground" aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/services" className="hover:text-primary">
              Services
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="text-foreground font-medium">How it works</li>
        </ol>
      </nav>

      <header className="mt-8 max-w-3xl">
        <h1 className="font-display text-4xl font-bold tracking-tight text-secondary dark:text-slate-100 sm:text-5xl">
          How the vendor marketplace works
        </h1>
        <p className="mt-6 text-lg text-muted-foreground">
          A simple, repeatable flow so managers move faster without sacrificing control. The UI below
          mirrors the journey we’re building — this page is marketing-only until product links go live.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg" className="min-h-[48px] px-8">
            <Link href="/services/vendors">Find a vendor</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="min-h-[48px] px-8">
            <Link href="/services/for-managers">For property managers</Link>
          </Button>
        </div>
      </header>

      <div className="mt-16">
        <HowItWorks />
      </div>

      <section
        className="mt-20 rounded-2xl border border-slate-200/90 bg-slate-50/80 p-8 dark:border-slate-700/90 dark:bg-slate-900/30 sm:p-10"
        aria-labelledby="roles-heading"
      >
        <h2
          id="roles-heading"
          className="font-display text-xl font-bold text-secondary dark:text-slate-100 sm:text-2xl"
        >
          Who does what
        </h2>
        <dl className="mt-6 grid gap-6 md:grid-cols-3">
          <div>
            <dt className="font-semibold text-secondary dark:text-slate-100">Tenant or resident</dt>
            <dd className="mt-2 text-sm text-muted-foreground">
              Reports the issue with photos; sees transparent status as the manager dispatches work.
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-secondary dark:text-slate-100">Property manager</dt>
            <dd className="mt-2 text-sm text-muted-foreground">
              Validates scope, selects vendors, compares quotes, and tracks completion centrally.
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-secondary dark:text-slate-100">Vendor</dt>
            <dd className="mt-2 text-sm text-muted-foreground">
              Responds with a clear quote, executes the job, and earns a verified review on close-out.
            </dd>
          </div>
        </dl>
      </section>

      <div className="mt-20">
        <ServicesCtaSection
          title="Try the flow with your next job"
          description="We’ll show you how requests, vendors, and approvals will connect in Nyumba Zetu."
        />
      </div>
    </div>
  );
}
