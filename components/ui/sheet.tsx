"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

const Sheet = ({ open, onOpenChange, children }: SheetProps) => {
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />
      {children}
    </>
  );
};

const SheetHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-2 p-6 relative", className)} {...props} />
);

const SheetTitle = ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h2 className={cn("text-lg font-semibold text-slate-900", className)} {...props} />
);

const SheetClose = ({ onClick }: { onClick: () => void }) => (
  <Button
    type="button"
    variant="ghost"
    size="icon"
    onClick={onClick}
    className="absolute right-4 top-4 z-10 opacity-70 hover:opacity-100"
    aria-label="Close menu"
  >
    <X className="h-5 w-5" />
    <span className="sr-only">Close</span>
  </Button>
);

const SheetContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div 
      ref={ref}
      className={cn("fixed top-0 right-0 bottom-0 z-[100] w-full max-w-lg border-l border-slate-200 bg-white shadow-xl overflow-y-auto dark:border-slate-800 dark:bg-slate-900", className)} 
      {...props}
    >
      <div className="pt-16">
        {children}
      </div>
    </div>
  )
);
SheetContent.displayName = "SheetContent";

const SheetDescription = ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn("text-sm text-slate-600 dark:text-slate-400", className)} {...props} />
);

const SheetTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }
>(({ asChild, children, ...props }, ref) => {
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, { ref, ...props } as any);
  }
  return (
    <button ref={ref} {...props}>
      {children}
    </button>
  );
});
SheetTrigger.displayName = "SheetTrigger";

export { Sheet, SheetHeader, SheetTitle, SheetClose, SheetContent, SheetDescription, SheetTrigger };

