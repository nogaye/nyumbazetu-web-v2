/**
 * Supabase client for browser/client-side usage
 * 
 * This client uses the anon key and respects Row Level Security (RLS) policies.
 * Use this for client-side operations where RLS is appropriate.
 */

import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Supabase URL or Anon Key is missing. Using mock data. ' +
    'Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env.local file.'
  );
}

// Create Supabase client (will be undefined if env vars are missing)
// Only create client if both URL and key are valid
export const supabase = 
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl.startsWith('http')
    ? createClient<Database>(supabaseUrl, supabaseAnonKey, {
        auth: {
          persistSession: false, // We don't need auth for public listings
        },
      })
    : null;

