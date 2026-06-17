import type { LocaleContent } from "./types";
import { patientsSectionsEs, colleaguesSectionsEs } from "./sections/es";

/** Spanish content — source: Contenuti_Sito_Giorgio_Comola_v1. */
export const es: LocaleContent = {
  patientsSections: patientsSectionsEs,
  colleaguesSections: colleaguesSectionsEs,
  landing: {
    seo: {
      title: "Dr. Giorgio Comola | Ortodoncia digital y formación clínica",
      description:
        "Ortodoncia digital avanzada para pacientes y formación clínica para profesionales. Diagnóstico digital, planificación precisa, control clínico.",
    },
    h1: "Digital Orthodontics & Clinical Education",
    subtitle:
      "Ortodoncia digital avanzada para pacientes. Formación clínica para profesionales.",
    keyMessage:
      "Un solo sitio. Dos recorridos. La misma filosofía: diagnóstico digital, planificación precisa, control clínico.",
    patientChoice: {
      label: "Soy paciente",
      description:
        "Quiero entender mi tratamiento, ver casos clínicos y reservar una visita.",
    },
    colleagueChoice: {
      label: "Soy colega",
      description:
        "Busco formación, mentoría, soporte ClinCheck o cursos de alineadores.",
    },
    primaryCta: "Elige tu recorrido",
    changeLanguageLabel: "Cambiar idioma",
  },

  patients: {
    seo: {
      title: "Ortodoncia digital para pacientes | Dr. Giorgio Comola",
      description:
        "Tratamientos con alineadores transparentes planificados con flujo digital y visión clínica completa. Diagnóstico antes del tratamiento.",
    },
    h1: "Ortodoncia digital. Más precisión, menos improvisación.",
    subtitle:
      "Tratamientos con alineadores transparentes planificados con flujo digital y visión clínica completa.",
    audienceList: {
      heading: "Para quién es",
      items: [
        "Adultos que quieren mejorar sonrisa y función.",
        "Adolescentes en crecimiento.",
        "Niños que necesitan tratamiento interceptivo temprano.",
        "Pacientes que buscan un enfoque claro, moderno y no genérico.",
      ],
    },
    keyMessage: {
      heading: "Promesa editorial",
      body: "No empezamos por el aparato. Empezamos por el diagnóstico. Solo después elegimos el tratamiento correcto.",
    },
    primaryCta: {
      label: "Reservar primera visita",
      target: { kind: "section", audience: "patients", section: "book" },
    },
    secondaryCta: {
      label: "Ver cómo funciona el recorrido",
      target: { kind: "section", audience: "patients", section: "what-i-offer" },
    },
    imageNote:
      "Imagen/visual por definir más adelante: caso clínico, renderizado digital o esquema minimal coherente con la página.",
  },

  colleagues: {
    seo: {
      title: "Formación Invisalign y ortodoncia digital | Giorgio Comola",
      description:
        "Cursos, mentoría y soporte de planificación ClinCheck para dentistas y ortodoncistas que trabajan con alineadores transparentes.",
    },
    h1: "Formación clínica para quien usa alineadores en serio.",
    subtitle:
      "Cursos, mentoría y soporte de planificación para dentistas y ortodoncistas.",
    audienceList: {
      heading: "Para quién es",
      items: [
        "Para quien quiere mejorar la predictibilidad de sus casos.",
        "Para quien quiere leer mejor el ClinCheck.",
        "Para quien quiere integrar workflow digital y diagnóstico.",
        "Para quien no busca atajos, sino método.",
      ],
    },
    keyMessage: {
      heading: "Mensaje clave",
      body: "Los alineadores no simplifican la ortodoncia. Hacen más evidente quién planifica bien y quién no.",
    },
    primaryCta: {
      label: "Solicitar mentoría",
      target: { kind: "section", audience: "colleagues", section: "consulting" },
    },
    secondaryCta: {
      label: "Descubrir cursos",
      target: { kind: "section", audience: "colleagues", section: "education" },
    },
    imageNote:
      "Imagen/visual por definir más adelante: ponencia en congreso, workflow digital o esquema minimal coherente con la página.",
  },
};
