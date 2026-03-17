/**
 * Supabase helper utilities for property listings.
 * All listing and property data comes from Supabase; no mock fallback.
 */

import {
  ListingCommentDisplay,
  ListingFilters,
  ListingReviewDisplay,
  ListingReviewStats,
  ListingWithCoverImage,
  ListingsResponse,
  Property,
  SortOption,
} from "./types";
import { getPlaceholderImageUrl, getBlurDataURL } from "./mock-data";
import { getListingCoverImageUrl } from "./listing-images";
import { supabaseServer, supabaseAdmin } from "@/lib/supabase/server";

const PER_PAGE = 24;

/** Client for server-side reads that may be behind RLS (e.g. amenities); prefers admin to bypass RLS when available. */
const supabaseForListingRead = supabaseAdmin ?? supabaseServer;

/**
 * Check if Supabase is configured and available
 */
function isSupabaseConfigured(): boolean {
  return supabaseServer !== null;
}

/**
 * Get property image URL from Supabase Storage
 * Falls back to placeholder images if Supabase is not configured or image doesn't exist
 */
export function getImageUrl(storagePath: string): string {
  // Extract property ID from storage path for fallback
  // Path format: "property-images/{property-id}/image.webp"
  const pathParts = storagePath.split("/");
  let propertyId = "default";
  
  // Try to find the property ID (usually the second part after "property-images")
  if (pathParts.length >= 2) {
    // If path starts with "property-images", property ID is at index 1
    if (pathParts[0] === "property-images") {
      propertyId = pathParts[1];
    } else {
      // Otherwise, use the first part as property ID
      propertyId = pathParts[0];
    }
  }

  // Use Supabase Storage if configured
  if (!isSupabaseConfigured()) {
    // Fallback to placeholder images
    return getPlaceholderImageUrl(propertyId);
  }

  try {
    const { data } = supabaseServer!.storage
      .from('property-images')
      .getPublicUrl(storagePath);
    
    // Note: getPublicUrl returns a URL even if the file doesn't exist
    // The browser will show a broken image if the file doesn't exist
    // For now, we'll return the Supabase URL and let the browser handle 404s
    // In production, you might want to verify the file exists first
    return data.publicUrl;
  } catch (error) {
    console.warn('Error getting image URL from Supabase Storage:', error);
    // Fallback to placeholder
    return getPlaceholderImageUrl(propertyId);
  }
}

/**
 * Fetch listings from Supabase with filters.
 * Returns empty result when Supabase is not configured or on error; no mock fallback.
 *
 * @param filters - Listing filters (city, area, price, etc.)
 * @returns Listings response with listings array and pagination; empty on failure.
 */
export async function fetchListings(
  filters: ListingFilters
): Promise<ListingsResponse> {
  if (!isSupabaseConfigured()) {
    return emptyListingsResponse(filters.page || 1);
  }

  try {
    return await fetchListingsFromSupabase(filters);
  } catch (error) {
    console.error("Error fetching listings from Supabase:", error);
    return emptyListingsResponse(filters.page || 1);
  }
}

/**
 * Build an empty ListingsResponse for a given page (used when DB is unavailable or errors).
 */
function emptyListingsResponse(page: number): ListingsResponse {
  return {
    listings: [],
    total: 0,
    page,
    perPage: PER_PAGE,
    totalPages: 0,
  };
}

/**
 * Fetch listings from Supabase (real implementation)
 */
async function fetchListingsFromSupabase(
  filters: ListingFilters
): Promise<ListingsResponse> {
  const page = filters.page || 1;
  const start = (page - 1) * PER_PAGE;
  const end = start + PER_PAGE - 1;

  // Build the query: only active, published, non-deleted listings for public view
  let query = supabaseServer!
    .from('tb_listing_properties')
    .select(`
      *,
      tb_listing_images!left(storage_path, is_cover, position)
    `, { count: 'exact' })
    .eq('is_active', true)
    .eq('is_published', true)
    .eq('is_deleted', false);

  // Apply sorting
  const sortOption = filters.sort || 'recommended';
  switch (sortOption) {
    case 'price-low':
      query = query.order('monthly_rent', { ascending: true });
      break;
    case 'price-high':
      query = query.order('monthly_rent', { ascending: false });
      break;
    case 'newest':
      query = query.order('created_at', { ascending: false });
      break;
    case 'oldest':
      query = query.order('created_at', { ascending: true });
      break;
    case 'recommended':
    default:
      // Recommended: verified first, then by creation date
      query = query.order('is_verified', { ascending: false }).order('created_at', { ascending: false });
      break;
  }

  // Apply filters
  if (filters.city) {
    query = query.ilike('city', `%${filters.city}%`);
  }

  if (filters.areaOr && filters.areaOr.length > 0) {
    const orClause = filters.areaOr.map((a) => `area.ilike.%${a}%`).join(",");
    query = query.or(orClause);
  } else if (filters.area) {
    query = query.ilike("area", `%${filters.area}%`);
  }

  if (filters.minPrice !== undefined) {
    query = query.gte('monthly_rent', filters.minPrice);
  }

  if (filters.maxPrice !== undefined) {
    query = query.lte('monthly_rent', filters.maxPrice);
  }

  if (filters.bedrooms !== undefined) {
    if (filters.bedrooms === '3+') {
      query = query.gte('bedrooms', 3);
    } else {
      query = query.eq('bedrooms', filters.bedrooms);
    }
  }

  if (filters.propertyType) {
    query = query.eq('property_type', filters.propertyType);
  }

  if (filters.listingPurpose) {
    query = query.eq('listing_purpose', filters.listingPurpose);
  }

  if (filters.tps === true) {
    query = query.eq('is_tps_available', true);
  }

  // Apply search filter (searches in title and description)
  if (filters.search) {
    query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
  }

  // Apply pagination
  query = query.range(start, end);

  const { data, error, count } = await query;

  if (error) {
    throw error;
  }

  // Transform to ListingWithCoverImage format
  const listings: ListingWithCoverImage[] = (data || []).map((property: any) => {
    // Find cover image (is_cover = true or position = 0)
    const coverImage = property.tb_listing_images?.find(
      (img: any) => img.is_cover || img.position === 0
    ) || property.tb_listing_images?.[0];

    const coverImagePath = coverImage?.storage_path || `property-images/${property.id}/cover.webp`;

    return {
      ...property,
      cover_image_url: getImageUrl(coverImagePath),
      blur_data_url: getBlurDataURL(), // TODO: Generate real blur from image
    };
  });

  const total = count || 0;

  return {
    listings,
    total,
    page,
    perPage: PER_PAGE,
    totalPages: Math.ceil(total / PER_PAGE),
  };
}

/**
 * Fetch a single property by slug from Supabase.
 * Returns null when not configured, not found, or on error; no mock fallback.
 *
 * @param slug - Listing slug
 * @returns Property or null
 */
export async function fetchPropertyBySlug(slug: string): Promise<Property | null> {
  if (!isSupabaseConfigured()) {
    return null;
  }

  try {
    const { data, error } = await supabaseServer!
      .from('tb_listing_properties')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .eq('is_published', true)
      .eq('is_deleted', false)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null;
      }
      throw error;
    }

    return data as Property;
  } catch (error) {
    console.error("Error fetching property from Supabase:", error);
    return null;
  }
}

/**
 * Fetch slugs (and updated_at) of all public, active listings for sitemap generation.
 * Returns empty array when Supabase is not configured or on error so sitemap build does not fail.
 *
 * @returns Array of { slug, updated_at } for use in sitemap.xml
 */
export async function getAllListingSlugs(): Promise<Array<{ slug: string; updated_at: string }>> {
  if (!isSupabaseConfigured()) {
    return [];
  }

  try {
    const { data, error } = await supabaseServer!
      .from("tb_listing_properties")
      .select("slug, updated_at")
      .eq("is_active", true)
      .eq("is_published", true)
      .eq("is_deleted", false);

    if (error) {
      console.warn("getAllListingSlugs:", error.message);
      return [];
    }

    return (data || []).map((row: { slug: string; updated_at: string }) => ({
      slug: row.slug,
      updated_at: row.updated_at ?? new Date().toISOString(),
    }));
  } catch (error) {
    console.warn("getAllListingSlugs error:", error);
    return [];
  }
}

/**
 * Fetch all images for a property from Supabase.
 * Returns empty array when not configured or on error; no mock fallback.
 *
 * @param propertyId - Property ID
 * @returns Array of image objects with url, alt, and optional blurDataURL
 */
export async function fetchPropertyImages(propertyId: string): Promise<Array<{
  url: string;
  alt: string;
  blurDataURL?: string;
}>> {
  if (!isSupabaseConfigured()) {
    return [];
  }

  try {
    const { data, error } = await supabaseServer!
      .from('tb_listing_images')
      .select('storage_path, position')
      .eq('property_id', propertyId)
      .order('position', { ascending: true });

    if (error) {
      throw error;
    }

    return (data || []).map((img: { storage_path: string; position: number }) => ({
      url: getImageUrl(img.storage_path),
      alt: `Property image ${img.position + 1}`,
      blurDataURL: getBlurDataURL(), // TODO: Generate real blur
    }));
  } catch (error) {
    console.error("Error fetching property images from Supabase:", error);
    return [];
  }
}

/**
 * Parse and validate search params into ListingFilters
 */
export function parseFilters(searchParams: {
  [key: string]: string | string[] | undefined;
}): ListingFilters {
  const filters: ListingFilters = {};

  if (searchParams.city && typeof searchParams.city === "string") {
    filters.city = searchParams.city;
  }

  if (searchParams.area && typeof searchParams.area === "string") {
    filters.area = searchParams.area;
  }

  if (searchParams.minPrice) {
    const minPrice = parseInt(searchParams.minPrice as string, 10);
    if (!isNaN(minPrice)) {
      filters.minPrice = minPrice;
    }
  }

  if (searchParams.maxPrice) {
    const maxPrice = parseInt(searchParams.maxPrice as string, 10);
    if (!isNaN(maxPrice)) {
      filters.maxPrice = maxPrice;
    }
  }

  if (searchParams.bedrooms) {
    const bedrooms = searchParams.bedrooms as string;
    if (bedrooms === "3+") {
      filters.bedrooms = "3+";
    } else {
      const bedroomsNum = parseInt(bedrooms, 10);
      if (!isNaN(bedroomsNum)) {
        filters.bedrooms = bedroomsNum;
      }
    }
  }

  if (searchParams.propertyType) {
    filters.propertyType = searchParams.propertyType as any;
  }

  if (searchParams.listingPurpose && typeof searchParams.listingPurpose === "string") {
    const purpose = searchParams.listingPurpose as import("./types").ListingPurposeType;
    if (["rent", "buy", "short_stay"].includes(purpose)) {
      filters.listingPurpose = purpose;
    }
  }

  if (searchParams.tps === "true" || searchParams.tps === "1") {
    filters.tps = true;
  }

  if (searchParams.page) {
    const page = parseInt(searchParams.page as string, 10);
    if (!isNaN(page) && page > 0) {
      filters.page = page;
    }
  }

  if (searchParams.sort && typeof searchParams.sort === "string") {
    const validSorts: SortOption[] = ["recommended", "price-low", "price-high", "newest", "oldest"];
    if (validSorts.includes(searchParams.sort as SortOption)) {
      filters.sort = searchParams.sort as SortOption;
    }
  }

  if (searchParams.search && typeof searchParams.search === "string") {
    filters.search = searchParams.search;
  }

  return filters;
}

/**
 * Build URL search params from filters
 */
export function buildSearchParams(filters: ListingFilters): URLSearchParams {
  const params = new URLSearchParams();

  if (filters.city) {
    params.set("city", filters.city);
  }

  if (filters.area) {
    params.set("area", filters.area);
  }

  if (filters.minPrice !== undefined) {
    params.set("minPrice", filters.minPrice.toString());
  }

  if (filters.maxPrice !== undefined) {
    params.set("maxPrice", filters.maxPrice.toString());
  }

  if (filters.bedrooms !== undefined) {
    params.set("bedrooms", filters.bedrooms.toString());
  }

  if (filters.propertyType) {
    params.set("propertyType", filters.propertyType);
  }

  if (filters.tps === true) {
    params.set("tps", "true");
  }

  if (filters.page && filters.page > 1) {
    params.set("page", filters.page.toString());
  }

  if (filters.sort && filters.sort !== "recommended") {
    params.set("sort", filters.sort);
  }

  if (filters.search) {
    params.set("search", filters.search);
  }

  return params;
}

/**
 * Fetch reviews for a property from tb_listing_comments (comment_type = 'review').
 * Returns display-ready review list and aggregate stats. Joins tb_users for author display name.
 * Uses supabaseForListingRead so RLS does not block when service role is available.
 */
export async function fetchPropertyReviews(propertyId: number): Promise<{
  reviews: ListingReviewDisplay[];
  stats: ListingReviewStats;
}> {
  const client = supabaseForListingRead ?? supabaseServer;
  if (!client) {
    return { reviews: [], stats: { averageRating: 0, totalReviews: 0 } };
  }

  try {
    const { data: rows, error } = await client
      .from("tb_listing_comments")
      .select("id, body, title, rating, is_verified_review, created_at")
      .eq("property_id", propertyId)
      .eq("comment_type", "review")
      .eq("is_visible", true)
      .eq("moderation_status", "published")
      .eq("is_deleted", false)
      .is("parent_comment_id", null)
      .order("created_at", { ascending: false });

    if (error) {
      console.warn("Error fetching property reviews:", error);
      return { reviews: [], stats: { averageRating: 0, totalReviews: 0 } };
    }

    const list = (rows || []) as Array<{
      body: string;
      title: string | null;
      rating: number | null;
      is_verified_review: boolean;
      created_at: string;
    }>;

    const reviews: ListingReviewDisplay[] = list.map((r) => ({
      author: "Guest",
      label: r.is_verified_review ? "Verified guest" : undefined,
      rating: r.rating ?? 0,
      body: r.body,
      date: r.created_at,
    }));

    const totalReviews = reviews.length;
    const sumRating = reviews.reduce((s, r) => s + r.rating, 0);
    const averageRating = totalReviews > 0 ? sumRating / totalReviews : 0;

    return {
      reviews,
      stats: { averageRating, totalReviews },
    };
  } catch (err) {
    console.warn("Error in fetchPropertyReviews:", err);
    return { reviews: [], stats: { averageRating: 0, totalReviews: 0 } };
  }
}

/**
 * Fetch amenity names for a property from tb_listing_property_amenities and tb_listing_amenities.
 * Returns display names of amenities assigned to the property; empty array when none or when Supabase is not configured.
 */
export async function fetchPropertyAmenities(propertyId: number): Promise<string[]> {
  const client = supabaseForListingRead ?? supabaseServer;
  if (!client) {
    return [];
  }

  try {
    const { data: junctionRows, error: junctionError } = await client
      .from("tb_listing_property_amenities")
      .select("amenity_id")
      .eq("property_id", propertyId)
      .eq("is_active", true)
      .eq("is_deleted", false);

    if (junctionError || !junctionRows?.length) {
      if (junctionError) console.warn("Error fetching property amenities junction:", junctionError);
      return [];
    }

    const amenityIds = junctionRows.map((r: { amenity_id: number }) => r.amenity_id);
    const { data: amenityRows, error: amenityError } = await client
      .from("tb_listing_amenities")
      .select("id, name, sort_order")
      .in("id", amenityIds)
      .eq("is_active", true)
      .eq("is_deleted", false)
      .order("sort_order", { ascending: true });

    if (amenityError) {
      console.warn("Error fetching amenities:", amenityError);
      return [];
    }

    const orderById = Object.fromEntries(amenityIds.map((id, i) => [id, i]));
    const sorted = (amenityRows || []).sort(
      (a: { id: number }, b: { id: number }) => (orderById[a.id] ?? 0) - (orderById[b.id] ?? 0)
    );
    return sorted.map((r: { name: string }) => r.name);
  } catch (err) {
    console.warn("Error in fetchPropertyAmenities:", err);
    return [];
  }
}

/**
 * Fetch comments (Q&A) for a property from tb_listing_comments (comment_type = 'comment').
 * Returns top-level comments only. Uses supabaseForListingRead so RLS does not block when service role is available.
 */
export async function fetchPropertyComments(propertyId: number): Promise<ListingCommentDisplay[]> {
  const client = supabaseForListingRead ?? supabaseServer;
  if (!client) {
    return [];
  }

  try {
    const { data: rows, error } = await client
      .from("tb_listing_comments")
      .select("id, body, created_at")
      .eq("property_id", propertyId)
      .eq("comment_type", "comment")
      .eq("is_visible", true)
      .eq("moderation_status", "published")
      .eq("is_deleted", false)
      .is("parent_comment_id", null)
      .order("created_at", { ascending: true });

    if (error) {
      console.warn("Error fetching property comments:", error);
      return [];
    }

    const list = (rows || []) as Array<{ body: string; created_at: string }>;
    return list.map((r) => ({
      author: "Guest",
      body: r.body,
      date: r.created_at,
    }));
  } catch (err) {
    console.warn("Error in fetchPropertyComments:", err);
    return [];
  }
}
