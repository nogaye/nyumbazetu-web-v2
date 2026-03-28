/**
 * Route: `/services/categories/[category]` — category hub listing matching vendors.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  SERVICE_CATEGORY_SLUGS,
  categoryLabelFromSlug,
  getVendorsByCategorySlug,
  isServiceCategorySlug,
} from "@/lib/services/vendors-mock";
import { VendorCard } from "@/components/services/vendor-card";

type PageProps = { params: Promise<{ category: string }> };

/**
 * Static paths for each known maintenance category (plumbing, electrical, etc.).
 */
export function generateStaticParams() {
  return SERVICE_CATEGORY_SLUGS.map((category) => ({ category }));
}

/**
 * Title and description mention the category label for SEO.
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  if (!isServiceCategorySlug(category)) {
    return { title: "Category not found" };
  }
  const label = categoryLabelFromSlug(category);
  return {
    title: `${label} vendors`,
    description: `Browse verified ${label.toLowerCase()} vendors for estates and rentals in Kenya (marketing preview).`,
    alternates: { canonical: `/services/categories/${category}` },
  };
}

/**
 * Lists vendors in the category or 404 when the slug is unknown.
 */
export default async function ServiceCategoryPage({ params }: PageProps) {
  const { category } = await params;
  if (!isServiceCategorySlug(category)) notFound();

  const label = categoryLabelFromSlug(category);
  const vendors = getVendorsByCategorySlug(category);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <nav className="text-sm text-muted-foreground" aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/services" className="hover:text-primary">
              Services
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="text-foreground font-medium">{label}</li>
        </ol>
      </nav>
      <header className="mt-6 max-w-3xl">
        <h1 className="font-display text-3xl font-bold text-secondary dark:text-slate-100 sm:text-4xl">
          {label} vendors
        </h1>
        <p className="mt-3 text-muted-foreground">
          {vendors.length} vendor{vendors.length === 1 ? "" : "s"} in this category (mock data).
        </p>
      </header>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {vendors.map((v) => (
          <VendorCard key={v.slug} vendor={v} showRequestCta />
        ))}
      </div>
      {vendors.length === 0 && (
        <p className="mt-10 text-muted-foreground">
          No vendors in this category yet — see the{" "}
          <Link href="/services/vendors" className="font-medium text-primary hover:underline">
            full directory
          </Link>
          .
        </p>
      )}
    </div>
  );
}
