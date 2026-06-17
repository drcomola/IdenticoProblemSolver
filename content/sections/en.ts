import type { AudienceSections, Cta } from "../types";

/** English section pages — source: Contenuti_Sito_Giorgio_Comola_v1. */

const p = (section: string, label: string): Cta => ({
  label,
  target: { kind: "section", audience: "patients", section },
});
const c = (section: string, label: string): Cta => ({
  label,
  target: { kind: "section", audience: "colleagues", section },
});

export const patientsSectionsEn: AudienceSections = {
  about: {
    seo: {
      title: "About Dr. Giorgio Comola | Digital orthodontist",
      description:
        "Digital orthodontics, clear aligners and advanced clinical planning for children, teenagers and adults.",
    },
    h1: "Giorgio Comola",
    subtitle:
      "Digital orthodontics, clear aligners and advanced clinical planning.",
    blocks: [
      {
        type: "statement",
        heading: "Short profile",
        body: "Dr. Giorgio Comola focuses on digital orthodontics and clear aligner treatments for children, teenagers and adults. His clinical activity is combined with professional education for dentists and orthodontists.",
      },
      {
        type: "imageGallery",
        images: [
          {
            src: "/images/site/chi-sono-1.webp",
            alt: "Dr. Giorgio Comola during a lecture on digital orthodontics",
            caption: "Clinical lectures and professional education.",
            wide: true,
          },
          {
            src: "/images/site/chi-sono-2.webp",
            alt: "Portrait of Dr. Giorgio Comola during a presentation",
            caption: "Planning, control and communication.",
          },
          {
            src: "/images/site/chi-sono-4.webp",
            alt: "Dr. Giorgio Comola explaining orthodontic movement",
            caption: "From digital plan to clinical decision.",
          },
        ],
      },
      {
        type: "list",
        heading: "Curriculum at a glance",
        items: [
          "Graduated from Universidad Alfonso X el Sabio, Madrid, in 2016.",
          "Certified in Invisalign since 2017.",
          "Diamond II Provider in 2018, at the age of 26.",
          "Diamond Apex Provider since 2021.",
          "Align Faculty Speaker since 2021 and Align Mentor since 2022.",
          "Co-founder of iDenTiCo_Med in 2023.",
          "Smart Aligner Service Mentor for Spain, Italy and Poland since 2024.",
          "2000+ patients treated with the Invisalign system.",
          "1000+ Treatment Planning Services completed.",
          "Clinical collaboration across 18 clinics in Northern Italy.",
          "SIDO member.",
        ],
        columns: 3,
      },
      {
        type: "statement",
        heading: "A long Invisalign story",
        body: "His connection to Invisalign began well before his clinical career: in 2000 his father was one of the first adopters of the system in Italy. The early blue boxes, the old ClinCheck interface with orange attachments and photo uploads through early ADSL connections turned technology into an early passion.",
      },
      {
        type: "list",
        heading: "Approach",
        items: [
          "Diagnosis before treatment.",
          "Digital planning before execution.",
          "Clinical control before pure aesthetics.",
          "Clear results, explained and monitored.",
        ],
      },
    ],
    primaryCta: p("book", "Book an assessment"),
    secondaryCta: p("what-i-offer", "View treatments"),
  },

  "what-i-offer": {
    seo: {
      title: "Orthodontic treatments | Dr. Giorgio Comola",
      description:
        "Invisalign clear aligners, digital orthodontics for adults, teenagers and children. Every treatment built around the patient.",
    },
    h1: "Clear treatments. Measurable goals.",
    subtitle:
      "Every treatment is built around the patient: age, growth, occlusion, aesthetics and stability.",
    blocks: [
      {
        type: "list",
        heading: "Treatment areas",
        items: [
          "Invisalign clear aligners.",
          "Digital orthodontics for adults.",
          "Teen orthodontics.",
          "Interceptive orthodontics for children.",
          "Deep bite, open bite, crossbite and Class II cases.",
          "Interdisciplinary cases with prosthetics, aesthetics and implant dentistry.",
          "BITE, bruxism and functional assessment when indicated.",
        ],
      },
      {
        type: "imageGallery",
        images: [
          {
            src: "/images/cases/affollamento/affollamento-adulto-01/after-front.JPG",
            alt: "Crowding case result after treatment",
            caption: "Crowding.",
          },
          {
            src: "/images/cases/morso-aperto/aperto-adulto/after-front.JPG",
            alt: "Open bite case result after treatment",
            caption: "Open bite.",
          },
          {
            src: "/images/cases/morso-crociato/crociato-adulto/after-front.JPG",
            alt: "Crossbite case result after treatment",
            caption: "Crossbite.",
          },
        ],
      },
      {
        type: "statement",
        heading: "Method",
        body: "Treatment is not sold. It is explained. The patient must know what can be corrected, what can be improved and which biological limits must be respected.",
      },
    ],
    primaryCta: p("book", "Request a consultation"),
    secondaryCta: p("first-consultation", "Read about the first consultation"),
  },

  "digital-orthodontics": {
    seo: {
      title: "Digital orthodontics | Dr. Giorgio Comola",
      description:
        "Digital diagnosis, intraoral scanning, tooth movement simulation and precise planning of aesthetic and functional goals.",
    },
    h1: "Digital diagnosis. Precise planning.",
    subtitle: "Technology matters only when it improves clinical decision-making.",
    blocks: [
      {
        type: "list",
        heading: "What it means",
        items: [
          "Intraoral scanning when indicated.",
          "Digital arch analysis.",
          "Tooth movement simulation.",
          "Planning of aesthetic and functional goals.",
          "Tracking monitoring during treatment.",
        ],
      },
      {
        type: "imageGallery",
        images: [
          {
            src: "/images/site/itero.webp",
            alt: "iTero intraoral scanner for digital impressions",
            caption: "Intraoral scanning.",
          },
          {
            src: "/images/site/pre-post.webp",
            alt: "Digital simulation of a possible orthodontic result",
            caption: "Possible result simulation.",
            wide: true,
          },
        ],
      },
      {
        type: "statement",
        heading: "Why it matters",
        body: "Modern orthodontic treatment must be designed, not improvised. Digital tools help us see earlier, plan better and communicate more clearly.",
      },
    ],
    primaryCta: p("book", "Book a digital assessment"),
    secondaryCta: p("invisalign", "Discover Invisalign"),
  },

  invisalign: {
    seo: {
      title: "Invisalign & clear aligners | Dr. Giorgio Comola",
      description:
        "Clear aligner treatments, digital planning and a precise clinical approach for adults, teenagers and children.",
    },
    h1: "Clear aligners. Real clinical control.",
    subtitle:
      "Invisalign is not just a tray. It is orthodontic treatment requiring diagnosis, planning and control.",
    blocks: [
      {
        type: "list",
        heading: "What it can treat",
        items: [
          "Dental crowding.",
          "Crooked teeth in adults.",
          "Spaces and anterior diastemas.",
          "Deep bite or open bite.",
          "Crossbite.",
          "Selected Class II and Class III cases when clinically indicated.",
        ],
      },
      {
        type: "imageGallery",
        images: [
          {
            src: "/images/cases/seconda-classe/seconda-adolescente/after-front.JPG",
            alt: "Class II case after treatment",
            caption: "Class II.",
          },
          {
            src: "/images/cases/terza-classe/terza-adulto/after-front.JPG",
            alt: "Class III case after treatment",
            caption: "Class III.",
          },
          {
            src: "/images/cases/pre-protesico/protesico-adulto/after-smile.jpg",
            alt: "Smile after pre-prosthetic orthodontic treatment",
            caption: "Pre-prosthetic.",
          },
        ],
      },
      {
        type: "statement",
        heading: "The difference",
        body: "Quality does not depend only on software. It depends on who plans the movement, how the case is monitored and how well the patient cooperates.",
      },
    ],
    primaryCta: p("book", "Find out if Invisalign is right for you"),
    secondaryCta: p("clinical-cases", "View clinical cases"),
  },

  "first-consultation": {
    seo: {
      title: "First orthodontic consultation | Dr. Giorgio Comola",
      description:
        "Orthodontic assessment, digital scan and a personalized treatment plan with clear timing and options.",
    },
    h1: "First orthodontic consultation. Clear, complete, useful.",
    subtitle:
      "A consultation should give answers: diagnosis, options, timing, limits and indicative costs.",
    blocks: [
      {
        type: "list",
        heading: "What happens",
        items: [
          "Clinical assessment of smile and occlusion.",
          "Growth analysis in young patients.",
          "Possible digital scan.",
          "Before and after simulation when clinically useful, to visualize the possible treatment objective.",
          "Discussion of treatment options.",
          "Timing and priority indication.",
          "Radiographic exams when necessary.",
        ],
      },
      {
        type: "statement",
        heading: "Before and after simulation",
        body: "The digital simulation is not a promise of outcome. It is a communication tool: it helps clarify the treatment direction, compare options and make realistic objectives, timing and limits easier to understand.",
      },
      {
        type: "statement",
        heading: "What you get",
        body: "A clear picture. Not a generic promise. The patient should leave knowing what the problem is, what can be done and why.",
      },
    ],
    primaryCta: p("book", "Book your first consultation"),
    secondaryCta: p("faq", "Read the FAQ"),
  },

  "clinical-cases": {
    seo: {
      title: "Clinical cases | Dr. Giorgio Comola",
      description:
        "Selected clinical examples showing diagnosis, objective and outcome. Every case requires an individual diagnosis.",
    },
    h1: "Real cases. Readable results.",
    subtitle:
      "Selected clinical examples showing diagnosis, objective and outcome.",
    blocks: [
      {
        type: "list",
        heading: "How they will be shown",
        items: [
          "Before and after.",
          "Initial problem.",
          "Treatment used.",
          "Indicative duration.",
          "Essential clinical details.",
        ],
      },
      {
        type: "cases",
        heading: "Categories",
        categories: [
          "Crowding",
          "Open bite",
          "Deep bite",
          "Class II",
          "Class III",
          "Pre-prosthetic",
          "Periodontal",
          "Aesthetic",
          "Agenesis",
          "Complex cases",
          "Crossbite",
        ],
        disclaimer:
          "Every case is different and requires an individual diagnosis. Images do not constitute a promise of outcome.",
      },
    ],
    primaryCta: p("book", "Book an assessment"),
    secondaryCta: p("invisalign", "Discover Invisalign"),
  },

  clinics: {
    seo: {
      title: "Clinics & locations | Dr. Giorgio Comola",
      description:
        "Dr. Comola collaborates with selected clinics in different cities. Book in the most convenient location.",
    },
    h1: "Book in the most convenient location.",
    subtitle: "Dr. Comola collaborates with selected clinics in different cities.",
    blocks: [
      {
        type: "clinics",
        heading: "How to choose",
        steps: [
          "Select the most convenient city.",
          "Send a consultation request.",
          "The clinic team will contact you.",
          "Bring any existing X-rays or documents.",
        ],
        note: "Availability varies by location. The appointment is confirmed directly by the selected clinic.",
      },
    ],
    primaryCta: p("book", "Find the closest clinic"),
    secondaryCta: p("book", "Request contact"),
  },

  faq: {
    seo: {
      title: "Orthodontics FAQ | Dr. Giorgio Comola",
      description:
        "Essential answers before starting an orthodontic treatment with clear aligners.",
    },
    h1: "Frequently asked questions. Direct answers.",
    subtitle: "Essential answers before starting orthodontic treatment.",
    blocks: [
      {
        type: "faq",
        items: [
          {
            question: "Does Invisalign hurt?",
            answer:
              "A mild pressure in the first days with each new aligner is normal — it means the teeth are moving — and usually eases within hours or days. Intense or persistent pain, however, should always be reported and checked.",
          },
          {
            question: "How long does treatment take?",
            answer:
              "It depends on the complexity of the case: some treatments last a few months, while more involved ones can exceed 24 months. At the first consultation you get a realistic estimate for your case.",
          },
          {
            question: "Are aligners visible?",
            answer:
              "They are very discreet and go unnoticed in most everyday situations, but they are not completely invisible in every lighting condition or at close distance.",
          },
          {
            question: "Can I eat with aligners?",
            answer:
              "No: they must be removed to eat and to drink anything other than water, which also helps keep them clean. To be effective they should be worn around 22 hours a day.",
          },
          {
            question: "Does it work for everyone?",
            answer:
              "No. Aligners solve many situations but not all of them: a diagnosis is needed to know whether they are the right choice for you or whether another approach is preferable.",
          },
          {
            question: "How much does it cost?",
            answer:
              "It depends on the complexity of the case and the type of treatment. During the first consultation the options and a clear indication of costs are explained, with no surprises.",
          },
        ],
      },
    ],
    primaryCta: p("book", "Book a consultation"),
    secondaryCta: p("invisalign", "Read about Invisalign"),
  },

  book: {
    seo: {
      title: "Book an orthodontic assessment | Dr. Giorgio Comola",
      description:
        "Tell us what you want to improve. We will direct you to the most suitable clinic for your first consultation.",
    },
    h1: "Book an orthodontic assessment.",
    subtitle:
      "Tell us what you want to improve. We will direct you to the most suitable clinic.",
    blocks: [
      {
        type: "form",
        microcopy:
          "Complete the form. The clinic team will contact you to define location, availability and useful documentation.",
        submitLabel: "Send consultation request",
        fields: [
          { name: "name", label: "Name and surname", required: true },
          { name: "phone", label: "Phone", type: "tel", required: true },
          { name: "email", label: "Email", type: "email", required: true },
          { name: "city", label: "Preferred city" },
          { name: "age", label: "Patient age" },
          {
            name: "scans",
            label: "Do you already have X-rays or scans?",
            type: "select",
            options: ["Yes", "No"],
          },
          {
            name: "reason",
            label: "Reason for request",
            type: "textarea",
            required: true,
          },
        ],
      },
    ],
    primaryCta: p("faq", "Read the FAQ"),
    secondaryCta: p("what-i-offer", "Back to treatments"),
  },
};

export const colleaguesSectionsEn: AudienceSections = {
  about: {
    seo: {
      title: "About Dr. Giorgio Comola | Education & mentorship",
      description:
        "A profile built on daily clinical practice and international professional education with clear aligners.",
    },
    h1: "Clinical practice, digital workflow, education.",
    subtitle:
      "A profile built on daily clinical practice and international professional education.",
    blocks: [
      {
        type: "statement",
        heading: "Professional bio",
        body: "Dr. Giorgio Comola works with clear aligners, digital workflow and advanced clinical planning. His work brings together clinical practice, technology and communication, with a constant focus on optimizing results and reducing chair time for patients.",
      },
      {
        type: "imageGallery",
        images: [
          {
            src: "/images/site/emea-ortho-summit-2026.webp",
            alt: "Dr. Giorgio Comola on stage at the EMEA Ortho Summit 2026",
            caption: "EMEA Ortho Summit 2026.",
            wide: true,
          },
          {
            src: "/images/site/chi-sono-1.webp",
            alt: "Dr. Giorgio Comola during a clinical lecture",
            caption: "International education.",
          },
          {
            src: "/images/site/chi-sono-4.webp",
            alt: "Clinical explanation during a presentation",
            caption: "Method and biomechanics.",
          },
        ],
      },
      {
        type: "list",
        heading: "Professional milestones",
        items: [
          "2016: graduated from Universidad Alfonso X el Sabio, Madrid.",
          "2017: certified in Invisalign.",
          "2018: Diamond II Provider at the age of 26.",
          "2021: Diamond Apex Provider.",
          "2021: recognized as an Align Faculty Speaker.",
          "2022: Align Mentor.",
          "2023: co-founder of iDenTiCo_Med.",
          "2024: Smart Aligner Service Mentor for Spain, Italy and Poland.",
        ],
        columns: 2,
      },
      {
        type: "list",
        heading: "Experience",
        items: [
          "2000+ patients treated with the Invisalign system.",
          "1000+ Treatment Planning Services completed.",
          "Collaboration across 18 clinics in Northern Italy.",
          "SIDO member.",
          "Personal connection to Invisalign since childhood, through his father's early adoption of the system in Italy.",
          "Cross-disciplinary interest in technology, communication, programming and clinical planning.",
        ],
        columns: 2,
      },
      {
        type: "list",
        heading: "Teaching focus",
        items: [
          "Diagnosis and case setup.",
          "Aligner biomechanics.",
          "ClinCheck review.",
          "Complex cases.",
          "Interdisciplinary digital workflow.",
          "Clinical communication with the patient.",
        ],
      },
    ],
    primaryCta: c("consulting", "Request information"),
    secondaryCta: c("education", "Go to education"),
  },

  education: {
    seo: {
      title: "Invisalign education & digital orthodontics | Giorgio Comola",
      description:
        "Courses, mentorship and advanced clinical education for dentists and orthodontists working with clear aligners.",
    },
    h1: "Method, not motivation.",
    subtitle:
      "Concrete education to bring more control into clear aligner treatments.",
    blocks: [
      {
        type: "list",
        heading: "Services",
        items: [
          "Private individual or team courses.",
          "Ongoing clinical mentorship.",
          "ClinCheck planning support.",
          "Complex case discussion.",
          "Programs in collaboration with SAS.",
          "Align P2P when available and relevant.",
        ],
      },
      {
        type: "statement",
        heading: "Objective",
        body: "Reduce improvisation. Increase diagnostic, prescription, staging and clinical control skills.",
      },
    ],
    primaryCta: c("consulting", "Discuss your pathway"),
    secondaryCta: c("private-courses", "Discover private courses"),
  },

  "private-courses": {
    seo: {
      title: "Private Invisalign courses | Dr. Giorgio Comola",
      description:
        "Individual or team education built around real clinical cases. From 'I use the software' to 'I control the treatment'.",
    },
    h1: "Private courses. Tailored. No useless content.",
    subtitle:
      "Individual or team education built around real clinical cases from the practice.",
    blocks: [
      {
        type: "list",
        heading: "Format",
        items: [
          "Online one-to-one.",
          "In-office sessions.",
          "Team programs.",
          "Real case review.",
          "ClinCheck and digital workflow training.",
        ],
      },
      {
        type: "statement",
        heading: "Who it is for",
        body: "For clinicians who want to move from \"I use the software\" to \"I control the treatment\".",
      },
    ],
    primaryCta: c("consulting", "Request a private course"),
    secondaryCta: c("consulting", "Submit a case for discussion"),
  },

  "sas-courses": {
    seo: {
      title: "Courses in collaboration with SAS | Dr. Giorgio Comola",
      description:
        "Structured educational programs for colleagues who want to raise their clinical level with clear aligners.",
    },
    h1: "Courses in collaboration with SAS.",
    subtitle:
      "Structured educational programs for colleagues who want to raise their clinical level with aligners.",
    blocks: [
      {
        type: "list",
        heading: "Possible contents",
        items: [
          "Digital diagnosis.",
          "Class II cases.",
          "Deep bite.",
          "Extraction cases.",
          "Tracking management.",
          "Interdisciplinary workflow.",
          "Common mistakes and practical corrections.",
        ],
      },
      {
        type: "statement",
        heading: "Approach",
        body: "Not theory disconnected from practice. Every concept must translate into a clear treatment planning decision.",
      },
    ],
    primaryCta: c("consulting", "Request SAS course information"),
    secondaryCta: c("consulting", "Discover mentorship"),
  },

  "align-p2p": {
    seo: {
      title: "Align P2P — clinical exchange between colleagues | Giorgio Comola",
      description:
        "A space to analyze cases, doubts and treatment strategies with clear aligners.",
    },
    h1: "Align P2P. Clinical exchange between colleagues.",
    subtitle:
      "A space to analyze cases, doubts and treatment strategies with aligners.",
    blocks: [
      {
        type: "list",
        heading: "Topics",
        items: [
          "Case reading.",
          "Realistic objectives.",
          "Prescription.",
          "Staging.",
          "Attachments and auxiliaries.",
          "Elastics and biomechanical control.",
          "Refinement and unexpected problems.",
        ],
      },
      {
        type: "statement",
        heading: "Value",
        body: "The best discussion does not simply confirm what you already decided. It shows what you were underestimating.",
      },
    ],
    primaryCta: c("consulting", "Request P2P information"),
    secondaryCta: c("consulting", "Go to consulting"),
  },

  "clinical-cases": {
    seo: {
      title: "Clinical cases & treatment philosophy | Giorgio Comola",
      description:
        "Each case is read through diagnosis, objective, limits and biomechanical strategy. Not just images: decisions.",
    },
    h1: "Clinical cases. Decisions, not just images.",
    subtitle:
      "Each case is read through diagnosis, objective, limits and biomechanical strategy.",
    blocks: [
      {
        type: "cases",
        heading: "Categories",
        categories: [
          "Crowding",
          "Open bite",
          "Deep bite",
          "Class II",
          "Class III",
          "Pre-prosthetic",
          "Periodontal",
          "Aesthetic",
          "Agenesis",
          "Complex cases",
          "Crossbite",
        ],
      },
      {
        type: "statement",
        heading: "Philosophy",
        body: "The value of a case is not the before and after. It is understanding why it was planned that way.",
      },
    ],
    primaryCta: c("consulting", "Request case discussion"),
    secondaryCta: c("education", "Go to education"),
  },

  consulting: {
    seo: {
      title: "ClinCheck consulting & Invisalign mentorship | Giorgio Comola",
      description:
        "Case planning support, ClinCheck and digital workflow to increase predictability and clinical control.",
    },
    h1: "ClinCheck consulting and mentorship.",
    subtitle:
      "Concrete support to improve diagnosis, setup and control of aligner cases.",
    blocks: [
      {
        type: "list",
        heading: "What you can request",
        items: [
          "ClinCheck review.",
          "Treatment plan discussion.",
          "Staging strategy.",
          "Biomechanics and auxiliaries.",
          "Evaluation of case limits.",
          "Guidance to communicate the plan to the patient.",
        ],
      },
      {
        type: "form",
        microcopy:
          "Send the essential case information. The goal is a clear strategy, not an endless list of modifications.",
        submitLabel: "Request consulting",
        fields: [
          { name: "name", label: "Name and surname", required: true },
          { name: "email", label: "Email", type: "email", required: true },
          { name: "phone", label: "Phone (optional)", type: "tel" },
          { name: "studio", label: "Practice / city" },
          {
            name: "requestType",
            label: "Request type",
            type: "select",
            required: true,
            options: [
              "Private course",
              "Mentorship",
              "Align P2P",
              "ClinCheck consulting",
              "SAS courses",
            ],
          },
          {
            name: "message",
            label: "Message",
            type: "textarea",
            required: true,
          },
        ],
      },
    ],
    primaryCta: c("education", "Discover education"),
    secondaryCta: c("align-p2p", "Go to Align P2P"),
  },
};
