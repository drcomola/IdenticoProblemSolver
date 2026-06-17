import { isLocale, type Audience } from "@/lib/i18n";
import { audienceSlugs } from "@/lib/routes";

/**
 * Audience-segment layout (passthrough).
 *
 * It exists so that `generateStaticParams` for the `[audience]` segment lives on
 * an ancestor of BOTH the audience home (`page.tsx`) and the section pages
 * (`[section]/page.tsx`). Without this, the localized audience slugs would not
 * propagate down to the `[section]` branch and section pages wouldn't prerender.
 */
export function generateStaticParams({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  if (!isLocale(locale)) return [];
  return (Object.keys(audienceSlugs) as Audience[]).map((audience) => ({
    audience: audienceSlugs[audience][locale],
  }));
}

export default function AudienceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
