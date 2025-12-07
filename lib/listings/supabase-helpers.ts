/**
 * Supabase helper utilities for property listings
 * 
 * This module supports both real Supabase queries and mock data fallback.
 * If Supabase is not configured, it automatically falls back to mock data.
 */

import { ListingFilters, ListingWithCoverImage, ListingsResponse, Property } from "./types";
import { getMockProperties, getPlaceholderImageUrl, getBlurDataURL, getPropertyBySlug } from "./mock-data";
import { supabaseServer } from "@/lib/supabase/server";

const PER_PAGE = 24;

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
 * Fetch listings from Supabase with filters
 * Falls back to mock data if Supabase is not configured
 */
export async function fetchListings(
  filters: ListingFilters
): Promise<ListingsResponse> {
  // If Supabase is not configured, use mock data
  if (!isSupabaseConfigured()) {
    return fetchListingsFromMock(filters);
  }

  try {
    return await fetchListingsFromSupabase(filters);
  } catch (error) {
    console.error('Error fetching listings from Supabase, falling back to mock data:', error);
    return fetchListingsFromMock(filters);
  }
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

  // Build the query
  let query = supabaseServer!
    .from('properties')
    .select(`
      *,
      property_images!left(storage_path, is_cover, position)
    `, { count: 'exact' })
    .order('created_at', { ascending: false });

  // Apply filters
  if (filters.city) {
    query = query.ilike('city', `%${filters.city}%`);
  }

  if (filters.area) {
    query = query.ilike('area', `%${filters.area}%`);
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

  if (filters.tps === true) {
    query = query.eq('is_tps_available', true);
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
    const coverImage = property.property_images?.find(
      (img: any) => img.is_cover || img.position === 0
    ) || property.property_images?.[0];

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
 * Fetch listings from mock data (fallback)
 */
async function fetchListingsFromMock(
  filters: ListingFilters
): Promise<ListingsResponse> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  const page = filters.page || 1;
  const mockProperties = getMockProperties(filters);

  // Get cover images for each property
  const listings: ListingWithCoverImage[] = mockProperties.map((property) => {
    const coverImagePath = `property-images/${property.id}/cover.webp`;
    return {
      ...property,
      cover_image_url: getImageUrl(coverImagePath),
      blur_data_url: getBlurDataURL(),
    };
  });

  // Apply pagination
  const start = (page - 1) * PER_PAGE;
  const end = start + PER_PAGE;
  const paginatedListings = listings.slice(start, end);

  return {
    listings: paginatedListings,
    total: listings.length,
    page,
    perPage: PER_PAGE,
    totalPages: Math.ceil(listings.length / PER_PAGE),
  };
}

/**
 * Fetch a single property by slug
 * Falls back to mock data if Supabase is not configured
 */
export async function fetchPropertyBySlug(slug: string): Promise<Property | null> {
  if (!isSupabaseConfigured()) {
    return getPropertyBySlug(slug);
  }

  try {
    const { data, error } = await supabaseServer!
      .from('properties')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // No rows returned
        return null;
      }
      throw error;
    }

    return data as Property;
  } catch (error) {
    console.error('Error fetching property from Supabase, falling back to mock data:', error);
    return getPropertyBySlug(slug);
  }
}

/**
 * Fetch all images for a property
 * Falls back to mock data if Supabase is not configured
 */
export async function fetchPropertyImages(propertyId: string): Promise<Array<{
  url: string;
  alt: string;
  blurDataURL?: string;
}>> {
  if (!isSupabaseConfigured()) {
    // Use mock data function
    const { getPropertyImages } = await import('./mock-data');
    return getPropertyImages(propertyId);
  }

  try {
    const { data, error } = await supabaseServer!
      .from('property_images')
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
    console.error('Error fetching property images from Supabase, falling back to mock data:', error);
    const { getPropertyImages } = await import('./mock-data');
    return getPropertyImages(propertyId);
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

  if (searchParams.tps === "true" || searchParams.tps === "1") {
    filters.tps = true;
  }

  if (searchParams.page) {
    const page = parseInt(searchParams.page as string, 10);
    if (!isNaN(page) && page > 0) {
      filters.page = page;
    }
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

  return params;
}
