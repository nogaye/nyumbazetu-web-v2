"use client";

/**
 * Sign-up page: temporarily shows a "request demo" CTA instead of account creation.
 * When account creation is re-enabled, this page will show the email/password and
 * Google sign-up form again.
 */

import Link from "next/link";
import { UserPlus, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthFormCard } from "@/components/auth/auth-form-card";

/**
 * Placeholder content shown when sign-up is disabled.
 * Encourages users to request a demo or talk to the team, with a primary CTA to /request-demo.
 */
function SignUpPlaceholder() {
  return (
    <AuthFormCard
      icon={<UserPlus className="h-6 w-6" />}
      title="Create an account"
      description={
        <>
          New accounts aren’t available right now. If you’re interested in Nyumba Zetu, we’d love to hear from you—request a demo or chat with our team and we’ll get you set up.
        </>
      }
      footer={
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/auth/sign-in"
            className="font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
          >
            Sign in
          </Link>
        </p>
      }
    >
      <div className="space-y-4">
        <Button asChild className="w-full" size="lg">
          <Link href="/request-demo" className="flex items-center justify-center gap-2">
            <MessageCircle className="h-4 w-4" aria-hidden />
            Request a demo or talk to the team
          </Link>
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          We’ll walk you through the platform and help you get started.
        </p>
      </div>
    </AuthFormCard>
  );
}

/**
 * Sign-up page wrapper. Renders the placeholder when account creation is disabled.
 */
export default function SignUpPage() {
  return <SignUpPlaceholder />;
}
