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
      properties: {
        Row: {
          id: string;
          title: string;
          slug: string;
          description: string | null;
          city: string;
          area: string;
          monthly_rent: number;
          bedrooms: number;
          bathrooms: number;
          size_sqm: number | null;
          property_type: 'apartment' | 'maisonette' | 'bedsitter' | 'office' | 'shop' | 'house' | 'studio';
          is_tps_available: boolean;
          is_verified: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          description?: string | null;
          city: string;
          area: string;
          monthly_rent: number;
          bedrooms: number;
          bathrooms: number;
          size_sqm?: number | null;
          property_type: 'apartment' | 'maisonette' | 'bedsitter' | 'office' | 'shop' | 'house' | 'studio';
          is_tps_available?: boolean;
          is_verified?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          description?: string | null;
          city?: string;
          area?: string;
          monthly_rent?: number;
          bedrooms?: number;
          bathrooms?: number;
          size_sqm?: number | null;
          property_type?: 'apartment' | 'maisonette' | 'bedsitter' | 'office' | 'shop' | 'house' | 'studio';
          is_tps_available?: boolean;
          is_verified?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      property_images: {
        Row: {
          id: string;
          property_id: string;
          storage_path: string;
          is_cover: boolean;
          position: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          property_id: string;
          storage_path: string;
          is_cover?: boolean;
          position?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          property_id?: string;
          storage_path?: string;
          is_cover?: boolean;
          position?: number;
          created_at?: string;
        };
      };
      property_inquiries: {
        Row: {
          id: string;
          property_id: string | null;
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
          id?: string;
          property_id?: string | null;
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
          id?: string;
          property_id?: string | null;
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
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

