/**
 * Step-by-step “how it works” strip for the services landing page.
 * Progressive disclosure: short titles + one line each to avoid Hick’s Law overload.
 */

import type { ComponentType } from "react";
import {
  BuildingOffice2Icon,
  CameraIcon,
  BoltIcon,
  UserGroupIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

/** One step in the maintenance request flow (copy from vendors.md). */
interface FlowStep {
  /** Stable key for list rendering. */
  id: string;
  /** Short step title. */
  title: string;
  /** One-line explanation. */
  description: string;
  /** Heroicon for visual scan. */
  Icon: ComponentType<{ className?: string }>;
}

const STEPS: FlowStep[] = [
  {
    id: "1",
    title: "Select property",
    description: "Choose the unit or block with context pre-filled from your portfolio.",
    Icon: BuildingOffice2Icon,
  },
  {
    id: "2",
    title: "Describe & upload",
    description: "Explain the issue and attach photos so vendors quote accurately.",
    Icon: CameraIcon,
  },
  {
    id: "3",
    title: "Set urgency",
    description: "Flag routine, urgent, or emergency so response times match risk.",
    Icon: BoltIcon,
  },
  {
    id: "4",
    title: "Get suggestions",
    description: "See verified vendors matched to category, area, and availability.",
    Icon: UserGroupIcon,
  },
  {
    id: "5",
    title: "Send & compare",
    description: "Dispatch requests, compare quotes, and track work in one place.",
    Icon: PaperAirplaneIcon,
  },
];

export interface HowItWorksProps {
  /** Optional class on the wrapping section. */
  className?: string;
}

/**
 * Renders vertical steps on small screens and a horizontal timeline on large screens.
 * @param props - Optional section className.
 */
export function HowItWorks({ className }: HowItWorksProps) {
  return (
    <section
      className={cn("scroll-mt-24", className)}
      aria-labelledby="how-it-works-heading"
    >
      <h2
        id="how-it-works-heading"
        className="font-display text-2xl font-bold text-secondary dark:text-slate-100 sm:text-3xl"
      >
        How it works
      </h2>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        From issue to completed job: a simple flow for managers, landlords, and tenants.
      </p>
      <ol className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-5">
        {STEPS.map((step, index) => {
          const Icon = step.Icon;
          return (
            <li
              key={step.id}
              className="relative rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm dark:border-slate-700/90 dark:bg-slate-900/40"
            >
              <span className="absolute -top-3 left-4 inline-flex h-7 min-w-[1.75rem] items-center justify-center rounded-full bg-primary px-2 text-xs font-bold text-primary-foreground">
                {index + 1}
              </span>
              <Icon className="mt-4 h-8 w-8 text-primary" aria-hidden />
              <h3 className="mt-3 font-display text-base font-semibold text-secondary dark:text-slate-100">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
