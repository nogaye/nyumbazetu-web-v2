"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/section";
import { Card } from "@/components/ui/card";
import {
  XCircleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

export function ProblemContext() {
  return (
    <Section className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Left - Current Problems */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <Card className="p-8 h-full border-red-200 dark:border-red-900/50 bg-white dark:bg-slate-900 hover:shadow-md transition-all duration-200">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-6">
              How property is still managed today in Kenya.
            </h3>
            <ul className="space-y-4">
              {[
                "Spreadsheets and manual tracking across multiple files",
                "WhatsApp chaos for tenant communication and payment confirmations",
                "Manual M-Pesa reconciliation with no real-time visibility",
                "Zero visibility for property owners on collections and arrears",
                "Fragility during audits with missing or incomplete records",
              ].map((item, idx) => (
                <li key={idx} className="flex items-start space-x-3">
                  <XCircleIcon className="h-6 w-6 text-red-500 dark:text-red-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700 dark:text-slate-300 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        </motion.div>

        {/* Right - Nyumba Zetu Solution */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <Card className="p-8 h-full border-[#36b9a0] dark:border-[#36b9a0]/50 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800/50 hover:shadow-md transition-all duration-200">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-6">
              How Nyumba Zetu future-proofs your operations.
            </h3>
            <ul className="space-y-4">
              {[
                "Single platform for all property operations and accounting",
                "Automated invoices with integrated payment tracking",
                "Real-time M-Pesa and bank reconciliation",
                "Owner and tenant portals with live dashboards",
                "Audit-ready history with full transaction trails",
              ].map((item, idx) => (
                <li key={idx} className="flex items-start space-x-3">
                  <CheckCircleIcon className="h-6 w-6 text-[#36b9a0] flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700 dark:text-slate-300 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        </motion.div>
      </div>
    </Section>
  );
}

