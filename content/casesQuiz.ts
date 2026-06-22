import type { Locale } from "@/lib/i18n";
import type { CaseCategoryKey, PatientType } from "./cases";

/**
 * "Find a smile like yours" guided questionnaire.
 *
 * Medical-legal: this is an orientation tool, NOT a diagnosis. Copy is phrased as
 * "cases that may be similar to your starting point" and always points to a
 * professional consultation.
 */

type L = Record<Locale, string>;
const t = (it: string, en: string, es: string): L => ({ it, en, es });

export type QuizOption = {
  id: string;
  label: L;
  categories?: CaseCategoryKey[];
  tags?: string[];
  patientType?: PatientType;
};

export type QuizQuestion = {
  id: string;
  question: L;
  options: QuizOption[];
};

export const quizQuestions: QuizQuestion[] = [
  {
    id: "age",
    question: t(
      "Quanti anni ha il paziente?",
      "How old is the patient?",
      "¿Qué edad tiene el paciente?",
    ),
    options: [
      { id: "child", label: t("Bambino, fino a circa 10 anni", "Child, up to about 10 years", "Niño, hasta unos 10 años"), patientType: "child" },
      { id: "teen", label: t("Adolescente", "Teenager", "Adolescente"), patientType: "teen" },
      { id: "adult", label: t("Adulto", "Adult", "Adulto"), patientType: "adult" },
    ],
  },
  {
    id: "main",
    question: t(
      "Qual è il problema che noti di più?",
      "What is the problem you notice most?",
      "¿Cuál es el problema que más notas?",
    ),
    options: [
      { id: "crowding", label: t("Denti storti o sovrapposti", "Crooked or overlapping teeth", "Dientes torcidos o superpuestos"), categories: ["crowding"] },
      { id: "class2", label: t("Denti superiori troppo sporgenti", "Upper teeth too protruding", "Dientes superiores muy salientes"), categories: ["class-ii"] },
      { id: "class3", label: t("Denti inferiori troppo avanti o morso al contrario", "Lower teeth too forward or reverse bite", "Dientes inferiores muy adelantados o mordida invertida"), categories: ["class-iii"] },
      { id: "deep", label: t("Denti sopra che coprono troppo quelli sotto", "Upper teeth covering the lower ones too much", "Dientes de arriba que cubren demasiado los de abajo"), categories: ["deep-bite"] },
      { id: "open", label: t("Denti davanti che non si toccano", "Front teeth that do not touch", "Dientes delanteros que no se tocan"), categories: ["open-bite"] },
      { id: "cross", label: t("Denti che chiudono storti o di lato", "Teeth that close crooked or sideways", "Dientes que cierran torcidos o de lado"), categories: ["crossbite"] },
      { id: "spacing", label: t("Spazi tra i denti", "Spaces between teeth", "Espacios entre los dientes"), categories: ["spacing"] },
      { id: "impacted", label: t("Un dente che non è uscito", "A tooth that has not come through", "Un diente que no ha salido"), categories: ["impacted-canine"] },
      { id: "unknown", label: t("Non lo so", "I don't know", "No lo sé") },
    ],
  },
  {
    id: "space",
    question: t(
      "I denti sembrano avere poco spazio?",
      "Do the teeth seem to have little space?",
      "¿Los dientes parecen tener poco espacio?",
    ),
    options: [
      { id: "lower", label: t("Sì, soprattutto sotto", "Yes, especially the lower ones", "Sí, sobre todo abajo"), categories: ["crowding"], tags: ["lower-crowding"] },
      { id: "upper", label: t("Sì, soprattutto sopra", "Yes, especially the upper ones", "Sí, sobre todo arriba"), categories: ["crowding"], tags: ["upper-crowding"] },
      { id: "both", label: t("Sì, sopra e sotto", "Yes, upper and lower", "Sí, arriba y abajo"), categories: ["crowding"] },
      { id: "spacing", label: t("No, ci sono più spazi che affollamento", "No, there are more gaps than crowding", "No, hay más espacios que apiñamiento"), categories: ["spacing"] },
      { id: "unknown", label: t("Non saprei", "Not sure", "No sabría") },
    ],
  },
  {
    id: "frontbite",
    question: t(
      "Quando chiudi i denti davanti, cosa succede?",
      "When you close your front teeth, what happens?",
      "Cuando cierras los dientes delanteros, ¿qué ocurre?",
    ),
    options: [
      { id: "deep", label: t("I denti superiori coprono molto quelli inferiori", "Upper teeth cover the lower ones a lot", "Los superiores cubren mucho los inferiores"), categories: ["deep-bite"] },
      { id: "open", label: t("I denti davanti non si toccano", "The front teeth do not touch", "Los dientes delanteros no se tocan"), categories: ["open-bite"] },
      { id: "normal", label: t("Mi sembra che chiudano normalmente", "They seem to close normally", "Me parece que cierran normalmente") },
      { id: "unknown", label: t("Non saprei", "Not sure", "No sabría") },
    ],
  },
  {
    id: "upperforward",
    question: t(
      "Ti sembra che i denti superiori siano troppo avanti?",
      "Do the upper teeth seem too far forward?",
      "¿Te parece que los dientes superiores están muy adelantados?",
    ),
    options: [
      { id: "yes", label: t("Sì", "Yes", "Sí"), categories: ["class-ii"] },
      { id: "no", label: t("No", "No", "No") },
      { id: "unknown", label: t("Non saprei", "Not sure", "No sabría") },
    ],
  },
  {
    id: "lowerforward",
    question: t(
      "Ti sembra che la mandibola o i denti inferiori siano troppo avanti?",
      "Do the jaw or lower teeth seem too far forward?",
      "¿Te parece que la mandíbula o los dientes inferiores están muy adelantados?",
    ),
    options: [
      { id: "yes", label: t("Sì", "Yes", "Sí"), categories: ["class-iii"] },
      { id: "no", label: t("No", "No", "No") },
      { id: "unknown", label: t("Non saprei", "Not sure", "No sabría") },
    ],
  },
  {
    id: "crossbite",
    question: t(
      "Quando chiudi, alcuni denti sembrano chiudere al contrario o la mandibola scivola da un lato?",
      "When you close, do some teeth close in reverse or does the jaw slide to one side?",
      "Al cerrar, ¿algunos dientes cierran al revés o la mandíbula se desplaza a un lado?",
    ),
    options: [
      { id: "yes", label: t("Sì", "Yes", "Sí"), categories: ["crossbite"] },
      { id: "no", label: t("No", "No", "No") },
      { id: "unknown", label: t("Non saprei", "Not sure", "No sabría") },
    ],
  },
  {
    id: "history",
    question: t(
      "Hai già fatto ortodonzia o hai denti mancanti, protesi o impianti?",
      "Have you had orthodontics before, or do you have missing teeth, prosthetics or implants?",
      "¿Ya hiciste ortodoncia o tienes dientes ausentes, prótesis o implantes?",
    ),
    options: [
      { id: "relapse", label: t("Ho già fatto apparecchio o allineatori", "I have had braces or aligners", "Ya usé aparato o alineadores"), categories: ["relapse"] },
      { id: "interdisc", label: t("Ho denti mancanti, impianti o protesi", "I have missing teeth, implants or prosthetics", "Tengo dientes ausentes, implantes o prótesis"), categories: ["interdisciplinary"] },
      { id: "no", label: t("No", "No", "No") },
      { id: "unknown", label: t("Non saprei", "Not sure", "No sabría") },
    ],
  },
];

/** UI copy for the explorer + quiz, per locale. */
export type ExplorerStrings = {
  heroTitle: string;
  heroSubtitle: string;
  tabBrowse: string;
  tabQuiz: string;
  browseIntro: string;
  casesIn: string;
  noCasesYet: string;
  viewCase: string;
  allCases: string;
  quizStart: string;
  quizStep: string;
  back: string;
  restart: string;
  resultTitle: string;
  resultText: string;
  resultCta: string;
  noMatchText: string;
  disclaimer: string;
  patientTypeLabel: Record<PatientType, string>;
};

export const explorerStrings: Record<
  Locale,
  {
    heroTitle: string;
    heroSubtitle: string;
    tabBrowse: string;
    tabQuiz: string;
    browseIntro: string;
    casesIn: string;
    noCasesYet: string;
    viewCase: string;
    allCases: string;
    quizStart: string;
    quizStep: string; // "Domanda {n} di {total}"
    back: string;
    restart: string;
    resultTitle: string;
    resultText: string;
    resultCta: string;
    noMatchText: string;
    disclaimer: string;
    patientTypeLabel: Record<PatientType, string>;
  }
> = {
  it: {
    heroTitle: "Casi reali. Trova un sorriso simile al tuo.",
    heroSubtitle:
      "Sfoglia esempi clinici selezionati oppure rispondi a poche domande per orientarti tra problemi simili al tuo. Ogni caso è diverso e richiede sempre una diagnosi individuale.",
    tabBrowse: "Sfoglia i casi clinici",
    tabQuiz: "Trova il sorriso come il tuo",
    browseIntro: "Scegli il problema più simile al tuo per vedere casi reali.",
    casesIn: "Casi in questa categoria",
    noCasesYet: "Casi in arrivo per questa categoria.",
    viewCase: "Guarda il caso",
    allCases: "Tutte le categorie",
    quizStart: "Inizia il questionario",
    quizStep: "Domanda {n} di {total}",
    back: "Indietro",
    restart: "Ricomincia",
    resultTitle: "Casi simili al tuo sorriso",
    resultText:
      "Dalle tue risposte emergono caratteristiche che possono essere presenti in questi esempi clinici. Questo risultato non è una diagnosi: serve solo a orientarti tra casi reali.",
    resultCta: "Prenota una valutazione ortodontica digitale",
    noMatchText:
      "Non abbiamo trovato una corrispondenza netta, ma questi casi selezionati possono comunque darti un'idea. La cosa migliore è una valutazione clinica.",
    disclaimer:
      "Questo strumento non sostituisce una visita ortodontica. I casi mostrati sono esempi e non costituiscono promessa di risultato.",
    patientTypeLabel: { child: "Bambino", teen: "Adolescente", adult: "Adulto" },
  },
  en: {
    heroTitle: "Real cases. Find a smile like yours.",
    heroSubtitle:
      "Browse selected clinical examples or answer a few questions to orient yourself among problems similar to yours. Every case is different and always requires an individual diagnosis.",
    tabBrowse: "Browse clinical cases",
    tabQuiz: "Find a smile like yours",
    browseIntro: "Choose the problem closest to yours to see real cases.",
    casesIn: "Cases in this category",
    noCasesYet: "Cases coming soon for this category.",
    viewCase: "View case",
    allCases: "All categories",
    quizStart: "Start the questionnaire",
    quizStep: "Question {n} of {total}",
    back: "Back",
    restart: "Restart",
    resultTitle: "Cases similar to your smile",
    resultText:
      "Your answers suggest features that may be present in these clinical examples. This result is not a diagnosis: it only helps you orient yourself among real cases.",
    resultCta: "Book a digital orthodontic assessment",
    noMatchText:
      "We did not find a clear match, but these selected cases can still give you an idea. The best step is a clinical assessment.",
    disclaimer:
      "This tool does not replace an orthodontic consultation. The cases shown are examples and not a promise of outcome.",
    patientTypeLabel: { child: "Child", teen: "Teenager", adult: "Adult" },
  },
  es: {
    heroTitle: "Casos reales. Encuentra una sonrisa como la tuya.",
    heroSubtitle:
      "Explora ejemplos clínicos seleccionados o responde a unas preguntas para orientarte entre problemas similares al tuyo. Cada caso es diferente y siempre requiere un diagnóstico individual.",
    tabBrowse: "Explora los casos clínicos",
    tabQuiz: "Encuentra una sonrisa como la tuya",
    browseIntro: "Elige el problema más parecido al tuyo para ver casos reales.",
    casesIn: "Casos en esta categoría",
    noCasesYet: "Casos próximamente para esta categoría.",
    viewCase: "Ver caso",
    allCases: "Todas las categorías",
    quizStart: "Empezar el cuestionario",
    quizStep: "Pregunta {n} de {total}",
    back: "Atrás",
    restart: "Reiniciar",
    resultTitle: "Casos parecidos a tu sonrisa",
    resultText:
      "Tus respuestas sugieren características que pueden estar presentes en estos ejemplos clínicos. Este resultado no es un diagnóstico: solo te ayuda a orientarte entre casos reales.",
    resultCta: "Reserva una valoración ortodóncica digital",
    noMatchText:
      "No encontramos una coincidencia clara, pero estos casos seleccionados pueden darte una idea. Lo mejor es una valoración clínica.",
    disclaimer:
      "Esta herramienta no sustituye una visita ortodóncica. Los casos mostrados son ejemplos y no una promesa de resultado.",
    patientTypeLabel: { child: "Niño", teen: "Adolescente", adult: "Adulto" },
  },
};
