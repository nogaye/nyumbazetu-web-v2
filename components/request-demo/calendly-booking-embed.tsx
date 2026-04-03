"use client";

/**
 * Calendly booking via external link (no iframe).
 *
 * For the full inline experience, use `CalendlyComBookingEmbed` from
 * `./calendly-com-booking-embed`. This module re-exports the same public URLs and
 * provides a button that opens calendly.com in a new tab when an out-of-band flow
 * is preferred.
 */

import { Button } from "@/components/ui/button";
import { CALENDLY_EVENT_BASE_URL } from "./calendly-com-booking-embed";

export {
  CALENDLY_BOOKING_URL,
  CALENDLY_EVENT_BASE_URL,
} from "./calendly-com-booking-embed";

export interface CalendlyBookingEmbedProps {
  /**
   * Visible label for the primary booking action (link + button).
   * Defaults to inviting the user to open Calendly.
   */
  ctaLabel?: string;
}

/**
 * Renders a card with a primary link that opens the Calendly booking page (new tab).
 *
 * @param ctaLabel - Text for the main call-to-action; defaults to scheduling on Calendly.
 * @returns Bordered card with short helper copy and the external booking link.
 */
export function CalendlyBookingEmbed({
  ctaLabel = "Open Calendly to schedule",
}: CalendlyBookingEmbedProps) {
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden shadow-sm p-8 md:p-10 text-center">
      <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-md mx-auto leading-relaxed">
        You will leave this site and complete your booking on Calendly — pick a
        time, add your details, and we will send your invite from there.
      </p>
      <Button size="lg" className="gap-2" asChild>
        <a
          href={CALENDLY_EVENT_BASE_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          {ctaLabel}
        </a>
      </Button>
      <p className="text-xs text-slate-500 dark:text-slate-500 mt-6 break-all">
        {CALENDLY_EVENT_BASE_URL.replace(/^https:\/\//, "")}
      </p>
    </div>
  );
}
