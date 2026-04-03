"use client";

/**
 * Cal.com inline booking embed for the public marketing site.
 *
 * Renders the same scheduling experience previously inlined on `/request-demo`:
 * an iframe to the team’s Cal.com page. Kept as a dedicated component so the
 * site can switch the default scheduler (e.g. to Calendly) without losing this
 * integration. Import and render where Cal.com should remain the booking surface.
 */

/** Public Cal.com scheduling URL for Nyumba Zetu demos (iframe `src` and external link). */
export const CAL_COM_BOOKING_URL = "https://cal.com/nyumba-zetu";

export interface CalComBookingEmbedProps {
  /**
   * Accessible title for the iframe (screen readers and browser tab context).
   * Defaults to a product-focused label.
   */
  iframeTitle?: string;
}

/**
 * Embeds the Cal.com booking UI in a bordered card with an optional “open in new tab” link.
 *
 * @param iframeTitle - Passed to the iframe `title` attribute; defaults to a demo booking label.
 * @returns The embed block (card + iframe + external link line).
 */
export function CalComBookingEmbed({
  iframeTitle = "Book a demo with Nyumba Zetu (Cal.com)",
}: CalComBookingEmbedProps) {
  return (
    <>
      <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
        <iframe
          title={iframeTitle}
          src={CAL_COM_BOOKING_URL}
          width="100%"
          height="630"
          className="min-h-[630px] w-full border-0"
          allowFullScreen
        />
      </div>
      <p className="text-sm text-slate-500 dark:text-slate-400 mt-3 text-center">
        Prefer to open in a new tab?{" "}
        <a
          href={CAL_COM_BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline font-medium"
        >
          Open Cal.com
        </a>
      </p>
    </>
  );
}
