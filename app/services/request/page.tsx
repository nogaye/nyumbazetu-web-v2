/**
 * Route: `/services/request` — interactive demo of the maintenance request flow:
 * property/block/unit context, rich job details (including photos and urgency),
 * AI-labelled vendor suggestions with Recommended vs All and cheapest/fastest bias,
 * and multi-vendor send (mock only).
 */

import type { Metadata } from "next";
import Link from "next/link";
import { RequestServiceFlow } from "@/components/services/request-service-flow";

export const metadata: Metadata = {
  title: "Request a service",
  description:
    "Submit a maintenance request with unit context, photos, and urgency. Compare AI-ranked vendors and send to one or more partners (product preview).",
  alternates: { canonical: "/services/request" },
};

/**
 * Marketing preview page wrapping the client request flow with breadcrumb chrome.
 */
export default function RequestServicePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <nav className="text-sm text-muted-foreground" aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/services" className="hover:text-primary">
              Services
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="font-medium text-foreground">Request a service</li>
        </ol>
      </nav>

      <header className="mt-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          Vendor marketplace
        </p>
        <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-secondary dark:text-slate-50 sm:text-4xl">
          Request a service
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          One form from your portfolio: vendors see exactly where the job is, how urgent it is, and
          what it looks like — before they quote.
        </p>
      </header>

      <div className="mt-12">
        <RequestServiceFlow />
      </div>
    </div>
  );
}
