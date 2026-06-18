/**
 * Route map: localized slugs for every audience and section, in every locale.
 *
 * The URL structure is intentionally explicit (one entry per language) so that
 * Google, the editor and future contributors can read it directly — this mirrors
 * the SEO Strategy v1 "Struttura URL Consigliata".
 *
 * Phase 1 builds the landing + audience-home pages. The section maps below are
 * declared now so hreflang, the sitemap and future pages can scale without a
 * refactor. `phase1` flags which routes are actually rendered today.
 */

import { type Audience, type Locale, locales } from "./i18n";

/** Localized slug for each audience, per locale. */
export const audienceSlugs: Record<Audience, Record<Locale, string>> = {
  patients: { it: "pazienti", en: "patients", es: "pacientes" },
  colleagues: { it: "colleghi", en: "colleagues", es: "colegas" },
};

/** Language-agnostic section keys, grouped by audience. */
export const sectionKeys = {
  patients: [
    "about",
    "what-i-offer",
    "digital-orthodontics",
    "invisalign",
    "invisalign-game",
    "patient-expert-program",
    "first-consultation",
    "clinical-cases",
    "clinics",
    "faq",
    "book",
  ],
  colleagues: [
    "about",
    "education",
    "private-courses",
    "sas-courses",
    "align-p2p",
    "clinical-cases",
    "consulting",
  ],
} as const;

export type PatientsSection = (typeof sectionKeys.patients)[number];
export type ColleaguesSection = (typeof sectionKeys.colleagues)[number];
export type SectionKey = PatientsSection | ColleaguesSection;

/** Localized slug for each section key, per audience, per locale. */
export const sectionSlugs: Record<
  Audience,
  Partial<Record<SectionKey, Record<Locale, string>>>
> = {
  patients: {
    about: { it: "chi-sono", en: "about", es: "sobre-mi" },
    "what-i-offer": { it: "cosa-offro", en: "what-i-offer", es: "que-ofrezco" },
    "digital-orthodontics": {
      it: "ortodonzia-digitale",
      en: "digital-orthodontics",
      es: "ortodoncia-digital",
    },
    invisalign: { it: "invisalign", en: "invisalign", es: "invisalign" },
    "invisalign-game": {
      it: "gioco-allineatori",
      en: "aligner-game",
      es: "juego-alineadores",
    },
    "patient-expert-program": {
      it: "patient-expert-program",
      en: "patient-expert-program",
      es: "patient-expert-program",
    },
    "first-consultation": {
      it: "prima-visita",
      en: "first-consultation",
      es: "primera-visita",
    },
    "clinical-cases": {
      it: "casi-clinici",
      en: "clinical-cases",
      es: "casos-clinicos",
    },
    clinics: { it: "studi", en: "clinics", es: "clinicas" },
    faq: { it: "faq", en: "faq", es: "faq" },
    book: { it: "prenota", en: "book", es: "reservar" },
  },
  colleagues: {
    about: { it: "chi-sono", en: "about", es: "sobre-mi" },
    education: { it: "formazione", en: "education", es: "formacion" },
    "private-courses": {
      it: "corsi-privati",
      en: "private-courses",
      es: "cursos-privados",
    },
    "sas-courses": { it: "corsi-sas", en: "sas-courses", es: "cursos-sas" },
    "align-p2p": { it: "p2p-align", en: "align-p2p", es: "align-p2p" },
    "clinical-cases": {
      it: "casi-clinici",
      en: "clinical-cases",
      es: "casos-clinicos",
    },
    consulting: { it: "consulenza", en: "consulting", es: "consultoria" },
  },
};

/** Sections rendered (built pages). Listed in the sitemap. */
export const phase1Sections: Record<Audience, SectionKey[]> = {
  patients: [...sectionKeys.patients],
  colleagues: [...sectionKeys.colleagues],
};

/* ------------------------------------------------------------------ */
/* Path builders                                                       */
/* ------------------------------------------------------------------ */

export function localeHomePath(locale: Locale): string {
  return `/${locale}`;
}

export function audiencePath(locale: Locale, audience: Audience): string {
  return `/${locale}/${audienceSlugs[audience][locale]}`;
}

export function sectionPath(
  locale: Locale,
  audience: Audience,
  section: SectionKey,
): string {
  const slug = sectionSlugs[audience][section]?.[locale];
  return slug ? `${audiencePath(locale, audience)}/${slug}` : audiencePath(locale, audience);
}

/* ------------------------------------------------------------------ */
/* hreflang helpers                                                    */
/* ------------------------------------------------------------------ */

/** Same logical page across every locale — used for <link hreflang> alternates. */
export type AlternateMap = Record<Locale, string>;

export function localeHomeAlternates(): AlternateMap {
  return Object.fromEntries(
    locales.map((l) => [l, localeHomePath(l)]),
  ) as AlternateMap;
}

export function audienceAlternates(audience: Audience): AlternateMap {
  return Object.fromEntries(
    locales.map((l) => [l, audiencePath(l, audience)]),
  ) as AlternateMap;
}

export function sectionAlternates(
  audience: Audience,
  section: SectionKey,
): AlternateMap {
  return Object.fromEntries(
    locales.map((l) => [l, sectionPath(l, audience, section)]),
  ) as AlternateMap;
}

/** Reverse lookup: resolve a localized audience slug back to its key. */
export function audienceFromSlug(
  locale: Locale,
  slug: string,
): Audience | null {
  for (const audience of Object.keys(audienceSlugs) as Audience[]) {
    if (audienceSlugs[audience][locale] === slug) return audience;
  }
  return null;
}

/** Reverse lookup: resolve a localized section slug back to its key. */
export function sectionFromSlug(
  locale: Locale,
  audience: Audience,
  slug: string,
): SectionKey | null {
  const map = sectionSlugs[audience];
  for (const key of Object.keys(map) as SectionKey[]) {
    if (map[key]?.[locale] === slug) return key;
  }
  return null;
}

/**
 * Translate the current pathname into its equivalent in another locale.
 * Used by the language selector so switching language keeps the visitor on the
 * same logical page. Falls back to the target-locale home if a segment can't be
 * mapped.
 */
export function translatePath(pathname: string, target: Locale): string {
  const parts = pathname.split("/").filter(Boolean); // ["it","pazienti","faq"]
  const [sourceLocale, audienceSlug, sectionSlug] = parts;

  if (!sourceLocale || !isLocaleString(sourceLocale)) {
    return localeHomePath(target);
  }
  if (!audienceSlug) return localeHomePath(target);

  const audience = audienceFromSlug(sourceLocale, audienceSlug);
  if (!audience) return localeHomePath(target);

  if (!sectionSlug) return audiencePath(target, audience);

  const section = sectionFromSlug(sourceLocale, audience, sectionSlug);
  if (!section) return audiencePath(target, audience);

  return sectionPath(target, audience, section);
}

function isLocaleString(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
