import type { Cta } from "@/content/types";
import type { Locale } from "./i18n";
import {
  audiencePath,
  localeHomePath,
  sectionPath,
  type SectionKey,
} from "./routes";

/**
 * Resolve a content-level CTA target into a concrete localized href.
 * Sections that are not yet built (Phase 1) gracefully fall back to the
 * audience home, so no CTA ever points at a 404.
 */
export function resolveCtaHref(cta: Cta, locale: Locale): string {
  const t = cta.target;
  switch (t.kind) {
    case "home":
      return localeHomePath(locale);
    case "audience":
      return audiencePath(locale, t.audience);
    case "section":
      return sectionPath(locale, t.audience, t.section as SectionKey);
    case "external":
      return t.href;
  }
}
