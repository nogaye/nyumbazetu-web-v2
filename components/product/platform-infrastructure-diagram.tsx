"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  CurrencyDollarIcon,
  DocumentTextIcon,
  UserGroupIcon,
  WrenchScrewdriverIcon,
  ClipboardDocumentCheckIcon,
  ShieldCheckIcon,
  HomeIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";

interface Module {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  position: { x: number; y: number };
  color: string;
  connections: string[];
}

const modules: Module[] = [
  {
    id: "collections",
    title: "Collections & Payments",
    description: "Automated rent, service charge, and utility invoicing",
    icon: CurrencyDollarIcon,
    position: { x: 15, y: 20 },
    color: "from-emerald-500 to-teal-600",
    connections: ["accounting", "tenant-experience", "compliance"],
  },
  {
    id: "accounting",
    title: "Accounting & General Ledger",
    description: "Full double-entry accounting system with automated entries",
    icon: DocumentTextIcon,
    position: { x: 50, y: 20 },
    color: "from-blue-500 to-indigo-600",
    connections: ["collections", "maintenance", "tasks", "compliance"],
  },
  {
    id: "tenant-experience",
    title: "Tenant & Owner Experience",
    description: "Self-service portals, mobile apps, and WhatsApp chatbot",
    icon: UserGroupIcon,
    position: { x: 15, y: 50 },
    color: "from-purple-500 to-pink-600",
    connections: ["collections", "maintenance", "communications", "tps"],
  },
  {
    id: "maintenance",
    title: "Maintenance & Assets",
    description: "Maintenance request management, work orders, and asset tracking",
    icon: WrenchScrewdriverIcon,
    position: { x: 50, y: 50 },
    color: "from-orange-500 to-red-600",
    connections: ["accounting", "tenant-experience", "tasks", "communications"],
  },
  {
    id: "tasks",
    title: "Tasks & Projects",
    description: "Project management for developments and renovations",
    icon: ClipboardDocumentCheckIcon,
    position: { x: 85, y: 35 },
    color: "from-cyan-500 to-blue-600",
    connections: ["accounting", "maintenance", "communications"],
  },
  {
    id: "compliance",
    title: "KRA eTIMS & Compliance",
    description: "eTIMS-ready invoicing and tax-compliant workflows",
    icon: ShieldCheckIcon,
    position: { x: 50, y: 80 },
    color: "from-amber-500 to-yellow-600",
    connections: ["collections", "accounting"],
  },
  {
    id: "tps",
    title: "TPS & Rent-to-Own",
    description: "Tenant Purchase Scheme tracking and installment management",
    icon: HomeIcon,
    position: { x: 15, y: 80 },
    color: "from-violet-500 to-purple-600",
    connections: ["collections", "tenant-experience", "accounting"],
  },
  {
    id: "communications",
    title: "Communications",
    description: "Centralized email, SMS, and in-app messaging",
    icon: ChatBubbleLeftRightIcon,
    position: { x: 85, y: 80 },
    color: "from-rose-500 to-pink-600",
    connections: ["tenant-experience", "maintenance", "tasks"],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const moduleVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20,
    },
  },
};

const lineVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => ({
    pathLength: 1,
    opacity: 0.3,
    transition: {
      pathLength: { delay: i * 0.1, duration: 1, ease: "easeInOut" },
      opacity: { delay: i * 0.1, duration: 0.5 },
    },
  }),
};

export function PlatformInfrastructureDiagram() {
  const [hoveredModule, setHoveredModule] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const getConnectionPath = (from: Module, to: Module): string => {
    const fromX = from.position.x;
    const fromY = from.position.y;
    const toX = to.position.x;
    const toY = to.position.y;

    // Create a curved path
    const midX = (fromX + toX) / 2;
    const midY = (fromY + toY) / 2;
    const controlX = midX;
    const controlY = midY - 5;

    return `M ${fromX} ${fromY} Q ${controlX} ${controlY} ${toX} ${toY}`;
  };

  const allConnections: Array<{ from: Module; to: Module; index: number }> = [];
  modules.forEach((module) => {
    module.connections.forEach((connId, idx) => {
      const connectedModule = modules.find((m) => m.id === connId);
      if (connectedModule) {
        allConnections.push({
          from: module,
          to: connectedModule,
          index: allConnections.length,
        });
      }
    });
  });

  return (
    <div className="relative w-full h-[500px] sm:h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden rounded-lg bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-800">
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-20 dark:opacity-10">
        <svg className="w-full h-full">
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-slate-400 dark:text-slate-600"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Central hub indicator */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 border-2 border-primary/30 backdrop-blur-sm"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        style={{
          backgroundColor: "rgba(185, 128, 54, 0.1)",
          borderColor: "rgba(185, 128, 54, 0.3)",
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{
              background: "linear-gradient(to bottom right, #b98036, rgba(185, 128, 54, 0.8))",
            }}
          >
            <span className="text-white font-bold text-sm">NZ</span>
          </div>
        </div>
      </motion.div>

      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {allConnections.map((conn, idx) => {
          const isHighlighted =
            hoveredModule === conn.from.id || hoveredModule === conn.to.id;
          return (
            <motion.path
              key={`${conn.from.id}-${conn.to.id}-${idx}`}
              d={getConnectionPath(conn.from, conn.to)}
              fill="none"
              stroke={
                isHighlighted
                  ? "rgb(59, 130, 246)"
                  : "rgb(148, 163, 184)"
              }
              strokeWidth={isHighlighted ? 2.5 : 1.5}
              strokeDasharray="5,5"
              className="dark:stroke-slate-600"
              variants={lineVariants}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              custom={idx}
            />
          );
        })}
      </svg>

      {/* Module nodes */}
      <motion.div
        className="relative w-full h-full"
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        {modules.map((module) => {
          const Icon = module.icon;
          const isHighlighted = hoveredModule === module.id;
          const connectedModules = module.connections
            .map((id) => modules.find((m) => m.id === id))
            .filter(Boolean) as Module[];

          return (
            <motion.div
              key={module.id}
              className="absolute"
              style={{
                left: `${module.position.x}%`,
                top: `${module.position.y}%`,
                transform: "translate(-50%, -50%)",
              }}
              variants={moduleVariants}
              onMouseEnter={() => setHoveredModule(module.id)}
              onMouseLeave={() => setHoveredModule(null)}
            >
              <motion.div
                className={`relative group cursor-pointer ${
                  isHighlighted ? "z-10" : "z-0"
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Module card */}
                <motion.div
                  className={`bg-white dark:bg-slate-800 rounded-xl p-3 sm:p-4 shadow-lg border-2 transition-all duration-300 ${
                    isHighlighted
                      ? "border-primary shadow-xl scale-110"
                      : "border-slate-200 dark:border-slate-700"
                  }`}
                  style={{
                    minWidth: "160px",
                    maxWidth: "180px",
                    ...(isHighlighted
                      ? {
                          boxShadow: "0 20px 25px -5px rgba(185, 128, 54, 0.2), 0 10px 10px -5px rgba(185, 128, 54, 0.1)",
                        }
                      : {}),
                  }}
                >
                  {/* Icon with gradient background */}
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br ${module.color} flex items-center justify-center mb-2 sm:mb-3 shadow-md`}
                  >
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>

                  {/* Title */}
                  <h3
                    className={`font-semibold text-xs sm:text-sm mb-1 transition-colors ${
                      isHighlighted
                        ? ""
                        : "text-slate-900 dark:text-slate-100"
                    }`}
                    style={
                      isHighlighted
                        ? { color: "#b98036" }
                        : {}
                    }
                  >
                    {module.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[10px] sm:text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                    {module.description}
                  </p>

                  {/* Connection indicator */}
                  {isHighlighted && (
                    <motion.div
                      className="mt-2 pt-2 border-t border-slate-200 dark:border-slate-700"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Connected to {connectedModules.length} module
                        {connectedModules.length !== 1 ? "s" : ""}
                      </p>
                    </motion.div>
                  )}
                </motion.div>

                {/* Pulse effect when highlighted */}
                {isHighlighted && (
                  <motion.div
                    className={`absolute inset-0 rounded-xl bg-gradient-to-br ${module.color} opacity-20 blur-xl -z-10`}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.2, 0.3, 0.2],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                )}
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Legend */}
      <motion.div
        className="absolute bottom-2 sm:bottom-4 left-2 right-2 sm:left-4 sm:right-4 md:left-auto md:right-4 md:w-auto bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-lg p-2 sm:p-3 shadow-lg border border-slate-200 dark:border-slate-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <p className="text-[10px] sm:text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 sm:mb-2">
          Platform Architecture
        </p>
        <p className="text-[9px] sm:text-xs text-slate-600 dark:text-slate-400">
          <span className="hidden sm:inline">Hover over modules to see connections • </span>
          {modules.length} integrated modules
        </p>
      </motion.div>
    </div>
  );
}

