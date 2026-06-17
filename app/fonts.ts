import { Inter, Playfair_Display } from "next/font/google";

/** Body — highly legible, modern. */
export const sans = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

/** Display — premium serif for headings. */
export const display = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700"],
  variable: "--font-display",
});
