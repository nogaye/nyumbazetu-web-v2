/**
 * GET /api/google-reviews
 *
 * Returns cached public Google reviews for the configured business Place ID.
 * Used by the homepage testimonials section for auto-sync with Google (via
 * Places API New). When env vars are missing or Google returns no reviews,
 * responds with `configured: false` so the client keeps static testimonials.
 */

import { NextResponse } from "next/server";
import { fetchGooglePlaceReviews } from "@/lib/google-places-reviews";

/** Seconds to cache the JSON at the CDN / browser (4 hours). */
const CACHE_MAX_AGE = 14_400;

/**
 * Handles GET: loads reviews from Google when API key and Place ID are set.
 *
 * @returns JSON with either Google-sourced reviews or `configured: false`.
 */
export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY?.trim();
  const placeId = process.env.GOOGLE_BUSINESS_PLACE_ID?.trim();

  if (!apiKey || !placeId) {
    return NextResponse.json(
      {
        configured: false as const,
        message:
          "Set GOOGLE_PLACES_API_KEY and GOOGLE_BUSINESS_PLACE_ID to sync Google reviews.",
      },
      { status: 200 },
    );
  }

  try {
    const result = await fetchGooglePlaceReviews(placeId, apiKey);
    if (!result || result.reviews.length === 0) {
      return NextResponse.json(
        {
          configured: true as const,
          synced: false as const,
          message:
            "No reviews returned from Google (new listing or API error). Using fallback copy.",
        },
        {
          status: 200,
          headers: {
            "Cache-Control": `public, s-maxage=${CACHE_MAX_AGE}, stale-while-revalidate=86400`,
          },
        },
      );
    }

    return NextResponse.json(
      {
        configured: true as const,
        synced: true as const,
        placeRating: result.placeRating,
        userRatingCount: result.userRatingCount,
        googleMapsUri: result.googleMapsUri,
        reviews: result.reviews,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": `public, s-maxage=${CACHE_MAX_AGE}, stale-while-revalidate=86400`,
        },
      },
    );
  } catch (e) {
    console.error("[api/google-reviews]", e);
    return NextResponse.json(
      {
        configured: true as const,
        synced: false as const,
        error: "Failed to load Google reviews",
      },
      { status: 200 },
    );
  }
}
