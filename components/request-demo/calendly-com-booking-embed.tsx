"use client";

/**
 * Full-page–style Calendly inline embed for the marketing site.
 *
 * Renders Calendly’s `Inline` scheduler in a tall, edge-to-edge frame so the flow
 * feels close to visiting calendly.com, while keeping users on Nyumba Zetu. The
 * iframe uses `embed_type=Inline` and `embed_domain` from `useSyncExternalStore`
 * so the server can use `NEXT_PUBLIC_APP_URL` while the client uses
 * `window.location.hostname` without hydration mismatches. Use alongside
 * `CalComBookingEmbed` or the external-link variant in `calendly-booking-embed.tsx`
 * when needed.
 */

import { useMemo, useSyncExternalStore } from "react";

/** Canonical Calendly event URL (no query); use for “open in new tab” and base path. */
export const CALENDLY_EVENT_BASE_URL =
  "https://calendly.com/admin-nyumbazetu/45min";

/**
 * Same URL as `CALENDLY_EVENT_BASE_URL`; kept for parity with older imports
 * that used this name for non-embed links.
 */
export const CALENDLY_BOOKING_URL = CALENDLY_EVENT_BASE_URL;

export interface CalendlyComBookingEmbedProps {
  /**
   * Accessible title for the iframe (screen readers).
   * Defaults to a demo-focused label.
   */
  iframeTitle?: string;
  /**
   * Minimum height of the booking surface. Defaults to a viewport-based value so
   * the scheduler fills most of the screen below typical headers.
   */
  minHeightClassName?: string;
}

/**
 * Hostname used for SSR when `window` is unavailable: derived from
 * `NEXT_PUBLIC_APP_URL`, or `localhost` for local preview without that env set.
 *
 * @returns Hostname only (no port, no path).
 */
function getServerHostname(): string {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;
  if (appUrl) {
    try {
      return new URL(appUrl).hostname;
    } catch {
      /* ignore invalid URL */
    }
  }
  return "nyumbazetu.com";
}

/**
 * No-op subscription: hostname does not change while this page is mounted.
 *
 * @returns Unsubscribe no-op.
 */
const subscribeToHostname: (onStoreChange: () => void) => () => void =
  () => () => {};

/**
 * Client snapshot: actual browser host. Falls back to server hostname when `window`
 * is not defined (should not run on client when paired with `getServerSnapshot`).
 *
 * @returns Current `embed_domain` candidate.
 */
function getClientHostnameSnapshot(): string {
  return typeof window !== "undefined"
    ? window.location.hostname
    : getServerHostname();
}

/**
 * Builds Calendly’s inline embed URL with required query parameters.
 *
 * @param hostname - Host serving the iframe (`embed_domain`).
 * @returns Full `https://` URL suitable for an iframe `src`.
 */
function buildCalendlyInlineEmbedUrl(hostname: string): string {
  const params = new URLSearchParams({
    embed_domain: hostname,
    embed_type: "Inline",
  });
  return `${CALENDLY_EVENT_BASE_URL}?${params.toString()}`;
}

/**
 * Large Calendly inline embed: rounded card, subtle shadow, tall iframe, footer
 * link to open the same event on calendly.com in a new tab.
 *
 * @param iframeTitle - `title` on the iframe element.
 * @param minHeightClassName - Tailwind min-height utilities for the iframe container.
 * @returns Embed shell with iframe and secondary external link.
 */
export function CalendlyComBookingEmbed({
  iframeTitle = "Schedule a demo with Nyumba Zetu — Calendly",
  minHeightClassName = "min-h-[min(920px,calc(100dvh-10rem))]",
}: CalendlyComBookingEmbedProps) {
  const hostname = useSyncExternalStore(
    subscribeToHostname,
    getClientHostnameSnapshot,
    getServerHostname,
  );
  const embedSrc = useMemo(
    () => buildCalendlyInlineEmbedUrl(hostname),
    [hostname],
  );

  return (
    <div className="flex w-full flex-col gap-4">
      <div
        className={
          "relative w-full overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_1px_0_rgba(15,23,42,0.06),0_12px_40px_-12px_rgba(15,23,42,0.18)] dark:border-slate-700/90 dark:bg-slate-950 dark:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.45)] " +
          minHeightClassName
        }
      >
        <iframe
          title={iframeTitle}
          src={embedSrc}
          className={"block w-full border-0 " + minHeightClassName}
          allow="camera; microphone; fullscreen; payment"
          loading="eager"
        />
      </div>
      <p className="text-center text-sm text-slate-500 dark:text-slate-400">
        Prefer the full Calendly site?{" "}
        <a
          href={CALENDLY_EVENT_BASE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-primary underline-offset-4 hover:underline"
        >
          Open this event on calendly.com
        </a>
      </p>
    </div>
  );
}
