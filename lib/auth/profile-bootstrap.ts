/**
 * Profile bootstrap: ensure a public.tb_auth_users row exists for the current user.
 *
 * Call after sign-in/sign-up (and on first load for OAuth) so the app always
 * has a profile. The DB trigger creates the row on auth.users insert; this
 * handles edge cases (e.g. existing users before the trigger, or trigger failure).
 */

import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase/database.types";

type TypedSupabase = SupabaseClient<Database>;

/**
 * Ensures a profile row exists for the given user in public.tb_auth_users. Upserts by id so it's
 * idempotent. Use after sign-in/sign-up so the app can read profile safely.
 *
 * @param supabase - Client authenticated as the user (browser or server).
 * @param userId - auth.users.id.
 * @param defaults - Optional defaults (e.g. email, full_name from user_metadata).
 * @returns The profile row or null on error.
 */
type ProfileInsert = Database["public"]["Tables"]["tb_auth_users"]["Insert"];

export async function ensureProfile(
  supabase: TypedSupabase,
  userId: string,
  defaults?: { email?: string; full_name?: string; avatar_url?: string; auth_provider?: string }
): Promise<Database["public"]["Tables"]["tb_auth_users"]["Row"] | null> {
  const row: ProfileInsert = {
    id: userId,
  };
  if (defaults?.email != null) row.email = defaults.email;
  if (defaults?.full_name != null) row.full_name = defaults.full_name;
  if (defaults?.avatar_url != null) row.avatar_url = defaults.avatar_url;
  if (defaults?.auth_provider != null) row.auth_provider = defaults.auth_provider;
  row.updated_at = new Date().toISOString();

  // Cast needed: Supabase client generic can infer Tables from Database but upsert overload sometimes narrows to never for custom tables
  const { data, error } = await (supabase as any)
    .from("tb_auth_users")
    .upsert(row, { onConflict: "id" })
    .select()
    .single();

  if (error) {
    console.error("[auth] ensureProfile error:", error.message);
    return null;
  }
  return data;
}
