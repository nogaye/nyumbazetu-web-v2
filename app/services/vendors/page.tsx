/**
 * Route: `/services/vendors` — directory with filters and vendor grid.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { MOCK_VENDORS } from "@/lib/services/vendors-mock";
import { VendorsDirectoryClient } from "@/components/services/vendors-directory-client";

export const metadata: Metadata = {
  title: "Browse vendors",
  description:
    "Filter verified maintenance vendors by category, area, and rating. Featured partners are highlighted in the directory.",
  alternates: { canonical: "/services/vendors" },
};

/**
 * Renders page chrome and delegates interactive filtering to the client directory.
 */
export default function VendorsListingPage() {
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
          <li className="text-foreground font-medium">Vendors</li>
        </ol>
      </nav>
      <header className="mt-6 max-w-3xl">
        <h1 className="font-display text-3xl font-bold text-secondary dark:text-slate-100 sm:text-4xl">
          Vendor directory
        </h1>
        <p className="mt-3 text-muted-foreground">
          Explore verified trades for your properties. Filters run on mock data until live search ships.
        </p>
      </header>
      <div className="mt-12">
        <VendorsDirectoryClient vendors={MOCK_VENDORS} />
      </div>
    </div>
  );
}
