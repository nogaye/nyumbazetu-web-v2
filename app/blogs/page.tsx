import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Blogs - Nyumba Zetu",
  description: "Read the latest articles and insights from Nyumba Zetu",
};

// This would typically come from an API or CMS
// For now, using placeholder data structure
interface Blog {
  id: number;
  uuid?: string;
  title: string;
  url?: string;
  author?: {
    name?: string;
    imageUrl?: string;
  } | string;
  content?: string;
  summary?: string;
  publishedDate?: Date;
  timeAgo?: string;
  lastUpdated?: Date | string;
  tags?: string[];
  categories?: string[];
  imageUrl?: string;
  slug?: string;
  status?: "draft" | "published" | "archived";
}

export default function BlogsPage() {
  // Placeholder - in production, this would fetch from an API
  const blogs: Blog[] = [];

  return (
    <>
      <Section className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 pt-16 md:pt-20 lg:pt-24">
        <SectionHeader
          title="Blogs & Insights"
          description="Stay updated with the latest property management insights, tips, and industry news"
        />
      </Section>

      <Section>
        <div className="max-w-5xl mx-auto">
          {blogs.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-lg text-slate-600 dark:text-slate-400">
                  No blog posts available at the moment. Check back soon for updates!
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-8">
              {blogs.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <div className="flex flex-col md:flex-row gap-4">
                    {item.imageUrl && (
                      <div className="w-full md:w-1/3 relative rounded-lg overflow-hidden">
                        <Image
                          className="w-full h-full object-cover"
                          src={item.imageUrl}
                          alt={item.title}
                          width={400}
                          height={300}
                          sizes="(max-width: 768px) 100vw, 400px"
                        />
                      </div>
                    )}
                    <div className={`flex-1 ${item.imageUrl ? "md:w-2/3" : "w-full"} p-4 md:p-6`}>
                      <h3 className="text-2xl font-semibold mb-2">
                        <Link
                          href={item.url || `/blogs/${item.slug || item.id}`}
                          className="text-slate-900 dark:text-slate-50 hover:underline"
                        >
                          {item.title}
                        </Link>
                      </h3>
                      {item.summary && (
                        <p
                          className="text-slate-700 dark:text-slate-300 mb-4"
                          dangerouslySetInnerHTML={{ __html: item.summary }}
                        />
                      )}
                      <div className="author mt-3 flex items-center gap-2">
                        {typeof item.author === "object" && item.author?.imageUrl && (
                          <Image
                            src={item.author.imageUrl}
                            alt={item.author.name || "Author"}
                            className="rounded-full shadow-md"
                            width={40}
                            height={40}
                          />
                        )}
                        <div className="name">
                          <span className="text-slate-700 dark:text-slate-300 font-medium">
                            {typeof item.author === "object"
                              ? item.author?.name
                              : item.author || "Nyumba Zetu"}
                          </span>
                          <div className="stats">
                            <small className="text-slate-500 dark:text-slate-400 block">
                              {item.timeAgo || "Recently"}
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </Section>
    </>
  );
}


