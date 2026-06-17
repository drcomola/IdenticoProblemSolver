import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { isLocale, type Locale } from "@/lib/i18n";
import { getSection } from "@/content";
import { buildPageMetadata, faqPageJsonLd } from "@/lib/seo";
import { resolveCtaHref } from "@/lib/links";
import {
  audienceFromSlug,
  sectionAlternates,
  sectionFromSlug,
  sectionPath,
  sectionSlugs,
  type SectionKey,
} from "@/lib/routes";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { Filigree } from "@/components/ui/Filigree";
import { Icon, sectionIconName } from "@/components/ui/icons";
import { sectionLabel } from "@/content/navigation";
import { HeroSection } from "@/components/sections/HeroSection";
import { SectionBlocks } from "@/components/sections/SectionBlocks";

const heroImages: Partial<
  Record<
    SectionKey,
    {
      src: string;
      alt: Record<Locale, string>;
      objectPosition?: string;
      contain?: boolean;
    }
  >
> = {
  about: {
    src: "/images/site/chi-sono-2.webp",
    alt: {
      it: "Il Dr. Giorgio Comola durante una relazione clinica",
      en: "Dr. Giorgio Comola during a clinical lecture",
      es: "El Dr. Giorgio Comola durante una conferencia clinica",
    },
    objectPosition: "70% center",
  },
  "first-consultation": {
    src: "/images/site/pre-post.webp",
    alt: {
      it: "Simulazione digitale pre e post trattamento",
      en: "Digital before and after treatment simulation",
      es: "Simulacion digital antes y despues del tratamiento",
    },
    contain: true,
  },
  "what-i-offer": {
    src: "/images/cases/affollamento/affollamento-adulto-01/after-front.JPG",
    alt: {
      it: "Risultato ortodontico dopo trattamento con allineatori",
      en: "Orthodontic result after clear aligner treatment",
      es: "Resultado ortodoncico despues del tratamiento con alineadores",
    },
  },
  "digital-orthodontics": {
    src: "/images/site/itero.webp",
    alt: {
      it: "Scanner intraorale iTero per workflow digitale",
      en: "iTero intraoral scanner for digital workflow",
      es: "Escaner intraoral iTero para workflow digital",
    },
    contain: true,
  },
  invisalign: {
    src: "/images/cases/morso-aperto/aperto-adulto/after-front.JPG",
    alt: {
      it: "Vista frontale dopo trattamento con allineatori",
      en: "Frontal view after clear aligner treatment",
      es: "Vista frontal despues del tratamiento con alineadores",
    },
  },
  "clinical-cases": {
    src: "/images/cases/casi-complessi/complesso-adulto/after-front.JPG",
    alt: {
      it: "Caso clinico ortodontico dopo il trattamento",
      en: "Orthodontic clinical case after treatment",
      es: "Caso clinico ortodoncico despues del tratamiento",
    },
  },
  clinics: {
    src: "/images/site/chi-sono-1.webp",
    alt: {
      it: "Il Dr. Giorgio Comola durante una relazione clinica",
      en: "Dr. Giorgio Comola during a clinical lecture",
      es: "El Dr. Giorgio Comola durante una conferencia clinica",
    },
    objectPosition: "38% center",
  },
  faq: {
    src: "/images/site/chi-sono-4.webp",
    alt: {
      it: "Spiegazione clinica durante una presentazione",
      en: "Clinical explanation during a presentation",
      es: "Explicacion clinica durante una presentacion",
    },
    objectPosition: "35% center",
  },
  book: {
    src: "/images/site/chi-sono-2.webp",
    alt: {
      it: "Il Dr. Giorgio Comola durante una presentazione clinica",
      en: "Dr. Giorgio Comola during a clinical presentation",
      es: "El Dr. Giorgio Comola durante una presentacion clinica",
    },
    objectPosition: "70% center",
  },
  education: {
    src: "/images/site/emea-ortho-summit-2026.webp",
    alt: {
      it: "Il Dr. Giorgio Comola sul palco dell'EMEA Ortho Summit 2026",
      en: "Dr. Giorgio Comola on stage at the EMEA Ortho Summit 2026",
      es: "El Dr. Giorgio Comola en el escenario del EMEA Ortho Summit 2026",
    },
  },
  "private-courses": {
    src: "/images/site/chi-sono-4.webp",
    alt: {
      it: "Formazione clinica su ortodonzia digitale",
      en: "Clinical education on digital orthodontics",
      es: "Formacion clinica sobre ortodoncia digital",
    },
    objectPosition: "36% center",
  },
  "sas-courses": {
    src: "/images/site/chi-sono-1.webp",
    alt: {
      it: "Relazione clinica su allineatori e biomeccanica",
      en: "Clinical lecture on aligners and biomechanics",
      es: "Conferencia clinica sobre alineadores y biomecanica",
    },
    objectPosition: "38% center",
  },
  "align-p2p": {
    src: "/images/cases/casi-complessi/complesso-adulto/before-ovj.JPG",
    alt: {
      it: "Dettaglio clinico per discussione di caso",
      en: "Clinical detail for case discussion",
      es: "Detalle clinico para discusion de caso",
    },
  },
  consulting: {
    src: "/images/site/chi-sono-2.webp",
    alt: {
      it: "Il Dr. Giorgio Comola durante una sessione formativa",
      en: "Dr. Giorgio Comola during an educational session",
      es: "El Dr. Giorgio Comola durante una sesion formativa",
    },
    objectPosition: "70% center",
  },
};

function SectionHeroImage({
  image,
  locale,
}: {
  image: NonNullable<(typeof heroImages)[SectionKey]>;
  locale: Locale;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-titanium/60 bg-white shadow-soft">
      <div className="relative aspect-[4/3]">
        <Image
          src={image.src}
          alt={image.alt[locale]}
          fill
          priority
          className={image.contain ? "object-contain p-6" : "object-cover"}
          sizes="(max-width: 1024px) 100vw, 520px"
          style={{ objectPosition: image.objectPosition }}
        />
      </div>
    </div>
  );
}

/** Pre-render every localized section slug for each (locale, audience) pair. */
export function generateStaticParams({
  params,
}: {
  params: { locale: string; audience: string };
}) {
  const { locale, audience: audienceSlug } = params;
  if (!isLocale(locale)) return [];
  const audience = audienceFromSlug(locale, audienceSlug);
  if (!audience) return [];

  const map = sectionSlugs[audience];
  return (Object.keys(map) as SectionKey[]).map((key) => ({
    section: map[key]![locale],
  }));
}

type Params = Promise<{ locale: string; audience: string; section: string }>;

function resolve(locale: string, audienceSlug: string, sectionSlug: string) {
  if (!isLocale(locale)) return null;
  const audience = audienceFromSlug(locale, audienceSlug);
  if (!audience) return null;
  const section = sectionFromSlug(locale, audience, sectionSlug);
  if (!section) return null;
  const data = getSection(locale, audience, section);
  if (!data) return null;
  return { loc: locale as Locale, audience, section, data };
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale, audience, section } = await params;
  const r = resolve(locale, audience, section);
  if (!r) return {};
  return buildPageMetadata({
    locale: r.loc,
    title: r.data.seo.title,
    description: r.data.seo.description,
    path: sectionPath(r.loc, r.audience, r.section),
    alternates: sectionAlternates(r.audience, r.section),
  });
}

export default async function SectionPage({ params }: { params: Params }) {
  const { locale, audience, section } = await params;
  const r = resolve(locale, audience, section);
  if (!r) notFound();

  const { loc, audience: aud, section: sec, data } = r;
  const faqBlock = data.blocks.find((b) => b.type === "faq");
  const heroImage = heroImages[sec];

  return (
    <>
      <HeroSection
        eyebrow={sectionLabel(loc, aud, sec)}
        icon={<Icon name={sectionIconName(aud, sec)} className="h-6 w-6" />}
        title={data.h1}
        subtitle={data.subtitle}
        intro={data.lead}
        aside={
          heroImage ? <SectionHeroImage image={heroImage} locale={loc} /> : undefined
        }
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
      />

      <SectionBlocks blocks={data.blocks} locale={loc} audience={aud} />

      {/* Closing conversion band */}
      <section className="relative overflow-hidden bg-night-field text-canvas">
        <Filigree tone="dark" />
        <Container className="relative z-10 py-20 text-center">
          <Reveal className="mx-auto max-w-2xl">
            <h2 className="text-balance text-3xl font-semibold sm:text-4xl">
              {data.subtitle}
            </h2>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <Button href={resolveCtaHref(data.primaryCta, loc)} variant="onDark">
                {data.primaryCta.label}
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      {faqBlock && faqBlock.type === "faq" ? (
        <JsonLd data={faqPageJsonLd(faqBlock.items)} />
      ) : null}
    </>
  );
}
