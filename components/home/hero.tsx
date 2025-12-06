"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ChartBarIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

export function Hero() {
  return (
    <section className="relative bg-slate-950 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900"></div>
      <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-24 md:py-32 lg:py-40">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Property management infrastructure for modern Kenyan real estate.
            </h1>
            
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-primary">
              Forget everything you know about property management systems.
            </h2>
            
            <p className="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed">
              Nyumba Zetu is a full-stack platform for property operations, accounting, and tenant experience, built for landlords, property managers, committees, developers, and banks in Kenya.
            </p>

            <ul className="space-y-4 mb-8">
              {[
                "End-to-end rent and service charge collections with M-Pesa, bank, and wallet flows",
                "Accounting-grade general ledger with journals, ledgers, trial balance, P&L, balance sheet",
                "Tenant and owner portals, mobile apps, and WhatsApp chatbot",
                "KRA eTIMS-ready invoicing and tax-compliant workflows",
              ].map((item, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  className="flex items-start space-x-3"
                >
                  <CheckCircleIcon className="h-6 w-6 text-tertiary flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300">{item}</span>
                </motion.li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Button size="lg" className="bg-primary hover:bg-primary-600 text-primary-foreground" asChild>
                <Link href="/contact">Request a demo</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                <Link href="/product">Explore the platform</Link>
              </Button>
            </div>

            <p className="text-sm text-slate-400">
              🇰🇪 Proudly built in Kenya. Trusted by serious property teams, estates, and banks.
            </p>
          </motion.div>

          {/* Right Column - Dashboard Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
              {/* KPI Tiles */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                  { label: "Occupancy", value: "94%", icon: ChartBarIcon },
                  { label: "Collections", value: "98%", icon: CurrencyDollarIcon },
                  { label: "Tenants", value: "247", icon: UserGroupIcon },
                ].map((kpi, idx) => {
                  const IconComponent = kpi.icon;
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + idx * 0.1 }}
                      className="bg-white/10 rounded-lg p-4 border border-white/20"
                    >
                      <IconComponent className="h-5 w-5 text-primary mb-2" />
                      <div className="text-2xl font-bold text-white">{kpi.value}</div>
                      <div className="text-xs text-slate-400">{kpi.label}</div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Collections Chart Area */}
              <div className="bg-white/5 rounded-lg p-4 mb-4 border border-white/10">
                <div className="text-sm font-semibold text-white mb-3">Collections Trend</div>
                <div className="h-32 flex items-end justify-between gap-2">
                  {[65, 72, 68, 85, 78, 92, 88, 95].map((height, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{ delay: 0.6 + idx * 0.05, duration: 0.5 }}
                      className="flex-1 bg-gradient-to-t from-primary to-primary-400 rounded-t"
                    />
                  ))}
                </div>
              </div>

              {/* Tenant List Preview */}
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="text-sm font-semibold text-white mb-3">Recent Transactions</div>
                <div className="space-y-2">
                  {["Unit 4A - Paid", "Unit 2B - Paid", "Unit 5C - Pending"].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + idx * 0.1 }}
                      className="flex justify-between text-sm text-slate-300"
                    >
                      <span>{item}</span>
                      <span className="text-tertiary">KES 25,000</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

