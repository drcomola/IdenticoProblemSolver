"use client";

import Link from "next/link";
import { useState } from "react";
import {
  motion,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import type { Audience, Locale } from "@/lib/i18n";
import type { SectionKey } from "@/lib/routes";
import type { DigitalSmileUi } from "@/content/digitalSmileNavigation";
import { SectionBrandIcon } from "@/components/icons/SectionBrandIcon";
import { SpeakerIcon } from "@/components/icons/BrandIcons";
import { Button } from "@/components/ui/Button";
import { AlignerSequence } from "./AlignerSequence";

export type SmileJourneyItem = {
  id: string;
  label: string;
  shortPreview: string;
  href: string;
  markerPosition: { x: number; y: number };
  code: string;
  section: SectionKey;
  audience: Audience;
};

type Props = {
  locale: Locale;
  audience: Audience;
  title: string;
  subtitle: string;
  items: SmileJourneyItem[];
  ui: DigitalSmileUi;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
};

// ─── Journey icon helper ─────────────────────────────────────────────────────
function JourneyIcon({ item, className, strokeWidth }: {
  item: SmileJourneyItem; className?: string; strokeWidth?: number;
}) {
  if (item.audience === "patients" && item.section === "about")
    return <SpeakerIcon className={className} strokeWidth={strokeWidth} />;
  return (
    <SectionBrandIcon
      audience={item.audience}
      section={item.section}
      className={className}
      strokeWidth={strokeWidth}
    />
  );
}

// ─── Orbit marker (selection button) ──────────────────────────────────────────
function Marker({ item, index, active, reducedMotion, onActivate }: {
  item: SmileJourneyItem; index: number; active: boolean;
  reducedMotion: boolean; onActivate: () => void;
}) {
  // Caption placement: fan each label radially outward from the orbit centre so
  // it clears its own node and never collides with a neighbour.
  const dx = item.markerPosition.x - 50;
  const dy = item.markerPosition.y - 52;
  const side = dx <= -16 ? "left" : dx >= 16 ? "right" : dy < 0 ? "top" : "bottom";
  const labelPos =
    side === "left"
      ? "right-full top-1/2 -translate-y-1/2 mr-3 text-right"
      : side === "right"
        ? "left-full top-1/2 -translate-y-1/2 ml-3 text-left"
        : side === "top"
          ? "bottom-full left-1/2 -translate-x-1/2 mb-3 text-center"
          : "top-full left-1/2 -translate-x-1/2 mt-3 text-center";

  return (
    <motion.div
      className="absolute z-20"
      style={{
        left: `${item.markerPosition.x}%`,
        top:  `${item.markerPosition.y}%`,
        x: "-50%", y: "-50%",
      }}
      initial={reducedMotion ? false : { opacity: 0, scale: 0.82 }}
      animate={reducedMotion ? {} : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.15 + index * 0.07, ease: "easeOut" }}
    >
      {/* Idle bob — each marker drifts on its own cadence for a lively orbit. */}
      <motion.div
        className="relative"
        animate={reducedMotion ? undefined : { y: [0, index % 2 ? 5 : -5, 0] }}
        transition={reducedMotion ? undefined : {
          duration: 4.4 + index * 0.45, repeat: Infinity, ease: "easeInOut",
        }}
      >
        {/* Contrast scrim — a soft dark vignette behind every marker so the node
            reads clearly over the animated panel behind it. */}
        <span
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 rounded-full xl:h-28 xl:w-28"
          style={{ background: "radial-gradient(circle, rgba(3,9,13,0.95) 28%, rgba(3,9,13,0.6) 55%, transparent 76%)" }}
        />
        <Link
          href={item.href}
          aria-label={`${item.label} — ${item.shortPreview}`}
          onMouseEnter={onActivate} onFocus={onActivate} onPointerDown={onActivate}
          className={[
            "group relative flex h-16 w-16 items-center justify-center rounded-full",
            "border-2 backdrop-blur-lg transition-all duration-300 xl:h-[4.6rem] xl:w-[4.6rem]",
            active
              ? "border-aqua bg-aqua/25 text-white shadow-[0_0_0_8px_rgba(79,179,191,0.18),0_0_48px_rgba(79,179,191,0.95),inset_0_0_24px_rgba(142,212,218,0.3)]"
              : "border-aqua/70 bg-[#06141b]/92 text-white shadow-[0_0_28px_rgba(79,179,191,0.45),inset_0_0_18px_rgba(79,179,191,0.16)] hover:border-aqua hover:bg-aqua/22 hover:text-white hover:shadow-[0_0_42px_rgba(79,179,191,0.8)]",
          ].join(" ")}
        >
          <JourneyIcon item={item} className="h-9 w-9 xl:h-10 xl:w-10" strokeWidth={1.7} />
          {/* Steady halo ring — always faintly visible, full on active/hover. */}
          <span className={[
            "pointer-events-none absolute inset-[-7px] rounded-full border border-aqua/45",
            "transition-opacity duration-300",
            active ? "opacity-100" : "opacity-50 group-hover:opacity-100 group-focus-visible:opacity-100",
          ].join(" ")} />
          {/* Label — on its own dark pill so the caption never gets lost. */}
          <span className={[
            "pointer-events-none absolute z-10 whitespace-nowrap rounded-full",
            "border px-2.5 py-1 backdrop-blur-md transition-colors duration-300",
            "text-[0.7rem] font-semibold uppercase tracking-[0.16em] leading-none",
            labelPos,
            active
              ? "border-aqua/55 bg-[#06141b]/92 text-aqua shadow-[0_0_18px_rgba(79,179,191,0.4)]"
              : "border-white/15 bg-[#03090d]/90 text-white/90",
          ].join(" ")}>
            {item.label}
          </span>
        </Link>
      </motion.div>
    </motion.div>
  );
}

// ─── Section strip (desktop): preview card + selection pill bar ───────────────
function SectionStrip({ items, activeId, ui, onActivate }: {
  items: SmileJourneyItem[]; activeId: string; ui: DigitalSmileUi;
  onActivate: (id: string) => void;
}) {
  const active = items.find((i) => i.id === activeId) ?? items[0];
  return (
    <div className="hidden lg:block">
      {/* Active section info card */}
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="mb-3 flex items-center gap-4 rounded-2xl border border-white/14 bg-night-panel/65 px-5 py-3 backdrop-blur-md"
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-aqua/40 bg-aqua/12 text-aqua shadow-[0_0_20px_rgba(79,179,191,0.22)]">
            <JourneyIcon item={active} className="h-6 w-6" strokeWidth={1.7} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[0.55rem] font-semibold uppercase tracking-[0.24em] text-aqua">
              {ui.previewLabel}
            </p>
            <h2 className="text-base font-semibold leading-tight text-white">{active.label}</h2>
            <p className="mt-0.5 text-[0.8rem] leading-5 text-white/72 line-clamp-1">{active.shortPreview}</p>
          </div>
          <Link
            href={active.href}
            className="shrink-0 self-center rounded-xl border border-aqua/55 px-3.5 py-1.5 text-[0.8rem] font-semibold text-aqua transition-all hover:bg-aqua hover:text-night hover:border-aqua"
          >
            {ui.openSection} →
          </Link>
        </motion.div>
      </AnimatePresence>

      {/* All-sections pill bar — the labelled selection buttons */}
      <nav aria-label={ui.sceneLabel} className="flex flex-wrap gap-1.5">
        {items.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            onMouseEnter={() => onActivate(item.id)}
            onFocus={() => onActivate(item.id)}
            className={[
              "flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-[0.72rem] font-semibold",
              "transition-all duration-200",
              item.id === activeId
                ? "border-aqua bg-aqua/16 text-aqua shadow-[0_0_16px_rgba(79,179,191,0.32)]"
                : "border-white/25 bg-[#06141b]/70 text-white/85 hover:border-aqua/55 hover:text-white",
            ].join(" ")}
          >
            <JourneyIcon item={item} className="h-3.5 w-3.5 shrink-0" strokeWidth={1.6} />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}

// ─── Mobile fallback ──────────────────────────────────────────────────────────
function MobileFallback({ items, ui, reducedMotion }: {
  items: SmileJourneyItem[]; ui: DigitalSmileUi; reducedMotion: boolean;
}) {
  return (
    <div className="lg:hidden">
      <div className="relative mt-4 overflow-hidden rounded-[1.75rem] border border-white/10 bg-[radial-gradient(circle_at_50%_60%,rgba(26,122,140,0.16),transparent_62%)]">
        <div className="bg-technical-grid pointer-events-none absolute inset-0 opacity-40" />
        <AlignerSequence reducedMotion={reducedMotion} />
      </div>
      <h2 className="mt-7 text-2xl font-semibold text-white">{ui.mobileHeading}</h2>
      <p className="mt-2 text-sm leading-7 text-white/58">{ui.mobileIntro}</p>
      <nav aria-label={ui.sceneLabel} className="mt-6 grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="group flex min-h-[8.5rem] flex-col rounded-2xl border border-white/12 bg-white/[0.04] p-5 transition-colors hover:border-aqua/52 hover:bg-white/[0.07]"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-aqua/38 bg-aqua/10 text-aqua">
              <JourneyIcon item={item} className="h-6 w-6" />
            </span>
            <h3 className="mt-4 font-semibold text-white">{item.label}</h3>
            <p className="mt-1.5 text-sm leading-6 text-white/58 line-clamp-2">{item.shortPreview}</p>
            <span className="mt-auto pt-4 text-sm font-semibold text-aqua">{ui.openSection} →</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}

// ─── Root component ───────────────────────────────────────────────────────────
export function DigitalSmileNavigation({
  locale, audience, title, subtitle, items, ui, primaryCta, secondaryCta,
}: Props) {
  const reducedMotion = useReducedMotion() ?? false;
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  return (
    <>
      <section
        data-audience={audience}
        className="relative overflow-clip bg-[#050b10] text-canvas"
      >
        <div className="bg-technical-grid pointer-events-none absolute inset-0 opacity-40" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_58%_32%,rgba(26,122,140,0.18),transparent_38%),radial-gradient(circle_at_52%_72%,rgba(79,179,191,0.09),transparent_35%),linear-gradient(180deg,#03080c_0%,#07131a_52%,#03090d_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-aqua/55 to-transparent" />

        <div className="relative z-10 flex min-h-[calc(100vh-4.1rem)] flex-col justify-center">

          {/* Main grid: left text | right scene + strip */}
          <div className="flex flex-1 flex-col gap-0 lg:grid lg:grid-cols-[0.7fr_1.6fr] lg:items-center lg:gap-7 lg:px-8 lg:py-3 xl:px-12">

            {/* Left: title + CTAs */}
            <div className="flex flex-col justify-center px-6 pt-6 lg:px-0 lg:pt-0">
              <h1
                lang={locale}
                className="text-balance text-4xl font-semibold leading-[1.04] text-white sm:text-5xl lg:text-[2.3rem] xl:text-[2.65rem]"
              >
                {title}
              </h1>
              <p className="mt-5 max-w-md text-[0.97rem] leading-8 text-white/72">
                {subtitle}
              </p>
              <p className="mt-3 max-w-sm text-sm leading-6 text-white/46">
                {ui.instruction}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button href={primaryCta.href} variant="onDark">
                  {primaryCta.label}
                </Button>
                <Button
                  href={secondaryCta.href} variant="secondary"
                  className="border-transparent bg-transparent px-3 text-aqua hover:border-transparent hover:bg-transparent hover:text-white"
                >
                  {secondaryCta.label} <span aria-hidden>→</span>
                </Button>
              </div>
            </div>

            {/* Right: animated panel + orbiting selection markers + section strip */}
            <div className="hidden min-w-0 flex-col gap-2 lg:flex">
              <div className="relative mx-auto w-full max-w-[790px] 2xl:max-w-[960px]">
                <AlignerSequence reducedMotion={reducedMotion} />
                <nav aria-label={ui.sceneLabel} className="absolute inset-0">
                  {items.map((item, i) => (
                    <Marker
                      key={item.id} item={item} index={i}
                      active={item.id === activeId}
                      reducedMotion={reducedMotion}
                      onActivate={() => setActiveId(item.id)}
                    />
                  ))}
                </nav>
              </div>
              <SectionStrip items={items} activeId={activeId} ui={ui} onActivate={setActiveId} />
            </div>
          </div>

          {/* Mobile */}
          <div className="px-6 pb-10 pt-2 lg:hidden">
            <MobileFallback items={items} ui={ui} reducedMotion={reducedMotion} />
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="relative overflow-hidden bg-[#061016] text-canvas">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-aqua/40 to-transparent" />
        <div className="mx-auto w-full max-w-content px-6 py-16 text-center sm:py-20 sm:px-8 lg:px-12">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-aqua">
            {ui.closingEyebrow}
          </p>
          <h2 className="mx-auto mt-4 max-w-3xl text-balance text-3xl font-semibold text-white sm:text-4xl">
            {subtitle}
          </h2>
          <div className="mt-8 flex justify-center">
            <Button href={primaryCta.href} variant="onDark">
              {primaryCta.label}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
