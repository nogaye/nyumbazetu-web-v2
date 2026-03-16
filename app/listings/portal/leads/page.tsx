/**
 * Leads / Inquiries: view and manage property inquiries via InquiriesList.
 * Merged from admin portal for a single portal experience.
 */

import type { Metadata } from "next";
import { InquiriesList } from "@/components/admin/InquiriesList";

export const metadata: Metadata = {
  title: "Leads & Inquiries | Nyumba Zetu Listings",
  description: "View and manage leads and inquiries for your listings.",
};

export default function PortalLeadsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-semibold text-slate-900 dark:text-slate-50">
          Leads / Inquiries
        </h1>
        <p className="mt-1 text-slate-600 dark:text-slate-400">
          Manage all incoming property inquiries from your website.
        </p>
      </div>
      <InquiriesList limit={20} />
    </div>
  );
}
