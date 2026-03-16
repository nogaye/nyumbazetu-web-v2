/**
 * Auth layout: sign-in, sign-up, forgot-password, reset-password.
 * Centered card layout without full nav/footer for focused auth flows.
 */

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in or create an account",
  robots: "noindex, nofollow",
};

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4">
      {children}
    </div>
  );
}
