import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { audiences, isLocale, locales, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";
import {
  audienceFromSlug,
  audienceSlugs,
  sectionFromSlug,
  sectionPath,
  sectionSlugs,
} from "@/lib/routes";
import {
  caseBySlug,
  caseImage,
  caseImagePairs,
  caseImageViewLabels,
  casesForAudience,
} from "@/content/cases";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { BeforeAfter } from "@/components/ui/BeforeAfter";
import { HeroSection } from "@/components/sections/HeroSection";
import { JsonLd } from "@/components/ui/JsonLd";
import { SITE_URL } from "@/lib/seo";

const CASES_SECTION = "clinical-cases" as const;

const labels: Record<Locale, { before: string; after: string; problem: string; treatment: string; duration: string; months: string; back: string; disclaimer: string }> = {
  it: { before: "Prima", after: "Dopo", problem: "Problema iniziale", treatment: "Trattamento", duration: "Durata indicativa", months: "mesi", back: "Tutti i casi", disclaimer: "Caso mostrato come esempio. Ogni caso richiede una diagnosi individuale e non costituisce promessa di risultato." },
  en: { before: "Before", after: "After", problem: "Initial problem", treatment: "Treatment", duration: "Indicative duration", months: "months", back: "All cases", disclaimer: "Case shown as an example. Every case requires an individual diagnosis and is not a promise of outcome." },
  es: { before: "Antes", after: "Después", problem: "Problema inicial", treatment: "Tratamiento", duration: "Duración orientativa", months: "meses", back: "Todos los casos", disclaimer: "Caso mostrado como ejemplo. Cada caso requiere un diagnóstico individual y no constituye promesa de resultado." },
};

/** Only real cases generate pages; unknown paths 404 (no on-demand rendering). */
export const dynamicParams = false;

export function generateStaticParams() {
  const params: { locale: string; audience: string; section: string; case: string }[] = [];
  for (const locale of locales) {
    for (const audience of audiences) {
      const sectionSlug = sectionSlugs[audience][CASES_SECTION]?.[locale];
      if (!sectionSlug) continue;
      for (const c of casesForAudience(audience)) {
        params.push({
          locale,
          audience: audienceSlugs[audience][locale],
          section: sectionSlug,
          case: c.slug,
        });
      }
    }
  }
  return params;
}

type Params = Promise<{ locale: string; audience: string; section: string; case: string }>;

function resolve(locale: string, audienceSlug: string, sectionSlug: string, caseSlug: string) {
  if (!isLocale(locale)) return null;
  const audience = audienceFromSlug(locale, audienceSlug);
  if (!audience) return null;
  if (sectionFromSlug(locale, audience, sectionSlug) !== CASES_SECTION) return null;
  const c = caseBySlug(caseSlug);
  if (!c || (c.audience !== audience && c.audience !== "both")) return null;
  return { loc: locale as Locale, audience, c };
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, audience, section, case: caseSlug } = await params;
  const r = resolve(locale, audience, section, caseSlug);
  if (!r) return {};
  const title = r.c.title[r.loc];
  const firstPair = caseImagePairs(r.c)[0];
  const after = firstPair?.after ?? caseImage(r.c, "after") ?? r.c.images[0];
  return buildPageMetadata({
    locale: r.loc,
    title,
    description: r.c.problem[r.loc],
    path: `${sectionPath(r.loc, r.audience, CASES_SECTION)}/${r.c.slug}`,
    alternates: Object.fromEntries(
      locales.map((l) => [l, `${sectionPath(l, r.audience, CASES_SECTION)}/${r.c.slug}`]),
    ) as Record<Locale, string>,
    ogImage: after?.src,
  });
}

export default async function CaseDetailPage({ params }: { params: Params }) {
  const { locale, audience, section, case: caseSlug } = await params;
  const r = resolve(locale, audience, section, caseSlug);
  if (!r) notFound();

  const { loc, audience: aud, c } = r;
  const t = labels[loc];
  const pairs = caseImagePairs(c);
  const others = c.images.filter((i) => i.kind !== "before" && i.kind !== "after");
  const backHref = sectionPath(loc, aud, CASES_SECTION);

  return (
    <>
      <HeroSection eyebrow={c.category} title={c.title[loc]} subtitle={c.problem[loc]} />

      <section className="bg-canvas">
        <Container className="py-16 sm:py-20">
          <div className="mx-auto max-w-5xl">
            {pairs.length ? (
              <div className="grid gap-6 lg:grid-cols-2">
                {pairs.map((pair) => (
                  <div key={pair.view} className={pairs.length === 1 ? "lg:col-span-2" : undefined}>
                    <h2 className="mb-3 text-base font-semibold text-teal-deep">
                      {caseImageViewLabels[pair.view][loc]}
                    </h2>
                    <BeforeAfter
                      beforeSrc={pair.before.src}
                      afterSrc={pair.after.src}
                      beforeAlt={pair.before.alt[loc]}
                      afterAlt={pair.after.alt[loc]}
                      beforeLabel={t.before}
                      afterLabel={t.after}
                    />
                  </div>
                ))}
              </div>
            ) : null}

            <div className="mt-10 space-y-8">
              <div>
                <h2 className="text-lg font-semibold text-teal-deep">{t.problem}</h2>
                <p className="mt-2 leading-relaxed text-ink/75">{c.problem[loc]}</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-teal-deep">{t.treatment}</h2>
                <p className="mt-2 leading-relaxed text-ink/75">{c.treatment[loc]}</p>
              </div>
              {c.durationMonths ? (
                <p className="text-sm text-ink/60">
                  {t.duration}: {c.durationMonths} {t.months}
                </p>
              ) : null}
            </div>

            {others.length ? (
              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {others.map((img, i) => (
                  <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-titanium/60">
                    <Image src={img.src} alt={img.alt[loc]} fill className="object-cover" sizes="(max-width:768px) 100vw, 350px" />
                  </div>
                ))}
              </div>
            ) : null}

            <p className="mt-10 text-sm text-ink/55">{t.disclaimer}</p>

            <div className="mt-8">
              <Button href={backHref} variant="secondary">
                ← {t.back}
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "MedicalWebPage",
          name: c.title[loc],
          description: c.problem[loc],
          url: `${SITE_URL}${sectionPath(loc, aud, CASES_SECTION)}/${c.slug}`,
          image: c.images.map((i) => `${SITE_URL}${i.src}`),
        }}
      />
    </>
  );
}
