"use client";

/**
 * Account page: shows current user profile and sign-out.
 * Protected; unauthenticated users are redirected to sign-in.
 */

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthGuard } from "@/components/auth/auth-guard";
import { useAuth } from "@/components/auth/auth-provider";
import { getAuthBrowserClient } from "@/lib/supabase/auth-client";
import { signOut } from "@/lib/auth/supabase-auth-service";
import { useRouter } from "next/navigation";

function AccountContentInner() {
  const { user, profile } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const resetOk = searchParams.get("reset") === "ok";

  const handleSignOut = async () => {
    const supabase = getAuthBrowserClient();
    if (supabase) await signOut(supabase);
    router.push("/");
    router.refresh();
  };

  const displayName =
    profile?.full_name?.trim() ||
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.email?.split("@")[0] ||
    "Account";

  return (
    <div className="container max-w-2xl py-10">
      {resetOk && (
        <div className="mb-4 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-800 dark:border-green-800 dark:bg-green-950/30 dark:text-green-200">
          Your password has been updated.
        </div>
      )}
      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
          <CardDescription>Your profile and sign-in details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Name</p>
            <p className="text-slate-900 dark:text-slate-100">{displayName}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Email</p>
            <p className="text-slate-900 dark:text-slate-100">{user?.email ?? "—"}</p>
          </div>
          {profile?.auth_provider && (
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Signed in with</p>
              <p className="capitalize text-slate-900 dark:text-slate-100">{profile.auth_provider}</p>
            </div>
          )}
          <div className="flex flex-wrap gap-3 pt-4">
            <Button variant="outline" asChild>
              <Link href="/dashboard">Go to dashboard</Link>
            </Button>
            <Button variant="secondary" onClick={handleSignOut}>
              Sign out
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function AccountContent() {
  return (
    <Suspense fallback={<div className="container max-w-2xl py-10 text-center text-slate-500">Loading…</div>}>
      <AccountContentInner />
    </Suspense>
  );
}

export default function AccountPage() {
  return (
    <AuthGuard>
      <AccountContent />
    </AuthGuard>
  );
}
