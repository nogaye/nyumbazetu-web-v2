"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

const partnerships = [
  {
    name: "NCBA Bank",
    description: "Strategic partnership for property management solutions and collection services",
    href: "/partnerships/ncba",
    logo: "/partnerships/ncba-logo.png", // Placeholder path
  },
  {
    name: "Boma Yangu",
    description: "Integration partner for affordable housing and TPS solutions",
    href: "/partnerships/boma-yangu",
    logo: "/partnerships/boma-yangu-logo.png", // Placeholder path
  },
  {
    name: "HFC (Housing Finance)",
    description: "Collaboration on TPS and property finance solutions",
    href: "/partnerships/hfc",
    logo: "/partnerships/hfc-logo.png", // Placeholder path
  },
  {
    name: "AIESEC",
    description: "Partnership with international students association",
    href: "/partnerships/aiesec",
    logo: "/partnerships/aiesec-logo.png", // Placeholder path
  },
];

export function Partnerships() {
  return (
    <Section className="bg-slate-50 dark:bg-slate-900">
      <SectionHeader
        title="Trusted Partnerships"
        description="We collaborate with leading financial institutions, government agencies, and organizations to deliver comprehensive property management solutions."
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {partnerships.map((partner, idx) => (
          <motion.div
            key={partner.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="h-full hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-lg mb-4 flex items-center justify-center border border-slate-200 dark:border-slate-700">
                  <div className="w-20 h-20 bg-slate-200 dark:bg-slate-700 rounded flex items-center justify-center">
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      Logo
                    </span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-2">
                  {partner.name}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 flex-grow">
                  {partner.description}
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link href={partner.href} className="flex items-center gap-2">
                    Learn More
                    <ArrowRightIcon className="h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      <div className="text-center mt-8">
        <Button size="lg" variant="outline" asChild>
          <Link href="/partnerships">View All Partnerships</Link>
        </Button>
      </div>
    </Section>
  );
}

