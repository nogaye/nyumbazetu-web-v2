import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { BLOG_POSTS } from "@/lib/blogs/content";

export const metadata = {
  title: "Blog – Property Management Insights for Kenya",
  description:
    "Articles on property management software, rent collection with M-Pesa, HOA and estate management, and accounting in Kenya. Tips and guides from Nyumba Zetu.",
};

/** Formats a date string for display (e.g. "15 Jan 2025"). */
function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export default function BlogsPage() {

  return (
    <>
      <Section className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 pt-16 md:pt-20 lg:pt-24">
        <SectionHeader
          title="Blog & Insights"
          description="Property management insights for Kenya: rent collection, M-Pesa, HOA and estate management, and accounting. Original guides and articles from Nyumba Zetu."
        />
      </Section>

      <Section>
        <div className="max-w-5xl mx-auto">
          <div className="space-y-8">
            {BLOG_POSTS.map((post) => (
              <Card key={post.slug} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-6 md:p-8">
                  <h2 className="text-2xl font-semibold mb-2">
                    <Link
                      href={`/blogs/${post.slug}`}
                      className="text-slate-900 dark:text-slate-50 hover:text-primary transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-slate-700 dark:text-slate-300 mb-4">{post.summary}</p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                    <span className="font-medium text-slate-700 dark:text-slate-300">{post.author}</span>
                    <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                    {post.tags.length > 0 && (
                      <span className="flex flex-wrap gap-2">
                        {post.tags.slice(0, 3).map((tag) => (
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
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}


