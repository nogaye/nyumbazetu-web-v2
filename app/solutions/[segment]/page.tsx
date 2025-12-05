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
  },
};

export async function generateMetadata({ params }: { params: { segment: string } }) {
  const segment = segments[params.segment];
  if (!segment) return { title: "Solution Not Found" };
  
  return {
    title: `${segment.title} | Nyumba Zetu`,
    description: segment.description,
  };
}

export default function SolutionPage({ params }: { params: { segment: string } }) {
  const segment = segments[params.segment];
  
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
          <Card className="border-red-200 bg-red-50/50">
            <CardHeader>
              <CardTitle className="text-2xl">Their World Today</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {segment.pains.map((pain, idx) => (
                  <li key={idx} className="text-slate-700 flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    {pain}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-[#36b9a0] bg-[#36b9a0]/10">
            <CardHeader>
              <CardTitle className="text-2xl">How Nyumba Zetu Helps</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {segment.solutions.map((solution, idx) => (
                  <li key={idx} className="text-slate-700 flex items-start">
                    <span className="text-[#36b9a0] mr-2">•</span>
                    {solution}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section className="bg-slate-50">
        <SectionHeader
          title="Key Features for This Segment"
          description="Features specifically designed to address the needs of this segment."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {segment.features.map((feature, idx) => (
            <Card key={idx}>
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold text-slate-900">{feature}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Ready to transform your property operations?
          </h2>
          <p className="text-lg text-slate-600 mb-8">
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


