/**
 * My Listings: placeholder for draft, pending, live, expired listings.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "My Listings | Nyumba Zetu Listings",
  description: "Manage your property listings.",
};

export default function PortalMyListingsPage() {
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-2xl font-semibold text-slate-900 dark:text-slate-50">
          My Listings
        </h1>
        <Button asChild className="gap-2 bg-[#344767] hover:bg-[#2a3952] text-white">
          <Link href="/listings/portal/new">
            <PlusCircle className="h-4 w-4" aria-hidden />
            New listing
          </Link>
        </Button>
      </div>
      <p className="mt-1 text-slate-600 dark:text-slate-400">
        Drafts, pending review, live and expired listings will appear here.
      </p>
      <div className="mt-8 rounded-2xl border border-slate-200/80 bg-white p-12 text-center dark:border-slate-700/80 dark:bg-slate-900/50">
        <p className="text-slate-600 dark:text-slate-400">No listings yet.</p>
        <Button asChild className="mt-4">
          <Link href="/listings/post">Post a listing</Link>
        </Button>
      </div>
    </div>
  );
}
