/**
 * Performance: placeholder for views, saves, and listing analytics.
 */

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Performance | Nyumba Zetu Listings",
  description: "Views, saves and performance for your listings.",
};

export default function PortalPerformancePage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-slate-900 dark:text-slate-50">
        Performance
      </h1>
      <p className="mt-1 text-slate-600 dark:text-slate-400">
        Views, saves and inquiry stats per listing.
      </p>
      <div className="mt-8 rounded-2xl border border-slate-200/80 bg-white p-12 text-center dark:border-slate-700/80 dark:bg-slate-900/50">
        <p className="text-slate-600 dark:text-slate-400">Performance data will appear here when you have listings.</p>
      </div>
    </div>
  );
}
