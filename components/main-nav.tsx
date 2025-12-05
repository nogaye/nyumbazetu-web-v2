"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Sheet, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const navItems = [
  {
    label: "Product",
    href: "/product",
    children: [
      { label: "Overview", href: "/product" },
    ],
  },
  {
    label: "Solutions",
    href: "/solutions",
    children: [
      { label: "Landlords & Agents", href: "/solutions/landlords", description: "For individual property owners and real estate agents" },
      { label: "Property Managers & Management Companies", href: "/solutions/managers", description: "For professional property management firms" },
      { label: "Committees & HOAs", href: "/solutions/committees", description: "For housing estate committees and homeowners associations" },
      { label: "Developers & Estate Owners", href: "/solutions/developers", description: "For real estate developers and large estate owners" },
      { label: "Banks & SACCOS / Mortgage Teams", href: "/solutions/banks", description: "For financial institutions managing mortgage portfolios" },
      { label: "Diaspora", href: "/solutions/diaspora", description: "For Kenyans abroad managing property back home" },
    ],
  },
  {
    label: "Features",
    href: "/features",
    children: [
      { label: "Rent & Service Charge Collections", href: "/features/collections", description: "Automated invoicing and payment tracking" },
      { label: "Accounting & General Ledger", href: "/features/accounting", description: "Full double-entry accounting system" },
      { label: "Tenant & Owner Experience", href: "/features/tenant-experience", description: "Portals, mobile apps, and WhatsApp chatbot" },
      { label: "Maintenance & Assets", href: "/features/maintenance", description: "Maintenance requests and asset tracking" },
      { label: "Tasks & Projects", href: "/features/tasks", description: "Project management for developments" },
      { label: "KRA eTIMS & Compliance", href: "/features/etims", description: "eTIMS-ready invoicing and tax compliance" },
      { label: "TPS & Rent-to-Own", href: "/features/tps", description: "Tenant Purchase Scheme tracking" },
      { label: "Communication Hub", href: "/features/communications", description: "Email, SMS, and in-app messaging" },
    ],
  },
  { label: "Pricing", href: "/pricing" },
  { label: "Resources", href: "/resources" },
  { label: "About", href: "/about" },
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
            <div className="text-2xl font-bold text-[#344767] dark:text-slate-50">
              Nyumba Zetu
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            {navItems.map((item) => (
              <div key={item.label} className="relative group">
                <Link
                  href={item.href}
                  className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-[#b98036] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b98036] focus-visible:ring-offset-2 rounded-md px-2 py-1"
                  aria-haspopup={item.children ? "true" : undefined}
                  aria-expanded={item.children ? "false" : undefined}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="absolute left-0 mt-2 w-80 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-out z-50 transform group-hover:translate-y-0 translate-y-[-10px]">
                    <div className="bg-white dark:bg-slate-900 rounded-lg shadow-lg border border-slate-200 dark:border-slate-800 py-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-3 text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-200 group/item transform hover:translate-x-1"
                        >
                          <div className="font-medium text-slate-900 dark:text-slate-50 group-hover/item:text-[#b98036] transition-colors duration-200">
                            {child.label}
                          </div>
                          {"description" in child && child.description && (
                            <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                              {child.description}
                            </div>
                          )}
                        </Link>
                      ))}
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
            <Button size="lg" asChild>
              <Link href="/contact">Request a Demo</Link>
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
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block py-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <div className="text-sm font-medium text-slate-900 dark:text-slate-50">
                        {child.label}
                      </div>
                      {"description" in child && child.description && (
                        <div className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                          {child.description}
                        </div>
                      )}
                    </Link>
                  ))}
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

