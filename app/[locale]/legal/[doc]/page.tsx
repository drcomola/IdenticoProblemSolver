import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";
import type { AlternateMap } from "@/lib/routes";
import { getLegalDoc, legalDocKeys, type LegalDocKey } from "@/content/legal";
import { Container } from "@/components/ui/Container";
import { HeroSection } from "@/components/sections/HeroSection";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    legalDocKeys.map((doc) => ({ locale, doc })),
  );
}

type Params = Promise<{ locale: string; doc: string }>;

function isDoc(v: string): v is LegalDocKey {
  return (legalDocKeys as readonly string[]).includes(v);
}

function legalPath(locale: Locale, doc: LegalDocKey) {
  return `/${locale}/legal/${doc}`;
}

function alternates(doc: LegalDocKey): AlternateMap {
  return Object.fromEntries(
    locales.map((l) => [l, legalPath(l, doc)]),
  ) as AlternateMap;
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale, doc } = await params;
  if (!isLocale(locale) || !isDoc(doc)) return {};
  const d = getLegalDoc(locale, doc);
  return buildPageMetadata({
    locale,
    title: d.title,
    description: d.intro,
    path: legalPath(locale, doc),
    alternates: alternates(doc),
  });
}

export default async function LegalPage({ params }: { params: Params }) {
  const { locale, doc } = await params;
  if (!isLocale(locale) || !isDoc(doc)) notFound();
  const d = getLegalDoc(locale, doc);

  return (
    <>
      <HeroSection title={d.title} subtitle={d.intro} />
      <section className="bg-canvas">
        <Container className="py-16 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <p className="mb-10 text-sm text-ink/50">
              {new Intl.DateTimeFormat(locale, { dateStyle: "long" }).format(
                new Date(d.updated),
              )}
            </p>
            <div className="space-y-10">
              {d.sections.map((s, i) => (
                <div key={i}>
                  <h2 className="text-xl font-semibold text-teal-deep">
                    {s.heading}
                  </h2>
                  <div className="mt-3 space-y-3 text-[0.97rem] leading-relaxed text-ink/75">
                    {s.body.map((p, j) => (
                      <p key={j}>{p}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
