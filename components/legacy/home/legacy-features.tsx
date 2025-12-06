import { Section } from "@/components/section";

interface FeatureItem {
  id: number;
  icon: string;
  title: string;
  description: string;
}

export function LegacyFeatures() {
  const items: FeatureItem[] = [
    {
      id: 1,
      icon: "📧",
      title: "Digital Invoices & Receipts",
      description:
        "Generate and send digital invoices and receipts directly to tenants via email or WhatsApp. Ensure real-time transparency, payment tracking, and audit history.",
    },
    {
      id: 2,
      icon: "💳",
      title: "Bill Payments & Auto-Reconciliation",
      description:
        "Accept mobile money and bank transfers. Payments are automatically reconciled against tenant accounts, reducing errors and eliminating manual reconciliation tasks.",
    },
    {
      id: 3,
      icon: "📊",
      title: "Financial Reports & Statements",
      description:
        "Export-ready reports including landlord statements, tenant ledgers, income summaries, trial balances, profit & loss, and more — filtered by property, unit, or branch.",
    },
    {
      id: 4,
      icon: "🏢",
      title: "Tenant & Lease Management",
      description:
        "Track tenant details, lease terms, renewals, notices, and history — all from one centralized dashboard. Digitize lease records and automate renewals and reminders.",
    },
    {
      id: 5,
      icon: "📱",
      title: "Automated Communication & Reminders",
      description:
        "Send SMS, email, and WhatsApp notifications for rent reminders, invoices, payment receipts, maintenance updates, and lease alerts — all automatically.",
    },
    {
      id: 6,
      icon: "🏗️",
      title: "Expense & Vendor Management",
      description:
        "Log and categorize property expenses, manage vendor contracts, and automate vendor payments. Gain insights into operational costs across properties.",
    },
    {
      id: 7,
      icon: "📲",
      title: "Mobile App Access",
      description:
        "Access the full platform via mobile app. Tenants can check balances, pay rent, and chat with managers, while landlords can track performance and generate reports on the go.",
    },
    {
      id: 8,
      icon: "💬",
      title: "WhatsApp Chatbot Assistant",
      description:
        "Let tenants inquire balances, make payments, and request maintenance using our AI-powered WhatsApp chatbot. No app needed — just chat.",
    },
    {
      id: 9,
      icon: "⚙️",
      title: "ETIMS Integration",
      description:
        "Easily generate and transmit e-invoices to KRA through ETIMS. Stay compliant with real-time tax reporting, audit logs, and digital record keeping.",
    },
  ];

  return (
    <Section>
      <div className="container mx-auto px-4">
        <h2 className="text-center text-3xl font-bold text-slate-900 dark:text-slate-50 mb-8">
          More Than Just Features — Solutions
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
          {items.map((item) => (
            <div key={item.id} className="mt-4 lg:mt-0">
              <div className="icon icon-shape rounded-circle text-center mb-3 bg-primary w-16 h-16 flex items-center justify-center mx-auto">
                <span className="text-2xl">{item.icon}</span>
              </div>
              <h3 className="h5 text-xl font-semibold text-slate-900 dark:text-slate-50 mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-dark dark:text-slate-300 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

