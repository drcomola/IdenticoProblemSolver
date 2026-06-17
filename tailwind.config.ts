import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand Identity v1 — Dr. Giorgio Comola
        teal: {
          DEFAULT: "#0F4C5C", // Primary — Deep Teal
          deep: "#0F4C5C",
        },
        aqua: {
          DEFAULT: "#4FB3BF", // Secondary — Aqua Luxury
          dark: "#7FD7E3", // Dark-mode accent
        },
        titanium: "#C5CCD3", // Accent — Silver Titanium
        canvas: "#F8FAFB", // Light background
        ink: "#111827", // Text
        night: {
          DEFAULT: "#0B1117", // Dark premium background
          soft: "#101822",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "72rem",
      },
      letterSpacing: {
        tightish: "-0.015em",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
