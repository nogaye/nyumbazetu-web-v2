/**
 * Route: `/services` — main vendor marketplace landing (hero, flow, featured, categories, trust, CTA).
 */

import type { Metadata } from "next";
import { ServicesLanding } from "@/components/services/services-landing";

export const metadata: Metadata = {
  title: "Maintenance & vendor marketplace",
  description:
    "Trusted vendors for property maintenance and services. Verified partners, clear quotes, and central job tracking for Kenyan portfolios.",
  alternates: { canonical: "/services" },
};

/**
 * Server-rendered marketing landing for the vendor marketplace experience.
 */
export default function ServicesPage() {
  return <ServicesLanding />;
}
