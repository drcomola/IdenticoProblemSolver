"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { CaseCategoryKey, CasePreview, PatientType } from "@/content/cases";
import type { ExplorerStrings } from "@/content/casesQuiz";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { CaseCard } from "@/components/ui/CaseCard";
import { Icon, type IconName } from "@/components/ui/icons";

type Strings = ExplorerStrings;

export type CategoryEntry = { key: CaseCategoryKey; label: string; count: number };

export type QuizOptionL = {
  id: string;
  label: string;
  categories?: CaseCategoryKey[];
  tags?: string[];
  patientType?: PatientType;
};
export type QuizQuestionL = { id: string; question: string; options: QuizOptionL[] };

const categoryIcon: Record<CaseCategoryKey, IconName> = {
  crowding: "aligner",
  "deep-bite": "aligner",
  "open-bite": "aligner",
  crossbite: "aligner",
  "class-ii": "scan",
  "class-iii": "scan",
  spacing: "aligner",
  "impacted-canine": "stethoscope",
  interceptive: "user",
  interdisciplinary: "cases",
  relapse: "calendar",
};

export function ClinicalCasesExplorer({
  strings,
  categories,
  previews,
  questions,
  basePath,
  bookHref,
}: {
  strings: Strings;
  categories: CategoryEntry[];
  previews: CasePreview[];
  questions: QuizQuestionL[];
  basePath: string;
  bookHref: string;
}) {
  const [mode, setMode] = useState<"browse" | "quiz">("browse");

  return (
    <section className="bg-canvas">
      <Container className="py-12 sm:py-16">
        {/* Mode tabs */}
        <div className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-2">
          <ModeCard
            active={mode === "browse"}
            icon="cases"
            label={strings.tabBrowse}
            onClick={() => setMode("browse")}
          />
          <ModeCard
            active={mode === "quiz"}
            icon="faq"
            label={strings.tabQuiz}
            onClick={() => setMode("quiz")}
          />
        </div>

        <div className="mt-12">
          {mode === "browse" ? (
            <BrowsePanel
              strings={strings}
              categories={categories}
              previews={previews}
              basePath={basePath}
            />
          ) : (
            <QuizPanel
              strings={strings}
              questions={questions}
              previews={previews}
              basePath={basePath}
              bookHref={bookHref}
            />
          )}
        </div>
      </Container>
    </section>
  );
}

function ModeCard({
  active,
  icon,
  label,
  onClick,
}: {
  active: boolean;
  icon: IconName;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={[
        "flex items-center gap-4 rounded-2xl border p-5 text-left transition-all duration-300",
        active
          ? "border-teal/60 bg-teal-deep text-canvas shadow-soft"
          : "border-titanium/60 bg-white text-teal-deep hover:-translate-y-0.5 hover:border-aqua/50",
      ].join(" ")}
    >
      <span
        className={[
          "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl",
          active ? "bg-white/10 text-canvas" : "bg-teal-deep/6 text-teal",
        ].join(" ")}
      >
        <Icon name={icon} className="h-6 w-6" />
      </span>
      <span className="text-base font-semibold">{label}</span>
    </button>
  );
}

/* ----------------------------- Browse ----------------------------- */

function BrowsePanel({
  strings,
  categories,
  previews,
  basePath,
}: {
  strings: Strings;
  categories: CategoryEntry[];
  previews: CasePreview[];
  basePath: string;
}) {
  const [selected, setSelected] = useState<CaseCategoryKey | null>(null);
  const reduce = useReducedMotion();

  const filtered = useMemo(
    () => (selected ? previews.filter((p) => p.categories.includes(selected)) : []),
    [selected, previews],
  );

  if (selected) {
    const cat = categories.find((c) => c.key === selected);
    return (
      <div>
        <div className="mb-8 flex items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold text-teal-deep sm:text-3xl">
            {cat?.label} · {strings.casesIn}
          </h2>
          <button
            type="button"
            onClick={() => setSelected(null)}
            className="inline-flex items-center gap-1.5 rounded-full border border-teal-deep/25 px-4 py-2 text-sm font-medium text-teal-deep transition-colors hover:bg-teal-deep/5"
          >
            ← {strings.allCases}
          </button>
        </div>
        {filtered.length ? (
          <CaseGrid previews={filtered} basePath={basePath} viewLabel={strings.viewCase} />
        ) : (
          <p className="text-ink/60">{strings.noCasesYet}</p>
        )}
      </div>
    );
  }

  return (
    <div>
      <p className="mb-8 text-center text-ink/70">{strings.browseIntro}</p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c, i) => (
          <motion.button
            key={c.key}
            type="button"
            onClick={() => setSelected(c.key)}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: i * 0.03 }}
            className="group flex items-center gap-4 rounded-2xl border border-titanium/60 bg-white p-5 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-aqua/50 hover:shadow-soft"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-deep/6 text-teal ring-1 ring-teal-deep/8 transition-colors group-hover:bg-aqua/15">
              <Icon name={categoryIcon[c.key]} className="h-6 w-6" />
            </span>
            <span className="min-w-0">
              <span className="block font-medium text-teal-deep">{c.label}</span>
              <span className="text-xs text-ink/55">{c.count}</span>
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

function CaseGrid({
  previews,
  basePath,
  viewLabel,
}: {
  previews: CasePreview[];
  basePath: string;
  viewLabel: string;
}) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {previews.map((p) => (
        <CaseCard
          key={p.slug}
          category={p.primaryCategoryLabel}
          imageLabel={p.title}
          title={p.title}
          href={`${basePath}/${p.slug}`}
          beforeImageSrc={p.beforeSrc}
          afterImageSrc={p.afterSrc}
          beforeImageAlt={p.beforeAlt}
          afterImageAlt={p.afterAlt}
        />
      ))}
    </div>
  );
}

/* ------------------------------ Quiz ------------------------------ */

function QuizPanel({
  strings,
  questions,
  previews,
  basePath,
  bookHref,
}: {
  strings: Strings;
  questions: QuizQuestionL[];
  previews: CasePreview[];
  basePath: string;
  bookHref: string;
}) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const reduce = useReducedMotion();

  const total = questions.length;

  function choose(qId: string, optId: string) {
    setAnswers((a) => ({ ...a, [qId]: optId }));
    if (step + 1 < total) setStep(step + 1);
    else setDone(true);
  }

  function restart() {
    setAnswers({});
    setStep(0);
    setDone(false);
  }

  if (done) {
    return (
      <QuizResult
        strings={strings}
        results={matchCases(questions, answers, previews)}
        basePath={basePath}
        bookHref={bookHref}
        onRestart={restart}
      />
    );
  }

  const q = questions[step];
  const progress = ((step + 1) / total) * 100;

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs font-medium text-ink/55">
          <span>{strings.quizStep.replace("{n}", String(step + 1)).replace("{total}", String(total))}</span>
          {step > 0 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="inline-flex items-center gap-1 text-teal-deep hover:text-teal"
            >
              ← {strings.back}
            </button>
          ) : null}
        </div>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-titanium/40">
          <div
            className="h-full rounded-full bg-teal-deep transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={q.id}
          initial={reduce ? false : { opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={reduce ? undefined : { opacity: 0, x: -24 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-xl font-semibold text-teal-deep sm:text-2xl">{q.question}</h2>
          <div className="mt-6 grid gap-3">
            {q.options.map((o) => (
              <button
                key={o.id}
                type="button"
                onClick={() => choose(q.id, o.id)}
                className="rounded-xl border border-titanium/60 bg-white px-5 py-4 text-left text-[0.97rem] text-ink/85 transition-all duration-200 hover:-translate-y-0.5 hover:border-aqua/60 hover:bg-aqua/[0.04] hover:text-teal-deep"
              >
                {o.label}
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <p className="mt-8 text-xs leading-relaxed text-ink/50">{strings.disclaimer}</p>
    </div>
  );
}

function QuizResult({
  strings,
  results,
  basePath,
  bookHref,
  onRestart,
}: {
  strings: Strings;
  results: { previews: CasePreview[]; isFallback: boolean };
  basePath: string;
  bookHref: string;
  onRestart: () => void;
}) {
  return (
    <div className="mx-auto max-w-5xl">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-2xl font-semibold text-teal-deep sm:text-3xl">
          {strings.resultTitle}
        </h2>
        <p className="mt-4 leading-relaxed text-ink/70">
          {results.isFallback ? strings.noMatchText : strings.resultText}
        </p>
      </div>

      <div className="mt-10">
        <CaseGrid previews={results.previews} basePath={basePath} viewLabel={strings.viewCase} />
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Button href={bookHref} variant="primary">
          {strings.resultCta}
        </Button>
        <button
          type="button"
          onClick={onRestart}
          className="inline-flex items-center gap-1.5 rounded-full border border-teal-deep/25 px-5 py-3 text-sm font-medium text-teal-deep transition-colors hover:bg-teal-deep/5"
        >
          ↺ {strings.restart}
        </button>
      </div>

      <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-relaxed text-ink/50">
        {strings.disclaimer}
      </p>
    </div>
  );
}

/* --------------------------- matching ----------------------------- */

function matchCases(
  questions: QuizQuestionL[],
  answers: Record<string, string>,
  previews: CasePreview[],
): { previews: CasePreview[]; isFallback: boolean } {
  const catWeight = new Map<CaseCategoryKey, number>();
  const tagSet = new Set<string>();
  let patientType: PatientType | undefined;

  for (const q of questions) {
    const optId = answers[q.id];
    if (!optId) continue;
    const opt = q.options.find((o) => o.id === optId);
    if (!opt) continue;
    opt.categories?.forEach((c) => catWeight.set(c, (catWeight.get(c) ?? 0) + 1));
    opt.tags?.forEach((t) => tagSet.add(t));
    if (opt.patientType) patientType = opt.patientType;
  }

  const scored = previews
    .map((p) => {
      let score = 0;
      p.categories.forEach((c) => {
        if (catWeight.has(c)) score += catWeight.get(c)! * 2;
      });
      p.tags.forEach((t) => {
        if (tagSet.has(t)) score += 1;
      });
      if (patientType && p.patientType === patientType) score += 1;
      return { p, score };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);

  if (!scored.length) {
    const fallback = previews.filter((p) => p.featured).slice(0, 6);
    return {
      previews: (fallback.length ? fallback : previews.slice(0, 6)),
      isFallback: true,
    };
  }

  return { previews: scored.slice(0, 6).map((s) => s.p), isFallback: false };
}
