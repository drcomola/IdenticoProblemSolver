/**
 * Content model. Page text lives in structured TypeScript objects (per the Stack
 * spec — no CMS in Phase 1). Strong typing keeps every locale in sync.
 */

export type SeoMeta = {
  title: string;
  description: string;
};

export type Cta = {
  label: string;
  /** Audience + section this CTA points to, resolved to a localized path at render. */
  target:
    | { kind: "section"; audience: "patients" | "colleagues"; section: string }
    | { kind: "audience"; audience: "patients" | "colleagues" }
    | { kind: "home" }
    | { kind: "external"; href: string };
};

/** A generic content block: heading + list of short points. */
export type ListBlock = {
  heading: string;
  items: string[];
};

/** A short statement block: heading + paragraph. */
export type StatementBlock = {
  heading: string;
  body: string;
};

export type AudienceHome = {
  seo: SeoMeta;
  /** The single H1 for the page. */
  h1: string;
  subtitle: string;
  intro?: string;
  /** "Who it is for" style list. */
  audienceList?: ListBlock;
  /** Key message / editorial promise. */
  keyMessage?: StatementBlock;
  primaryCta: Cta;
  secondaryCta: Cta;
  imageNote: string;
};

export type LandingContent = {
  seo: SeoMeta;
  h1: string;
  subtitle: string;
  keyMessage: string;
  patientChoice: { label: string; description: string };
  colleagueChoice: { label: string; description: string };
  primaryCta: string;
  changeLanguageLabel: string;
};

/* ------------------------------------------------------------------ */
/* Section pages (block-based)                                          */
/* ------------------------------------------------------------------ */

export type FaqEntry = { question: string; answer: string };

export type FormField = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "textarea" | "select";
  required?: boolean;
  options?: string[];
};

/** A section page is composed of an ordered list of typed blocks. */
export type Block =
  | { type: "list"; heading: string; items: string[]; columns?: 2 | 3 }
  | { type: "statement"; heading: string; body: string }
  | {
      type: "imageGallery";
      images: {
        src: string;
        alt: string;
        caption?: string;
        wide?: boolean;
      }[];
    }
  | {
      type: "video";
      src: string;
      poster?: string;
      title: string;
      caption?: string;
    }
  | { type: "faq"; heading?: string; items: FaqEntry[] }
  | {
      type: "cases";
      heading: string;
      categories: string[];
      disclaimer?: string;
    }
  | { type: "clinics"; heading: string; steps: string[]; note?: string }
  | {
      type: "form";
      heading?: string;
      fields: FormField[];
      microcopy?: string;
      submitLabel: string;
    }
  | {
      type: "game";
      heading: string;
      src: string;
      title: string;
      directLinkLabel: string;
    };

export type SectionContent = {
  seo: SeoMeta;
  h1: string;
  subtitle: string;
  /** Slightly fuller intro paragraph shown under the hero subtitle. */
  lead?: string;
  blocks: Block[];
  primaryCta: Cta;
  secondaryCta: Cta;
  /** Optional editable note for the page's image slot. */
  imageNote?: string;
};

/** All section pages for one audience, keyed by language-agnostic section key. */
export type AudienceSections = Record<string, SectionContent>;

export type LocaleContent = {
  landing: LandingContent;
  patients: AudienceHome;
  colleagues: AudienceHome;
  patientsSections: AudienceSections;
  colleaguesSections: AudienceSections;
};

/** UI chrome strings shared across pages (header, footer, selectors, common labels). */
export type Dictionary = {
  brandName: string;
  brandTagline: string;
  nav: {
    patients: string;
    colleagues: string;
    home: string;
  };
  languageSelector: {
    label: string;
    ariaLabel: string;
  };
  audienceSelector: {
    patients: string;
    colleagues: string;
  };
  gateway: {
    welcome: string;
    intro: string;
    chooseLanguage: string;
    choosePath: string;
    patient: { label: string; description: string };
    colleague: { label: string; description: string };
    enter: string;
  };
  form: {
    success: string;
    consent: string;
    /** Subject lines for the generated mailto messages. */
    patientSubject: string;
    colleagueSubject: string;
    /** Hint shown near the submit button explaining the email client opens. */
    mailtoHint: string;
  };
  clinics: {
    call: string;
    whatsapp: string;
    email: string;
    directions: string;
    showMap: string;
    selectLabel: string;
    selectPlaceholder: string;
    contactTitle: string;
    mapOverviewTitle: string;
  };
  footer: {
    sectionsTitle: string;
    languagesTitle: string;
    legalTitle: string;
    privacy: string;
    cookie: string;
    disclaimer: string;
    medicalNote: string;
    rights: string;
  };
  cookie: {
    message: string;
    accept: string;
    essential: string;
    more: string;
  };
  skipToContent: string;
};
