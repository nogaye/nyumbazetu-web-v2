"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  MapPinIcon,
  CalculatorIcon,
  ShieldCheckIcon,
  PuzzlePieceIcon,
} from "@heroicons/react/24/outline";

const differentiators = [
  {
    title: "Built for Kenya from day one",
    description: "M-Pesa, service charge, committees, Kenyan regulations—everything designed for the local market.",
    icon: MapPinIcon,
  },
  {
    title: "Accounting-first architecture",
    description: "Every invoice, payment, and adjustment posts correctly to a general ledger. No shortcuts.",
    icon: CalculatorIcon,
  },
  {
    title: "Compliance & audit-ready",
    description: "KRA eTIMS, exportable ledgers, full transaction history. Always ready for audits.",
    icon: ShieldCheckIcon,
  },
  {
    title: "Ecosystem-ready",
    description: "Nyumba Zetu + banks + M-Pesa + accounting tools + future AI analytics. Built to integrate.",
    icon: PuzzlePieceIcon,
  },
];

export function Differentiators() {
  return (
    <Section className="bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-white">
      <SectionHeader
        title="Why serious Kenyan property teams choose Nyumba Zetu."
        titleClassName="text-slate-900 dark:text-white"
        description="Built for institutions, trusted by banks, designed for the next decade of property operations."
        className="text-slate-900 dark:text-white"
      />
      <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
        {differentiators.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:shadow-md transition-all duration-200 hover:-translate-y-1">
              <CardHeader className="pb-4">
                <item.icon className="h-10 w-10 text-primary mb-4" />
                <CardTitle className="text-slate-900 dark:text-slate-50 text-2xl font-semibold mb-3">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

