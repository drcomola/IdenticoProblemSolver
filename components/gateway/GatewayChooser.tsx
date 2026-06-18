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
 * Welcome gateway. The visitor first picks a language and then a path
 * (patient / colleague). Choosing a path navigates to that audience's home.
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
      <div className="bg-technical-grid pointer-events-none absolute inset-0" />
      <Filigree tone="dark" />
      <div className="relative z-10 w-full max-w-4xl text-center">
        <Reveal>
          <Logo tone="dark" priority className="mx-auto h-32 w-auto sm:h-40" />
        </Reveal>

        <Reveal delay={0.06}>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.3em] text-aqua">
            {g.welcome}
          </p>
          <h1 className="mt-3 font-display text-5xl font-semibold leading-[1.04] sm:text-6xl lg:text-7xl">
            Dr. Giorgio Comola
          </h1>
          <p className="mt-4 text-sm font-semibold uppercase tracking-[0.24em] text-muted sm:text-base">
            {SITE_TAGLINE}
          </p>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-canvas/70">
            {g.intro}
          </p>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="mt-12 text-xs font-semibold uppercase tracking-[0.2em] text-canvas/45">
            {g.chooseLanguage}
          </p>
          <div
            className="mt-4 flex justify-center gap-2"
            role="group"
            aria-label={g.chooseLanguage}
          >
            {locales.map((l) => {
              const active = l === locale;
              return (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLocale(l)}
                  aria-pressed={active}
                  className={[
                    "flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-300",
                    active
                      ? "border-aqua bg-aqua text-night shadow-[0_0_24px_-12px_rgba(0,221,249,0.95)]"
                      : "border-white/15 bg-white/[0.03] text-canvas/[0.62] hover:border-aqua/45 hover:text-canvas",
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

        <Reveal delay={0.18}>
          <p className="mt-12 text-xs font-semibold uppercase tracking-[0.2em] text-canvas/45">
            {g.choosePath}
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {cards.map(({ audience, label, description, Icon }) => (
              <Link
                key={audience}
                href={audiencePath(locale, audience)}
                className="group flex min-h-[17rem] flex-col items-center rounded-xl border border-white/[0.12] bg-white/[0.045] p-8 text-center shadow-panel backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-aqua/60 hover:bg-white/[0.075]"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-lg bg-aqua/10 text-aqua ring-1 ring-aqua/20 transition-colors duration-300 group-hover:bg-aqua/[0.18]">
                  <Icon className="h-8 w-8" />
                </span>
                <span className="mt-5 text-xl font-semibold text-canvas">{label}</span>
                <span className="mt-3 text-sm leading-relaxed text-canvas/[0.62]">
                  {description}
                </span>
                <span className="mt-auto pt-7 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-aqua transition-all duration-300 group-hover:gap-3">
                  {g.enter} <span aria-hidden>-&gt;</span>
                </span>
              </Link>
            ))}
          </div>
        </Reveal>
      </div>
    </main>
  );
}
