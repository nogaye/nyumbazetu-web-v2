/**
 * Billing / Packages: placeholder for listing packages and billing.
 */

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Billing | Nyumba Zetu Listings",
  description: "Listing packages and billing.",
};

export default function PortalBillingPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-slate-900 dark:text-slate-50">
        Billing / Packages
      </h1>
      <p className="mt-1 text-slate-600 dark:text-slate-400">
        Manage your listing plan and billing.
      </p>
      <div className="mt-8 rounded-2xl border border-slate-200/80 bg-white p-12 text-center dark:border-slate-700/80 dark:bg-slate-900/50">
        <p className="text-slate-600 dark:text-slate-400">Billing and packages coming soon.</p>
      </div>
    </div>
  );
}
