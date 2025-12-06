"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import {
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

const steps = [
  {
    number: "01",
    title: "Onboard your portfolio",
    description: "Import units, tenants, balances, and chart of accounts. Our team helps with data migration.",
  },
  {
    number: "02",
    title: "Automate invoices & collections",
    description: "Set up automated rent, service charge, utilities, and TPS installment invoicing.",
  },
  {
    number: "03",
    title: "Connect tenants, owners, and your team",
    description: "Enable portals, mobile apps, and WhatsApp chatbot for seamless communication.",
  },
  {
    number: "04",
    title: "Run real-time accounting & reporting",
    description: "Access dashboards, financial statements, and exports. Everything updates in real-time.",
  },
];

export function HowItWorks() {
  return (
    <Section className="bg-secondary">
      <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 leading-tight tracking-tight">
          From spreadsheets to a modern property operations stack.
        </h2>
        <p className="text-lg md:text-xl text-white/90 leading-relaxed">
          Get up and running in days, not months. Our team handles onboarding and training.
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
        {steps.map((step, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="relative"
          >
            <div className="text-6xl font-bold text-white/20 mb-4">{step.number}</div>
            <h3 className="text-xl font-bold text-white mb-3">
              {step.title}
            </h3>
            <p className="text-white/90 leading-relaxed">
              {step.description}
            </p>
            {idx < steps.length - 1 && (
              <div className="hidden lg:block absolute top-12 -right-4">
                <ArrowRightIcon className="h-6 w-6 text-white/40" />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </Section>
  );
}


