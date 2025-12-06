"use client";

import { useEffect, useState } from "react";
import { Section } from "@/components/section";

export function LegacyTransactions() {
  const [currentCount, setCurrentCount] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const maxCount = 10000000; // 10 million
    const duration = 700; // milliseconds
    const incrementsPerMillisecond = Math.round(maxCount / duration);

    const intervalId = setInterval(() => {
      setCurrentCount((prev) => {
        const newCount = prev + incrementsPerMillisecond;
        if (newCount >= maxCount) {
          setCompleted(true);
          clearInterval(intervalId);
          return maxCount;
        }
        return newCount;
      });
    }, 1);

    return () => clearInterval(intervalId);
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Section>
      <div className="container mx-auto px-4">
        <div className="flex justify-center text-center">
          <div className="w-full lg:w-1/2">
            {completed ? (
              <h2 className="text-gradient text-primary text-4xl md:text-5xl font-bold">
                KES 500 Million +
              </h2>
            ) : (
              <h2 className="text-gradient text-primary text-4xl md:text-5xl font-bold">
                {formatCurrency(currentCount)} +
              </h2>
            )}

            <h3 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-slate-50">
              In monthly transactions
            </h3>
            <p className="text-slate-700 dark:text-slate-300 mt-2">
              Experience unmatched efficiency with our payments processing & property management solution
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-center text-center mt-8 gap-6">
          <div className="md:w-1/3 mb-4 md:mb-0">
            <h2 className="text-gradient text-primary text-4xl font-bold">12k +</h2>
            <h3 className="mt-3 text-xl font-semibold text-slate-900 dark:text-slate-50">Active Tenants</h3>
          </div>
          <div className="md:w-1/3 mb-4 md:mb-0">
            <h2 className="text-gradient text-primary text-4xl font-bold">200 +</h2>
            <h3 className="mt-3 text-xl font-semibold text-slate-900 dark:text-slate-50">Properties Managed</h3>
          </div>
          <div className="md:w-1/3">
            <h2 className="text-gradient text-primary text-4xl font-bold">300k +</h2>
            <h3 className="mt-3 text-xl font-semibold text-slate-900 dark:text-slate-50">Invoices Delivered</h3>
          </div>
        </div>
      </div>
    </Section>
  );
}

