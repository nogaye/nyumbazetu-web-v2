/**
 * TypeScript types for property listings
 * 
 * These types match the Supabase schema:
 * - properties table
 * - property_images table
 */

export type PropertyType =
  | "apartment"
  | "maisonette"
  | "bedsitter"
  | "office"
  | "shop"
  | "house"
  | "studio";

export interface Property {
  id: string;
  title: string;
  slug: string;
  description: string;
  city: string;
  area: string;
  monthly_rent: number;
  bedrooms: number;
  bathrooms: number;
  size_sqm: number | null;
  property_type: PropertyType;
  is_tps_available: boolean;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface PropertyImage {
  id: string;
  property_id: string;
  storage_path: string;
  is_cover: boolean;
  position: number;
}

export interface ListingWithCoverImage extends Property {
  cover_image_url: string;
  blur_data_url?: string;
}

export type SortOption = 
  | "recommended"
  | "price-low"
  | "price-high"
  | "newest"
  | "oldest";

export interface ListingFilters {
  city?: string;
  area?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number | "3+";
  propertyType?: PropertyType;
  tps?: boolean;
  page?: number;
  sort?: SortOption;
  search?: string;
}

export interface ListingsResponse {
  listings: ListingWithCoverImage[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}

