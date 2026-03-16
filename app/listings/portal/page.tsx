/**
 * Listings portal dashboard: overview with KPIs, visitors chart, documents table,
 * and quick links. Merged from admin dashboard for a single portal experience.
 */

import type { Metadata } from "next";
import { DashboardContent } from "@/components/admin/DashboardContent";

export const metadata: Metadata = {
  title: "Listings Dashboard | Nyumba Zetu Listings",
  description: "Manage your property listings, leads and performance.",
};

export default function ListingsPortalPage() {
  return (
    <div className="space-y-6">
      <DashboardContent />
    </div>
  );
}
