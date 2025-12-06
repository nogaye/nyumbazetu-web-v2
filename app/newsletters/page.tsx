import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import { NewsletterSignup } from "@/components/newsletter-signup";

export const metadata = {
  title: "Newsletters - Nyumba Zetu",
  description: "Subscribe to our newsletters for property management insights",
};

export default function NewslettersPage() {
  return (
    <>
      <Section className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 pt-16 md:pt-20 lg:pt-24">
        <SectionHeader
          title="Subscribe To Our Newsletters"
          description="Stay updated with the latest property management insights, tips, and industry news"
        />
      </Section>

      <Section>
        <div className="max-w-2xl mx-auto">
          <NewsletterSignup />
        </div>
      </Section>
    </>
  );
}


