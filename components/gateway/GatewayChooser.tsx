"use client";

import Link from "next/link";
import { useState } from "react";
import { locales, localeNames, type Locale } from "@/lib/i18n";
import { audiencePath, sectionPath } from "@/lib/routes";
import { SITE_TAGLINE } from "@/lib/seo";
import type { Dictionary } from "@/content/types";
import { Flag, PatientIcon, ColleagueIcon } from "@/components/ui/Flag";
import { Logo } from "@/components/ui/Logo";
import { Filigree } from "@/components/ui/Filigree";
import { Reveal } from "@/components/ui/Reveal";
import { AlignerIcon } from "@/components/icons/BrandIcons";

type GatewayDict = Dictionary["gateway"];

export function GatewayChooser({
  gateways,
}: {
  gateways: Record<Locale, GatewayDict>;
}) {
  const [locale, setLocale] = useState<Locale>("it");
  const g = gateways[locale];

  const cards = [
    {
      key: "patients",
      href: audiencePath(locale, "patients"),
      label: g.patient.label,
      description: g.patient.description,
      Icon: PatientIcon,
    },
    {
      key: "colleagues",
      href: audiencePath(locale, "colleagues"),
      label: g.colleague.label,
      description: g.colleague.description,
      Icon: ColleagueIcon,
    },
    {
      key: "aligner-support",
      href: sectionPath(locale, "patients", "aligner-support"),
      label: g.alignerSupport.label,
      description: g.alignerSupport.description,
      Icon: AlignerIcon,
    },
  ];

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-x-hidden bg-night-field px-5 py-5 text-canvas sm:px-6 sm:py-7">
      <div className="bg-technical-grid pointer-events-none absolute inset-0" />
      <Filigree tone="dark" />

      <div className="relative z-10 w-full max-w-6xl text-center">
        <Reveal>
          <Logo tone="dark" priority className="mx-auto h-16 w-auto sm:h-20" />
        </Reveal>

        <Reveal delay={0.04}>
          <p className="mt-2 text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-aqua">
            {g.welcome}
          </p>
          <h1 className="mt-1 font-display text-3xl font-semibold leading-none sm:text-4xl lg:text-5xl">
            Dr. Giorgio Comola
          </h1>
          <p className="mt-2 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-muted sm:text-xs">
            {SITE_TAGLINE}
          </p>
          <p className="mx-auto mt-2 max-w-xl text-xs leading-relaxed text-canvas/70 sm:text-sm">
            {g.intro}
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div
            className="mt-4 flex justify-center gap-2"
            role="group"
            aria-label={g.chooseLanguage}
          >
            {locales.map((language) => {
              const active = language === locale;
              return (
                <button
                  key={language}
                  type="button"
                  onClick={() => setLocale(language)}
                  aria-pressed={active}
                  className={[
                    "flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all duration-300",
                    active
                      ? "border-aqua bg-aqua text-night shadow-[0_0_24px_-12px_rgba(0,221,249,0.95)]"
                      : "border-white/15 bg-white/[0.03] text-canvas/[0.62] hover:border-aqua/45 hover:text-canvas",
                  ].join(" ")}
                >
                  <Flag locale={language} className="h-3.5 w-5 rounded-sm shadow-sm" />
                  <span className="uppercase tracking-wide">{language}</span>
                  <span className="sr-only">{localeNames[language]}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="mt-4 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-canvas/45">
            {g.choosePath}
          </p>
          <div className="mt-2.5 grid gap-3 sm:grid-cols-3">
            {cards.map(({ key, href, label, description, Icon }) => (
              <Link
                key={key}
                href={href}
                className="group flex min-h-[11.5rem] flex-col items-center rounded-xl border border-white/[0.12] bg-white/[0.045] p-4 text-center shadow-panel backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-aqua/60 hover:bg-white/[0.075] sm:p-5"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-aqua/10 text-aqua ring-1 ring-aqua/20 transition-colors duration-300 group-hover:bg-aqua/[0.18]">
                  <Icon className="h-7 w-7" />
                </span>
                <span className="mt-3 text-lg font-semibold leading-tight text-canvas">
                  {label}
                </span>
                <span className="mt-1.5 text-xs leading-relaxed text-canvas/[0.62] sm:text-sm">
                  {description}
                </span>
                <span className="mt-auto inline-flex items-center gap-2 pt-3 text-xs font-semibold uppercase tracking-[0.14em] text-aqua transition-all duration-300 group-hover:gap-3">
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
