import type { LocaleContent } from "./types";
import { patientsSectionsIt, colleaguesSectionsIt } from "./sections/it";

/** Italian content — source: Contenuti_Sito_Giorgio_Comola_v1 + SEO_Strategy_v1. */
export const it: LocaleContent = {
  patientsSections: patientsSectionsIt,
  colleaguesSections: colleaguesSectionsIt,
  landing: {
    seo: {
      title: "Dr. Giorgio Comola | Ortodonzia digitale e formazione clinica",
      description:
        "Ortodonzia digitale avanzata per pazienti e formazione clinica per professionisti. Diagnosi digitale, pianificazione precisa, controllo clinico.",
    },
    h1: "Digital Orthodontics & Clinical Education",
    subtitle:
      "Ortodonzia digitale avanzata per pazienti. Formazione clinica per professionisti.",
    keyMessage:
      "Un unico sito. Due percorsi. La stessa filosofia: diagnosi digitale, pianificazione precisa, controllo clinico.",
    patientChoice: {
      label: "Sono un paziente",
      description:
        "Voglio capire il mio trattamento, vedere casi clinici e prenotare una visita.",
    },
    colleagueChoice: {
      label: "Sono un collega",
      description:
        "Cerco formazione, mentorship, supporto ClinCheck o corsi sugli allineatori.",
    },
    primaryCta: "Scegli il tuo percorso",
    changeLanguageLabel: "Cambia lingua",
  },

  patients: {
    seo: {
      title: "Ortodonzia digitale per pazienti | Dr. Giorgio Comola",
      description:
        "Trattamenti con allineatori trasparenti pianificati con workflow digitale e una visione clinica completa. Diagnosi prima della terapia.",
    },
    h1: "Ortodonzia digitale. Più precisione, meno improvvisazione.",
    subtitle:
      "Trattamenti con allineatori trasparenti, pianificati con workflow digitale e una visione clinica completa.",
    audienceList: {
      heading: "Per chi è",
      items: [
        "Per adulti che vogliono migliorare sorriso e funzione.",
        "Per adolescenti in crescita.",
        "Per bambini che richiedono intercettazione precoce.",
        "Per pazienti che cercano un approccio chiaro, moderno e non generico.",
      ],
    },
    keyMessage: {
      heading: "Promessa editoriale",
      body: "Non si parte dall'apparecchio. Si parte dalla diagnosi. Solo dopo si sceglie il trattamento corretto.",
    },
    primaryCta: {
      label: "Prenota una prima visita",
      target: { kind: "section", audience: "patients", section: "book" },
    },
    secondaryCta: {
      label: "Scopri come funziona il percorso",
      target: { kind: "section", audience: "patients", section: "what-i-offer" },
    },
    imageNote:
      "Immagine/visual da definire in fase successiva: caso clinico, rendering digitale o schema minimal coerente con la pagina.",
  },

  colleagues: {
    seo: {
      title: "Formazione Invisalign e ortodonzia digitale | Giorgio Comola",
      description:
        "Corsi, mentorship e supporto alla pianificazione ClinCheck per dentisti e ortodontisti che lavorano con allineatori trasparenti.",
    },
    h1: "Formazione clinica per chi usa gli allineatori sul serio.",
    subtitle:
      "Corsi, mentorship e supporto alla pianificazione per dentisti e ortodontisti.",
    audienceList: {
      heading: "Per chi è",
      items: [
        "Per chi vuole migliorare la prevedibilità dei casi.",
        "Per chi vuole leggere meglio il ClinCheck.",
        "Per chi vuole integrare workflow digitale e diagnosi.",
        "Per chi non cerca scorciatoie, ma metodo.",
      ],
    },
    keyMessage: {
      heading: "Messaggio chiave",
      body: "Gli allineatori non semplificano l'ortodonzia. Rendono più evidente chi pianifica bene e chi no.",
    },
    primaryCta: {
      label: "Richiedi mentorship",
      target: { kind: "section", audience: "colleagues", section: "consulting" },
    },
    secondaryCta: {
      label: "Scopri i corsi",
      target: { kind: "section", audience: "colleagues", section: "education" },
    },
    imageNote:
      "Immagine/visual da definire in fase successiva: relazione congressuale, workflow digitale o schema minimal coerente con la pagina.",
  },
};
