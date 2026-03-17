/**
 * TypeScript types for property listings
 *
 * These types match the Supabase schema:
 * - tb_listing_properties table (with enum_listing_property_type, enum_listing_purpose, enum_listing_type)
 * - tb_listing_images table
 */

import type { ListingPropertyType, ListingPurpose, ListingType } from "./enums";

export type { ListingPropertyType, ListingPurpose, ListingType };

/** String union of property type values (for filters and API). */
export type PropertyType = `${ListingPropertyType}`;

/** String union of listing purpose values. */
export type ListingPurposeType = `${ListingPurpose}`;

/** String union of listing type values. */
export type ListingTypeValue = `${ListingType}`;

export interface Property {
  /** Primary key (BIGSERIAL). */
  id: number;
  title: string;
  slug: string;
  description: string;
  city: string;
  area: string;
  /** First line of street address; used for map search and display. */
  address_line_1?: string | null;
  /** Latitude in decimal degrees for map pin/embed. */
  latitude?: number | null;
  /** Longitude in decimal degrees for map pin/embed. */
  longitude?: number | null;
  /** Monthly rent (used when listing_purpose is 'rent'). */
  monthly_rent: number;
  /** Default price per night or sale price (used for short_stay or buy). */
  base_price?: number;
  /** ISO currency code (e.g. USD, KES). */
  currency_code?: string;
  bedrooms: number;
  bathrooms: number;
  size_sqm: number | null;
  /** Type of property (apartment, house, villa, land, office, commercial). */
  property_type: PropertyType;
  /** Whether listing is for buy, rent, or short_stay; drives price vs check-in/out display. */
  listing_purpose?: ListingPurposeType;
  /** Entire place, private room, or shared room; default entire_place. */
  listing_type?: ListingTypeValue;
  is_tps_available: boolean;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface PropertyImage {
  /** Primary key (BIGSERIAL). */
  id: number;
  /** Property this image belongs to (FK to tb_listing_properties.id). */
  property_id: number;
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
  /**
   * Match listings whose `area` contains any of these substrings (OR). Used for SEO hubs
   * that span adjacent neighbourhoods (e.g. Ruaka + Runda). When set, `area` is ignored for the query.
   */
  areaOr?: string[];
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number | "3+";
  propertyType?: PropertyType;
  /** Filter by listing purpose (buy, rent, short_stay). */
  listingPurpose?: ListingPurposeType;
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

/** Database row shape for tb_listing_comments (comment or review). */
export interface ListingCommentRow {
  id: number;
  uuid: string;
  org_id: number | null;
  branch_id: number | null;
  property_id: number;
  parent_comment_id: number | null;
  user_id: number;
  comment_type: "comment" | "review";
  title: string | null;
  headline: string | null;
  body: string;
  rating: number | null;
  cleanliness_rating: number | null;
  accuracy_rating: number | null;
  communication_rating: number | null;
  location_rating: number | null;
  check_in_rating: number | null;
  value_rating: number | null;
  is_visible: boolean;
  is_internal: boolean;
  is_featured: boolean;
  is_verified_review: boolean;
  moderation_status: string;
  is_edited: boolean;
  edited_at: string | null;
  reply_count: number;
  like_count: number;
  created_at: string;
  created_by: number | null;
  updated_at: string;
  updated_by: number | null;
  deleted_at: string | null;
  deleted_by: number | null;
  is_deleted: boolean;
}

/** Display shape for a single review (from tb_listing_comments where comment_type = 'review'). */
export interface ListingReviewDisplay {
  author: string;
  label?: string;
  rating: number;
  body: string;
  date: string;
}

/** Display shape for a single comment (from tb_listing_comments where comment_type = 'comment'). */
export interface ListingCommentDisplay {
  author: string;
  label?: string;
  body: string;
  date: string;
}

/** Aggregate review stats for a property. */
export interface ListingReviewStats {
  averageRating: number;
  totalReviews: number;
}
