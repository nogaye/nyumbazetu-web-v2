/**
 * TypeScript types for Supabase database
 * 
 * This file should be auto-generated from your Supabase project.
 * To generate types:
 * 1. Install Supabase CLI: npm install -g supabase
 * 2. Run: supabase gen types typescript --project-id YOUR_PROJECT_ID > lib/supabase/database.types.ts
 * 
 * For now, these are manually defined based on our schema.
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      tb_listing_properties: {
        Row: {
          /** Primary key (BIGSERIAL). */
          id: number;
          title: string;
          slug: string;
          description: string | null;
          city: string;
          area: string;
          monthly_rent: number;
          /** Default price per night or sale price; used for short_stay or buy. */
          base_price?: number;
          /** ISO currency code (e.g. USD, KES). */
          currency_code?: string;
          bedrooms: number;
          bathrooms: number;
          size_sqm: number | null;
          /** Type of property: apartment, house, villa, land, office, commercial. */
          property_type: 'apartment' | 'house' | 'villa' | 'land' | 'office' | 'commercial';
          /** Listing purpose: buy, rent, short_stay. */
          listing_purpose: 'buy' | 'rent' | 'short_stay';
          /** Listing type: entire_place, private_room, shared_room. */
          listing_type: 'entire_place' | 'private_room' | 'shared_room';
          is_tps_available: boolean;
          is_verified: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          /** Omitted for insert; server assigns BIGSERIAL. */
          id?: number;
          title: string;
          slug: string;
          description?: string | null;
          city: string;
          area: string;
          monthly_rent: number;
          base_price?: number;
          currency_code?: string;
          bedrooms: number;
          bathrooms: number;
          size_sqm?: number | null;
          property_type: 'apartment' | 'house' | 'villa' | 'land' | 'office' | 'commercial';
          listing_purpose?: 'buy' | 'rent' | 'short_stay';
          listing_type?: 'entire_place' | 'private_room' | 'shared_room';
          is_tps_available?: boolean;
          is_verified?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          title?: string;
          slug?: string;
          description?: string | null;
          city?: string;
          area?: string;
          monthly_rent?: number;
          base_price?: number;
          currency_code?: string;
          bedrooms?: number;
          bathrooms?: number;
          size_sqm?: number | null;
          property_type?: 'apartment' | 'house' | 'villa' | 'land' | 'office' | 'commercial';
          listing_purpose?: 'buy' | 'rent' | 'short_stay';
          listing_type?: 'entire_place' | 'private_room' | 'shared_room';
          is_tps_available?: boolean;
          is_verified?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      tb_listing_images: {
        Row: {
          /** Primary key (BIGSERIAL). */
          id: number;
          /** Property this image belongs to (FK to tb_listing_properties.id). */
          property_id: number;
          storage_path: string;
          is_cover: boolean;
          position: number;
          created_at: string;
        };
        Insert: {
          id?: number;
          property_id: number;
          storage_path: string;
          is_cover?: boolean;
          position?: number;
          created_at?: string;
        };
        Update: {
          id?: number;
          property_id?: number;
          storage_path?: string;
          is_cover?: boolean;
          position?: number;
          created_at?: string;
        };
      };
      tb_listing_inquiries: {
        Row: {
          /** Primary key (BIGSERIAL). */
          id: number;
          /** Property the inquiry is about; NULL if property was deleted. */
          property_id: number | null;
          property_slug: string | null;
          property_title: string | null;
          name: string;
          email: string;
          phone: string | null;
          message: string;
          status: 'new' | 'contacted' | 'viewing_scheduled' | 'closed';
          source: string;
          metadata: Json | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          property_id?: number | null;
          property_slug?: string | null;
          property_title?: string | null;
          name: string;
          email: string;
          phone?: string | null;
          message: string;
          status?: 'new' | 'contacted' | 'viewing_scheduled' | 'closed';
          source?: string;
          metadata?: Json | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          property_id?: number | null;
          property_slug?: string | null;
          property_title?: string | null;
          name?: string;
          email?: string;
          phone?: string | null;
          message?: string;
          status?: 'new' | 'contacted' | 'viewing_scheduled' | 'closed';
          source?: string;
          metadata?: Json | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      /** Unified comments and reviews for listings; comment_type 'comment' | 'review'. */
      tb_listing_comments: {
        Row: {
          id: number;
          uuid: string;
          org_id: number | null;
          branch_id: number | null;
          property_id: number;
          parent_comment_id: number | null;
          user_id: number;
          comment_type: 'comment' | 'review';
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
        };
        Insert: {
          id?: number;
          uuid?: string;
          org_id?: number | null;
          branch_id?: number | null;
          property_id: number;
          parent_comment_id?: number | null;
          user_id: number;
          comment_type: 'comment' | 'review';
          title?: string | null;
          headline?: string | null;
          body: string;
          rating?: number | null;
          cleanliness_rating?: number | null;
          accuracy_rating?: number | null;
          communication_rating?: number | null;
          location_rating?: number | null;
          check_in_rating?: number | null;
          value_rating?: number | null;
          is_visible?: boolean;
          is_internal?: boolean;
          is_featured?: boolean;
          is_verified_review?: boolean;
          moderation_status?: string;
          is_edited?: boolean;
          edited_at?: string | null;
          reply_count?: number;
          like_count?: number;
          created_at?: string;
          created_by?: number | null;
          updated_at?: string;
          updated_by?: number | null;
          deleted_at?: string | null;
          deleted_by?: number | null;
          is_deleted?: boolean;
        };
        Update: {
          id?: number;
          org_id?: number | null;
          branch_id?: number | null;
          property_id?: number;
          parent_comment_id?: number | null;
          user_id?: number;
          comment_type?: 'comment' | 'review';
          title?: string | null;
          headline?: string | null;
          body?: string;
          rating?: number | null;
          cleanliness_rating?: number | null;
          accuracy_rating?: number | null;
          communication_rating?: number | null;
          location_rating?: number | null;
          check_in_rating?: number | null;
          value_rating?: number | null;
          is_visible?: boolean;
          is_internal?: boolean;
          is_featured?: boolean;
          is_verified_review?: boolean;
          moderation_status?: string;
          is_edited?: boolean;
          edited_at?: string | null;
          reply_count?: number;
          like_count?: number;
          updated_at?: string;
          updated_by?: number | null;
          deleted_at?: string | null;
          deleted_by?: number | null;
          is_deleted?: boolean;
        };
      };
      /** Reactions (e.g. like, helpful) on listing comments. */
      tb_listing_comment_reactions: {
        Row: {
          id: number;
          uuid: string;
          org_id: number | null;
          branch_id: number | null;
          property_id: number;
          comment_id: number;
          user_id: number;
          reaction_type: 'like' | 'helpful' | 'love';
          created_at: string;
          created_by: number | null;
          updated_at: string;
          updated_by: number | null;
          deleted_at: string | null;
          deleted_by: number | null;
          is_deleted: boolean;
        };
        Insert: {
          id?: number;
          uuid?: string;
          org_id?: number | null;
          branch_id?: number | null;
          property_id: number;
          comment_id: number;
          user_id: number;
          reaction_type: 'like' | 'helpful' | 'love';
          created_at?: string;
          created_by?: number | null;
          updated_at?: string;
          updated_by?: number | null;
          deleted_at?: string | null;
          deleted_by?: number | null;
          is_deleted?: boolean;
        };
        Update: {
          org_id?: number | null;
          branch_id?: number | null;
          property_id?: number;
          comment_id?: number;
          user_id?: number;
          reaction_type?: 'like' | 'helpful' | 'love';
          updated_at?: string;
          updated_by?: number | null;
          deleted_at?: string | null;
          deleted_by?: number | null;
          is_deleted?: boolean;
        };
      };
      /** Users table for listing comments/reviews (stub or profile). */
      tb_users: {
        Row: {
          id: number;
          uuid: string;
          email: string | null;
          display_name: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          uuid?: string;
          email?: string | null;
          display_name?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          email?: string | null;
          display_name?: string | null;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      enum_listing_property_type: 'apartment' | 'house' | 'villa' | 'land' | 'office' | 'commercial';
      enum_listing_purpose: 'buy' | 'rent' | 'short_stay';
      enum_listing_type: 'entire_place' | 'private_room' | 'shared_room';
      enum_listing_comment_reaction_type: 'like' | 'helpful' | 'love';
    };
  };
}

