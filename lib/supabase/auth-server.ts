/**
 * Supabase server client for auth and authenticated data access.
 *
 * Uses @supabase/ssr createServerClient with Next.js cookies so the session
 * is read from the request. Use in Server Components, Route Handlers, and
 * Server Actions. Call createServerClient() per-request (e.g. in each handler);
 * do not cache the client across requests.
 */

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "./database.types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/**
 * Creates a Supabase client for the server that reads/writes auth via cookies.
 * Must be called per request (Server Component, Route Handler, or Server Action).
 * Cookie writes in Server Components may throw; the proxy/middleware is responsible
 * for refreshing the session and writing cookies.
 *
 * @returns Supabase client or null if env vars are missing.
 */
export async function createServerSupabaseClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }
  const cookieStore = await cookies();
  return createServerClient<Database>(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // Expected in Server Components: only middleware/proxy can set cookies.
          // Ignore so we don't break the request.
        }
      },
    },
  });
}
