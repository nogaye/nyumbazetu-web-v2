/**
 * Next.js Proxy (formerly Middleware)
 *
 * Request gateway at the network boundary. Responsibilities:
 * 1. Refreshes Supabase Auth session and writes updated cookies to the response.
 * 2. Protects admin routes: redirects unauthenticated users to /auth/sign-in with a
 *    redirect param so they return to the requested admin path after sign-in.
 */

import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/** Cookie name used for admin session (legacy cookie-based admin auth). */
const SESSION_COOKIE_NAME = "admin_session";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * Proxy handler: runs before requests reach the app. Refreshes Supabase session
 * when env is set, then enforces admin auth and redirects as needed.
 *
 * @param request - Incoming request.
 * @returns NextResponse (redirect or next()).
 */
export async function proxy(request: NextRequest) {
  let response = NextResponse.next({
    request: { headers: request.headers },
  });

  // Refresh Supabase Auth session and write cookies to response so Server Components see the session.
  if (supabaseUrl && supabaseAnonKey) {
    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    });
    await supabase.auth.getUser();
  }

  const { pathname } = request.nextUrl;

  // Admin route protection (legacy admin_session cookie): send unauthenticated users to shared sign-in.
  if (pathname.startsWith("/admin")) {
    const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME);
    if (!sessionCookie) {
      const signInUrl = new URL("/auth/sign-in", request.url);
      signInUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(signInUrl);
    }
  }

  return response;
}

/** Paths this proxy runs for: auth callback, account, dashboard, and admin. */
export const config = {
  matcher: [
    "/auth/callback",
    "/account/:path*",
    "/dashboard/:path*",
    "/admin/:path*",
  ],
};
