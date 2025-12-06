import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";

const segments: Record<string, {
  title: string;
  description: string;
  pains: string[];
  solutions: string[];
  features: string[];
  what: string;
  how: string;
  why: string;
  useCases: string[];
  faqs: { q: string; a: string }[];
}> = {
  landlords: {
    title: "Property Management Software for Landlords & Agents in Kenya",
    description: "Individual property owners and real estate agents managing residential and commercial portfolios.",
    pains: [
      "Manual rent collection and tracking across spreadsheets",
      "Difficulty communicating with tenants and tracking payments",
      "No real-time visibility into portfolio performance",
      "Time-consuming accounting and tax preparation",
    ],
    solutions: [
      "Automated rent collection with M-Pesa and bank integration",
      "Tenant portal for self-service payments and communication",
      "Real-time portfolio dashboards and performance metrics",
      "Simplified accounting with automated journal entries",
    ],
    features: [
      "Rent & Service Charge Collections",
      "Tenant Portal & Mobile App",
      "Portfolio Dashboards",
      "Basic Accounting & Reports",
    ],
    what: "Nyumba Zetu provides individual landlords and real estate agents with a complete property management platform designed for the Kenyan market. Whether you're managing one property or a growing portfolio, the system automates rent collection, tenant communication, and financial tracking—all from one platform.",
    how: "Set up your properties and tenants in minutes. The system automatically generates rent invoices and sends reminders to tenants. When payments come in via M-Pesa or bank transfer, they're automatically matched and reconciled. You get real-time dashboards showing collection rates, occupancy, and financial performance. The tenant portal lets tenants pay online, submit maintenance requests, and communicate directly—reducing your administrative burden.",
    why: "Managing properties manually with spreadsheets and WhatsApp is time-consuming and error-prone. As your portfolio grows, it becomes impossible to track everything. Nyumba Zetu automates the routine tasks so you can focus on growing your portfolio and building relationships with tenants.",
    useCases: [
      "Individual landlords managing 1-20 residential units",
      "Real estate agents managing properties for multiple clients",
      "Property owners with mixed residential and commercial portfolios",
      "Landlords looking to scale their property investment business",
    ],
    faqs: [
      {
        q: "How many properties can I manage?",
        a: "Nyumba Zetu scales from a single property to hundreds. The platform is designed to grow with your portfolio.",
      },
      {
        q: "Do I need accounting knowledge to use this?",
        a: "No, the system handles accounting automatically. Every transaction posts correctly to the general ledger, and you can generate financial reports with one click.",
      },
      {
        q: "Can tenants pay through M-Pesa?",
        a: "Yes, tenants can pay directly through M-Pesa, and payments are automatically reconciled in the system.",
      },
    ],
  },
  managers: {
    title: "Property Management Software for Property Managers & Management Companies in Kenya",
    description: "Professional property management firms handling multiple properties and portfolios.",
    pains: [
      "Managing multiple properties across different systems",
      "Lack of team collaboration and workflow automation",
      "Client reporting and owner communication challenges",
      "Complex accounting across multiple portfolios",
    ],
    solutions: [
      "Multi-property portfolio management in one platform",
      "Team collaboration tools and automated workflows",
      "Client reporting and owner portals with real-time data",
      "Advanced accounting with consolidated financial reports",
    ],
    features: [
      "Multi-Property Management",
      "Team Collaboration",
      "Owner Portals & Reporting",
      "Advanced Accounting & GL",
    ],
    what: "Nyumba Zetu is built for professional property management companies that need to manage multiple properties, teams, and clients efficiently. The platform provides enterprise-grade tools for portfolio management, team collaboration, client reporting, and financial accounting—all designed for the Kenyan market.",
    how: "Manage all properties and portfolios from a single dashboard. Assign team members to specific properties or portfolios with role-based permissions. Automated workflows handle routine tasks like rent reminders and payment reconciliation. Owner portals provide real-time access to financial reports, occupancy data, and property performance. The accounting system consolidates all properties into unified financial statements while maintaining separate reporting for each property or client.",
    why: "Professional property management companies need enterprise-grade tools that scale. Managing properties across spreadsheets, multiple systems, and manual processes creates inefficiencies and errors. Nyumba Zetu provides the infrastructure serious property management firms need to deliver professional service at scale.",
    useCases: [
      "Property management companies managing 50+ properties",
      "Firms managing properties for multiple clients",
      "Companies with distributed teams across different locations",
      "Management firms requiring detailed client reporting",
    ],
    faqs: [
      {
        q: "Can I manage properties for multiple clients separately?",
        a: "Yes, you can organize properties by client, and each client gets their own owner portal with access only to their properties.",
      },
      {
        q: "How does team collaboration work?",
        a: "Assign team members to properties or portfolios with specific roles and permissions. All activities are logged, and team members can communicate and collaborate within the platform.",
      },
      {
        q: "Can I generate client reports automatically?",
        a: "Yes, owner portals provide real-time access to financial reports, and you can schedule automated monthly or quarterly reports.",
      },
    ],
  },
  committees: {
    title: "Property Management Software for Committees & HOAs in Kenya",
    description: "Housing estate committees and homeowners associations managing shared spaces and service charges.",
    pains: [
      "Service charge collection and transparency issues",
      "Difficulty tracking committee decisions and voting",
      "Resident communication and announcement challenges",
      "Lack of audit-ready financial records",
    ],
    solutions: [
      "Automated service charge collection with full transparency",
      "Committee decision tracking and voting workflows",
      "Resident communication hub with announcements",
      "Audit-ready financial records and reporting",
    ],
    features: [
      "Service Charge Management",
      "Committee Workflows",
      "Resident Communication",
      "Financial Transparency",
    ],
    what: "Nyumba Zetu provides housing estate committees and HOAs with specialized tools for managing service charges, committee operations, and resident communication. The platform ensures transparency, automates collections, and maintains audit-ready financial records.",
    how: "Set up service charge schedules based on unit sizes or fixed amounts. The system automatically generates invoices and sends reminders to residents. Committee members can track decisions, manage voting, and document meeting minutes. The resident portal provides transparency into service charge usage, financial statements, and announcements. All financial transactions are recorded in the general ledger with full audit trails.",
    why: "Housing estates and HOAs require transparency and accountability. Manual service charge management leads to disputes, collection issues, and lack of trust. Nyumba Zetu provides the transparency and automation committees need to operate professionally and maintain resident confidence.",
    useCases: [
      "Housing estate committees managing service charges",
      "Homeowners associations (HOAs) with shared facilities",
      "Apartment complexes with common area maintenance",
      "Gated communities with security and utility management",
    ],
    faqs: [
      {
        q: "How does service charge calculation work?",
        a: "Service charges can be calculated based on unit size, fixed amounts, or custom formulas. The system automatically generates invoices based on your configuration.",
      },
      {
        q: "Can residents see how service charges are used?",
        a: "Yes, the resident portal provides transparency into service charge collections, expenses, and financial statements.",
      },
      {
        q: "How do we track committee decisions?",
        a: "The platform includes tools for documenting committee meetings, tracking decisions, and managing voting processes.",
      },
    ],
  },
  developers: {
    title: "Property Management Software for Developers & Estate Owners in Kenya",
    description: "Real estate developers and large estate owners managing mixed-use developments.",
    pains: [
      "Tracking development projects and phases",
      "Managing leases across multiple development phases",
      "Financial reporting for stakeholders and investors",
      "Coordination between sales, leasing, and management",
    ],
    solutions: [
      "Development project tracking with timelines and budgets",
      "Lease management across multiple phases and units",
      "Comprehensive financial reporting for stakeholders",
      "Integrated workflows for sales, leasing, and operations",
    ],
    features: [
      "Project Tracking",
      "Multi-Phase Lease Management",
      "Stakeholder Reporting",
      "Development Accounting",
    ],
    what: "Nyumba Zetu provides real estate developers and large estate owners with integrated tools for managing development projects, leases, and operations. Track projects from planning through completion, manage leases across multiple phases, and provide stakeholders with comprehensive financial reporting.",
    how: "Create development projects with timelines, budgets, and phases. Track progress, manage tasks, and monitor costs. As units are completed, transition them into the property management system for lease management and operations. The system maintains separate accounting for development costs and operational income, with consolidated reporting for stakeholders. Owner portals provide investors with real-time access to project status and financial performance.",
    why: "Real estate development requires coordination between development, sales, leasing, and operations. Managing these separately creates silos and inefficiencies. Nyumba Zetu integrates everything into one platform, providing developers with the visibility and control needed to manage complex projects and portfolios.",
    useCases: [
      "Real estate developers managing mixed-use developments",
      "Large estate owners with multiple phases and projects",
      "Developers transitioning from development to operations",
      "Estate owners requiring investor reporting and transparency",
    ],
    faqs: [
      {
        q: "Can I track development costs separately from operational income?",
        a: "Yes, the system maintains separate accounting for development projects and operational properties, with consolidated reporting available.",
      },
      {
        q: "How do I transition units from development to operations?",
        a: "As units are completed, you can easily transition them from the development project to the property management system for lease management.",
      },
      {
        q: "Can investors access their property performance?",
        a: "Yes, owner portals provide investors with real-time access to financial reports, occupancy data, and property performance metrics.",
      },
    ],
  },
  banks: {
    title: "Property Management Software for Banks & SACCOS / Mortgage Teams in Kenya",
    description: "Financial institutions managing mortgage portfolios and property-backed lending.",
    pains: [
      "Monitoring mortgage portfolio performance",
      "Property valuation and risk assessment challenges",
      "Regulatory compliance and reporting requirements",
      "Lack of real-time property and tenant data",
    ],
    solutions: [
      "Mortgage portfolio monitoring with real-time metrics",
      "Property valuation and risk assessment tools",
      "Regulatory compliance and reporting automation",
      "Integrated property and tenant data for lending decisions",
    ],
    features: [
      "Portfolio Monitoring",
      "Risk Assessment",
      "Compliance & Reporting",
      "Property Data Integration",
    ],
    what: "Nyumba Zetu provides banks, SACCOS, and mortgage teams with property management infrastructure for monitoring mortgage portfolios, assessing property risk, and ensuring regulatory compliance. The platform integrates property and tenant data to support lending decisions and portfolio management.",
    how: "Monitor mortgage portfolios with real-time dashboards showing property performance, occupancy rates, and collection metrics. Access property and tenant data to assess risk and make informed lending decisions. Automated reporting ensures regulatory compliance, and the system maintains audit trails for all property-related transactions. Integration with bank systems enables seamless data flow between property management and lending operations.",
    why: "Financial institutions need visibility into property performance to manage mortgage portfolios effectively. Without real-time property and tenant data, risk assessment is incomplete, and portfolio monitoring is reactive. Nyumba Zetu provides the property management infrastructure banks need to make data-driven lending decisions and monitor portfolio health.",
    useCases: [
      "Banks managing mortgage portfolios",
      "SACCOS with property-backed lending",
      "Mortgage teams requiring property performance data",
      "Financial institutions needing regulatory compliance reporting",
    ],
    faqs: [
      {
        q: "Can I integrate with existing bank systems?",
        a: "Yes, Nyumba Zetu provides APIs for integration with core banking systems and other financial platforms.",
      },
      {
        q: "What property data is available for risk assessment?",
        a: "The system provides comprehensive property data including occupancy rates, collection performance, maintenance history, and financial statements.",
      },
      {
        q: "How does regulatory compliance work?",
        a: "The system maintains complete audit trails and generates reports required for regulatory compliance. All transactions are properly documented and traceable.",
      },
    ],
  },
  diaspora: {
    title: "Property Management Software for Diaspora in Kenya",
    description: "Kenyans living abroad managing property investments and rentals back home in Kenya.",
    pains: [
      "Difficulty monitoring property from overseas",
      "Challenges with rent collection and tenant communication across time zones",
      "Lack of real-time visibility into property performance and maintenance",
      "Complex currency conversions and international payment transfers",
      "Dependency on family or friends for property management",
    ],
    solutions: [
      "Real-time property dashboards accessible from anywhere in the world",
      "Automated rent collection with M-Pesa and bank integration",
      "Tenant portal and mobile app for direct communication",
      "Automated maintenance request management with photo updates",
      "Multi-currency support and international payment options",
      "Owner portal with live financial statements and reports",
    ],
    features: [
      "Remote Property Monitoring",
      "Automated Rent Collection",
      "Tenant Communication Portal",
      "Maintenance Management",
      "Multi-Currency Support",
      "Owner Financial Reports",
    ],
    what: "Nyumba Zetu is designed for Kenyans living abroad who want to manage property investments back home professionally. The platform provides real-time visibility, automated rent collection, and direct tenant communication—all accessible from anywhere in the world.",
    how: "Access your property dashboard from anywhere via web or mobile app. Rent collection is automated through M-Pesa and bank integration, with payments automatically reconciled and visible in real-time. Tenants can communicate directly through the portal, submit maintenance requests with photos, and make payments online. Maintenance requests are automatically routed to property managers or vendors, with photo updates and completion tracking. Financial reports are available in multiple currencies, and you can receive funds internationally through integrated payment options.",
    why: "Managing property from abroad is challenging. Relying on family or friends creates dependency and lack of control. Without real-time visibility, you can't make informed decisions or respond quickly to issues. Nyumba Zetu gives diaspora property owners the tools and visibility they need to manage investments professionally from anywhere in the world.",
    useCases: [
      "Kenyans living abroad managing rental properties in Kenya",
      "Diaspora investors with multiple property investments",
      "Property owners requiring remote monitoring and control",
      "Investors needing multi-currency financial reporting",
    ],
    faqs: [
      {
        q: "Can I access the system from anywhere in the world?",
        a: "Yes, Nyumba Zetu is cloud-based and accessible from anywhere via web browser or mobile app.",
      },
      {
        q: "How do I receive rent payments internationally?",
        a: "Rent payments are collected in Kenya via M-Pesa or bank transfer, and you can receive funds through integrated international payment options or bank transfers.",
      },
      {
        q: "Can I see maintenance issues in real-time?",
        a: "Yes, maintenance requests are submitted with photos and updates, and you receive notifications in real-time. You can track progress and approve expenses remotely.",
      },
    ],
  },
};

export async function generateMetadata({ params }: { params: Promise<{ segment: string }> }) {
  const { segment: segmentSlug } = await params;
  const segment = segments[segmentSlug];
  if (!segment) return { title: "Solution Not Found" };
  
  return {
    title: `${segment.title} | Nyumba Zetu`,
    description: segment.description,
  };
}

export default async function SolutionPage({ params }: { params: Promise<{ segment: string }> }) {
  const { segment: segmentSlug } = await params;
  const segment = segments[segmentSlug];
  
  if (!segment) {
    notFound();
  }

  return (
    <>
      <Section className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 pt-16 md:pt-20 lg:pt-24">
        <SectionHeader
          title={segment.title}
          description={segment.description}
        />
      </Section>

      <Section>
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <Card className="border-red-200 dark:border-red-900/50 bg-red-50/50 dark:bg-red-900/10">
            <CardHeader>
              <CardTitle className="text-2xl text-slate-900 dark:text-slate-50">Their World Today</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {segment.pains.map((pain, idx) => (
                  <li key={idx} className="text-slate-700 dark:text-slate-300 flex items-start">
                    <span className="text-red-500 dark:text-red-400 mr-2">•</span>
                    {pain}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-tertiary dark:border-tertiary/50 bg-tertiary/10 dark:bg-tertiary/5">
            <CardHeader>
              <CardTitle className="text-2xl text-slate-900 dark:text-slate-50">How Nyumba Zetu Helps</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {segment.solutions.map((solution, idx) => (
                  <li key={idx} className="text-slate-700 dark:text-slate-300 flex items-start">
                    <span className="text-tertiary mr-2">•</span>
                    {solution}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section className="bg-slate-50 dark:bg-slate-900">
        <div className="max-w-4xl mx-auto space-y-12">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4">What It Is</h2>
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">{segment.what}</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4">How It Works</h2>
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">{segment.how}</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4">Why It Matters</h2>
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">{segment.why}</p>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeader
          title="Key Features for This Segment"
          description="Features specifically designed to address the needs of this segment."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {segment.features.map((feature, idx) => (
            <Card key={idx} className="hover:shadow-md transition-all duration-200">
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold text-slate-900 dark:text-slate-50">{feature}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="bg-slate-50 dark:bg-slate-900">
        <SectionHeader
          title="Common Use Cases"
          description="How organizations in this segment use Nyumba Zetu."
        />
        <div className="max-w-3xl mx-auto">
          <ul className="space-y-4">
            {segment.useCases.map((useCase, idx) => (
              <li key={idx} className="flex items-start space-x-3">
                <span className="text-primary mt-1">✓</span>
                <span className="text-slate-700 dark:text-slate-300 text-lg">{useCase}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section>
        <SectionHeader
          title="Frequently Asked Questions"
          description="Common questions about this solution."
        />
        <div className="max-w-3xl mx-auto space-y-6">
          {segment.faqs.map((faq, idx) => (
            <Card key={idx}>
              <CardHeader>
                <CardTitle className="text-lg text-slate-900 dark:text-slate-50">{faq.q}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400">{faq.a}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="bg-slate-50 dark:bg-slate-900">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-4">
            Ready to transform your property operations?
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
            See how Nyumba Zetu can help your team increase efficiency and improve results.
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


