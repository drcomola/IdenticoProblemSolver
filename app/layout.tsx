import type { Metadata } from "next";
import { SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/seo";
import "./globals.css";

/**
 * Root layout — intentionally a passthrough.
 *
 * The actual <html lang> / <body> document chrome is owned per-locale by
 * app/[locale]/layout.tsx, so the lang attribute always matches the content.
 * The bare "/" redirects to "/it" (see app/page.tsx).
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Advanced digital orthodontics for patients. Clinical education and mentorship for professionals.",
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
