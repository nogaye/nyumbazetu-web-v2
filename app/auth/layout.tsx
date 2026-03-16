/**
 * Auth layout: split-screen on desktop (branding left, form right), centered card on mobile.
 * No main nav/footer; full-viewport focused experience. Uses AuthLayoutShell for consistent structure.
 */

import type { Metadata } from "next";
import { AuthLayoutShell } from "@/components/auth/auth-layout-shell";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in or create an account to access your dashboard.",
  robots: "noindex, nofollow",
};

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <AuthLayoutShell hideSidePanel>{children}</AuthLayoutShell>;
}
