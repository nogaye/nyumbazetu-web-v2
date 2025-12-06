import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

export const metadata = {
  title: "Partnerships - Nyumba Zetu",
  description: "Learn about our strategic partnerships with leading financial institutions, government agencies, and organizations.",
};

const partnerships = [
  {
    name: "NCBA Bank",
    description: "Strategic partnership for property management solutions and collection services. NCBA Bank has partnered with Nyumba Zetu to offer automated rent collection, track payments, manage tenants, and generate reports—all in one place.",
    href: "/partnerships/ncba",
    logo: "/partnerships/ncba-logo.png",
    category: "Financial Institution",
  },
  {
    name: "Boma Yangu",
    description: "Integration partner for affordable housing and Tenant Purchase Scheme (TPS) solutions. Boma Yangu is integrated with Nyumba Zetu as part of our TPS platform.",
    href: "/partnerships/boma-yangu",
    logo: "/partnerships/boma-yangu-logo.png",
    category: "Government Agency",
  },
  {
    name: "HFC (Housing Finance)",
    description: "Collaboration on TPS and property finance solutions. We are working with HFC on Tenant Purchase Scheme implementations.",
    href: "/partnerships/hfc",
    logo: "/partnerships/hfc-logo.png",
    category: "Financial Institution",
  },
  {
    name: "AIESEC",
    description: "Partnership with AIESEC, an international students association, to support talent development and innovation in property management technology.",
    href: "/partnerships/aiesec",
    logo: "/partnerships/aiesec-logo.png",
    category: "International Organization",
  },
];

export default function PartnershipsPage() {
  return (
    <>
      <Section className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 pt-16 md:pt-20 lg:pt-24">
        <SectionHeader
          title="Our Partnerships"
          description="We collaborate with leading financial institutions, government agencies, and organizations to deliver comprehensive property management solutions for the Kenyan real estate market."
        />
      </Section>

      <Section>
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {partnerships.map((partner) => (
            <Card key={partner.name} className="hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center border border-slate-200 dark:border-slate-700 flex-shrink-0">
                    <div className="w-16 h-16 bg-slate-200 dark:bg-slate-700 rounded flex items-center justify-center">
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                        Logo
                      </span>
                    </div>
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
                        {partner.name}
                      </h3>
                      <span className="text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                        {partner.category}
                      </span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      {partner.description}
                    </p>
                  </div>
                </div>
                <Button variant="outline" asChild>
                  <Link href={partner.href} className="flex items-center gap-2">
                    Learn More About This Partnership
                    <ArrowRightIcon className="h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="bg-slate-50 dark:bg-slate-900">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-4">
              Partner with Us
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
              We're always looking for strategic partnerships that can help transform property management in Kenya. Get in touch to explore partnership opportunities.
            </p>
          </div>
          
          <Card className="mb-8">
            <CardContent className="p-6 md:p-8">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-4">
                Who We Partner With
              </h3>
              <p className="text-lg text-slate-700 dark:text-slate-300 mb-4 leading-relaxed">
                Nyumba Zetu partners with banks, SACCOS, property management companies, and real estate developers to provide enterprise-grade property management solutions.
              </p>
              <p className="text-lg text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
                If you&apos;re interested in partnering with us, please get in touch.
              </p>
              <Button size="lg" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </Section>
    </>
  );
}

