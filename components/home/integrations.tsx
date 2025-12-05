"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";

const integrations = [
  "QuickBooks",
  "M-Pesa",
  "NCBA Bank",
  "KRA eTIMS",
  "Email/SMS",
];

export function Integrations() {
  return (
    <Section className="bg-white">
      <SectionHeader
        title="Plug into the tools that already run your business."
        description="Nyumba Zetu becomes the operational and financial source of truth, while your bank, M-Pesa channels, and accounting tools stay connected."
      />
      <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center">
        {integrations.map((integration, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="h-20 flex items-center justify-center bg-slate-50 rounded-lg border border-slate-200 text-slate-600 font-medium text-sm hover:border-[#b98036] transition-colors"
          >
            {integration}
          </motion.div>
        ))}
      </div>
    </Section>
  );
}


