import type { Block } from "@/content/types";
import type { Audience, Locale } from "@/lib/i18n";
import Image from "next/image";
import { getDictionary } from "@/content";
import {
  clinics,
  clinicMapsUrl,
  clinicWhatsappUrl,
} from "@/content/clinics";
import { casesForAudience, caseImagePairs } from "@/content/cases";
import { sectionPath } from "@/lib/routes";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { ContentCard } from "../ui/ContentCard";
import { CaseCard } from "../ui/CaseCard";
import { ClinicsDirectory } from "../ui/ClinicsDirectory";
import { FAQAccordion } from "../ui/FAQAccordion";
import { ContactForm, type ClinicPicker } from "../ui/ContactForm";

/** Central inbox for form submissions (mailto, Phase 1 — no backend). */
const CONTACT_EMAIL = "drcomola@gmail.com";
const caseCompareLabels: Record<Locale, { before: string; after: string }> = {
  it: { before: "Prima", after: "Dopo" },
  en: { before: "Before", after: "After" },
  es: { before: "Antes", after: "Después" },
};

/** Renders the ordered block list of a section page. Alternates section tints. */
export function SectionBlocks({
  blocks,
  locale,
  audience,
}: {
  blocks: Block[];
  locale: Locale;
  audience: Audience;
}) {
  const dict = getDictionary(locale);

  return (
    <>
      {blocks.map((block, i) => {
        const tinted = i % 2 === 1;
        const bg = tinted ? "bg-aqua-wash" : "bg-canvas";

        return (
          <section key={i} className={bg}>
            <Container className="py-16 sm:py-20">
              {renderBlock(block, dict, audience, locale)}
            </Container>
          </section>
        );
      })}
    </>
  );
}

function renderBlock(
  block: Block,
  dict: ReturnType<typeof getDictionary>,
  audience: Audience,
  locale: Locale,
) {
  switch (block.type) {
    case "list": {
      const cols =
        block.columns === 3
          ? "sm:grid-cols-2 lg:grid-cols-3"
          : "sm:grid-cols-2";
      return (
        <>
          <Reveal>
            <h2 className="text-2xl font-semibold text-teal-deep sm:text-3xl">
              {block.heading}
            </h2>
          </Reveal>
          <ul className={`mt-10 grid gap-5 ${cols}`}>
            {block.items.map((item, i) => (
              <Reveal as="li" key={i} delay={i * 0.05}>
                <ContentCard>{item}</ContentCard>
              </Reveal>
            ))}
          </ul>
        </>
      );
    }

    case "statement":
      return (
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-aqua">
            {block.heading}
          </p>
          <p className="mt-4 font-display text-2xl leading-snug text-teal-deep sm:text-3xl">
            {block.body}
          </p>
        </Reveal>
      );

    case "imageGallery":
      return (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {block.images.map((image, i) => (
            <Reveal
              key={image.src}
              delay={i * 0.05}
              className={image.wide ? "sm:col-span-2" : undefined}
            >
              <figure className="overflow-hidden rounded-2xl border border-titanium/60 bg-white">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes={
                      image.wide
                        ? "(max-width: 768px) 100vw, 600px"
                        : "(max-width: 768px) 100vw, 320px"
                    }
                  />
                </div>
                {image.caption ? (
                  <figcaption className="px-4 py-3 text-sm text-ink/65">
                    {image.caption}
                  </figcaption>
                ) : null}
              </figure>
            </Reveal>
          ))}
        </div>
      );

    case "faq":
      return (
        <div className="mx-auto max-w-3xl">
          {block.heading ? (
            <Reveal>
              <h2 className="mb-8 text-2xl font-semibold text-teal-deep sm:text-3xl">
                {block.heading}
              </h2>
            </Reveal>
          ) : null}
          <Reveal>
            <FAQAccordion items={block.items} />
          </Reveal>
        </div>
      );

    case "cases": {
      const realCases = casesForAudience(audience);
      return (
        <>
          <Reveal>
            <h2 className="text-2xl font-semibold text-teal-deep sm:text-3xl">
              {block.heading}
            </h2>
          </Reveal>

          {/* Real cases (when available) link to their detail page. */}
          {realCases.length ? (
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {realCases.map((c, i) => {
                const firstPair = caseImagePairs(c)[0];
                const cover = firstPair?.after ?? c.images[0];
                const compareLabels = caseCompareLabels[locale];
                return (
                  <Reveal key={c.slug} delay={i * 0.05}>
                    <CaseCard
                      category={c.category}
                      title={c.title[locale]}
                      imageLabel={dict.brandTagline}
                      href={`${sectionPath(locale, audience, "clinical-cases")}/${c.slug}`}
                      imageSrc={cover?.src}
                      imageAlt={cover?.alt[locale]}
                      beforeImageSrc={firstPair?.before.src}
                      afterImageSrc={firstPair?.after.src}
                      beforeImageAlt={firstPair?.before.alt[locale]}
                      afterImageAlt={firstPair?.after.alt[locale]}
                      beforeLabel={compareLabels.before}
                      afterLabel={compareLabels.after}
                    />
                  </Reveal>
                );
              })}
            </div>
          ) : (
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {block.categories.map((category, i) => (
                <Reveal key={category} delay={i * 0.05}>
                  <CaseCard category={category} imageLabel={dict.brandTagline} />
                </Reveal>
              ))}
            </div>
          )}

          {block.disclaimer ? (
            <Reveal>
              <p className="mt-8 text-sm text-ink/55">{block.disclaimer}</p>
            </Reveal>
          ) : null}
        </>
      );
    }

    case "clinics":
      return (
        <>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <Reveal>
              <h2 className="text-2xl font-semibold text-teal-deep sm:text-3xl">
                {block.heading}
              </h2>
              <ol className="mt-8 space-y-4">
                {block.steps.map((step, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-teal-deep/8 text-sm font-semibold text-teal-deep">
                      {i + 1}
                    </span>
                    <span className="pt-0.5 text-ink/80">{step}</span>
                  </li>
                ))}
              </ol>
              {block.note ? (
                <p className="mt-6 text-sm text-ink/55">{block.note}</p>
              ) : null}
            </Reveal>
          </div>
          <div className="mt-12">
            <Reveal>
              <ClinicsDirectory labels={dict.clinics} />
            </Reveal>
          </div>
        </>
      );

    case "form": {
      const isPatient = audience === "patients";
      const clinicPicker: ClinicPicker | undefined = isPatient
        ? {
            label: dict.clinics.selectLabel,
            placeholder: dict.clinics.selectPlaceholder,
            contactTitle: dict.clinics.contactTitle,
            callLabel: dict.clinics.call,
            whatsappLabel: dict.clinics.whatsapp,
            directionsLabel: dict.clinics.directions,
            options: clinics.map((c) => ({
              id: c.id,
              name: c.name,
              city: c.city,
              email: c.email,
              tel: c.tel,
              mobile: c.mobile,
              whatsappUrl: clinicWhatsappUrl(c),
              mapsUrl: clinicMapsUrl(c),
            })),
          }
        : undefined;

      return (
        <div className="mx-auto max-w-2xl">
          {block.microcopy ? (
            <Reveal>
              <p className="mb-8 text-center text-ink/70">{block.microcopy}</p>
            </Reveal>
          ) : null}
          <Reveal>
            <ContactForm
              fields={block.fields}
              submitLabel={block.submitLabel}
              successMessage={dict.form.success}
              consentLabel={dict.form.consent}
              audience={audience}
              mailtoTo={CONTACT_EMAIL}
              mailtoSubject={
                isPatient ? dict.form.patientSubject : dict.form.colleagueSubject
              }
              hint={dict.form.mailtoHint}
              clinicPicker={clinicPicker}
            />
          </Reveal>
        </div>
      );
    }
  }
}
