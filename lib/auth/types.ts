/**
 * Shared types for Supabase Auth and profile handling.
 */

import type { User as SupabaseUser } from "@supabase/supabase-js";

/** Profile row from public.tb_auth_users (1:1 with auth.users). */
export interface AuthProfile {
  id: string;
  email: string | null;
  full_name: string | null;
  avatar_url: string | null;
  auth_provider: string | null;
  created_at: string;
  updated_at: string;
}

/** Combined user + profile for app use. */
export interface AuthUser {
  id: string;
  email: string | null;
  profile: AuthProfile | null;
  /** From auth.users; e.g. email, google. */
  app_metadata?: Record<string, unknown>;
  user_metadata?: Record<string, unknown>;
}

/** Result of sign-up with email/password. */
export interface SignUpResult {
  success: boolean;
  needsEmailVerification?: boolean;
  error?: string;
}

/** Result of sign-in (email/password or OAuth). */
export interface SignInResult {
  success: boolean;
  error?: string;
  unverifiedEmail?: boolean;
}

/** Result of password reset request. */
export interface ForgotPasswordResult {
  success: boolean;
  error?: string;
}

/** Result of password update (reset or change). */
export interface ResetPasswordResult {
  success: boolean;
  error?: string;
}

/** Sanitized redirect path: only allow relative paths to avoid open redirect. */
export function sanitizeRedirect(redirect: string | null | undefined): string {
  if (!redirect || typeof redirect !== "string") return "/account";
  const trimmed = redirect.trim();
  if (!trimmed.startsWith("/") || trimmed.startsWith("//")) return "/account";
  return trimmed;
}
