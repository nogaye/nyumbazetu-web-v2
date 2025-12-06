"use client";

import { useContext, useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { ThemeContext } from "./theme-provider";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const context = useContext(ThemeContext);

  useEffect(() => {
    setMounted(true);
    if (context) {
      setTheme(context.theme);
    } else if (typeof window !== "undefined") {
      // Fallback: read from localStorage or default to light
      const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
      setTheme(savedTheme || "light");
    }
  }, []);

  useEffect(() => {
    if (context) {
      setTheme(context.theme);
    }
  }, [context?.theme]);

  const toggleTheme = () => {
    if (context) {
      context.toggleTheme();
    } else if (typeof window !== "undefined") {
      // Fallback: toggle manually
      const newTheme = theme === "light" ? "dark" : "light";
      setTheme(newTheme);
      document.documentElement.classList.toggle("dark", newTheme === "dark");
      localStorage.setItem("theme", newTheme);
    }
  };

  if (!mounted) {
    return (
      <div className="p-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800">
        <div className="h-5 w-5" />
      </div>
    );
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      className="h-8 w-8 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
    >
      {theme === "light" ? (
        <MoonIcon className="h-4 w-4" />
      ) : (
        <SunIcon className="h-4 w-4" />
      )}
    </Button>
  );
}
