/**
 * Merges every blog-shaped article on the site into one ordered list: posts that live under
 * `/blogs/...` (see `getAllBlogListingEntries`) and resource-hub articles marked `Blog` under
 * `/resources/[slug]`. Consumers are the `/blogs` index and `/resources?type=Blog` so both
 * surfaces enumerate the same URLs without maintaining two parallel catalogs by hand.
 */

import { getAllBlogListingEntries } from "@/lib/blogs/content";
import { RESOURCES } from "@/lib/resources/content";

/**
 * One row in the combined blog index: links either to `/blogs/...` or `/resources/...`
 * depending on where the article body is stored.
 */
export interface UnifiedBlogEntry {
  /** Absolute path for Next.js `Link`, e.g. `/blogs/foo` or `/resources/bar`. */
  href: string;
  /** Headline shown on cards and in JSON-LD. */
  title: string;
  /** Short excerpt (HTML-free) for cards and descriptions. */
  summary: string;
  /** Byline author name. */
  author: string;
  /** Publication date for sorting and display (ISO `YYYY-MM-DD`). */
  publishedAt: string;
  /** Topic labels; may be empty when the source only had SEO keywords. */
  tags: string[];
}

/**
 * Builds the full blog index: legacy and single-slug `/blogs` posts plus every `Blog`-typed
 * resource article. Entries are de-duplicated by `href` (first wins), then sorted newest first.
 * @returns All distinct blog links site-wide for listing UIs.
 */
export function getAllUnifiedBlogEntries(): UnifiedBlogEntry[] {
  const fromBlogRoutes: UnifiedBlogEntry[] = getAllBlogListingEntries().map((p) => ({
    href: p.href,
    title: p.title,
    summary: p.summary,
    author: p.author,
    publishedAt: p.publishedAt,
    tags: p.tags,
  }));

  const fromResourceHub: UnifiedBlogEntry[] = RESOURCES.filter((r) => r.type === "Blog").map(
    (r) => ({
      href: `/resources/${r.slug}`,
      title: r.title,
      summary: r.description,
      author: r.author,
      publishedAt: r.date,
      tags: r.keywords ?? [],
    }),
  );

  const byHref = new Map<string, UnifiedBlogEntry>();
  for (const entry of [...fromBlogRoutes, ...fromResourceHub]) {
    if (!byHref.has(entry.href)) {
      byHref.set(entry.href, entry);
    }
  }

  return [...byHref.values()].sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt),
  );
}
