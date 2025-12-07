"use client";

import { usePathname } from "next/navigation";

/**
 * AdminLayoutWrapper
 * 
 * Conditionally renders children based on pathname
 * Login page is rendered without the admin layout structure
 */

interface AdminLayoutWrapperProps {
  children: React.ReactNode;
  withLayout: React.ReactNode;
}

export function AdminLayoutWrapper({ children, withLayout }: AdminLayoutWrapperProps) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  // For login page, render children directly without admin layout
  if (isLoginPage) {
    return <>{children}</>;
  }

  // For other admin pages, render with admin layout
  return <>{withLayout}</>;
}

