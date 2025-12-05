"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    quote: "Nyumba Zetu transformed how we manage our 50-unit estate. Collections are up 25%, and owners finally have real-time visibility.",
    author: "Sarah Mwangi",
    role: "Property Manager",
    portfolio: "Residential Estate, Nairobi",
    metric: "25% increase in collections",
  },
  {
    quote: "The accounting integration alone saved us 15 hours per month. Everything posts automatically to our general ledger.",
    author: "James Ochieng",
    role: "Finance Director",
    portfolio: "Property Management Company",
    metric: "15 hours saved monthly",
  },
  {
    quote: "Our committee members love the transparency. Service charge collections are now automated and fully auditable.",
    author: "Mary Wanjiku",
    role: "HOA Committee Chair",
    portfolio: "Apartment Complex, Westlands",
    metric: "100% audit-ready",
  },
];

export function Testimonials() {
  return (
    <Section className="bg-slate-50 dark:bg-slate-900">
      <SectionHeader
        title="What our customers see in the first 6–12 months."
        description="Real results from property teams across Kenya."
      />
      <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-12">
        {testimonials.map((testimonial, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="h-full hover:shadow-md transition-all duration-200">
              <CardContent className="p-6 md:p-8">
                <p className="text-slate-700 dark:text-slate-300 mb-6 italic leading-relaxed text-base">
                  "{testimonial.quote}"
                </p>
                <div className="border-t border-slate-200 dark:border-slate-800 pt-4">
                  <div className="font-semibold text-slate-900 dark:text-slate-50 text-base">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    {testimonial.role}
                  </div>
                  <div className="text-sm text-slate-500 dark:text-slate-500 mt-1">
                    {testimonial.portfolio}
                  </div>
                  <div className="text-sm font-medium text-[#36b9a0] mt-3">
                    {testimonial.metric}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Case Study Split */}
      <div className="grid md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <Card className="border-red-200 dark:border-red-900/50 bg-red-50/50 dark:bg-red-950/20 hover:shadow-md transition-all duration-200">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-6">
                Before Nyumba Zetu
              </h3>
              <ul className="space-y-3">
                <li className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  • Manual spreadsheet tracking across 3 files
                </li>
                <li className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  • WhatsApp chaos for payment confirmations
                </li>
                <li className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  • 2-3 days to reconcile M-Pesa payments
                </li>
                <li className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  • No real-time visibility for property owners
                </li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <Card className="border-[#36b9a0] dark:border-[#36b9a0]/50 bg-[#36b9a0]/10 dark:bg-[#36b9a0]/10 hover:shadow-md transition-all duration-200">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-6">
                After Nyumba Zetu
              </h3>
              <ul className="space-y-3">
                <li className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  • Single platform for all operations
                </li>
                <li className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  • Automated invoicing and payment tracking
                </li>
                <li className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  • Real-time M-Pesa reconciliation
                </li>
                <li className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  • Owner portals with live dashboards
                </li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </Section>
  );
}

