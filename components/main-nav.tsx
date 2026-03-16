"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { dropdownVariants, staggerContainer, staggerChild, tweenTransition } from "@/lib/motion";
import {
  Bars3Icon,
  ChevronDownIcon,
  CalendarDaysIcon,
  HomeIcon,
  BuildingOfficeIcon,
  UsersIcon,
  BuildingOffice2Icon,
  BanknotesIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";
import {
  Sheet,
  SheetHeader,
  SheetTitle,
  SheetClose,
  SheetContent,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import { AuthNavLinks } from "@/components/auth/auth-nav-links";
import { cn } from "@/lib/utils";
import { getFeaturesForNavGrouped } from "@/lib/features";
import type { FeatureNavGroup } from "@/lib/features/types";

/** Single nav link for dropdown (e.g. Solutions). */
interface NavChild {
  label: string;
  href: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

/** Nav item: either flat children (Solutions) or grouped children (Features). */
interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
  childGroups?: FeatureNavGroup[];
}

/** Features dropdown: grouped by category for multi-column layout. Solutions and other nav items stay static. */
const featuresNavGroups = getFeaturesForNavGrouped();

const navItems: NavItem[] = [
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
    childGroups: featuresNavGroups,
  },
  { label: "Property Listings", href: "/listings" },
  { label: "Pricing", href: "/pricing" },
];

/** Initial desktop feature groups expanded state: all collapsed so user expands as needed. */
const initialFeatureGroupsExpanded = new Set<string>();

export function MainNav() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  /** When true, hero is in view — nav uses transparent/dark style to blend with hero. */
  const [isOverHero, setIsOverHero] = useState(false);
  /** Tracks which mobile menu sections (e.g. Solutions, Features) are expanded. */
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  /** Tracks which desktop dropdown is hover-open for AnimatePresence exit animation. */
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  /** Tracks which feature groups are expanded in the desktop Features dropdown (collapsible sections). */
  const [expandedFeatureGroups, setExpandedFeatureGroups] = useState<Set<string>>(
    initialFeatureGroupsExpanded
  );

  useEffect(() => {
    if (pathname !== "/") {
      setIsOverHero(false);
      return;
    }
    const onScroll = () => setIsOverHero(window.scrollY < 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  const toggleSection = (label: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  };

  /** Toggles a single feature group in the desktop Features dropdown. */
  const toggleFeatureGroup = (groupId: string) => {
    setExpandedFeatureGroups((prev) => {
      const next = new Set(prev);
      if (next.has(groupId)) next.delete(groupId);
      else next.add(groupId);
      return next;
    });
  };

  const navOverHero = pathname === "/" && isOverHero;

  return (
    <nav
      className={cn(
        "sticky top-0 z-50 w-full border-b backdrop-blur-md transition-colors duration-300",
        navOverHero
          ? "border-white/15 bg-slate-950/80 text-white"
          : "border-slate-200/90 dark:border-slate-800/90 bg-white/98 dark:bg-slate-950/98 supports-[backdrop-filter]:bg-white/90 dark:supports-[backdrop-filter]:bg-slate-950/90"
      )}
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
            <span
              className={cn(
                "text-xl font-bold transition-colors",
                navOverHero ? "text-white" : "text-secondary dark:text-slate-50"
              )}
            >
              Nyumba Zetu
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative group"
                onMouseEnter={() => (item.children || item.childGroups) && setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={cn(
                  "text-sm font-medium hover:text-primary transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-md px-2 py-1 inline-block",
                  navOverHero ? "text-white hover:text-primary" : "text-slate-700 dark:text-slate-300"
                )}
                  aria-haspopup={item.children || item.childGroups ? "true" : undefined}
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
                {(item.children || item.childGroups) && (
                  <AnimatePresence>
                    {openDropdown === item.label && (
                      <motion.div
                        className={cn(
                          "absolute left-0 mt-1.5 z-50",
                          item.childGroups ? "w-80 min-w-[320px]" : "w-80"
                        )}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={dropdownVariants}
                        transition={tweenTransition}
                      >
                        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-dropdown border border-slate-200/90 dark:border-slate-700/90 overflow-hidden">
                          {item.childGroups ? (
                            <nav
                              className="py-2"
                              aria-label="Features by category"
                            >
                              {item.childGroups.map((grp) => {
                                const isExpanded = expandedFeatureGroups.has(grp.groupId);
                                return (
                                  <div
                                    key={grp.groupId}
                                    className="border-b border-slate-100 dark:border-slate-800 last:border-b-0"
                                  >
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        toggleFeatureGroup(grp.groupId);
                                      }}
                                      className="flex w-full items-center justify-between gap-3 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                                      aria-expanded={isExpanded}
                                      aria-controls={`nav-feature-group-${grp.groupId}`}
                                    >
                                      <span>{grp.groupLabel}</span>
                                      <ChevronDownIcon
                                        className={cn(
                                          "h-4 w-4 flex-shrink-0 transition-transform duration-200",
                                          isExpanded ? "rotate-0" : "-rotate-90"
                                        )}
                                        aria-hidden
                                      />
                                    </button>
                                    <div
                                      id={`nav-feature-group-${grp.groupId}`}
                                      role="region"
                                      aria-label={`${grp.groupLabel} features`}
                                      className={cn(
                                        "overflow-hidden transition-[max-height] duration-200 ease-out",
                                        isExpanded ? "max-h-[500px]" : "max-h-0"
                                      )}
                                    >
                                      <ul className="space-y-1 pb-3 pt-1">
                                        {grp.items.map((child) => {
                                          const Icon = child.icon ?? null;
                                          return (
                                            <li key={child.href}>
                                              <Link
                                                href={child.href}
                                                className="flex items-start gap-3 py-2.5 px-5 pl-6 text-sm text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group/item"
                                              >
                                                {Icon && (
                                                  <Icon className="h-4 w-4 text-slate-400 dark:text-slate-500 group-hover/item:text-primary transition-colors flex-shrink-0 mt-0.5" />
                                                )}
                                                <span className="font-medium break-words min-w-0">
                                                  {child.label}
                                                </span>
                                              </Link>
                                            </li>
                                          );
                                        })}
                                      </ul>
                                    </div>
                                  </div>
                                );
                              })}
                            </nav>
                          ) : (
                            item.children?.map((child) => {
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
                            })
                          )}
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
            <AuthNavLinks overHero={navOverHero} />
            <Button
              variant="ghost"
              asChild
              className={cn(navOverHero && "text-white hover:text-primary hover:bg-white/10")}
            >
              <Link
                href="https://app.nyumbazetu.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Login
              </Link>
            </Button>
            <Button
              asChild
              variant={navOverHero ? "outline" : "default"}
              className={cn(
                navOverHero &&
                  "border-2 border-white bg-primary text-white hover:bg-primary-600 hover:border-primary-500 hover:text-white"
              )}
            >
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
            className={cn("lg:hidden", navOverHero && "text-white hover:bg-white/10")}
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
              {item.children || item.childGroups ? (
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
                    <div className="ml-2 pl-3 border-l border-slate-200 dark:border-slate-700 space-y-4 pb-2">
                      {item.childGroups
                        ? item.childGroups.map((grp) => (
                            <div key={grp.groupId}>
                              <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400 dark:text-slate-500 pt-0.5">
                                {grp.groupLabel}
                              </div>
                              <ul className="space-y-0.5 mt-1.5">
                                {grp.items.map((child) => {
                                  const Icon = child.icon ?? null;
                                  return (
                                    <li key={child.href}>
                                      <Link
                                        href={child.href}
                                        className="flex items-center gap-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-primary px-2 -ml-2 transition-colors duration-150"
                                        onClick={() => setMobileMenuOpen(false)}
                                      >
                                        {Icon && (
                                          <Icon className="h-4 w-4 text-slate-400 dark:text-slate-500 flex-shrink-0" />
                                        )}
                                        <span>{child.label}</span>
                                      </Link>
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          ))
                        : item.children?.map((child) => {
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
            <Button variant="outline" className="w-full" asChild>
              <Link
                href="/auth/sign-in"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign in / Account
              </Link>
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <Link
                href="https://app.nyumbazetu.com/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
              >
                App login
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
