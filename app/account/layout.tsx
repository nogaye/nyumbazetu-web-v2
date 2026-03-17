/**
 * Account area: wraps routes with AuthProvider so useAuth / AuthGuard work without
 * loading Supabase on the rest of the marketing site (better homepage performance).
 */

import { AuthProvider } from "@/components/auth/auth-provider";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthProvider>{children}</AuthProvider>;
}
