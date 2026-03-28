/**
 * Route: `/services/for-managers` — demand-side marketing for property managers.
 */

import type { Metadata } from "next";
import Link from "next/link";
import {
  Squares2X2Icon,
  ScaleIcon,
  ClipboardDocumentListIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { ServicesCtaSection } from "@/components/services/cta-section";

export const metadata: Metadata = {
  title: "For property managers",
  description:
    "Request services by unit or block, compare quotes, track jobs, and work only with verified vendors — from one dashboard.",
  alternates: { canonical: "/services/for-managers" },
};

const FEATURES = [
  {
    title: "Request by unit or block",
    body: "Raise maintenance with the right context so vendors quote once and clearly.",
    Icon: Squares2X2Icon,
  },
  {
    title: "Compare quotes",
    body: "Side-by-side responses with scope, price, and timing — no inbox archaeology.",
    Icon: ScaleIcon,
  },
  {
    title: "Track jobs centrally",
    body: "Status from assigned through completion, visible to your team and stakeholders.",
    Icon: ClipboardDocumentListIcon,
  },
  {
    title: "Verified vendors only",
    body: "Badges and checks so your committee sees diligence without slowing the job.",
    Icon: ShieldCheckIcon,
  },
] as const;

/**
 * Explains manager value props and drives “start using services” to contact/demo flow.
 */
export default function ForManagersPage() {
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
          <li className="text-foreground font-medium">For managers</li>
        </ol>
      </nav>

      <header className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <h1 className="font-display text-4xl font-bold tracking-tight text-secondary dark:text-slate-100 sm:text-5xl">
            Manage vendors the smart way
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            One pipeline from tenant issue to vendor payout — built for portfolios that cannot afford
            chaos at scale.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="min-h-[48px] px-8">
              <Link href="/contact">Start using services</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="min-h-[48px] px-8">
              <Link href="/services/vendors">Browse vendors</Link>
            </Button>
          </div>
        </div>
        <div
          className="rounded-2xl border border-slate-200/90 bg-gradient-to-br from-secondary/90 to-secondary p-8 text-white shadow-lg dark:border-slate-700/90"
          aria-hidden
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/75">
            Preview
          </p>
          <p className="mt-4 text-2xl font-display font-bold leading-snug">
            Structured requests. Verified trades. Clear audit trail.
          </p>
        </div>
      </header>

      <section className="mt-20" aria-labelledby="manager-features-heading">
        <h2
          id="manager-features-heading"
          className="font-display text-2xl font-bold text-secondary dark:text-slate-100 sm:text-3xl"
        >
          What you get
        </h2>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2">
          {FEATURES.map(({ title, body, Icon }) => (
            <li
              key={title}
              className="flex gap-4 rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm dark:border-slate-700/90 dark:bg-slate-900/45"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="h-6 w-6" aria-hidden />
              </span>
              <div>
                <h3 className="font-display text-lg font-semibold text-secondary dark:text-slate-100">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-20">
        <ServicesCtaSection
          title="Bring your portfolio onto one maintenance rail"
          description="We’ll walk through how jobs, quotes, and vendors map to your current workflows."
        />
      </div>
    </div>
  );
}
