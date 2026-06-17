import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n";
import { getContent } from "@/content";
import { buildPageMetadata } from "@/lib/seo";
import {
  audiencePath,
  localeHomeAlternates,
  localeHomePath,
} from "@/lib/routes";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { HeroSection } from "@/components/sections/HeroSection";
import { AudienceSelector } from "@/components/layout/AudienceSelector";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { landing } = getContent(locale);
  return buildPageMetadata({
    locale,
    title: landing.seo.title,
    description: landing.seo.description,
    path: localeHomePath(locale),
    alternates: localeHomeAlternates(),
  });
}

export default async function LocaleLandingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const loc = locale as Locale;
  const { landing } = getContent(loc);

  return (
    <>
      <HeroSection
        eyebrow="Dr. Giorgio Comola"
        title={landing.h1}
        subtitle={landing.subtitle}
        tone="dark"
      />

      <section className="bg-canvas">
        <Container className="py-16 sm:py-20">
          <Reveal className="mx-auto mb-12 max-w-2xl text-center">
            <p className="text-lg leading-relaxed text-ink/75">
              {landing.keyMessage}
            </p>
          </Reveal>

          <AudienceSelector
            patients={{
              href: audiencePath(loc, "patients"),
              label: landing.patientChoice.label,
              description: landing.patientChoice.description,
            }}
            colleagues={{
              href: audiencePath(loc, "colleagues"),
              label: landing.colleagueChoice.label,
              description: landing.colleagueChoice.description,
            }}
          />
        </Container>
      </section>
    </>
  );
}
