/**
 * Server-only helpers to load public Google reviews for a business via the
 * Places API (New) Place Details endpoint. Used by `/api/google-reviews` so the
 * marketing site can surface the same reviews as on Google Maps without
 * scraping (which violates Google ToS). Requires a GCP API key with Places API
 * (New) enabled and the business Place ID (not a share.google short link).
 */

/** Single review shaped for the testimonials UI and JSON API responses. */
export type GoogleReviewForUi = {
  /** Stable key for React lists (author + time fingerprint). */
  id: string;
  /** Reviewer display name from Google. */
  name: string;
  /** Subline shown under the name (stars + relative time). */
  workTitle: string;
  /** Short headline (rating line). */
  title: string;
  /** Full review body. */
  description: string;
  /** 1–5 star rating when provided. */
  rating: number;
  /** Link to the reviewer profile on Google when available. */
  authorUri?: string;
};

/** Payload returned to the testimonials section when Google data is available. */
export type GooglePlaceReviewsResult = {
  /** Average rating for the place (e.g. 4.9). */
  placeRating: number;
  /** Total number of ratings shown on Google for this place. */
  userRatingCount: number;
  /** URL to the place on Google Maps (e.g. “See all reviews”). */
  googleMapsUri: string;
  /** Up to five reviews returned by Google (subset of public reviews). */
  reviews: GoogleReviewForUi[];
};

/** Raw author block from Places API (New) review object. */
type PlacesAuthorAttribution = {
  displayName?: string;
  uri?: string;
  photoUri?: string;
};

/** Raw review entry from Places API (New) Place resource. */
type PlacesApiReview = {
  rating?: number;
  text?: { text?: string; languageCode?: string };
  authorAttribution?: PlacesAuthorAttribution;
  relativePublishTimeDescription?: string;
  publishTime?: string;
};

/** Top-level Place resource fields we request. */
type PlacesApiPlaceResponse = {
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: PlacesApiReview[];
};

/**
 * Builds a deterministic id for list keys from author and publish metadata.
 *
 * @param author - Reviewer display name.
 * @param publishTime - ISO time or empty.
 * @param index - Fallback index in the array.
 * @returns A short string safe for use as React `key`.
 */
function reviewId(
  author: string,
  publishTime: string,
  index: number,
): string {
  const base = `${author}|${publishTime}|${index}`;
  let h = 0;
  for (let i = 0; i < base.length; i++) {
    h = (Math.imul(31, h) + base.charCodeAt(i)) | 0;
  }
  return `g-${Math.abs(h)}`;
}

/**
 * Maps a Places API review into the UI testimonial shape.
 *
 * @param r - Raw review from Google.
 * @param index - Position in the reviews array (for stable id fallback).
 * @returns Normalized testimonial fields.
 */
function mapReview(r: PlacesApiReview, index: number): GoogleReviewForUi {
  const name = r.authorAttribution?.displayName?.trim() || "Google reviewer";
  const text = r.text?.text?.trim() || "";
  const rating = typeof r.rating === "number" ? r.rating : 0;
  const stars = "★".repeat(Math.min(5, Math.max(0, Math.round(rating))));
  const when = r.relativePublishTimeDescription?.trim() || "Google review";
  return {
    id: reviewId(name, r.publishTime ?? "", index),
    name,
    workTitle: `${stars} · ${when}`,
    title:
      rating > 0
        ? `${rating}-star review on Google`
        : "Review on Google",
    description: text || "—",
    rating,
    authorUri: r.authorAttribution?.uri,
  };
}

/**
 * Fetches public reviews and aggregate rating for a Google Business place.
 * Calls the Places API (New) server-side only; never expose the API key to the client.
 *
 * @param placeId - Google Place ID (e.g. ChIJ…). Must not include the `places/` prefix.
 * @param apiKey - GCP API key with Places API (New) enabled.
 * @returns Parsed reviews and metadata, or `null` if the request fails or returns no usable data.
 */
export async function fetchGooglePlaceReviews(
  placeId: string,
  apiKey: string,
): Promise<GooglePlaceReviewsResult | null> {
  const id = placeId.replace(/^places\//, "");
  const url = `https://places.googleapis.com/v1/places/${encodeURIComponent(id)}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask":
        "reviews,rating,userRatingCount,googleMapsUri,displayName",
    },
    next: { revalidate: 14_400 },
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    console.error(
      "[google-places-reviews] Place Details failed",
      res.status,
      errText.slice(0, 500),
    );
    return null;
  }

  const data = (await res.json()) as PlacesApiPlaceResponse;
  const raw = data.reviews ?? [];
  if (raw.length === 0) {
    return null;
  }

  const reviews = raw.map((r, i) => mapReview(r, i));
  const placeRating =
    typeof data.rating === "number" && data.rating > 0 ? data.rating : 0;
  const userRatingCount =
    typeof data.userRatingCount === "number" ? data.userRatingCount : 0;
  const googleMapsUri =
    data.googleMapsUri?.trim() ||
    `https://www.google.com/maps/search/?api=1&query_place_id=${encodeURIComponent(id)}`;

  return {
    placeRating: placeRating || reviews[0]?.rating || 5,
    userRatingCount,
    googleMapsUri,
    reviews,
  };
}
