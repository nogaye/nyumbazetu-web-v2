"use client";

/**
 * Protected dashboard example: only visible when authenticated.
 * Redirects to sign-in with redirect=/dashboard when not logged in.
 */

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthGuard } from "@/components/auth/auth-guard";
import { useAuth } from "@/components/auth/auth-provider";

function DashboardContent() {
  const { user, profile } = useAuth();
  const displayName =
    profile?.full_name?.trim() ||
    user?.user_metadata?.full_name ||
    user?.email?.split("@")[0] ||
    "there";

  return (
    <div className="container max-w-3xl py-10">
      <Card>
        <CardHeader>
          <CardTitle>Dashboard</CardTitle>
          <CardDescription>Hello, {displayName}. This is a protected page.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-slate-600 dark:text-slate-400">
            You are signed in. This page is only visible to authenticated users.
          </p>
          <Button variant="outline" asChild>
            <Link href="/account">View account</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <AuthGuard redirectTo="/dashboard">
      <DashboardContent />
    </AuthGuard>
  );
}
