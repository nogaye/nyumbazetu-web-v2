/**
 * Portal settings: placeholder for profile and company settings.
 */

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings | Nyumba Zetu Listings",
  description: "Profile and company settings for your listings account.",
};

export default function PortalSettingsPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-slate-900 dark:text-slate-50">
        Settings
      </h1>
      <p className="mt-1 text-slate-600 dark:text-slate-400">
        Profile, company and notification settings.
      </p>
      <div className="mt-8 rounded-2xl border border-slate-200/80 bg-white p-12 text-center dark:border-slate-700/80 dark:bg-slate-900/50">
        <p className="text-slate-600 dark:text-slate-400">Settings form coming soon.</p>
      </div>
    </div>
  );
}
