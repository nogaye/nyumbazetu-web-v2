"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import { Button } from "@/components/ui/button";

const integrations = [
  {
    name: "QuickBooks",
    logo: "/legacy/images/logos/small-logos/quickbooks.png",
  },
  {
    name: "M-Pesa",
    logo: "/legacy/images/logos/small-logos/logo-mpesa.svg",
  },
  {
    name: "NCBA Bank",
    logo: "/legacy/images/logos/small-logos/logo-ncba.jpeg",
  },
  {
    name: "Boma Yangu",
    logo: "/legacy/images/logos/small-logos/boma-yangu-logo.png",
  },
  {
    name: "eCitizen",
    logo: "/legacy/images/logos/small-logos/ecitizen-logo.svg",
  },
  {
    name: "KRA eTIMS",
    logo: "/legacy/images/logos/small-logos/kra-logo.webp",
  },
  {
    name: "WhatsApp",
    logo: "/legacy/images/logos/small-logos/logo-whatsapp.svg",
  },
];

export function Integrations() {
  return (
    <Section className="bg-white dark:bg-slate-950">
      <SectionHeader
        title="Plug into the tools that already run your business."
        description="Nyumba Zetu becomes the operational and financial source of truth, while your bank, M-Pesa channels, and accounting tools stay connected."
      />
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6 lg:gap-8 items-center">
        {integrations.map((integration, idx) => (
          <div
            key={integration.name}
            className="h-24 flex items-center justify-center bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-primary dark:hover:border-primary hover:shadow-sm transition-all duration-200 p-4"
          >
            <div className="w-full h-full flex flex-col items-center justify-center gap-2">
              <div className="w-16 h-16 flex items-center justify-center">
                <Image
                  src={integration.logo}
                  alt={`${integration.name} logo`}
                  width={64}
                  height={64}
                  className="object-contain w-full h-full"
                  quality={75}
                />
              </div>
              <span className="text-slate-600 dark:text-slate-400 font-medium text-xs text-center">
                {integration.name}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <Button size="lg" variant="outline" asChild>
          <Link href="/integrations" className="flex items-center gap-2">
            View integration details
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </Section>
  );
}


