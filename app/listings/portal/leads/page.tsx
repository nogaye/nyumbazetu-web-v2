/**
 * Leads / Inquiries: placeholder for viewing requests and messages.
 */

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leads & Inquiries | Nyumba Zetu Listings",
  description: "View and manage leads and inquiries for your listings.",
};

export default function PortalLeadsPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-slate-900 dark:text-slate-50">
        Leads / Inquiries
      </h1>
      <p className="mt-1 text-slate-600 dark:text-slate-400">
        Viewing requests and messages from potential renters or buyers.
      </p>
      <div className="mt-8 rounded-2xl border border-slate-200/80 bg-white p-12 text-center dark:border-slate-700/80 dark:bg-slate-900/50">
        <p className="text-slate-600 dark:text-slate-400">No inquiries yet.</p>
      </div>
    </div>
  );
}
