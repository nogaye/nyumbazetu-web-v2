"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const personas = [
  {
    title: "Landlords & Agents",
    description: "Individual property owners and real estate agents managing residential and commercial portfolios.",
    bullets: [
      "Automated rent collection and tenant communication",
      "Real-time portfolio performance dashboards",
      "Simplified accounting and tax reporting",
    ],
    href: "/solutions/landlords",
  },
  {
    title: "Property Managers & Management Companies",
    description: "Professional property management firms handling multiple properties and portfolios.",
    bullets: [
      "Multi-property portfolio management",
      "Team collaboration and workflow automation",
      "Client reporting and owner portals",
    ],
    href: "/solutions/managers",
  },
  {
    title: "Committees & HOAs",
    description: "Housing estate committees and homeowners associations managing shared spaces and service charges.",
    bullets: [
      "Service charge collection and transparency",
      "Committee decision tracking and voting",
      "Resident communication and announcements",
    ],
    href: "/solutions/committees",
  },
  {
    title: "Developers & Estate Owners",
    description: "Real estate developers and large estate owners managing mixed-use developments.",
    bullets: [
      "Development project tracking",
      "Lease management across multiple phases",
      "Financial reporting for stakeholders",
    ],
    href: "/solutions/developers",
  },
  {
    title: "Banks & SACCOS / Mortgage Teams",
    description: "Financial institutions managing mortgage portfolios and property-backed lending.",
    bullets: [
      "Mortgage portfolio monitoring",
      "Property valuation and risk assessment",
      "Regulatory compliance and reporting",
    ],
    href: "/solutions/banks",
  },
];

export function Personas() {
  return (
    <Section className="bg-slate-50 dark:bg-slate-900">
      <SectionHeader
        title="Built for every layer of real estate in Kenya."
        description="From individual landlords to banks, Nyumba Zetu scales to meet the needs of every property professional."
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {personas.map((persona, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl">{persona.title}</CardTitle>
                <p className="text-slate-600 mt-2">{persona.description}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {persona.bullets.map((bullet, bulletIdx) => (
                    <li key={bulletIdx} className="text-sm text-slate-700 flex items-start">
                      <span className="text-[#36b9a0] mr-2">•</span>
                      {bullet}
                    </li>
                  ))}
                </ul>
                <Button variant="ghost" className="w-full" asChild>
                  <Link href={persona.href}>View solution →</Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

