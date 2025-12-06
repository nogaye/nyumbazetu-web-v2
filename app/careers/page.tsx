import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Careers - Nyumba Zetu",
  description:
    "Explore exciting career opportunities at Nyumba Zetu. Join our team and be part of the leading Property Management Software provider in Kenya.",
};

export default function CareersPage() {
  return (
    <>
      <Section className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 pt-16 md:pt-20 lg:pt-24 relative">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: "url(/legacy/images/events/bg33.jpg)" }}
        />
        <div className="relative z-10">
          <div className="container mx-auto px-4">
            <div className="flex justify-center">
              <div className="w-full lg:w-2/3 text-center mt-5 mx-auto">
                <h4 className="text-primary text-lg font-semibold mb-4">Join Our Team</h4>
                <h1 className="text-white text-4xl md:text-5xl font-bold mb-6">
                  Empower Your Career with Opportunities and Innovation
                </h1>
                <p className="text-lg mt-5 text-white">
                  Send your resume to{" "}
                  <a
                    className="text-white hover:underline font-medium"
                    href="mailto:admin@nyumbazetu.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    admin@nyumbazetu.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-6 md:p-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4">
                Why Work at Nyumba Zetu?
              </h2>
              <p className="text-lg text-slate-700 dark:text-slate-300 mb-4 leading-relaxed">
                At Nyumba Zetu, we&apos;re building the future of property management in Kenya.
                We&apos;re looking for talented individuals who are passionate about technology,
                innovation, and making a real impact in the real estate industry.
              </p>
              <p className="text-lg text-slate-700 dark:text-slate-300 mb-4 leading-relaxed">
                We offer a dynamic work environment, competitive compensation, and opportunities
                for professional growth. Join us in transforming how property is managed in Kenya.
              </p>
              <div className="mt-6">
                <Button size="lg" asChild>
                  <a href="mailto:admin@nyumbazetu.com">Send Your Resume</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>
    </>
  );
}


