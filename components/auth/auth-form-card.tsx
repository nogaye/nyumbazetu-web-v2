"use client";

/**
 * Reusable auth form card: consistent container for sign-in, sign-up, forgot-password, reset-password.
 * Provides icon, title, description, and content slot with polished spacing and dark-mode support.
 */

import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface AuthFormCardProps {
  /** Optional icon element (e.g. Lock, UserPlus) to show above the title. */
  icon?: React.ReactNode;
  /** Main heading for the form. */
  title: string;
  /** Short subtitle or instruction. May include inline elements (e.g. strong for email). */
  description?: React.ReactNode;
  /** Form or content to render inside the card. */
  children: React.ReactNode;
  /** Optional class for the card root. */
  className?: string;
  /** Optional footer slot (e.g. "Don't have an account? Sign up"). */
  footer?: React.ReactNode;
}

/**
 * Card shell for auth forms with consistent typography and spacing.
 * Used by sign-in, sign-up, forgot-password, and reset-password pages.
 */
export function AuthFormCard({
  icon,
  title,
  description,
  children,
  className,
  footer,
}: AuthFormCardProps) {
  return (
    <Card
      className={cn(
        "w-full max-w-[400px] border-slate-200/90 shadow-card dark:border-slate-700/90 dark:shadow-slate-900/20",
        className
      )}
      aria-labelledby="auth-form-title"
      aria-describedby={description ? "auth-form-desc" : undefined}
    >
      <CardHeader className="space-y-3 pb-4 text-center">
        {icon && (
          <div
            className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary"
            aria-hidden
          >
            {icon}
          </div>
        )}
        <CardTitle id="auth-form-title" className="text-2xl font-semibold tracking-tight">
          {title}
        </CardTitle>
        {description != null && description !== "" && (
          <CardDescription id="auth-form-desc" className="text-sm text-muted-foreground">
            {description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {children}
      </CardContent>
      {footer ? <div className="px-6 pb-6 pt-0">{footer}</div> : null}
    </Card>
  );
}
