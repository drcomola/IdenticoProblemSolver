import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { isLocale, type Locale } from "@/lib/i18n";
import { getContent } from "@/content";
import { buildPageMetadata } from "@/lib/seo";
import { resolveCtaHref } from "@/lib/links";
import {
  audienceFromSlug,
  audienceAlternates,
  audiencePath,
} from "@/lib/routes";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ContentCard } from "@/components/ui/ContentCard";
import { SectionNavGrid } from "@/components/sections/SectionNavGrid";
import { Filigree } from "@/components/ui/Filigree";
import { HeroSection } from "@/components/sections/HeroSection";

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

  return (
    <>
      <HeroSection
        eyebrow={
          audience === "patients"
            ? "Pazienti · Patients · Pacientes"
            : "Colleghi · Colleagues · Colegas"
        }
        title={data.h1}
        subtitle={data.subtitle}
        actions={
          <>
            <Button href={resolveCtaHref(data.primaryCta, loc)} variant="primary">
              {data.primaryCta.label}
            </Button>
            <Button
              href={resolveCtaHref(data.secondaryCta, loc)}
              variant="secondary"
            >
              {data.secondaryCta.label}
            </Button>
          </>
        }
        aside={
          <div className="relative overflow-hidden rounded-2xl border border-titanium/60 bg-white shadow-soft">
            <div className="relative aspect-[4/5]">
              <Image
                src="/images/site/mainfoto.webp"
                alt={
                  {
                    it: "Ritratto del Dr. Giorgio Comola",
                    en: "Portrait of Dr. Giorgio Comola",
                    es: "Retrato del Dr. Giorgio Comola",
                  }[loc]
                }
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 520px"
                style={{ objectPosition: "50% center" }}
              />
            </div>
          </div>
        }
      />

      {/* "Who it is for" + key message */}
      {data.audienceList ? (
        <section className="bg-canvas">
          <Container className="py-16 sm:py-20">
            <Reveal>
              <h2 className="text-2xl font-semibold text-teal-deep sm:text-3xl">
                {data.audienceList.heading}
              </h2>
            </Reveal>
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {data.audienceList.items.map((item, i) => (
                <Reveal key={i} delay={i * 0.06}>
                  <ContentCard>{item}</ContentCard>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {data.keyMessage ? (
        <section className="bg-aqua-wash">
          <Container className="py-16 sm:py-20">
            <Reveal className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-aqua">
                {data.keyMessage.heading}
              </p>
              <p className="mt-4 font-display text-2xl leading-snug text-teal-deep sm:text-3xl">
                {data.keyMessage.body}
              </p>
            </Reveal>
          </Container>
        </section>
      ) : null}

      {/* Visual section navigation */}
      <SectionNavGrid
        locale={loc}
        audience={audience}
        heading={
          { it: "Esplora", en: "Explore", es: "Explora" }[loc]
        }
      />

      {/* Closing conversion band */}
      <section className="relative overflow-hidden bg-night-field text-canvas">
        <Filigree tone="dark" />
        <Container className="relative z-10 py-20 text-center">
          <Reveal className="mx-auto max-w-2xl">
            <h2 className="text-balance text-3xl font-semibold sm:text-4xl">
              {data.subtitle}
            </h2>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <Button
                href={resolveCtaHref(data.primaryCta, loc)}
                variant="onDark"
              >
                {data.primaryCta.label}
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
