"use client";

import { useMemo, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { sectionPath } from "@/lib/routes";
import sourceData from "@/content/troubleshooting.json";
import { Container } from "@/components/ui/Container";

type Category = {
  id: string;
  label: string;
  icon: SupportIconName;
};

type TroubleshootingItem = {
  id: string;
  category: string;
  categoryId: string;
  icon: SupportIconName;
  title: string;
  keywords: string[];
  shortAnswer: string;
  whatToDo: string;
  whenToContactClinic: string;
  whatToAvoid: string;
  relatedItems: string[];
  disclaimer: string;
};

type SupportIconName =
  | "aligner"
  | "attachment"
  | "elastic"
  | "pain"
  | "tracking"
  | "hygiene"
  | "retention"
  | "urgency"
  | "search"
  | "guide"
  | "browse";

type Mode = "search" | "guide" | "browse";

const data = sourceData as {
  categories: Category[];
  items: TroubleshootingItem[];
};

const ui = {
  it: {
    eyebrow: "Guida pazienti · risposte predefinite",
    title: "Supporto Allineatori",
    subtitle: "Risposte rapide ai dubbi più comuni durante il trattamento con allineatori.",
    disclaimer:
      "Questa guida non sostituisce una visita clinica. Ti aiuta a capire cosa fare nei casi più frequenti.",
    modes: {
      search: ["Descrivo il mio problema", "Scrivi cosa sta succedendo e trova l'indicazione più vicina."],
      guide: ["Aiutami a identificarlo", "Scegli il tipo di problema per restringere rapidamente le risposte."],
      browse: ["Sfoglio dubbi e perplessità", "Consulta tutte le domande frequenti divise per argomento."],
    },
    searchLabel: "Descrivi il problema",
    placeholder: "Es. ho perso una mascherina, sento dolore…",
    initialResults: "Domande frequenti",
    results: "Risultati",
    noResults: "Nessuna risposta precisa. Prova con parole diverse o consulta le categorie.",
    guidedTitle: "Che tipo di problema hai?",
    browseTitle: "Scegli un argomento",
    questions: "domande",
    short: "Risposta breve",
    now: "Cosa fare subito",
    contact: "Quando contattare lo studio",
    avoid: "Cosa evitare",
    related: "Problemi correlati",
    contactTitle: "Non hai trovato la risposta?",
    contactText: "Se il problema persiste o non sei sicuro, contatta lo studio di riferimento.",
    contactCta: "Contatta lo studio",
    medical:
      "Questa guida contiene esclusivamente risposte predefinite e non sostituisce una valutazione clinica. In caso di trauma, gonfiore, pus, febbre, sanguinamento importante o dolore intenso, contatta lo studio o un odontoiatra senza attendere.",
  },
  en: {
    eyebrow: "Patient guide · predefined answers",
    title: "Aligner Support",
    subtitle: "Quick answers to the most common questions during clear aligner treatment.",
    disclaimer:
      "This guide does not replace a clinical appointment. It helps you understand what to do in common situations.",
    modes: {
      search: ["Describe my problem", "Describe what is happening and find the closest prepared guidance."],
      guide: ["Help me identify it", "Choose the type of issue to quickly narrow down the answers."],
      browse: ["Browse questions and concerns", "Explore all frequent questions organised by topic."],
    },
    searchLabel: "Describe the problem",
    placeholder: "E.g. I lost an aligner, I feel pain…",
    initialResults: "Frequent questions",
    results: "Results",
    noResults: "No precise answer found. Try different words or browse the categories.",
    guidedTitle: "What type of problem do you have?",
    browseTitle: "Choose a topic",
    questions: "questions",
    short: "Short answer",
    now: "What to do now",
    contact: "When to contact the clinic",
    avoid: "What to avoid",
    related: "Related questions",
    contactTitle: "Couldn’t find the answer?",
    contactText: "If the problem persists or you are unsure, contact your reference clinic.",
    contactCta: "Contact the clinic",
    medical:
      "This guide contains predefined answers only and does not replace a clinical assessment. In case of trauma, swelling, pus, fever, significant bleeding or severe pain, contact the clinic or a dentist without delay.",
  },
  es: {
    eyebrow: "Guía para pacientes · respuestas predefinidas",
    title: "Soporte Alineadores",
    subtitle: "Respuestas rápidas a las dudas más comunes durante el tratamiento con alineadores.",
    disclaimer:
      "Esta guía no sustituye una visita clínica. Te ayuda a entender qué hacer en los casos más frecuentes.",
    modes: {
      search: ["Describo mi problema", "Escribe qué está ocurriendo y encuentra la indicación más cercana."],
      guide: ["Ayúdame a identificarlo", "Elige el tipo de problema para acotar rápidamente las respuestas."],
      browse: ["Exploro dudas y preguntas", "Consulta todas las preguntas frecuentes divididas por tema."],
    },
    searchLabel: "Describe el problema",
    placeholder: "Ej. he perdido un alineador, siento dolor…",
    initialResults: "Preguntas frecuentes",
    results: "Resultados",
    noResults: "No hemos encontrado una respuesta precisa. Prueba con otras palabras o consulta las categorías.",
    guidedTitle: "¿Qué tipo de problema tienes?",
    browseTitle: "Elige un tema",
    questions: "preguntas",
    short: "Respuesta breve",
    now: "Qué hacer ahora",
    contact: "Cuándo contactar con la clínica",
    avoid: "Qué evitar",
    related: "Preguntas relacionadas",
    contactTitle: "¿No has encontrado la respuesta?",
    contactText: "Si el problema persiste o no estás seguro, contacta con tu clínica de referencia.",
    contactCta: "Contactar con la clínica",
    medical:
      "Esta guía contiene únicamente respuestas predefinidas y no sustituye una valoración clínica. En caso de traumatismo, hinchazón, pus, fiebre, sangrado importante o dolor intenso, contacta con la clínica o con un dentista sin demora.",
  },
} as const;

const categoryLabels: Record<Locale, Record<string, string>> = {
  it: {},
  en: {
    Mascherine: "Aligners",
    Attachments: "Attachments",
    "Elastici e bottoni": "Elastics and buttons",
    "Dolore e fastidio": "Pain and discomfort",
    Tracking: "Tracking",
    "Igiene e routine quotidiana": "Hygiene and daily routine",
    Contenzione: "Retention",
    "Urgenze e contatto studio": "Urgent care",
  },
  es: {
    Mascherine: "Alineadores",
    Attachments: "Attachments",
    "Elastici e bottoni": "Elásticos y botones",
    "Dolore e fastidio": "Dolor y molestias",
    Tracking: "Tracking",
    "Igiene e routine quotidiana": "Higiene y rutina diaria",
    Contenzione: "Retención",
    "Urgenze e contatto studio": "Urgencias",
  },
};

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function SupportIcon({ name, className = "h-8 w-8" }: { name: SupportIconName; className?: string }) {
  const common = {
    className,
    viewBox: "0 0 32 32",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  const paths: Record<SupportIconName, ReactNode> = {
    aligner: <><path d="M5 18c2.5-7.5 5.7-10 11-10s8.5 2.5 11 10c-3.2 3.8-7 5.8-11 5.8S8.2 21.8 5 18Z" /><path d="M8.5 17.8c2.1-4 4.4-5.6 7.5-5.6s5.4 1.6 7.5 5.6" /></>,
    attachment: <><path d="M10 5.5c1.7 0 3.6 1 6 1s4.3-1 6-1c3.4 0 5 2.6 4.3 6.2-.6 3.2-2 4.8-2.5 9.3-.5 4-2.2 6-4.2 6-2.5 0-1.8-6-3.6-6s-1.1 6-3.6 6c-2 0-3.7-2-4.2-6-.5-4.5-1.9-6.1-2.5-9.3C5 8.1 6.6 5.5 10 5.5Z" /><rect x="19.2" y="12.2" width="4.2" height="4.2" rx="1" /></>,
    elastic: <><circle cx="9" cy="16" r="6" /><circle cx="23" cy="16" r="6" /><path d="m12 21 8-10" /></>,
    pain: <><path d="M10 5.5c1.7 0 3.6 1 6 1s4.3-1 6-1c3.4 0 5 2.6 4.3 6.2-.6 3.2-2 4.8-2.5 9.3-.5 4-2.2 6-4.2 6-2.5 0-1.8-6-3.6-6s-1.1 6-3.6 6c-2 0-3.7-2-4.2-6-.5-4.5-1.9-6.1-2.5-9.3C5 8.1 6.6 5.5 10 5.5Z" /><path d="M1 16h5l2-4 3.2 8 2.1-4H18" /></>,
    tracking: <><path d="M6 18c2.4-7 5.5-9.5 10-9.5S23.6 11 26 18" /><path d="M5 13c3-6.2 6.5-8.5 11-8.5S24 6.8 27 13" strokeDasharray="2 3" /></>,
    hygiene: <><path d="M11 4.5c3 4 5.3 7.3 5.3 10.2A5.3 5.3 0 0 1 5.7 14.7C5.7 11.8 8 8.5 11 4.5Z" /><path d="M13 23c1.6-5 4.4-7 8-7s6.4 2 8 7c-2.3 2.6-5 4-8 4s-5.7-1.4-8-4Z" /></>,
    retention: <><path d="M4.8 17.8C7.6 9.9 11 7 16 7s8.4 2.9 11.2 10.8c-2.8 4.5-6.5 7.2-11.2 8.2-4.7-1-8.4-3.7-11.2-8.2Z" /><path d="M9 17.5c2.1-4.2 4.4-6 7-6s4.9 1.8 7 6" /></>,
    urgency: <><path d="M16 4 29 27H3L16 4Z" /><path d="M16 11v9M16 23.5h.01" /></>,
    search: <><circle cx="14" cy="14" r="8" /><path d="m20 20 7 7" /></>,
    guide: <><path d="M6 6h8v8H6zM18 18h8v8h-8z" /><path d="M14 10h5a3 3 0 0 1 3 3v5M10 14v8a3 3 0 0 0 3 3h5" /></>,
    browse: <><rect x="4" y="5" width="10" height="9" rx="2" /><rect x="18" y="5" width="10" height="9" rx="2" /><rect x="4" y="18" width="10" height="9" rx="2" /><rect x="18" y="18" width="10" height="9" rx="2" /></>,
  };

  return <svg {...common}>{paths[name] ?? paths.aligner}</svg>;
}

function AnswerCard({
  item,
  locale,
  onRelated,
  open,
}: {
  item: TroubleshootingItem;
  locale: Locale;
  onRelated: (item: TroubleshootingItem) => void;
  open?: boolean;
}) {
  const t = ui[locale];
  const related = item.relatedItems
    .map((id) => data.items.find((candidate) => candidate.id === id))
    .filter((candidate): candidate is TroubleshootingItem => Boolean(candidate));

  return (
    <details
      open={open}
      className="group overflow-hidden rounded-xl border border-titanium/60 bg-white shadow-soft"
    >
      <summary className="flex cursor-pointer list-none items-center gap-4 p-5 font-semibold text-teal-deep [&::-webkit-details-marker]:hidden">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-teal-deep/[0.06] text-teal-deep">
          <SupportIcon name={item.icon} className="h-7 w-7" />
        </span>
        <span>{item.title}</span>
        <span className="ml-auto text-xl font-light text-teal transition-transform group-open:rotate-45" aria-hidden>
          +
        </span>
      </summary>
      <div className="border-t border-titanium/50 px-5 pb-6 pt-5">
        <p className="text-base leading-relaxed text-ink/80">
          <strong className="text-teal-deep">{t.short}.</strong> {item.shortAnswer}
        </p>
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {[
            [t.now, item.whatToDo],
            [t.contact, item.whenToContactClinic],
            [t.avoid, item.whatToAvoid],
          ].map(([heading, body]) => (
            <section key={heading} className="rounded-lg bg-teal-deep/[0.035] p-4">
              <h3 className="text-sm font-semibold text-teal-deep">{heading}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">{body}</p>
            </section>
          ))}
        </div>
        {related.length ? (
          <div className="mt-5">
            <p className="text-sm font-semibold text-teal-deep">{t.related}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {related.map((candidate) => (
                <button
                  key={candidate.id}
                  type="button"
                  onClick={() => onRelated(candidate)}
                  className="rounded-full border border-aqua/40 bg-aqua/[0.07] px-3 py-1.5 text-left text-xs font-medium text-teal-deep transition-colors hover:bg-aqua/15"
                >
                  {candidate.title}
                </button>
              ))}
            </div>
          </div>
        ) : null}
        <p className="mt-5 text-xs leading-relaxed text-ink/45">{item.disclaimer}</p>
      </div>
    </details>
  );
}

export function AlignerSupport({ locale }: { locale: Locale }) {
  const t = ui[locale];
  const [mode, setMode] = useState<Mode>("search");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [focused, setFocused] = useState<TroubleshootingItem | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const searchResults = useMemo(() => {
    const normalizedQuery = normalize(query);
    if (!normalizedQuery) return data.items.slice(0, 4);
    const tokens = normalizedQuery.split(" ").filter((token) => token.length > 1);

    return data.items
      .map((item) => {
        const title = normalize(item.title);
        const haystack = normalize(
          [item.title, item.category, item.shortAnswer, ...item.keywords].join(" "),
        );
        const score =
          (title.includes(normalizedQuery) ? 8 : 0) +
          (haystack.includes(normalizedQuery) ? 5 : 0) +
          tokens.reduce((total, token) => total + (haystack.includes(token) ? 1 : 0), 0);
        return { item, score };
      })
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 12)
      .map(({ item }) => item);
  }, [query]);

  const categoryItems = category
    ? data.items.filter((item) => item.categoryId === category)
    : [];

  const chooseRelated = (item: TroubleshootingItem) => {
    setFocused(item);
    window.requestAnimationFrame(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const changeMode = (next: Mode) => {
    setMode(next);
    setCategory(null);
    setFocused(null);
  };

  const results = focused
    ? [focused]
    : mode === "search"
      ? searchResults
      : categoryItems;

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-canvas">
        <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full border border-aqua/20 shadow-[0_0_0_55px_rgba(79,179,191,0.035),0_0_0_110px_rgba(15,76,92,0.025)]" />
        <Container className="relative py-20 sm:py-24">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal">{t.eyebrow}</p>
          <h1 className="mt-5 max-w-4xl text-4xl font-semibold text-teal-deep sm:text-6xl">
            {t.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/75 sm:text-xl">{t.subtitle}</p>
          <p className="mt-7 max-w-3xl border-l-2 border-aqua bg-white/70 px-5 py-4 text-sm leading-relaxed text-ink/60">
            {t.disclaimer}
          </p>
        </Container>
      </section>

      <section className="bg-canvas">
        <Container className="pb-20">
          <div className="relative -mt-7 grid gap-4 md:grid-cols-3" aria-label={t.title}>
            {(Object.keys(t.modes) as Mode[]).map((itemMode) => {
              const [title, description] = t.modes[itemMode];
              const active = mode === itemMode;
              return (
                <button
                  key={itemMode}
                  type="button"
                  aria-pressed={active}
                  onClick={() => changeMode(itemMode)}
                  className={`rounded-xl border p-6 text-left shadow-soft transition-all hover:-translate-y-0.5 ${
                    active
                      ? "border-aqua/70 bg-white ring-2 ring-aqua/15"
                      : "border-titanium/60 bg-white/90 hover:border-aqua/50"
                  }`}
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-teal-deep/[0.06] text-teal-deep">
                    <SupportIcon name={itemMode} />
                  </span>
                  <h2 className="mt-5 text-lg font-semibold text-teal-deep">{title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-ink/60">{description}</p>
                </button>
              );
            })}
          </div>

          <div className="mt-8 rounded-2xl border border-titanium/55 bg-white/75 p-5 shadow-soft sm:p-8">
            {mode === "search" ? (
              <div>
                <label htmlFor="aligner-support-search" className="text-sm font-semibold text-teal-deep">
                  {t.searchLabel}
                </label>
                <div className="mt-3 flex items-center gap-3 rounded-xl border border-titanium/70 bg-white px-4 focus-within:border-aqua">
                  <SupportIcon name="search" className="h-6 w-6 shrink-0 text-teal" />
                  <input
                    id="aligner-support-search"
                    type="search"
                    value={query}
                    onChange={(event) => {
                      setQuery(event.target.value);
                      setFocused(null);
                    }}
                    placeholder={t.placeholder}
                    className="min-h-14 w-full bg-transparent py-3 text-base text-ink outline-none placeholder:text-ink/35"
                  />
                </div>
              </div>
            ) : (
              <div>
                <h2 className="text-2xl font-semibold text-teal-deep">
                  {mode === "guide" ? t.guidedTitle : t.browseTitle}
                </h2>
                <div className={`mt-6 grid gap-3 ${mode === "browse" ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
                  {data.categories.map((item) => {
                    const label = categoryLabels[locale][item.label] ?? item.label;
                    const count = data.items.filter((candidate) => candidate.categoryId === item.id).length;
                    const active = category === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        aria-pressed={active}
                        onClick={() => {
                          setCategory(item.id);
                          setFocused(null);
                        }}
                        className={`flex items-center gap-3 rounded-xl border p-4 text-left transition-colors ${
                          active
                            ? "border-aqua bg-aqua/10 text-teal-deep"
                            : "border-titanium/60 bg-white text-ink/75 hover:border-aqua/60"
                        }`}
                      >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-deep/[0.06] text-teal-deep">
                          <SupportIcon name={item.icon} className="h-6 w-6" />
                        </span>
                        <span>
                          <strong className="block text-sm">{label}</strong>
                          {mode === "browse" ? (
                            <span className="text-xs text-ink/45">{count} {t.questions}</span>
                          ) : null}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div ref={resultsRef} className="scroll-mt-28 pt-8" aria-live="polite">
              {mode === "search" || category || focused ? (
                <h2 className="mb-5 text-xl font-semibold text-teal-deep">
                  {mode === "search" && !query ? t.initialResults : t.results}
                </h2>
              ) : null}
              {results.length ? (
                <div className="space-y-3">
                  {results.map((item) => (
                    <AnswerCard
                      key={item.id}
                      item={item}
                      locale={locale}
                      onRelated={chooseRelated}
                      open={focused?.id === item.id}
                    />
                  ))}
                </div>
              ) : mode === "search" && query ? (
                <p className="rounded-xl bg-aqua/[0.08] p-5 text-sm text-ink/65">{t.noResults}</p>
              ) : null}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-aqua-wash">
        <Container className="py-16">
          <div className="flex flex-col gap-6 rounded-2xl border border-aqua/30 bg-white/85 p-7 shadow-soft sm:flex-row sm:items-center sm:justify-between sm:p-10">
            <div>
              <h2 className="text-2xl font-semibold text-teal-deep">{t.contactTitle}</h2>
              <p className="mt-2 max-w-2xl text-ink/65">{t.contactText}</p>
            </div>
            <Link
              href={sectionPath(locale, "patients", "book")}
              className="inline-flex shrink-0 items-center justify-center rounded-full bg-teal-deep px-7 py-3 text-sm font-semibold text-canvas transition-colors hover:bg-teal"
            >
              {t.contactCta}
            </Link>
          </div>
        </Container>
      </section>

      <section className="bg-night text-canvas">
        <Container className="py-7">
          <p className="mx-auto max-w-4xl text-center text-xs leading-relaxed text-canvas/60">{t.medical}</p>
        </Container>
      </section>
    </>
  );
}
