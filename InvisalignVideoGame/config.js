const GAME_CONFIG = {
  lives: 3,
  baseScore: 120,
  studio: {
    author: "Dr. Giorgio Comola",
    bookingLabel: "Prenota una valutazione",
    bookingUrl: "/it/pazienti/studi",
    shareTitle: "Aligner Breaker",
    qrLabel: "Codice sala d'attesa"
  },
  challenge: {
    name: "Challenge 22h",
    description: "Completa la partita senza prendere minus e senza perdere vite."
  },
  microcopy: [
    "La mascherina nel tovagliolo non cura.",
    "Gli elastici non sono decorativi.",
    "22h attivate. Il ClinCheck ringrazia.",
    "No tracking detected.",
    "Il tuo ortodontista approva.",
    "Conserva sempre le mascherine precedenti: sono il tuo piano B.",
    "Quando mangi, metti gli aligner nella scatolina, non nel tovagliolo.",
    "Se qualcosa non calza, segnalo subito: il tracking si recupera prima.",
    "La scatolina e parte della terapia.",
    "Acqua fredda, niente bevande calde con gli aligner."
  ],
  tips: [
    "Non buttare mai via le mascherine precedenti: possono servire in caso di perdita o no tracking.",
    "Mai avvolgere gli aligner nel tovagliolo: e il modo piu veloce per perderli.",
    "Gli elastici lavorano solo quando sono in bocca.",
    "Se la mascherina non calza, non forzare: contatta lo studio.",
    "22 ore al giorno non e uno slogan: e la differenza tra tracking e refinements.",
    "La scatolina e parte della terapia.",
    "Lava gli aligner con acqua fredda per evitare deformazioni.",
    "Non bere bevande calde con gli aligner: possono deformarsi.",
    "Attachments e IPR non sono dettagli: aiutano il movimento programmato.",
    "Se salti troppi giorni, il gioco accelera. Anche il trattamento si complica."
  ],
  levels: [
    {
      name: "Affollamento",
      message: "Libera spazio e allinea il sorriso.",
      coach: "Tanti piccoli spostamenti richiedono precisione: resta costante e crea spazio.",
      pattern: "crowding",
      rows: 5,
      speed: 1,
      dropRate: 0.2,
      effectBias: { attachments: 3, perfectWear: 2, elastics: 1, lowWear: 1, lostAligner: 1, forgotElastics: 1, noTracking: 1 }
    },
    {
      name: "Morso Aperto",
      message: "Chiudi il gap e migliora il contatto.",
      coach: "Il gap centrale va chiuso con controllo verticale: punta ai gruppi superiore e inferiore.",
      pattern: "openBite",
      rows: 6,
      speed: 1.04,
      dropRate: 0.22,
      effectBias: { attachments: 2, perfectWear: 2, elastics: 2, lowWear: 1, lostAligner: 1, forgotElastics: 1, noTracking: 1 }
    },
    {
      name: "Morso Coperto",
      message: "Libera il morso e recupera spazio verticale.",
      coach: "Alcuni elementi resistono di piu: come nella terapia, serve continuita e controllo.",
      pattern: "deepBite",
      rows: 5,
      speed: 1.08,
      dropRate: 0.22,
      effectBias: { attachments: 3, perfectWear: 2, elastics: 1, lowWear: 1, lostAligner: 1, forgotElastics: 1, noTracking: 2 }
    },
    {
      name: "Seconda Classe",
      message: "Gli elastici fanno la differenza.",
      coach: "Qui gli elastici sono quasi indispensabili: quando cadono, prenderli cambia davvero la partita.",
      pattern: "classTwo",
      rows: 5,
      speed: 1.12,
      dropRate: 0.27,
      effectBias: { attachments: 1, perfectWear: 2, elastics: 5, lowWear: 1, lostAligner: 1, forgotElastics: 3, noTracking: 1 }
    },
    {
      name: "Terza Classe",
      message: "Ritrova equilibrio e controllo.",
      coach: "Serve equilibrio tra arcate: elastici e tracking guidano la correzione.",
      pattern: "classThree",
      rows: 5,
      speed: 1.16,
      dropRate: 0.28,
      effectBias: { attachments: 1, perfectWear: 2, elastics: 5, lowWear: 1, lostAligner: 1, forgotElastics: 3, noTracking: 2 }
    }
  ],
  effects: [
    {
      id: "attachments",
      label: "Attachments",
      kind: "up",
      icon: "attachment",
      color: "#70ffd6",
      duration: 8000,
      message: "Attachments attivi: piu controllo!",
      tip: "Gli attachments aiutano l'aligner ad agganciare meglio il dente e rendono il movimento piu preciso."
    },
    {
      id: "perfectWear",
      label: "Uso perfetto 22h",
      kind: "up",
      icon: "case",
      color: "#8be8ff",
      duration: 8500,
      message: "22 ore al giorno: trattamento sotto controllo.",
      tip: "Indossare gli aligner abbastanza ore mantiene una forza costante e riduce il rischio di perdere tracking."
    },
    {
      id: "elastics",
      label: "Uso elastici",
      kind: "up",
      icon: "elastic",
      color: "#ffffff",
      duration: 6500,
      message: "Elastici inseriti: correzione potenziata.",
      tip: "Gli elastici aggiungono una direzione di forza: nel gioco sbloccano piu palline, nella cura aiutano la correzione."
    },
    {
      id: "lowWear",
      label: "Uso poche ore",
      kind: "down",
      icon: "clock",
      color: "#ffb36b",
      duration: 7500,
      message: "Poche ore di utilizzo: meno controllo.",
      tip: "Se porti poco le mascherine, i denti ricevono una forza intermittente e l'aligner puo non calzare bene."
    },
    {
      id: "lostAligner",
      label: "Mascherina persa",
      kind: "down",
      icon: "brokenAligner",
      color: "#ff8f9d",
      duration: 6000,
      message: "Mascherina persa: il trattamento si complica.",
      tip: "Una mascherina persa interrompe la sequenza: conserva le precedenti e contatta lo studio prima possibile."
    },
    {
      id: "forgotElastics",
      label: "Elastici dimenticati",
      kind: "down",
      icon: "emptyElastics",
      color: "#ff8f9d",
      duration: 0,
      message: "Elastici dimenticati: la correzione rallenta.",
      tip: "Senza elastici la correzione sagittale rallenta: alcuni movimenti diventano piu difficili da completare."
    },
    {
      id: "noTracking",
      label: "No tracking",
      kind: "down",
      icon: "warning",
      color: "#b5c7ff",
      duration: 7000,
      message: "No tracking: serve rimettersi in carreggiata.",
      tip: "No tracking significa che aligner e denti non sono sincronizzati: meglio correggere presto che forzare."
    }
  ]
};
