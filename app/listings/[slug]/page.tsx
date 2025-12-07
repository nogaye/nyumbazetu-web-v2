import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

// TODO: Replace with real Supabase query to fetch listing by slug
async function getListing(slug: string) {
  // This is a placeholder - implement real data fetching
  return null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const listing = await getListing(slug);

  if (!listing) {
    return {
      title: "Listing Not Found | Nyumba Zetu",
    };
  }

  return {
    title: `${listing.title} | Nyumba Zetu`,
    description: listing.description,
  };
}

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const listing = await getListing(slug);

  if (!listing) {
    notFound();
  }

  // TODO: Implement full listing detail page with:
  // - Image gallery
  // - Full property details
  // - Contact form/button
  // - Map (optional)
  // - Similar listings

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Link href="/listings">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Listings
          </Button>
        </Link>

        <div className="rounded-2xl bg-white p-8 shadow-sm dark:bg-slate-900">
          <h1 className="mb-4 text-3xl font-bold text-slate-900 dark:text-slate-50">
            Listing: {slug}
          </h1>
          <p className="mt-4 text-sm text-slate-500 dark:text-slate-500">
            This listing detail page is under construction. Full implementation coming soon.
          </p>
        </div>
      </div>
    </div>
  );
}

