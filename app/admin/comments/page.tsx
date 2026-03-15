import type { Metadata } from "next";
import { CommentsList } from "@/components/admin/CommentsList";

export const metadata: Metadata = {
  title: "Comments | Admin | Nyumba Zetu",
  description: "Moderate listing comments (Q&A)",
  robots: { index: false, follow: false },
};

export default function AdminCommentsPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">
            Comments
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            View and moderate Q&A comments on property listings.
          </p>
        </div>
        <CommentsList />
      </div>
    </div>
  );
}
