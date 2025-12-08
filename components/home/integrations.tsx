"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";

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
          <motion.div
            key={integration.name}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
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
                />
              </div>
              <span className="text-slate-600 dark:text-slate-400 font-medium text-xs text-center">
                {integration.name}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}


