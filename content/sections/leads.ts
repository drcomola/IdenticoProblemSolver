import type { Audience, Locale } from "@/lib/i18n";
import type { SectionKey } from "@/lib/routes";

/**
 * Intro paragraphs ("lead") for each section page — a bit more specific than the
 * one-line subtitle, while staying within the editorial rules: descriptive,
 * assertive, no absolute medical promises. Merged onto SectionContent in
 * content/index.ts so the section files stay focused on blocks.
 */
type LeadMap = Record<Audience, Partial<Record<SectionKey, string>>>;

const it: LeadMap = {
  patients: {
    about:
      "Un percorso clinico costruito intorno a tre principi: capire il problema prima di proporre una soluzione, pianificare ogni movimento al computer prima di portarlo in bocca, e spiegare al paziente cosa aspettarsi in modo concreto. L'attività clinica è affiancata dalla formazione di altri professionisti.",
    "what-i-offer":
      "Non esiste un trattamento uguale per tutti. La scelta tra allineatori, ortodonzia intercettiva o approcci interdisciplinari nasce dalla diagnosi: età, crescita, occlusione e obiettivi del paziente. Qui trovi le aree di cui mi occupo e il metodo con cui ogni terapia viene impostata.",
    "digital-orthodontics":
      "Scansione intraorale, analisi delle arcate e simulazione del movimento dentale non sono un effetto speciale: servono a decidere meglio e a mostrarti, prima di iniziare, dove vogliamo arrivare e perché. Il digitale è uno strumento al servizio della clinica, non il contrario.",
    invisalign:
      "Gli allineatori trasparenti permettono di trattare molte malocclusioni in modo discreto, ma il risultato non dipende dalla mascherina: dipende da come viene pianificato il movimento, da come il caso viene controllato nel tempo e dalla collaborazione del paziente. Qui trovi cosa si può trattare e cosa fa davvero la differenza.",
    "first-consultation":
      "La prima visita serve a darti un quadro chiaro: cosa hai, quali sono le opzioni, i tempi, i limiti biologici e i costi indicativi. Esci dalla visita sapendo cosa è possibile e perché, senza promesse generiche.",
    "clinical-cases":
      "I casi clinici verranno mostrati per spiegare il ragionamento: problema iniziale, obiettivo, terapia e risultato. Ogni esempio serve a far capire come si arriva a una decisione, non a promettere lo stesso esito a chiunque.",
    clinics:
      "Il Dr. Comola collabora con studi selezionati in diverse città italiane. Scegli la sede più comoda: trovi indirizzo, contatti e mappa di ciascuno studio, e la prenotazione viene gestita direttamente dalla segreteria della sede scelta.",
    faq: "Le domande più frequenti prima di iniziare un trattamento ortodontico, con risposte brevi e dirette. Per i dubbi specifici sul tuo caso, la risposta corretta arriva solo da una visita.",
    book: "Raccontaci cosa vuoi migliorare e indica la sede più comoda: ti ricontatterà la segreteria dello studio per definire appuntamento, disponibilità e documentazione utile. Puoi anche scrivere o telefonare direttamente alla sede.",
  },
  colleagues: {
    about:
      "Un profilo nato dalla pratica clinica quotidiana con gli allineatori e dalla formazione professionale internazionale. L'obiettivo della parte didattica è semplice: trasferire metodo, non slide, su diagnosi, biomeccanica e gestione reale dei casi.",
    education:
      "La formazione è concreta e centrata sul caso: l'obiettivo è ridurre l'improvvisazione e aumentare la capacità di diagnosi, prescrizione, staging e controllo clinico. Dai corsi privati alla mentorship continuativa, ogni percorso parte dai problemi reali dello studio.",
    "private-courses":
      "Formazione individuale o per team clinici, costruita sui casi reali dello studio e sulle difficoltà che incontri davvero. Il passaggio chiave è uno: da \"uso il software\" a \"controllo il trattamento\".",
    "sas-courses":
      "Percorsi strutturati in collaborazione con SAS per chi vuole alzare il livello clinico con gli allineatori. Ogni concetto — dalle seconde classi ai casi estrattivi — deve tradursi in una scelta concreta nel piano di trattamento.",
    "align-p2p":
      "Uno spazio di confronto clinico tra colleghi per analizzare casi, dubbi e strategie di trattamento. Il valore non è la conferma di quello che hai già deciso, ma vedere ciò che stavi sottovalutando.",
    "clinical-cases":
      "Ogni caso viene letto per diagnosi, obiettivo, limiti e strategia biomeccanica. La filosofia è chiara: il valore di un caso non è il prima/dopo, ma capire perché è stato pianificato in quel modo.",
    consulting:
      "Supporto concreto sulla pianificazione: revisione ClinCheck, strategia di staging, biomeccanica e valutazione dei limiti del caso. L'obiettivo è arrivare a una strategia chiara, non a una lista infinita di modifiche.",
  },
};

const en: LeadMap = {
  patients: {
    about:
      "A clinical path built around three principles: understand the problem before proposing a solution, plan every movement digitally before bringing it into the mouth, and explain to the patient what to expect in concrete terms. Clinical practice goes hand in hand with educating other professionals.",
    "what-i-offer":
      "There is no one-size-fits-all treatment. The choice between aligners, interceptive orthodontics or interdisciplinary approaches comes from the diagnosis: age, growth, occlusion and the patient's goals. Here are the areas I work in and the method behind every treatment.",
    "digital-orthodontics":
      "Intraoral scanning, arch analysis and tooth-movement simulation are not a special effect: they help us decide better and show you, before we start, where we want to get to and why. Digital tools serve the clinic, not the other way around.",
    invisalign:
      "Clear aligners can treat many malocclusions discreetly, but the result does not depend on the tray: it depends on how the movement is planned, how the case is monitored over time and how well the patient cooperates. Here is what can be treated and what really makes the difference.",
    "first-consultation":
      "The first consultation gives you a clear picture: what you have, the options, the timing, the biological limits and indicative costs. You leave knowing what is possible and why — no generic promises.",
    "clinical-cases":
      "Clinical cases will be shown to explain the reasoning: initial problem, objective, treatment and outcome. Each example is there to show how a decision is reached, not to promise the same result to everyone.",
    clinics:
      "Dr. Comola collaborates with selected clinics in several Italian cities. Choose the most convenient location: you will find the address, contacts and map for each clinic, and the appointment is handled directly by the chosen clinic's front desk.",
    faq: "The most frequent questions before starting orthodontic treatment, with short, direct answers. For doubts specific to your case, the correct answer can only come from a consultation.",
    book: "Tell us what you want to improve and pick the most convenient location: the clinic's front desk will contact you to arrange the appointment, availability and useful documentation. You can also write or call the clinic directly.",
  },
  colleagues: {
    about:
      "A profile built on daily clinical practice with aligners and on international professional education. The teaching goal is simple: transfer method, not slides — on diagnosis, biomechanics and real case management.",
    education:
      "Education is concrete and case-driven: the aim is to reduce improvisation and increase diagnostic, prescription, staging and clinical-control skills. From private courses to ongoing mentorship, every path starts from the practice's real problems.",
    "private-courses":
      "Individual or team education built around the practice's real cases and the difficulties you actually face. The key shift is one: from \"I use the software\" to \"I control the treatment\".",
    "sas-courses":
      "Structured programs in collaboration with SAS for those who want to raise their clinical level with aligners. Every concept — from Class II to extraction cases — must translate into a concrete treatment-planning decision.",
    "align-p2p":
      "A space for clinical exchange between colleagues to analyze cases, doubts and treatment strategies. The value is not confirming what you already decided, but seeing what you were underestimating.",
    "clinical-cases":
      "Each case is read through diagnosis, objective, limits and biomechanical strategy. The philosophy is clear: the value of a case is not the before/after, but understanding why it was planned that way.",
    consulting:
      "Concrete planning support: ClinCheck review, staging strategy, biomechanics and evaluation of case limits. The goal is a clear strategy, not an endless list of modifications.",
  },
};

const es: LeadMap = {
  patients: {
    about:
      "Un recorrido clínico construido sobre tres principios: entender el problema antes de proponer una solución, planificar cada movimiento de forma digital antes de llevarlo a la boca, y explicar al paciente qué esperar de forma concreta. La actividad clínica se acompaña de la formación de otros profesionales.",
    "what-i-offer":
      "No existe un tratamiento igual para todos. La elección entre alineadores, ortodoncia interceptiva o enfoques interdisciplinarios nace del diagnóstico: edad, crecimiento, oclusión y objetivos del paciente. Aquí encontrarás las áreas de las que me ocupo y el método con el que se plantea cada tratamiento.",
    "digital-orthodontics":
      "El escaneo intraoral, el análisis de las arcadas y la simulación del movimiento dental no son un efecto especial: sirven para decidir mejor y mostrarte, antes de empezar, a dónde queremos llegar y por qué. Lo digital está al servicio de la clínica, no al revés.",
    invisalign:
      "Los alineadores transparentes permiten tratar muchas maloclusiones de forma discreta, pero el resultado no depende de la férula: depende de cómo se planifica el movimiento, de cómo se controla el caso en el tiempo y de la colaboración del paciente. Aquí encontrarás qué se puede tratar y qué marca la diferencia.",
    "first-consultation":
      "La primera visita te da una visión clara: qué tienes, las opciones, los tiempos, los límites biológicos y los costes orientativos. Sales sabiendo qué es posible y por qué, sin promesas genéricas.",
    "clinical-cases":
      "Los casos clínicos se mostrarán para explicar el razonamiento: problema inicial, objetivo, tratamiento y resultado. Cada ejemplo sirve para mostrar cómo se llega a una decisión, no para prometer el mismo resultado a todos.",
    clinics:
      "El Dr. Comola colabora con clínicas seleccionadas en varias ciudades italianas. Elige la sede más cómoda: encontrarás la dirección, los contactos y el mapa de cada clínica, y la cita la gestiona directamente la secretaría de la sede elegida.",
    faq: "Las preguntas más frecuentes antes de empezar un tratamiento ortodóncico, con respuestas breves y directas. Para las dudas específicas de tu caso, la respuesta correcta solo llega con una visita.",
    book: "Cuéntanos qué quieres mejorar e indica la sede más cómoda: la secretaría de la clínica te contactará para concretar cita, disponibilidad y documentación útil. También puedes escribir o llamar directamente a la sede.",
  },
  colleagues: {
    about:
      "Un perfil nacido de la práctica clínica diaria con alineadores y de la formación profesional internacional. El objetivo docente es simple: transmitir método, no diapositivas, sobre diagnóstico, biomecánica y gestión real de los casos.",
    education:
      "La formación es concreta y centrada en el caso: el objetivo es reducir la improvisación y aumentar la capacidad de diagnóstico, prescripción, staging y control clínico. De los cursos privados a la mentoría continuada, cada recorrido parte de los problemas reales de la clínica.",
    "private-courses":
      "Formación individual o para equipos clínicos, construida sobre los casos reales de la clínica y las dificultades que encuentras de verdad. El cambio clave es uno: de \"uso el software\" a \"controlo el tratamiento\".",
    "sas-courses":
      "Programas estructurados en colaboración con SAS para quienes quieren elevar su nivel clínico con alineadores. Cada concepto —de las Clases II a los casos extractivos— debe traducirse en una decisión concreta del plan de tratamiento.",
    "align-p2p":
      "Un espacio de intercambio clínico entre colegas para analizar casos, dudas y estrategias de tratamiento. El valor no es confirmar lo que ya decidiste, sino ver lo que estabas subestimando.",
    "clinical-cases":
      "Cada caso se lee por diagnóstico, objetivo, límites y estrategia biomecánica. La filosofía es clara: el valor de un caso no es el antes/después, sino entender por qué se planificó de esa manera.",
    consulting:
      "Soporte concreto en la planificación: revisión ClinCheck, estrategia de staging, biomecánica y evaluación de los límites del caso. El objetivo es llegar a una estrategia clara, no a una lista infinita de modificaciones.",
  },
};

const leads: Record<Locale, LeadMap> = { it, en, es };

export function sectionLead(
  locale: Locale,
  audience: Audience,
  section: string,
): string | undefined {
  return leads[locale][audience][section as SectionKey];
}
