"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { dropdownVariants, staggerContainer, staggerChild, tweenTransition } from "@/lib/motion";
import {
  Bars3Icon,
  BookOpenIcon,
  ChevronDownIcon,
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
  CubeIcon,
  GlobeAltIcon,
  SignalIcon,
  Squares2X2Icon,
  PuzzlePieceIcon,
  SquaresPlusIcon,
} from "@heroicons/react/24/outline";
import {
  Sheet,
  SheetHeader,
  SheetTitle,
  SheetClose,
  SheetContent,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import { EXTERNAL_RESOURCES } from "@/lib/external-resources";
import { cn } from "@/lib/utils";

const navItems = [
  // { label: "Home", href: "/modern" },

  // {
  //   label: "Product",
  //   href: "/product",
  //   children: [
  //     { label: "Overview", href: "/product", icon: Squares2X2Icon },
  //     { label: "Features", href: "/features", icon: BoltIcon },
  //     {
  //       label: "Integrations",
  //       href: "/integrations",
  //       icon: PuzzlePieceIcon,
  //     },
  //     { label: "Compare", href: "/compare", icon: SquaresPlusIcon },
  //   ],
  // },
  {
    label: "Solutions",
    href: "/solutions",
    children: [
      {
        label: "Landlords & Agents",
        href: "/solutions/landlords",
        description: "For individual property owners and real estate agents",
        icon: HomeIcon,
      },
      {
        label: "Property Managers",
        href: "/solutions/managers",
        description: "For professional property management firms",
        icon: BuildingOfficeIcon,
      },
      {
        label: "Committees & HOAs",
        href: "/solutions/committees",
        description:
          "For housing estate committees and homeowners associations",
        icon: UsersIcon,
      },
      {
        label: "Developers & Estate Owners",
        href: "/solutions/developers",
        description: "For real estate developers and large estate owners",
        icon: BuildingOffice2Icon,
      },
      {
        label: "Banks & SACCOS",
        href: "/solutions/banks",
        description: "For financial institutions managing mortgage portfolios",
        icon: BanknotesIcon,
      },
      {
        label: "Diaspora",
        href: "/solutions/diaspora",
        description: "For Kenyans abroad managing property back home",
        icon: GlobeAltIcon,
      },
    ],
  },

  {
    label: "Features",
    href: "/features",
    children: [
      {
        label: "Automated Invoicing & Payment Reconciliation",
        href: "/features/collections",
        description: "Invoicing and payment reconciliation for any charge type",
        icon: CurrencyDollarIcon,
      },
      {
        label: "Accounting & General Ledger",
        href: "/features/accounting",
        description: "Full double-entry accounting system",
        icon: CalculatorIcon,
      },
      {
        label: "Tenant & Owner Experience",
        href: "/features/tenant-experience",
        description: "Portals, mobile apps, and WhatsApp chatbot",
        icon: UserGroupIcon,
      },
      {
        label: "Maintenance and Service Requests",
        href: "/features/maintenance",
        description: "Maintenance and service requests, work orders",
        icon: WrenchScrewdriverIcon,
      },
      {
        label: "Assets Management",
        href: "/features/assets-management",
        description: "Asset register, tracking, and depreciation",
        icon: CubeIcon,
      },
      {
        label: "Expense & Vendor Management",
        href: "/features/expense-vendor-management",
        description: "Expenses, vendors, contracts, and payments",
        icon: BanknotesIcon,
      },
      {
        label: "Tasks & Projects",
        href: "/features/tasks",
        description: "Project management for developments",
        icon: ClipboardDocumentListIcon,
      },
      {
        label: "KRA eTIMS & Compliance",
        href: "/features/etims",
        description: "eTIMS-ready invoicing and tax compliance",
        icon: ShieldCheckIcon,
      },
      {
        label: "TPS & Rent-to-Own",
        href: "/features/tps",
        description: "Tenant Purchase Scheme tracking",
        icon: HomeIcon,
      },
      {
        label: "Communication Hub",
        href: "/features/communications",
        description: "Email, SMS, WhatsApp, and AI-powered chatbot",
        icon: ChatBubbleLeftRightIcon,
      },
      {
        label: "CRM",
        href: "/features/crm",
        description: "CRM for tenants and prospects.",
        icon: UserCircleIcon,
      },
      {
        label: "White Labeling",
        href: "/features/white-labeling",
        description: "Fully customizable white-label solution",
        icon: PaintBrushIcon,
      },
      {
        label: "Calendar & Event Scheduling",
        href: "/features/calendar-scheduling",
        description: "Automated scheduling for invoices and reminders",
        icon: CalendarDaysIcon,
      },
      {
        label: "Webhooks & API Events",
        href: "/features/webhooks",
        description: "Real-time event notifications and system integrations",
        icon: BoltIcon,
      },
      {
        label: "Property Listings",
        href: "/features/listings",
        description: "Browse and search verified properties across Kenya",
        icon: BuildingOffice2Icon,
      },
    ],
  },
  { label: "Property Listings", href: "/listings" },
  { label: "Pricing", href: "/pricing" },
];

export function MainNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  /** Tracks which mobile menu sections (e.g. Solutions, Features) are expanded. */
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  /** Tracks which desktop dropdown is hover-open for AnimatePresence exit animation. */
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleSection = (label: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  };

  return (
    <nav
      className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:supports-[backdrop-filter]:bg-slate-950/80"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2"
            aria-label="Nyumba Zetu Home"
          >
            <Image
              src="/logo.svg"
              alt=""
              width={36}
              height={36}
              className="h-9 w-9 flex-shrink-0"
            />
            <span className="text-xl font-bold text-secondary dark:text-slate-50">
              Nyumba Zetu
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative group"
                onMouseEnter={() => item.children && setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.href}
                  className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-primary transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-md px-2 py-1 inline-block"
                  aria-haspopup={item.children ? "true" : undefined}
                  aria-expanded={openDropdown === item.label}
                >
                  <motion.span
                    className="inline-block"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {item.label}
                  </motion.span>
                </Link>
                {item.children && (
                  <AnimatePresence>
                    {openDropdown === item.label && (
                      <motion.div
                        className="absolute left-0 mt-2 w-80 z-50"
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={dropdownVariants}
                        transition={tweenTransition}
                      >
                        <div className="bg-white dark:bg-slate-900 rounded-lg shadow-lg border border-slate-200 dark:border-slate-800 py-2">
                          {item.children.map((child) => {
                            const Icon =
                              "icon" in child && child.icon ? child.icon : null;
                            return (
                              <motion.div
                                key={child.href}
                                whileHover={{ x: 4 }}
                                transition={tweenTransition}
                              >
                                <Link
                                  href={child.href}
                                  className="block px-4 py-3 text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors duration-200 group/item"
                                >
                                  <div className="flex items-start gap-3">
                                    {Icon && (
                                      <Icon className="h-5 w-5 text-slate-400 dark:text-slate-500 group-hover/item:text-primary transition-colors duration-200 flex-shrink-0 mt-0.5" />
                                    )}
                                    <div className="flex-1 min-w-0">
                                      <div className="font-medium text-slate-900 dark:text-slate-50 group-hover/item:text-primary transition-colors duration-200">
                                        {child.label}
                                      </div>
                                    </div>
                                  </div>
                                </Link>
                              </motion.div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </div>

          <div className="hidden lg:flex lg:items-center lg:gap-2 lg:space-x-0">
            <ThemeToggle />
            <a
              href={EXTERNAL_RESOURCES.status.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              aria-label={`${EXTERNAL_RESOURCES.status.label} – ${EXTERNAL_RESOURCES.status.description}`}
            >
              <SignalIcon className="h-4 w-4 flex-shrink-0" aria-hidden />
              <span className="hidden sm:inline">Status</span>
            </a>
            <a
              href={EXTERNAL_RESOURCES.docs.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              aria-label={`${EXTERNAL_RESOURCES.docs.label} – ${EXTERNAL_RESOURCES.docs.description}`}
            >
              <BookOpenIcon className="h-4 w-4 flex-shrink-0" aria-hidden />
              <span className="hidden sm:inline">Docs</span>
            </a>
            <Button variant="ghost" asChild>
              <Link
                href="https://app.nyumbazetu.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Login
              </Link>
            </Button>
            <Button asChild>
              <Link href="/request-demo" className="flex items-center gap-2">
                Request a demo
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

      {/* Mobile Navigation: content in SheetContent for solid panel and sharp text on small screens */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent className="flex flex-col w-full max-w-sm sm:max-w-sm">
          <SheetClose onClick={() => setMobileMenuOpen(false)} />
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <motion.div
            className="flex flex-col space-y-1 p-6 flex-1 overflow-y-auto"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
          {navItems.map((item) => (
            <motion.div key={item.label} variants={staggerChild}>
              {item.children ? (
                <>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between text-left text-base font-medium text-slate-900 dark:text-slate-50 py-3 px-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    onClick={() => toggleSection(item.label)}
                    aria-expanded={expandedSections.has(item.label)}
                    aria-controls={`mobile-nav-${item.label.replace(/\s+/g, "-").toLowerCase()}`}
                  >
                    {item.label}
                    <ChevronDownIcon
                      className={cn(
                        "h-5 w-5 text-slate-500 dark:text-slate-400 flex-shrink-0 transition-transform duration-200",
                        expandedSections.has(item.label) && "rotate-180"
                      )}
                      aria-hidden
                    />
                  </button>
                  <div
                    id={`mobile-nav-${item.label.replace(/\s+/g, "-").toLowerCase()}`}
                    className={cn(
                      "overflow-hidden transition-[max-height] duration-200 ease-out",
                      expandedSections.has(item.label) ? "max-h-[2000px]" : "max-h-0"
                    )}
                    role="region"
                    aria-label={`${item.label} submenu`}
                  >
                    <div className="ml-2 pl-2 border-l border-slate-200 dark:border-slate-700 space-y-1 pb-2">
                      {item.children.map((child) => {
                        const Icon =
                          "icon" in child && child.icon ? child.icon : null;
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 px-2 -ml-2"
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
                                {/* Descriptions commented out for cleaner menu
                                {"description" in child && child.description && (
                                  <div className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                                    {child.description}
                                  </div>
                                )}
                                */}
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </>
              ) : (
                <Link
                  href={item.href}
                  className="block text-base font-medium text-slate-900 dark:text-slate-50 py-3 px-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              )}
            </motion.div>
          ))}
          </motion.div>
          <div className="pt-4 space-y-2 border-t border-slate-200 dark:border-slate-800">
            <div className="flex justify-center pb-2">
              <ThemeToggle />
            </div>
            <a
              href={EXTERNAL_RESOURCES.status.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-start gap-3 rounded-lg px-4 py-3 text-left hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              onClick={() => setMobileMenuOpen(false)}
              aria-label={`${EXTERNAL_RESOURCES.status.label} – ${EXTERNAL_RESOURCES.status.description}`}
            >
              <SignalIcon className="h-5 w-5 text-slate-500 dark:text-slate-400 flex-shrink-0 mt-0.5" aria-hidden />
              <span className="flex flex-col">
                <span className="text-sm font-medium text-slate-900 dark:text-slate-50">{EXTERNAL_RESOURCES.status.label}</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">{EXTERNAL_RESOURCES.status.description}</span>
              </span>
            </a>
            <a
              href={EXTERNAL_RESOURCES.docs.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-start gap-3 rounded-lg px-4 py-3 text-left hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              onClick={() => setMobileMenuOpen(false)}
              aria-label={`${EXTERNAL_RESOURCES.docs.label} – ${EXTERNAL_RESOURCES.docs.description}`}
            >
              <BookOpenIcon className="h-5 w-5 text-slate-500 dark:text-slate-400 flex-shrink-0 mt-0.5" aria-hidden />
              <span className="flex flex-col">
                <span className="text-sm font-medium text-slate-900 dark:text-slate-50">{EXTERNAL_RESOURCES.docs.label}</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">{EXTERNAL_RESOURCES.docs.description}</span>
              </span>
            </a>
            <Button variant="outline" className="w-full" asChild>
              <Link
                href="https://app.nyumbazetu.com/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
            </Button>
            <Button className="w-full" asChild>
              <Link href="/request-demo" onClick={() => setMobileMenuOpen(false)}>
                Request a demo
              </Link>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
}
