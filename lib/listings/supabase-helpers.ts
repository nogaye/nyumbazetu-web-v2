/**
 * Supabase helper utilities for property listings
 * 
 * TODO: Replace mock data with real Supabase queries once database is set up.
 * 
 * To connect to Supabase:
 * 1. Install @supabase/supabase-js: npm install @supabase/supabase-js
 * 2. Create lib/supabase/client.ts with Supabase client initialization
 * 3. Replace getMockListings with real Supabase queries
 * 4. Update getImageUrl to use Supabase Storage public URLs
 */

import { ListingFilters, ListingWithCoverImage, ListingsResponse } from "./types";
import { getMockProperties, getPlaceholderImageUrl, getBlurDataURL } from "./mock-data";

const PER_PAGE = 24;

/**
 * Get property image URL from Supabase Storage
 * 
 * TODO: Replace with actual Supabase Storage URL generation:
 * 
 * import { createClient } from '@supabase/supabase-js'
 * const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
 * 
 * const { data } = supabase.storage.from('property-images').getPublicUrl(storagePath)
 * return data.publicUrl
 */
export function getImageUrl(storagePath: string): string {
  // For now, use placeholder images
  // TODO: Replace with Supabase Storage public URL
  const propertyId = storagePath.split("/")[1] || "default";
  return getPlaceholderImageUrl(propertyId);
}

/**
 * Fetch listings from Supabase with filters
 * 
 * TODO: Replace with real Supabase query:
 * 
 * const query = supabase
 *   .from('properties')
 *   .select(`
 *     *,
 *     property_images!inner(storage_path, is_cover, position)
 *   `)
 *   .eq('property_images.is_cover', true)
 *   .order('created_at', { ascending: false })
 * 
 * if (filters.city) {
 *   query.ilike('city', `%${filters.city}%`)
 * }
 * // ... apply other filters
 * 
 * const { data, error } = await query
 */
export async function fetchListings(
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

