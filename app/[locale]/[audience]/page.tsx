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
  sectionPath,
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
  const isColleagues = audience === "colleagues";
  const patientCardTitles: Record<Locale, string[]> = {
    it: ["Adulti", "Adolescenti", "Bambini", "Approccio"],
    en: ["Adults", "Teenagers", "Children", "Approach"],
    es: ["Adultos", "Adolescentes", "Ninos", "Enfoque"],
  };
  const gameSpotlight = {
    it: {
      eyebrow: "Sala d'attesa digitale",
      title: "Gioco Allineatori",
      body: "Un mini gioco leggero per scoprire buone abitudini e piccoli imprevisti del trattamento con allineatori.",
      action: "Apri il gioco",
      secondary: "Guarda Invisalign",
    },
    en: {
      eyebrow: "Digital waiting room",
      title: "Aligner game",
      body: "A light mini game to discover good habits and small surprises during clear aligner treatment.",
      action: "Open the game",
      secondary: "View aligners",
    },
    es: {
      eyebrow: "Sala de espera digital",
      title: "Juego alineadores",
      body: "Un mini juego ligero para descubrir buenos habitos y pequenos imprevistos del tratamiento con alineadores.",
      action: "Abrir el juego",
      secondary: "Ver alineadores",
    },
  } as const;
  const platformCards = {
    it: [
      { title: "Mentorship", section: "consulting", body: "Percorsi di supporto clinico continuativo e revisione strategica." },
      { title: "ClinCheck", section: "consulting", body: "Lettura del setup, biomeccanica, staging e controllo dei movimenti." },
      { title: "Corsi privati", section: "private-courses", body: "Formazione one-to-one o team, costruita sui casi reali dello studio." },
      { title: "P2P Align", section: "align-p2p", body: "Confronto clinico tra colleghi su casi, dubbi e scelte operative." },
      { title: "Corsi SAS", section: "sas-courses", body: "Percorsi strutturati per alzare il livello clinico con gli allineatori." },
    ],
    en: [
      { title: "Mentorship", section: "consulting", body: "Ongoing clinical support and strategic case review." },
      { title: "ClinCheck", section: "consulting", body: "Setup reading, biomechanics, staging and movement control." },
      { title: "Private courses", section: "private-courses", body: "One-to-one or team education built around real cases." },
      { title: "Align P2P", section: "align-p2p", body: "Clinical exchange between colleagues on cases, doubts and decisions." },
      { title: "SAS courses", section: "sas-courses", body: "Structured pathways to raise clinical control with aligners." },
    ],
    es: [
      { title: "Mentoria", section: "consulting", body: "Soporte clinico continuado y revision estrategica de casos." },
      { title: "ClinCheck", section: "consulting", body: "Lectura del setup, biomecanica, staging y control de movimientos." },
      { title: "Cursos privados", section: "private-courses", body: "Formacion one-to-one o para equipos basada en casos reales." },
      { title: "P2P Align", section: "align-p2p", body: "Intercambio clinico entre colegas sobre casos, dudas y decisiones." },
      { title: "Cursos SAS", section: "sas-courses", body: "Recorridos estructurados para elevar el control clinico con alineadores." },
    ],
  } as const;
  const platformIntro = {
    it: {
      eyebrow: "Piattaforma clinica",
      title: "Formazione, pianificazione, mentorship.",
    },
    en: {
      eyebrow: "Clinical platform",
      title: "Education, planning, mentorship.",
    },
    es: {
      eyebrow: "Plataforma clinica",
      title: "Formacion, planificacion, mentoria.",
    },
  } as const;

  return (
    <>
      <HeroSection
        eyebrow={
          audience === "patients"
            ? "Pazienti / Patients / Pacientes"
            : "Colleghi / Colleagues / Colegas"
        }
        title={data.h1}
        subtitle={data.subtitle}
        tone={isColleagues ? "dark" : "light"}
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
          <div
            className={`relative overflow-hidden rounded-xl ${
              isColleagues
                ? "border border-white/[0.12] bg-white/[0.04] shadow-panel"
                : "premium-panel"
            }`}
          >
            <div className="relative aspect-[4/5]">
              <Image
                src={isColleagues ? "/images/site/emea-ortho-summit-2026.webp" : "/images/site/mainfoto.webp"}
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
        <section className={isColleagues ? "bg-night text-canvas" : "bg-canvas"}>
          <Container className="py-16 sm:py-20">
            <Reveal>
              <h2
                className={`text-2xl font-semibold sm:text-3xl ${
                  isColleagues ? "text-canvas" : "text-teal-deep"
                }`}
              >
                {data.audienceList.heading}
              </h2>
            </Reveal>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {data.audienceList.items.map((item, i) => (
                <Reveal key={i} delay={i * 0.06}>
                  <ContentCard
                    title={!isColleagues ? patientCardTitles[loc][i] : undefined}
                    className={
                      isColleagues
                        ? "border-white/10 bg-white/[0.045] text-canvas hover:border-aqua/45 [&_div]:text-canvas/70"
                        : ""
                    }
                  >
                    {item}
                  </ContentCard>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {!isColleagues ? (
        <section className="relative overflow-hidden bg-night-field text-canvas">
          <div className="bg-technical-grid pointer-events-none absolute inset-0 opacity-55" />
          <Container className="relative z-10 py-16 sm:py-20">
            <Reveal>
              <div className="grid gap-8 rounded-xl border border-white/10 bg-white/[0.045] p-6 shadow-panel backdrop-blur-md sm:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal">
                    {gameSpotlight[loc].eyebrow}
                  </p>
                  <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
                    {gameSpotlight[loc].title}
                  </h2>
                  <p className="mt-4 max-w-2xl text-base leading-relaxed text-canvas/[0.72]">
                    {gameSpotlight[loc].body}
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                  <Button
                    href={sectionPath(loc, "patients", "invisalign-game")}
                    variant="onDark"
                  >
                    {gameSpotlight[loc].action}
                  </Button>
                  <Button
                    href={sectionPath(loc, "patients", "invisalign")}
                    variant="secondary"
                    className="border-white/[0.18] bg-white/[0.04] text-canvas hover:border-aqua/65 hover:bg-white/[0.08] hover:text-canvas"
                  >
                    {gameSpotlight[loc].secondary}
                  </Button>
                </div>
              </div>
            </Reveal>
          </Container>
        </section>
      ) : null}

      {isColleagues ? (
        <section className="relative overflow-hidden bg-night-field text-canvas">
          <div className="bg-technical-grid pointer-events-none absolute inset-0" />
          <Container className="relative z-10 py-20 sm:py-24">
            <Reveal className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal">
                {platformIntro[loc].eyebrow}
              </p>
              <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
                {platformIntro[loc].title}
              </h2>
            </Reveal>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {platformCards[loc].map((card, i) => (
                <Reveal key={card.title} delay={i * 0.04}>
                  <a
                    href={sectionPath(loc, "colleagues", card.section)}
                    className="group flex h-full min-h-[13rem] flex-col rounded-xl border border-white/10 bg-white/[0.045] p-5 shadow-panel backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-aqua/55 hover:bg-white/[0.07]"
                  >
                    <span className="h-px w-12 bg-aqua" />
                    <span className="mt-5 text-lg font-semibold text-canvas">
                      {card.title}
                    </span>
                    <span className="mt-3 text-sm leading-relaxed text-canvas/[0.62]">
                      {card.body}
                    </span>
                    <span className="mt-auto pt-5 text-sm font-semibold text-teal transition-transform group-hover:translate-x-1">
                      -&gt;
                    </span>
                  </a>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {data.keyMessage ? (
        <section className={isColleagues ? "bg-night text-canvas" : "bg-aqua-wash"}>
          <Container className="py-16 sm:py-20">
            <Reveal className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal">
                {data.keyMessage.heading}
              </p>
              <p
                className={`mt-4 font-display text-2xl leading-snug sm:text-3xl ${
                  isColleagues ? "text-canvas" : "text-teal-deep"
                }`}
              >
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

