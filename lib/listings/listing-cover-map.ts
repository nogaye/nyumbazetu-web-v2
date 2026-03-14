/**
 * Map of mock property IDs to local listing cover image filenames.
 * Used so both listing-images and mock-data can resolve cover images without circular imports.
 */

/** Property ID to image filename under /images/listings/ */
export const LISTING_COVER_IMAGES: Record<string, string> = {
  "1": "2br-apartment-kilimani.jpg",
  "2": "3br-maisonette-kileleshwa.jpg",
  "3": "1br-bedsitter-westlands.jpg",
  "4": "2br-apartment-ruaka.jpg",
  "5": "studio-apartment-mombasa.jpg",
  "6": "4br-house-kisumu.jpg",
  "7": "office-space-westlands.jpg",
  "8": "1br-apartment-kilimani-2.jpg",
  "9": "2br-apartment-lavington.jpg",
  "10": "shop-space-mombasa.jpg",
};

/**
 * Returns the local listing cover image path for a property ID, or null if none is mapped.
 *
 * @param propertyId - Property id (e.g. "1" … "10" for fixed mock listings).
 * @returns Absolute path (e.g. /images/listings/2br-apartment-kilimani.jpg) or null.
 */
export function getListingCoverImagePathById(propertyId: string): string | null {
  const filename = LISTING_COVER_IMAGES[propertyId];
  return filename ? `/images/listings/${filename}` : null;
}
