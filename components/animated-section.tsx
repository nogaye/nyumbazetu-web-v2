"use client";

/**
 * Client-only section that fades in when it enters the viewport.
 * Use for key sections where scroll-triggered reveal improves perceived performance.
 */

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeInUp, springSlow } from "@/lib/motion";
import type { ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

/**
 * Renders a section that animates in (fade + slide up) when it scrolls into view.
 * Uses useInView so animation runs once when the section enters the viewport.
 */
export function AnimatedSection({
  children,
  className,
  id,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <motion.section
      ref={ref}
      id={id}
      className={cn("py-8 md:py-12 lg:py-16", className)}
      aria-label={id ? undefined : "Content section"}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeInUp}
      transition={springSlow}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {children}
      </div>
    </motion.section>
  );
}
