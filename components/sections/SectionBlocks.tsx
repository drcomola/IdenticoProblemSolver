import type { Block } from "@/content/types";
import type { Audience, Locale } from "@/lib/i18n";
import type { SectionKey } from "@/lib/routes";
import Image from "next/image";
import Link from "next/link";
import { getDictionary } from "@/content";
import { clinics } from "@/content/clinics";
import { casesForAudience, caseImagePairs } from "@/content/cases";
import { sectionPath } from "@/lib/routes";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { ContentCard } from "../ui/ContentCard";
import { CaseCard } from "../ui/CaseCard";
import { ClinicsDirectory } from "../ui/ClinicsDirectory";
import { FAQAccordion } from "../ui/FAQAccordion";
import { ContactForm } from "../ui/ContactForm";
import { AppointmentForm, type ClinicChoice } from "../booking/AppointmentForm";
import { PatientExpertProgram } from "../patient-expert/PatientExpertProgram";
import {
  BiomechanicsIcon,
  BiteIcon,
  BruxismIcon,
  CasesIcon,
  ClassIIIcon,
  ClinCheckIcon,
  ClinCheckReviewIcon,
  ClinicsIcon,
  CrossbiteIcon,
  CrowdingIcon,
  DeepBiteIcon,
  DiagnosisIcon,
  DiamondProviderIcon,
  FacultyIcon,
  FeatureIconCard,
  FollowUpIcon,
  ImpactedCanineIcon,
  InnovationIcon,
  InternationalSpeakerIcon,
  IntraoralScanIcon,
  MentorshipIcon,
  MonitoringIcon,
  OpenBiteIcon,
  P2PAlignIcon,
  PrivateCoursesIcon,
  ProofGrid,
  SASCoursesIcon,
  TreatmentPlanningIcon,
  type BrandIconComponent,
} from "@/components/icons/BrandIcons";

type IconCardData = {
  title: string;
  body: string;
  icon: BrandIconComponent;
};

const patientProblemCards: Record<Locale, IconCardData[]> = {
  it: [
    { title: "Affollamento", body: "Quando lo spazio non basta e i denti si sovrappongono.", icon: CrowdingIcon },
    { title: "Morso profondo", body: "Controllo verticale quando gli incisivi superiori coprono troppo.", icon: DeepBiteIcon },
    { title: "Morso aperto", body: "Chiusura guidata quando resta uno spazio anteriore.", icon: OpenBiteIcon },
    { title: "Morso crociato", body: "Correzione dei rapporti trasversali e della funzione.", icon: CrossbiteIcon },
    { title: "Seconda classe", body: "Lettura sagittale, crescita e strategia biomeccanica.", icon: ClassIIIcon },
    { title: "Canino incluso", body: "Percorsi complessi pianificati con controllo digitale.", icon: ImpactedCanineIcon },
    { title: "Bruxismo", body: "Valutazione funzionale quando serramento e usura contano.", icon: BruxismIcon },
    { title: "Bite", body: "Dispositivi trasparenti quando protezione e stabilita sono indicate.", icon: BiteIcon },
  ],
  en: [
    { title: "Crowding", body: "When space is limited and teeth overlap.", icon: CrowdingIcon },
    { title: "Deep bite", body: "Vertical control when upper incisors cover too much.", icon: DeepBiteIcon },
    { title: "Open bite", body: "Guided closure when an anterior gap remains.", icon: OpenBiteIcon },
    { title: "Crossbite", body: "Correction of transverse relationships and function.", icon: CrossbiteIcon },
    { title: "Class II", body: "Sagittal diagnosis, growth and biomechanical strategy.", icon: ClassIIIcon },
    { title: "Impacted canine", body: "Complex pathways planned with digital control.", icon: ImpactedCanineIcon },
    { title: "Bruxism", body: "Functional assessment when clenching and wear matter.", icon: BruxismIcon },
    { title: "Bite splint", body: "Transparent devices when protection and stability are indicated.", icon: BiteIcon },
  ],
  es: [
    { title: "Apinamiento", body: "Cuando falta espacio y los dientes se superponen.", icon: CrowdingIcon },
    { title: "Mordida profunda", body: "Control vertical cuando los incisivos superiores cubren demasiado.", icon: DeepBiteIcon },
    { title: "Mordida abierta", body: "Cierre guiado cuando queda un espacio anterior.", icon: OpenBiteIcon },
    { title: "Mordida cruzada", body: "Correccion de relaciones transversales y funcion.", icon: CrossbiteIcon },
    { title: "Clase II", body: "Diagnostico sagital, crecimiento y estrategia biomecanica.", icon: ClassIIIcon },
    { title: "Canino incluido", body: "Recorridos complejos planificados con control digital.", icon: ImpactedCanineIcon },
    { title: "Bruxismo", body: "Valoracion funcional cuando apretamiento y desgaste importan.", icon: BruxismIcon },
    { title: "Bite", body: "Dispositivos transparentes cuando proteccion y estabilidad estan indicadas.", icon: BiteIcon },
  ],
};

const colleagueCards: Record<Locale, IconCardData[]> = {
  it: [
    { title: "Mentorship", body: "Supporto continuativo su casi reali, sequenze e decisioni.", icon: MentorshipIcon },
    { title: "ClinCheck Review", body: "Lettura critica del setup, dello staging e degli attachment.", icon: ClinCheckReviewIcon },
    { title: "P2P Align", body: "Confronto clinico tra colleghi quando il programma e disponibile.", icon: P2PAlignIcon },
    { title: "Corsi privati", body: "Formazione individuale o per team, costruita sullo studio.", icon: PrivateCoursesIcon },
    { title: "Corsi SAS", body: "Percorsi strutturati per alzare il livello clinico.", icon: SASCoursesIcon },
    { title: "Biomeccanica", body: "Forze, ausiliari e controllo del movimento con allineatori.", icon: BiomechanicsIcon },
  ],
  en: [
    { title: "Mentorship", body: "Ongoing support on real cases, sequences and decisions.", icon: MentorshipIcon },
    { title: "ClinCheck Review", body: "Critical reading of setup, staging and attachments.", icon: ClinCheckReviewIcon },
    { title: "P2P Align", body: "Peer clinical exchange when the program is available.", icon: P2PAlignIcon },
    { title: "Private courses", body: "One-to-one or team education built around the practice.", icon: PrivateCoursesIcon },
    { title: "SAS Courses", body: "Structured pathways to raise clinical control.", icon: SASCoursesIcon },
    { title: "Biomechanics", body: "Forces, auxiliaries and movement control with aligners.", icon: BiomechanicsIcon },
  ],
  es: [
    { title: "Mentoria", body: "Soporte continuado sobre casos reales, secuencias y decisiones.", icon: MentorshipIcon },
    { title: "ClinCheck Review", body: "Lectura critica del setup, staging y attachments.", icon: ClinCheckReviewIcon },
    { title: "P2P Align", body: "Intercambio clinico entre colegas cuando el programa esta disponible.", icon: P2PAlignIcon },
    { title: "Cursos privados", body: "Formacion individual o para equipos construida sobre la consulta.", icon: PrivateCoursesIcon },
    { title: "Cursos SAS", body: "Recorridos estructurados para elevar el control clinico.", icon: SASCoursesIcon },
    { title: "Biomecanica", body: "Fuerzas, auxiliares y control del movimiento con alineadores.", icon: BiomechanicsIcon },
  ],
};

const digitalProcessCopy: Record<Locale, IconCardData[]> = {
  it: [
    { title: "Scan", body: "Dato digitale pulito.", icon: IntraoralScanIcon },
    { title: "Diagnosi", body: "Lettura clinica prima del software.", icon: DiagnosisIcon },
    { title: "Planning", body: "Obiettivi estetici e funzionali.", icon: TreatmentPlanningIcon },
    { title: "ClinCheck", body: "Sequenza e controllo dei movimenti.", icon: ClinCheckIcon },
    { title: "Monitoring", body: "Tracking durante la terapia.", icon: MonitoringIcon },
    { title: "Risultato", body: "Rifinitura e stabilita.", icon: FollowUpIcon },
  ],
  en: [
    { title: "Scan", body: "Clean digital data.", icon: IntraoralScanIcon },
    { title: "Diagnosis", body: "Clinical reading before software.", icon: DiagnosisIcon },
    { title: "Planning", body: "Aesthetic and functional goals.", icon: TreatmentPlanningIcon },
    { title: "ClinCheck", body: "Movement sequence and control.", icon: ClinCheckIcon },
    { title: "Monitoring", body: "Tracking during treatment.", icon: MonitoringIcon },
    { title: "Result", body: "Refinement and stability.", icon: FollowUpIcon },
  ],
  es: [
    { title: "Scan", body: "Dato digital limpio.", icon: IntraoralScanIcon },
    { title: "Diagnostico", body: "Lectura clinica antes del software.", icon: DiagnosisIcon },
    { title: "Planning", body: "Objetivos esteticos y funcionales.", icon: TreatmentPlanningIcon },
    { title: "ClinCheck", body: "Secuencia y control de movimientos.", icon: ClinCheckIcon },
    { title: "Monitoring", body: "Tracking durante el tratamiento.", icon: MonitoringIcon },
    { title: "Resultado", body: "Refinamiento y estabilidad.", icon: FollowUpIcon },
  ],
};

const proofCopy: Record<Locale, { value: string; label: string; icon: BrandIconComponent }[]> = {
  it: [
    { value: "2000+", label: "casi Invisalign pianificati e trattati", icon: CasesIcon },
    { value: "Diamond Apex", label: "Provider Invisalign dal 2021", icon: DiamondProviderIcon },
    { value: "Align Faculty", label: "Speaker e Mentor dal 2021", icon: FacultyIcon },
    { value: "18+ studi", label: "nel network clinico del Nord Italia", icon: ClinicsIcon },
  ],
  en: [
    { value: "2000+", label: "Invisalign cases planned and treated", icon: CasesIcon },
    { value: "Diamond Apex", label: "Invisalign Provider since 2021", icon: DiamondProviderIcon },
    { value: "Align Faculty", label: "Speaker & Mentor since 2021", icon: FacultyIcon },
    { value: "18+ clinics", label: "in the clinical network", icon: ClinicsIcon },
  ],
  es: [
    { value: "2000+", label: "casos Invisalign planificados y tratados", icon: CasesIcon },
    { value: "Diamond Apex", label: "Provider Invisalign desde 2021", icon: DiamondProviderIcon },
    { value: "Align Faculty", label: "Speaker y Mentor desde 2021", icon: FacultyIcon },
    { value: "18+ clínicas", label: "en la red clínica del norte de Italia", icon: ClinicsIcon },
  ],
};

const aboutHighlightCards: Record<Locale, IconCardData[]> = {
  it: [
    { title: "Diamond Apex Provider", body: "Riconoscimento Invisalign per volume e qualità clinica, dal 2021.", icon: DiamondProviderIcon },
    { title: "Align Faculty Speaker", body: "Formazione e mentorship per colleghi in Europa dal 2021.", icon: FacultyIcon },
    { title: "International Speaker", body: "Relazioni cliniche in congressi europei e globali.", icon: InternationalSpeakerIcon },
    { title: "2000+ casi Invisalign", body: "Pianificati e trattati con controllo clinico diretto.", icon: CasesIcon },
    { title: "18+ studi nel network", body: "Collaborazioni cliniche attive nel Nord Italia.", icon: ClinicsIcon },
    { title: "SAS Mentor", body: "Smart Aligner Service per Spagna, Italia e Polonia dal 2024.", icon: InnovationIcon },
  ],
  en: [
    { title: "Diamond Apex Provider", body: "Invisalign recognition for clinical volume and quality, since 2021.", icon: DiamondProviderIcon },
    { title: "Align Faculty Speaker", body: "Education and mentorship for colleagues across Europe since 2021.", icon: FacultyIcon },
    { title: "International Speaker", body: "Clinical lectures at European and global congresses.", icon: InternationalSpeakerIcon },
    { title: "2000+ Invisalign cases", body: "Planned and treated with direct clinical control.", icon: CasesIcon },
    { title: "18+ clinics in network", body: "Active clinical collaborations in Northern Italy.", icon: ClinicsIcon },
    { title: "SAS Mentor", body: "Smart Aligner Service for Spain, Italy and Poland since 2024.", icon: InnovationIcon },
  ],
  es: [
    { title: "Diamond Apex Provider", body: "Reconocimiento Invisalign por volumen y calidad clínica, desde 2021.", icon: DiamondProviderIcon },
    { title: "Align Faculty Speaker", body: "Formación y mentoring para colegas en Europa desde 2021.", icon: FacultyIcon },
    { title: "International Speaker", body: "Conferencias clínicas en congresos europeos y globales.", icon: InternationalSpeakerIcon },
    { title: "2000+ casos Invisalign", body: "Planificados y tratados con control clínico directo.", icon: CasesIcon },
    { title: "18+ clínicas en red", body: "Colaboraciones clínicas activas en el norte de Italia.", icon: ClinicsIcon },
    { title: "SAS Mentor", body: "Smart Aligner Service para España, Italia y Polonia desde 2024.", icon: InnovationIcon },
  ],
};

function iconCardsForList(
  block: Extract<Block, { type: "list" }>,
  audience: Audience,
  section: SectionKey,
  locale: Locale,
) {
  if (audience === "patients" && section === "what-i-offer") {
    return patientProblemCards[locale];
  }

  if (audience === "colleagues" && (section === "education" || section === "consulting")) {
    return colleagueCards[locale];
  }

  // The "about" curriculum list (columns:3) gets icon cards from AUTOREVOLEZZA icons.
  if (section === "about" && block.columns === 3) {
    return aboutHighlightCards[locale];
  }

  return null;
}

function processStepsForSection(section: SectionKey, locale: Locale, heading: string) {
  if (section !== "digital-orthodontics" || !heading) return null;
  return digitalProcessCopy[locale];
}

function proofItemsForList(
  block: Extract<Block, { type: "list" }>,
  audience: Audience,
  section: SectionKey,
  locale: Locale,
) {
  if (section !== "about") return null;
  const source = `${block.heading} ${block.items.join(" ")}`.toLowerCase();
  if (audience === "patients" && source.includes("faculty")) return proofCopy[locale];
  if (audience === "colleagues" && source.includes("faculty")) return proofCopy[locale];
  return null;
}

function DigitalProcess({ steps }: { steps: IconCardData[] }) {
  return (
    <div className="mt-12 rounded-xl border border-titanium/55 bg-white/[0.88] p-5 shadow-soft sm:p-6">
      <div className="grid gap-5 md:grid-cols-6">
        {steps.map((step, i) => {
          const StepIcon = step.icon;
          return (
            <div key={step.title} className="relative">
              {i < steps.length - 1 ? (
                <span
                  aria-hidden
                  className="absolute left-9 top-8 hidden h-px w-[calc(100%-1.25rem)] bg-titanium/70 md:block"
                />
              ) : null}
              <div className="relative flex gap-4 md:block">
                <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border border-teal-deep/10 bg-teal-deep/[0.035] text-teal-deep">
                  <StepIcon className="h-10 w-10" />
                </span>
                {i < steps.length - 1 ? (
                  <span
                    aria-hidden
                    className="absolute left-8 top-16 h-full w-px bg-titanium/60 md:hidden"
                  />
                ) : null}
                <div className="min-w-0 pt-1 md:pt-4">
                  <h3 className="text-sm font-semibold text-teal-deep">{step.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink/65">{step.body}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
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
  section,
}: {
  blocks: Block[];
  locale: Locale;
  audience: Audience;
  section: SectionKey;
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
              {renderBlock(block, dict, audience, locale, section)}
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
  section: SectionKey,
) {
  switch (block.type) {
    case "list": {
      const cols =
        block.columns === 3
          ? "sm:grid-cols-2 lg:grid-cols-3"
          : "sm:grid-cols-2";
      const iconCards = iconCardsForList(block, audience, section, locale);
      const processSteps = processStepsForSection(section, locale, block.heading);
      const proofItems = proofItemsForList(block, audience, section, locale);
      const dark = audience === "colleagues" && section === "education";

      if (iconCards) {
        return (
          <>
            <Reveal>
              <h2 className="text-2xl font-semibold text-teal-deep sm:text-3xl">
                {block.heading}
              </h2>
            </Reveal>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {iconCards.map((item, i) => (
                <Reveal key={item.title} delay={i * 0.05}>
                  <FeatureIconCard icon={item.icon} title={item.title}>
                    {item.body}
                  </FeatureIconCard>
                </Reveal>
              ))}
            </div>
          </>
        );
      }

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
          {processSteps ? (
            <Reveal>
              <DigitalProcess steps={processSteps} />
            </Reveal>
          ) : null}
          {proofItems ? (
            <Reveal>
              <div className="mt-10">
                <ProofGrid items={proofItems} dark={dark} />
              </div>
            </Reveal>
          ) : null}
        </>
      );
    }

    case "statement":
      return (
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal">
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

    case "video":
      return (
        <Reveal className="mx-auto max-w-5xl">
          <figure className="overflow-hidden rounded-2xl border border-titanium/60 bg-white shadow-soft">
            <video
              className="aspect-video w-full bg-night object-cover"
              controls
              preload="metadata"
              playsInline
              poster={block.poster}
              aria-label={block.title}
            >
              <source src={block.src} type="video/mp4" />
            </video>
            {block.caption ? (
              <figcaption className="px-5 py-4 text-sm text-ink/65">
                {block.caption}
              </figcaption>
            ) : null}
          </figure>
        </Reveal>
      );

    case "embed":
      return (
        <Reveal className="mx-auto max-w-4xl">
          <div className="rounded-2xl border border-titanium/60 bg-white p-8 text-center shadow-soft sm:p-10">
            {block.logo ? (
              <div className="relative mx-auto mb-6 h-16 w-56">
                <Image
                  src={block.logo}
                  alt={block.logoAlt ?? ""}
                  fill
                  className="object-contain"
                  sizes="224px"
                />
              </div>
            ) : null}
            {block.heading ? (
              <h2 className="text-2xl font-semibold text-teal-deep sm:text-3xl">
                {block.heading}
              </h2>
            ) : null}
            {block.body ? (
              <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-ink/75">
                {block.body}
              </p>
            ) : null}
            {block.url ? (
              <div className="mt-8 overflow-hidden rounded-xl border border-titanium/60">
                <iframe
                  src={block.url}
                  title={block.heading ?? block.logoAlt ?? "Embed"}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-[520px] w-full bg-white"
                />
              </div>
            ) : null}
            {block.url ? (
              <a
                href={block.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-teal hover:text-teal-deep"
              >
                {block.linkLabel ?? block.url} ↗
              </a>
            ) : null}
          </div>
        </Reveal>
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
              <ClinicsDirectory
                labels={dict.clinics}
                bookingBasePath={sectionPath(locale, "patients", "book")}
              />
            </Reveal>
          </div>
        </>
      );

    case "form": {
      const isPatient = audience === "patients";

      // Patients → dedicated booking form that submits to the Netlify Function
      // (recipient resolved server-side from the chosen clinic).
      if (isPatient) {
        const clinicChoices: ClinicChoice[] = clinics.map((c) => ({
          id: c.id,
          bookingSlug: c.bookingSlug,
          name: c.name,
          city: c.city,
        }));
        return (
          <div className="mx-auto max-w-2xl">
            <Reveal>
              <AppointmentForm
                locale={locale}
                labels={dict.booking}
                clinics={clinicChoices}
                microcopy={block.microcopy}
                submitLabel={block.submitLabel}
              />
            </Reveal>
          </div>
        );
      }

      // Colleagues → general contact form (also server-side, no mailto).
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
              errorMessage={dict.form.error}
              consentLabel={dict.form.consent}
              subject={dict.form.colleagueSubject}
              hint={dict.form.mailtoHint}
            />
          </Reveal>
        </div>
      );
    }

    case "game":
      return (
        <Reveal className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-2xl font-semibold text-teal-deep sm:text-3xl">
              {block.heading}
            </h2>
            <Link
              href={block.src}
              className="inline-flex w-full items-center justify-center rounded-full border border-titanium/70 bg-white/80 px-5 py-2.5 text-sm font-semibold text-teal-deep transition-colors hover:border-aqua/60 hover:bg-aqua/10 sm:w-auto"
            >
              {block.directLinkLabel}
            </Link>
          </div>
          <div className="mt-8 overflow-hidden rounded-xl border border-titanium/60 bg-night shadow-panel">
            <iframe
              src={block.src}
              title={block.title}
              className="h-[660px] w-full sm:h-[720px]"
              loading="lazy"
              allow="fullscreen; clipboard-write; web-share"
            />
          </div>
        </Reveal>
      );

    case "patientExpertProgram":
      return (
        <Reveal>
          <PatientExpertProgram />
        </Reveal>
      );
  }
}
