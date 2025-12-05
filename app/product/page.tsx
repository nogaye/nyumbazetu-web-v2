import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata = {
  title: "Platform Overview | Nyumba Zetu",
  description: "One platform for every layer of property operations in Kenya. Explore how Nyumba Zetu integrates property management, accounting, and tenant experience.",
};

export default function ProductPage() {
  return (
    <>
      <Section className="bg-gradient-to-br from-slate-50 to-white pt-24">
        <SectionHeader
          title="One platform for every layer of property operations in Kenya."
          description="Nyumba Zetu integrates property management, accounting, tenant experience, and compliance into a single, powerful platform."
        />
      </Section>

      {/* Platform Diagram */}
      <Section>
        <div className="bg-slate-900 rounded-2xl p-8 md:p-12 text-white">
          <div className="grid md:grid-cols-5 gap-6">
            <div className="md:col-span-2 space-y-4">
              <h3 className="text-xl font-semibold mb-6">Connected Ecosystem</h3>
              {["Tenants & Owners", "Property Managers", "Finance Teams", "Vendors & Contractors"].map((item) => (
                <div key={item} className="bg-white/10 rounded-lg p-4 backdrop-blur">
                  {item}
                </div>
              ))}
            </div>
            <div className="md:col-span-1 flex items-center justify-center">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">→</div>
                <div className="text-sm text-slate-400">Nyumba Zetu Core</div>
              </div>
            </div>
            <div className="md:col-span-2 space-y-4">
              <h3 className="text-xl font-semibold mb-6">Integrations</h3>
              {["M-Pesa & Banks", "QuickBooks", "KRA eTIMS", "Email/SMS"].map((item) => (
                <div key={item} className="bg-white/10 rounded-lg p-4 backdrop-blur">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Modules */}
      <Section className="bg-slate-50">
        <SectionHeader
          title="Core Platform Modules"
          description="Everything you need to run modern property operations."
        />
        <div className="grid md:grid-cols-2 gap-6">
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
            <Card key={idx}>
              <CardHeader>
                <CardTitle>{module.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">{module.description}</p>
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
      <Section className="bg-slate-50">
        <SectionHeader
          title="Implementation & Onboarding"
          description="Get up and running quickly with our dedicated onboarding team."
        />
        <div className="max-w-3xl mx-auto space-y-6">
          <Card>
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
                    <span className="font-bold text-[#b98036]">{idx + 1}.</span>
                    <span className="text-slate-700">{step}</span>
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
            <Link href="/contact">Request a Demo</Link>
          </Button>
        </div>
      </Section>
    </>
  );
}


