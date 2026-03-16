"use client";

/**
 * Forgot-password page: sends a reset link to the given email.
 * Uses AuthFormCard and shows a polished "check your email" success state.
 */

import { useState } from "react";
import Link from "next/link";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthFormCard } from "@/components/auth/auth-form-card";
import { AuthErrorAlert } from "@/components/auth/auth-error-alert";
import { getAuthBrowserClient } from "@/lib/supabase/auth-client";
import { forgotPassword } from "@/lib/auth/supabase-auth-service";
import { isEmailFormatValid } from "@/lib/auth/constants";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }
    if (!isEmailFormatValid(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setIsLoading(true);
    try {
      const supabase = getAuthBrowserClient();
      if (!supabase) {
        setError("Authentication is not configured. Please try again later.");
        setIsLoading(false);
        return;
      }
      const result = await forgotPassword(supabase, email);
      if (result.success) {
        setSent(true);
      } else {
        setError(result.error ?? "Failed to send reset email.");
      }
    } catch (_err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (sent) {
    return (
      <AuthFormCard
        icon={<Mail className="h-6 w-6" />}
        title="Check your email"
        description={
          <>
            If an account exists for <strong className="text-foreground">{email}</strong>, you will receive a link to reset your password. The link may take a few minutes to arrive and will expire after a short time.
          </>
        }
        footer={
          <p className="text-center text-sm text-muted-foreground">
            <Link
              href="/auth/sign-in"
              className="font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
            >
              Back to sign in
            </Link>
          </p>
        }
      >
        <Button asChild className="w-full">
          <Link href="/auth/sign-in">Back to sign in</Link>
        </Button>
      </AuthFormCard>
    );
  }

  return (
    <AuthFormCard
      icon={<Mail className="h-6 w-6" />}
      title="Reset password"
      description="Enter your email and we'll send you a link to reset your password."
      footer={
        <p className="text-center text-sm text-muted-foreground">
          <Link
            href="/auth/sign-in"
            className="font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
          >
            Back to sign in
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <AuthErrorAlert message={error} />

        <div className="space-y-2">
          <Label htmlFor="forgot-email">Email</Label>
          <Input
            id="forgot-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            disabled={isLoading}
            required
            aria-invalid={!!error}
          />
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
          aria-busy={isLoading}
        >
          {isLoading ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden />
              Sending…
            </>
          ) : (
            "Send reset link"
          )}
        </Button>
      </form>
    </AuthFormCard>
  );
}
