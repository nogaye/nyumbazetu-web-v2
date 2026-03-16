/**
 * My Listings: manage property listings (create, edit, delete) via PropertiesAdminList.
 * Merged from admin portal for a single portal experience.
 */

import type { Metadata } from "next";
import { PropertiesAdminList } from "@/components/admin/PropertiesAdminList";

export const metadata: Metadata = {
  title: "My Listings | Nyumba Zetu Listings",
  description: "Create, edit, and manage your property listings.",
};

export default function PortalMyListingsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-semibold text-slate-900 dark:text-slate-50">
          My Listings
        </h1>
        <p className="mt-1 text-slate-600 dark:text-slate-400">
          Create, edit, and manage property listings.
        </p>
      </div>
      <PropertiesAdminList />
    </div>
  );
}
