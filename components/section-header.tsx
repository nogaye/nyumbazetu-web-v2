"use client";

/**
 * Section header component: centered title, optional eyebrow and description.
 * Supports optional scroll-triggered fade-in via Framer Motion.
 */

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeInUp } from "@/lib/motion";
import type { ReactNode } from "react";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string | ReactNode;
  description?: string | ReactNode;
  className?: string;
  titleClassName?: string;
  /** When true, header content fades in on scroll (requires client). */
  animate?: boolean;
}

/**
 * Centered section title, optional eyebrow and description.
 * When animate is true, content animates in when in view.
 *
 * Default bottom margin keeps a modest gap before the next block; it is intentionally
 * tighter than before so hero-style sections sit closer to the content below. Pass
 * `className` (e.g. `mb-0` or `mb-16`) when a page needs different spacing.
 */
export function SectionHeader({
  eyebrow,
  title,
  description,
  className,
  titleClassName,
  animate = true,
}: SectionHeaderProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  const content = (
    <>
      {eyebrow && (
        <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-slate-50 mb-4 md:mb-6 leading-[1.2] tracking-[-0.02em]",
          titleClassName
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "text-lg md:text-xl leading-relaxed",
            className?.includes("text-slate-900 dark:text-white")
              ? "text-slate-900 dark:text-white"
              : className?.includes("text-white") && !className?.includes("text-slate-900")
                ? "text-white"
                : className?.includes("dark:text-white")
                  ? "text-white dark:text-white"
                  : "text-slate-600 dark:text-slate-300"
          )}
        >
          {description}
        </p>
      )}
    </>
  );

  if (!animate) {
    return (
      <div
        ref={ref}
        className={cn("text-center max-w-3xl mx-auto mb-6 md:mb-8", className)}
      >
        {content}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={cn("text-center max-w-3xl mx-auto mb-6 md:mb-8", className)}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeInUp}
    >
      {content}
    </motion.div>
  );
}


