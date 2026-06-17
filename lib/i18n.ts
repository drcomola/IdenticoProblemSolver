/**
 * i18n core configuration.
 *
 * Three locales, served from separate URL prefixes (/it, /en, /es) per the
 * SEO Strategy. The default locale (Italian) is NOT prefix-less at the content
 * level: the bare "/" simply redirects to "/it".
 */

export const locales = ["it", "en", "es"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "it";

export const localeNames: Record<Locale, string> = {
  it: "Italiano",
  en: "English",
  es: "Español",
};

/** BCP-47 tags used for <html lang> and hreflang alternates. */
export const localeHtmlLang: Record<Locale, string> = {
  it: "it-IT",
  en: "en",
  es: "es-ES",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Two journeys, language-agnostic keys. Slugs are localized in routes.ts. */
export const audiences = ["patients", "colleagues"] as const;
export type Audience = (typeof audiences)[number];
