/**
 * Listings portal dashboard: overview of listings, leads, and quick actions.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { PlusCircle, List, MessageSquare, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Listings Dashboard | Nyumba Zetu Listings",
  description: "Manage your property listings, leads and performance.",
};

export default function ListingsPortalPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-slate-900 dark:text-slate-50">
        Dashboard
      </h1>
      <p className="mt-1 text-slate-600 dark:text-slate-400">
        Overview of your listings and inquiries.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="My Listings"
          description="View and edit your active listings"
          href="/listings/portal/my-listings"
          icon={List}
        />
        <DashboardCard
          title="New Listing"
          description="Post a new property"
          href="/listings/portal/new"
          icon={PlusCircle}
        />
        <DashboardCard
          title="Leads / Inquiries"
          description="Messages and viewing requests"
          href="/listings/portal/leads"
          icon={MessageSquare}
        />
        <DashboardCard
          title="Saved"
          description="Your saved listings"
          href="/listings/portal/favorites"
          icon={Heart}
        />
      </div>

      <div className="mt-10 rounded-2xl border border-slate-200/80 bg-white p-6 dark:border-slate-700/80 dark:bg-slate-900/50">
        <h2 className="font-display text-lg font-semibold text-slate-900 dark:text-slate-50">
          Quick stats
        </h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Stats (views, saves, inquiries) will appear here when you have listings.
        </p>
        <Button asChild className="mt-4 bg-[#344767] hover:bg-[#2a3952] text-white">
          <Link href="/listings/post">Post your first listing</Link>
        </Button>
      </div>
    </div>
  );
}

function DashboardCard({
  title,
  description,
  href,
  icon: Icon,
}: {
  title: string;
  description: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <Link
      href={href}
      className="block rounded-xl border border-slate-200/80 bg-white p-5 transition-colors hover:border-slate-300 hover:bg-slate-50/80 dark:border-slate-700/80 dark:bg-slate-900/60 dark:hover:border-slate-600 dark:hover:bg-slate-800/80"
    >
      <Icon className="h-8 w-8 text-[#344767]" aria-hidden />
      <h3 className="mt-3 font-medium text-slate-900 dark:text-slate-50">{title}</h3>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{description}</p>
    </Link>
  );
}
