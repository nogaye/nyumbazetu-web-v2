"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  ClockIcon,
  ArrowTrendingUpIcon,
  TableCellsIcon,
  SparklesIcon,
  BoltIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

interface DashboardSlide {
  id: string;
  title: string;
  description: string;
  features: string[];
  visual: "insights" | "grids";
}

const dashboardSlides: DashboardSlide[] = [
  {
    id: "insights",
    title: "Comprehensive Management Dashboard",
    description: "A centralized hub for real-time insights and performance tracking. Monitor your entire property portfolio at a glance with live updates and actionable analytics.",
    features: [
      "Real-time KPI tracking with live data updates",
      "Interactive charts and visualizations",
      "Customizable dashboard widgets",
      "Performance alerts and notifications",
      "Historical trend analysis",
      "Multi-property portfolio overview",
    ],
    visual: "insights",
  },
  {
    id: "grids",
    title: "Powerful Grids",
    description: "Everything you like in Excel but supercharged with automation and real-time updates. Advanced data grids with sorting, filtering, and bulk operations.",
    features: [
      "Excel-like interface with familiar controls",
      "Real-time data synchronization",
      "Advanced filtering and sorting",
      "Bulk edit and batch operations",
      "Export to Excel, CSV, and PDF",
      "Customizable columns and views",
    ],
    visual: "grids",
  },
];

const ANIMATION_DURATION = 5000;

export function ManagementDashboard() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % dashboardSlides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + dashboardSlides.length) % dashboardSlides.length);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, ANIMATION_DURATION);

    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const currentSlideData = dashboardSlides[currentSlide];

  return (
    <div className="w-full">
      <div className="relative max-w-7xl mx-auto px-4 md:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto">
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
                {currentSlideData.title}
              </h3>
              <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                {currentSlideData.description}
              </p>
            </div>

            {/* Visual Content */}
            <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-6 md:p-8 border border-white/20 shadow-2xl min-h-[400px] md:min-h-[500px]">
              {currentSlideData.visual === "insights" ? (
                <DashboardInsightsVisual />
              ) : (
                <DashboardGridsVisual />
              )}
            </div>

            {/* Features List */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {currentSlideData.features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + idx * 0.05 }}
                  className="flex items-start space-x-3 bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10"
                >
                  <SparklesIcon className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-white/90 text-sm md:text-base leading-relaxed">
                    {feature}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={prevSlide}
          onMouseEnter={() => setIsAutoPlaying(false)}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white hover:text-white shadow-lg transition-all duration-200 h-12 w-12 min-h-[48px] min-w-[48px]"
          aria-label="Previous slide"
        >
          <ChevronLeftIcon className="h-6 w-6" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={nextSlide}
          onMouseEnter={() => setIsAutoPlaying(false)}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white hover:text-white shadow-lg transition-all duration-200 h-12 w-12 min-h-[48px] min-w-[48px]"
          aria-label="Next slide"
        >
          <ChevronRightIcon className="h-6 w-6" />
        </Button>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-8" role="tablist" aria-label="Dashboard carousel slides">
          {dashboardSlides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => goToSlide(index)}
              onMouseEnter={() => setIsAutoPlaying(false)}
              className={`h-1.5 rounded-full transition-all duration-200 ${
                index === currentSlide
                  ? "w-8 bg-white"
                  : "w-1.5 bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${index + 1}`}
              aria-selected={index === currentSlide}
              role="tab"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function DashboardInsightsVisual() {
  const [animatedValues, setAnimatedValues] = useState({
    occupancy: 94,
    collections: 98,
    tenants: 247,
    revenue: 1250000,
  });

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setAnimatedValues((prev) => ({
        occupancy: Math.min(100, prev.occupancy + (Math.random() - 0.5) * 2),
        collections: Math.min(100, prev.collections + (Math.random() - 0.5) * 2),
        tenants: Math.max(0, prev.tenants + Math.floor((Math.random() - 0.5) * 4)),
        revenue: prev.revenue + Math.floor((Math.random() - 0.5) * 50000),
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Occupancy", value: `${Math.round(animatedValues.occupancy)}%`, icon: ChartBarIcon, color: "from-blue-500 to-blue-600" },
          { label: "Collections", value: `${Math.round(animatedValues.collections)}%`, icon: CurrencyDollarIcon, color: "from-green-500 to-green-600" },
          { label: "Tenants", value: animatedValues.tenants.toString(), icon: UserGroupIcon, color: "from-purple-500 to-purple-600" },
          { label: "Revenue", value: `KES ${(animatedValues.revenue / 1000).toFixed(0)}K`, icon: ArrowTrendingUpIcon, color: "from-primary to-primary-600" },
        ].map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 relative overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${kpi.color} opacity-10`} />
              <div className="relative">
                <Icon className="h-6 w-6 text-white mb-2" />
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">{kpi.value}</div>
                <div className="text-xs text-white/70">{kpi.label}</div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Collections Trend */}
        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm font-semibold text-white">Collections Trend</div>
            <ClockIcon className="h-4 w-4 text-white/60" />
          </div>
          <div className="h-32 flex items-end justify-between gap-1">
            {[65, 72, 68, 85, 78, 92, 88, 95].map((height, idx) => (
              <motion.div
                key={idx}
                initial={{ height: 0 }}
                animate={{ height: `${height}%` }}
                transition={{ delay: 0.3 + idx * 0.05, duration: 0.5 }}
                className="flex-1 bg-gradient-to-t from-primary to-primary-400 rounded-t"
              />
            ))}
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
          <div className="text-sm font-semibold text-white mb-3">Performance Metrics</div>
          <div className="space-y-3">
            {[
              { label: "On-Time Payments", value: 87, color: "bg-green-500" },
              { label: "Pending Invoices", value: 12, color: "bg-yellow-500" },
              { label: "Overdue", value: 5, color: "bg-red-500" },
            ].map((metric, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs text-white/80">
                  <span>{metric.label}</span>
                  <span>{metric.value}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${metric.value}%` }}
                    transition={{ delay: 0.5 + idx * 0.1, duration: 0.8 }}
                    className={`h-full ${metric.color} rounded-full`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white/5 rounded-lg p-4 border border-white/10">
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm font-semibold text-white">Recent Activity</div>
          <ArrowPathIcon className="h-4 w-4 text-white/60 animate-spin" />
        </div>
        <div className="space-y-2">
          {[
            { unit: "Unit 4A", action: "Payment received", amount: "KES 25,000", time: "2 min ago" },
            { unit: "Unit 2B", action: "Invoice sent", amount: "KES 18,500", time: "5 min ago" },
            { unit: "Unit 5C", action: "Payment received", amount: "KES 32,000", time: "8 min ago" },
          ].map((activity, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + idx * 0.1 }}
              className="flex justify-between items-center text-sm text-white/90 bg-white/5 rounded p-2"
            >
              <div>
                <span className="font-medium">{activity.unit}</span>
                <span className="text-white/60 ml-2">{activity.action}</span>
              </div>
              <div className="text-right">
                <div className="text-primary font-semibold">{activity.amount}</div>
                <div className="text-xs text-white/50">{activity.time}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DashboardGridsVisual() {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const sampleData = [
    { id: 1, unit: "Unit 4A", tenant: "John Doe", rent: "KES 25,000", status: "Paid", dueDate: "2024-01-15" },
    { id: 2, unit: "Unit 2B", tenant: "Jane Smith", rent: "KES 18,500", status: "Pending", dueDate: "2024-01-15" },
    { id: 3, unit: "Unit 5C", tenant: "Mike Johnson", rent: "KES 32,000", status: "Paid", dueDate: "2024-01-20" },
    { id: 4, unit: "Unit 1A", tenant: "Sarah Williams", rent: "KES 22,000", status: "Overdue", dueDate: "2024-01-10" },
    { id: 5, unit: "Unit 3B", tenant: "David Brown", rent: "KES 28,500", status: "Paid", dueDate: "2024-01-18" },
  ];

  return (
    <div className="space-y-4">
      {/* Grid Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <TableCellsIcon className="h-5 w-5 text-white" />
          <h4 className="text-lg font-semibold text-white">Property Management Grid</h4>
        </div>
        <div className="flex items-center space-x-2">
          <BoltIcon className="h-4 w-4 text-primary" />
          <span className="text-xs text-white/70">Auto-sync enabled</span>
        </div>
      </div>

      {/* Grid Table */}
      <div className="bg-white/5 rounded-lg border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-white/10 border-b border-white/20">
                <th className="px-4 py-3 text-left text-xs font-semibold text-white/90 uppercase tracking-wider">
                  <input
                    type="checkbox"
                    className="rounded border-white/30 bg-white/10 text-primary focus:ring-primary"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedRows(sampleData.map((d) => d.id));
                      } else {
                        setSelectedRows([]);
                      }
                    }}
                  />
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-white/90 uppercase tracking-wider">Unit</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-white/90 uppercase tracking-wider">Tenant</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-white/90 uppercase tracking-wider">Rent</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-white/90 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-white/90 uppercase tracking-wider">Due Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {sampleData.map((row, idx) => (
                <motion.tr
                  key={row.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className={`hover:bg-white/5 transition-colors ${
                    selectedRows.includes(row.id) ? "bg-primary/20" : ""
                  }`}
                >
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(row.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedRows([...selectedRows, row.id]);
                        } else {
                          setSelectedRows(selectedRows.filter((id) => id !== row.id));
                        }
                      }}
                      className="rounded border-white/30 bg-white/10 text-primary focus:ring-primary"
                    />
                  </td>
                  <td className="px-4 py-3 text-sm text-white/90 font-medium">{row.unit}</td>
                  <td className="px-4 py-3 text-sm text-white/80">{row.tenant}</td>
                  <td className="px-4 py-3 text-sm text-white/90">{row.rent}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        row.status === "Paid"
                          ? "bg-green-500/20 text-green-400"
                          : row.status === "Pending"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-white/70">{row.dueDate}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Grid Actions */}
      <div className="flex items-center justify-between text-sm">
        <div className="text-white/70">
          {selectedRows.length > 0 ? (
            <span>{selectedRows.length} row{selectedRows.length > 1 ? "s" : ""} selected</span>
          ) : (
            <span>Showing {sampleData.length} of {sampleData.length} entries</span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded border border-white/20 text-xs transition-colors">
            Export
          </button>
          <button className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded border border-white/20 text-xs transition-colors">
            Filter
          </button>
          <button className="px-3 py-1.5 bg-primary/20 hover:bg-primary/30 text-white rounded border border-primary/30 text-xs transition-colors">
            Bulk Actions
          </button>
        </div>
      </div>
    </div>
  );
}

