"use client";

/**
 * Auth guard: redirects unauthenticated users to sign-in.
 * Use around protected page content. Preserves intended destination in redirect param.
 */

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "./auth-provider";

interface AuthGuardProps {
  children: React.ReactNode;
  /** Where to send after sign-in. Defaults to current pathname. */
  redirectTo?: string;
}

/**
 * Wraps content that requires authentication. Shows loading until session is resolved,
 * then redirects to sign-in with redirect param if not authenticated.
 */
export function AuthGuard({ children, redirectTo }: AuthGuardProps) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const destination = redirectTo ?? pathname ?? "/account";

  useEffect(() => {
    if (loading) return;
    if (!user) {
      const signInUrl = new URL("/auth/sign-in", window.location.origin);
      signInUrl.searchParams.set("redirect", destination);
      router.replace(signInUrl.pathname + signInUrl.search);
    }
  }, [user, loading, router, destination]);

  if (loading) {
    return (
      <div className="flex min-h-[200px] items-center justify-center">
        <p className="text-slate-500 dark:text-slate-400">Checking authentication…</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
