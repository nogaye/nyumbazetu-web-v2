/**
 * Dynamic resource article page. Renders a single guide, case study, blog, or webinar
 * from lib/resources/content.ts with metadata and HTML content. Supports static generation
 * via generateStaticParams.
 */
import { Section } from "@/components/section";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getAllResourceSlugs,
  getResourceBySlug,
} from "@/lib/resources/content";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllResourceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);
  if (!resource) return { title: "Resource | Nyumba Zetu" };
  return {
    title: `${resource.title} | Nyumba Zetu`,
    description: resource.description,
  };
}

/** Formats a date string for display. */
function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function ResourceSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);
  if (!resource) notFound();

  return (
    <>
      <Section className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 pt-16 md:pt-20 lg:pt-24">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline mb-6"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Back to resources
          </Link>
          <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">
            {resource.type}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-4">
            {resource.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-slate-600 dark:text-slate-400">
            <span className="font-medium text-slate-700 dark:text-slate-300">
              {resource.author}
            </span>
            <time dateTime={resource.date}>{formatDate(resource.date)}</time>
          </div>
        </div>
      </Section>

      <Section>
        <article className="max-w-3xl mx-auto">
          <div
            className="prose prose-slate dark:prose-invert prose-lg max-w-none prose-headings:font-bold prose-a:text-primary prose-a:no-underline hover:prose-a:underline"
            dangerouslySetInnerHTML={{ __html: resource.content }}
          />
        </article>
      </Section>

      <Section className="bg-slate-50 dark:bg-slate-900">
        <div className="max-w-3xl mx-auto text-center">
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            All resources
          </Link>
        </div>
      </Section>
    </>
  );
}
