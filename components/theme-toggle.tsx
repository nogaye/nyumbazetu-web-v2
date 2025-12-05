"use client";

import { useContext, useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { ThemeContext } from "./theme-provider";

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
    <button
      type="button"
      onClick={toggleTheme}
      className="p-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? (
        <MoonIcon className="h-5 w-5" />
      ) : (
        <SunIcon className="h-5 w-5" />
      )}
    </button>
  );
}
