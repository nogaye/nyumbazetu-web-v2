/**
 * Supabase client for server-side usage
 * 
 * This client can use the service role key for admin operations,
 * or the anon key for RLS-respecting queries.
 * Use this in Server Components and API routes.
 */

import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  console.warn(
    'NEXT_PUBLIC_SUPABASE_URL is missing. Using mock data. ' +
    'Please set NEXT_PUBLIC_SUPABASE_URL in your .env.local file.'
  );
}

// Server-side client with anon key (respects RLS)
// Only create client if both URL and key are valid
export const supabaseServer = 
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl.startsWith('http')
    ? createClient<Database>(supabaseUrl, supabaseAnonKey, {
        auth: {
          persistSession: false,
        },
      })
    : null;

// Server-side admin client with service role key (bypasses RLS)
// Use with caution - only for admin operations
export const supabaseAdmin = 
  supabaseUrl && 
  supabaseServiceRoleKey && 
  supabaseUrl.startsWith('http')
    ? createClient<Database>(supabaseUrl, supabaseServiceRoleKey, {
        auth: {
          persistSession: false,
        },
      })
    : null;

