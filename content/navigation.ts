import type { Audience, Locale } from "@/lib/i18n";
import type { SectionKey } from "@/lib/routes";
import { sectionKeys } from "@/lib/routes";

/**
 * Short menu labels for each section, per audience, per locale. Kept compact
 * (these feed the header navigation and the audience-home section grid). The
 * display order follows `sectionKeys` in lib/routes.ts.
 */
const labels: Record<Locale, Record<Audience, Partial<Record<SectionKey, string>>>> = {
  it: {
    patients: {
      about: "Chi sono",
      "what-i-offer": "Cosa offro",
      "digital-orthodontics": "Ortodonzia digitale",
      invisalign: "Invisalign",
      "invisalign-game": "Gioco Allineatori",
      "patient-expert-program": "Patient Expert",
      "aligner-support": "Supporto Allineatori",
      "first-consultation": "Prima visita",
      "clinical-cases": "Casi clinici",
      clinics: "Studi",
      faq: "FAQ",
      book: "Prenota",
    },
    colleagues: {
      about: "Chi sono",
      education: "Formazione",
      "private-courses": "Corsi privati",
      "sas-courses": "Corsi SAS",
      "align-p2p": "P2P Align",
      "clinical-cases": "Casi clinici",
      consulting: "Consulenza",
    },
  },
  en: {
    patients: {
      about: "About",
      "what-i-offer": "What I offer",
      "digital-orthodontics": "Digital orthodontics",
      invisalign: "Invisalign",
      "invisalign-game": "Aligner game",
      "patient-expert-program": "Patient Expert",
      "aligner-support": "Aligner Support",
      "first-consultation": "First consultation",
      "clinical-cases": "Clinical cases",
      clinics: "Clinics",
      faq: "FAQ",
      book: "Book",
    },
    colleagues: {
      about: "About",
      education: "Education",
      "private-courses": "Private courses",
      "sas-courses": "SAS courses",
      "align-p2p": "Align P2P",
      "clinical-cases": "Clinical cases",
      consulting: "Consulting",
    },
  },
  es: {
    patients: {
      about: "Sobre mí",
      "what-i-offer": "Qué ofrezco",
      "digital-orthodontics": "Ortodoncia digital",
      invisalign: "Invisalign",
      "invisalign-game": "Juego alineadores",
      "patient-expert-program": "Patient Expert",
      "aligner-support": "Soporte Alineadores",
      "first-consultation": "Primera visita",
      "clinical-cases": "Casos clínicos",
      clinics: "Clínicas",
      faq: "FAQ",
      book: "Reservar",
    },
    colleagues: {
      about: "Sobre mí",
      education: "Formación",
      "private-courses": "Cursos privados",
      "sas-courses": "Cursos SAS",
      "align-p2p": "Align P2P",
      "clinical-cases": "Casos clínicos",
      consulting: "Consultoría",
    },
  },
};

export function sectionLabel(
  locale: Locale,
  audience: Audience,
  section: SectionKey,
): string {
  return labels[locale][audience][section] ?? section;
}

/** Ordered list of section keys for an audience (drives menus + grids). */
export function orderedSections(audience: Audience): SectionKey[] {
  return [...sectionKeys[audience]];
}
