import type { Dictionary } from "./types";
import type { Locale } from "@/lib/i18n";

/** UI chrome strings (header, footer, selectors) per locale. */
export const dictionaries: Record<Locale, Dictionary> = {
  it: {
    brandName: "Giorgio Comola",
    brandTagline: "Digital Orthodontics & Clinical Education",
    nav: { patients: "Pazienti", colleagues: "Colleghi", home: "Home" },
    languageSelector: { label: "Lingua", ariaLabel: "Cambia lingua" },
    audienceSelector: { patients: "Pazienti", colleagues: "Colleghi" },
    gateway: {
      welcome: "Benvenuto",
      intro:
        "Ortodonzia digitale avanzata per pazienti. Formazione clinica per professionisti.",
      chooseLanguage: "Seleziona la lingua",
      choosePath: "Scegli il tuo percorso",
      patient: {
        label: "Sono un paziente",
        description:
          "Capire il trattamento, vedere i casi e prenotare una visita.",
      },
      colleague: {
        label: "Sono un collega",
        description: "Formazione, mentorship, ClinCheck e corsi sugli allineatori.",
      },
      enter: "Entra",
    },
    form: {
      success:
        "Grazie. La tua richiesta è stata presa in carico: ti ricontatteremo al più presto.",
      consent:
        "Acconsento al trattamento dei miei dati per essere ricontattato, secondo l'informativa sulla privacy.",
      patientSubject: "Richiesta di prima visita ortodontica",
      colleagueSubject: "Richiesta formazione / consulenza — colleghi",
      mailtoHint:
        "All'invio si aprirà la tua email con il messaggio precompilato verso lo studio.",
    },
    clinics: {
      call: "Chiama",
      whatsapp: "WhatsApp",
      email: "Email",
      directions: "Indicazioni",
      showMap: "Mostra mappa",
      selectLabel: "Sede preferita",
      selectPlaceholder: "Scegli lo studio più comodo",
      contactTitle: "Contatta direttamente la sede",
      mapOverviewTitle: "Le sedi sulla mappa",
    },
    footer: {
      sectionsTitle: "Percorsi",
      languagesTitle: "Lingue",
      legalTitle: "Legale",
      privacy: "Privacy Policy",
      cookie: "Cookie Policy",
      disclaimer:
        "I casi clinici sono mostrati come esempi e non costituiscono promessa di risultato. Ogni caso richiede una diagnosi individuale.",
      medicalNote:
        "Le informazioni presenti nel sito hanno finalità divulgativa e non sostituiscono una visita clinica.",
      rights: "Tutti i diritti riservati.",
    },
    cookie: {
      message:
        "Questo sito usa solo cookie tecnici essenziali e, nella pagina Studi, mappe OpenStreetMap. Nessuna profilazione.",
      accept: "Ho capito",
      essential: "Solo essenziali",
      more: "Cookie Policy",
    },
    skipToContent: "Vai al contenuto",
  },
  en: {
    brandName: "Giorgio Comola",
    brandTagline: "Digital Orthodontics & Clinical Education",
    nav: { patients: "Patients", colleagues: "Colleagues", home: "Home" },
    languageSelector: { label: "Language", ariaLabel: "Change language" },
    audienceSelector: { patients: "Patients", colleagues: "Colleagues" },
    gateway: {
      welcome: "Welcome",
      intro:
        "Advanced digital orthodontics for patients. Clinical education for professionals.",
      chooseLanguage: "Select your language",
      choosePath: "Choose your path",
      patient: {
        label: "I am a patient",
        description:
          "Understand your treatment, view cases and book a consultation.",
      },
      colleague: {
        label: "I am a colleague",
        description: "Education, mentorship, ClinCheck and aligner courses.",
      },
      enter: "Enter",
    },
    form: {
      success:
        "Thank you. Your request has been received: we will get back to you shortly.",
      consent:
        "I consent to the processing of my data to be contacted, in accordance with the privacy policy.",
      patientSubject: "Orthodontic first consultation request",
      colleagueSubject: "Education / consulting request — colleagues",
      mailtoHint:
        "On submit, your email client opens with a pre-filled message to the clinic.",
    },
    clinics: {
      call: "Call",
      whatsapp: "WhatsApp",
      email: "Email",
      directions: "Directions",
      showMap: "Show map",
      selectLabel: "Preferred location",
      selectPlaceholder: "Choose the most convenient clinic",
      contactTitle: "Contact the clinic directly",
      mapOverviewTitle: "Locations on the map",
    },
    footer: {
      sectionsTitle: "Journeys",
      languagesTitle: "Languages",
      legalTitle: "Legal",
      privacy: "Privacy Policy",
      cookie: "Cookie Policy",
      disclaimer:
        "Clinical cases are shown as examples and do not constitute a promise of outcome. Every case requires an individual diagnosis.",
      medicalNote:
        "The information on this site is for general purposes and does not replace a clinical consultation.",
      rights: "All rights reserved.",
    },
    cookie: {
      message:
        "This site uses only essential technical cookies and, on the Clinics page, OpenStreetMap maps. No profiling.",
      accept: "Got it",
      essential: "Essential only",
      more: "Cookie Policy",
    },
    skipToContent: "Skip to content",
  },
  es: {
    brandName: "Giorgio Comola",
    brandTagline: "Digital Orthodontics & Clinical Education",
    nav: { patients: "Pacientes", colleagues: "Colegas", home: "Inicio" },
    languageSelector: { label: "Idioma", ariaLabel: "Cambiar idioma" },
    audienceSelector: { patients: "Pacientes", colleagues: "Colegas" },
    gateway: {
      welcome: "Bienvenido",
      intro:
        "Ortodoncia digital avanzada para pacientes. Formación clínica para profesionales.",
      chooseLanguage: "Selecciona el idioma",
      choosePath: "Elige tu recorrido",
      patient: {
        label: "Soy paciente",
        description:
          "Entender tu tratamiento, ver casos y reservar una visita.",
      },
      colleague: {
        label: "Soy colega",
        description: "Formación, mentoría, ClinCheck y cursos de alineadores.",
      },
      enter: "Entrar",
    },
    form: {
      success:
        "Gracias. Tu solicitud ha sido recibida: te contactaremos lo antes posible.",
      consent:
        "Consiento el tratamiento de mis datos para ser contactado, según la política de privacidad.",
      patientSubject: "Solicitud de primera visita ortodóncica",
      colleagueSubject: "Solicitud de formación / consultoría — colegas",
      mailtoHint:
        "Al enviar se abrirá tu correo con un mensaje precargado hacia la clínica.",
    },
    clinics: {
      call: "Llamar",
      whatsapp: "WhatsApp",
      email: "Email",
      directions: "Cómo llegar",
      showMap: "Ver mapa",
      selectLabel: "Sede preferida",
      selectPlaceholder: "Elige la clínica más cómoda",
      contactTitle: "Contacta directamente con la sede",
      mapOverviewTitle: "Las sedes en el mapa",
    },
    footer: {
      sectionsTitle: "Recorridos",
      languagesTitle: "Idiomas",
      legalTitle: "Legal",
      privacy: "Política de Privacidad",
      cookie: "Política de Cookies",
      disclaimer:
        "Los casos clínicos se muestran como ejemplos y no constituyen una promesa de resultado. Cada caso requiere un diagnóstico individual.",
      medicalNote:
        "La información de este sitio tiene fines divulgativos y no sustituye una visita clínica.",
      rights: "Todos los derechos reservados.",
    },
    cookie: {
      message:
        "Este sitio usa solo cookies técnicas esenciales y, en la página de Clínicas, mapas de OpenStreetMap. Sin perfilado.",
      accept: "Entendido",
      essential: "Solo esenciales",
      more: "Política de Cookies",
    },
    skipToContent: "Ir al contenido",
  },
};
