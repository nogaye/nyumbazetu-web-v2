import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { notFound } from "next/navigation";

const features: Record<string, {
  title: string;
  description: string;
  what: string;
  how: string;
  why: string;
  faqs: { q: string; a: string }[];
}> = {
  accounting: {
    title: "Property Management Accounting and General Ledger for Kenyan Real Estate",
    description: "Full double-entry accounting system with automated journal entries, ledgers, and financial reports.",
    what: "Nyumba Zetu's accounting module provides a complete general ledger system designed specifically for property management. Every transaction—rent collection, service charges, maintenance expenses, deposits—automatically posts to the correct accounts with proper double-entry bookkeeping.",
    how: "When a tenant pays rent, the system automatically creates journal entries: debiting cash and crediting rent income. Service charges are tracked separately, maintenance expenses post to the correct expense accounts, and all transactions flow into trial balance, P&L, and balance sheet reports. The system supports multiple chart of accounts configurations and can export to QuickBooks and other accounting tools.",
    why: "Property management requires serious accounting. Without proper general ledger management, you can't generate accurate financial statements, prepare for audits, or make informed decisions. Nyumba Zetu ensures every transaction is properly recorded and categorized from day one.",
    faqs: [
      {
        q: "Can I export data to QuickBooks?",
        a: "Yes, Nyumba Zetu supports export to QuickBooks and other accounting software formats.",
      },
      {
        q: "Does it support multiple chart of accounts?",
        a: "Yes, you can configure custom chart of accounts to match your organization's structure.",
      },
    ],
  },
  collections: {
    title: "Rent Collection & Payments for Property Management in Kenya",
    description: "Automated invoicing and payment tracking with M-Pesa, bank, and wallet integrations.",
    what: "Nyumba Zetu automates the entire rent and service charge collection process. The system generates invoices automatically, sends them to tenants via email or SMS, tracks payments from M-Pesa, bank transfers, and mobile wallets, and reconciles everything in real-time.",
    how: "Set up recurring invoices for rent and service charges. Tenants receive automated reminders before due dates. When payments come in via M-Pesa, bank transfer, or other methods, the system automatically matches them to invoices and updates tenant balances. Property managers get real-time dashboards showing collection rates, arrears, and payment trends.",
    why: "Manual rent collection is time-consuming and error-prone. Automated collection increases on-time payments, reduces administrative overhead, and provides real-time visibility into cash flow. For property teams managing multiple units, this is essential.",
    faqs: [
      {
        q: "Which payment methods are supported?",
        a: "M-Pesa, bank transfers, mobile wallets, and cash payments can all be tracked and reconciled.",
      },
      {
        q: "How does M-Pesa reconciliation work?",
        a: "The system automatically matches M-Pesa payments to invoices using transaction references and tenant phone numbers.",
      },
    ],
  },
  "tenant-experience": {
    title: "Tenant & Owner Experience Portals and Mobile Apps",
    description: "Self-service portals, mobile apps, and WhatsApp chatbot for seamless tenant and owner engagement.",
    what: "Nyumba Zetu provides dedicated portals and mobile apps for tenants and property owners. Tenants can view invoices, make payments, submit maintenance requests, and communicate with property managers. Owners can access real-time dashboards showing collections, occupancy, and financial performance.",
    how: "Tenants and owners receive login credentials and can access their portals via web or mobile app. The WhatsApp chatbot provides instant support for common questions and payment confirmations. All interactions are logged and visible to property managers.",
    why: "Modern tenants and owners expect self-service access to their property information. Portals reduce support burden, improve satisfaction, and provide transparency that builds trust.",
    faqs: [
      {
        q: "Are the mobile apps available for iOS and Android?",
        a: "Yes, native mobile apps are available for both iOS and Android platforms.",
      },
      {
        q: "Can tenants pay through the portal?",
        a: "Yes, tenants can make payments directly through the portal using M-Pesa or bank transfer.",
      },
    ],
  },
  maintenance: {
    title: "Maintenance & Asset Management for Property Portfolios",
    description: "Track maintenance requests, work orders, and property assets with full history.",
    what: "The maintenance module allows tenants to submit maintenance requests, property managers to create work orders, assign vendors, track completion, and manage asset depreciation. Full history is maintained for audit and planning purposes.",
    how: "Tenants submit maintenance requests through the portal or mobile app. Property managers review, create work orders, assign vendors, and track progress. Completed work is recorded with costs, and assets are tracked with depreciation schedules.",
    why: "Proper maintenance management extends asset life, improves tenant satisfaction, and provides cost visibility for budgeting and planning.",
    faqs: [
      {
        q: "Can I track asset depreciation?",
        a: "Yes, the system supports asset tracking with depreciation schedules and methods.",
      },
      {
        q: "How do vendors get paid?",
        a: "Vendor invoices can be created and tracked, with payments integrated into the accounting system.",
      },
    ],
  },
  etims: {
    title: "KRA eTIMS Integration for Property Management",
    description: "KRA eTIMS-ready invoicing and tax-compliant workflows for property operations.",
    what: "Nyumba Zetu generates eTIMS-compliant invoices for all rent, service charge, and other property-related transactions. The system ensures all invoices meet KRA requirements and can be submitted directly to eTIMS.",
    how: "When invoices are generated, the system automatically formats them according to eTIMS specifications and includes all required fields. Invoices can be exported or submitted directly to eTIMS via API integration. Full audit trails are maintained.",
    why: "KRA eTIMS compliance is mandatory for property management operations. Automated eTIMS integration ensures compliance from day one and reduces the risk of penalties.",
    faqs: [
      {
        q: "Is eTIMS integration automatic?",
        a: "Yes, invoices are automatically formatted for eTIMS and can be submitted via API integration.",
      },
      {
        q: "What if I need to modify an invoice?",
        a: "The system supports invoice amendments with proper eTIMS credit notes and adjustments.",
      },
    ],
  },
};

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const feature = features[params.slug];
  if (!feature) return { title: "Feature Not Found" };
  
  return {
    title: `${feature.title} | Nyumba Zetu`,
    description: feature.description,
  };
}

export default function FeaturePage({ params }: { params: { slug: string } }) {
  const feature = features[params.slug];
  
  if (!feature) {
    notFound();
  }

  return (
    <>
      <Section className="bg-gradient-to-br from-slate-50 to-white pt-24">
        <SectionHeader
          title={feature.title}
          description={feature.description}
        />
      </Section>

      <Section>
        <div className="max-w-4xl mx-auto space-y-12">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">What It Is</h2>
            <p className="text-lg text-slate-700 leading-relaxed">{feature.what}</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">How It Works</h2>
            <p className="text-lg text-slate-700 leading-relaxed">{feature.how}</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Why It Matters</h2>
            <p className="text-lg text-slate-700 leading-relaxed">{feature.why}</p>
          </div>
        </div>
      </Section>

      <Section className="bg-slate-50">
        <SectionHeader
          title="Frequently Asked Questions"
          description="Common questions about this feature."
        />
        <div className="max-w-3xl mx-auto space-y-6">
          {feature.faqs.map((faq, idx) => (
            <Card key={idx}>
              <CardHeader>
                <CardTitle className="text-lg">{faq.q}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">{faq.a}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Ready to see this feature in action?
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            Schedule a demo to explore how this feature can help your property operations.
          </p>
          <Button size="lg" asChild>
            <Link href="/contact">Request a Demo</Link>
          </Button>
        </div>
      </Section>
    </>
  );
}

