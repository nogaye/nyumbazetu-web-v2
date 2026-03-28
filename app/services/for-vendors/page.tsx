/**
 * Route: `/services/for-vendors` — conversion page for trades joining the marketplace.
 */

import type { Metadata } from "next";
import Link from "next/link";
import {
  BriefcaseIcon,
  ShieldCheckIcon,
  BanknotesIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { ServicesCtaSection } from "@/components/services/cta-section";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "For vendors",
  description:
    "Grow your maintenance business with Nyumba Zetu: more jobs, verified clients, faster payments, and reputation you can prove.",
  alternates: { canonical: "/services/for-vendors" },
};

const BENEFITS = [
  {
    title: "More jobs",
    body: "Tap into estates and portfolios that issue recurring maintenance work, not one-off leads.",
    Icon: BriefcaseIcon,
  },
  {
    title: "Verified clients",
    body: "Work with managers and landlords who are already on-platform — less no-show risk.",
    Icon: ShieldCheckIcon,
  },
  {
    title: "Faster payments",
    body: "Structured milestones and confirmations so you get paid when work is accepted.",
    Icon: BanknotesIcon,
  },
  {
    title: "Reputation building",
    body: "Reviews tied to completed jobs — your track record travels with your profile.",
    Icon: StarIcon,
  },
] as const;

const VENDOR_STEPS = [
  "Create your vendor account and upload trade credentials.",
  "Set service areas, categories, and typical response times.",
  "Receive scoped requests with photos and urgency.",
  "Quote, complete work, and collect verified reviews.",
] as const;

/**
 * Marketing narrative for vendors with benefits, process, and signup CTA.
 */
export default function ForVendorsPage() {
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
          <li className="text-foreground font-medium">For vendors</li>
        </ol>
      </nav>

      <header className="mt-8 max-w-3xl">
        <h1 className="font-display text-4xl font-bold tracking-tight text-secondary dark:text-slate-100 sm:text-5xl">
          Grow your business with Nyumba Zetu
        </h1>
        <p className="mt-6 text-lg text-muted-foreground">
          Join the maintenance layer trusted by property teams across Kenya. Frontend preview only —
          onboarding will open when the program launches.
        </p>
        <Button asChild size="lg" className="mt-8 min-h-[48px] px-8">
          <Link href="/contact">Create vendor account</Link>
        </Button>
      </header>

      <section className="mt-20" aria-labelledby="vendor-benefits-heading">
        <h2
          id="vendor-benefits-heading"
          className="font-display text-2xl font-bold text-secondary dark:text-slate-100 sm:text-3xl"
        >
          Why vendors choose us
        </h2>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2">
          {BENEFITS.map(({ title, body, Icon }) => (
            <li
              key={title}
              className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm dark:border-slate-700/90 dark:bg-slate-900/45"
            >
              <Icon className="h-9 w-9 text-primary" aria-hidden />
              <h3 className="mt-4 font-display text-lg font-semibold text-secondary dark:text-slate-100">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-20" aria-labelledby="vendor-flow-heading">
        <h2
          id="vendor-flow-heading"
          className="font-display text-2xl font-bold text-secondary dark:text-slate-100 sm:text-3xl"
        >
          How it works on your side
        </h2>
        <ol className="mt-8 max-w-2xl list-decimal space-y-4 pl-5 text-muted-foreground marker:font-semibold marker:text-primary">
          {VENDOR_STEPS.map((step) => (
            <li key={step} className="pl-2 text-base leading-relaxed">
              {step}
            </li>
          ))}
        </ol>
      </section>

      <div className="mt-20">
        <ServicesCtaSection
          title="Ready when you are"
          description="Leave your details and we’ll notify you when vendor onboarding goes live."
        />
      </div>
    </div>
  );
}
