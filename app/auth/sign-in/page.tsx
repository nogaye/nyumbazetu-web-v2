"use client";

/**
 * Sign-in page: email/password with optional remember me.
 * Google OAuth is temporarily disabled; to re-enable, add SocialLoginSection with onGoogleClick and signInWithGoogle.
 * Redirects to redirect query param or /account on success. Uses reusable auth components.
 */

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { AuthFormCard } from "@/components/auth/auth-form-card";
import { AuthErrorAlert } from "@/components/auth/auth-error-alert";
import { PasswordInput } from "@/components/auth/password-input";
import { useCapsLock } from "@/components/auth/use-caps-lock";
import { getAuthBrowserClient } from "@/lib/supabase/auth-client";
import { signInWithEmail } from "@/lib/auth/supabase-auth-service";
import { sanitizeRedirect } from "@/lib/auth/types";
import { isEmailFormatValid } from "@/lib/auth/constants";

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
    if (!password) {
      setError("Please enter your password.");
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
      const result = await signInWithEmail(supabase, email, password);
      if (result.success) {
        const redirect = sanitizeRedirect(searchParams.get("redirect") ?? null);
        router.push(redirect);
        router.refresh();
      } else {
        setError(result.error ?? "Sign in failed.");
      }
    } catch (_err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthFormCard
      icon={<Lock className="h-6 w-6" />}
      title="Sign in"
      description="Use your email to continue to your account."
      footer={
        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/sign-up"
            className="font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
          >
            Sign up
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <AuthErrorAlert message={error} />

        <div className="space-y-2">
          <Label htmlFor="signin-email">Email</Label>
          <Input
            id="signin-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            disabled={isLoading}
            required
            aria-invalid={!!error}
            aria-describedby={error ? "signin-error" : undefined}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="signin-password">Password</Label>
            <Link
              href="/auth/forgot-password"
              className="text-xs font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
            >
              Forgot password?
            </Link>
          </div>
          <PasswordInput
            id="signin-password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="••••••••"
            disabled={isLoading}
            required
            aria-invalid={!!error}
          />
          {capsLockOn && (
            <p className="text-xs text-amber-600 dark:text-amber-500" role="status">
              Caps Lock is on.
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Checkbox
            id="signin-remember"
            checked={rememberMe}
            onCheckedChange={(checked) => setRememberMe(checked === true)}
            disabled={isLoading}
            aria-describedby="signin-remember-desc"
          />
          <Label
            id="signin-remember-desc"
            htmlFor="signin-remember"
            className="text-sm font-normal text-muted-foreground cursor-pointer"
          >
            Remember me
          </Label>
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
              Signing in…
            </>
          ) : (
            "Sign in"
          )}
        </Button>
      </form>
    </AuthFormCard>
  );
}

export default function SignInPage() {
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
      <SignInForm />
    </Suspense>
  );
}
