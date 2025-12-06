"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

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
    <Section className="bg-secondary">
      <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 leading-tight tracking-tight">
          Property management insights for Kenyan landlords and property managers.
        </h2>
        <p className="text-lg md:text-xl text-white/90 leading-relaxed">
          Learn from industry experts and real-world case studies.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-8">
        {resources.map((resource, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="h-full hover:shadow-md transition-all duration-200 hover:-translate-y-1 bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader className="pb-4">
                <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-3">
                  {resource.type}
                </div>
                <CardTitle className="text-xl font-semibold text-white mb-2">
                  {resource.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-white/90 leading-relaxed mb-4">
                  {resource.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      <div className="text-center">
        <Button size="lg" variant="outline" className="border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 hover:border-white/50" asChild>
          <Link href="/resources" className="flex items-center gap-2">
            View all resources
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </Section>
  );
}

