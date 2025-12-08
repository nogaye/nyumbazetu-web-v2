import Image from "next/image";
import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata = {
  title: "AIESEC Partnership - Nyumba Zetu",
  description: "Learn about Nyumba Zetu's partnership with AIESEC, an international students association.",
};

export default function AIESECPartnershipPage() {
  return (
    <>
      <Section className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 pt-16 md:pt-20 lg:pt-24">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-32 h-32 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center border border-slate-200 dark:border-slate-700 flex-shrink-0 p-3">
              <Image
                src="/legacy/images/logos/small-logos/aiesec-logo.png"
                alt="AIESEC logo"
                width={112}
                height={112}
                className="object-contain w-full h-full"
              />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-50 mb-2">
                AIESEC Partnership
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Partnership with international students association
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
              Nyumba Zetu has partnered with AIESEC, the world's largest youth-run organization, to support talent development and innovation in property management technology. This partnership provides opportunities for international exchange, internships, and collaboration with young professionals from around the world.
            </p>
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              Through this partnership, we work with AIESEC to bring fresh perspectives, international talent, and innovative ideas to the Kenyan property management technology sector, while providing valuable learning and development opportunities for students and young professionals.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4">
              Partnership Benefits
            </h2>
            <ul className="space-y-3 text-lg text-slate-700 dark:text-slate-300">
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span>Access to international talent and fresh perspectives</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span>Internship and exchange programs for students and young professionals</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span>Cross-cultural collaboration and knowledge sharing</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span>Innovation in property management technology through diverse perspectives</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span>Supporting youth development and professional growth in Kenya</span>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4">
              About AIESEC
            </h2>
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              AIESEC is a global platform for young people to explore and develop their leadership potential. With a presence in over 120 countries and territories, AIESEC facilitates international exchange programs, internships, and volunteer opportunities that enable young people to make a positive impact on society.
            </p>
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              Through our partnership with AIESEC, Nyumba Zetu contributes to developing the next generation of technology leaders while bringing international perspectives to the Kenyan property management sector.
            </p>
          </div>

          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-2">
                Learn More About AIESEC
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Visit AIESEC's website to learn more about their programs and opportunities for young professionals.
              </p>
              <Button asChild>
                <a href="https://aiesec.org/" target="_blank" rel="noopener noreferrer">
                  Visit AIESEC Website
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section className="bg-slate-50 dark:bg-slate-900">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-4">
            Interested in Our Partnerships?
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
            Learn more about all our strategic partnerships and how we collaborate with organizations to transform property management in Kenya.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/partnerships">View All Partnerships</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}

