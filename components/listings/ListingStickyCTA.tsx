"use client";

/**
 * Sticky bottom CTA bar for the listing detail page (mobile).
 * Keeps primary action (Contact / Schedule viewing) one tap away while scrolling.
 * Renders only on small viewports (lg:hidden) for minimal clutter on desktop.
 */

import { ContactOwnerButton } from "@/components/listings/ContactOwnerButton";
import { cn } from "@/lib/utils";

export interface ListingStickyCTAProps {
  /** Property title for contact form context. */
  propertyTitle: string;
  /** Property ID for inquiries. */
  propertyId: string;
  /** Optional slug for share URLs. */
  propertySlug?: string;
  /** Button label, e.g. "Request details", "Schedule viewing". */
  buttonLabel?: string;
  /** Optional class for the bar container. */
  className?: string;
}

/**
 * Fixed bottom bar with primary CTA; safe-area padding for notched devices.
 * Uses ContactOwnerButton so the same contact sheet opens from card or bar.
 */
export function ListingStickyCTA({
  propertyTitle,
  propertyId,
  propertySlug,
  buttonLabel = "Request details",
  className,
}: ListingStickyCTAProps) {
  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200/80 bg-white/95 px-4 py-3 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-950/95 lg:hidden",
        "pb-[env(safe-area-inset-bottom)]",
        className
      )}
      role="complementary"
      aria-label="Contact options"
    >
      <ContactOwnerButton
        propertyTitle={propertyTitle}
        propertyId={propertyId}
        propertySlug={propertySlug}
        buttonLabel={buttonLabel}
      />
    </div>
  );
}
