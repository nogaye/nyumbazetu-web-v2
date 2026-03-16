/**
 * Supabase Auth service: sign-up, sign-in, sign-out, password reset, and profile bootstrap.
 *
 * Use from client code via getAuthBrowserClient() or from server via createServerSupabaseClient().
 * Handles common error cases and returns typed results for UI.
 */

import type { SupabaseClient } from "@supabase/supabase-js";
import type { AuthProfile } from "./types";
import { ensureProfile } from "./profile-bootstrap";
import type { Database } from "@/lib/supabase/database.types";

type TypedSupabase = SupabaseClient<Database>;

/**
 * Signs up with email and password. On success, profile is created by DB trigger or ensureProfile.
 *
 * @param supabase - Authenticated Supabase client (browser or server).
 * @param email - User email.
 * @param password - User password (min length enforced by caller).
 * @returns SignUpResult with success, optional needsEmailVerification, or error message.
 */
export async function signUpWithEmail(
  supabase: TypedSupabase,
  email: string,
  password: string
): Promise<{ success: boolean; needsEmailVerification?: boolean; error?: string }> {
  const { data, error } = await supabase.auth.signUp({
    email: email.trim().toLowerCase(),
    password,
    options: { emailRedirectTo: redirectToOrigin("/auth/callback") },
  });

  if (error) {
    if (error.message.includes("already registered") || error.code === "user_already_exists") {
      return { success: false, error: "An account with this email already exists. Try signing in." };
    }
    return { success: false, error: error.message || "Sign up failed." };
  }

  if (data?.user && !data.session && data.user.identities?.length === 0) {
    return { success: false, error: "An account with this email already exists. Try signing in." };
  }

  const needsEmailVerification = !!data?.user && !data?.session;
  if (data?.user && data?.session) {
    await ensureProfile(supabase, data.user.id, {
      email: data.user.email ?? undefined,
      full_name: (data.user.user_metadata?.full_name as string) ?? (data.user.user_metadata?.name as string),
      avatar_url: data.user.user_metadata?.avatar_url as string | undefined,
      auth_provider: "email",
    });
  }
  return { success: true, needsEmailVerification };
}

/**
 * Signs in with email and password.
 *
 * @param supabase - Supabase client (browser or server).
 * @param email - User email.
 * @param password - User password.
 * @returns SignInResult; unverifiedEmail if email confirmation is required.
 */
export async function signInWithEmail(
  supabase: TypedSupabase,
  email: string,
  password: string
): Promise<{ success: boolean; error?: string; unverifiedEmail?: boolean }> {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim().toLowerCase(),
    password,
  });

  if (error) {
    if (error.message.includes("Email not confirmed")) {
      return { success: false, error: "Please confirm your email before signing in.", unverifiedEmail: true };
    }
    if (error.message.includes("Invalid login credentials")) {
      return { success: false, error: "Invalid email or password." };
    }
    return { success: false, error: error.message || "Sign in failed." };
  }

  if (data?.user) {
    await ensureProfile(supabase, data.user.id, {
      email: data.user.email ?? undefined,
      full_name: (data.user.user_metadata?.full_name as string) ?? (data.user.user_metadata?.name as string),
      avatar_url: data.user.user_metadata?.avatar_url as string | undefined,
      auth_provider: "email",
    });
  }
  return { success: true };
}

/**
 * Initiates Google OAuth sign-in. Redirects to Supabase/Google; callback goes to redirectTo.
 *
 * @param supabase - Browser Supabase client.
 * @param redirectTo - Full URL for auth callback (e.g. origin + /auth/callback).
 */
export async function signInWithGoogle(
  supabase: TypedSupabase,
  redirectTo?: string
): Promise<{ success: boolean; error?: string }> {
  const url = redirectTo ?? redirectToOrigin("/auth/callback");
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: url },
  });

  if (error) {
    return { success: false, error: error.message || "Google sign-in failed." };
  }
  if (data?.url) {
    window.location.href = data.url;
    return { success: true };
  }
  return { success: false, error: "Could not start Google sign-in." };
}

/**
 * Signs out and clears session. Call from client so cookies are cleared.
 *
 * @param supabase - Supabase client (prefer browser so redirect works).
 */
export async function signOut(supabase: TypedSupabase): Promise<{ error?: string }> {
  const { error } = await supabase.auth.signOut();
  return error ? { error: error.message } : {};
}

/**
 * Sends a password reset email. Supabase sends the email with a link to the app.
 *
 * @param supabase - Supabase client.
 * @param email - User email.
 * @param redirectTo - Optional full URL for the reset page (e.g. origin + /auth/reset-password).
 */
export async function forgotPassword(
  supabase: TypedSupabase,
  email: string,
  redirectTo?: string
): Promise<{ success: boolean; error?: string }> {
  const url = redirectTo ?? redirectToOrigin("/auth/reset-password");
  const { error } = await supabase.auth.resetPasswordForEmail(email.trim().toLowerCase(), {
    redirectTo: url,
  });

  if (error) {
    if (error.message.includes("rate limit")) {
      return { success: false, error: "Too many requests. Please try again later." };
    }
    return { success: false, error: error.message || "Failed to send reset email." };
  }
  return { success: true };
}

/**
 * Updates password (e.g. from reset link or change-password flow). Requires a valid session or recovery token.
 *
 * @param supabase - Supabase client (browser after redirect from reset link).
 * @param newPassword - New password.
 */
export async function updatePassword(
  supabase: TypedSupabase,
  newPassword: string
): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase.auth.updateUser({ password: newPassword });
  if (error) {
    if (error.message.includes("same as")) {
      return { success: false, error: "Please choose a different password." };
    }
    return { success: false, error: error.message || "Failed to update password." };
  }
  return { success: true };
}

/**
 * Fetches the current user's profile from public.tb_auth_users. Returns null if not found or not authenticated.
 */
export async function getCurrentProfile(
  supabase: TypedSupabase
): Promise<AuthProfile | null> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const { data } = await supabase.from("tb_auth_users").select("*").eq("id", user.id).single();
  return data as AuthProfile | null;
}

/** Builds redirect URL using request origin when available; falls back to env or relative path. */
function redirectToOrigin(path: string): string {
  if (typeof window !== "undefined" && window.location?.origin) {
    return `${window.location.origin}${path}`;
  }
  const base = process.env.NEXT_PUBLIC_APP_URL ?? process.env.VERCEL_URL;
  if (base) {
    const origin = base.startsWith("http") ? base : `https://${base}`;
    return `${origin}${path}`;
  }
  return path;
}
