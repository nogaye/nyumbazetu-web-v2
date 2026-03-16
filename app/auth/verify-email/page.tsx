"use client";

/**
 * Verify-email / check inbox page: shown when user needs to confirm their email.
 * Can be linked after sign-up or when session requires verification.
 */

import Link from "next/link";
import { Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthFormCard } from "@/components/auth/auth-form-card";

export default function VerifyEmailPage() {
  return (
    <AuthFormCard
      icon={<Mail className="h-6 w-6" />}
      title="Check your inbox"
      description="We've sent you a verification link. Click the link in the email to verify your account and then sign in."
      footer={
        <p className="text-center text-sm text-muted-foreground">
          Didn't receive the email? Check your spam folder or{" "}
          <Link
            href="/auth/sign-up"
            className="font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
          >
            try signing up again
          </Link>
          .
        </p>
      }
    >
      <div className="space-y-4">
        <Button asChild className="w-full">
          <Link href="/auth/sign-in" className="gap-2">
            Go to sign in
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          Secure sign-in. We never share your data.
        </p>
      </div>
    </AuthFormCard>
  );
}
