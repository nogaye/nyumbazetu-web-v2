"use client";

/**
 * Listings portal layout: sidebar nav for My Listings, Leads, Saved, Settings, etc.
 * Wraps all /listings/portal/* routes with a consistent dashboard shell.
 * Protected by AuthGuard — only authenticated users can access; others are redirected to sign-in.
 */

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  List,
  MessageSquare,
  Heart,
  Settings,
  PlusCircle,
  FileText,
  BarChart3,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AuthGuard } from "@/components/auth/auth-guard";

const PORTAL_NAV = [
  { label: "Dashboard", href: "/listings/portal", icon: LayoutDashboard },
  { label: "My Listings", href: "/listings/portal/my-listings", icon: List },
  { label: "New Listing", href: "/listings/portal/new", icon: PlusCircle },
  { label: "Leads / Inquiries", href: "/listings/portal/leads", icon: MessageSquare },
  { label: "Saved", href: "/listings/portal/favorites", icon: Heart },
  { label: "Performance", href: "/listings/portal/performance", icon: BarChart3 },
  { label: "Billing", href: "/listings/portal/billing", icon: FileText },
  { label: "Settings", href: "/listings/portal/settings", icon: Settings },
];

export default function ListingsPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-slate-100/70 dark:bg-slate-900/50">
        <div className="mx-auto flex max-w-[1600px] flex-col lg:flex-row">
          <aside
            className="w-full border-b border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-950 lg:w-56 lg:border-b-0 lg:border-r lg:py-6"
            aria-label="Portal navigation"
          >
            <nav className="flex flex-wrap gap-1 p-4 lg:flex-col lg:gap-0 lg:p-0 lg:px-3">
              {PORTAL_NAV.map((item) => (
                <PortalNavLink key={item.href} href={item.href} icon={item.icon}>
                  {item.label}
                </PortalNavLink>
              ))}
            </nav>
          </aside>
          <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8" id="main-content">
            {children}
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}

function PortalNavLink({
  href,
  icon: Icon,
  children,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isActive = pathname === href || (href !== "/listings/portal" && pathname?.startsWith(href));
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
        isActive
          ? "bg-[#344767]/10 text-[#344767] dark:bg-[#344767]/20 dark:text-[#5a6b8a]"
          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
      )}
    >
      <Icon className="h-4 w-4 shrink-0" aria-hidden />
      {children}
    </Link>
  );
}
