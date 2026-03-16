"use client";

/**
 * AdminLayoutWrapper
 *
 * Renders the admin layout (sidebar + main) for all /admin/* routes.
 * Unauthenticated users are redirected to /auth/sign-in by the proxy and AdminAuthGuard.
 */

interface AdminLayoutWrapperProps {
  children: React.ReactNode;
  withLayout: React.ReactNode;
}

export function AdminLayoutWrapper({ children, withLayout }: AdminLayoutWrapperProps) {
  return <>{withLayout}</>;
}

