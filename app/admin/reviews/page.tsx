import type { Metadata } from "next";
import { ReviewsList } from "@/components/admin/ReviewsList";

export const metadata: Metadata = {
  title: "Reviews | Admin | Nyumba Zetu",
  description: "Moderate listing reviews",
  robots: { index: false, follow: false },
};

export default function AdminReviewsPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">
            Reviews
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            View and moderate reviews on property listings. Feature or hide reviews.
          </p>
        </div>
        <ReviewsList />
      </div>
    </div>
  );
}
