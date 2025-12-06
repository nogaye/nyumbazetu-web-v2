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
    <Section className="bg-secondary">
      <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 leading-tight tracking-tight">
          What our customers see in the first 6–12 months.
        </h2>
        <p className="text-lg md:text-xl text-white/90 leading-relaxed">
          Real results from property teams across Kenya.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-12">
        {testimonials.map((testimonial, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="h-full hover:shadow-md transition-all duration-200 bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-6 md:p-8">
                <p className="text-white/90 mb-6 italic leading-relaxed text-base">
                  "{testimonial.quote}"
                </p>
                <div className="border-t border-white/20 pt-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex-shrink-0 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-white/30"></div>
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-white text-base">
                        {testimonial.author}
                      </div>
                      <div className="text-sm text-white/80 mt-0.5">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-white/70 mt-2">
                    {testimonial.portfolio}
                  </div>
                  <div className="text-sm font-medium text-tertiary mt-3">
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
          <Card className="border-white/20 bg-white/10 backdrop-blur-sm hover:shadow-md transition-all duration-200">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-white mb-6">
                Before Nyumba Zetu
              </h3>
              <ul className="space-y-3">
                <li className="text-white/90 leading-relaxed">
                  • Manual spreadsheet tracking across 3 files
                </li>
                <li className="text-white/90 leading-relaxed">
                  • WhatsApp chaos for payment confirmations
                </li>
                <li className="text-white/90 leading-relaxed">
                  • 2-3 days to reconcile M-Pesa payments
                </li>
                <li className="text-white/90 leading-relaxed">
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
          <Card className="border-tertiary/50 bg-tertiary/20 backdrop-blur-sm hover:shadow-md transition-all duration-200">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-white mb-6">
                After Nyumba Zetu
              </h3>
              <ul className="space-y-3">
                <li className="text-white/90 leading-relaxed">
                  • Single platform for all operations
                </li>
                <li className="text-white/90 leading-relaxed">
                  • Automated invoicing and payment tracking
                </li>
                <li className="text-white/90 leading-relaxed">
                  • Real-time M-Pesa reconciliation
                </li>
                <li className="text-white/90 leading-relaxed">
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

