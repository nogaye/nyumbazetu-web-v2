"use client";

/**
 * Inline hint for password requirements on sign-up and reset-password.
 * Keeps copy consistent and accessible.
 */

import * as React from "react";
import { cn } from "@/lib/utils";

export interface PasswordStrengthHintProps {
  /** Minimum length (e.g. 8). */
  minLength?: number;
  /** Optional class. */
  className?: string;
}

/**
 * Displays a short, accessible hint for password rules.
 */
export function PasswordStrengthHint({
  minLength = 8,
  className,
}: PasswordStrengthHintProps) {
  return (
    <p
      id="password-requirements"
      className={cn("text-xs text-muted-foreground", className)}
      role="status"
    >
      At least {minLength} characters. Use a mix of letters, numbers, and symbols for a stronger password.
    </p>
  );
}
