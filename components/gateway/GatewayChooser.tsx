"use client";

import Link from "next/link";
import { useState } from "react";
import { locales, localeNames, type Locale } from "@/lib/i18n";
import { audiencePath } from "@/lib/routes";
import { SITE_TAGLINE } from "@/lib/seo";
import type { Dictionary } from "@/content/types";
import { Flag, PatientIcon, ColleagueIcon } from "@/components/ui/Flag";
import { Logo } from "@/components/ui/Logo";
import { Filigree } from "@/components/ui/Filigree";
import { Reveal } from "@/components/ui/Reveal";

type GatewayDict = Dictionary["gateway"];

/**
 * Welcome gateway. The visitor first picks a language (flags) and then a path
 * (patient / colleague, with an illustrative icon). Choosing a path navigates
 * to that audience's home in the selected language.
 */
export function GatewayChooser({
  gateways,
}: {
  gateways: Record<Locale, GatewayDict>;
}) {
  const [locale, setLocale] = useState<Locale>("it");
  const g = gateways[locale];

  const cards: {
    audience: "patients" | "colleagues";
    label: string;
    description: string;
    Icon: typeof PatientIcon;
  }[] = [
    {
      audience: "patients",
      label: g.patient.label,
      description: g.patient.description,
      Icon: PatientIcon,
    },
    {
      audience: "colleagues",
      label: g.colleague.label,
      description: g.colleague.description,
      Icon: ColleagueIcon,
    },
  ];

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-night-field px-6 py-16 text-canvas">
      <Filigree tone="dark" />
      <div className="relative z-10 w-full max-w-3xl text-center">
        <Reveal>
          <Logo tone="dark" priority className="mx-auto h-32 w-auto sm:h-40" />
        </Reveal>

        <Reveal delay={0.06}>
          <p className="mt-6 text-xs font-medium uppercase tracking-[0.3em] text-aqua-dark">
            {g.welcome}
          </p>
          <h1 className="mt-3 font-display text-5xl font-semibold leading-[1.04] tracking-tightish sm:text-6xl lg:text-7xl">
            Dr. Giorgio Comola
          </h1>
          <p className="mt-4 text-sm font-medium uppercase tracking-[0.24em] text-canvas/55 sm:text-base">
            {SITE_TAGLINE}
          </p>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-canvas/70">
            {g.intro}
          </p>
        </Reveal>

        {/* Language selection — flags */}
        <Reveal delay={0.12}>
          <p className="mt-12 text-xs font-semibold uppercase tracking-[0.2em] text-canvas/45">
            {g.chooseLanguage}
          </p>
          <div className="mt-4 flex justify-center gap-3" role="group" aria-label={g.chooseLanguage}>
            {locales.map((l) => {
              const active = l === locale;
              return (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLocale(l)}
                  aria-pressed={active}
                  className={[
                    "flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300",
                    active
                      ? "border-aqua-dark bg-white/10 text-canvas"
                      : "border-white/15 text-canvas/60 hover:border-white/40 hover:text-canvas",
                  ].join(" ")}
                >
                  <Flag locale={l} className="h-4 w-6 rounded-sm shadow-sm" />
                  <span className="uppercase tracking-wide">{l}</span>
                  <span className="sr-only">{localeNames[l]}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Path selection — audience icons */}
        <Reveal delay={0.18}>
          <p className="mt-12 text-xs font-semibold uppercase tracking-[0.2em] text-canvas/45">
            {g.choosePath}
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {cards.map(({ audience, label, description, Icon }) => (
              <Link
                key={audience}
                href={audiencePath(locale, audience)}
                className="group flex flex-col items-center rounded-3xl border border-white/12 bg-white/[0.04] p-8 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-aqua-dark/70 hover:bg-white/[0.08]"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-aqua-dark/10 text-aqua-dark transition-colors duration-300 group-hover:bg-aqua-dark/20">
                  <Icon className="h-8 w-8" />
                </span>
                <span className="mt-5 text-lg font-semibold text-canvas">{label}</span>
                <span className="mt-2 text-sm leading-relaxed text-canvas/60">
                  {description}
                </span>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-aqua-dark transition-all duration-300 group-hover:gap-3">
                  {g.enter} →
                </span>
              </Link>
            ))}
          </div>
        </Reveal>
      </div>
    </main>
  );
}
