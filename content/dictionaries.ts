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
      alignerSupport: {
        label: "Ho un problema con gli allineatori",
        description: "Risposte rapide su mascherine, dolore, attachment, elastici e contenzione.",
      },
      enter: "Entra",
    },
    form: {
      success:
        "Grazie. La tua richiesta è stata presa in carico: ti ricontatteremo al più presto.",
      error:
        "Non è stato possibile inviare la richiesta. Riprova o contatta direttamente la sede.",
      consent:
        "Acconsento al trattamento dei miei dati per essere ricontattato, secondo l'informativa sulla privacy.",
      patientSubject: "Richiesta di prima visita ortodontica",
      colleagueSubject: "Richiesta formazione / consulenza — colleghi",
      mailtoHint:
        "Invio diretto: la richiesta arriva alla segreteria della sede selezionata.",
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
      emailCopy: "Copia email",
      emailCopied: "Email copiata",
      emailUnavailable: "Email non disponibile",
      emailUseForm: "Per questa sede usa il form di prenotazione.",
      bookHere: "Prenota in questa sede",
    },
    booking: {
      clinicLabel: "Sede preferita",
      clinicPlaceholder: "Scegli lo studio più comodo",
      firstName: "Nome",
      lastName: "Cognome",
      phone: "Telefono",
      email: "Email",
      age: "Età del paziente",
      city: "Città preferita",
      xrays: "Hai già radiografie o scansioni?",
      xraysYes: "Sì",
      xraysNo: "No",
      reason: "Motivo della richiesta",
      consent:
        "Acconsento al trattamento dei miei dati per essere ricontattato, secondo l'informativa sulla privacy.",
      submit: "Invia richiesta di visita",
      sending: "Invio in corso…",
      success:
        "Richiesta inviata correttamente. La segreteria della sede selezionata ti ricontatterà.",
      error:
        "Non è stato possibile inviare la richiesta. Riprova o contatta direttamente la sede.",
      requiredHint: "I campi contrassegnati con * sono obbligatori.",
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
      alignerSupport: {
        label: "I have an aligner problem",
        description: "Quick guidance on aligners, discomfort, attachments, elastics and retention.",
      },
      enter: "Enter",
    },
    form: {
      success:
        "Thank you. Your request has been received: we will get back to you shortly.",
      error:
        "We couldn't send your request. Please try again or contact the clinic directly.",
      consent:
        "I consent to the processing of my data to be contacted, in accordance with the privacy policy.",
      patientSubject: "Orthodontic first consultation request",
      colleagueSubject: "Education / consulting request — colleagues",
      mailtoHint:
        "Sent directly: your request reaches the selected clinic's front desk.",
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
      emailCopy: "Copy email",
      emailCopied: "Email copied",
      emailUnavailable: "Email not available",
      emailUseForm: "For this clinic, please use the booking form.",
      bookHere: "Book at this clinic",
    },
    booking: {
      clinicLabel: "Preferred location",
      clinicPlaceholder: "Choose the most convenient clinic",
      firstName: "First name",
      lastName: "Last name",
      phone: "Phone",
      email: "Email",
      age: "Patient age",
      city: "Preferred city",
      xrays: "Do you already have X-rays or scans?",
      xraysYes: "Yes",
      xraysNo: "No",
      reason: "Reason for the request",
      consent:
        "I consent to the processing of my data to be contacted, in accordance with the privacy policy.",
      submit: "Send appointment request",
      sending: "Sending…",
      success:
        "Request sent successfully. The selected clinic's front desk will contact you.",
      error:
        "We couldn't send your request. Please try again or contact the clinic directly.",
      requiredHint: "Fields marked with * are required.",
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
      alignerSupport: {
        label: "Tengo un problema con mis alineadores",
        description: "Respuestas rápidas sobre alineadores, molestias, attachments, elásticos y retención.",
      },
      enter: "Entrar",
    },
    form: {
      success:
        "Gracias. Tu solicitud ha sido recibida: te contactaremos lo antes posible.",
      error:
        "No se ha podido enviar la solicitud. Inténtalo de nuevo o contacta directamente con la sede.",
      consent:
        "Consiento el tratamiento de mis datos para ser contactado, según la política de privacidad.",
      patientSubject: "Solicitud de primera visita ortodóncica",
      colleagueSubject: "Solicitud de formación / consultoría — colegas",
      mailtoHint:
        "Envío directo: la solicitud llega a la recepción de la sede seleccionada.",
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
      emailCopy: "Copiar email",
      emailCopied: "Email copiado",
      emailUnavailable: "Email no disponible",
      emailUseForm: "Para esta sede usa el formulario de reserva.",
      bookHere: "Reserva en esta sede",
    },
    booking: {
      clinicLabel: "Sede preferida",
      clinicPlaceholder: "Elige la clínica más cómoda",
      firstName: "Nombre",
      lastName: "Apellido",
      phone: "Teléfono",
      email: "Email",
      age: "Edad del paciente",
      city: "Ciudad preferida",
      xrays: "¿Ya tienes radiografías o escaneos?",
      xraysYes: "Sí",
      xraysNo: "No",
      reason: "Motivo de la solicitud",
      consent:
        "Consiento el tratamiento de mis datos para ser contactado, según la política de privacidad.",
      submit: "Enviar solicitud de visita",
      sending: "Enviando…",
      success:
        "Solicitud enviada correctamente. La recepción de la sede seleccionada te contactará.",
      error:
        "No se ha podido enviar la solicitud. Inténtalo de nuevo o contacta directamente con la sede.",
      requiredHint: "Los campos marcados con * son obligatorios.",
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
