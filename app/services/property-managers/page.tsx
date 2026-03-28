/**
 * Route: `/services/property-managers` — dedicated marketplace for property management
 * providers (distinct from maintenance vendors). Hero and marketing blocks are
 * server-rendered; filtering and profile sheet are client-side on mock data.
 */

import type { Metadata } from "next";
import Link from "next/link";
import {
  MOCK_PROPERTY_MANAGERS,
  aggregateMarketplaceStats,
} from "@/lib/services/property-managers-mock";
import { PropertyManagerMarketplaceHero } from "@/components/services/property-manager-marketplace-hero";
import {
  PROPERTY_MANAGER_MARKETPLACE_FAQ,
  PropertyManagerMarketplaceMarketing,
} from "@/components/services/property-manager-marketplace-marketing";
import { PropertyManagersMarketplaceClient } from "@/components/services/property-managers-marketplace-client";

export const metadata: Metadata = {
  title: "Property manager marketplace",
  description:
    "Find and compare property management companies for residential, commercial, student, and estate portfolios. Verified profiles, pricing models, and consultation requests — built for landlords and owners in Kenya and beyond.",
  alternates: { canonical: "/services/property-managers" },
  openGraph: {
    title: "Property manager marketplace | Nyumba Zetu",
    description:
      "Discover trusted property managers: compare coverage, fees, response standards, and reviews. Separate from maintenance vendors.",
  },
};

/**
 * Renders breadcrumbs, hero stats, interactive directory, and marketing/FAQ sections.
 */
export default function PropertyManagersMarketplacePage() {
  const stats = aggregateMarketplaceStats(MOCK_PROPERTY_MANAGERS);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: PROPERTY_MANAGER_MARKETPLACE_FAQ.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <nav className="text-sm text-muted-foreground" aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/services" className="hover:text-primary">
                Services
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="font-medium text-foreground">Property managers</li>
          </ol>
        </nav>
      </div>
      <PropertyManagerMarketplaceHero
        managerCount={stats.managerCount}
        propertiesManaged={stats.propertiesManaged}
        avgRating={stats.avgRating}
        citiesCovered={stats.citiesCovered}
      />
      <PropertyManagersMarketplaceClient managers={MOCK_PROPERTY_MANAGERS} />
      <PropertyManagerMarketplaceMarketing />
    </>
  );
}
