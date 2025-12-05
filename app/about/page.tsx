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
      <Section className="bg-gradient-to-br from-slate-50 to-white pt-24">
        <SectionHeader
          title="About Nyumba Zetu"
          description="Building the infrastructure for modern property operations in Kenya."
        />
      </Section>

      <Section>
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Mission</h2>
            <p className="text-lg text-slate-700 mb-6">
              Nyumba Zetu exists to transform how property is managed in Kenya. We believe that
              landlords, property managers, committees, developers, and banks deserve modern,
              reliable infrastructure for their property operations—not spreadsheets and WhatsApp chaos.
            </p>
            <p className="text-lg text-slate-700 mb-6">
              Our platform combines serious accounting-grade financial management with intuitive
              tenant and owner experiences, all built specifically for the Kenyan market.
            </p>
          </div>
        </div>
      </Section>

      <Section className="bg-slate-50">
        <SectionHeader
          title="Our Story"
          description="Built in Kenya, for Kenya."
        />
        <div className="max-w-4xl mx-auto space-y-6">
          <Card>
            <CardContent className="p-8">
              <p className="text-lg text-slate-700 mb-4">
                Nyumba Zetu was founded by a team of property professionals and technologists who
                experienced firsthand the challenges of managing property portfolios in Kenya.
                We saw the gap between what property teams needed and what existing solutions offered.
              </p>
              <p className="text-lg text-slate-700 mb-4">
                Unlike generic property management software built for other markets, Nyumba Zetu
                was designed from day one for Kenyan real estate: M-Pesa integration, service
                charge management, committee workflows, KRA eTIMS compliance, and the unique
                needs of the local market.
              </p>
              <p className="text-lg text-slate-700">
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
        <div className="grid md:grid-cols-3 gap-6">
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
            <Card key={idx}>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="bg-slate-50">
        <SectionHeader
          title="Partnerships"
          description="Working with leading institutions in Kenya."
        />
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-8">
              <p className="text-lg text-slate-700 mb-4">
                Nyumba Zetu partners with banks, SACCOS, property management companies, and
                real estate developers to provide enterprise-grade property management solutions.
              </p>
              <p className="text-lg text-slate-700">
                If you're interested in partnering with us, please{" "}
                <a href="/contact" className="text-[#b98036] hover:underline font-medium">
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


