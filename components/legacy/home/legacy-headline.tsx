"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/section";

export function LegacyHeadline() {
  return (
    <Section className="relative bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 overflow-hidden">
      {/* Subtle ambient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[28rem] h-[28rem] bg-primary/[0.06] rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute bottom-0 right-1/4 w-[24rem] h-[24rem] bg-primary/[0.05] rounded-full blur-3xl translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 relative z-10 py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex text-center justify-center"
        >
          <div className="w-full lg:w-2/3">
            <h2 className="font-display text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-[1.15] tracking-[-0.02em]">
              One system. Real-time visibility. Tax-ready.
            </h2>

            <p className="text-white text-lg md:text-xl leading-relaxed opacity-90">
              Nyumba Zetu gives property managers, landlords, and estates a single place to collect rent, run accounting, talk to tenants, track maintenance, and stay compliant—so you spend less time on spreadsheets and more on growing your portfolio.
            </p>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

