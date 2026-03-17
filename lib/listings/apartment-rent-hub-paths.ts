/**
 * URL segments for apartment-rent SEO hubs (`/apartments-for-rent-{slug}`).
 * Duplicated nowhere else: imported by next.config (rewrites/redirects) and apartments-rent-seo-hubs.
 */

/** Ordered list of hub keys; keep in sync when adding Nairobi-area rental landing pages. */
export const APARTMENTS_RENT_HUB_SLUGS = ["nairobi", "westlands", "kilimani", "ruaka"] as const;

/** Union type for hub slug strings. */
export type ApartmentsRentHubSlug = (typeof APARTMENTS_RENT_HUB_SLUGS)[number];
