/**
 * SEO helpers: canonical/hreflang metadata + JSON-LD structured data.
 *
 * Implements the SEO Strategy v1 technical requirements:
 *  - unique title/description per page
 *  - self-referencing canonical (translated pages never canonicalize to IT)
 *  - reciprocal hreflang alternates for it/en/es + x-default
 *  - JSON-LD Person (site-wide) and FAQPage (FAQ pages)
 */

import type { Metadata } from "next";
import { type AlternateMap } from "./routes";
import { type Locale, defaultLocale, localeHtmlLang } from "./i18n";

/** Public site origin. Override per-environment via NEXT_PUBLIC_SITE_URL. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.giorgiocomola.com"
).replace(/\/$/, "");

export const SITE_NAME = "Dr. Giorgio Comola";
export const SITE_TAGLINE = "Digital Orthodontics & Clinical Education";

function abs(path: string): string {
  return `${SITE_URL}${path}`;
}

/**
 * Build hreflang alternates for next/metadata.
 * x-default points to the default locale (Italian).
 */
function languageAlternates(alternates: AlternateMap): Record<string, string> {
  const languages: Record<string, string> = {};
  (Object.keys(alternates) as Locale[]).forEach((locale) => {
    languages[localeHtmlLang[locale]] = abs(alternates[locale]);
  });
  languages["x-default"] = abs(alternates[defaultLocale]);
  return languages;
}

type PageMetaInput = {
  locale: Locale;
  title: string;
  description: string;
  /** Self path for this locale (also the canonical). */
  path: string;
  /** Reciprocal localized paths for hreflang. */
  alternates: AlternateMap;
  /** Optional OG image path (defaults to brand share image). */
  ogImage?: string;
};

export function buildPageMetadata({
  locale,
  title,
  description,
  path,
  alternates,
  ogImage = "/images/og/default-og.png",
}: PageMetaInput): Metadata {
  const canonical = abs(path);

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: languageAlternates(alternates),
    },
    openGraph: {
      type: "website",
      url: canonical,
      siteName: SITE_NAME,
      locale: localeHtmlLang[locale],
      title,
      description,
      images: [{ url: abs(ogImage), width: 1200, height: 630, alt: SITE_NAME }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [abs(ogImage)],
    },
  };
}

/* ------------------------------------------------------------------ */
/* JSON-LD                                                             */
/* ------------------------------------------------------------------ */

/** Person schema for Dr. Giorgio Comola — emitted site-wide in the locale layout. */
export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Giorgio Comola",
    honorificPrefix: "Dr.",
    jobTitle: "Orthodontist",
    description:
      "Digital orthodontics, clear aligners and advanced clinical planning. International clinical education and mentorship for dentists and orthodontists.",
    url: SITE_URL,
    image: abs("/images/og/default-og.png"),
    knowsAbout: [
      "Digital Orthodontics",
      "Clear Aligners",
      "Invisalign",
      "ClinCheck",
      "Orthodontic Biomechanics",
      "Clinical Education",
    ],
    sameAs: [] as string[],
  };
}

type FaqItem = { question: string; answer: string };

/** FAQPage schema — emitted on FAQ pages. */
export function faqPageJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
