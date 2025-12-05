import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export const metadata = {
  title: "Resources | Nyumba Zetu",
  description: "Property management insights, guides, case studies, and webinars for Kenyan landlords and property managers.",
};

const resources = [
  {
    type: "Guide",
    title: "How to modernize rent collections in Kenya",
    description: "Best practices for transitioning from manual to automated rent collection.",
    date: "2024-01-15",
  },
  {
    type: "Case Study",
    title: "Service charge transparency for estates and apartments",
    description: "How one HOA increased transparency and reduced disputes by 60%.",
    date: "2024-01-10",
  },
  {
    type: "Blog",
    title: "Preparing for KRA audits as a property manager",
    description: "Essential steps to ensure your property records are audit-ready.",
    date: "2024-01-05",
  },
  {
    type: "Guide",
    title: "Setting up automated invoicing for property portfolios",
    description: "Step-by-step guide to configuring automated rent and service charge invoicing.",
    date: "2023-12-20",
  },
  {
    type: "Case Study",
    title: "How a property management company increased collections by 30%",
    description: "Real-world results from implementing Nyumba Zetu across a 100-unit portfolio.",
    date: "2023-12-15",
  },
  {
    type: "Webinar",
    title: "Introduction to property management accounting",
    description: "Learn the fundamentals of property accounting and general ledger management.",
    date: "2023-12-10",
  },
];

export default function ResourcesPage() {
  return (
    <>
      <Section className="bg-gradient-to-br from-slate-50 to-white pt-24">
        <SectionHeader
          title="Property management resources for the Kenyan market"
          description="Learn from industry experts, real-world case studies, and practical guides."
        />
      </Section>

      <Section>
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {["All", "Blog", "Guides", "Case Studies", "Webinars"].map((filter) => (
            <button
              key={filter}
              type="button"
              className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors"
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource, idx) => (
            <Card key={idx} className="h-full hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-xs font-semibold text-[#b98036] uppercase tracking-wider mb-2">
                  {resource.type}
                </div>
                <CardTitle className="text-xl">{resource.title}</CardTitle>
                <CardDescription>{resource.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-slate-500 mb-4">
                  {new Date(resource.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
                <Link
                  href="#"
                  className="text-sm font-medium text-[#b98036] hover:underline inline-flex items-center"
                >
                  Read more →
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}

