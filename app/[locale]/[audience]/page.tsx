import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n";
import { getContent } from "@/content";
import {
  digitalSmileUi,
  getSmileJourneyDefinitions,
} from "@/content/digitalSmileNavigation";
import { buildPageMetadata } from "@/lib/seo";
import { resolveCtaHref } from "@/lib/links";
import {
  audienceFromSlug,
  audienceAlternates,
  audiencePath,
  sectionPath,
} from "@/lib/routes";
import { sectionLabel } from "@/content/navigation";
import {
  DigitalSmileNavigation,
  type SmileJourneyItem,
} from "@/components/digital-smile/DigitalSmileNavigation";

// Audience-segment params are generated in app/[locale]/[audience]/layout.tsx so
// they propagate to the section pages too.

type Params = Promise<{ locale: string; audience: string }>;

function resolve(locale: string, audienceSlug: string) {
  if (!isLocale(locale)) return null;
  const audience = audienceFromSlug(locale, audienceSlug);
  if (!audience) return null;
  return { loc: locale as Locale, audience };
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale, audience: audienceSlug } = await params;
  const r = resolve(locale, audienceSlug);
  if (!r) return {};
  const data = getContent(r.loc)[r.audience];
  return buildPageMetadata({
    locale: r.loc,
    title: data.seo.title,
    description: data.seo.description,
    path: audiencePath(r.loc, r.audience),
    alternates: audienceAlternates(r.audience),
  });
}

export default async function AudienceHomePage({ params }: { params: Params }) {
  const { locale, audience: audienceSlug } = await params;
  const r = resolve(locale, audienceSlug);
  if (!r) notFound();

  const { loc, audience } = r;
  const data = getContent(loc)[audience];
  const items: SmileJourneyItem[] = getSmileJourneyDefinitions(loc, audience).map(
    (item) => ({
      ...item,
      label: sectionLabel(loc, audience, item.section),
      href: sectionPath(loc, audience, item.section),
      audience,
    }),
  );

  return (
    <DigitalSmileNavigation
      locale={loc}
      audience={audience}
      title={data.h1}
      subtitle={data.subtitle}
      items={items}
      ui={digitalSmileUi[loc]}
      primaryCta={{
        label: data.primaryCta.label,
        href: resolveCtaHref(data.primaryCta, loc),
      }}
      secondaryCta={{
        label: data.secondaryCta.label,
        href: resolveCtaHref(data.secondaryCta, loc),
      }}
    />
  );
}

