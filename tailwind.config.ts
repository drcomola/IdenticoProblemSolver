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
          DEFAULT: "#1A7A8C", // medium teal — hover / accent text
          deep: "#0F4C5C",   // darkest teal — headings / primary backgrounds
        },
        aqua: {
          DEFAULT: "#4FB3BF", // brand aqua
          dark: "#3A98A4",    // slightly deeper for contrast
          soft: "#8ED4DA",    // pale tint for backgrounds
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
        soft: "0 24px 80px -46px rgba(15, 76, 92, 0.36)",
        glow: "0 0 0 1px rgba(79, 179, 191, 0.2), 0 24px 80px -44px rgba(79, 179, 191, 0.42)",
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
