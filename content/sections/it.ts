import type { AudienceSections, Cta } from "../types";

/** Italian section pages — source: Contenuti_Sito_Giorgio_Comola_v1. */

const p = (section: string, label: string): Cta => ({
  label,
  target: { kind: "section", audience: "patients", section },
});
const c = (section: string, label: string): Cta => ({
  label,
  target: { kind: "section", audience: "colleagues", section },
});

export const patientsSectionsIt: AudienceSections = {
  about: {
    seo: {
      title: "Chi è il Dr. Giorgio Comola | Ortodontista digitale",
      description:
        "Ortodonzia digitale, allineatori trasparenti e pianificazione clinica avanzata per bambini, adolescenti e adulti.",
    },
    h1: "Giorgio Comola",
    subtitle:
      "Ortodonzia digitale, allineatori trasparenti e pianificazione clinica avanzata.",
    blocks: [
      {
        type: "statement",
        heading: "Profilo breve",
        body: "Il Dr. Giorgio Comola si occupa di ortodonzia digitale e trattamenti con allineatori trasparenti per bambini, adolescenti e adulti. La sua attività clinica è affiancata da formazione professionale per dentisti e ortodontisti.",
      },
      {
        type: "imageGallery",
        images: [
          {
            src: "/images/site/mainfoto.webp",
            alt: "Ritratto del Dr. Giorgio Comola",
            caption: "Ortodonzia digitale e comunicazione clinica.",
          },
          {
            src: "/images/site/chi-sono-1.webp",
            alt: "Il Dr. Giorgio Comola durante una relazione su ortodonzia digitale",
            caption: "Relazioni cliniche e formazione professionale.",
            wide: true,
          },
          {
            src: "/images/site/chi-sono-2.webp",
            alt: "Ritratto del Dr. Giorgio Comola durante una presentazione",
            caption: "Pianificazione, controllo e comunicazione.",
          },
          {
            src: "/images/site/chi-sono-4.webp",
            alt: "Il Dr. Giorgio Comola spiega un movimento ortodontico",
            caption: "Dal piano digitale alla scelta clinica.",
          },
          {
            src: "/images/site/faculty-meeting.webp",
            alt: "Faculty meeting su ortodonzia digitale",
            caption: "Confronto clinico e aggiornamento.",
          },
        ],
      },
      {
        type: "list",
        heading: "Curriculum in breve",
        items: [
          "Laurea presso Universidad Alfonso X el Sabio, Madrid, nel 2016.",
          "Certificazione Invisalign dal 2017.",
          "Diamond II Provider nel 2018, a 26 anni.",
          "Diamond Apex Provider dal 2021.",
          "Align Faculty Speaker dal 2021 e Align Mentor dal 2022.",
          "Co-fondatore di iDenTiCo_Med nel 2023.",
          "Smart Aligner Service Mentor per Spagna, Italia e Polonia dal 2024.",
          "Oltre 2000 pazienti trattati con sistema Invisalign.",
          "Oltre 1000 Treatment Planning Services completati.",
          "Collaborazione clinica con 18 studi nel Nord Italia.",
          "Socio SIDO.",
        ],
        columns: 3,
      },
      {
        type: "statement",
        heading: "Invisalign da sempre",
        body: "Il rapporto con Invisalign nasce molto prima della carriera clinica: nel 2000 suo padre fu tra i primi utilizzatori del sistema in Italia. Le prime scatole blu, il vecchio ClinCheck con attachment arancioni e le foto caricate con le prime connessioni ADSL trasformarono la tecnologia in una passione precoce.",
      },
      {
        type: "list",
        heading: "Approccio",
        items: [
          "Diagnosi prima della terapia.",
          "Pianificazione digitale prima dell'esecuzione.",
          "Controllo clinico prima dell'estetica fine a se stessa.",
          "Risultati leggibili, spiegati e monitorati.",
        ],
      },
    ],
    primaryCta: p("book", "Prenota una valutazione"),
    secondaryCta: p("what-i-offer", "Guarda i trattamenti"),
  },

  "what-i-offer": {
    seo: {
      title: "Trattamenti ortodontici | Dr. Giorgio Comola",
      description:
        "Allineatori trasparenti, ortodonzia digitale per adulti, adolescenti e bambini. Ogni terapia costruita sul paziente.",
    },
    h1: "Trattamenti chiari. Obiettivi misurabili.",
    subtitle:
      "Ogni terapia viene costruita sul paziente: età, crescita, occlusione, estetica e stabilità.",
    blocks: [
      {
        type: "list",
        heading: "Aree di trattamento",
        items: [
          "Allineatori trasparenti Invisalign.",
          "Ortodonzia digitale per adulti.",
          "Ortodonzia per adolescenti.",
          "Ortodonzia intercettiva nei bambini.",
          "Morso profondo, morso aperto, morso crociato e seconde classi.",
          "Casi interdisciplinari con protesi, estetica e implantologia.",
          "BITE, bruxismo e valutazione funzionale quando indicato.",
        ],
      },
      {
        type: "imageGallery",
        images: [
          {
            src: "/images/cases/affollamento/affollamento-adulto-01/after-front.JPG",
            alt: "Risultato di un caso di affollamento dopo trattamento",
            caption: "Affollamento.",
          },
          {
            src: "/images/cases/morso-aperto/aperto-adulto/after-front.JPG",
            alt: "Risultato di un caso di morso aperto dopo trattamento",
            caption: "Morso aperto.",
          },
          {
            src: "/images/cases/morso-crociato/crociato-adulto/after-front.JPG",
            alt: "Risultato di un caso di morso crociato dopo trattamento",
            caption: "Morso crociato.",
          },
        ],
      },
      {
        type: "statement",
        heading: "Metodo",
        body: "Il trattamento non viene venduto. Viene spiegato. Il paziente deve sapere cosa si può correggere, cosa si può migliorare e quali limiti biologici vanno rispettati.",
      },
    ],
    primaryCta: p("book", "Richiedi una visita"),
    secondaryCta: p("first-consultation", "Leggi la prima visita"),
  },

  "digital-orthodontics": {
    seo: {
      title: "Ortodonzia digitale | Dr. Giorgio Comola",
      description:
        "Diagnosi digitale, scansione intraorale, simulazione del movimento dentale e pianificazione precisa degli obiettivi.",
    },
    h1: "Diagnosi digitale. Pianificazione precisa.",
    subtitle: "La tecnologia è utile solo quando migliora la decisione clinica.",
    blocks: [
      {
        type: "list",
        heading: "Cosa significa",
        items: [
          "Scansione intraorale quando indicata.",
          "Analisi digitale delle arcate.",
          "Simulazione del movimento dentale.",
          "Pianificazione degli obiettivi estetici e funzionali.",
          "Monitoraggio del tracking durante la terapia.",
        ],
      },
      {
        type: "imageGallery",
        images: [
          {
            src: "/images/site/itero.webp",
            alt: "Scanner intraorale iTero per impronte digitali",
            caption: "Scansione intraorale.",
          },
          {
            src: "/images/site/pre-post.webp",
            alt: "Simulazione digitale del possibile risultato ortodontico",
            caption: "Simulazione del possibile risultato.",
            wide: true,
          },
          {
            src: "/images/site/workflow-1.webp",
            alt: "Workflow digitale per ortodonzia con allineatori",
            caption: "Dal dato digitale alla strategia clinica.",
          },
          {
            src: "/images/site/workflow-2.webp",
            alt: "Pianificazione digitale del trattamento ortodontico",
            caption: "Controllo del movimento e degli obiettivi.",
          },
        ],
      },
      {
        type: "video",
        src: "/videos/pianificazione3d.mp4",
        poster: "/images/site/workflow-3.webp",
        title: "Video di pianificazione digitale 3D",
        caption: "La pianificazione 3D aiuta a valutare sequenza dei movimenti, obiettivi e limiti prima di iniziare la terapia.",
      },
      {
        type: "statement",
        heading: "Perché conta",
        body: "Un trattamento ortodontico moderno deve essere progettato, non improvvisato. Il digitale permette di vedere prima, pianificare meglio e comunicare in modo più chiaro.",
      },
    ],
    primaryCta: p("book", "Prenota una valutazione digitale"),
    secondaryCta: p("invisalign", "Scopri Invisalign"),
  },

  invisalign: {
    seo: {
      title: "Invisalign e allineatori trasparenti | Dr. Giorgio Comola",
      description:
        "Trattamenti con allineatori trasparenti, pianificazione digitale e approccio clinico preciso per adulti, adolescenti e bambini.",
    },
    h1: "Allineatori trasparenti. Controllo clinico reale.",
    subtitle:
      "Invisalign non è una mascherina. È una terapia ortodontica che richiede diagnosi, pianificazione e controllo.",
    blocks: [
      {
        type: "list",
        heading: "Cosa puoi trattare",
        items: [
          "Affollamento dentale.",
          "Denti storti nell'adulto.",
          "Diastemi e spazi anteriori.",
          "Morso profondo o aperto.",
          "Morso crociato.",
          "Alcune seconde e terze classi, quando clinicamente indicate.",
        ],
      },
      {
        type: "imageGallery",
        images: [
          {
            src: "/images/cases/seconda-classe/seconda-adolescente/after-front.JPG",
            alt: "Caso di seconda classe dopo trattamento",
            caption: "Seconda Classe.",
          },
          {
            src: "/images/cases/terza-classe/terza-adulto/after-front.JPG",
            alt: "Caso di terza classe dopo trattamento",
            caption: "Terza Classe.",
          },
          {
            src: "/images/cases/pre-protesico/protesico-adulto/after-smile.jpg",
            alt: "Sorriso dopo trattamento pre-protesico",
            caption: "Pre-protesico.",
          },
        ],
      },
      {
        type: "statement",
        heading: "La differenza",
        body: "La qualità non dipende solo dal software. Dipende da chi pianifica il movimento, da come viene controllato il caso e dalla collaborazione del paziente.",
      },
    ],
    primaryCta: p("book", "Valuta se Invisalign è indicato per te"),
    secondaryCta: p("clinical-cases", "Vedi casi clinici"),
  },

  "invisalign-game": {
    seo: {
      title: "Gioco Allineatori | Dr. Giorgio Comola",
      description:
        "Un mini gioco browser sugli allineatori trasparenti, pensato per sala d'attesa e pazienti curiosi.",
    },
    h1: "Gioca con gli allineatori.",
    subtitle:
      "Un'esperienza leggera per scoprire buone abitudini e piccoli imprevisti del trattamento con allineatori.",
    blocks: [
      {
        type: "game",
        heading: "Gioco Allineatori",
        src: "/invisalign-video-game/",
        title: "Gioco Allineatori",
        directLinkLabel: "Apri a schermo intero",
      },
    ],
    primaryCta: p("clinics", "Prenota una valutazione"),
    secondaryCta: p("invisalign", "Scopri Invisalign"),
  },

  "first-consultation": {
    seo: {
      title: "Prima visita ortodontica digitale | Dr. Giorgio Comola",
      description:
        "Valutazione ortodontica, scansione digitale e piano di trattamento personalizzato con tempistiche e opzioni chiare.",
    },
    h1: "Prima visita ortodontica. Chiara, completa, utile.",
    subtitle:
      "Una visita deve darti risposte: diagnosi, opzioni, tempi, limiti e costi indicativi.",
    blocks: [
      {
        type: "list",
        heading: "Cosa succede",
        items: [
          "Valutazione clinica del sorriso e dell'occlusione.",
          "Analisi di crescita nei pazienti giovani.",
          "Eventuale scansione digitale.",
          "Simulazione pre e post quando clinicamente utile, per visualizzare il possibile obiettivo del trattamento.",
          "Discussione delle opzioni terapeutiche.",
          "Indicazione di tempistiche e priorità.",
          "Richiesta di esami radiografici quando necessari.",
        ],
      },
      {
        type: "statement",
        heading: "Simulazione pre e post",
        body: "La simulazione digitale non è una promessa di risultato, ma uno strumento di comunicazione: aiuta a capire la direzione del trattamento, confrontare le opzioni e rendere più chiari limiti, tempi e obiettivi realistici.",
      },
      {
        type: "imageGallery",
        images: [
          {
            src: "/images/site/pre-post.webp",
            alt: "Simulazione digitale prima e dopo trattamento",
            caption: "Simulazione pre e post del possibile obiettivo.",
            wide: true,
          },
          {
            src: "/images/site/percorso-prima-visita.webp",
            alt: "Percorso della prima visita ortodontica digitale",
            caption: "Un percorso guidato dalla diagnosi.",
            wide: true,
          },
        ],
      },
      {
        type: "statement",
        heading: "Cosa ottieni",
        body: "Un quadro chiaro. Non una promessa generica. Il paziente deve uscire sapendo cosa ha, cosa può fare e perché.",
      },
    ],
    primaryCta: p("book", "Prenota la prima visita"),
    secondaryCta: p("faq", "Consulta le FAQ"),
  },

  "clinical-cases": {
    seo: {
      title: "Casi clinici ortodontici | Dr. Giorgio Comola",
      description:
        "Esempi clinici selezionati per mostrare diagnosi, obiettivo e risultato. Ogni caso richiede una diagnosi individuale.",
    },
    h1: "Casi reali. Risultati leggibili.",
    subtitle:
      "Esempi clinici selezionati per mostrare diagnosi, obiettivo e risultato.",
    blocks: [
      {
        type: "list",
        heading: "Come saranno presentati",
        items: [
          "Prima e dopo.",
          "Problema iniziale.",
          "Terapia utilizzata.",
          "Durata indicativa.",
          "Dettagli clinici essenziali.",
        ],
      },
      {
        type: "cases",
        heading: "Categorie",
        categories: [
          "Affollamento",
          "Morso aperto",
          "Morso coperto",
          "Seconda Classe",
          "Terza Classe",
          "Pre-Protesico",
          "Parodontale",
          "Estetico",
          "Agenesie",
          "Casi complessi",
          "Morso crociato",
        ],
        disclaimer:
          "Ogni caso è diverso e richiede una diagnosi individuale. Le immagini non costituiscono promessa di risultato.",
      },
    ],
    primaryCta: p("book", "Prenota una valutazione"),
    secondaryCta: p("invisalign", "Scopri Invisalign"),
  },

  clinics: {
    seo: {
      title: "Studi e sedi | Dr. Giorgio Comola",
      description:
        "Il Dr. Comola collabora con studi selezionati in diverse città. Prenota nella sede più comoda.",
    },
    h1: "Prenota nella sede più comoda.",
    subtitle: "Il Dr. Comola collabora con studi selezionati in diverse città.",
    blocks: [
      {
        type: "clinics",
        heading: "Come scegliere",
        steps: [
          "Seleziona la città più comoda.",
          "Invia una richiesta di visita.",
          "La segreteria dello studio ti ricontatterà.",
          "Porta eventuali radiografie o documentazione già disponibile.",
        ],
        note: "Le disponibilità variano in base alla sede. La prenotazione viene confermata direttamente dallo studio selezionato.",
      },
    ],
    primaryCta: p("book", "Trova lo studio più vicino"),
    secondaryCta: p("book", "Richiedi contatto"),
  },

  faq: {
    seo: {
      title: "Domande frequenti sull'ortodonzia | Dr. Giorgio Comola",
      description:
        "Le risposte essenziali prima di iniziare un trattamento ortodontico con allineatori trasparenti.",
    },
    h1: "Domande frequenti. Risposte dirette.",
    subtitle:
      "Le risposte essenziali prima di iniziare un trattamento ortodontico.",
    blocks: [
      {
        type: "faq",
        items: [
          {
            question: "Invisalign fa male?",
            answer:
              "Una leggera pressione nei primi giorni con ogni nuova mascherina è normale: è il segno che i denti si stanno muovendo e di solito si attenua in poche ore o giorni. Un dolore intenso o persistente, invece, va sempre segnalato e valutato.",
          },
          {
            question: "Quanto dura il trattamento?",
            answer:
              "Dipende dalla complessità del caso: alcuni trattamenti durano pochi mesi, altri più articolati possono superare i 24 mesi. In prima visita ricevi una stima realistica dei tempi sul tuo caso.",
          },
          {
            question: "Gli allineatori si vedono?",
            answer:
              "Sono molto discreti e nella maggior parte delle situazioni quotidiane passano inosservati, ma non sono completamente invisibili in ogni condizione di luce o a distanza ravvicinata.",
          },
          {
            question: "Posso mangiare con le mascherine?",
            answer:
              "No: vanno rimosse per mangiare e per bere bevande diverse dall'acqua, e questo aiuta anche a tenerle pulite. Per essere efficaci vanno indossate circa 22 ore al giorno.",
          },
          {
            question: "Funziona per tutti?",
            answer:
              "No. Gli allineatori risolvono molte situazioni, ma non tutte: serve una diagnosi per capire se sono la scelta giusta per te o se è preferibile un altro approccio.",
          },
          {
            question: "Quanto costa?",
            answer:
              "Dipende dalla complessità del caso e dal tipo di terapia. Durante la prima visita vengono spiegate le opzioni e viene data un'indicazione chiara dei costi, senza sorprese.",
          },
        ],
      },
    ],
    primaryCta: p("book", "Prenota una visita"),
    secondaryCta: p("invisalign", "Leggi Invisalign"),
  },

  book: {
    seo: {
      title: "Prenota una valutazione ortodontica | Dr. Giorgio Comola",
      description:
        "Racconta cosa vuoi migliorare. Ti indirizzeremo verso la sede più adatta per la tua prima visita.",
    },
    h1: "Prenota una valutazione ortodontica.",
    subtitle:
      "Racconta cosa vuoi migliorare. Ti indirizzeremo verso la sede più adatta.",
    blocks: [
      {
        type: "form",
        microcopy:
          "Compila il form. Verrai ricontattato dalla segreteria per definire sede, disponibilità e documentazione utile.",
        submitLabel: "Invia richiesta di visita",
        fields: [
          { name: "name", label: "Nome e cognome", required: true },
          { name: "phone", label: "Telefono", type: "tel", required: true },
          { name: "email", label: "Email", type: "email", required: true },
          { name: "city", label: "Città preferita" },
          { name: "age", label: "Età del paziente" },
          {
            name: "scans",
            label: "Hai già radiografie o scansioni?",
            type: "select",
            options: ["Sì", "No"],
          },
          {
            name: "reason",
            label: "Motivo della richiesta",
            type: "textarea",
            required: true,
          },
        ],
      },
    ],
    primaryCta: p("faq", "Consulta le FAQ"),
    secondaryCta: p("what-i-offer", "Torna ai trattamenti"),
  },
};

export const colleaguesSectionsIt: AudienceSections = {
  about: {
    seo: {
      title: "Chi è il Dr. Giorgio Comola | Formazione e mentorship",
      description:
        "Un profilo nato dalla pratica clinica quotidiana e dalla formazione professionale internazionale sugli allineatori.",
    },
    h1: "Clinica, digitale, formazione.",
    subtitle:
      "Un profilo nato dalla pratica clinica quotidiana e dalla formazione professionale internazionale.",
    blocks: [
      {
        type: "statement",
        heading: "Bio professionale",
        body: "Il Dr. Giorgio Comola lavora con allineatori trasparenti, workflow digitale e pianificazione clinica avanzata. La sua attività nasce dall'incontro tra clinica, tecnologia e comunicazione, con un focus costante su ottimizzazione dei risultati e riduzione del tempo alla poltrona.",
      },
      {
        type: "imageGallery",
        images: [
          {
            src: "/images/site/emea-ortho-summit-2026.webp",
            alt: "Il Dr. Giorgio Comola sul palco dell'EMEA Ortho Summit 2026",
            caption: "EMEA Ortho Summit 2026.",
            wide: true,
          },
          {
            src: "/images/site/chi-sono-1.webp",
            alt: "Il Dr. Giorgio Comola durante una relazione clinica",
            caption: "Formazione internazionale.",
          },
          {
            src: "/images/site/chi-sono-4.webp",
            alt: "Spiegazione clinica durante una presentazione",
            caption: "Metodo e biomeccanica.",
          },
          {
            src: "/images/site/faculty-meeting.webp",
            alt: "Faculty meeting clinico",
            caption: "Faculty meeting e confronto tra colleghi.",
          },
        ],
      },
      {
        type: "video",
        src: "/videos/speaking-1.mp4",
        poster: "/images/site/chi-sono-1.webp",
        title: "Video di relazione clinica",
        caption: "La formazione nasce dalla pratica clinica: casi reali, sequenze decisionali e controllo del trattamento.",
      },
      {
        type: "list",
        heading: "Tappe professionali",
        items: [
          "2016: laurea presso Universidad Alfonso X el Sabio, Madrid.",
          "2017: certificazione Invisalign.",
          "2018: Diamond II Provider a 26 anni.",
          "2021: Diamond Apex Provider.",
          "2021: riconoscimento come Align Faculty Speaker.",
          "2022: Align Mentor.",
          "2023: co-fondatore di iDenTiCo_Med.",
          "2024: Smart Aligner Service Mentor per Spagna, Italia e Polonia.",
        ],
        columns: 2,
      },
      {
        type: "list",
        heading: "Esperienza",
        items: [
          "Oltre 2000 pazienti trattati con sistema Invisalign.",
          "Oltre 1000 Treatment Planning Services completati.",
          "Collaborazione con 18 studi nel Nord Italia.",
          "Socio SIDO.",
          "Percorso personale con Invisalign iniziato fin dall'infanzia, grazie all'esperienza pionieristica del padre con il sistema in Italia.",
          "Interesse trasversale per tecnologia, comunicazione, programmazione e pianificazione clinica.",
        ],
        columns: 2,
      },
      {
        type: "list",
        heading: "Focus didattico",
        items: [
          "Diagnosi e setup del caso.",
          "Biomeccanica con allineatori.",
          "ClinCheck review.",
          "Casi complessi.",
          "Workflow digitale interdisciplinare.",
          "Comunicazione clinica con il paziente.",
        ],
      },
    ],
    primaryCta: c("consulting", "Richiedi informazioni"),
    secondaryCta: c("education", "Vai alla formazione"),
  },

  education: {
    seo: {
      title: "Formazione Invisalign e ortodonzia digitale | Giorgio Comola",
      description:
        "Corsi, mentorship e formazione clinica avanzata per dentisti e ortodontisti che lavorano con allineatori trasparenti.",
    },
    h1: "Metodo, non motivazione.",
    subtitle:
      "Formazione concreta per portare più controllo nei trattamenti con allineatori.",
    blocks: [
      {
        type: "list",
        heading: "Servizi",
        items: [
          "Corsi privati individuali o per team.",
          "Mentorship clinica continuativa.",
          "Supporto alla pianificazione ClinCheck.",
          "Discussione casi complessi.",
          "Percorsi in collaborazione con SAS.",
          "P2P Align quando disponibile e pertinente.",
        ],
      },
      {
        type: "statement",
        heading: "Obiettivo",
        body: "Ridurre l'improvvisazione. Aumentare la capacità di diagnosi, prescrizione, staging e controllo clinico.",
      },
      {
        type: "imageGallery",
        images: [
          {
            src: "/images/site/studio-riempimento-1.webp",
            alt: "Momento di formazione clinica",
            caption: "Formazione clinica in presenza.",
          },
          {
            src: "/images/site/studio-riempimento-2.webp",
            alt: "Discussione di workflow digitale",
            caption: "Discussione del workflow.",
          },
          {
            src: "/images/site/studio-riempimento-3.webp",
            alt: "Sessione di aggiornamento su allineatori",
            caption: "Aggiornamento sugli allineatori.",
          },
          {
            src: "/images/site/studio-riempimento-4.webp",
            alt: "Confronto tra colleghi",
            caption: "Confronto tra colleghi.",
          },
        ],
      },
    ],
    primaryCta: c("consulting", "Parliamo del tuo percorso"),
    secondaryCta: c("private-courses", "Scopri corsi privati"),
  },

  "private-courses": {
    seo: {
      title: "Corsi privati Invisalign | Dr. Giorgio Comola",
      description:
        "Formazione individuale o per team clinici, costruita sui casi reali dello studio. Da 'uso il software' a 'controllo il trattamento'.",
    },
    h1: "Corsi privati. Su misura. Senza contenuti inutili.",
    subtitle:
      "Formazione individuale o per team clinici, costruita sui casi reali dello studio.",
    blocks: [
      {
        type: "list",
        heading: "Formato",
        items: [
          "One-to-one online.",
          "Sessioni in studio.",
          "Percorsi per team.",
          "Revisione casi reali.",
          "Training su ClinCheck e workflow digitale.",
        ],
      },
      {
        type: "statement",
        heading: "A chi serve",
        body: "A chi vuole passare da \"uso il software\" a \"controllo il trattamento\".",
      },
      {
        type: "video",
        src: "/videos/sas-meeting-milan.mp4",
        poster: "/images/site/faculty-meeting.webp",
        title: "Video SAS meeting Milano",
        caption: "Sessioni pensate per trasformare il software in una scelta clinica controllata.",
      },
    ],
    primaryCta: c("consulting", "Richiedi un corso privato"),
    secondaryCta: c("consulting", "Invia un caso da discutere"),
  },

  "sas-courses": {
    seo: {
      title: "Corsi in collaborazione con SAS | Dr. Giorgio Comola",
      description:
        "Percorsi formativi strutturati per colleghi che vogliono alzare il livello clinico con gli allineatori trasparenti.",
    },
    h1: "Corsi in collaborazione con SAS.",
    subtitle:
      "Percorsi formativi strutturati per colleghi che vogliono alzare il livello clinico con gli allineatori.",
    blocks: [
      {
        type: "list",
        heading: "Contenuti possibili",
        items: [
          "Diagnosi digitale.",
          "Seconde classi.",
          "Morso profondo.",
          "Casi estrattivi.",
          "Gestione del tracking.",
          "Workflow interdisciplinare.",
          "Errori comuni e correzioni pratiche.",
        ],
      },
      {
        type: "statement",
        heading: "Approccio",
        body: "Non teoria scollegata dalla clinica. Ogni concetto deve tradursi in una scelta concreta nel piano di trattamento.",
      },
      {
        type: "video",
        src: "/videos/dubai-top300.mp4",
        poster: "/images/site/emea-ortho-summit-2026.webp",
        title: "Video evento internazionale",
        caption: "Formazione e confronto internazionale sugli allineatori e sui workflow digitali.",
      },
    ],
    primaryCta: c("consulting", "Richiedi informazioni sui corsi SAS"),
    secondaryCta: c("consulting", "Scopri la mentorship"),
  },

  "align-p2p": {
    seo: {
      title: "P2P Align — confronto clinico tra colleghi | Giorgio Comola",
      description:
        "Uno spazio per analizzare casi, dubbi e strategie di trattamento con allineatori trasparenti.",
    },
    h1: "P2P Align. Confronto clinico tra colleghi.",
    subtitle:
      "Uno spazio per analizzare casi, dubbi e strategie di trattamento con allineatori.",
    blocks: [
      {
        type: "list",
        heading: "Temi",
        items: [
          "Lettura del caso.",
          "Obiettivi realistici.",
          "Prescrizione.",
          "Staging.",
          "Attachments e ausiliari.",
          "Elastici e controllo biomeccanico.",
          "Refinement e gestione degli imprevisti.",
        ],
      },
      {
        type: "statement",
        heading: "Valore",
        body: "Il confronto migliore non conferma quello che hai già deciso. Ti fa vedere quello che stavi sottovalutando.",
      },
    ],
    primaryCta: c("consulting", "Richiedi informazioni P2P"),
    secondaryCta: c("consulting", "Vai alla consulenza"),
  },

  "clinical-cases": {
    seo: {
      title: "Casi clinici e filosofia di trattamento | Giorgio Comola",
      description:
        "Ogni caso viene letto per diagnosi, obiettivo, limiti e strategia biomeccanica. Non solo immagini: decisioni.",
    },
    h1: "Casi clinici. Decisioni, non solo immagini.",
    subtitle:
      "Ogni caso viene letto per diagnosi, obiettivo, limiti e strategia biomeccanica.",
    blocks: [
      {
        type: "cases",
        heading: "Categorie",
        categories: [
          "Affollamento",
          "Morso aperto",
          "Morso coperto",
          "Seconda Classe",
          "Terza Classe",
          "Pre-Protesico",
          "Parodontale",
          "Estetico",
          "Agenesie",
          "Casi complessi",
          "Morso crociato",
        ],
      },
      {
        type: "statement",
        heading: "Filosofia",
        body: "Il valore di un caso non è il prima/dopo. È capire perché è stato pianificato in quel modo.",
      },
    ],
    primaryCta: c("consulting", "Richiedi discussione caso"),
    secondaryCta: c("education", "Vai alla formazione"),
  },

  consulting: {
    seo: {
      title: "Consulenza ClinCheck e mentorship Invisalign | Giorgio Comola",
      description:
        "Supporto alla pianificazione dei casi, ClinCheck e workflow digitale per aumentare prevedibilità e controllo clinico.",
    },
    h1: "Consulenza ClinCheck e mentorship.",
    subtitle:
      "Supporto concreto per migliorare diagnosi, setup e controllo dei casi con allineatori.",
    blocks: [
      {
        type: "list",
        heading: "Cosa puoi richiedere",
        items: [
          "Revisione ClinCheck.",
          "Discussione del piano di trattamento.",
          "Strategia di staging.",
          "Biomeccanica e ausiliari.",
          "Valutazione dei limiti del caso.",
          "Indicazioni per comunicare il piano al paziente.",
        ],
      },
      {
        type: "form",
        microcopy:
          "Invia le informazioni essenziali del caso. L'obiettivo è arrivare a una strategia chiara, non a una lista infinita di modifiche.",
        submitLabel: "Richiedi consulenza",
        fields: [
          { name: "name", label: "Nome e cognome", required: true },
          { name: "email", label: "Email", type: "email", required: true },
          { name: "phone", label: "Telefono (opzionale)", type: "tel" },
          { name: "studio", label: "Studio / città" },
          {
            name: "requestType",
            label: "Tipo di richiesta",
            type: "select",
            required: true,
            options: [
              "Corso privato",
              "Mentorship",
              "P2P Align",
              "Consulenza ClinCheck",
              "Corsi SAS",
            ],
          },
          {
            name: "message",
            label: "Messaggio",
            type: "textarea",
            required: true,
          },
        ],
      },
    ],
    primaryCta: c("education", "Scopri la formazione"),
    secondaryCta: c("align-p2p", "Vai a P2P Align"),
  },
};
