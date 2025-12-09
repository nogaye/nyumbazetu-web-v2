import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { LoadingSkeleton } from "@/components/loading-skeleton";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { FeatureViewTracker } from "@/components/feature-view-tracker";

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
  tasks: {
    title: "Tasks & Project Management for Property Operations",
    description: "Project management for property development, renovations, and capital improvements with task tracking and budget management.",
    what: "Nyumba Zetu's Tasks & Projects module helps property teams manage development projects, renovations, and capital improvements. Track tasks, assign team members, monitor timelines, and manage budgets—all within the same platform that handles your property operations.",
    how: "Create projects for developments, renovations, or capital improvements. Break down projects into tasks with assignees, due dates, and dependencies. Track progress with visual timelines, monitor budgets against actual costs, and generate project reports for stakeholders. All project expenses can be integrated with the accounting module.",
    why: "Property management often involves ongoing projects and improvements. Without proper project management, timelines slip, budgets overrun, and stakeholders lack visibility. Nyumba Zetu brings project management into your property operations platform.",
    faqs: [
      {
        q: "Can I track multiple projects simultaneously?",
        a: "Yes, you can manage multiple projects at once, each with its own tasks, timeline, and budget.",
      },
      {
        q: "How does project budgeting work?",
        a: "Set project budgets and track actual costs. The system integrates with the accounting module to automatically capture expenses.",
      },
    ],
  },
  tps: {
    title: "TPS & Rent-to-Own Management",
    description: "Tenant Purchase Scheme and rent-to-own tracking with installment management and ownership transfer workflows.",
    what: "Nyumba Zetu supports Tenant Purchase Schemes (TPS) and rent-to-own arrangements common in Kenyan real estate. Track installment payments, calculate ownership percentages, manage transfer processes, and maintain complete records of the ownership journey. Our TPS platform integrates with Boma Yangu for affordable housing programs and collaborates with HFC (Housing Finance) to deliver comprehensive property finance solutions.",
    how: "Set up TPS or rent-to-own agreements with initial purchase price, installment amounts, and payment schedules. The system tracks each payment, calculates the tenant's ownership percentage, and manages the transfer process when the final payment is made. All transactions are recorded in the accounting system, and tenants can view their progress through the tenant portal. Integration with Boma Yangu enables seamless management of affordable housing projects, while collaboration with HFC provides integrated property finance and management solutions.",
    why: "TPS and rent-to-own are popular in Kenya, but managing them manually is complex and error-prone. Nyumba Zetu automates the tracking, calculations, and documentation needed for these arrangements. Our partnerships with Boma Yangu and HFC ensure that TPS solutions are comprehensive, compliant, and integrated with Kenya's affordable housing and property finance ecosystem.",
    faqs: [
      {
        q: "How does ownership percentage calculation work?",
        a: "The system automatically calculates ownership percentage based on payments made versus the total purchase price.",
      },
      {
        q: "Can tenants see their TPS progress?",
        a: "Yes, tenants can view their TPS progress, remaining balance, and ownership percentage through the tenant portal.",
      },
      {
        q: "Does Nyumba Zetu integrate with Boma Yangu?",
        a: "Yes, Boma Yangu is integrated with Nyumba Zetu as part of our TPS platform, providing comprehensive property management solutions for affordable housing projects.",
      },
      {
        q: "How does the HFC partnership work?",
        a: "We collaborate with HFC (Housing Finance) on TPS implementations, combining their property finance expertise with our property management technology to deliver integrated solutions.",
      },
    ],
  },
  communications: {
    title: "Communication Hub for Property Management",
    description: "Centralized communication with tenants, owners, and team members through email, SMS, and in-app messaging.",
    what: "Nyumba Zetu's Communication Hub centralizes all property-related communication. Send automated notifications, broadcast announcements, manage in-app messaging, and maintain a complete communication history—all from one place.",
    how: "Send automated emails and SMS for rent reminders, payment confirmations, maintenance updates, and announcements. Use in-app messaging for direct communication with tenants and owners. Broadcast announcements to specific groups (all tenants, specific buildings, etc.). All communications are logged and searchable.",
    why: "Property management involves constant communication with tenants, owners, and team members. Scattered communication across WhatsApp, email, and phone calls creates chaos. Nyumba Zetu brings it all together in one platform.",
    faqs: [
      {
        q: "Can I send bulk messages to tenants?",
        a: "Yes, you can send bulk messages to all tenants, specific buildings, or custom groups.",
      },
      {
        q: "Are SMS notifications included?",
        a: "SMS notifications are available and can be configured for various events like rent reminders and payment confirmations.",
      },
    ],
  },
  crm: {
    title: "CRM for Property Management",
    description: "Customer relationship management for tenants, owners, vendors, and prospects with full interaction history and lead tracking.",
    what: "Nyumba Zetu's CRM module provides comprehensive customer relationship management for property operations. Track all interactions with tenants, property owners, vendors, and prospects. Manage leads, follow-ups, and maintain complete communication history—all integrated with your property management workflows.",
    how: "Create contact records for tenants, owners, vendors, and prospects. Log all interactions including calls, emails, meetings, and property viewings. Set up automated follow-up reminders and track lead conversion. The CRM integrates seamlessly with property management workflows, so tenant information, lease history, and payment records are all accessible from the contact profile. Generate reports on tenant satisfaction, owner engagement, and vendor performance.",
    why: "Property management is fundamentally about relationships. Without proper CRM, important interactions are forgotten, follow-ups are missed, and opportunities are lost. Nyumba Zetu's CRM ensures every interaction is tracked and nothing falls through the cracks.",
    faqs: [
      {
        q: "Can I track prospects and leads?",
        a: "Yes, the CRM includes lead management with conversion tracking, follow-up reminders, and pipeline management.",
      },
      {
        q: "How does it integrate with property management?",
        a: "The CRM is fully integrated with property management workflows. Tenant records automatically include lease history, payment records, and maintenance requests.",
      },
      {
        q: "Can I track vendor relationships?",
        a: "Yes, vendor contacts include performance history, work order tracking, and payment records.",
      },
    ],
  },
  "white-labeling": {
    title: "White Label Property Management Platform",
    description: "Fully customizable white-label solution for property management companies, banks, and enterprises to brand the platform as their own.",
    what: "Nyumba Zetu's white-label solution allows property management companies, banks, and enterprises to rebrand the entire platform with their own logo, colors, domain, and branding. The platform can be completely customized to match your brand identity while maintaining all the powerful property management features.",
    how: "Customize the platform with your logo, brand colors, and domain name. Replace Nyumba Zetu branding throughout the interface including tenant portals, mobile apps, email templates, and reports. Configure custom email domains and SSL certificates. The platform can be deployed under your own domain with full white-label branding. All features remain fully functional while presenting your brand to tenants, owners, and stakeholders.",
    why: "For property management companies and enterprises, presenting a branded platform builds trust and reinforces your brand identity. White-labeling allows you to offer enterprise-grade property management technology under your own brand, without the cost and complexity of building it from scratch.",
    faqs: [
      {
        q: "What can be customized in the white-label version?",
        a: "Logo, brand colors, domain name, email templates, tenant portals, mobile apps, and all user-facing interfaces can be fully customized.",
      },
      {
        q: "Can I use my own domain?",
        a: "Yes, white-label deployments can use your own domain with custom SSL certificates.",
      },
      {
        q: "Are all features available in the white-label version?",
        a: "Yes, all Nyumba Zetu features are available in the white-label version. Only the branding changes.",
      },
    ],
  },
  "calendar-scheduling": {
    title: "Calendar & Event Scheduling for Property Management",
    description: "Automated scheduling system for invoice generation, payment reminders, penalty calculations, and recurring property management tasks.",
    what: "Nyumba Zetu's Calendar & Event Scheduling feature provides a powerful automation engine that lets you schedule when the system should generate invoices, send payment reminders, calculate penalties, and execute other recurring property management tasks. Set up rules once, and the system handles everything automatically according to your schedule.",
    how: "Configure scheduling rules for any property management task. Schedule invoice generation for specific dates (e.g., 1st of every month for rent, 15th for service charges). Set up automated reminder sequences (e.g., send reminder 3 days before due date, another on due date, and a final reminder 3 days after). Configure penalty calculations to automatically apply late fees based on your rules (e.g., 5% penalty after 7 days, additional 2% after 14 days). Schedule recurring tasks like maintenance inspections, lease renewals, and reporting. The calendar view shows all scheduled events, and you can modify or pause schedules at any time. All scheduled events are logged with timestamps for audit purposes.",
    why: "Property management involves many repetitive, time-sensitive tasks. Without automation, property managers spend hours each month manually generating invoices, sending reminders, and calculating penalties. Calendar & Event Scheduling eliminates this manual work, ensures consistency, and ensures nothing is forgotten. For property teams managing hundreds of units, this automation is essential for operational efficiency.",
    faqs: [
      {
        q: "Can I schedule different invoice dates for different properties?",
        a: "Yes, you can configure unique scheduling rules for each property, unit, or tenant. For example, commercial properties might have different rent due dates than residential units.",
      },
      {
        q: "How do penalty calculations work with scheduling?",
        a: "You can set up penalty rules that automatically calculate and apply late fees based on how many days past due a payment is. The system checks daily and applies penalties according to your configured schedule.",
      },
      {
        q: "Can I schedule recurring maintenance tasks?",
        a: "Yes, you can schedule recurring maintenance inspections, asset audits, and other property management tasks. The system will create work orders or reminders automatically.",
      },
      {
        q: "What happens if I need to pause a scheduled event?",
        a: "You can pause, modify, or delete any scheduled event at any time. The system maintains a history of all scheduled events and their execution status.",
      },
      {
        q: "Can I schedule bulk operations?",
        a: "Yes, you can schedule bulk invoice generation, bulk reminders, and other operations that apply to multiple tenants or properties at once.",
      },
    ],
  },
  webhooks: {
    title: "Webhooks & API Events for Property Management Integration",
    description: "Real-time event notifications and webhook integrations to connect Nyumba Zetu with your existing systems and workflows.",
    what: "Nyumba Zetu's Webhooks feature allows you to receive real-time notifications when events occur in the system. When an invoice is generated, a payment is received, a maintenance request is submitted, or any other event happens, the system can automatically send a webhook to your specified URL, trigger an email, call another API, or execute custom workflows.",
    how: "Configure webhooks for any system event: invoice generation, payment received, payment overdue, maintenance request created, tenant added, lease renewed, and many more. Set up webhook endpoints (URLs) where you want to receive notifications. When an event occurs, Nyumba Zetu sends a POST request to your endpoint with event details in JSON format. You can use these webhooks to update external systems, trigger custom workflows, send notifications to third-party services, or integrate with your existing tools. For example, when a payment is received, you could automatically update your CRM, send a Slack notification, or trigger a custom accounting workflow. Webhooks include authentication tokens for security, retry logic for failed deliveries, and full event history for debugging. You can also configure webhooks to call other APIs, send emails, or trigger SMS notifications.",
    why: "Modern property management requires integration with multiple systems: CRMs, accounting software, communication tools, and custom workflows. Webhooks provide a flexible, real-time way to connect Nyumba Zetu with your existing infrastructure. Instead of manually exporting data or polling for updates, webhooks push events to your systems as they happen, enabling true automation and real-time synchronization.",
    faqs: [
      {
        q: "What events can trigger webhooks?",
        a: "Virtually any event in the system can trigger a webhook: invoice generation, payment received, payment overdue, maintenance request created/completed, tenant added/updated, lease created/renewed, service charge calculated, penalty applied, and many more.",
      },
      {
        q: "How secure are webhooks?",
        a: "Webhooks use authentication tokens and can be configured with SSL/TLS. Each webhook request includes a signature that you can verify to ensure it's coming from Nyumba Zetu.",
      },
      {
        q: "What happens if my webhook endpoint is down?",
        a: "The system includes retry logic with exponential backoff. Failed webhook deliveries are retried multiple times, and you can view the delivery status and history in the webhook dashboard.",
      },
      {
        q: "Can I use webhooks to call other APIs?",
        a: "Yes, you can configure webhooks to call external APIs, send emails, trigger SMS notifications, or execute any HTTP-based workflow. The webhook payload includes all relevant event data in JSON format.",
      },
      {
        q: "Can I filter which events trigger webhooks?",
        a: "Yes, you can configure webhooks to only trigger for specific events, properties, tenants, or based on custom conditions. For example, only send webhooks for payments over a certain amount.",
      },
      {
        q: "How do I test webhooks?",
        a: "The system includes a webhook testing tool that lets you trigger test events and verify your endpoint is receiving data correctly. You can also view webhook delivery logs and response codes.",
      },
    ],
  },
  listings: {
    title: "Property Listings Platform for Kenyan Real Estate",
    description: "Browse and search verified apartments, maisonettes, and TPS homes across Kenya with advanced filtering and search capabilities.",
    what: "Nyumba Zetu's Property Listings feature provides a comprehensive platform for browsing and discovering verified rental properties across Kenya. Whether you're looking for apartments in Nairobi, maisonettes in Mombasa, or TPS homes in various cities, the listings platform offers an intuitive search experience with detailed property information, high-quality images, and direct contact options.",
    how: "Property owners and managers can list their properties through the Nyumba Zetu platform, providing details such as location, size, rent, amenities, and property type. The listings are verified to ensure accuracy and quality. Tenants and prospective renters can browse listings using advanced filters including location (city and area), property type, rent range, number of bedrooms, and amenities. The search functionality includes text search for specific keywords, sorting options (by price, date, recommended), and pagination for easy navigation. Each listing includes comprehensive details, multiple images, location information, and a direct contact option to reach property owners or managers. The platform supports various property types including apartments, maisonettes, houses, and TPS (Tenant Purchase Scheme) properties.",
    why: "Finding the right rental property in Kenya can be challenging, with information scattered across multiple platforms and limited verification. Nyumba Zetu's Property Listings platform centralizes verified property information, making it easier for tenants to find suitable homes and for property owners to reach qualified tenants. The advanced search and filtering capabilities save time for both parties, while verification ensures that listings are accurate and trustworthy. For property managers using Nyumba Zetu, the listings feature integrates seamlessly with property management workflows, allowing them to showcase available units directly from their property portfolio.",
    faqs: [
      {
        q: "What types of properties are listed?",
        a: "The platform includes apartments, maisonettes, houses, and TPS (Tenant Purchase Scheme) properties across various cities in Kenya, with a focus on Nairobi and other major urban centers.",
      },
      {
        q: "How are listings verified?",
        a: "Listings are verified to ensure accuracy of property details, location, and availability. Property owners and managers must provide accurate information, and the platform includes verification processes to maintain quality.",
      },
      {
        q: "Can I filter listings by location?",
        a: "Yes, you can filter listings by city and area, allowing you to find properties in specific neighborhoods or regions across Kenya.",
      },
      {
        q: "How do I contact a property owner?",
        a: "Each listing includes contact information and a direct contact option, allowing you to reach out to property owners or managers to inquire about the property or schedule a viewing.",
      },
      {
        q: "Can property managers list their properties?",
        a: "Yes, property managers using Nyumba Zetu can list available properties directly from their property portfolio, making it easy to showcase units to prospective tenants.",
      },
      {
        q: "Are TPS properties included?",
        a: "Yes, the platform includes Tenant Purchase Scheme (TPS) properties, allowing you to search for rent-to-own opportunities alongside traditional rental properties.",
      },
    ],
  },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const feature = features[slug];
  if (!feature) return { title: "Feature Not Found" };
  
  return {
    title: `${feature.title} | Nyumba Zetu`,
    description: feature.description,
  };
}

export default async function FeaturePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const feature = features[slug];
  
  if (!feature) {
    notFound();
  }

  return (
    <>
      <FeatureViewTracker featureSlug={slug} />
      <Section className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 pt-16 md:pt-20 lg:pt-24">
        <SectionHeader
          title={feature.title}
          description={feature.description}
        />
      </Section>

      {/* Feature Screenshot Placeholder */}
      <Section>
        <div className="max-w-5xl mx-auto mb-12">
          <div className="aspect-video bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-center shadow-lg">
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-4 bg-slate-300 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                <div className="w-24 h-24 bg-slate-400 dark:bg-slate-600 rounded"></div>
              </div>
              {/* <p className="text-slate-700 dark:text-slate-300 font-medium mb-1">Feature Screenshot</p> */}
              <p className="text-slate-600 dark:text-slate-400 text-sm">{feature.title} interface preview</p>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4">What It Is</h2>
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">{feature.what}</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4">How It Works</h2>
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">{feature.how}</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4">Why It Matters</h2>
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">{feature.why}</p>
          </div>
        </div>
      </Section>

      <Section className="bg-slate-50 dark:bg-slate-900">
        <SectionHeader
          title="Frequently Asked Questions"
          description="Common questions about this feature."
        />
        <div className="max-w-3xl mx-auto space-y-4">
          {feature.faqs.map((faq, idx) => (
            <Card key={idx}>
              <CardHeader>
                <CardTitle className="text-lg">{faq.q}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400">{faq.a}</p>
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


