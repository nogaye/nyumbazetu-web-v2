"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/section";
import { Card, CardContent } from "@/components/ui/card";
import {
  ShieldCheckIcon,
  DocumentTextIcon,
  ChartBarIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

export function LegacyStats() {
  const benefits = [
    {
      icon: ShieldCheckIcon,
      title: "Transparent Transactions",
      description: "Every payment, invoice, and transaction is recorded and visible in real-time.",
    },
    {
      icon: DocumentTextIcon,
      title: "Automated Documentation",
      description: "No more payment screenshots or manual Excel tracking. Everything is automated.",
    },
    {
      icon: ChartBarIcon,
      title: "Real-Time Reporting",
      description: "Access comprehensive reports and analytics whenever you need them.",
    },
    {
      icon: CheckCircleIcon,
      title: "Seamless Integration",
      description: "Works seamlessly with local banks, M-Pesa, and WhatsApp chatbot.",
    },
  ];

  return (
    <Section className="relative bg-gradient-to-br from-primary/5 via-slate-50 to-primary/5 dark:from-primary/10 dark:via-slate-900 dark:to-primary/10 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h3 className="text-slate-900 dark:text-slate-50 mb-4 text-3xl md:text-4xl lg:text-5xl font-bold">
            Built on transparency and accountability
          </h3>
          <p className="text-slate-700 dark:text-slate-300 mb-2 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
            Our system simplifies invoicing and payments with seamless integration of multiple channels, including local banks. You can easily check your bills and make payments using our App or WhatsApp chatbot.
          </p>
          <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            No more payment screenshots, Excel headaches, or paperwork nightmares.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary/20 bg-white dark:bg-slate-800">
                  <CardContent className="p-6 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/80 mb-4">
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-2">
                      {benefit.title}
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

