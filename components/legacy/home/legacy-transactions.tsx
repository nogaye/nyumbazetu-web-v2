"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import { Card, CardContent } from "@/components/ui/card";
import {
  CurrencyDollarIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

export function LegacyTransactions() {
  const [currentCount, setCurrentCount] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const maxCount = 500000000; // 500 million
    const duration = 2000; // milliseconds
    const steps = 60;
    const increment = maxCount / steps;
    let currentStep = 0;

    const intervalId = setInterval(() => {
      currentStep++;
      const newCount = Math.min(increment * currentStep, maxCount);
      setCurrentCount(newCount);
      
      if (newCount >= maxCount) {
        setCompleted(true);
        clearInterval(intervalId);
      }
    }, duration / steps);

    return () => clearInterval(intervalId);
  }, []);

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `KES ${(value / 1000000).toFixed(0)}M`;
    }
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const stats = [
    {
      icon: CurrencyDollarIcon,
      value: completed ? "KES 500M+" : formatCurrency(currentCount),
      label: "In Monthly Transactions",
      description: "Experience unmatched efficiency with our payments processing & property management solution",
    },
    {
      icon: UserGroupIcon,
      value: "12k+",
      label: "Active Tenants",
      description: "Growing community of satisfied tenants",
    },
    {
      icon: BuildingOfficeIcon,
      value: "200+",
      label: "Properties Managed",
      description: "Trusted by property managers across Kenya",
    },
    {
      icon: DocumentTextIcon,
      value: "300k+",
      label: "Invoices Delivered",
      description: "Automated invoicing and payment tracking",
    },
  ];

  return (
    <Section className="bg-slate-50 dark:bg-slate-900/50">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Trusted by Property Teams Across Kenya"
          description="Join hundreds of property managers, landlords, and committees using Nyumba Zetu to streamline their operations"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {stats.map((stat, idx) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary/20">
                  <CardContent className="p-6 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                      <IconComponent className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold text-primary mb-2">
                      {stat.value}
                    </h3>
                    <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-2">
                      {stat.label}
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {stat.description}
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

