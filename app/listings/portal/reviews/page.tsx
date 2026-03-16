/**
 * Portal reviews page: view and moderate reviews on property listings.
 * Merged from admin; uses shared ReviewsList component.
 */

import type { Metadata } from "next";
import { ReviewsList } from "@/components/admin/ReviewsList";

export const metadata: Metadata = {
  title: "Reviews | Nyumba Zetu Listings",
  description: "View and moderate reviews on property listings. Feature or hide reviews.",
  robots: { index: false, follow: false },
};

export default function PortalReviewsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-semibold text-slate-900 dark:text-slate-50">
          Reviews
        </h1>
        <p className="mt-1 text-slate-600 dark:text-slate-400">
          View and moderate reviews on property listings. Feature or hide reviews.
        </p>
      </div>
      <ReviewsList />
    </div>
  );
}
