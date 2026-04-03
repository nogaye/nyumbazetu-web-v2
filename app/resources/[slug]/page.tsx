/**
 * Dynamic resource article page. Renders a single guide, case study, blog, or webinar
 * from lib/resources/content.ts with metadata, JSON-LD, optional featured image, and
 * HTML content. Optimized for SEO (canonical, Open Graph, Twitter, Article schema).
 */
import { Section } from "@/components/section";
import { ArticleContent } from "@/components/article-content";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  getAllResourceSlugs,
  getResourceBySlug,
  type ResourceItem,
} from "@/lib/resources/content";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import type { Metadata } from "next";

const SITE_URL = "https://www.nyumbazetu.com";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllResourceSlugs().map((slug) => ({ slug }));
}

/** Truncates description for meta (aim ~155 chars). */
function metaDescription(description: string, maxLen = 160): string {
  if (description.length <= maxLen) return description;
  return description.slice(0, maxLen - 3).trim() + "...";
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);
  if (!resource)
    return { title: "Resource | Nyumba Zetu" };

  const title = `${resource.title} | Nyumba Zetu`;
  const description = metaDescription(resource.description);
  const url = `${SITE_URL}/resources/${slug}`;
  const imageUrl = resource.image ? `${SITE_URL}${resource.image.src}` : `${SITE_URL}/og-image.jpg`;

  return {
    title,
    description,
    keywords: resource.keywords?.join(", "),
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      type: "article",
      url,
      publishedTime: resource.date,
      authors: [resource.author],
      siteName: "Nyumba Zetu",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: resource.image?.alt ?? resource.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
      creator: "@nyumbazetu",
    },
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

/** Builds Article JSON-LD for the resource (SEO / rich results). */
function buildArticleJsonLd(resource: ResourceItem, slug: string) {
  const url = `${SITE_URL}/resources/${slug}`;
  const imageUrl = resource.image ? `${SITE_URL}${resource.image.src}` : undefined;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: resource.title,
    description: resource.description,
    datePublished: resource.date,
    author: {
      "@type": "Organization",
      name: resource.author,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Nyumba Zetu",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.svg`,
      },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    ...(imageUrl && {
      image: {
        "@type": "ImageObject",
        url: imageUrl,
        ...(resource.image?.alt && { caption: resource.image.alt }),
      },
    }),
    ...(resource.keywords?.length && { keywords: resource.keywords.join(", ") }),
  };
}

export default async function ResourceSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);
  if (!resource) notFound();

  const articleJsonLd = buildArticleJsonLd(resource, slug);

  return (
    <>
      {articleJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
      )}

      <Section className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 pt-16 md:pt-20 lg:pt-24 pb-8 md:pb-10 lg:pb-12">
        <div className="max-w-3xl mx-auto px-1 sm:px-0">
          <nav aria-label="Breadcrumb">
            <Link
              href="/resources"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline mb-8"
            >
              <ArrowLeftIcon className="h-4 w-4 shrink-0" />
              Back to resources
            </Link>
          </nav>
          <header className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">
              {resource.type}
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-[2.5rem] font-bold text-slate-900 dark:text-slate-50 mb-6 leading-tight max-w-[52rem] mx-auto">
              {resource.title}
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm md:text-base text-slate-600 dark:text-slate-400">
              <span className="font-medium text-slate-700 dark:text-slate-300">
                {resource.author}
              </span>
              <span className="hidden sm:inline text-slate-300 dark:text-slate-600" aria-hidden>
                ·
              </span>
              <time dateTime={resource.date}>{formatDate(resource.date)}</time>
            </div>
            <p className="mt-8 max-w-2xl mx-auto text-base leading-relaxed text-slate-600 dark:text-slate-400">
              {resource.description}
            </p>
          </header>
        </div>
      </Section>

      {resource.image && (
        <Section className="py-0">
          <div className="max-w-4xl mx-auto">
            <figure className="rounded-xl overflow-hidden shadow-md bg-slate-100 dark:bg-slate-800">
              <Image
                src={resource.image.src}
                alt={resource.image.alt}
                width={1200}
                height={630}
                className="w-full h-auto object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 1024px"
              />
            </figure>
          </div>
        </Section>
      )}

      <Section>
        <div className="max-w-6xl mx-auto">
          <ArticleContent html={resource.content} title="In this article" />
        </div>
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
