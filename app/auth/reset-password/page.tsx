"use client";

/**
 * Reset-password page: set new password after following the email link.
 * Supabase redirects here with tokens; we verify session then show the form.
 */

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { AuthFormCard } from "@/components/auth/auth-form-card";
import { AuthErrorAlert } from "@/components/auth/auth-error-alert";
import { PasswordInput } from "@/components/auth/password-input";
import { PasswordStrengthHint } from "@/components/auth/password-strength-hint";
import { useCapsLock } from "@/components/auth/use-caps-lock";
import { getAuthBrowserClient } from "@/lib/supabase/auth-client";
import { updatePassword } from "@/lib/auth/supabase-auth-service";
import { isPasswordStrongEnough, MIN_PASSWORD_LENGTH } from "@/lib/auth/constants";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const [sessionError, setSessionError] = useState<string | null>(null);
  const { capsLockOn, onKeyDown } = useCapsLock();

  useEffect(() => {
    const supabase = getAuthBrowserClient();
    if (!supabase) {
      setSessionError("Authentication is not configured.");
      return;
    }
    supabase.auth.getSession().then(({ data: { session }, error: sessionErr }) => {
      if (sessionErr) {
        setSessionError("Invalid or expired reset link. Please request a new one.");
        return;
      }
      if (session) {
        setReady(true);
      } else {
        setSessionError("Invalid or expired reset link. Please request a new one.");
      }
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
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
        setError("Authentication is not configured.");
        setIsLoading(false);
        return;
      }
      const result = await updatePassword(supabase, password);
      if (result.success) {
        router.push("/auth/sign-in?reset=ok");
        router.refresh();
      } else {
        setError(result.error ?? "Failed to update password.");
      }
    } catch (_err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (sessionError) {
    return (
      <AuthFormCard
        icon={<KeyRound className="h-6 w-6" />}
        title="Link expired"
        description={sessionError}
      >
        <Button asChild className="w-full">
          <Link href="/auth/forgot-password">Request a new reset link</Link>
        </Button>
      </AuthFormCard>
    );
  }

  if (!ready) {
    return (
      <AuthFormCard
        icon={<KeyRound className="h-6 w-6" />}
        title="Checking reset link"
        description="Please wait while we verify your link."
      >
        <div className="flex justify-center py-4" aria-busy="true">
          <span className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      </AuthFormCard>
    );
  }

  return (
    <AuthFormCard
      icon={<KeyRound className="h-6 w-6" />}
      title="Set new password"
      description="Choose a strong password for your account."
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
          <Label htmlFor="reset-password">New password</Label>
          <PasswordInput
            id="reset-password"
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
          <Label htmlFor="reset-confirm">Confirm password</Label>
          <PasswordInput
            id="reset-confirm"
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
              Updating…
            </>
          ) : (
            "Update password"
          )}
        </Button>
      </form>
    </AuthFormCard>
  );
}
