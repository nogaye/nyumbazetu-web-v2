"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
} from "@heroicons/react/24/outline";

const features = [
  {
    title: "Rent & Service Charge Collections",
    description: "Automated invoicing and payment tracking with M-Pesa, bank, and wallet integrations.",
    bullets: [
      "Automated rent and service charge invoicing",
      "M-Pesa, bank, and mobile wallet payments",
      "Real-time payment reconciliation",
    ],
    icon: CurrencyDollarIcon,
    href: "/features/collections",
  },
  {
    title: "Accounting & General Ledger",
    description: "Full accounting system with journals, ledgers, trial balance, P&L, and balance sheet.",
    bullets: [
      "Double-entry accounting system",
      "Automated journal entries",
      "Financial reports and exports",
    ],
    icon: CalculatorIcon,
    href: "/features/accounting",
  },
  {
    title: "Tenant & Owner Experience",
    description: "Portals, mobile apps, and WhatsApp chatbot for seamless tenant and owner engagement.",
    bullets: [
      "Self-service tenant and owner portals",
      "Mobile apps for iOS and Android",
      "WhatsApp chatbot for instant support",
    ],
    icon: UserGroupIcon,
    href: "/features/tenant-experience",
  },
  {
    title: "Maintenance & Assets",
    description: "Track maintenance requests, work orders, and property assets with full history.",
    bullets: [
      "Maintenance request management",
      "Asset tracking and depreciation",
      "Vendor and contractor management",
    ],
    icon: WrenchScrewdriverIcon,
    href: "/features/maintenance",
  },
  {
    title: "Tasks & Projects",
    description: "Project management for property development, renovations, and capital improvements.",
    bullets: [
      "Task assignment and tracking",
      "Project timelines and milestones",
      "Budget and cost tracking",
    ],
    icon: ClipboardDocumentCheckIcon,
    href: "/features/tasks",
  },
  {
    title: "KRA eTIMS & Compliance",
    description: "KRA eTIMS-ready invoicing and tax-compliant workflows for property operations.",
    bullets: [
      "eTIMS invoice generation",
      "Tax-compliant reporting",
      "Audit-ready documentation",
    ],
    icon: DocumentTextIcon,
    href: "/features/etims",
  },
  {
    title: "TPS & Rent-to-Own",
    description: "Tenant Purchase Scheme and rent-to-own tracking with installment management.",
    bullets: [
      "TPS installment tracking",
      "Rent-to-own calculations",
      "Ownership transfer workflows",
    ],
    icon: HomeIcon,
    href: "/features/tps",
  },
  {
    title: "Communication Hub",
    description: "Centralized communication with tenants, owners, and team members.",
    bullets: [
      "Email and SMS notifications",
      "In-app messaging",
      "Announcement broadcasts",
    ],
    icon: ChatBubbleLeftRightIcon,
    href: "/features/communications",
  },
  {
    title: "CRM",
    description: "Customer relationship management for tenants, owners, vendors, and prospects.",
    bullets: [
      "Contact and interaction tracking",
      "Lead management and conversion",
      "Complete communication history",
    ],
    icon: BuildingOfficeIcon,
    href: "/features/crm",
  },
  {
    title: "White Labeling",
    description: "Fully customizable white-label solution to brand the platform as your own.",
    bullets: [
      "Custom branding and domain",
      "Logo and color customization",
      "Enterprise deployment options",
    ],
    icon: PaintBrushIcon,
    href: "/features/white-labeling",
  },
  {
    title: "Calendar & Event Scheduling",
    description: "Automated scheduling for invoice generation, reminders, penalties, and recurring tasks.",
    bullets: [
      "Schedule invoice generation",
      "Automated payment reminders",
      "Penalty calculation automation",
    ],
    icon: CalendarDaysIcon,
    href: "/features/calendar-scheduling",
  },
  {
    title: "Webhooks & API Events",
    description: "Real-time event notifications and integrations to connect with your existing systems.",
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
    description: "Browse and search verified apartments, maisonettes, and TPS homes across Kenya.",
    bullets: [
      "Verified property listings",
      "Advanced search and filtering",
      "Property details and images",
    ],
    icon: MagnifyingGlassIcon,
    href: "/features/listings",
  },
];

export function FeatureGrid() {
  return (
    <Section>
      <SectionHeader
        title="One platform for every part of your property operations."
        description="From rent collection to accounting, tenant experience to compliance—everything you need in one integrated system."
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {features.map((feature, idx) => (
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
                    <li key={bulletIdx} className="text-sm text-slate-700 dark:text-slate-300 flex items-start leading-relaxed">
                      <span className="text-tertiary mr-2.5 flex-shrink-0 mt-0.5">•</span>
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
  );
}


