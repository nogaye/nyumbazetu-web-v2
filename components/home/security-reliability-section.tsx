"use client";

/**
 * Home page "Security & Reliability" block with scroll-triggered section and staggered cards.
 * Reinforces trust with clear headings and hover treatment.
 */

import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/animated-section";
import { SectionHeader } from "@/components/section-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { staggerContainer, staggerChild } from "@/lib/motion";

const securityItems = [
  {
    title: "Role-Based Access Control",
    description:
      "Granular permissions for managers, accountants, owners, and tenants.",
  },
  {
    title: "Audit Logs",
    description:
      "Complete transaction history with full audit trails for compliance.",
  },
  {
    title: "Data Protection",
    description:
      "Encrypted data storage, regular backups, and GDPR-compliant practices.",
  },
];

export function SecurityReliabilitySection() {
  return (
    <AnimatedSection className="bg-white dark:bg-slate-950/50">
      <SectionHeader
        title="Security & Reliability"
        description="Enterprise-grade security, audit trails, and uptime—so you and your stakeholders can trust the numbers."
        titleClassName="font-display tracking-tight"
      />
      <motion.div
        className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {securityItems.map((item, idx) => (
          <motion.div key={idx} variants={staggerChild}>
            <Card className="h-full transition-all duration-300 hover:shadow-glow hover:border-primary/20 dark:hover:border-primary/20">
              <CardHeader>
                <CardTitle className="font-display font-semibold">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </AnimatedSection>
  );
}
