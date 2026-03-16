"use client";

/**
 * Password input with optional visibility toggle.
 * Uses shadcn Input and Button; forwards ref and standard input props for form integration.
 */

import * as React from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface PasswordInputProps extends Omit<React.ComponentProps<typeof Input>, "type"> {
  /** When true, show password as plain text. */
  showPassword?: boolean;
  /** Callback when visibility toggle is clicked. */
  onToggleVisibility?: () => void;
  /** Optional class for the wrapper. */
  wrapperClassName?: string;
}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    {
      className,
      wrapperClassName,
      showPassword = false,
      onToggleVisibility,
      disabled,
      ...props
    },
    ref
  ) => {
    const [visible, setVisible] = React.useState(false);
    const isControlled = onToggleVisibility !== undefined;
    const show = isControlled ? showPassword : visible;

    const handleToggle = () => {
      if (isControlled) {
        onToggleVisibility();
      } else {
        setVisible((v) => !v);
      }
    };

    return (
      <div className={cn("relative", wrapperClassName)}>
        <Input
          ref={ref}
          type={show ? "text" : "password"}
          autoComplete={props.autoComplete ?? "current-password"}
          disabled={disabled}
          className={cn("pr-10", className)}
          aria-describedby={props["aria-describedby"]}
          {...props}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-0 top-0 h-full min-h-0 min-w-[44px] rounded-l-none border-0 text-muted-foreground hover:bg-muted/50 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          onClick={handleToggle}
          disabled={disabled}
          aria-label={show ? "Hide password" : "Show password"}
          tabIndex={-1}
        >
          {show ? (
            <EyeOff className="h-4 w-4" aria-hidden />
          ) : (
            <Eye className="h-4 w-4" aria-hidden />
          )}
        </Button>
      </div>
    );
  }
);
PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
