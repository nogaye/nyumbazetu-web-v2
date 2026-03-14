/**
 * Placeholder image and blur utilities for listings.
 * Used when Supabase Storage is unavailable or image load fails (e.g. getImageUrl fallback).
 * No mock listing or property data; all listing data comes from Supabase.
 */

/**
 * Returns a placeholder image URL (e.g. for missing or failed Supabase Storage images).
 *
 * @param propertyId - Property or seed id for stable placeholder per property
 * @param width - Image width in pixels
 * @param height - Image height in pixels
 * @returns URL to a placeholder image (Picsum Photos)
 */
export function getPlaceholderImageUrl(propertyId: string, width = 800, height = 600): string {
  const seed = propertyId.split("-").pop() || propertyId;
  return `https://picsum.photos/seed/${seed}/${width}/${height}`;
}

/**
 * Returns a minimal base64 blur placeholder for image loading states.
 *
 * @returns Data URL for a 1x1 SVG placeholder
 */
export function getBlurDataURL(): string {
  return "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNmMWY1ZjkiLz48L3N2Zz4=";
}
