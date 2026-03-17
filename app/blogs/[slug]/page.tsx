/**
 * Dynamic blog post page. Renders a single post from lib/blogs/content.ts
 * with metadata and HTML content. Supports static generation via generateStaticParams.
 */
import { Section } from "@/components/section";
import { ArticleContent } from "@/components/article-content";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllBlogSlugs, getBlogPostBySlug } from "@/lib/blogs/content";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: "Blog Post | Nyumba Zetu" };
  return {
    title: post.title,
    description: post.summary,
  };
}

/** Formats a date string for display. */
function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <Section className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 pt-16 md:pt-20 lg:pt-24">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline mb-6"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Back to blog
          </Link>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">
            Blog post
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-4">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-slate-600 dark:text-slate-400">
            <span className="font-medium text-slate-700 dark:text-slate-300">{post.author}</span>
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            {post.tags.length > 0 && (
              <span className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </span>
            )}
          </div>
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
