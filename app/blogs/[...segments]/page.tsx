/**
 * Blog detail page that supports both URL formats:
 * - /blogs/{slug}
 * - /blogs/{legacyId}/{slug}
 */
import { Section } from "@/components/section";
import { ArticleContent } from "@/components/article-content";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { getAllBlogSlugs, getBlogPostBySlug } from "@/lib/blogs/content";
import {
  getAllMigratedBlogParams,
  getMigratedBlogPost,
} from "@/lib/blogs/migrated-content";

interface PageProps {
  params: Promise<{ segments: string[] }>;
}

type BlogPageData = {
  title: string;
  summary: string;
  content: string;
  publishedAt: string;
  author: string;
  tags: string[];
};

function getBlogPageData(segments: string[]): BlogPageData | null {
  if (segments.length === 1) {
    return getBlogPostBySlug(segments[0]);
  }

  if (segments.length === 2) {
    const [id, slug] = segments;
    return getMigratedBlogPost(id, slug);
  }

  return null;
}

export async function generateStaticParams() {
  return [
    ...getAllBlogSlugs().map((slug) => ({ segments: [slug] })),
    ...getAllMigratedBlogParams().map(({ id, slug }) => ({ segments: [id, slug] })),
  ];
}

export async function generateMetadata({ params }: PageProps) {
  const { segments } = await params;
  const post = getBlogPageData(segments);

  if (!post) {
    return { title: "Blog Post | Nyumba Zetu" };
  }

  return {
    title: post.title,
    description: post.summary,
  };
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { segments } = await params;
  const post = getBlogPageData(segments);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Section className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 pt-16 md:pt-20 lg:pt-24 pb-8 md:pb-10 lg:pb-12">
        <div className="max-w-3xl mx-auto px-1 sm:px-0">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline mb-8"
          >
            <ArrowLeftIcon className="h-4 w-4 shrink-0" />
            Back to blog
          </Link>
          <header className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">
              Blog post
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-[2.5rem] font-bold text-slate-900 dark:text-slate-50 mb-6 leading-tight max-w-[52rem] mx-auto">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm md:text-base text-slate-600 dark:text-slate-400">
              <span className="font-medium text-slate-700 dark:text-slate-300">{post.author}</span>
              <span className="hidden sm:inline text-slate-300 dark:text-slate-600" aria-hidden>
                ·
              </span>
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            </div>
            {post.tags.length > 0 && (
              <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-slate-100 dark:bg-slate-800 px-3 py-1 text-xs text-slate-700 dark:text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>
        </div>
      </Section>

      <Section>
        <div className="max-w-6xl mx-auto">
          <ArticleContent html={post.content} title="On this page" />
        </div>
      </Section>

      <Section className="bg-slate-50 dark:bg-slate-900">
        <div className="max-w-3xl mx-auto text-center">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            All blog posts
          </Link>
        </div>
      </Section>
    </>
  );
}
