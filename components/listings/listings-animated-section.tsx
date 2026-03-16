"use client";

/**
 * Listings-specific section wrapper that fades in when it enters the viewport.
 * Uses framer-motion and shared motion variants; no extra layout (padding/width).
 * Use to animate sections on the listings home and search pages.
 */

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeInUp, springSlow } from "@/lib/motion";

export interface ListingsAnimatedSectionProps {
  /** Section content. */
  children: React.ReactNode;
  /** Optional class for the section. */
  className?: string;
  /** Optional id. */
  id?: string;
  /** Optional aria-labelledby. */
  "aria-labelledby"?: string;
  /** Optional aria-label. */
  "aria-label"?: string;
}

/**
 * Renders a section that animates in (fade + slide up) when it scrolls into view.
 * Uses useInView so the animation runs once when the section enters the viewport.
 */
export function ListingsAnimatedSection({
  children,
  className,
  id,
  "aria-labelledby": ariaLabelledby,
  "aria-label": ariaLabel,
}: ListingsAnimatedSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.08 });

  return (
    <motion.section
      ref={ref}
      id={id}
      aria-labelledby={ariaLabelledby}
      aria-label={ariaLabel}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeInUp}
      transition={springSlow}
      className={cn(className)}
    >
      {children}
    </motion.section>
  );
}
