/**
 * Resources hub page: lists guides, case studies, blog posts, and webinars with filter
 * by type. Each card links to app/resources/[slug] for the full article.
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
import { ResourcesFilterBar } from "@/components/resources-filter-bar";

export const metadata = {
  title: "Resources | Nyumba Zetu",
  description:
    "Property management insights, guides, case studies, and webinars for Kenyan landlords and property managers.",
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

export default async function ResourcesPage({ searchParams }: PageProps) {
  const { type: typeParam } = await searchParams;
  const filter: ResourceFilter =
    typeParam && (VALID_TYPES as string[]).includes(typeParam)
      ? (typeParam as ResourceFilter)
      : "All";
  const resources = getResourcesByFilter(filter);

  return (
    <>
      <Section className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 pt-16 md:pt-20 lg:pt-24">
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
          {resources.map((resource) => (
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

/** Renders a single resource card with type, title, description, date, and Read more link. */
function ResourceCard({ resource }: { resource: ResourceItem }) {
  return (
    <Card className="h-full hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">
          {resource.type}
        </div>
        <CardTitle className="text-xl">{resource.title}</CardTitle>
        <CardDescription>{resource.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-slate-600 dark:text-slate-400 mb-4">
          {new Date(resource.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
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
