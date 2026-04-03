/**
 * Shared article renderer for long-form blog and resource pages.
 * It normalizes heading ids, enforces readable prose width and spacing, and
 * optionally exposes a table of contents for faster scanning and navigation.
 * Body styles use Tailwind Typography (`prose`); the `@tailwindcss/typography` plugin
 * must be enabled in `tailwind.config.ts` or these classes have no effect.
 */

import Link from "next/link";

interface ArticleHeading {
  /** Stable DOM id used for in-page navigation. */
  id: string;
  /** Heading label shown in the table of contents. */
  label: string;
  /** Heading level extracted from the HTML content. */
  level: 2 | 3;
}

interface ArticleContentProps {
  /** Raw article HTML from the content source. */
  html: string;
  /** Optional article title used as the TOC heading. */
  title?: string;
}

/**
 * Converts a heading label into a URL-friendly fragment id (lowercase, hyphenated).
 *
 * @param label - Plain text or HTML-stripped heading text.
 * @returns A slug safe for `id` and hash URLs.
 */
function slugifyHeading(label: string): string {
  return label
    .toLowerCase()
    .replace(/&nbsp;/g, " ")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

/**
 * Extracts h2 and h3 headings from the article HTML for the table of contents.
 *
 * @param html - Raw article HTML.
 * @returns Heading metadata ordered as it appears in the article.
 */
function extractHeadings(html: string): ArticleHeading[] {
  const headings: ArticleHeading[] = [];
  const pattern = /<h([23])>(.*?)<\/h\1>/gi;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(html)) !== null) {
    const level = Number(match[1]) as 2 | 3;
    const label = match[2].replace(/<[^>]+>/g, "").trim();
    if (!label) continue;
    headings.push({ id: slugifyHeading(label), label, level });
  }

  return headings;
}

/**
 * Adds stable ids to h2 and h3 elements so headings can be linked from the TOC.
 *
 * @param html - Raw article HTML.
 * @returns HTML with ids injected into supported headings.
 */
function addHeadingIds(html: string): string {
  return html.replace(/<h([23])>(.*?)<\/h\1>/gi, (_match, level: string, inner: string) => {
    const text = inner.replace(/<[^>]+>/g, "").trim();
    const id = slugifyHeading(text);
    return `<h${level} id="${id}">${inner}</h${level}>`;
  });
}

/**
 * Renders article prose with consistent spacing, readable measure, and an optional TOC.
 *
 * @param props - Component inputs.
 * @returns A semantic article body with in-page navigation for long-form content.
 */
export function ArticleContent({ html, title = "On this page" }: ArticleContentProps) {
  const headings = extractHeadings(html);
  const content = addHeadingIds(html);

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-12">
      <article className="min-w-0">
        <div
          className="prose prose-slate dark:prose-invert prose-lg max-w-none
            prose-headings:font-bold prose-headings:tracking-tight prose-headings:scroll-mt-28
            prose-h2:mt-14 prose-h2:mb-5 prose-h2:text-2xl md:prose-h2:text-[1.75rem] prose-h2:leading-snug prose-h2:text-slate-900 dark:prose-h2:text-slate-50
            prose-h2:first:mt-0
            prose-h3:mt-10 prose-h3:mb-4 prose-h3:text-xl md:prose-h3:text-2xl prose-h3:text-slate-900 dark:prose-h3:text-slate-50
            prose-p:leading-[1.75] prose-p:my-5 prose-p:text-slate-700 dark:prose-p:text-slate-300
            prose-li:my-2 prose-li:leading-7
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-img:rounded-2xl prose-img:shadow-sm
            prose-ul:my-5 prose-ol:my-5"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </article>

      {headings.length > 0 && (
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
              {title}
            </p>
            <nav aria-label="Table of contents" className="mt-4">
              <ul className="space-y-2 text-sm">
                {headings.map((heading) => (
                  <li key={heading.id} className={heading.level === 3 ? "pl-4" : undefined}>
                    <Link
                      href={`#${heading.id}`}
                      className="block rounded-md py-1 text-slate-600 transition-colors hover:text-primary dark:text-slate-300"
                    >
                      {heading.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </aside>
      )}
    </div>
  );
}
