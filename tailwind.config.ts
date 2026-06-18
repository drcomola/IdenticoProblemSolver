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
        // iDenTiCo luxury-tech palette
        teal: {
          DEFAULT: "#006D88",
          deep: "#00323D",
        },
        aqua: {
          DEFAULT: "#00DDF9",
          dark: "#00DDF9",
          soft: "#4FB3BF",
        },
        blue: {
          accent: "#0039A3",
        },
        titanium: "#C5CCD3",
        silver: "#C5CCD3",
        canvas: "#F8FAFB",
        ink: "#111827",
        muted: "#A8B5BE",
        night: {
          DEFAULT: "#02070A",
          soft: "#071116",
          panel: "#06141A",
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
        tightish: "0em",
      },
      boxShadow: {
        soft: "0 24px 80px -46px rgba(0, 50, 61, 0.45)",
        glow: "0 0 0 1px rgba(0, 221, 249, 0.18), 0 24px 80px -44px rgba(0, 221, 249, 0.5)",
        panel: "0 30px 90px -55px rgba(2, 7, 10, 0.8)",
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
