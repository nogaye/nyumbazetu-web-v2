/**
 * Dashboard: AuthProvider scoped here so marketing pages do not pay Supabase auth JS cost.
 */

import { AuthProvider } from "@/components/auth/auth-provider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthProvider>{children}</AuthProvider>;
}
