import type { LocaleContent } from "./types";
import { patientsSectionsEn, colleaguesSectionsEn } from "./sections/en";

/** English content — source: Contenuti_Sito_Giorgio_Comola_v1. */
export const en: LocaleContent = {
  patientsSections: patientsSectionsEn,
  colleaguesSections: colleaguesSectionsEn,
  landing: {
    seo: {
      title: "Dr. Giorgio Comola | Digital Orthodontics & Clinical Education",
      description:
        "Advanced digital orthodontics for patients and clinical education for professionals. Digital diagnosis, precise planning, clinical control.",
    },
    h1: "Digital Orthodontics & Clinical Education",
    subtitle:
      "Advanced digital orthodontics for patients. Clinical education for professionals.",
    keyMessage:
      "One website. Two journeys. The same philosophy: digital diagnosis, precise planning, clinical control.",
    patientChoice: {
      label: "I am a patient",
      description:
        "I want to understand my treatment, view clinical cases and book a consultation.",
    },
    colleagueChoice: {
      label: "I am a colleague",
      description:
        "I need education, mentorship, ClinCheck support or aligner courses.",
    },
    primaryCta: "Choose your path",
    changeLanguageLabel: "Change language",
  },

  patients: {
    seo: {
      title: "Digital orthodontics for patients | Dr. Giorgio Comola",
      description:
        "Clear aligner treatments planned with a digital workflow and a complete clinical vision. Diagnosis before treatment.",
    },
    h1: "Digital orthodontics. More precision, less improvisation.",
    subtitle:
      "Clear aligner treatments planned with a digital workflow and a complete clinical vision.",
    audienceList: {
      heading: "Who it is for",
      items: [
        "Adults who want to improve smile and function.",
        "Teenagers in active growth.",
        "Children who need early interceptive care.",
        "Patients looking for a clear, modern and non-generic approach.",
      ],
    },
    keyMessage: {
      heading: "Editorial promise",
      body: "We do not start from the appliance. We start from the diagnosis. Only then do we choose the correct treatment.",
    },
    primaryCta: {
      label: "Book a first consultation",
      target: { kind: "section", audience: "patients", section: "book" },
    },
    secondaryCta: {
      label: "See how the journey works",
      target: { kind: "section", audience: "patients", section: "what-i-offer" },
    },
    imageNote:
      "Image/visual to be defined later: clinical case, digital rendering or a minimal schematic consistent with the page.",
  },

  colleagues: {
    seo: {
      title: "Invisalign education & digital orthodontics | Giorgio Comola",
      description:
        "Courses, mentorship and ClinCheck planning support for dentists and orthodontists working with clear aligners.",
    },
    h1: "Clinical education for those who use aligners seriously.",
    subtitle:
      "Courses, mentorship and planning support for dentists and orthodontists.",
    audienceList: {
      heading: "Who it is for",
      items: [
        "Clinicians who want more predictable cases.",
        "Clinicians who want to read ClinCheck better.",
        "Clinicians who want to integrate digital workflow and diagnosis.",
        "Clinicians who want method, not shortcuts.",
      ],
    },
    keyMessage: {
      heading: "Key message",
      body: "Aligners do not simplify orthodontics. They make it clearer who plans well and who does not.",
    },
    primaryCta: {
      label: "Request mentorship",
      target: { kind: "section", audience: "colleagues", section: "consulting" },
    },
    secondaryCta: {
      label: "Discover courses",
      target: { kind: "section", audience: "colleagues", section: "education" },
    },
    imageNote:
      "Image/visual to be defined later: congress lecture, digital workflow or a minimal schematic consistent with the page.",
  },
};
