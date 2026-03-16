"use client";

/**
 * Auth guard: redirects unauthenticated users to sign-in.
 * Use around protected page content. Preserves intended destination in redirect param.
 * If the auth check hangs (e.g. Supabase slow or env missing), a timeout redirects to sign-in.
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "./auth-provider";

/** After this many ms still loading, redirect to sign-in so the app never freezes. */
const LOADING_TIMEOUT_MS = 6000;

interface AuthGuardProps {
  children: React.ReactNode;
  /** Where to send after sign-in. Defaults to current pathname. */
  redirectTo?: string;
}

function redirectToSignIn(router: ReturnType<typeof useRouter>, destination: string) {
  const signInUrl = new URL("/auth/sign-in", window.location.origin);
  signInUrl.searchParams.set("redirect", destination);
  router.replace(signInUrl.pathname + signInUrl.search);
}

/**
 * Wraps content that requires authentication. Shows loading until session is resolved,
 * then redirects to sign-in with redirect param if not authenticated.
 * If loading runs longer than LOADING_TIMEOUT_MS, redirects to sign-in to avoid freezing.
 */
export function AuthGuard({ children, redirectTo }: AuthGuardProps) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const destination = redirectTo ?? pathname ?? "/account";
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      redirectToSignIn(router, destination);
    }
  }, [user, loading, router, destination]);

  /** If auth check hangs, redirect to sign-in after timeout so the app never freezes. */
  useEffect(() => {
    if (!loading) return;
    const t = setTimeout(() => {
      setTimedOut(true);
      redirectToSignIn(router, destination);
    }, LOADING_TIMEOUT_MS);
    return () => clearTimeout(t);
  }, [loading, router, destination]);

  if (loading && !timedOut) {
    return (
      <div className="flex min-h-[200px] flex-col items-center justify-center gap-4">
        <p className="text-slate-500 dark:text-slate-400">Checking authentication…</p>
        <Link
          href={`/auth/sign-in?redirect=${encodeURIComponent(destination)}`}
          className="text-sm font-medium text-primary hover:underline"
        >
          Sign in instead
        </Link>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
