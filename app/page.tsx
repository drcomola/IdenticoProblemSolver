import type { Metadata } from "next";
import { display, sans } from "./fonts";
import { locales, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/content";
import type { Dictionary } from "@/content/types";
import { GatewayChooser } from "@/components/gateway/GatewayChooser";

/**
 * Welcome gateway at "/".
 *
 * Language-neutral splash: pick a language + a path, then enter the site. It is
 * noindex (the indexable landings are the localized /it, /en, /es pages), and —
 * because the root layout is a passthrough — this page renders its own document
 * chrome, like app/not-found.tsx.
 */
export const metadata: Metadata = {
  robots: { index: false, follow: true },
  alternates: { canonical: "/" },
};

export default function GatewayPage() {
  const gateways = Object.fromEntries(
    locales.map((l) => [l, getDictionary(l).gateway]),
  ) as Record<Locale, Dictionary["gateway"]>;

  return (
    <html lang="it" className={`${sans.variable} ${display.variable}`} suppressHydrationWarning>
      <body>
        <GatewayChooser gateways={gateways} />
      </body>
    </html>
  );
}
