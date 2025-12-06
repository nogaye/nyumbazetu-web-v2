import { LegacyHomeHeader } from "@/components/legacy/home/legacy-home-header";
import { LegacyTransactions } from "@/components/legacy/home/legacy-transactions";
import { LegacyHeadline } from "@/components/legacy/home/legacy-headline";
import { LegacyAwards } from "@/components/legacy/home/legacy-awards";
import { LegacyPortfolio } from "@/components/legacy/home/legacy-portfolio";
import { LegacyFeatures } from "@/components/legacy/home/legacy-features";
import { LegacyScreenshots } from "@/components/legacy/home/legacy-screenshots";
import { LegacyIntegrations } from "@/components/legacy/home/legacy-integrations";
import { LegacyStats } from "@/components/legacy/home/legacy-stats";
import { LegacyTestimonials } from "@/components/legacy/home/legacy-testimonials";
import { LegacyPartners } from "@/components/legacy/home/legacy-partners";
import { LegacyRequestDemo } from "@/components/legacy/home/legacy-request-demo";
import { LegacyClients } from "@/components/legacy/home/legacy-clients";
import { LegacyReferral } from "@/components/legacy/home/legacy-referral";
import { LegacyMobileApp } from "@/components/legacy/home/legacy-mobile-app";

export const metadata = {
  title: "Legacy Home | Nyumba Zetu",
  description: "Legacy home page from Angular application",
};

export default function HomeLegacyPage() {
  return (
    <>
      <LegacyHomeHeader />
      <div className="container mx-auto px-4">
        <hr className="border-t border-slate-200 dark:border-slate-800 w-1/2 mx-auto my-8" />
      </div>
      <LegacyTransactions />
      <LegacyHeadline />
      <LegacyAwards />
      <LegacyPortfolio />
      <LegacyFeatures />
      <div className="container mx-auto px-4">
        <hr className="border-t border-slate-200 dark:border-slate-800 w-1/2 mx-auto my-8" />
      </div>
      <LegacyScreenshots />
      <LegacyIntegrations />
      <LegacyStats />
      <LegacyTestimonials />
      <LegacyPartners />
      <LegacyRequestDemo />
      <LegacyClients />
      <LegacyReferral />
      <LegacyMobileApp />
    </>
  );
}


