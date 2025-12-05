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
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {testimonials.map((testimonial, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="h-full">
              <CardContent className="p-6">
                <p className="text-slate-700 mb-6 italic">"{testimonial.quote}"</p>
                <div className="border-t border-slate-200 pt-4">
                  <div className="font-semibold text-slate-900">{testimonial.author}</div>
                  <div className="text-sm text-slate-600">{testimonial.role}</div>
                  <div className="text-sm text-slate-500 mt-1">{testimonial.portfolio}</div>
                  <div className="text-sm font-medium text-[#36b9a0] mt-2">
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
          <Card className="border-red-200 bg-red-50/50">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Before Nyumba Zetu</h3>
              <ul className="space-y-3">
                <li className="text-slate-700">• Manual spreadsheet tracking across 3 files</li>
                <li className="text-slate-700">• WhatsApp chaos for payment confirmations</li>
                <li className="text-slate-700">• 2-3 days to reconcile M-Pesa payments</li>
                <li className="text-slate-700">• No real-time visibility for property owners</li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <Card className="border-[#36b9a0] bg-[#36b9a0]/10">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">After Nyumba Zetu</h3>
              <ul className="space-y-3">
                <li className="text-slate-700">• Single platform for all operations</li>
                <li className="text-slate-700">• Automated invoicing and payment tracking</li>
                <li className="text-slate-700">• Real-time M-Pesa reconciliation</li>
                <li className="text-slate-700">• Owner portals with live dashboards</li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </Section>
  );
}

