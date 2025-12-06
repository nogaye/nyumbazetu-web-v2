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
            },
            borderRadius: {
              lg: "var(--radius)",
              md: "calc(var(--radius) - 2px)",
              sm: "calc(var(--radius) - 4px)",
            },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
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

