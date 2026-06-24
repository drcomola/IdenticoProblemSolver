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
import {
  ClinCheckIcon,
  DigitalWorkflowIcon,
  FeatureIconCard,
  InternationalSpeakerIcon,
} from "@/components/icons/BrandIcons";

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
  const identitySection = {
    it: {
      title: "Digital diagnosis. Clinical control. International education.",
      cards: [
        { title: "Workflow digitale", body: "Dati, diagnosi e pianificazione in un percorso controllato.", icon: DigitalWorkflowIcon },
        { title: "ClinCheck clinico", body: "Il software diventa utile quando segue una strategia ortodontica.", icon: ClinCheckIcon },
        { title: "Formazione internazionale", body: "Metodo condiviso tra clinica quotidiana, palco e mentorship.", icon: InternationalSpeakerIcon },
      ],
    },
    en: {
      title: "Digital diagnosis. Clinical control. International education.",
      cards: [
        { title: "Digital workflow", body: "Data, diagnosis and planning in one controlled pathway.", icon: DigitalWorkflowIcon },
        { title: "Clinical ClinCheck", body: "Software becomes useful when it follows an orthodontic strategy.", icon: ClinCheckIcon },
        { title: "International education", body: "A method shared across daily practice, stage and mentorship.", icon: InternationalSpeakerIcon },
      ],
    },
    es: {
      title: "Digital diagnosis. Clinical control. International education.",
      cards: [
        { title: "Workflow digital", body: "Datos, diagnostico y planificacion en un recorrido controlado.", icon: DigitalWorkflowIcon },
        { title: "ClinCheck clinico", body: "El software es util cuando sigue una estrategia ortodoncica.", icon: ClinCheckIcon },
        { title: "Formacion internacional", body: "Metodo compartido entre clinica diaria, escenario y mentoria.", icon: InternationalSpeakerIcon },
      ],
    },
  } as const;

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
          <Reveal className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-semibold text-teal-deep sm:text-3xl">
              {identitySection[loc].title}
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {identitySection[loc].cards.map((card, i) => (
              <Reveal key={card.title} delay={i * 0.05}>
                <FeatureIconCard icon={card.icon} title={card.title}>
                  {card.body}
                </FeatureIconCard>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-canvas">
        <Container className="py-20 sm:py-24">
          <Reveal className="mx-auto mb-12 max-w-2xl text-center">
            <p className="text-lg leading-relaxed text-ink/[0.72]">
              {landing.keyMessage}
            </p>
          </Reveal>

          <AudienceSelector
            actionLabel={landing.primaryCta}
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
