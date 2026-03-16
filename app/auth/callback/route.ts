/**
 * Auth callback route: exchanges OAuth/magic-link code for session and redirects.
 *
 * Supabase redirects here with ?code=... after Google (or email link) sign-in.
 * We exchange the code for a session, then redirect to /account or next param.
 * Uses server Supabase client so cookies are set on the response.
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/auth-server";
import { ensureProfile } from "@/lib/auth/profile-bootstrap";
import { sanitizeRedirect } from "@/lib/auth/types";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next = requestUrl.searchParams.get("next") ?? "/account";

  if (!code) {
    return NextResponse.redirect(new URL("/auth/sign-in?error=missing_code", requestUrl.origin));
  }

  const supabase = await createServerSupabaseClient();
  if (!supabase) {
    return NextResponse.redirect(new URL("/auth/sign-in?error=config", requestUrl.origin));
  }

  const { data, error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    console.error("[auth/callback] exchangeCodeForSession error:", error.message);
    return NextResponse.redirect(
      new URL(`/auth/sign-in?error=${encodeURIComponent(error.message)}`, requestUrl.origin)
    );
  }

  if (data?.user) {
    await ensureProfile(supabase, data.user.id, {
      email: data.user.email ?? undefined,
      full_name: (data.user.user_metadata?.full_name as string) ?? (data.user.user_metadata?.name as string),
      avatar_url: data.user.user_metadata?.avatar_url as string | undefined,
      auth_provider: data.user.app_metadata?.provider as string ?? "oauth",
    });
  }

  const redirectTo = sanitizeRedirect(next);
  return NextResponse.redirect(new URL(redirectTo, requestUrl.origin));
}
