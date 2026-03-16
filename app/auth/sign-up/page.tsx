"use client";

/**
 * Sign-up page: email/password with password strength guidance and Google OAuth.
 * On success redirects or shows verify-email state. Uses reusable auth components.
 */

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthFormCard } from "@/components/auth/auth-form-card";
import { SocialLoginSection } from "@/components/auth/social-login-section";
import { AuthErrorAlert } from "@/components/auth/auth-error-alert";
import { PasswordInput } from "@/components/auth/password-input";
import { PasswordStrengthHint } from "@/components/auth/password-strength-hint";
import { useCapsLock } from "@/components/auth/use-caps-lock";
import { getAuthBrowserClient } from "@/lib/supabase/auth-client";
import { signUpWithEmail, signInWithGoogle } from "@/lib/auth/supabase-auth-service";
import { sanitizeRedirect } from "@/lib/auth/types";
import {
  isEmailFormatValid,
  isPasswordStrongEnough,
  MIN_PASSWORD_LENGTH,
} from "@/lib/auth/constants";

function SignUpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const { capsLockOn, onKeyDown } = useCapsLock();

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
    if (!isPasswordStrongEnough(password)) {
      setError(`Password must be at least ${MIN_PASSWORD_LENGTH} characters.`);
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
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
      const result = await signUpWithEmail(supabase, email, password);
      if (result.success) {
        if (result.needsEmailVerification) {
          setEmailSent(true);
        } else {
          const redirect = sanitizeRedirect(searchParams.get("redirect") ?? null);
          router.push(redirect);
          router.refresh();
        }
      } else {
        setError(result.error ?? "Sign up failed.");
      }
    } catch (_err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError("");
    setGoogleLoading(true);
    try {
      const supabase = getAuthBrowserClient();
      if (!supabase) {
        setError("Authentication is not configured. Please try again later.");
        setGoogleLoading(false);
        return;
      }
      await signInWithGoogle(supabase, {
        next: sanitizeRedirect(searchParams.get("redirect") ?? null),
      });
    } catch (_err) {
      setError("Google sign-up failed. Please try again.");
    } finally {
      setGoogleLoading(false);
    }
  };

  if (emailSent) {
    return (
      <AuthFormCard
        icon={<UserPlus className="h-6 w-6" />}
        title="Check your email"
        description={
          <>
            We sent a confirmation link to <strong className="text-foreground">{email}</strong>. Click the link to activate your account, then sign in.
          </>
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
      icon={<UserPlus className="h-6 w-6" />}
      title="Create an account"
      description="Use your email or Google to get started."
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
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <AuthErrorAlert message={error} />

        <SocialLoginSection
          onGoogleClick={handleGoogle}
          googleLoading={googleLoading}
          showDivider
          dividerLabel="Or continue with email"
          showSocial
        />

        <div className="space-y-2">
          <Label htmlFor="signup-email">Email</Label>
          <Input
            id="signup-email"
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

        <div className="space-y-2">
          <Label htmlFor="signup-password">Password</Label>
          <PasswordInput
            id="signup-password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder={`At least ${MIN_PASSWORD_LENGTH} characters`}
            disabled={isLoading}
            required
            minLength={MIN_PASSWORD_LENGTH}
            aria-describedby="password-requirements"
          />
          <PasswordStrengthHint minLength={MIN_PASSWORD_LENGTH} />
          {capsLockOn && (
            <p className="text-xs text-amber-600 dark:text-amber-500" role="status">
              Caps Lock is on.
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="signup-confirm">Confirm password</Label>
          <PasswordInput
            id="signup-confirm"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Repeat password"
            disabled={isLoading}
            required
            minLength={MIN_PASSWORD_LENGTH}
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
              Creating account…
            </>
          ) : (
            "Sign up"
          )}
        </Button>
      </form>
    </AuthFormCard>
  );
}

export default function SignUpPage() {
  return (
    <Suspense
      fallback={
        <div
          className="w-full max-w-[400px] rounded-xl border border-slate-200 bg-card p-8 text-center text-muted-foreground dark:border-slate-700"
          aria-busy="true"
        >
          Loading…
        </div>
      }
    >
      <SignUpForm />
    </Suspense>
  );
}
