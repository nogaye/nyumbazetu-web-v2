/**
 * Portal comments page: view and moderate Q&A comments on property listings.
 * Merged from admin; uses shared CommentsList component.
 */

import type { Metadata } from "next";
import { CommentsList } from "@/components/admin/CommentsList";

export const metadata: Metadata = {
  title: "Comments | Nyumba Zetu Listings",
  description: "View and moderate Q&A comments on property listings.",
  robots: { index: false, follow: false },
};

export default function PortalCommentsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-semibold text-slate-900 dark:text-slate-50">
          Comments
        </h1>
        <p className="mt-1 text-slate-600 dark:text-slate-400">
          View and moderate Q&A comments on property listings.
        </p>
      </div>
      <CommentsList />
    </div>
  );
}
