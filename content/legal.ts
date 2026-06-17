import type { Locale } from "@/lib/i18n";

/** Practitioner identification — health-advertising transparency (IT) + privacy controller. */
export const PRACTITIONER = {
  name: "Dr. Giorgio Comola",
  address: "Via Roberto Ardigò 15",
  zip: "20133",
  city: "Milano",
  country: "Italia",
  vat: "02432560999", // P.IVA
  fiscalCode: "CMLGRG92DC16D969G",
  email: "drcomola@gmail.com",
} as const;

export type LegalSection = { heading: string; body: string[] };
export type LegalDoc = {
  title: string;
  updated: string; // ISO date
  intro: string;
  sections: LegalSection[];
};

export const legalDocKeys = ["privacy", "cookie"] as const;
export type LegalDocKey = (typeof legalDocKeys)[number];

const UPDATED = "2026-06-17";
const P = PRACTITIONER;
const controllerLine = `${P.name} — ${P.address}, ${P.zip} ${P.city} (${P.country}) — P.IVA ${P.vat} — C.F. ${P.fiscalCode} — ${P.email}`;

export const legal: Record<Locale, Record<LegalDocKey, LegalDoc>> = {
  it: {
    privacy: {
      title: "Informativa sulla Privacy",
      updated: UPDATED,
      intro:
        "La presente informativa descrive come vengono trattati i dati personali raccolti tramite questo sito, ai sensi del Regolamento (UE) 2016/679 (GDPR).",
      sections: [
        {
          heading: "Titolare del trattamento",
          body: [controllerLine],
        },
        {
          heading: "Dati trattati",
          body: [
            "Dati di contatto forniti volontariamente tramite i moduli (nome e cognome, email, telefono, città, età del paziente, studio/città per i colleghi).",
            "Eventuali informazioni sulla salute che l'utente sceglie di indicare nel campo messaggio: sono categorie particolari di dati (art. 9 GDPR) trattate esclusivamente previo consenso esplicito. Si raccomanda di non inserire dati sanitari di dettaglio nei moduli.",
          ],
        },
        {
          heading: "Finalità",
          body: [
            "Rispondere alle richieste di informazioni, prima visita e prenotazione.",
            "Indirizzare la richiesta del paziente allo studio/sede selezionata.",
            "Gestire richieste di formazione, mentorship e consulenza dei colleghi.",
          ],
        },
        {
          heading: "Base giuridica",
          body: [
            "Consenso dell'interessato (art. 6.1.a e, per i dati relativi alla salute, art. 9.2.a GDPR) ed esecuzione di misure precontrattuali adottate su richiesta dell'interessato.",
          ],
        },
        {
          heading: "Comunicazione dei dati",
          body: [
            "I dati del paziente possono essere trasmessi allo studio o alla sede selezionata al solo fine di gestire l'appuntamento. I dati non sono diffusi né ceduti a terzi per finalità commerciali.",
          ],
        },
        {
          heading: "Conservazione",
          body: [
            "I dati sono conservati per il tempo necessario a gestire la richiesta e ad adempiere agli obblighi di legge, dopodiché sono cancellati o anonimizzati.",
          ],
        },
        {
          heading: "Diritti dell'interessato",
          body: [
            "L'utente può esercitare in ogni momento i diritti di accesso, rettifica, cancellazione, limitazione, opposizione e portabilità, oltre alla revoca del consenso, scrivendo a " +
              P.email +
              ".",
            "È inoltre possibile proporre reclamo al Garante per la protezione dei dati personali (www.garanteprivacy.it).",
          ],
        },
        {
          heading: "Modifiche",
          body: [
            "La presente informativa può essere aggiornata. La versione vigente è sempre pubblicata su questa pagina.",
          ],
        },
      ],
    },
    cookie: {
      title: "Cookie Policy",
      updated: UPDATED,
      intro:
        "Questo sito è progettato per ridurre al minimo l'uso di cookie e tecnologie di tracciamento.",
      sections: [
        {
          heading: "Cookie tecnici",
          body: [
            "Vengono utilizzate solo tecnologie essenziali al funzionamento del sito, ad esempio la memorizzazione locale della scelta espressa su questo banner. Non richiedono consenso.",
          ],
        },
        {
          heading: "Nessuna profilazione",
          body: [
            "Il sito non utilizza cookie di profilazione né strumenti pubblicitari di terze parti.",
          ],
        },
        {
          heading: "Servizi di terze parti",
          body: [
            "La pagina Studi mostra una mappa basata su OpenStreetMap: il caricamento delle mappe comporta una richiesta ai server OpenStreetMap, che possono registrare l'indirizzo IP per finalità tecniche.",
            "I collegamenti a Google Maps si aprono solo dopo un click volontario dell'utente. L'eventuale attivazione di una mappa Google integrata potrebbe comportare l'uso di cookie di Google.",
          ],
        },
        {
          heading: "Gestione dei cookie",
          body: [
            "È possibile gestire o eliminare i cookie e i dati locali tramite le impostazioni del proprio browser.",
          ],
        },
      ],
    },
  },

  en: {
    privacy: {
      title: "Privacy Policy",
      updated: UPDATED,
      intro:
        "This notice explains how personal data collected through this website is processed, under Regulation (EU) 2016/679 (GDPR).",
      sections: [
        { heading: "Data controller", body: [controllerLine] },
        {
          heading: "Data processed",
          body: [
            "Contact details voluntarily provided through the forms (name, email, phone, city, patient age, practice/city for colleagues).",
            "Any health information you choose to add in the message field is a special category of data (Art. 9 GDPR), processed only with explicit consent. Please avoid entering detailed clinical data in the forms.",
          ],
        },
        {
          heading: "Purposes",
          body: [
            "To answer requests for information, first consultations and bookings.",
            "To route a patient's request to the selected clinic/location.",
            "To handle colleagues' education, mentorship and consulting requests.",
          ],
        },
        {
          heading: "Legal basis",
          body: [
            "Consent of the data subject (Art. 6.1.a and, for health data, Art. 9.2.a GDPR) and pre-contractual measures taken at the data subject's request.",
          ],
        },
        {
          heading: "Disclosure of data",
          body: [
            "Patient data may be transmitted to the selected clinic or location solely to manage the appointment. Data is not disclosed or sold to third parties for commercial purposes.",
          ],
        },
        {
          heading: "Retention",
          body: [
            "Data is kept for as long as necessary to handle the request and to comply with legal obligations, then deleted or anonymised.",
          ],
        },
        {
          heading: "Your rights",
          body: [
            "You may exercise the rights of access, rectification, erasure, restriction, objection and portability, and withdraw consent at any time, by writing to " +
              P.email +
              ".",
            "You may also lodge a complaint with the Italian Data Protection Authority (www.garanteprivacy.it).",
          ],
        },
        {
          heading: "Changes",
          body: [
            "This notice may be updated. The current version is always published on this page.",
          ],
        },
      ],
    },
    cookie: {
      title: "Cookie Policy",
      updated: UPDATED,
      intro:
        "This website is designed to minimise the use of cookies and tracking technologies.",
      sections: [
        {
          heading: "Technical cookies",
          body: [
            "Only technologies essential to the operation of the site are used, e.g. storing locally the choice made on this banner. They do not require consent.",
          ],
        },
        {
          heading: "No profiling",
          body: ["The site uses no profiling cookies or third-party advertising tools."],
        },
        {
          heading: "Third-party services",
          body: [
            "The Clinics page shows a map based on OpenStreetMap: loading the map sends a request to OpenStreetMap servers, which may log the IP address for technical purposes.",
            "Links to Google Maps open only after a deliberate click. Activating an embedded Google map may involve Google cookies.",
          ],
        },
        {
          heading: "Managing cookies",
          body: [
            "You can manage or delete cookies and local data through your browser settings.",
          ],
        },
      ],
    },
  },

  es: {
    privacy: {
      title: "Política de Privacidad",
      updated: UPDATED,
      intro:
        "Esta política explica cómo se tratan los datos personales recogidos a través de este sitio, conforme al Reglamento (UE) 2016/679 (RGPD).",
      sections: [
        { heading: "Responsable del tratamiento", body: [controllerLine] },
        {
          heading: "Datos tratados",
          body: [
            "Datos de contacto facilitados voluntariamente mediante los formularios (nombre, email, teléfono, ciudad, edad del paciente, clínica/ciudad para colegas).",
            "Cualquier información de salud que decidas indicar en el campo del mensaje es una categoría especial de datos (art. 9 RGPD), tratada solo con consentimiento explícito. Se recomienda no introducir datos clínicos detallados en los formularios.",
          ],
        },
        {
          heading: "Finalidades",
          body: [
            "Responder a solicitudes de información, primera visita y reserva.",
            "Dirigir la solicitud del paciente a la clínica/sede seleccionada.",
            "Gestionar solicitudes de formación, mentoría y consultoría de los colegas.",
          ],
        },
        {
          heading: "Base jurídica",
          body: [
            "Consentimiento del interesado (art. 6.1.a y, para datos de salud, art. 9.2.a RGPD) y medidas precontractuales adoptadas a petición del interesado.",
          ],
        },
        {
          heading: "Comunicación de los datos",
          body: [
            "Los datos del paciente pueden transmitirse a la clínica o sede seleccionada con el único fin de gestionar la cita. Los datos no se difunden ni se ceden a terceros con fines comerciales.",
          ],
        },
        {
          heading: "Conservación",
          body: [
            "Los datos se conservan el tiempo necesario para gestionar la solicitud y cumplir las obligaciones legales, tras lo cual se eliminan o anonimizan.",
          ],
        },
        {
          heading: "Derechos del interesado",
          body: [
            "Puedes ejercer los derechos de acceso, rectificación, supresión, limitación, oposición y portabilidad, y retirar el consentimiento en cualquier momento, escribiendo a " +
              P.email +
              ".",
            "También puedes presentar una reclamación ante la autoridad italiana de protección de datos (www.garanteprivacy.it).",
          ],
        },
        {
          heading: "Cambios",
          body: [
            "Esta política puede actualizarse. La versión vigente se publica siempre en esta página.",
          ],
        },
      ],
    },
    cookie: {
      title: "Política de Cookies",
      updated: UPDATED,
      intro:
        "Este sitio está diseñado para minimizar el uso de cookies y tecnologías de seguimiento.",
      sections: [
        {
          heading: "Cookies técnicas",
          body: [
            "Solo se utilizan tecnologías esenciales para el funcionamiento del sitio, p. ej. guardar localmente la elección realizada en este banner. No requieren consentimiento.",
          ],
        },
        {
          heading: "Sin perfilado",
          body: ["El sitio no utiliza cookies de perfilado ni herramientas publicitarias de terceros."],
        },
        {
          heading: "Servicios de terceros",
          body: [
            "La página de Clínicas muestra un mapa basado en OpenStreetMap: cargar el mapa envía una solicitud a los servidores de OpenStreetMap, que pueden registrar la dirección IP con fines técnicos.",
            "Los enlaces a Google Maps se abren solo tras un clic voluntario. Activar un mapa de Google integrado puede implicar cookies de Google.",
          ],
        },
        {
          heading: "Gestión de cookies",
          body: [
            "Puedes gestionar o eliminar las cookies y los datos locales desde la configuración de tu navegador.",
          ],
        },
      ],
    },
  },
};

export function getLegalDoc(locale: Locale, doc: LegalDocKey): LegalDoc {
  return legal[locale][doc];
}
