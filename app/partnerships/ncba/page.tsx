import Image from "next/image";
import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata = {
  title: "NCBA Bank Partnership - Nyumba Zetu",
  description: "Learn about Nyumba Zetu's strategic partnership with NCBA Bank for property management solutions and collection services.",
};

export default function NCBAPartnershipPage() {
  return (
    <>
      <Section className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 pt-16 md:pt-20 lg:pt-24">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-32 h-32 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center border border-slate-200 dark:border-slate-700 flex-shrink-0 p-3">
              <Image
                src="/legacy/images/logos/small-logos/logo-ncba.jpeg"
                alt="NCBA Bank logo"
                width={112}
                height={112}
                className="object-contain w-full h-full"
              />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-50 mb-2">
                NCBA Bank Partnership
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Strategic partnership for property management solutions
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4">
              About the Partnership
            </h2>
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              NCBA Bank has partnered with Zetu Innovations to bring landlords, property managers, developers, and homeowners' associations a simple and secure way to manage properties through the Nyumba Zetu platform. This strategic partnership enables NCBA customers to leverage Nyumba Zetu's comprehensive property management infrastructure.
            </p>
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              As part of NCBA's Collection Solutions, Nyumba Zetu is featured as a key offering for property management, allowing customers to automate rent collection, track payments, manage tenants, and generate reports—all in one place.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4">
              Key Benefits
            </h2>
            <ul className="space-y-3 text-lg text-slate-700 dark:text-slate-300">
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span>Real-time rent tracking and reconciliation</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span>Secure cloud-based access anytime, anywhere</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span>Smart dashboards and automated reporting</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span>Integrated with NCBA's real estate financing solutions</span>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              NCBA customers can access Nyumba Zetu through NCBA's Collection Solutions platform. The integration allows seamless property management operations, with rent collections and payments flowing directly through NCBA's banking infrastructure.
            </p>
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              Property owners and managers using Nyumba Zetu through NCBA benefit from the bank's extensive branch network, digital banking services, and real estate financing products, creating a comprehensive ecosystem for property management in Kenya.
            </p>
          </div>

          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-2">
                Learn More About NCBA Collection Solutions
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Visit NCBA's website to learn more about their Collection Solutions and how Nyumba Zetu fits into their property management offerings.
              </p>
              <Button asChild>
                <a href="https://ke.ncbagroup.com/for-corporates/collection-solutions/" target="_blank" rel="noopener noreferrer">
                  Visit NCBA Collection Solutions
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section className="bg-slate-50 dark:bg-slate-900">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-4">
            Interested in Using Nyumba Zetu Through NCBA?
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
            Contact us to learn more about accessing Nyumba Zetu through NCBA Bank's Collection Solutions.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/partnerships">View All Partnerships</Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}

