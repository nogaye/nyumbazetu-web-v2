"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/section";

export function LegacyHeadline() {
  return (
    <Section className="relative bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
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
            <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Kenya&apos;s Leading Property Management Software for Landlords & Agents
            </h1>

            <p className="text-white text-lg md:text-xl leading-relaxed opacity-90">
              Nyumba Zetu is a cloud-based software built for developers, landlords and property managers to streamline every aspect of property management, from listings, invoicing, and bill payments to maintenance, expenses, and reporting.
            </p>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

