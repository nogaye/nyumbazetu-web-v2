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
      <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
        {/* Left - Current Problems */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <Card className="p-6 md:p-8 h-full border-red-200 dark:border-red-900/50 bg-white dark:bg-slate-900 hover:shadow-md transition-all duration-200">
            {/* Problem Illustration Placeholder */}
            <div className="mb-6 aspect-video bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-900/50 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-3 bg-red-200 dark:bg-red-900/50 rounded-lg flex items-center justify-center">
                  <div className="w-12 h-12 bg-red-300 dark:bg-red-800/50 rounded"></div>
                </div>
                 {/* <p className="text-red-700 dark:text-red-400 text-xs font-medium">Problem Illustration</p> */}
                <p className="text-red-600 dark:text-red-500 text-xs mt-1">Spreadsheets & manual processes</p>
              </div>
            </div>
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
          <Card className="p-6 md:p-8 h-full border-tertiary dark:border-tertiary/50 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800/50 hover:shadow-md transition-all duration-200">
            {/* Solution Dashboard Screenshot Placeholder */}
            <div className="mb-6 aspect-video bg-tertiary/10 dark:bg-tertiary/20 rounded-lg border border-tertiary/30 dark:border-tertiary/50 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-3 bg-tertiary/20 dark:bg-tertiary/30 rounded-lg flex items-center justify-center">
                  <div className="w-12 h-12 bg-tertiary/40 dark:bg-tertiary/50 rounded"></div>
                </div>
                {/*  <p className="text-tertiary dark:text-tertiary text-xs font-medium">Platform Dashboard</p> */}
                <p className="text-tertiary/80 dark:text-tertiary/70 text-xs mt-1">Automated & integrated system</p>
              </div>
            </div>
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
                  <CheckCircleIcon className="h-6 w-6 text-tertiary flex-shrink-0 mt-0.5" />
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

