import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";

export const metadata = {
  title: "Platform Overview | Nyumba Zetu",
  description: "One platform for every layer of property operations in Kenya. Explore how Nyumba Zetu integrates property management, accounting, and tenant experience.",
};

export default function ProductPage() {
  return (
    <>
      <Section className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 pt-16 md:pt-20 lg:pt-24">
        <SectionHeader
          title="One platform for every layer of property operations in Kenya."
          description="Nyumba Zetu integrates property management, accounting, tenant experience, and compliance into a single, powerful platform."
        />
      </Section>

      {/* Platform Dashboard Screenshot */}
      <Section>
        <div className="max-w-6xl mx-auto mb-12">
          <div className="relative bg-slate-100 dark:bg-slate-900 rounded-xl p-4 shadow-2xl border border-slate-200 dark:border-slate-800">
            <div className="aspect-video bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-700 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 bg-slate-400 dark:bg-slate-600 rounded-lg flex items-center justify-center">
                  <div className="w-24 h-24 bg-slate-500 dark:bg-slate-500 rounded"></div>
                </div>
                <p className="text-slate-700 dark:text-slate-300 font-medium mb-1">Platform Dashboard Screenshot</p>
                <p className="text-slate-600 dark:text-slate-400 text-sm">Full platform interface with all modules visible</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Platform Diagram */}
      <Section>
        <div className="bg-secondary rounded-2xl p-8 md:p-12 text-white">
          <div className="grid md:grid-cols-5 gap-6">
            <div className="md:col-span-2 space-y-4">
              <h3 className="text-xl font-semibold mb-6">Connected Ecosystem</h3>
              {["Tenants & Owners", "Property Managers", "Finance Teams", "Vendors & Contractors"].map((item) => (
                <div key={item} className="bg-white/10 rounded-lg p-4 backdrop-blur flex items-center gap-3">
                  <div className="w-10 h-10 rounded bg-white/20 flex-shrink-0 flex items-center justify-center">
                    <div className="w-8 h-8 rounded bg-white/30"></div>
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className="md:col-span-1 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-3 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur">
                  <div className="w-16 h-16 bg-white/20 rounded flex items-center justify-center">
                    <span className="text-2xl font-bold">→</span>
                  </div>
                </div>
                <div className="text-sm text-white">Nyumba Zetu Core</div>
              </div>
            </div>
            <div className="md:col-span-2 space-y-4">
              <h3 className="text-xl font-semibold mb-6">Integrations</h3>
              {["M-Pesa & Banks", "QuickBooks", "KRA eTIMS", "Email/SMS"].map((item) => (
                <div key={item} className="bg-white/10 rounded-lg p-4 backdrop-blur flex items-center gap-3">
                  <div className="w-10 h-10 rounded bg-white/20 flex-shrink-0 flex items-center justify-center">
                    <div className="w-8 h-8 rounded bg-white/30"></div>
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Modules */}
      <Section className="bg-secondary">
      <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 leading-tight tracking-tight">
          Core Platform Modules
        </h2>
        <p className="text-lg md:text-xl text-white leading-relaxed">
          Everything you need to run modern property operations.
        </p>
      </div>
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {[
            {
              title: "Collections & Payments",
              description: "Automated rent, service charge, and utility invoicing with integrated M-Pesa, bank, and wallet payments.",
            },
            {
              title: "Accounting & General Ledger",
              description: "Full double-entry accounting system with automated journal entries, ledgers, and financial reports.",
            },
            {
              title: "Tenant & Owner Experience",
              description: "Self-service portals, mobile apps, and WhatsApp chatbot for seamless engagement.",
            },
            {
              title: "Maintenance & Assets",
              description: "Maintenance request management, work orders, and asset tracking with depreciation.",
            },
            {
              title: "Tasks & Projects",
              description: "Project management for developments, renovations, and capital improvements.",
            },
            {
              title: "KRA eTIMS & Compliance",
              description: "eTIMS-ready invoicing, tax-compliant workflows, and audit-ready documentation.",
            },
            {
              title: "TPS & Rent-to-Own",
              description: "Tenant Purchase Scheme tracking and rent-to-own installment management.",
            },
            {
              title: "Communications",
              description: "Centralized email, SMS, and in-app messaging for tenants, owners, and teams.",
            },
          ].map((module, idx) => (
            <Card key={idx} className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white">{module.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white leading-relaxed">{module.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Security & Reliability */}
      <Section>
        <SectionHeader
          title="Security & Reliability"
          description="Built for institutions that require enterprise-grade security and uptime."
        />
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Role-Based Access Control",
              description: "Granular permissions for managers, accountants, owners, and tenants.",
            },
            {
              title: "Audit Logs",
              description: "Complete transaction history with full audit trails for compliance.",
            },
            {
              title: "Data Protection",
              description: "Encrypted data storage, regular backups, and GDPR-compliant practices.",
            },
          ].map((item, idx) => (
            <Card key={idx}>
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Implementation */}
      <Section className="bg-secondary">
      <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 leading-tight tracking-tight">
          Implementation & Onboarding
        </h2>
        <p className="text-lg md:text-xl text-white leading-relaxed">
          Get up and running quickly with our dedicated onboarding team.
        </p>
      </div>
        <div className="max-w-3xl mx-auto space-y-6">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-8">
              <ol className="space-y-4">
                {[
                  "Initial consultation to understand your portfolio and workflows",
                  "Data migration support for units, tenants, and historical transactions",
                  "Custom configuration for chart of accounts, payment methods, and integrations",
                  "Team training sessions for managers, accountants, and administrators",
                  "Go-live support and ongoing optimization",
                ].map((step, idx) => (
                  <li key={idx} className="flex items-start space-x-3">
                    <span className="font-bold text-primary">{idx + 1}.</span>
                    <span className="text-white">{step}</span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Ready to see the platform in action?
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            Schedule a demo with our team to explore how Nyumba Zetu can transform your property operations.
          </p>
          <Button size="lg" asChild>
            <Link href="/contact" className="flex items-center gap-2">
              Request a Demo
              <CalendarDaysIcon className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Section>
    </>
  );
}


