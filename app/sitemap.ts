import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { locales, audiences, type Locale } from "@/lib/i18n";
import {
  audiencePath,
  localeHomePath,
  sectionPath,
  audienceAlternates,
  localeHomeAlternates,
  sectionAlternates,
  phase1Sections,
  type AlternateMap,
} from "@/lib/routes";

function abs(path: string): string {
  return `${SITE_URL}${path}`;
}

function alternatesLanguages(map: AlternateMap): Record<string, string> {
  return Object.fromEntries(
    (Object.keys(map) as Locale[]).map((l) => [l, abs(map[l])]),
  );
}

/**
 * Sitemap covers only pages rendered in Phase 1 (landing + audience homes),
 * each with reciprocal hreflang alternates. Section pages are added here as
 * they are built (see lib/routes.ts → phase1Sections).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  const lastModified = new Date();

  for (const locale of locales) {
    entries.push({
      url: abs(localeHomePath(locale)),
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      alternates: { languages: alternatesLanguages(localeHomeAlternates()) },
    });

    for (const audience of audiences) {
      entries.push({
        url: abs(audiencePath(locale, audience)),
        lastModified,
        changeFrequency: "monthly",
        priority: 0.9,
        alternates: {
          languages: alternatesLanguages(audienceAlternates(audience)),
        },
      });

      for (const section of phase1Sections[audience]) {
        entries.push({
          url: abs(sectionPath(locale, audience, section)),
          lastModified,
          changeFrequency: "monthly",
          priority: 0.8,
          alternates: {
            languages: alternatesLanguages(sectionAlternates(audience, section)),
          },
        });
      }
    }

    for (const doc of ["privacy", "cookie"]) {
      entries.push({
        url: abs(`/${locale}/legal/${doc}`),
        lastModified,
        changeFrequency: "yearly",
        priority: 0.2,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, abs(`/${l}/legal/${doc}`)]),
          ),
        },
      });
    }
  }

  return entries;
}
