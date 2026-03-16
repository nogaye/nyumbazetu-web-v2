import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
        theme: {
          extend: {
            colors: {
              background: "hsl(var(--background))",
              foreground: "hsl(var(--foreground))",
              card: {
                DEFAULT: "hsl(var(--card))",
                foreground: "hsl(var(--card-foreground))",
              },
              popover: {
                DEFAULT: "hsl(var(--popover))",
                foreground: "hsl(var(--popover-foreground))",
              },
              primary: {
                DEFAULT: "#b98036",
                50: "#f5ead8",
                100: "#ead5b1",
                200: "#dfc08a",
                300: "#d4ab63",
                400: "#c9963c",
                500: "#b98036",
                600: "#a06f2d",
                700: "#875e24",
                800: "#6e4d1b",
                900: "#553c12",
                foreground: "#ffffff",
              },
              secondary: {
                DEFAULT: "#344767",
                50: "#e8ebef",
                100: "#d1d7df",
                200: "#bac3cf",
                300: "#a3afbf",
                400: "#8c9baf",
                500: "#344767",
                600: "#2a3a56",
                700: "#202d45",
                800: "#162034",
                900: "#0c1323",
                foreground: "#ffffff",
              },
              tertiary: {
                DEFAULT: "#36b9a0",
                50: "#e6f7f4",
                100: "#cdefe9",
                200: "#b4e7de",
                300: "#9bdfd3",
                400: "#82d7c8",
                500: "#36b9a0",
                600: "#2ea088",
                700: "#258770",
                800: "#1c6e58",
                900: "#135540",
                foreground: "#ffffff",
              },
              muted: {
                DEFAULT: "hsl(var(--muted))",
                foreground: "hsl(var(--muted-foreground))",
              },
              accent: {
                DEFAULT: "hsl(var(--accent))",
                foreground: "hsl(var(--accent-foreground))",
              },
              destructive: {
                DEFAULT: "hsl(var(--destructive))",
                foreground: "hsl(var(--destructive-foreground))",
              },
              border: "hsl(var(--border))",
              input: "hsl(var(--input))",
              ring: "#b98036",
              slate: {
                50: "#f8fafc",
                100: "#f1f5f9",
                200: "#e2e8f0",
                300: "#cbd5e1",
                400: "#94a3b8",
                500: "#64748b",
                600: "#475569",
                700: "#334155",
                800: "#1e293b",
                900: "#0f172a",
                950: "#020617",
              },
              /** African-inspired accents: use sparingly for highlights, charts, empty states. */
              savannah: {
                DEFAULT: "#e6d3a3",
                light: "#f5e6c8",
                dark: "#d4c18a",
              },
              clay: "#c06b3e",
              "deep-forest": "#1f3d2b",
            },
            /** Rhythmic spacing inspired by African textile rhythm (8–16–24–16). Use for section gaps and card padding. */
            spacing: {
              "rhythm-sm": "0.5rem",  /* 8px */
              "rhythm-md": "1rem",    /* 16px */
              "rhythm-lg": "1.5rem",  /* 24px */
            },
            borderRadius: {
              lg: "var(--radius)",
              md: "calc(var(--radius) - 2px)",
              sm: "calc(var(--radius) - 4px)",
            },
            fontFamily: {
              sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
              display: ["var(--font-display)", "var(--font-geist-sans)", "system-ui", "sans-serif"],
              mono: ["var(--font-geist-mono)", "monospace"],
            },
            boxShadow: {
              card: "0 1px 3px 0 rgb(0 0 0 / 0.04), 0 1px 2px -1px rgb(0 0 0 / 0.04)",
              "card-hover": "0 4px 6px -1px rgb(0 0 0 / 0.06), 0 2px 4px -2px rgb(0 0 0 / 0.04)",
              dropdown: "0 10px 15px -3px rgb(0 0 0 / 0.06), 0 4px 6px -4px rgb(0 0 0 / 0.04)",
              glow: "0 0 40px -8px rgb(185 128 54 / 0.35)",
              "glow-lg": "0 0 60px -12px rgb(185 128 54 / 0.4)",
            },
            animation: {
              "gradient-mesh": "gradient-mesh 18s ease-in-out infinite",
              "fade-in-up": "fade-in-up 0.6s ease-out forwards",
              "scroll-bounce": "scroll-bounce 2s ease-in-out infinite",
            },
            keyframes: {
              "gradient-mesh": {
                "0%, 100%": { opacity: "1", transform: "scale(1) rotate(0deg)" },
                "50%": { opacity: "0.85", transform: "scale(1.05) rotate(2deg)" },
              },
              "fade-in-up": {
                "0%": { opacity: "0", transform: "translateY(12px)" },
                "100%": { opacity: "1", transform: "translateY(0)" },
              },
              "scroll-bounce": {
                "0%, 100%": { transform: "translateY(0)" },
                "50%": { transform: "translateY(6px)" },
              },
            },
            container: {
              center: true,
              padding: "1rem",
              screens: {
                sm: "640px",
                md: "768px",
                lg: "1024px",
                xl: "1280px",
                "2xl": "1400px",
              },
            },
          },
        },
  plugins: [],
  darkMode: "class",
};

export default config;

