/**
 * Shared Framer Motion variants and transition configs.
 * Used across sections, cards, nav, and list items for consistent animation behaviour.
 */

import type { Variants, Transition } from "framer-motion";

/** Default spring transition for most UI animations. */
export const springTransition: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
  mass: 0.8,
};

/** Slightly slower spring for larger elements (e.g. sections). */
export const springSlow: Transition = {
  type: "spring",
  stiffness: 200,
  damping: 25,
  mass: 1,
};

/** Tween for predictable duration (e.g. dropdowns, modals). */
export const tweenTransition: Transition = {
  type: "tween",
  duration: 0.25,
  ease: [0.25, 0.1, 0.25, 1],
};

/** Fade in from below with optional stagger. */
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { ...springTransition, delay: i * 0.08 },
  }),
};

/** Fade in only (no vertical movement). */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (i = 0) => ({
    opacity: 1,
    transition: { ...springTransition, delay: i * 0.06 },
  }),
};

/** Container that staggers its children. */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      staggerDirection: 1,
    },
  },
};

/** Child of staggerContainer: fade in and move up slightly. */
export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: springTransition,
  },
};

/** Dropdown / overlay: scale and fade. */
export const dropdownVariants: Variants = {
  closed: {
    opacity: 0,
    scale: 0.96,
    transition: tweenTransition,
  },
  open: {
    opacity: 1,
    scale: 1,
    transition: tweenTransition,
  },
};

/** Card hover: subtle lift and shadow (use with whileHover). */
export const cardHoverTap = {
  rest: { scale: 1, y: 0 },
  hover: { scale: 1.02, y: -2, transition: springTransition },
  tap: { scale: 0.99, transition: { duration: 0.1 } },
};
