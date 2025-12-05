"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const resources = [
  {
    title: "How to modernize rent collections in Kenya",
    type: "Guide",
    description: "Best practices for transitioning from manual to automated rent collection.",
  },
  {
    title: "Service charge transparency for estates and apartments",
    type: "Case Study",
    description: "How one HOA increased transparency and reduced disputes by 60%.",
  },
  {
    title: "Preparing for KRA audits as a property manager",
    type: "Blog",
    description: "Essential steps to ensure your property records are audit-ready.",
  },
];

export function ResourcesTeaser() {
  return (
    <Section className="bg-slate-50 dark:bg-slate-900">
      <SectionHeader
        title="Property management insights for Kenyan landlords and property managers."
        description="Learn from industry experts and real-world case studies."
      />
      <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-8">
        {resources.map((resource, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="h-full hover:shadow-md transition-all duration-200 hover:-translate-y-1">
              <CardHeader className="pb-4">
                <div className="text-xs font-semibold text-[#b98036] uppercase tracking-wider mb-3">
                  {resource.type}
                </div>
                <CardTitle className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-2">
                  {resource.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  {resource.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      <div className="text-center">
        <Button size="lg" variant="outline" asChild>
          <Link href="/resources">View all resources →</Link>
        </Button>
      </div>
    </Section>
  );
}

