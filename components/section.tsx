/**
 * Reusable section wrapper with consistent max-width, padding, and semantics.
 * Used across marketing pages to contain content in a 7xl container with responsive padding.
 *
 * Default vertical padding is moderate: stacked `<Section>` blocks previously behaved like
 * double padding (bottom of section A + top of section B). Smaller defaults plus explicit
 * hero `pb-*` on title rows keep headers closer to the following content without relying on
 * every route to set `pt-0` on the next section.
 */
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SectionProps {
  /** Section body (typically headings, cards, or grids) constrained to `max-w-7xl`. */
  children: ReactNode;
  /** Additional Tailwind classes; merged with defaults (e.g. hero `pt-16` + tight `pb-*`). */
  className?: string;
  /** Optional anchor id for in-page links and landmarks. */
  id?: string;
}

/**
 * Full-width `<section>` with horizontal padding and a centered 7xl inner container.
 *
 * @param children - Page or block content.
 * @param className - Extra classes; overrides default `py-*` sides when you pass `pt-*` / `pb-*`.
 * @param id - Optional element id.
 */
export function Section({ children, className, id }: SectionProps) {
  return (
    <section
      id={id}
      className={cn("py-8 md:py-10 lg:py-12", className)}
      aria-label={id ? undefined : "Content section"}
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}

