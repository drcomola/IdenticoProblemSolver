import type { Locale } from "@/lib/i18n";
import type { Dictionary, LocaleContent } from "./types";
import { it } from "./it";
import { en } from "./en";
import { es } from "./es";
import { dictionaries } from "./dictionaries";
import { sectionLead } from "./sections/leads";

const content: Record<Locale, LocaleContent> = { it, en, es };

export function getContent(locale: Locale): LocaleContent {
  return content[locale];
}

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

/** Look up a single section page's content, or null if it doesn't exist. */
export function getSection(
  locale: Locale,
  audience: "patients" | "colleagues",
  sectionKey: string,
) {
  const sections =
    audience === "patients"
      ? content[locale].patientsSections
      : content[locale].colleaguesSections;
  const section = sections[sectionKey];
  if (!section) return null;
  // Merge in the (optional) richer lead paragraph kept in sections/leads.ts.
  return { ...section, lead: section.lead ?? sectionLead(locale, audience, sectionKey) };
}

export type { LocaleContent, Dictionary };
