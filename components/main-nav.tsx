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
      { label: "Landlords & Agents", href: "/solutions/landlords" },
      { label: "Property Managers", href: "/solutions/managers" },
      { label: "Committees & HOAs", href: "/solutions/committees" },
      { label: "Developers & Estates", href: "/solutions/developers" },
      { label: "Banks & SACCOS", href: "/solutions/banks" },
    ],
  },
  {
    label: "Features",
    href: "/features",
    children: [
      { label: "Accounting & GL", href: "/features/accounting" },
      { label: "Rent Collection", href: "/features/collections" },
      { label: "Tenant Experience", href: "/features/tenant-experience" },
      { label: "Maintenance & Assets", href: "/features/maintenance" },
      { label: "KRA eTIMS", href: "/features/etims" },
    ],
  },
  { label: "Pricing", href: "/pricing" },
  { label: "Resources", href: "/resources" },
  { label: "About", href: "/about" },
];

export function MainNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:supports-[backdrop-filter]:bg-slate-950/80">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-[#344767]">
              Nyumba Zetu
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            {navItems.map((item) => (
              <div key={item.label} className="relative group">
                <Link
                  href={item.href}
                  className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-[#b98036] transition-colors"
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="absolute left-0 mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="bg-white dark:bg-slate-900 rounded-lg shadow-lg border border-slate-200 dark:border-slate-800 py-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-[#b98036]"
                        >
                          {child.label}
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
          <button
            type="button"
            className="lg:hidden p-2 text-slate-700 dark:text-slate-300"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileMenuOpen}
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
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
                <div className="ml-4 mt-2 space-y-2">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block text-sm text-slate-600 dark:text-slate-400 py-1"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {child.label}
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

