/**
 * Listings-specific section wrapper that preserves semantic grouping without client-side
 * animation overhead. This keeps large homepage sections server-rendered and cheap to paint
 * on low-end mobile devices.
 */

import { cn } from "@/lib/utils";

export interface ListingsAnimatedSectionProps {
  /** Section content. */
  children: React.ReactNode;
  /** Optional class for the section. */
  className?: string;
  /** Optional id. */
  id?: string;
  /** Optional aria-labelledby. */
  "aria-labelledby"?: string;
  /** Optional aria-label. */
  "aria-label"?: string;
}

/**
 * Renders a plain section wrapper for homepage content.
 *
 * @param props - Section content and optional accessibility/layout attributes.
 * @returns A semantic section element with the provided attributes.
 */
export function ListingsAnimatedSection({
  children,
  className,
  id,
  "aria-labelledby": ariaLabelledby,
  "aria-label": ariaLabel,
}: ListingsAnimatedSectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledby}
      aria-label={ariaLabel}
      className={cn(className)}
    >
      {children}
    </section>
  );
}
