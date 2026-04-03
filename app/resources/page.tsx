/**
 * Resources hub page: lists guides, case studies, blog posts, and webinars with filter
 * by type. Most cards link to `/resources/[slug]`; the Blog filter uses the unified blog
 * catalog so the same articles appear as on `/blogs` (including `/blogs/...` URLs). SEO:
 * metadata, Open Graph, ItemList JSON-LD.
 */
import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { NewsletterSignup } from "@/components/newsletter-signup";
import Link from "next/link";
import {
  getResourcesByFilter,
  type ResourceFilter,
  type ResourceItem,
} from "@/lib/resources/content";
import {
  getAllUnifiedBlogEntries,
  type UnifiedBlogEntry,
} from "@/lib/blogs/unified-blog-list";
import { ResourcesFilterBar } from "@/components/resources-filter-bar";
import type { Metadata } from "next";

const SITE_URL = "https://www.nyumbazetu.com";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Guides, case studies, blog posts, and webinars on property management in Kenya: rent collection, M-Pesa, HOA service charges, KRA eTIMS, and accounting.",
  keywords: [
    "property management resources Kenya",
    "rent collection guide",
    "HOA case study",
    "KRA audit property manager",
    "property accounting webinar",
  ],
  alternates: { canonical: `${SITE_URL}/resources` },
  openGraph: {
    title: "Resources | Nyumba Zetu",
    description:
      "Guides, case studies, blog posts, and webinars on property management in Kenya.",
    url: `${SITE_URL}/resources`,
    type: "website",
    siteName: "Nyumba Zetu",
  },
  twitter: {
    card: "summary_large_image",
    title: "Resources | Nyumba Zetu",
    description:
      "Guides, case studies, blog posts, and webinars on property management in Kenya.",
  },
};

/** Valid type search param; maps to ResourceFilter. */
const VALID_TYPES: ResourceFilter[] = [
  "All",
  "Blog",
  "Guide",
  "Case Study",
  "Webinar",
];

/** Filter options for the bar: param value and display label. */
const FILTER_OPTIONS: { value: ResourceFilter; label: string }[] = [
  { value: "All", label: "All" },
  { value: "Blog", label: "Blog" },
  { value: "Guide", label: "Guides" },
  { value: "Case Study", label: "Case Studies" },
  { value: "Webinar", label: "Webinars" },
];

interface PageProps {
  searchParams: Promise<{ type?: string }>;
}

/** Builds ItemList JSON-LD for the current resource list (SEO). */
function buildItemListJsonLd(resources: ResourceItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Property management resources for Kenya",
    description: "Guides, case studies, blog posts, and webinars for Kenyan landlords and property managers.",
    numberOfItems: resources.length,
    itemListElement: resources.map((r, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE_URL}/resources/${r.slug}`,
      name: r.title,
    })),
  };
}

/**
 * ItemList JSON-LD for the unified blog view (`?type=Blog`), using each entry’s canonical
 * path (`/blogs/...` or `/resources/...`).
 * @param entries Rows from `getAllUnifiedBlogEntries`, newest first.
 * @returns Schema.org ItemList suitable for `application/ld+json`.
 */
function buildUnifiedBlogItemListJsonLd(entries: UnifiedBlogEntry[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Property management blog posts for Kenya",
    description:
      "Blog posts and articles for Kenyan landlords, committees, and property managers.",
    numberOfItems: entries.length,
    itemListElement: entries.map((e, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE_URL}${e.href}`,
      name: e.title,
    })),
  };
}

export default async function ResourcesPage({ searchParams }: PageProps) {
  const { type: typeParam } = await searchParams;
  const filter: ResourceFilter =
    typeParam && (VALID_TYPES as string[]).includes(typeParam)
      ? (typeParam as ResourceFilter)
      : "All";
  const resources = getResourcesByFilter(filter);
  const unifiedBlogs = filter === "Blog" ? getAllUnifiedBlogEntries() : [];
  const itemListJsonLd =
    filter === "Blog"
      ? buildUnifiedBlogItemListJsonLd(unifiedBlogs)
      : buildItemListJsonLd(resources);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <Section className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 pt-16 md:pt-20 lg:pt-24 pb-3 md:pb-4 lg:pb-5">
        <SectionHeader
          title="Property management resources for the Kenyan market"
          description="Learn from industry experts, real-world case studies, and practical guides."
        />
      </Section>

      <Section>
        <ResourcesFilterBar
          options={FILTER_OPTIONS}
          currentFilter={filter}
          basePath="/resources"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filter === "Blog"
            ? unifiedBlogs.map((entry) => (
                <UnifiedBlogResourceCard key={entry.href} entry={entry} />
              ))
            : resources.map((resource) => (
                <ResourceCard key={resource.slug} resource={resource} />
              ))}
        </div>
      </Section>

      {/* Newsletter Signup */}
      <Section className="bg-slate-50 dark:bg-slate-900">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-4">
            Stay updated with property management insights
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
            Get the latest guides, case studies, and industry news delivered to
            your inbox.
          </p>
          <NewsletterSignup />
        </div>
      </Section>
    </>
  );
}

/**
 * Card for the Blog filter: supports both `/blogs/...` and `/resources/...` targets from the
 * unified blog list.
 * @param entry One row from `getAllUnifiedBlogEntries`.
 */
function UnifiedBlogResourceCard({ entry }: { entry: UnifiedBlogEntry }) {
  return (
    <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden">
      <CardHeader>
        <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">
          Blog
        </div>
        <CardTitle className="text-xl">
          <Link
            href={entry.href}
            className="text-slate-900 dark:text-slate-50 hover:text-primary transition-colors"
          >
            {entry.title}
          </Link>
        </CardTitle>
        <CardDescription>{entry.summary}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-slate-600 dark:text-slate-400 mb-4">
          <time dateTime={entry.publishedAt}>
            {new Date(entry.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </div>
        <Link
          href={entry.href}
          className="text-sm font-medium text-primary hover:underline inline-flex items-center"
        >
          Read more →
        </Link>
      </CardContent>
    </Card>
  );
}

/** Renders a single resource card with type, title, description, date, and Read more link. */
function ResourceCard({ resource }: { resource: ResourceItem }) {
  return (
    <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden">
      <CardHeader>
        <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">
          {resource.type}
        </div>
        <CardTitle className="text-xl">
          <Link
            href={`/resources/${resource.slug}`}
            className="text-slate-900 dark:text-slate-50 hover:text-primary transition-colors"
          >
            {resource.title}
          </Link>
        </CardTitle>
        <CardDescription>{resource.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-slate-600 dark:text-slate-400 mb-4">
          <time dateTime={resource.date}>
            {new Date(resource.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </div>
        <Link
          href={`/resources/${resource.slug}`}
          className="text-sm font-medium text-primary hover:underline inline-flex items-center"
        >
          Read more →
        </Link>
      </CardContent>
    </Card>
  );
}
