import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Partners - Nyumba Zetu",
  description: "Partner with Nyumba Zetu to grow your property management business",
};

export default function PartnerPage() {
  return (
    <>
      <Section className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 pt-16 md:pt-20 lg:pt-24">
        <SectionHeader
          title="Partner with Us"
          description="Join our partner network and help transform property management in Kenya"
        />
      </Section>

      <Section>
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-6 md:p-8">
              <p className="text-lg text-slate-700 dark:text-slate-300 mb-4 leading-relaxed">
                Nyumba Zetu partners with banks, SACCOS, property management companies, and real estate developers to provide enterprise-grade property management solutions.
              </p>
              <p className="text-lg text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
                If you&apos;re interested in partnering with us, please get in touch.
              </p>
              <Button size="lg" asChild>
                <a href="/contact">Contact Us</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </Section>
    </>
  );
}


