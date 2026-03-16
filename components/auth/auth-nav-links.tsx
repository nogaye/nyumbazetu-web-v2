"use client";

/**
 * Nav links for auth: Sign in (when logged out) or Account (when logged in).
 * Use in the main nav so the header reflects auth state without making the whole nav a client component.
 */

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "./auth-provider";
import { cn } from "@/lib/utils";

interface AuthNavLinksProps {
  /** When true, use light text for hero overlay (e.g. navOverHero). */
  overHero?: boolean;
  className?: string;
}

/**
 * Renders "Sign in" or "Account" based on auth state. Use in desktop nav.
 */
export function AuthNavLinks({ overHero, className }: AuthNavLinksProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <span className={cn("text-sm text-slate-500 dark:text-slate-400", className)}>
        …
      </span>
    );
  }

  if (user) {
    return (
      <Button
        variant="ghost"
        asChild
        className={cn(overHero && "text-white hover:text-primary hover:bg-white/10", className)}
      >
        <Link href="/account">Account</Link>
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      asChild
      className={cn(overHero && "text-white hover:text-primary hover:bg-white/10", className)}
    >
      <Link href="/auth/sign-in">Sign in</Link>
    </Button>
  );
}
