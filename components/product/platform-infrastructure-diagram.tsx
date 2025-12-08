"use client";

import { motion, useMotionValue } from "framer-motion";
import { useState, useEffect, useRef } from "react";
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

const moduleVariants: any = {
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

const lineVariants: any = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => ({
    pathLength: 1,
    opacity: 0.6,
    transition: {
      pathLength: { delay: i * 0.05, duration: 0.8, ease: "easeInOut" },
      opacity: { delay: i * 0.05, duration: 0.4 },
    },
  }),
  highlighted: {
    pathLength: 1,
    opacity: 1,
    transition: {
      opacity: { duration: 0.2 },
    },
  },
};

interface ModuleCardProps {
  module: Module;
  Icon: React.ComponentType<{ className?: string }>;
  position: { x: number; y: number };
  initialX: number;
  initialY: number;
  containerSize: { width: number; height: number };
  containerRef: React.RefObject<HTMLDivElement | null>;
  isHighlighted: boolean;
  isConnected: boolean;
  isDimmed: boolean;
  connectedModules: Module[];
  hoveredModule: string | null;
  onPositionUpdate: (x: number, y: number) => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  variants: any;
}

function ModuleCard({
  module,
  Icon,
  position,
  initialX,
  initialY,
  containerSize,
  containerRef,
  isHighlighted,
  isConnected,
  isDimmed,
  connectedModules,
  hoveredModule,
  onPositionUpdate,
  onMouseEnter,
  onMouseLeave,
  variants,
}: ModuleCardProps) {
  const [isDragging, setIsDragging] = useState(false);
  const x = useMotionValue(initialX);
  const y = useMotionValue(initialY);

  // Update motion values when position changes (but not during drag)
  useEffect(() => {
    if (!isDragging && containerSize.width > 0 && containerSize.height > 0) {
      const newX = (position.x / 100) * containerSize.width - (containerSize.width / 2);
      const newY = (position.y / 100) * containerSize.height - (containerSize.height / 2);
      x.set(newX);
      y.set(newY);
    }
  }, [position, containerSize, isDragging, x, y]);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: any) => {
    setIsDragging(false);
    
    if (containerRef.current && containerSize.width > 0 && containerSize.height > 0) {
      const rect = containerRef.current.getBoundingClientRect();
      
      // Get final position from motion values
      const finalX = x.get();
      const finalY = y.get();
      
      // Convert back to percentage
      const centerX = (finalX + containerSize.width / 2) / containerSize.width * 100;
      const centerY = (finalY + containerSize.height / 2) / containerSize.height * 100;
      
      // Constrain to container bounds
      const minX = 5;
      const maxX = 95;
      const minY = 5;
      const maxY = 95;
      
      const constrainedX = Math.max(minX, Math.min(maxX, centerX));
      const constrainedY = Math.max(minY, Math.min(maxY, centerY));
      
      // Update position state
      onPositionUpdate(constrainedX, constrainedY);
      
      // Update motion values to match constrained position
      const constrainedXPixels = (constrainedX / 100) * containerSize.width - (containerSize.width / 2);
      const constrainedYPixels = (constrainedY / 100) * containerSize.height - (containerSize.height / 2);
      x.set(constrainedXPixels);
      y.set(constrainedYPixels);
    }
  };

  return (
    <motion.div
      className="absolute"
      style={{
        left: "50%",
        top: "50%",
        x,
        y,
      }}
      variants={variants}
      drag
      dragConstraints={containerRef}
      dragElastic={0}
      dragMomentum={false}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={handleDragEnd}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      whileDrag={{ 
        scale: 1.15,
        zIndex: 50,
        cursor: "grabbing"
      }}
    >
      <motion.div
        className={`relative group cursor-grab active:cursor-grabbing ${
          isHighlighted ? "z-10" : "z-0"
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          opacity: isDimmed ? 0.4 : 1,
          scale: isDimmed ? 0.95 : 1,
        }}
        transition={{ duration: 0.2 }}
      >
        {/* Module card */}
        <motion.div
          className={`bg-white dark:bg-slate-800 rounded-xl p-3 sm:p-4 shadow-lg border-2 transition-all duration-300 ${
            isHighlighted
              ? "border-primary shadow-xl scale-110"
              : isConnected && hoveredModule && hoveredModule !== module.id
              ? "border-blue-400 dark:border-blue-500"
              : "border-slate-200 dark:border-slate-700"
          }`}
          style={{
            minWidth: "180px",
            maxWidth: "200px",
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
          <p className="text-[10px] sm:text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mb-2">
            {module.description}
          </p>

          {/* Connection details */}
          {isHighlighted && connectedModules.length > 0 && (
            <motion.div
              className="mt-2 pt-2 border-t border-slate-200 dark:border-slate-700"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <p className="text-[10px] font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Connected to:
              </p>
              <ul className="space-y-1">
                {connectedModules.map((connected) => (
                  <li
                    key={connected.id}
                    className="text-[9px] sm:text-[10px] text-slate-600 dark:text-slate-400 flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0"></span>
                    <span className="truncate">{connected.title}</span>
                  </li>
                ))}
              </ul>
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
}

export function PlatformInfrastructureDiagram() {
  const [hoveredModule, setHoveredModule] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track positions of each module (for dragging)
  const [modulePositions, setModulePositions] = useState<Record<string, { x: number; y: number }>>(() => {
    const initial: Record<string, { x: number; y: number }> = {};
    modules.forEach(module => {
      initial[module.id] = { x: module.position.x, y: module.position.y };
    });
    return initial;
  });
  

  useEffect(() => {
    setIsVisible(true);
    
    const updateSize = () => {
      if (containerRef.current) {
        setContainerSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };
    
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const getConnectionPath = (from: Module, to: Module): string => {
    if (containerSize.width === 0 || containerSize.height === 0) {
      return '';
    }

    // Convert percentage to pixel coordinates (center of module cards)
    const fromX = (from.position.x / 100) * containerSize.width;
    const fromY = (from.position.y / 100) * containerSize.height;
    const toX = (to.position.x / 100) * containerSize.width;
    const toY = (to.position.y / 100) * containerSize.height;

    // Calculate angle and distance
    const dx = toX - fromX;
    const dy = toY - fromY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance === 0) return '';
    
    // Module card approximate size (accounting for responsive sizing)
    const cardWidth = Math.min(200, containerSize.width * 0.15);
    const cardHeight = 120;
    
    // Calculate connection points at card edges
    const angle = Math.atan2(dy, dx);
    const fromOffsetX = Math.cos(angle) * (cardWidth / 2);
    const fromOffsetY = Math.sin(angle) * (cardHeight / 2);
    const toOffsetX = -Math.cos(angle) * (cardWidth / 2);
    const toOffsetY = -Math.sin(angle) * (cardHeight / 2);
    
    const startX = fromX + fromOffsetX;
    const startY = fromY + fromOffsetY;
    const endX = toX + toOffsetX;
    const endY = toY + toOffsetY;
    
    // Create a curved path with control point
    const midX = (startX + endX) / 2;
    const midY = (startY + endY) / 2;
    
    // Perpendicular offset for curve (makes lines curve nicely)
    const offset = Math.min(distance * 0.15, 40);
    const controlX = midX + (dy / distance) * offset;
    const controlY = midY - (dx / distance) * offset;

    return `M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${endY}`;
  };

  // Build connections array, avoiding duplicates (A->B and B->A should only show once)
  const allConnections: Array<{ from: Module; to: Module; index: number }> = [];
  const connectionSet = new Set<string>();
  
  modules.forEach((module) => {
    module.connections.forEach((connId) => {
      const connectedModule = modules.find((m) => m.id === connId);
      if (connectedModule) {
        // Create a unique key for the connection (sorted to avoid duplicates)
        const connectionKey = [module.id, connectedModule.id].sort().join('-');
        
        // Only add if we haven't seen this connection before
        if (!connectionSet.has(connectionKey)) {
          connectionSet.add(connectionKey);
          allConnections.push({
            from: module,
            to: connectedModule,
            index: allConnections.length,
          });
        }
      }
    });
  });

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[500px] sm:h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden rounded-lg bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-800"
    >
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
          
          // Check if this module is connected to the hovered module
          const isConnected = hoveredModule 
            ? connectedModules.some(m => m.id === hoveredModule) || module.id === hoveredModule
            : true;
          
          const isDimmed = hoveredModule !== null && !isConnected && !isHighlighted;
          
          const position = modulePositions[module.id] || { x: module.position.x, y: module.position.y };
          
          // Convert percentage to pixels for initial position (relative to container center)
          const initialX = containerSize.width > 0 ? (position.x / 100) * containerSize.width - (containerSize.width / 2) : 0;
          const initialY = containerSize.height > 0 ? (position.y / 100) * containerSize.height - (containerSize.height / 2) : 0;

          return (
            <ModuleCard
              key={module.id}
              module={module}
              Icon={Icon}
              position={position}
              initialX={initialX}
              initialY={initialY}
              containerSize={containerSize}
              containerRef={containerRef}
              isHighlighted={isHighlighted}
              isConnected={isConnected}
              isDimmed={isDimmed}
              connectedModules={connectedModules}
              onPositionUpdate={(newX, newY) => {
                setModulePositions((prev: Record<string, { x: number; y: number }>) => ({
                  ...prev,
                  [module.id]: { x: newX, y: newY }
                }));
              }}
              onMouseEnter={() => setHoveredModule(module.id)}
              onMouseLeave={() => setHoveredModule(null)}
              hoveredModule={hoveredModule}
              variants={moduleVariants}
            />
          );
        })}
      </motion.div>

      {/* Legend */}
      <motion.div
        className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm rounded-lg p-2 sm:p-3 shadow-lg border border-slate-200 dark:border-slate-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <p className="text-[10px] sm:text-xs font-semibold text-slate-700 dark:text-slate-300">
          Platform Architecture
        </p>
      </motion.div>
    </div>
  );
}

