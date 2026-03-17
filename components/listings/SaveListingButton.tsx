"use client";

/**
 * Client-only save affordance for listing cards.
 * Keeps interactive event handlers inside the client boundary so the surrounding
 * listing card can remain server-rendered for faster initial grid delivery.
 */

import * as React from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SaveListingButtonProps {
  /** Optional click handler for future saved-listing wiring. */
  onSave?: () => void;
}

/**
 * Renders the floating save button used on listing cards.
 *
 * @param props - Button options and optional save callback.
 * @returns A client-side button that prevents the parent listing link from navigating.
 */
export function SaveListingButton({ onSave }: SaveListingButtonProps) {
  /**
   * Handles save clicks without allowing the surrounding listing link to navigate.
   *
   * @param event - Mouse event from the icon button.
   * @returns Nothing.
   */
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    onSave?.();
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={handleClick}
      className="absolute right-3 top-3 h-9 w-9 rounded-full bg-white/95 shadow-sm backdrop-blur-sm hover:bg-white dark:bg-slate-900/90 dark:hover:bg-slate-800"
      aria-label="Save listing"
    >
      <Heart className="h-4 w-4 text-slate-600 dark:text-slate-300" aria-hidden />
    </Button>
  );
}
