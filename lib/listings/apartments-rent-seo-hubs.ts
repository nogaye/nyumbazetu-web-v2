/**
 * Programmatic SEO hubs for “apartments for rent” by city/neighbourhood (Zillow/Property24-style).
 * Each slug maps to filters for `fetchListings` and to public URLs `/apartments-for-rent-{slug}`.
 * Extend this registry to add more indexable location pages without new route files.
 */

import type { ListingFilters } from "@/lib/listings/types";
import { ListingPropertyType, ListingPurpose } from "@/lib/listings/enums";
import {
  APARTMENTS_RENT_HUB_SLUGS,
  type ApartmentsRentHubSlug,
} from "@/lib/listings/apartment-rent-hub-paths";

export { APARTMENTS_RENT_HUB_SLUGS, type ApartmentsRentHubSlug };

/**
 * Configuration for one rent-apartment SEO hub: copy, filters, and internal-link keywords
 * for matching listing breadcrumbs.
 */
export interface ApartmentsRentSeoHub {
  /** URL segment after `apartments-for-rent-` (e.g. `nairobi`). */
  slug: ApartmentsRentHubSlug;
  /** Public path including leading slash. */
  pathname: string;
  /** Primary on-page heading (H1). */
  h1: string;
  /** `<title>` / OG title segment (full title assembled in page metadata). */
  metaTitle: string;
  /** Meta description for SERP snippets. */
  metaDescription: string;
  /** Short intro paragraph below the H1 (unique per hub for SEO). */
  intro: string;
  /** Filters passed to `fetchListings` (apartment + rent + location scope). */
  filters: ListingFilters;
  /**
   * Substrings (lowercase) matched against listing `area` to suggest this hub in breadcrumbs.
   * Nairobi hub uses city match instead; this can be empty for city-wide hubs.
   */
  areaMatchHints: string[];
}

/** Registry of all apartment-for-rent SEO hubs; keys must match `APARTMENTS_RENT_HUB_SLUGS`. */
export const APARTMENTS_RENT_SEO_HUBS: Record<ApartmentsRentHubSlug, ApartmentsRentSeoHub> = {
  nairobi: {
    slug: "nairobi",
    pathname: "/apartments-for-rent-nairobi",
    h1: "Apartments for rent in Nairobi",
    metaTitle: "Apartments for rent in Nairobi | Nyumba Zetu",
    metaDescription:
      "Browse verified apartments for rent in Nairobi, Kenya. Filter by neighbourhood, price and bedrooms on Nyumba Zetu—Kenya’s property marketplace.",
    intro:
      "Find apartments for long-term rent across Nairobi. Listings are verified and updated by landlords and agents—similar to how major marketplaces surface city-wide inventory for high-intent renters.",
    filters: {
      city: "Nairobi",
      propertyType: ListingPropertyType.Apartment,
      listingPurpose: ListingPurpose.Rent,
    },
    areaMatchHints: [],
  },
  westlands: {
    slug: "westlands",
    pathname: "/apartments-for-rent-westlands",
    h1: "Apartments for rent in Westlands, Nairobi",
    metaTitle: "Apartments for rent in Westlands | Nyumba Zetu",
    metaDescription:
      "Apartments for rent in Westlands, Nairobi. Compare rents, photos and amenities on Nyumba Zetu.",
    intro:
      "Westlands is one of Nairobi’s busiest rental corridors. This page aggregates apartment rentals in and around Westlands so renters can shop the neighbourhood in one place.",
    filters: {
      area: "Westlands",
      propertyType: ListingPropertyType.Apartment,
      listingPurpose: ListingPurpose.Rent,
    },
    areaMatchHints: ["westlands"],
  },
  kilimani: {
    slug: "kilimani",
    pathname: "/apartments-for-rent-kilimani",
    h1: "Apartments for rent in Kilimani, Nairobi",
    metaTitle: "Apartments for rent in Kilimani | Nyumba Zetu",
    metaDescription:
      "Apartments for rent in Kilimani, Nairobi. Browse verified listings with maps, photos and direct inquiries.",
    intro:
      "Kilimani remains a top choice for professionals and families. Explore current apartment rentals with transparent pricing and neighbourhood context.",
    filters: {
      area: "Kilimani",
      propertyType: ListingPropertyType.Apartment,
      listingPurpose: ListingPurpose.Rent,
    },
    areaMatchHints: ["kilimani"],
  },
  ruaka: {
    slug: "ruaka",
    pathname: "/apartments-for-rent-ruaka",
    h1: "Apartments for rent in Ruaka & Runda",
    metaTitle: "Apartments for rent in Ruaka | Nyumba Zetu",
    metaDescription:
      "Apartments for rent near Ruaka and Runda, Nairobi. Discover rentals along the Kiambu corridor on Nyumba Zetu.",
    intro:
      "Ruaka and nearby Runda see strong demand from commuters. This hub focuses apartment rentals in that growth corridor north of the city centre.",
    filters: {
      areaOr: ["Ruaka", "Runda"],
      city: "Nairobi",
      propertyType: ListingPropertyType.Apartment,
      listingPurpose: ListingPurpose.Rent,
    },
    areaMatchHints: ["ruaka", "runda"],
  },
};

/**
 * Returns true when `value` is a known apartment-rent SEO hub slug.
 *
 * @param value - Raw dynamic route param from `apartments-for-rent-[hub]`.
 */
export function isApartmentsRentHubSlug(value: string): value is ApartmentsRentHubSlug {
  return (APARTMENTS_RENT_HUB_SLUGS as readonly string[]).includes(value);
}

/**
 * Picks the most specific SEO hub for breadcrumb/internal linking on a listing detail page.
 * Prefers neighbourhood hubs (Westlands, Kilimani, Ruaka) when the listing area matches;
 * otherwise returns the Nairobi city hub for Nairobi apartment rentals.
 *
 * @param city - Listing city field.
 * @param area - Listing area/neighbourhood field.
 * @param propertyType - Listing property_type.
 * @param listingPurpose - Listing listing_purpose.
 * @returns Hub slug or null when the listing is not a Nairobi apartment for rent.
 */
export function resolveApartmentsRentHubForListing(
  city: string,
  area: string,
  propertyType: string,
  listingPurpose: string | undefined
): ApartmentsRentHubSlug | null {
  if (propertyType !== ListingPropertyType.Apartment || listingPurpose !== ListingPurpose.Rent) {
    return null;
  }
  const cityLower = city.toLowerCase();
  if (!cityLower.includes("nairobi")) {
    return null;
  }
  const areaLower = area.toLowerCase();
  for (const slug of APARTMENTS_RENT_HUB_SLUGS) {
    if (slug === "nairobi") continue;
    const hub = APARTMENTS_RENT_SEO_HUBS[slug];
    for (const hint of hub.areaMatchHints) {
      if (areaLower.includes(hint)) {
        return slug;
      }
    }
  }
  return "nairobi";
}
