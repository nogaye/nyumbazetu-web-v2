import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string | ReactNode;
  description?: string | ReactNode;
  className?: string;
  titleClassName?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  className,
  titleClassName,
}: SectionHeaderProps) {
  return (
    <div className={cn("text-center max-w-3xl mx-auto mb-12 md:mb-16", className)}>
      {eyebrow && (
        <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-slate-50 mb-4 md:mb-6 leading-tight tracking-tight",
          titleClassName
        )}
      >
        {title}
      </h2>
      {description && (
        <p className={cn("text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed", className?.includes("text-white") && "text-white")}>
          {description}
        </p>
      )}
    </div>
  );
}


