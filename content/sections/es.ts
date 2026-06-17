import type { AudienceSections, Cta } from "../types";

/** Spanish section pages — source: Contenuti_Sito_Giorgio_Comola_v1. */

const p = (section: string, label: string): Cta => ({
  label,
  target: { kind: "section", audience: "patients", section },
});
const c = (section: string, label: string): Cta => ({
  label,
  target: { kind: "section", audience: "colleagues", section },
});

export const patientsSectionsEs: AudienceSections = {
  about: {
    seo: {
      title: "Sobre el Dr. Giorgio Comola | Ortodoncista digital",
      description:
        "Ortodoncia digital, alineadores transparentes y planificación clínica avanzada para niños, adolescentes y adultos.",
    },
    h1: "Giorgio Comola",
    subtitle:
      "Ortodoncia digital, alineadores transparentes y planificación clínica avanzada.",
    blocks: [
      {
        type: "statement",
        heading: "Perfil breve",
        body: "El Dr. Giorgio Comola se dedica a la ortodoncia digital y a los tratamientos con alineadores transparentes para niños, adolescentes y adultos. Su actividad clínica se complementa con formación profesional para dentistas y ortodoncistas.",
      },
      {
        type: "imageGallery",
        images: [
          {
            src: "/images/site/chi-sono-1.webp",
            alt: "El Dr. Giorgio Comola durante una conferencia sobre ortodoncia digital",
            caption: "Conferencias clinicas y formacion profesional.",
            wide: true,
          },
          {
            src: "/images/site/chi-sono-2.webp",
            alt: "Retrato del Dr. Giorgio Comola durante una presentacion",
            caption: "Planificacion, control y comunicacion.",
          },
          {
            src: "/images/site/chi-sono-4.webp",
            alt: "El Dr. Giorgio Comola explica un movimiento ortodoncico",
            caption: "Del plan digital a la decision clinica.",
          },
        ],
      },
      {
        type: "list",
        heading: "Curriculum en breve",
        items: [
          "Graduado por Universidad Alfonso X el Sabio, Madrid, en 2016.",
          "Certificado Invisalign desde 2017.",
          "Diamond II Provider en 2018, con 26 años.",
          "Diamond Apex Provider desde 2021.",
          "Align Faculty Speaker desde 2021 y Align Mentor desde 2022.",
          "Co-fundador de iDenTiCo_Med en 2023.",
          "Smart Aligner Service Mentor para España, Italia y Polonia desde 2024.",
          "Más de 2000 pacientes tratados con el sistema Invisalign.",
          "Más de 1000 Treatment Planning Services completados.",
          "Colaboración clínica con 18 clínicas del norte de Italia.",
          "Miembro de SIDO.",
        ],
        columns: 3,
      },
      {
        type: "statement",
        heading: "Una historia larga con Invisalign",
        body: "Su conexión con Invisalign empezó mucho antes de la carrera clínica: en 2000 su padre fue uno de los primeros usuarios del sistema en Italia. Las primeras cajas azules, el antiguo ClinCheck con attachments naranjas y la carga de fotos con las primeras conexiones ADSL convirtieron la tecnología en una pasión temprana.",
      },
      {
        type: "list",
        heading: "Enfoque",
        items: [
          "Diagnóstico antes del tratamiento.",
          "Planificación digital antes de la ejecución.",
          "Control clínico antes que estética sin criterio.",
          "Resultados claros, explicados y monitorizados.",
        ],
      },
    ],
    primaryCta: p("book", "Reservar una valoración"),
    secondaryCta: p("what-i-offer", "Ver tratamientos"),
  },

  "what-i-offer": {
    seo: {
      title: "Tratamientos ortodóncicos | Dr. Giorgio Comola",
      description:
        "Alineadores transparentes Invisalign, ortodoncia digital para adultos, adolescentes y niños. Cada tratamiento sobre el paciente.",
    },
    h1: "Tratamientos claros. Objetivos medibles.",
    subtitle:
      "Cada tratamiento se construye sobre el paciente: edad, crecimiento, oclusión, estética y estabilidad.",
    blocks: [
      {
        type: "list",
        heading: "Áreas de tratamiento",
        items: [
          "Alineadores transparentes Invisalign.",
          "Ortodoncia digital para adultos.",
          "Ortodoncia para adolescentes.",
          "Ortodoncia interceptiva en niños.",
          "Mordida profunda, mordida abierta, mordida cruzada y Clases II.",
          "Casos interdisciplinarios con prótesis, estética e implantología.",
          "BITE, bruxismo y evaluación funcional cuando esté indicado.",
        ],
      },
      {
        type: "imageGallery",
        images: [
          {
            src: "/images/cases/affollamento/affollamento-adulto-01/after-front.JPG",
            alt: "Resultado de un caso de apiñamiento después del tratamiento",
            caption: "Apiñamiento.",
          },
          {
            src: "/images/cases/morso-aperto/aperto-adulto/after-front.JPG",
            alt: "Resultado de un caso de mordida abierta después del tratamiento",
            caption: "Mordida abierta.",
          },
          {
            src: "/images/cases/morso-crociato/crociato-adulto/after-front.JPG",
            alt: "Resultado de un caso de mordida cruzada después del tratamiento",
            caption: "Mordida cruzada.",
          },
        ],
      },
      {
        type: "statement",
        heading: "Método",
        body: "El tratamiento no se vende. Se explica. El paciente debe saber qué se puede corregir, qué se puede mejorar y qué límites biológicos deben respetarse.",
      },
    ],
    primaryCta: p("book", "Solicitar una visita"),
    secondaryCta: p("first-consultation", "Leer sobre la primera visita"),
  },

  "digital-orthodontics": {
    seo: {
      title: "Ortodoncia digital | Dr. Giorgio Comola",
      description:
        "Diagnóstico digital, escaneo intraoral, simulación del movimiento dental y planificación precisa de los objetivos.",
    },
    h1: "Diagnóstico digital. Planificación precisa.",
    subtitle: "La tecnología solo es útil cuando mejora la decisión clínica.",
    blocks: [
      {
        type: "list",
        heading: "Qué significa",
        items: [
          "Escaneo intraoral cuando está indicado.",
          "Análisis digital de las arcadas.",
          "Simulación del movimiento dental.",
          "Planificación de objetivos estéticos y funcionales.",
          "Monitorización del tracking durante el tratamiento.",
        ],
      },
      {
        type: "imageGallery",
        images: [
          {
            src: "/images/site/itero.webp",
            alt: "Escáner intraoral iTero para impresiones digitales",
            caption: "Escaneo intraoral.",
          },
          {
            src: "/images/site/pre-post.webp",
            alt: "Simulación digital del posible resultado ortodóncico",
            caption: "Simulación del posible resultado.",
            wide: true,
          },
        ],
      },
      {
        type: "statement",
        heading: "Por qué importa",
        body: "Un tratamiento ortodóncico moderno debe diseñarse, no improvisarse. Lo digital permite ver antes, planificar mejor y comunicar con más claridad.",
      },
    ],
    primaryCta: p("book", "Reservar valoración digital"),
    secondaryCta: p("invisalign", "Descubrir Invisalign"),
  },

  invisalign: {
    seo: {
      title: "Invisalign y alineadores transparentes | Dr. Giorgio Comola",
      description:
        "Tratamientos con alineadores transparentes, planificación digital y enfoque clínico preciso para adultos, adolescentes y niños.",
    },
    h1: "Alineadores transparentes. Control clínico real.",
    subtitle:
      "Invisalign no es una férula. Es un tratamiento ortodóncico que requiere diagnóstico, planificación y control.",
    blocks: [
      {
        type: "list",
        heading: "Qué puede tratar",
        items: [
          "Apiñamiento dental.",
          "Dientes torcidos en adultos.",
          "Diastemas y espacios anteriores.",
          "Mordida profunda o abierta.",
          "Mordida cruzada.",
          "Algunas Clases II y III cuando estén clínicamente indicadas.",
        ],
      },
      {
        type: "imageGallery",
        images: [
          {
            src: "/images/cases/seconda-classe/seconda-adolescente/after-front.JPG",
            alt: "Caso de Clase II después del tratamiento",
            caption: "Clase II.",
          },
          {
            src: "/images/cases/terza-classe/terza-adulto/after-front.JPG",
            alt: "Caso de Clase III después del tratamiento",
            caption: "Clase III.",
          },
          {
            src: "/images/cases/pre-protesico/protesico-adulto/after-smile.jpg",
            alt: "Sonrisa después de tratamiento preprotésico",
            caption: "Preprotésico.",
          },
        ],
      },
      {
        type: "statement",
        heading: "La diferencia",
        body: "La calidad no depende solo del software. Depende de quién planifica el movimiento, cómo se controla el caso y la colaboración del paciente.",
      },
    ],
    primaryCta: p("book", "Valora si Invisalign es para ti"),
    secondaryCta: p("clinical-cases", "Ver casos clínicos"),
  },

  "first-consultation": {
    seo: {
      title: "Primera visita ortodóncica | Dr. Giorgio Comola",
      description:
        "Valoración ortodóncica, escaneo digital y plan de tratamiento personalizado con tiempos y opciones claras.",
    },
    h1: "Primera visita ortodóncica. Clara, completa, útil.",
    subtitle:
      "Una visita debe darte respuestas: diagnóstico, opciones, tiempos, límites y costes orientativos.",
    blocks: [
      {
        type: "list",
        heading: "Qué ocurre",
        items: [
          "Evaluación clínica de sonrisa y oclusión.",
          "Análisis de crecimiento en pacientes jóvenes.",
          "Posible escaneo digital.",
          "Simulación antes y después cuando sea clínicamente útil, para visualizar el posible objetivo del tratamiento.",
          "Discusión de opciones terapéuticas.",
          "Indicación de tiempos y prioridades.",
          "Radiografías cuando sean necesarias.",
        ],
      },
      {
        type: "statement",
        heading: "Simulación antes y después",
        body: "La simulación digital no es una promesa de resultado. Es una herramienta de comunicación: ayuda a entender la dirección del tratamiento, comparar opciones y aclarar objetivos realistas, tiempos y límites.",
      },
      {
        type: "statement",
        heading: "Qué obtienes",
        body: "Una visión clara. No una promesa genérica. El paciente debe salir sabiendo qué tiene, qué puede hacer y por qué.",
      },
    ],
    primaryCta: p("book", "Reservar primera visita"),
    secondaryCta: p("faq", "Leer FAQ"),
  },

  "clinical-cases": {
    seo: {
      title: "Casos clínicos | Dr. Giorgio Comola",
      description:
        "Ejemplos clínicos seleccionados que muestran diagnóstico, objetivo y resultado. Cada caso requiere un diagnóstico individual.",
    },
    h1: "Casos reales. Resultados comprensibles.",
    subtitle:
      "Ejemplos clínicos seleccionados para mostrar diagnóstico, objetivo y resultado.",
    blocks: [
      {
        type: "list",
        heading: "Cómo se presentarán",
        items: [
          "Antes y después.",
          "Problema inicial.",
          "Tratamiento utilizado.",
          "Duración orientativa.",
          "Detalles clínicos esenciales.",
        ],
      },
      {
        type: "cases",
        heading: "Categorías",
        categories: [
          "Apiñamiento",
          "Mordida abierta",
          "Mordida profunda",
          "Clase II",
          "Clase III",
          "Preprotésico",
          "Periodontal",
          "Estético",
          "Agenesias",
          "Casos complejos",
          "Mordida cruzada",
        ],
        disclaimer:
          "Cada caso es diferente y requiere un diagnóstico individual. Las imágenes no constituyen una promesa de resultado.",
      },
    ],
    primaryCta: p("book", "Reservar valoración"),
    secondaryCta: p("invisalign", "Descubrir Invisalign"),
  },

  clinics: {
    seo: {
      title: "Clínicas y sedes | Dr. Giorgio Comola",
      description:
        "El Dr. Comola colabora con clínicas seleccionadas en diferentes ciudades. Reserva en la sede más cómoda.",
    },
    h1: "Reserva en la sede más cómoda.",
    subtitle: "El Dr. Comola colabora con clínicas seleccionadas en diferentes ciudades.",
    blocks: [
      {
        type: "clinics",
        heading: "Cómo elegir",
        steps: [
          "Selecciona la ciudad más cómoda.",
          "Envía una solicitud de visita.",
          "La secretaría de la clínica te contactará.",
          "Trae radiografías o documentación disponible.",
        ],
        note: "La disponibilidad varía según la sede. La cita se confirma directamente con la clínica seleccionada.",
      },
    ],
    primaryCta: p("book", "Encontrar la clínica más cercana"),
    secondaryCta: p("book", "Solicitar contacto"),
  },

  faq: {
    seo: {
      title: "Preguntas frecuentes de ortodoncia | Dr. Giorgio Comola",
      description:
        "Las respuestas esenciales antes de empezar un tratamiento ortodóncico con alineadores transparentes.",
    },
    h1: "Preguntas frecuentes. Respuestas directas.",
    subtitle: "Las respuestas esenciales antes de empezar un tratamiento ortodóncico.",
    blocks: [
      {
        type: "faq",
        items: [
          {
            question: "¿Invisalign duele?",
            answer:
              "Una ligera presión los primeros días con cada nuevo alineador es normal: es la señal de que los dientes se están moviendo y suele disminuir en pocas horas o días. Un dolor intenso o persistente, en cambio, debe comunicarse y valorarse siempre.",
          },
          {
            question: "¿Cuánto dura el tratamiento?",
            answer:
              "Depende de la complejidad del caso: algunos tratamientos duran pocos meses y otros, más complejos, pueden superar los 24 meses. En la primera visita recibes una estimación realista para tu caso.",
          },
          {
            question: "¿Se ven los alineadores?",
            answer:
              "Son muy discretos y pasan desapercibidos en la mayoría de situaciones cotidianas, pero no son completamente invisibles en cualquier condición de luz o a corta distancia.",
          },
          {
            question: "¿Puedo comer con los alineadores?",
            answer:
              "No: se retiran para comer y para beber cualquier cosa que no sea agua, lo que además ayuda a mantenerlos limpios. Para ser eficaces deben llevarse unas 22 horas al día.",
          },
          {
            question: "¿Funciona para todos?",
            answer:
              "No. Los alineadores resuelven muchas situaciones, pero no todas: se necesita un diagnóstico para saber si son la opción adecuada para ti o si es preferible otro enfoque.",
          },
          {
            question: "¿Cuánto cuesta?",
            answer:
              "Depende de la complejidad del caso y del tipo de tratamiento. Durante la primera visita se explican las opciones y una indicación clara de los costes, sin sorpresas.",
          },
        ],
      },
    ],
    primaryCta: p("book", "Reservar una visita"),
    secondaryCta: p("invisalign", "Leer sobre Invisalign"),
  },

  book: {
    seo: {
      title: "Reserva una valoración ortodóncica | Dr. Giorgio Comola",
      description:
        "Cuéntanos qué quieres mejorar. Te orientaremos hacia la sede más adecuada para tu primera visita.",
    },
    h1: "Reserva una valoración ortodóncica.",
    subtitle:
      "Cuéntanos qué quieres mejorar. Te orientaremos hacia la sede más adecuada.",
    blocks: [
      {
        type: "form",
        microcopy:
          "Completa el formulario. La secretaría te contactará para definir sede, disponibilidad y documentación útil.",
        submitLabel: "Enviar solicitud de visita",
        fields: [
          { name: "name", label: "Nombre y apellidos", required: true },
          { name: "phone", label: "Teléfono", type: "tel", required: true },
          { name: "email", label: "Email", type: "email", required: true },
          { name: "city", label: "Ciudad preferida" },
          { name: "age", label: "Edad del paciente" },
          {
            name: "scans",
            label: "¿Tienes radiografías o escaneos?",
            type: "select",
            options: ["Sí", "No"],
          },
          {
            name: "reason",
            label: "Motivo de la solicitud",
            type: "textarea",
            required: true,
          },
        ],
      },
    ],
    primaryCta: p("faq", "Leer FAQ"),
    secondaryCta: p("what-i-offer", "Volver a tratamientos"),
  },
};

export const colleaguesSectionsEs: AudienceSections = {
  about: {
    seo: {
      title: "Sobre el Dr. Giorgio Comola | Formación y mentoría",
      description:
        "Un perfil nacido de la práctica clínica diaria y de la formación profesional internacional con alineadores.",
    },
    h1: "Clínica, digital, formación.",
    subtitle:
      "Un perfil nacido de la práctica clínica diaria y de la formación profesional internacional.",
    blocks: [
      {
        type: "statement",
        heading: "Bio profesional",
        body: "El Dr. Giorgio Comola trabaja con alineadores transparentes, workflow digital y planificación clínica avanzada. Su actividad une clínica, tecnología y comunicación, con foco constante en optimizar resultados y reducir el tiempo de sillón para los pacientes.",
      },
      {
        type: "imageGallery",
        images: [
          {
            src: "/images/site/emea-ortho-summit-2026.webp",
            alt: "El Dr. Giorgio Comola en el escenario del EMEA Ortho Summit 2026",
            caption: "EMEA Ortho Summit 2026.",
            wide: true,
          },
          {
            src: "/images/site/chi-sono-1.webp",
            alt: "El Dr. Giorgio Comola durante una conferencia clinica",
            caption: "Formacion internacional.",
          },
          {
            src: "/images/site/chi-sono-4.webp",
            alt: "Explicacion clinica durante una presentacion",
            caption: "Metodo y biomecanica.",
          },
        ],
      },
      {
        type: "list",
        heading: "Hitos profesionales",
        items: [
          "2016: graduado por Universidad Alfonso X el Sabio, Madrid.",
          "2017: certificación Invisalign.",
          "2018: Diamond II Provider con 26 años.",
          "2021: Diamond Apex Provider.",
          "2021: reconocido como Align Faculty Speaker.",
          "2022: Align Mentor.",
          "2023: co-fundador de iDenTiCo_Med.",
          "2024: Smart Aligner Service Mentor para España, Italia y Polonia.",
        ],
        columns: 2,
      },
      {
        type: "list",
        heading: "Experiencia",
        items: [
          "Más de 2000 pacientes tratados con el sistema Invisalign.",
          "Más de 1000 Treatment Planning Services completados.",
          "Colaboración con 18 clínicas del norte de Italia.",
          "Miembro de SIDO.",
          "Conexión personal con Invisalign desde la infancia, gracias a la adopción temprana del sistema por parte de su padre en Italia.",
          "Interés transversal por tecnología, comunicación, programación y planificación clínica.",
        ],
        columns: 2,
      },
      {
        type: "list",
        heading: "Enfoque docente",
        items: [
          "Diagnóstico y setup del caso.",
          "Biomecánica con alineadores.",
          "Revisión ClinCheck.",
          "Casos complejos.",
          "Workflow digital interdisciplinario.",
          "Comunicación clínica con el paciente.",
        ],
      },
    ],
    primaryCta: c("consulting", "Solicitar información"),
    secondaryCta: c("education", "Ir a formación"),
  },

  education: {
    seo: {
      title: "Formación Invisalign y ortodoncia digital | Giorgio Comola",
      description:
        "Cursos, mentoría y formación clínica avanzada para dentistas y ortodoncistas que trabajan con alineadores transparentes.",
    },
    h1: "Método, no motivación.",
    subtitle:
      "Formación concreta para aportar más control a los tratamientos con alineadores.",
    blocks: [
      {
        type: "list",
        heading: "Servicios",
        items: [
          "Cursos privados individuales o para equipos.",
          "Mentoría clínica continuada.",
          "Soporte de planificación ClinCheck.",
          "Discusión de casos complejos.",
          "Programas en colaboración con SAS.",
          "P2P Align cuando esté disponible y sea pertinente.",
        ],
      },
      {
        type: "statement",
        heading: "Objetivo",
        body: "Reducir la improvisación. Aumentar capacidad de diagnóstico, prescripción, staging y control clínico.",
      },
    ],
    primaryCta: c("consulting", "Hablemos de tu recorrido"),
    secondaryCta: c("private-courses", "Descubrir cursos privados"),
  },

  "private-courses": {
    seo: {
      title: "Cursos privados Invisalign | Dr. Giorgio Comola",
      description:
        "Formación individual o para equipos, construida sobre casos reales. De 'uso el software' a 'controlo el tratamiento'.",
    },
    h1: "Cursos privados. A medida. Sin contenido inútil.",
    subtitle:
      "Formación individual o para equipos clínicos, construida sobre casos reales de la clínica.",
    blocks: [
      {
        type: "list",
        heading: "Formato",
        items: [
          "One-to-one online.",
          "Sesiones en clínica.",
          "Programas para equipos.",
          "Revisión de casos reales.",
          "Training sobre ClinCheck y workflow digital.",
        ],
      },
      {
        type: "statement",
        heading: "A quién sirve",
        body: "A quien quiere pasar de \"uso el software\" a \"controlo el tratamiento\".",
      },
    ],
    primaryCta: c("consulting", "Solicitar un curso privado"),
    secondaryCta: c("consulting", "Enviar un caso para discutir"),
  },

  "sas-courses": {
    seo: {
      title: "Cursos en colaboración con SAS | Dr. Giorgio Comola",
      description:
        "Programas formativos estructurados para colegas que quieren elevar su nivel clínico con alineadores transparentes.",
    },
    h1: "Cursos en colaboración con SAS.",
    subtitle:
      "Programas formativos estructurados para colegas que quieren elevar su nivel clínico con alineadores.",
    blocks: [
      {
        type: "list",
        heading: "Contenidos posibles",
        items: [
          "Diagnóstico digital.",
          "Clases II.",
          "Mordida profunda.",
          "Casos extractivos.",
          "Gestión del tracking.",
          "Workflow interdisciplinario.",
          "Errores comunes y correcciones prácticas.",
        ],
      },
      {
        type: "statement",
        heading: "Enfoque",
        body: "No teoría desconectada de la clínica. Cada concepto debe traducirse en una decisión concreta del plan de tratamiento.",
      },
    ],
    primaryCta: c("consulting", "Solicitar información cursos SAS"),
    secondaryCta: c("consulting", "Descubrir mentoría"),
  },

  "align-p2p": {
    seo: {
      title: "P2P Align — intercambio clínico entre colegas | Giorgio Comola",
      description:
        "Un espacio para analizar casos, dudas y estrategias de tratamiento con alineadores transparentes.",
    },
    h1: "P2P Align. Intercambio clínico entre colegas.",
    subtitle:
      "Un espacio para analizar casos, dudas y estrategias de tratamiento con alineadores.",
    blocks: [
      {
        type: "list",
        heading: "Temas",
        items: [
          "Lectura del caso.",
          "Objetivos realistas.",
          "Prescripción.",
          "Staging.",
          "Attachments y auxiliares.",
          "Elásticos y control biomecánico.",
          "Refinement y gestión de imprevistos.",
        ],
      },
      {
        type: "statement",
        heading: "Valor",
        body: "El mejor intercambio no confirma lo que ya decidiste. Te hace ver lo que estabas subestimando.",
      },
    ],
    primaryCta: c("consulting", "Solicitar información P2P"),
    secondaryCta: c("consulting", "Ir a consultoría"),
  },

  "clinical-cases": {
    seo: {
      title: "Casos clínicos y filosofía de tratamiento | Giorgio Comola",
      description:
        "Cada caso se lee por diagnóstico, objetivo, límites y estrategia biomecánica. No solo imágenes: decisiones.",
    },
    h1: "Casos clínicos. Decisiones, no solo imágenes.",
    subtitle:
      "Cada caso se lee por diagnóstico, objetivo, límites y estrategia biomecánica.",
    blocks: [
      {
        type: "cases",
        heading: "Categorías",
        categories: [
          "Apiñamiento",
          "Mordida abierta",
          "Mordida profunda",
          "Clase II",
          "Clase III",
          "Preprotésico",
          "Periodontal",
          "Estético",
          "Agenesias",
          "Casos complejos",
          "Mordida cruzada",
        ],
      },
      {
        type: "statement",
        heading: "Filosofía",
        body: "El valor de un caso no es el antes/después. Es entender por qué fue planificado de esa manera.",
      },
    ],
    primaryCta: c("consulting", "Solicitar discusión de caso"),
    secondaryCta: c("education", "Ir a formación"),
  },

  consulting: {
    seo: {
      title: "Consultoría ClinCheck y mentoría Invisalign | Giorgio Comola",
      description:
        "Soporte de planificación de casos, ClinCheck y workflow digital para aumentar predictibilidad y control clínico.",
    },
    h1: "Consultoría ClinCheck y mentoría.",
    subtitle:
      "Soporte concreto para mejorar diagnóstico, setup y control de casos con alineadores.",
    blocks: [
      {
        type: "list",
        heading: "Qué puedes solicitar",
        items: [
          "Revisión ClinCheck.",
          "Discusión del plan de tratamiento.",
          "Estrategia de staging.",
          "Biomecánica y auxiliares.",
          "Evaluación de los límites del caso.",
          "Indicaciones para comunicar el plan al paciente.",
        ],
      },
      {
        type: "form",
        microcopy:
          "Envía la información esencial del caso. El objetivo es llegar a una estrategia clara, no a una lista infinita de modificaciones.",
        submitLabel: "Solicitar consultoría",
        fields: [
          { name: "name", label: "Nombre y apellidos", required: true },
          { name: "email", label: "Email", type: "email", required: true },
          { name: "phone", label: "Teléfono (opcional)", type: "tel" },
          { name: "studio", label: "Clínica / ciudad" },
          {
            name: "requestType",
            label: "Tipo de solicitud",
            type: "select",
            required: true,
            options: [
              "Curso privado",
              "Mentoría",
              "P2P Align",
              "Consultoría ClinCheck",
              "Cursos SAS",
            ],
          },
          {
            name: "message",
            label: "Mensaje",
            type: "textarea",
            required: true,
          },
        ],
      },
    ],
    primaryCta: c("education", "Descubrir la formación"),
    secondaryCta: c("align-p2p", "Ir a P2P Align"),
  },
};
