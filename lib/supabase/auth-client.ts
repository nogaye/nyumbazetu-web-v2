/**
 * Supabase browser client for auth and authenticated data access.
 *
 * Uses @supabase/ssr createBrowserClient so the session is stored in cookies
 * and survives refresh. Use this in Client Components for sign-in, sign-out,
 * and any RLS-protected data (e.g. tb_auth_users). Never use the service role key here.
 */

import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "./database.types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/**
 * Creates a Supabase client for the browser with cookie-based session persistence.
 * Singleton per env: createBrowserClient reuses one instance.
 * Use in Client Components only.
 *
 * @returns Supabase client or null if env vars are missing (e.g. during build).
 */
export function createAuthBrowserClient() {
  if (typeof window === "undefined") {
    return null;
  }
  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }
  return createBrowserClient<Database>(supabaseUrl, supabaseAnonKey);
}

/** Cached browser client for client components. Do not use on server. */
let browserClient: ReturnType<typeof createBrowserClient<Database>> | null = null;

/**
 * Returns the Supabase browser client for auth. Safe to call from Client Components.
 * Returns null if not in browser or env vars missing.
 */
export function getAuthBrowserClient() {
  if (typeof window === "undefined") {
    return null;
  }
  if (!browserClient) {
    browserClient = createAuthBrowserClient();
  }
  return browserClient;
}
