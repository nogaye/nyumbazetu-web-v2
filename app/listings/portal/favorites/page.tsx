/**
 * Saved listings: placeholder for the user's saved/favorite properties.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Saved Listings | Nyumba Zetu Listings",
  description: "Your saved property listings.",
};

export default function PortalFavoritesPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-slate-900 dark:text-slate-50">
        Saved listings
      </h1>
      <p className="mt-1 text-slate-600 dark:text-slate-400">
        Properties you’ve saved. Sign in to see them across devices.
      </p>
      <div className="mt-8 rounded-2xl border border-slate-200/80 bg-white p-12 text-center dark:border-slate-700/80 dark:bg-slate-900/50">
        <p className="text-slate-600 dark:text-slate-400">No saved listings.</p>
        <Button asChild variant="outline" className="mt-4">
          <Link href="/listings/search">Browse listings</Link>
        </Button>
      </div>
    </div>
  );
}
