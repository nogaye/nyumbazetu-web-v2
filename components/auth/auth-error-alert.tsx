"use client";

/**
 * Consistent error alert for auth forms. Uses shadcn Alert with destructive variant.
 */

import * as React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AuthErrorAlertProps {
  /** Error message to display. */
  message: string;
  /** Optional title (default: "Error"). */
  title?: string;
  /** Optional class for the alert container. */
  className?: string;
}

/**
 * Displays a single auth error in an accessible, styled alert.
 */
export function AuthErrorAlert({
  message,
  title = "Error",
  className,
}: AuthErrorAlertProps) {
  if (!message) return null;
  return (
    <Alert
      variant="destructive"
      className={cn("rounded-lg", className)}
      role="alert"
      aria-live="polite"
    >
      <AlertCircle className="h-4 w-4" aria-hidden />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}
