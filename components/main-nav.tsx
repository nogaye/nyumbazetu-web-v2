"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  Bars3Icon, 
  XMarkIcon, 
  CalendarDaysIcon,
  CurrencyDollarIcon,
  CalculatorIcon,
  UserGroupIcon,
  WrenchScrewdriverIcon,
  ClipboardDocumentListIcon,
  ShieldCheckIcon,
  HomeIcon,
  ChatBubbleLeftRightIcon,
  UserCircleIcon,
  PaintBrushIcon,
  BoltIcon,
  BuildingOfficeIcon,
  UsersIcon,
  BuildingOffice2Icon,
  BanknotesIcon,
  GlobeAltIcon,
  Squares2X2Icon,
  PuzzlePieceIcon,
  SquaresPlusIcon
} from "@heroicons/react/24/outline";
import { Sheet, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const navItems = [
  {
    label: "Product",
    href: "/product",
    children: [
      { label: "Overview", href: "/product", icon: Squares2X2Icon },
      { label: "Features", href: "/features", icon: BoltIcon },
      { label: "Integrations", href: "/product#integrations", icon: PuzzlePieceIcon },
      { label: "Compare Solutions", href: "/compare", icon: SquaresPlusIcon },
    ],
  },
  {
    label: "Solutions",
    href: "/solutions",
    children: [
      { label: "Landlords & Agents", href: "/solutions/landlords", description: "For individual property owners and real estate agents", icon: HomeIcon },
      { label: "Property Managers & Management Companies", href: "/solutions/managers", description: "For professional property management firms", icon: BuildingOfficeIcon },
      { label: "Committees & HOAs", href: "/solutions/committees", description: "For housing estate committees and homeowners associations", icon: UsersIcon },
      { label: "Developers & Estate Owners", href: "/solutions/developers", description: "For real estate developers and large estate owners", icon: BuildingOffice2Icon },
      { label: "Banks & SACCOS / Mortgage Teams", href: "/solutions/banks", description: "For financial institutions managing mortgage portfolios", icon: BanknotesIcon },
      { label: "Diaspora", href: "/solutions/diaspora", description: "For Kenyans abroad managing property back home", icon: GlobeAltIcon },
    ],
  },
  {
    label: "Features",
    href: "/features",
    children: [
      { label: "Rent & Service Charge Collections", href: "/features/collections", description: "Automated invoicing and payment tracking", icon: CurrencyDollarIcon },
      { label: "Accounting & General Ledger", href: "/features/accounting", description: "Full double-entry accounting system", icon: CalculatorIcon },
      { label: "Tenant & Owner Experience", href: "/features/tenant-experience", description: "Portals, mobile apps, and WhatsApp chatbot", icon: UserGroupIcon },
      { label: "Maintenance & Assets", href: "/features/maintenance", description: "Maintenance requests and asset tracking", icon: WrenchScrewdriverIcon },
      { label: "Tasks & Projects", href: "/features/tasks", description: "Project management for developments", icon: ClipboardDocumentListIcon },
      { label: "KRA eTIMS & Compliance", href: "/features/etims", description: "eTIMS-ready invoicing and tax compliance", icon: ShieldCheckIcon },
      { label: "TPS & Rent-to-Own", href: "/features/tps", description: "Tenant Purchase Scheme tracking", icon: HomeIcon },
      { label: "Communication Hub", href: "/features/communications", description: "Email, SMS, and in-app messaging", icon: ChatBubbleLeftRightIcon },
      { label: "CRM", href: "/features/crm", description: "Customer relationship management for tenants and owners", icon: UserCircleIcon },
      { label: "White Labeling", href: "/features/white-labeling", description: "Fully customizable white-label solution", icon: PaintBrushIcon },
      { label: "Calendar & Event Scheduling", href: "/features/calendar-scheduling", description: "Automated scheduling for invoices, reminders, and penalties", icon: CalendarDaysIcon },
      { label: "Webhooks & API Events", href: "/features/webhooks", description: "Real-time event notifications and system integrations", icon: BoltIcon },
    ],
  },
  { label: "Listings", href: "/listings" },
  { label: "Pricing", href: "/pricing" },
];

export function MainNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav 
      className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:supports-[backdrop-filter]:bg-slate-950/80"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2" aria-label="Nyumba Zetu Home">
            <div className="text-2xl font-bold text-secondary dark:text-slate-50">
              Nyumba Zetu
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            {navItems.map((item) => (
              <div key={item.label} className="relative group">
                <Link
                  href={item.href}
                  className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-primary transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-md px-2 py-1"
                  aria-haspopup={item.children ? "true" : undefined}
                  aria-expanded={item.children ? "false" : undefined}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="absolute left-0 mt-2 w-80 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-out z-50 transform group-hover:translate-y-0 translate-y-[-10px]">
                    <div className="bg-white dark:bg-slate-900 rounded-lg shadow-lg border border-slate-200 dark:border-slate-800 py-2">
                      {item.children.map((child) => {
                        const Icon = "icon" in child && child.icon ? child.icon : null;
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-4 py-3 text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-200 group/item transform hover:translate-x-1"
                          >
                            <div className="flex items-start gap-3">
                              {Icon && (
                                <Icon className="h-5 w-5 text-slate-400 dark:text-slate-500 group-hover/item:text-primary transition-colors duration-200 flex-shrink-0 mt-0.5" />
                              )}
                              <div className="flex-1 min-w-0">
                                <div className="font-medium text-slate-900 dark:text-slate-50 group-hover/item:text-primary transition-colors duration-200">
                                  {child.label}
                                </div>
                                {"description" in child && child.description && (
                                  <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                                    {child.description}
                                  </div>
                                )}
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="hidden lg:flex lg:items-center lg:space-x-4">
            <ThemeToggle />
            <Button variant="ghost" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/contact" className="flex items-center gap-2">
                Request a Demo
                <CalendarDaysIcon className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileMenuOpen}
          >
            <Bars3Icon className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetClose onClick={() => setMobileMenuOpen(false)} />
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col space-y-4 p-6">
          {navItems.map((item) => (
            <div key={item.label}>
              <Link
                href={item.href}
                    className="block text-base font-medium text-slate-900 dark:text-slate-50 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
              {item.children && (
                <div className="ml-4 mt-2 space-y-3">
                  {item.children.map((child) => {
                    const Icon = "icon" in child && child.icon ? child.icon : null;
                    return (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block py-2"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <div className="flex items-start gap-3">
                          {Icon && (
                            <Icon className="h-5 w-5 text-slate-400 dark:text-slate-500 flex-shrink-0 mt-0.5" />
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-slate-900 dark:text-slate-50">
                              {child.label}
                            </div>
                            {"description" in child && child.description && (
                              <div className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                                {child.description}
                              </div>
                            )}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
          <div className="pt-4 space-y-2 border-t border-slate-200 dark:border-slate-800">
            <div className="flex justify-center pb-2">
              <ThemeToggle />
            </div>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                Login
              </Link>
            </Button>
            <Button className="w-full" asChild>
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                Request a Demo
              </Link>
            </Button>
          </div>
        </div>
      </Sheet>
    </nav>
  );
}

