/**
 * Feature grid for the marketing site. Renders a grid of product features (collections,
 * accounting, tenant experience, maintenance, TPS, eTIMS, communications, CRM, etc.) with
 * icons, descriptions, bullets, and links to /features/[slug]. Used on the home page,
 * /features page, and anywhere a consolidated feature list is needed. Exports FEATURES
 * for reuse and FeatureGrid for rendering.
 */
"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  CurrencyDollarIcon,
  CalculatorIcon,
  UserGroupIcon,
  WrenchScrewdriverIcon,
  ClipboardDocumentCheckIcon,
  DocumentTextIcon,
  HomeIcon,
  ChatBubbleLeftRightIcon,
  BuildingOfficeIcon,
  PaintBrushIcon,
  CalendarDaysIcon,
  LinkIcon,
  MagnifyingGlassIcon,
  UserPlusIcon,
  ChartBarSquareIcon,
  ClipboardDocumentListIcon,
  BoltIcon,
  CubeIcon,
  BanknotesIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

/** Single feature item: title, description, bullets, icon, and detail page href. */
export type FeatureItem = {
  title: string;
  description: string;
  bullets: string[];
  icon: React.ComponentType<{ className?: string }>;
  href: string;
};

/**
 * Canonical list of product features used across the site (home, /features page, etc.).
 * Each item links to /features/[slug] for the detail page.
 */
export const FEATURES: FeatureItem[] = [
  {
    title: "Automated Invoicing & Payment Reconciliation",
    description:
      "Automated invoicing and payment tracking for any charge type—rent, service charges, utilities, fees—with M-Pesa, bank, and wallet integrations.",
    bullets: [
      "Invoices and receipts by email or WhatsApp",
      "M-Pesa, bank, and wallet with auto-reconciliation",
      "Real-time payment tracking for any charge type",
    ],
    icon: CurrencyDollarIcon,
    href: "/features/collections",
  },
  {
    title: "Accounting & General Ledger",
    description:
      "Full accounting system with journals, ledgers, trial balance, P&L, and balance sheet.",
    bullets: [
      "Double-entry accounting",
      "Automated journal entries",
      "Reports, statements, and exports",
    ],
    icon: CalculatorIcon,
    href: "/features/accounting",
  },
  {
    title: "Tenant & Owner Experience",
    description:
      "Portals, mobile apps, and WhatsApp chatbot for seamless tenant and owner engagement.",
    bullets: [
      "Lease management, renewals, and digitized records",
      "Portals and mobile apps (iOS & Android)",
      "WhatsApp chatbot for balances and requests",
    ],
    icon: UserGroupIcon,
    href: "/features/tenant-experience",
  },
  {
    title: "Maintenance and Service Requests",
    description:
      "Track maintenance and service requests, create work orders, and track completion.",
    bullets: [
      "Request logging and prioritization",
      "Work orders and assignment",
      "Completion tracking and history",
    ],
    icon: WrenchScrewdriverIcon,
    href: "/features/maintenance",
  },
  {
    title: "Assets Management",
    description:
      "Property and facility asset register with tracking and depreciation.",
    bullets: [
      "Asset register and catalog",
      "Track by property or unit",
      "Depreciation and reporting",
    ],
    icon: CubeIcon,
    href: "/features/assets-management",
  },
  {
    title: "Expense & Vendor Management",
    description:
      "Track expenses, manage vendor records, contracts, and payments.",
    bullets: [
      "Expense tracking and categories",
      "Vendor records and contracts",
      "Vendor payment tracking",
    ],
    icon: BanknotesIcon,
    href: "/features/expense-vendor-management",
  },
  {
    title: "Tasks & Projects",
    description:
      "Project management for property development, renovations, and capital improvements.",
    bullets: [
      "Task assignment and tracking",
      "Timelines and milestones",
      "Budget and cost tracking",
    ],
    icon: ClipboardDocumentCheckIcon,
    href: "/features/tasks",
  },
  {
    title: "KRA eTIMS & Compliance",
    description:
      "KRA eTIMS-ready invoicing and tax-compliant workflows for property operations.",
    bullets: [
      "eTIMS e-invoices to KRA",
      "Tax-compliant, real-time reporting",
      "Audit logs and digital records",
    ],
    icon: DocumentTextIcon,
    href: "/features/etims",
  },
  {
    title: "TPS & Rent-to-Own",
    description:
      "Tenant Purchase Scheme and rent-to-own tracking with installment management.",
    bullets: [
      "TPS installment tracking",
      "Rent-to-own calculations",
      "Ownership transfer workflow",
    ],
    icon: HomeIcon,
    href: "/features/tps",
  },
  {
    title: "Communication Hub",
    description:
      "Centralized communication via email, SMS, WhatsApp, and an AI-powered chatbot.",
    bullets: [
      "Automated reminders, invoices, and lease alerts",
      "WhatsApp, email, SMS, and AI chatbot",
      "In-app messaging and broadcasts",
    ],
    icon: ChatBubbleLeftRightIcon,
    href: "/features/communications",
  },
  {
    title: "CRM",
    description: "CRM for tenants, owners, vendors, and prospects.",
    bullets: [
      "Contact and interaction history",
      "Lead management and conversion",
      "Full communication history",
    ],
    icon: BuildingOfficeIcon,
    href: "/features/crm",
  },
  {
    title: "White Labeling",
    description:
      "Fully customizable white-label solution to brand the platform as your own.",
    bullets: [
      "Custom branding and domain",
      "Logo and color control",
      "Enterprise deployment",
    ],
    icon: PaintBrushIcon,
    href: "/features/white-labeling",
  },
  {
    title: "Calendar & Event Scheduling",
    description:
      "Automated scheduling for invoice generation, reminders, penalties, and recurring tasks.",
    bullets: [
      "Scheduled invoice generation",
      "Automated payment reminders",
      "Automatic penalty calculation",
    ],
    icon: CalendarDaysIcon,
    href: "/features/calendar-scheduling",
  },
  {
    title: "Webhooks & API Events",
    description:
      "Real-time event notifications and integrations to connect with your existing systems.",
    bullets: [
      "Real-time event notifications",
      "API integrations and workflows",
      "Custom automation triggers",
    ],
    icon: LinkIcon,
    href: "/features/webhooks",
  },
  {
    title: "Property Listings",
    description:
      "Browse and search verified apartments, maisonettes, and TPS homes across Kenya.",
    bullets: [
      "Verified listings across Kenya",
      "Search and filtering",
      "Details and images",
    ],
    icon: MagnifyingGlassIcon,
    href: "/features/listings",
  },
  {
    title: "Visitor Management",
    description:
      "Register and track visitors with check-in/check-out, host linking, and visit history.",
    bullets: [
      "Check-in and check-out",
      "Host and unit linking",
      "Visit history and reports",
    ],
    icon: UserPlusIcon,
    href: "/features/visitors",
  },
  {
    title: "Reports & Analytics",
    description:
      "Financial reports, tenant ledgers, trial balance, P&L, balance sheet, and RAG-powered insights.",
    bullets: [
      "Landlord statements and tenant ledgers",
      "Trial balance, P&L, balance sheet",
      "Ask Nyumba Zetu (RAG) for insights",
    ],
    icon: ChartBarSquareIcon,
    href: "/features/reports",
  },
  {
    title: "Lease Applications",
    description:
      "Manage lease applications, approvals, and onboarding from a single workflow.",
    bullets: [
      "Application submission and tracking",
      "Approval workflows and KYC",
      "Onboarding to lease and units",
    ],
    icon: ClipboardDocumentListIcon,
    href: "/features/lease-applications",
  },
  {
    title: "Smart Meters & Utilities",
    description:
      "IoT meter readings, consumption tracking, billing runs, and utility management.",
    bullets: [
      "Smart meter integration and readings",
      "Consumption and tariff tracking",
      "Automated utility billing",
    ],
    icon: BoltIcon,
    href: "/features/smart-meters",
  },
];

/** Props for FeatureGrid: optional title/description override and optional CTA section. */
export interface FeatureGridProps {
  /** Section title. Default: "One platform for every part of your property operations." */
  title?: string;
  /** Section description. Default: "From rent collection to accounting...". */
  description?: string;
  /** When true, renders a "See all features in action" CTA section below the grid. */
  showCta?: boolean;
}

const DEFAULT_TITLE =
  "One platform for every part of your property operations.";
const DEFAULT_DESCRIPTION =
  "From rent collection to accounting, tenant experience to compliance—everything you need in one integrated system.";

/**
 * Renders the consolidated feature grid. Used on the home page and /features page.
 * Optionally shows a CTA section when showCta is true.
 */
export function FeatureGrid({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  showCta = false,
}: FeatureGridProps = {}) {
  return (
    <>
      <Section>
        <SectionHeader title={title} description={description} />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {FEATURES.map((feature, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05 }}
          >
            <Card className="h-full hover:shadow-md transition-all duration-200 hover:-translate-y-1">
              <CardHeader className="pb-4">
                {/* Feature Screenshot Placeholder */}
                <div className="mb-4 aspect-video bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center">
                  <div className="text-center">
                    <feature.icon className="h-8 w-8 text-primary mx-auto mb-2" />
                    {/* <p className="text-slate-600 dark:text-slate-400 text-xs">Feature Screenshot</p> */}
                  </div>
                </div>
                <CardTitle className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-2">
                  {feature.title}
                </CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-2.5 mb-6">
                  {feature.bullets.map((bullet, bulletIdx) => (
                    <li
                      key={bulletIdx}
                      className="text-sm text-slate-700 dark:text-slate-300 flex items-start leading-relaxed"
                    >
                      <span className="text-tertiary mr-2.5 flex-shrink-0 mt-0.5">
                        •
                      </span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={feature.href}
                  className="text-sm font-medium text-primary hover:text-primary-600 dark:text-primary dark:hover:text-primary-400 hover:underline inline-flex items-center transition-colors"
                >
                  Learn more →
                </Link>
              </CardContent>
            </Card>
          </motion.div>
          ))}
        </div>
      </Section>

      {showCta && (
        <Section className="bg-secondary">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              See all features in action
            </h2>
            <p className="text-lg text-white mb-8 leading-relaxed">
              Schedule a demo to explore how these features work together to
              transform your property operations.
            </p>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary-600 text-primary-foreground"
              asChild
            >
              <Link href="/request-demo" className="flex items-center gap-2">
                Request a Demo
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Section>
      )}
    </>
  );
}
