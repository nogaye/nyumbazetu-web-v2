import Link from "next/link";
import { Home, Bell, Settings, Users } from "lucide-react";
import { AdminAuthGuard } from "@/components/admin/AdminAuthGuard";
import { AdminLayoutWrapper } from "@/components/admin/AdminLayoutWrapper";

/**
 * Admin Layout
 * 
 * Protected by middleware and AdminAuthGuard component
 * Login page is excluded from sidebar and auth guard via AdminLayoutWrapper
 */

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const layoutContent = (
    <div className="flex min-h-screen bg-slate-100 dark:bg-slate-950">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-6 shadow-md dark:bg-slate-900">
        <h2 className="mb-8 text-2xl font-bold text-primary">Admin</h2>
        <nav className="space-y-4">
          <NavLink href="/admin/properties" icon={<Home className="h-5 w-5" />}>
            Properties
          </NavLink>
          <NavLink href="/admin/inquiries" icon={<Bell className="h-5 w-5" />}>
            Inquiries
          </NavLink>
          <NavLink href="/admin/users" icon={<Users className="h-5 w-5" />}>
            Users (TODO)
          </NavLink>
          <NavLink href="/admin/settings" icon={<Settings className="h-5 w-5" />}>
            Settings (TODO)
          </NavLink>
        </nav>
        <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800">
          <form action="/api/auth/logout" method="POST">
            <button
              type="submit"
              className="w-full text-left flex items-center gap-3 rounded-md px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Logout
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <AdminAuthGuard>{children}</AdminAuthGuard>
      </main>
    </div>
  );

  return (
    <AdminLayoutWrapper withLayout={layoutContent}>
      {children}
    </AdminLayoutWrapper>
  );
}

interface NavLinkProps {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

function NavLink({ href, icon, children }: NavLinkProps) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
}


