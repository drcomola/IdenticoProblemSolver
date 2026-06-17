import type { Audience, Locale } from "@/lib/i18n";

/**
 * Clinical-cases data model (scaffold).
 *
 * Phase: NO real cases yet. The array is intentionally empty, so nothing
 * fabricated is shown. When real documentation is available, add entries here
 * and drop the images under:
 *
 * `public/images/cases/<category-slug>/<case-slug>/`
 *
 * Medical-legal: every case needs `consent: true` (patient consent on file) and
 * stays an example, never a promise of outcome.
 */

export type CaseImageKind = "before" | "after" | "intraoral" | "render3d" | "xray";

export type CaseImageView =
  | "upperArch"
  | "lowerArch"
  | "front"
  | "rightLateral"
  | "leftLateral"
  | "smile"
  | "profile"
  | "overjet"
  | "detail"
  | "xray"
  | "render3d";

export const caseImageViewOrder: CaseImageView[] = [
  "upperArch",
  "lowerArch",
  "front",
  "rightLateral",
  "leftLateral",
  "smile",
  "profile",
  "overjet",
  "detail",
  "xray",
  "render3d",
];

export const caseImageViewLabels: Record<CaseImageView, Record<Locale, string>> = {
  upperArch: { it: "Arcata superiore", en: "Upper arch", es: "Arcada superior" },
  lowerArch: { it: "Arcata inferiore", en: "Lower arch", es: "Arcada inferior" },
  front: { it: "Frontale", en: "Frontal", es: "Frontal" },
  rightLateral: { it: "Laterale destra", en: "Right lateral", es: "Lateral derecha" },
  leftLateral: { it: "Laterale sinistra", en: "Left lateral", es: "Lateral izquierda" },
  smile: { it: "Sorriso", en: "Smile", es: "Sonrisa" },
  profile: { it: "Profilo", en: "Profile", es: "Perfil" },
  overjet: { it: "Overjet", en: "Overjet", es: "Overjet" },
  detail: { it: "Dettaglio clinico", en: "Clinical detail", es: "Detalle clinico" },
  xray: { it: "Radiografia", en: "X-ray", es: "Radiografia" },
  render3d: { it: "Render 3D", en: "3D render", es: "Render 3D" },
};

export type CaseImage = {
  /** e.g. "/images/cases/affollamento/affollamento-adulto-01/before-front.jpg" */
  src: string;
  kind: CaseImageKind;
  /** Pairs before/after images by clinical view. Required for before/after galleries. */
  view?: CaseImageView;
  alt: Record<Locale, string>;
};

export type CaseImagePair = {
  view: CaseImageView;
  before: CaseImage;
  after: CaseImage;
};

export type ClinicalCase = {
  slug: string;
  /** Which journey(s) the case is shown in. */
  audience: Audience | "both";
  /** Category label key (free text shown as-is, localized at the page if needed). */
  category: string;
  title: Record<Locale, string>;
  problem: Record<Locale, string>;
  treatment: Record<Locale, string>;
  durationMonths?: number;
  images: CaseImage[];
  consent: boolean;
  featured?: boolean;
  publishedAt: string; // ISO date
};

/**
 * Recommended minimum for a complete public case:
 *
 * - upperArch: arcata superiore
 * - lowerArch: arcata inferiore
 * - front: vista frontale
 *
 * Optional views can bring the case up to 6 comparisons: rightLateral,
 * leftLateral, smile. X-rays and 3D renders can be added only when useful.
 *
 * Example (commented). Copy this shape to add a real case:
 *
 * {
 *   slug: "affollamento-adulto-01",
 *   audience: "patients",
 *   category: "Affollamento",
 *   title: { it: "Affollamento dell'adulto", en: "Adult crowding", es: "Apinamiento del adulto" },
 *   problem: { it: "...", en: "...", es: "..." },
 *   treatment: { it: "...", en: "...", es: "..." },
 *   durationMonths: 12,
 *   images: [
 *     { src: "/images/cases/affollamento/affollamento-adulto-01/before-upper-arch.jpg", kind: "before", view: "upperArch",
 *       alt: { it: "Arcata superiore prima del trattamento", en: "Upper arch before treatment", es: "Arcada superior antes del tratamiento" } },
 *     { src: "/images/cases/affollamento/affollamento-adulto-01/after-upper-arch.jpg", kind: "after", view: "upperArch",
 *       alt: { it: "Arcata superiore dopo il trattamento", en: "Upper arch after treatment", es: "Arcada superior despues del tratamiento" } },
 *     { src: "/images/cases/affollamento/affollamento-adulto-01/before-lower-arch.jpg", kind: "before", view: "lowerArch",
 *       alt: { it: "Arcata inferiore prima del trattamento", en: "Lower arch before treatment", es: "Arcada inferior antes del tratamiento" } },
 *     { src: "/images/cases/affollamento/affollamento-adulto-01/after-lower-arch.jpg", kind: "after", view: "lowerArch",
 *       alt: { it: "Arcata inferiore dopo il trattamento", en: "Lower arch after treatment", es: "Arcada inferior despues del tratamiento" } },
 *     { src: "/images/cases/affollamento/affollamento-adulto-01/before-front.jpg", kind: "before", view: "front",
 *       alt: { it: "Vista frontale prima del trattamento", en: "Frontal view before treatment", es: "Vista frontal antes del tratamiento" } },
 *     { src: "/images/cases/affollamento/affollamento-adulto-01/after-front.jpg", kind: "after", view: "front",
 *       alt: { it: "Vista frontale dopo il trattamento", en: "Frontal view after treatment", es: "Vista frontal despues del tratamiento" } },
 *   ],
 *   consent: true,
 *   publishedAt: "2026-01-01",
 * },
 */
function text(it: string, en: string, es: string): Record<Locale, string> {
  return { it, en, es };
}

const categoryCopy: Record<string, Record<Locale, string>> = {
  "affollamento": text("Affollamento", "Crowding", "Apinamiento"),
  "agenesie": text("Agenesie", "Agenesis", "Agenesias"),
  "casi-complessi": text("Casi complessi", "Complex cases", "Casos complejos"),
  "estetico": text("Estetico", "Aesthetic", "Estetico"),
  "morso-aperto": text("Morso aperto", "Open bite", "Mordida abierta"),
  "morso-coperto": text("Morso coperto", "Deep bite", "Mordida profunda"),
  "morso-crociato": text("Morso crociato", "Crossbite", "Mordida cruzada"),
  "parodontale": text("Parodontale", "Periodontal", "Periodontal"),
  "pre-protesico": text("Pre-Protesico", "Pre-prosthetic", "Preprotesico"),
  "seconda-classe": text("Seconda Classe", "Class II", "Clase II"),
  "terza-classe": text("Terza Classe", "Class III", "Clase III"),
};

const phaseCopy: Record<CaseImageKind, Record<Locale, string>> = {
  before: text("prima", "before", "antes"),
  after: text("dopo", "after", "despues"),
  intraoral: text("immagine intraorale", "intraoral image", "imagen intraoral"),
  render3d: text("render 3D", "3D render", "render 3D"),
  xray: text("radiografia", "x-ray", "radiografia"),
};

function caseProblem(categorySlug: string): Record<Locale, string> {
  const category = categoryCopy[categorySlug];
  return text(
    `Documentazione fotografica pre e post di un caso di ${category.it.toLowerCase()}.`,
    `Before and after photographic documentation of a ${category.en.toLowerCase()} case.`,
    `Documentacion fotografica antes y despues de un caso de ${category.es.toLowerCase()}.`,
  );
}

const standardTreatment = text(
  "Caso mostrato attraverso viste cliniche comparabili prima e dopo il trattamento.",
  "Case shown through comparable clinical views before and after treatment.",
  "Caso mostrado con vistas clinicas comparables antes y despues del tratamiento.",
);

function image(
  categorySlug: string,
  caseSlug: string,
  filename: string,
  kind: CaseImageKind,
  view?: CaseImageView,
): CaseImage {
  const viewLabel = view ? caseImageViewLabels[view] : undefined;
  return {
    src: `/images/cases/${categorySlug}/${caseSlug}/${filename}`,
    kind,
    view,
    alt: viewLabel
      ? text(
          `${viewLabel.it} ${phaseCopy[kind].it}`,
          `${viewLabel.en} ${phaseCopy[kind].en}`,
          `${viewLabel.es} ${phaseCopy[kind].es}`,
        )
      : phaseCopy[kind],
  };
}

function clinicalCase({
  slug,
  categorySlug,
  title,
  images,
}: {
  slug: string;
  categorySlug: keyof typeof categoryCopy;
  title: Record<Locale, string>;
  images: CaseImage[];
}): ClinicalCase {
  return {
    slug,
    audience: "both",
    category: categoryCopy[categorySlug].it,
    title,
    problem: caseProblem(categorySlug),
    treatment: standardTreatment,
    images,
    consent: true,
    publishedAt: "2026-06-18",
  };
}

export const cases: ClinicalCase[] = [
  clinicalCase({
    slug: "affollamento-adulto-01",
    categorySlug: "affollamento",
    title: text("Affollamento nell'adulto", "Adult crowding", "Apinamiento en adulto"),
    images: [
      image("affollamento", "affollamento-adulto-01", "before-upper.JPG", "before", "upperArch"),
      image("affollamento", "affollamento-adulto-01", "after-upper.JPG", "after", "upperArch"),
      image("affollamento", "affollamento-adulto-01", "before-lower.JPG", "before", "lowerArch"),
      image("affollamento", "affollamento-adulto-01", "after-lower.JPG", "after", "lowerArch"),
      image("affollamento", "affollamento-adulto-01", "before-front.JPG", "before", "front"),
      image("affollamento", "affollamento-adulto-01", "after-front.JPG", "after", "front"),
      image("affollamento", "affollamento-adulto-01", "before-right.JPG", "before", "rightLateral"),
      image("affollamento", "affollamento-adulto-01", "after-right.JPG", "after", "rightLateral"),
      image("affollamento", "affollamento-adulto-01", "before-left.JPG", "before", "leftLateral"),
      image("affollamento", "affollamento-adulto-01", "after-left.JPG", "after", "leftLateral"),
    ],
  }),
  clinicalCase({
    slug: "affollamento-bambino-01",
    categorySlug: "affollamento",
    title: text("Affollamento nel bambino", "Child crowding", "Apinamiento infantil"),
    images: [
      image("affollamento", "affollamento-bambino-01", "before-upper.JPG", "before", "upperArch"),
      image("affollamento", "affollamento-bambino-01", "after-upper.JPG", "after", "upperArch"),
      image("affollamento", "affollamento-bambino-01", "before-lower.JPG", "before", "lowerArch"),
      image("affollamento", "affollamento-bambino-01", "after-lower.JPG", "after", "lowerArch"),
      image("affollamento", "affollamento-bambino-01", "before-front.JPG", "before", "front"),
      image("affollamento", "affollamento-bambino-01", "after-front.JPG", "after", "front"),
      image("affollamento", "affollamento-bambino-01", "before-right.JPG", "before", "rightLateral"),
      image("affollamento", "affollamento-bambino-01", "after-right.JPG", "after", "rightLateral"),
      image("affollamento", "affollamento-bambino-01", "before-left.JPG", "before", "leftLateral"),
      image("affollamento", "affollamento-bambino-01", "after-left.JPG", "after", "leftLateral"),
    ],
  }),
  clinicalCase({
    slug: "agenesie-adolescente",
    categorySlug: "agenesie",
    title: text("Agenesie nell'adolescente", "Adolescent agenesis", "Agenesias en adolescente"),
    images: [
      image("agenesie", "agenesie-adolescente", "before-front.JPG", "before", "front"),
      image("agenesie", "agenesie-adolescente", "after-front.JPG", "after", "front"),
      image("agenesie", "agenesie-adolescente", "before-right.JPG", "before", "rightLateral"),
      image("agenesie", "agenesie-adolescente", "after-right.JPG", "after", "rightLateral"),
      image("agenesie", "agenesie-adolescente", "Before-left.JPG", "before", "leftLateral"),
      image("agenesie", "agenesie-adolescente", "after-left.JPG", "after", "leftLateral"),
    ],
  }),
  clinicalCase({
    slug: "agenesie-adulto",
    categorySlug: "agenesie",
    title: text("Agenesie nell'adulto", "Adult agenesis", "Agenesias en adulto"),
    images: [
      image("agenesie", "agenesie-adulto", "before-front.JPG", "before", "front"),
      image("agenesie", "agenesie-adulto", "afer-front.JPG", "after", "front"),
      image("agenesie", "agenesie-adulto", "before-right.JPG", "before", "rightLateral"),
      image("agenesie", "agenesie-adulto", "after-right.JPG", "after", "rightLateral"),
      image("agenesie", "agenesie-adulto", "before-left.JPG", "before", "leftLateral"),
      image("agenesie", "agenesie-adulto", "after-left.JPG", "after", "leftLateral"),
    ],
  }),
  clinicalCase({
    slug: "complesso-adulto",
    categorySlug: "casi-complessi",
    title: text("Caso complesso nell'adulto", "Complex adult case", "Caso complejo en adulto"),
    images: [
      image("casi-complessi", "complesso-adulto", "before-upper.JPG", "before", "upperArch"),
      image("casi-complessi", "complesso-adulto", "after.upper.JPG", "after", "upperArch"),
      image("casi-complessi", "complesso-adulto", "before-lower.jpg", "before", "lowerArch"),
      image("casi-complessi", "complesso-adulto", "after-lower.JPG", "after", "lowerArch"),
      image("casi-complessi", "complesso-adulto", "before-front.JPG", "before", "front"),
      image("casi-complessi", "complesso-adulto", "after-front.JPG", "after", "front"),
      image("casi-complessi", "complesso-adulto", "before-right.JPG", "before", "rightLateral"),
      image("casi-complessi", "complesso-adulto", "after-right.JPG", "after", "rightLateral"),
      image("casi-complessi", "complesso-adulto", "before-left.JPG", "before", "leftLateral"),
      image("casi-complessi", "complesso-adulto", "after-left.JPG", "after", "leftLateral"),
      image("casi-complessi", "complesso-adulto", "before-ovj.JPG", "before", "overjet"),
      image("casi-complessi", "complesso-adulto", "after-ovj.JPG", "after", "overjet"),
    ],
  }),
  clinicalCase({
    slug: "microdonzia",
    categorySlug: "estetico",
    title: text("Microdonzia", "Microdontia", "Microdoncia"),
    images: [
      image("estetico", "microdonzia", "before-ric.JPG", "before", "detail"),
      image("estetico", "microdonzia", "after-ric.JPG", "after", "detail"),
      image("estetico", "microdonzia", "0S3A3851.JPG", "intraoral"),
      image("estetico", "microdonzia", "0S3A3852.JPG", "intraoral"),
      image("estetico", "microdonzia", "0S3A8014.JPG", "intraoral"),
      image("estetico", "microdonzia", "0S3A8015.JPG", "intraoral"),
    ],
  }),
  clinicalCase({
    slug: "aperto-adulto",
    categorySlug: "morso-aperto",
    title: text("Morso aperto nell'adulto", "Adult open bite", "Mordida abierta en adulto"),
    images: [
      image("morso-aperto", "aperto-adulto", "before-upper.JPG", "before", "upperArch"),
      image("morso-aperto", "aperto-adulto", "after-upper.JPG", "after", "upperArch"),
      image("morso-aperto", "aperto-adulto", "before-lower.JPG", "before", "lowerArch"),
      image("morso-aperto", "aperto-adulto", "after-lower.JPG", "after", "lowerArch"),
      image("morso-aperto", "aperto-adulto", "before-front.JPG", "before", "front"),
      image("morso-aperto", "aperto-adulto", "after-front.JPG", "after", "front"),
      image("morso-aperto", "aperto-adulto", "before-right.JPG", "before", "rightLateral"),
      image("morso-aperto", "aperto-adulto", "after-right.JPG", "after", "rightLateral"),
      image("morso-aperto", "aperto-adulto", "before-left.JPG", "before", "leftLateral"),
      image("morso-aperto", "aperto-adulto", "after-left.JPG", "after", "leftLateral"),
    ],
  }),
  clinicalCase({
    slug: "coperto-adolescente",
    categorySlug: "morso-coperto",
    title: text("Morso coperto nell'adolescente", "Adolescent deep bite", "Mordida profunda en adolescente"),
    images: [
      image("morso-coperto", "coperto-adolescente", "before-front.JPG", "before", "front"),
      image("morso-coperto", "coperto-adolescente", "after-front.JPG", "after", "front"),
      image("morso-coperto", "coperto-adolescente", "before-right.JPG", "before", "rightLateral"),
      image("morso-coperto", "coperto-adolescente", "after-right.JPG", "after", "rightLateral"),
      image("morso-coperto", "coperto-adolescente", "before-left.JPG", "before", "leftLateral"),
      image("morso-coperto", "coperto-adolescente", "after-left.JPG", "after", "leftLateral"),
    ],
  }),
  clinicalCase({
    slug: "crociato-adulto",
    categorySlug: "morso-crociato",
    title: text("Morso crociato nell'adulto", "Adult crossbite", "Mordida cruzada en adulto"),
    images: [
      image("morso-crociato", "crociato-adulto", "before-upper.JPG", "before", "upperArch"),
      image("morso-crociato", "crociato-adulto", "after-upper.JPG", "after", "upperArch"),
      image("morso-crociato", "crociato-adulto", "before-lower.JPG", "before", "lowerArch"),
      image("morso-crociato", "crociato-adulto", "after-lower.JPG", "after", "lowerArch"),
      image("morso-crociato", "crociato-adulto", "before-front.JPG", "before", "front"),
      image("morso-crociato", "crociato-adulto", "after-front.JPG", "after", "front"),
      image("morso-crociato", "crociato-adulto", "before-right.JPG", "before", "rightLateral"),
      image("morso-crociato", "crociato-adulto", "after-right.JPG", "after", "rightLateral"),
      image("morso-crociato", "crociato-adulto", "before-left.JPG", "before", "leftLateral"),
      image("morso-crociato", "crociato-adulto", "after-left.JPG", "after", "leftLateral"),
    ],
  }),
  clinicalCase({
    slug: "parodontale",
    categorySlug: "parodontale",
    title: text("Caso parodontale", "Periodontal case", "Caso periodontal"),
    images: [
      image("parodontale", "parodontale", "before-front.JPG", "before", "front"),
      image("parodontale", "parodontale", "after-front.JPG", "after", "front"),
      image("parodontale", "parodontale", "before-right.JPG", "before", "rightLateral"),
      image("parodontale", "parodontale", "after-right.JPG", "after", "rightLateral"),
      image("parodontale", "parodontale", "before-left.JPG", "before", "leftLateral"),
      image("parodontale", "parodontale", "after-left.JPG", "after", "leftLateral"),
      image("parodontale", "parodontale", "before-ovj.JPG", "before", "overjet"),
      image("parodontale", "parodontale", "after-ovj.JPG", "after", "overjet"),
      image("parodontale", "parodontale", "before-prot.JPG", "before", "detail"),
      image("parodontale", "parodontale", "after-prot.JPG", "after", "detail"),
    ],
  }),
  clinicalCase({
    slug: "protesico-adulto",
    categorySlug: "pre-protesico",
    title: text("Caso pre-protesico nell'adulto", "Adult pre-prosthetic case", "Caso preprotesico en adulto"),
    images: [
      image("pre-protesico", "protesico-adulto", "before-upper.JPG", "before", "upperArch"),
      image("pre-protesico", "protesico-adulto", "after-upper.JPG", "after", "upperArch"),
      image("pre-protesico", "protesico-adulto", "before-lower.JPG", "before", "lowerArch"),
      image("pre-protesico", "protesico-adulto", "after-lower.JPG", "after", "lowerArch"),
      image("pre-protesico", "protesico-adulto", "before-front.JPG", "before", "front"),
      image("pre-protesico", "protesico-adulto", "after-front.JPG", "after", "front"),
      image("pre-protesico", "protesico-adulto", "before-smile.JPG", "before", "smile"),
      image("pre-protesico", "protesico-adulto", "after-smile.jpg", "after", "smile"),
    ],
  }),
  clinicalCase({
    slug: "seconda-adolescente",
    categorySlug: "seconda-classe",
    title: text("Seconda Classe nell'adolescente", "Adolescent Class II", "Clase II en adolescente"),
    images: [
      image("seconda-classe", "seconda-adolescente", "before-front.JPG", "before", "front"),
      image("seconda-classe", "seconda-adolescente", "after-front.JPG", "after", "front"),
      image("seconda-classe", "seconda-adolescente", "before-right.JPG", "before", "rightLateral"),
      image("seconda-classe", "seconda-adolescente", "after-right.JPG", "after", "rightLateral"),
      image("seconda-classe", "seconda-adolescente", "before-left.JPG", "before", "leftLateral"),
      image("seconda-classe", "seconda-adolescente", "after-left.JPG", "after", "leftLateral"),
    ],
  }),
  clinicalCase({
    slug: "terza-adulto",
    categorySlug: "terza-classe",
    title: text("Terza Classe nell'adulto", "Adult Class III", "Clase III en adulto"),
    images: [
      image("terza-classe", "terza-adulto", "before-front.JPG", "before", "front"),
      image("terza-classe", "terza-adulto", "after-front.JPG", "after", "front"),
      image("terza-classe", "terza-adulto", "before-right.JPG", "before", "rightLateral"),
      image("terza-classe", "terza-adulto", "after-right.JPG", "after", "rightLateral"),
      image("terza-classe", "terza-adulto", "before-left.JPG", "before", "leftLateral"),
      image("terza-classe", "terza-adulto", "after-left.JPG", "after", "leftLateral"),
    ],
  }),
];

export function casesForAudience(audience: Audience): ClinicalCase[] {
  return cases.filter((c) => c.audience === audience || c.audience === "both");
}

export function caseBySlug(slug: string): ClinicalCase | undefined {
  return cases.find((c) => c.slug === slug);
}

export function caseImage(
  c: ClinicalCase,
  kind: CaseImageKind,
  view?: CaseImageView,
): CaseImage | undefined {
  return c.images.find((i) => i.kind === kind && (!view || i.view === view));
}

export function caseImagePairs(c: ClinicalCase): CaseImagePair[] {
  return caseImageViewOrder
    .map((view) => {
      const before = caseImage(c, "before", view);
      const after = caseImage(c, "after", view);
      return before && after ? { view, before, after } : undefined;
    })
    .filter((pair): pair is CaseImagePair => Boolean(pair));
}
