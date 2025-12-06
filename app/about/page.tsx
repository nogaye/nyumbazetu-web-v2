import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "About Nyumba Zetu",
  description: "Learn about Nyumba Zetu's mission to transform property management in Kenya through technology and innovation.",
};

export default function AboutPage() {
  return (
    <>
      <Section className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 pt-16 md:pt-20 lg:pt-24">
        <SectionHeader
          title="About Nyumba Zetu"
          description="Building the infrastructure for modern property operations in Kenya."
        />
      </Section>

      <Section>
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Team/Office Photo Placeholder */}
          <div className="aspect-video bg-slate-200 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 flex items-center justify-center mb-6">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-4 bg-slate-300 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                <div className="w-16 h-16 bg-slate-400 dark:bg-slate-600 rounded"></div>
              </div>
              <p className="text-slate-700 dark:text-slate-300 font-medium mb-1">Team Photo / Office Image</p>
              <p className="text-slate-600 dark:text-slate-400 text-sm">Nyumba Zetu team or Nairobi office</p>
            </div>
          </div>
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-4 tracking-tight">
              About Nyumba Zetu
            </h2>
            <p className="text-lg text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
              Property management is a complex and multifaceted process that requires a great deal of time and effort. From managing tenants and collecting rent to maintaining the property and handling repairs, property managers and landlords have a lot on their plate. Fortunately, property management software can help streamline these processes, making them more efficient and effective.
            </p>
            <p className="text-lg text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
              At Nyumba Zetu, we offer a comprehensive property management solution that simplifies the entire process. Our software is designed to help landlords and property managers manage their properties with ease and efficiency.
            </p>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-4 tracking-tight mt-8">
              Our Mission
            </h2>
            <p className="text-lg text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
              Nyumba Zetu exists to transform how property is managed in Kenya. We believe that
              landlords, property managers, committees, developers, and banks deserve modern,
              reliable infrastructure for their property operations—not spreadsheets and WhatsApp chaos.
            </p>
              <p className="text-lg text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
              Our platform combines serious accounting-grade financial management with intuitive
              tenant and owner experiences, all built specifically for the Kenyan market.
            </p>
          </div>
        </div>
      </Section>

      <Section className="bg-slate-50 dark:bg-slate-900">
        <SectionHeader
          title="Our Story"
          description="🇰🇪 Proudly built in Kenya, for Kenya."
        />
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-6 md:p-8">
              <p className="text-lg text-slate-700 dark:text-slate-300 mb-4 leading-relaxed">
                Nyumba Zetu was founded by a team of property professionals and technologists who
                experienced firsthand the challenges of managing property portfolios in Kenya.
                We saw the gap between what property teams needed and what existing solutions offered.
              </p>
              <p className="text-lg text-slate-700 dark:text-slate-300 mb-4 leading-relaxed">
                Unlike generic property management software built for other markets, Nyumba Zetu
                was designed from day one for Kenyan real estate: M-Pesa integration, service
                charge management, committee workflows, KRA eTIMS compliance, and the unique
                needs of the local market.
              </p>
              <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                Today, we serve property teams across Kenya—from individual landlords to large
                estate developers and financial institutions. Our platform processes thousands of
                transactions monthly and helps property teams increase collections, reduce
                administrative overhead, and provide better experiences for tenants and owners.
              </p>
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section>
        <SectionHeader
          title="Kenyan Focus"
          description="Every feature is built with the Kenyan market in mind."
        />
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {[
            {
              title: "Local Payment Methods",
              description: "M-Pesa, bank transfers, and mobile wallets integrated from day one.",
            },
            {
              title: "Kenyan Regulations",
              description: "KRA eTIMS, tax compliance, and audit-ready workflows built in.",
            },
            {
              title: "Local Support",
              description: "Our team understands Kenyan property management and is here to help.",
            },
          ].map((item, idx) => (
            <Card key={idx} className="hover:shadow-md transition-all duration-200">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3">
                  {item.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="bg-slate-50 dark:bg-slate-900">
        <SectionHeader
          title="Partnerships"
          description="Working with leading institutions in Kenya."
        />
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-6 md:p-8">
              <p className="text-lg text-slate-700 dark:text-slate-300 mb-4 leading-relaxed">
                Nyumba Zetu partners with banks, SACCOS, property management companies, and
                real estate developers to provide enterprise-grade property management solutions.
              </p>
              <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                If you're interested in partnering with us, please{" "}
                <a href="/contact" className="text-primary hover:underline font-medium">
                  get in touch
                </a>
                .
              </p>
            </CardContent>
          </Card>
        </div>
      </Section>
    </>
  );
}


