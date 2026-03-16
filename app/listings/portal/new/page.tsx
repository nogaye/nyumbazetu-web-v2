/**
 * New listing flow: placeholder for creating a listing from the portal.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "New Listing | Nyumba Zetu Listings",
  description: "Create a new property listing.",
};

export default function PortalNewListingPage() {
  return (
    <div>
      <Link
        href="/listings/portal"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 mb-6"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Back to dashboard
      </Link>
      <h1 className="font-display text-2xl font-semibold text-slate-900 dark:text-slate-50">
        New listing
      </h1>
      <p className="mt-1 text-slate-600 dark:text-slate-400">
        The step-by-step listing creation form will be implemented here.
      </p>
      <div className="mt-8 rounded-2xl border border-slate-200/80 bg-white p-12 text-center dark:border-slate-700/80 dark:bg-slate-900/50">
        <p className="text-slate-600 dark:text-slate-400">Listing form coming soon.</p>
        <Button asChild variant="outline" className="mt-4">
          <Link href="/listings/portal">Back to dashboard</Link>
        </Button>
      </div>
    </div>
  );
}
