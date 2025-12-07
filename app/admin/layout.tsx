"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Home,
  Bell,
  Settings,
  Users,
  Search,
  HelpCircle,
  MoreVertical,
  FileText,
  BarChart3,
  FolderOpen,
  BookOpen,
} from "lucide-react";
import { AdminAuthGuard } from "@/components/admin/AdminAuthGuard";
import { AdminLayoutWrapper } from "@/components/admin/AdminLayoutWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

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
    <div className="flex min-h-screen bg-white dark:bg-slate-950">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col">
        {/* Logo/Company Name */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">
            Nyumba Zetu
          </h2>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-6 overflow-y-auto">
          {/* Home Section */}
          <div>
            <p className="px-3 mb-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Home
            </p>
            <div className="space-y-1">
              <NavLink href="/admin" icon={<LayoutDashboard className="h-5 w-5" />}>
                Dashboard
              </NavLink>
              <NavLink href="/admin/properties" icon={<Home className="h-5 w-5" />}>
                Properties
              </NavLink>
              <NavLink href="/admin/inquiries" icon={<Bell className="h-5 w-5" />}>
                Inquiries
              </NavLink>
              <NavLink href="/admin/analytics" icon={<BarChart3 className="h-5 w-5" />}>
                Analytics
              </NavLink>
              <NavLink href="/admin/team" icon={<Users className="h-5 w-5" />}>
                Team
              </NavLink>
            </div>
          </div>

          {/* Documents Section */}
          <div>
            <p className="px-3 mb-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Documents
            </p>
            <div className="space-y-1">
              <NavLink href="/admin/documents" icon={<FolderOpen className="h-5 w-5" />}>
                Data Library
              </NavLink>
              <NavLink href="/admin/reports" icon={<FileText className="h-5 w-5" />}>
                Reports
              </NavLink>
              <NavLink href="/admin/assistant" icon={<BookOpen className="h-5 w-5" />}>
                Word Assistant
              </NavLink>
              <NavLink href="/admin/more" icon={<MoreVertical className="h-5 w-5" />}>
                More
              </NavLink>
            </div>
          </div>
        </nav>

        {/* Bottom Section - Search, Settings, Help, User Profile */}
        <div className="border-t border-slate-200 dark:border-slate-800 p-4 space-y-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              type="search"
              placeholder="Search"
              className="pl-9 h-9 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
            />
          </div>

          {/* Settings and Help */}
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="flex-1 justify-start h-9 text-slate-600 dark:text-slate-400"
              asChild
            >
              <Link href="/admin/settings">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex-1 justify-start h-9 text-slate-600 dark:text-slate-400"
              asChild
            >
              <Link href="/admin/help">
                <HelpCircle className="mr-2 h-4 w-4" />
                Get Help
              </Link>
            </Button>
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            <div className="h-8 w-8 rounded-full bg-slate-300 dark:bg-slate-700 flex items-center justify-center text-xs font-medium text-slate-700 dark:text-slate-300">
              A
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 dark:text-slate-50 truncate">
                Admin
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                admin@nyumbazetu.com
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 flex-shrink-0"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>

          {/* Logout */}
          <form action="/api/auth/logout" method="POST" className="pt-2 border-t border-slate-200 dark:border-slate-800">
            <Button
              type="submit"
              variant="ghost"
              className="w-full justify-start h-9 text-slate-600 dark:text-slate-400"
            >
              Logout
            </Button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-slate-50 dark:bg-slate-950">
        <div className="p-8">
          <AdminAuthGuard>{children}</AdminAuthGuard>
        </div>
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
  const pathname = usePathname();
  const isActive = pathname === href || (href !== "/admin" && pathname.startsWith(href));

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
        isActive
          ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-50"
          : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
      )}
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
}


