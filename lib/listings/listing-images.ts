/**
 * Listing cover image mapping for mock property listings.
 *
 * Maps fixed mock property IDs to local photo-realistic images that match
 * each listing's location (city/area) and property type. Used when Supabase
 * is not configured or when serving mock data.
 */

import { getPlaceholderImageUrl } from "./mock-data";
import { getListingCoverImagePathById } from "./listing-cover-map";

export { getListingCoverImagePathById } from "./listing-cover-map";

/**
 * Returns the cover image URL for a listing.
 * Uses local location-matched image when available, otherwise placeholder.
 *
 * @param property - The property listing (must include id).
 * @returns Absolute path to cover image (e.g. /images/listings/...) or placeholder URL.
 */
export function getListingCoverImageUrl(property: { id: string }): string {
  const path = getListingCoverImagePathById(property.id);
  return path ?? getPlaceholderImageUrl(property.id);
}
