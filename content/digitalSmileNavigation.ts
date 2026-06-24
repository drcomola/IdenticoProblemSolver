import type { Audience, Locale } from "@/lib/i18n";
import type { SectionKey } from "@/lib/routes";

export type SmileMarkerPosition = {
  x: number;
  y: number;
};

export type SmileJourneyItemDefinition = {
  id: string;
  section: SectionKey;
  shortPreview: string;
  markerPosition: SmileMarkerPosition;
  code: string;
};

export type DigitalSmileUi = {
  eyebrow: string;
  sceneLabel: string;
  instruction: string;
  progressLabel: string;
  stageLabels: [string, string, string];
  previewLabel: string;
  openSection: string;
  mobileHeading: string;
  mobileIntro: string;
  closingEyebrow: string;
};

// Evenly distributed on the elliptical orbit (cx 50, cy 54, rx 39, ry 34) drawn
// in the scene, spanning from the upper-left, around the bottom, to the
// upper-right so the ring stays open at the top where the aligner sits.
const markerPositions: SmileMarkerPosition[] = [
  { x: 15, y: 33 },
  { x: 9,  y: 55 },
  { x: 23, y: 74 },
  { x: 50, y: 82 },
  { x: 77, y: 74 },
  { x: 91, y: 55 },
  { x: 85, y: 33 },
];

const patientSections: SectionKey[] = [
  "about",
  "what-i-offer",
  "first-consultation",
  "clinical-cases",
  "clinics",
  "faq",
  "book",
];

const colleagueSections: SectionKey[] = [
  "about",
  "education",
  "private-courses",
  "sas-courses",
  "align-p2p",
  "clinical-cases",
  "consulting",
];

const previews: Record<Locale, Record<Audience, string[]>> = {
  it: {
    patients: [
      "Un approccio clinico fondato su diagnosi digitale, pianificazione e controllo.",
      "Allineatori trasparenti, ortodonzia digitale e trattamenti per adulti, adolescenti e bambini.",
      "Una valutazione chiara: diagnosi, opzioni, tempi, limiti e priorità.",
      "Esempi reali organizzati per problema, obiettivo e risultato.",
      "Scegli la sede più comoda per prenotare una valutazione.",
      "Risposte dirette alle domande più comuni prima di iniziare.",
      "Invia una richiesta di visita e verrai ricontattato dalla sede selezionata.",
    ],
    colleagues: [
      "Clinica, workflow digitale e formazione professionale internazionale.",
      "Mentorship, formazione e supporto alla pianificazione dei casi.",
      "Percorsi su misura basati su casi reali e necessità cliniche.",
      "Formazione strutturata su allineatori, biomeccanica e casi complessi.",
      "Confronto clinico tra colleghi su casi, strategie e setup.",
      "Decisioni biomeccaniche, limiti e filosofia di trattamento.",
      "Supporto ClinCheck e mentorship per migliorare controllo e prevedibilità.",
    ],
  },
  en: {
    patients: [
      "A clinical approach grounded in digital diagnosis, planning and control.",
      "Clear aligners, digital orthodontics and treatment for adults, teenagers and children.",
      "A clear assessment of diagnosis, options, timing, limits and priorities.",
      "Real examples organised by problem, objective and result.",
      "Choose the most convenient clinic for your assessment.",
      "Direct answers to the most common questions before you begin.",
      "Send a consultation request and your selected clinic will contact you.",
    ],
    colleagues: [
      "Clinical practice, digital workflow and international professional education.",
      "Mentorship, education and support for treatment planning.",
      "Tailored pathways built around real cases and clinical needs.",
      "Structured education in aligners, biomechanics and complex cases.",
      "Peer-to-peer clinical exchange on cases, strategies and setups.",
      "Biomechanical decisions, limits and treatment philosophy.",
      "ClinCheck support and mentorship for greater control and predictability.",
    ],
  },
  es: {
    patients: [
      "Un enfoque clínico basado en diagnóstico digital, planificación y control.",
      "Alineadores transparentes, ortodoncia digital y tratamientos para adultos, adolescentes y niños.",
      "Una valoración clara: diagnóstico, opciones, tiempos, límites y prioridades.",
      "Ejemplos reales organizados por problema, objetivo y resultado.",
      "Elige la clínica más cómoda para reservar una valoración.",
      "Respuestas directas a las preguntas más frecuentes antes de empezar.",
      "Envía una solicitud y la clínica seleccionada se pondrá en contacto contigo.",
    ],
    colleagues: [
      "Clínica, flujo digital y formación profesional internacional.",
      "Mentoría, formación y apoyo en la planificación de casos.",
      "Recorridos a medida basados en casos reales y necesidades clínicas.",
      "Formación estructurada sobre alineadores, biomecánica y casos complejos.",
      "Intercambio clínico entre colegas sobre casos, estrategias y setups.",
      "Decisiones biomecánicas, límites y filosofía de tratamiento.",
      "Apoyo ClinCheck y mentoría para mejorar el control y la predictibilidad.",
    ],
  },
};

export const digitalSmileUi: Record<Locale, DigitalSmileUi> = {
  it: {
    eyebrow: "The Digital Smile Navigation",
    sceneLabel: "Mappa interattiva del percorso",
    instruction: "Scorri per allineare il sorriso. Esplora ogni punto per aprire una sezione.",
    progressLabel: "Evoluzione digitale",
    stageLabels: ["Stato iniziale", "Stato intermedio", "Stato finale"],
    previewLabel: "Anteprima percorso",
    openSection: "Apri la sezione",
    mobileHeading: "Esplora il percorso",
    mobileIntro: "Tutte le sezioni restano accessibili con un tocco, in un formato più leggero.",
    closingEyebrow: "Il prossimo passo",
  },
  en: {
    eyebrow: "The Digital Smile Navigation",
    sceneLabel: "Interactive journey map",
    instruction: "Scroll to align the smile. Explore each point to open a section.",
    progressLabel: "Digital evolution",
    stageLabels: ["Initial state", "Intermediate state", "Final state"],
    previewLabel: "Journey preview",
    openSection: "Open section",
    mobileHeading: "Explore the journey",
    mobileIntro: "Every section remains one tap away in a lighter, mobile-first format.",
    closingEyebrow: "The next step",
  },
  es: {
    eyebrow: "The Digital Smile Navigation",
    sceneLabel: "Mapa interactivo del recorrido",
    instruction: "Desplázate para alinear la sonrisa. Explora cada punto para abrir una sección.",
    progressLabel: "Evolución digital",
    stageLabels: ["Estado inicial", "Estado intermedio", "Estado final"],
    previewLabel: "Vista previa",
    openSection: "Abrir sección",
    mobileHeading: "Explora el recorrido",
    mobileIntro: "Todas las secciones siguen accesibles con un toque, en un formato más ligero.",
    closingEyebrow: "El siguiente paso",
  },
};

export function getSmileJourneyDefinitions(
  locale: Locale,
  audience: Audience,
): SmileJourneyItemDefinition[] {
  const sections = audience === "patients" ? patientSections : colleagueSections;

  return sections.map((section, index) => ({
    id: `${audience}-${section}`,
    section,
    shortPreview: previews[locale][audience][index],
    markerPosition: markerPositions[index],
    code: String(index + 1).padStart(2, "0"),
  }));
}
