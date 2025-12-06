import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "Press - Nyumba Zetu",
  description: "Press releases and media information about Nyumba Zetu",
};

export default function PressPage() {
  return (
    <>
      <Section className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 pt-16 md:pt-20 lg:pt-24">
        <SectionHeader
          title="Press & Media"
          description="Latest news, press releases, and media resources"
        />
      </Section>

      <Section>
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-6 md:p-8">
              <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                For press inquiries, media requests, or interview opportunities, please contact us at{" "}
                <a href="mailto:admin@nyumbazetu.com" className="text-primary hover:underline">
                  admin@nyumbazetu.com
                </a>
              </p>
            </CardContent>
          </Card>
        </div>
      </Section>
    </>
  );
}


