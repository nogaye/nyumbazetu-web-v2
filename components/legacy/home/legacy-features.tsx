"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  EnvelopeIcon,
  CreditCardIcon,
  ChartBarIcon,
  BuildingOfficeIcon,
  DevicePhoneMobileIcon,
  WrenchScrewdriverIcon,
  DevicePhoneMobileIcon as MobileIcon,
  ChatBubbleLeftRightIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

interface FeatureItem {
  id: number;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

export function LegacyFeatures() {
  const items: FeatureItem[] = [
    {
      id: 1,
      icon: EnvelopeIcon,
      title: "Digital Invoices & Receipts",
      description:
        "Generate and send digital invoices and receipts directly to tenants via email or WhatsApp. Ensure real-time transparency, payment tracking, and audit history.",
    },
    {
      id: 2,
      icon: CreditCardIcon,
      title: "Bill Payments & Auto-Reconciliation",
      description:
        "Accept mobile money and bank transfers. Payments are automatically reconciled against tenant accounts, reducing errors and eliminating manual reconciliation tasks.",
    },
    {
      id: 3,
      icon: ChartBarIcon,
      title: "Financial Reports & Statements",
      description:
        "Export-ready reports including landlord statements, tenant ledgers, income summaries, trial balances, profit & loss, and more — filtered by property, unit, or branch.",
    },
    {
      id: 4,
      icon: BuildingOfficeIcon,
      title: "Tenant & Lease Management",
      description:
        "Track tenant details, lease terms, renewals, notices, and history — all from one centralized dashboard. Digitize lease records and automate renewals and reminders.",
    },
    {
      id: 5,
      icon: DevicePhoneMobileIcon,
      title: "Automated Communication & Reminders",
      description:
        "Send SMS, email, and WhatsApp notifications for rent reminders, invoices, payment receipts, maintenance updates, and lease alerts — all automatically.",
    },
    {
      id: 6,
      icon: WrenchScrewdriverIcon,
      title: "Expense & Vendor Management",
      description:
        "Log and categorize property expenses, manage vendor contracts, and automate vendor payments. Gain insights into operational costs across properties.",
    },
    {
      id: 7,
      icon: MobileIcon,
      title: "Mobile App Access",
      description:
        "Access the full platform via mobile app. Tenants can check balances, pay rent, and chat with managers, while landlords can track performance and generate reports on the go.",
    },
    {
      id: 8,
      icon: ChatBubbleLeftRightIcon,
      title: "WhatsApp Chatbot Assistant",
      description:
        "Let tenants inquire balances, make payments, and request maintenance using our AI-powered WhatsApp chatbot. No app needed — just chat.",
    },
    {
      id: 9,
      icon: Cog6ToothIcon,
      title: "ETIMS Integration",
      description:
        "Easily generate and transmit e-invoices to KRA through ETIMS. Stay compliant with real-time tax reporting, audit logs, and digital record keeping.",
    },
  ];

  return (
    <Section>
      <div className="container mx-auto px-4">
        <SectionHeader
          title="More Than Just Features — Complete Solutions"
          description="Everything you need to manage properties efficiently, from invoicing to reporting, all in one integrated platform"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {items.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary/20">
                  <CardHeader className="pb-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/80 mb-4">
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-2">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      {item.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

