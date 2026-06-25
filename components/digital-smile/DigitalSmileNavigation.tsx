"use client";

import Link from "next/link";
import { useId, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  AnimatePresence,
  type MotionValue,
} from "framer-motion";
import type { Audience, Locale } from "@/lib/i18n";
import type { SectionKey } from "@/lib/routes";
import type { DigitalSmileUi } from "@/content/digitalSmileNavigation";
import { SectionBrandIcon } from "@/components/icons/SectionBrandIcon";
import { SpeakerIcon } from "@/components/icons/BrandIcons";
import { Button } from "@/components/ui/Button";

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

// ─── Tooth geometry ───────────────────────────────────────────────────────────
// Dental arch viewed from the front-above (like the reference render). Local
// coords per crown: 0,0 = centre · incisal/occlusal edge at TOP (−y) ·
// cervical/gum margin at BOTTOM (+y). 12 anatomical teeth (symmetric): 2 central
// + 2 lateral incisors, 2 canines, 2 first + 2 second premolars, 2 first molars.
type ToothType = "central" | "lateral" | "canine" | "premolar" | "molar";
type ToothDef = {
  x: number; y: number; r: number; s: number;
  type: ToothType;
  dx: number; dy: number; dr: number;
};
// Positions hand-fitted so adjacent crowns touch at their contact points
// (cumulative half-widths along an elliptical arch). Size grades up from the
// small central incisors to the wide molars, as in a real lower arch.
const TEETH: ToothDef[] = [
  // left side (viewer) — positive rotation tilts the crown outward
  { x: 202, y: 194,   r: 51, s: 1.22, type: "molar",    dx: -5, dy: 3,  dr: -5 },
  { x: 236, y: 231.6, r: 40, s: 1.20, type: "premolar", dx: 4,  dy: -3, dr: 4  },
  { x: 272, y: 257.5, r: 29, s: 1.18, type: "premolar", dx: -4, dy: 3,  dr: -4 },
  { x: 307, y: 274.5, r: 20, s: 1.18, type: "canine",   dx: 4,  dy: -3, dr: 4  },
  { x: 338, y: 283.5, r: 12, s: 1.07, type: "lateral",  dx: -3, dy: 3,  dr: -4 },
  { x: 366, y: 287.5, r: 4,  s: 1.05, type: "central",  dx: 3,  dy: -3, dr: 4  },
  // right side — negative rotation
  { x: 394, y: 287.5, r: -4, s: 1.05, type: "central",  dx: -3, dy: 3,  dr: -4 },
  { x: 422, y: 283.5, r:-12, s: 1.07, type: "lateral",  dx: 3,  dy: -3, dr: 4  },
  { x: 453, y: 274.5, r:-20, s: 1.18, type: "canine",   dx: -4, dy: 3,  dr: -4 },
  { x: 488, y: 257.5, r:-29, s: 1.18, type: "premolar", dx: 4,  dy: -3, dr: 4  },
  { x: 524, y: 231.6, r:-40, s: 1.20, type: "premolar", dx: -4, dy: 3,  dr: -5 },
  { x: 558, y: 194,   r:-51, s: 1.22, type: "molar",    dx: 5,  dy: -3, dr: 5  },
];

// Shared silhouette per crown type — reused for the enamel body, the convex
// highlight overlay, the edge shadow and the aligner slot, so they all register.
const TOOTH_BODY: Record<ToothType, string> = {
  central:
    "M-13,-22 Q-14,-27 -10,-28 L10,-28 Q14,-27 13,-22 L12,16 Q10,26 0,26.5 Q-10,26 -12,16 Z",
  lateral:
    "M-13,-21 Q-14,-26 -10,-27 L10,-27 Q15,-26 14,-21 L12,15 Q10,25 0,25.5 Q-10,25 -12,15 Z",
  canine:
    "M-14,-16 Q-15,-25 -8,-30 L-2,-33 Q0,-34 2,-33 L8,-30 Q15,-25 14,-16 L12,15 Q10,27 0,28 Q-10,27 -12,15 Z",
  premolar:
    "M-17,-14 Q-18,-23 -10,-27 L-5,-29 Q0,-30 5,-29 L10,-27 Q18,-23 17,-14 L15,13 Q13,24 0,25 Q-13,24 -15,13 Z",
  molar:
    "M-21,-14 Q-22,-24 -13,-28 L-6,-30 Q0,-31 6,-30 L13,-28 Q22,-24 21,-14 L19,13 Q17,25 0,26 Q-17,25 -19,13 Z",
};

// ─── Per-type crown anatomy (incisal at top, cervical at bottom) ─────────────
function ToothCrown({ type, g, hl }: { type: ToothType; g: string; hl: string }) {
  const body = TOOTH_BODY[type];
  const incisor = type === "central" || type === "lateral";
  const w = type === "central" ? 13 : type === "lateral" ? 13 : type === "canine" ? 14 : type === "premolar" ? 17 : 21;
  const cerv = incisor ? 16 : type === "canine" ? 15 : 13;
  return (
    <>
      {/* Enamel body + convex labial sheen */}
      <path d={body} fill={`url(#${g})`} />
      <path d={body} fill={`url(#${hl})`} opacity=".92" />

      {incisor && (
        <>
          {/* Translucent incisal edge (enamel turns blue-grey where it thins) */}
          <path d="M-10,-28 L10,-28 L8.5,-20 Q0,-17.5 -8.5,-20 Z"
            fill="#dceaf1" opacity=".55" />
          {/* Faint developmental grooves */}
          <path d={`M${-w * 0.42},-20 Q${-w * 0.5},0 ${-w * 0.38},14`}
            stroke="#c2a583" strokeOpacity=".18" strokeWidth="1.4"
            fill="none" vectorEffect="non-scaling-stroke" />
          <path d={`M${w * 0.42},-20 Q${w * 0.5},0 ${w * 0.38},14`}
            stroke="#c2a583" strokeOpacity=".18" strokeWidth="1.4"
            fill="none" vectorEffect="non-scaling-stroke" />
        </>
      )}

      {type === "canine" && (
        <>
          <ellipse cx="0" cy="-31" rx="2.4" ry="1.8" fill="#fff" fillOpacity=".7" />
          <path d="M-12,-16 L0,-33 L12,-16"
            stroke="#fff" strokeOpacity=".42" strokeWidth="1.2"
            fill="none" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
          <path d="M0,-30 Q0,-6 0,15"
            stroke="#fff" strokeOpacity=".22" strokeWidth="4.5"
            strokeLinecap="round" fill="none" vectorEffect="non-scaling-stroke" />
        </>
      )}

      {type === "premolar" && (
        <>
          {/* Two cusp tips + central groove */}
          <path d="M-8,-25 Q-4,-29 -1,-26 M1,-26 Q4,-29 8,-25"
            stroke="#fff" strokeOpacity=".42" strokeWidth="1.2"
            fill="none" vectorEffect="non-scaling-stroke" />
          <path d="M0,-24 Q0,-2 0,13"
            stroke="#b09576" strokeOpacity=".26" strokeWidth="1.4"
            fill="none" vectorEffect="non-scaling-stroke" />
          <path d="M-7,-22 Q-8,-2 -7,11" stroke="#fff" strokeOpacity=".16"
            strokeWidth="3" strokeLinecap="round" fill="none" vectorEffect="non-scaling-stroke" />
          <path d="M7,-22 Q8,-2 7,11" stroke="#fff" strokeOpacity=".16"
            strokeWidth="3" strokeLinecap="round" fill="none" vectorEffect="non-scaling-stroke" />
        </>
      )}

      {type === "molar" && (
        <>
          {/* Four cusp ridges + cross-shaped occlusal grooves */}
          <path d="M0,-26 Q0,0 0,12 M-13,-2 Q0,-2 13,-2"
            stroke="#a98f6f" strokeOpacity=".26" strokeWidth="1.4"
            fill="none" vectorEffect="non-scaling-stroke" />
          <path d="M-10,-24 Q-11,-10 -10,-4 M10,-24 Q11,-10 10,-4"
            stroke="#fff" strokeOpacity=".16" strokeWidth="3"
            strokeLinecap="round" fill="none" vectorEffect="non-scaling-stroke" />
          <path d="M-10,2 Q-11,8 -9,11 M10,2 Q11,8 9,11"
            stroke="#fff" strokeOpacity=".13" strokeWidth="2.6"
            strokeLinecap="round" fill="none" vectorEffect="non-scaling-stroke" />
        </>
      )}

      {/* Subtle edge shadow → defines the contact points between packed teeth */}
      <path d={body} fill="none" stroke="#6f5031" strokeOpacity=".28"
        strokeWidth="1.4" vectorEffect="non-scaling-stroke" />
      {/* Cervical gum-line shadow */}
      <path d={`M${-w * 0.6},${cerv} Q0,${cerv + 6} ${w * 0.6},${cerv}`}
        stroke="#9d745f" strokeOpacity=".4" strokeWidth="1.6"
        fill="none" vectorEffect="non-scaling-stroke" />
    </>
  );
}

// ─── Arch-derived geometry ────────────────────────────────────────────────────
// The gum and the aligner are generated from the tooth positions so they always
// hug the real arch — papillae between every crown, tray slots over every tooth.
const ARCH_C = { x: 380, y: 122 };
function tw(t: ToothDef, lx: number, ly: number) {
  const r = (t.r * Math.PI) / 180, c = Math.cos(r), s = Math.sin(r);
  return { x: t.x + (lx * c - ly * s) * t.s, y: t.y + (lx * s + ly * c) * t.s };
}
function radial(p: { x: number; y: number }, dist: number) {
  const dx = p.x - ARCH_C.x, dy = p.y - ARCH_C.y, L = Math.hypot(dx, dy) || 1;
  return { x: p.x + (dx / L) * dist, y: p.y + (dy / L) * dist };
}
const INCISAL: Record<ToothType, number> = { central: -28, lateral: -27, canine: -33, premolar: -28, molar: -29 };
const CERVI: Record<ToothType, number> = { central: 26, lateral: 25, canine: 28, premolar: 24, molar: 25 };
const fp = (p: { x: number; y: number }) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`;
const poly = (pts: { x: number; y: number }[]) => pts.map((p, i) => (i ? "L" : "M") + fp(p)).join(" ");
const back = (pts: { x: number; y: number }[]) => [...pts].reverse().map((p) => "L" + fp(p)).join(" ");

// Aligner tray: a glassy band wrapping each crown from the labial-incisal edge
// down past the cervical line on the lingual side.
const _algOuter = TEETH.map((t) => radial(tw(t, 0, INCISAL[t.type]), 16));
const _algInner = TEETH.map((t) => radial(tw(t, 0, CERVI[t.type]), -8));
const ALIGNER_BODY = `${poly(_algOuter)} ${back(_algInner)} Z`;
const ALIGNER_RIM = poly(_algOuter);

// ─── Animated tooth component ────────────────────────────────────────────────
function AnimatedTooth({
  tooth, progress, reducedMotion, g, hl,
}: {
  tooth: ToothDef; progress: MotionValue<number>;
  reducedMotion: boolean; g: string; hl: string;
}) {
  const mx = useTransform(progress, [0.08, 0.85], [tooth.dx, 0]);
  const my = useTransform(progress, [0.08, 0.85], [tooth.dy, 0]);
  const mr = useTransform(progress, [0.08, 0.85], [tooth.dr, 0]);
  return (
    <g transform={`translate(${tooth.x} ${tooth.y}) rotate(${tooth.r}) scale(${tooth.s})`}>
      <motion.g
        style={{
          x: reducedMotion ? 0 : mx,
          y: reducedMotion ? 0 : my,
          rotate: reducedMotion ? 0 : mr,
          transformBox: "fill-box",
          transformOrigin: "center",
        }}
      >
        <ToothCrown type={tooth.type} g={g} hl={hl} />
      </motion.g>
    </g>
  );
}

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

// ─── 3-D dental scene ─────────────────────────────────────────────────────────
function DentalScene3D({ progress, reducedMotion }: {
  progress: MotionValue<number>; reducedMotion: boolean;
}) {
  const uid = useId().replace(/:/g, "");
  const enamelId      = `en-${uid}`;
  const enamelHlId    = `enh-${uid}`;
  const glassId       = `gl-${uid}`;
  const specId        = `sp-${uid}`;
  const toothShadId   = `ts-${uid}`;
  const glowFiltId    = `gf-${uid}`;
  const scanFiltId    = `sf-${uid}`;

  // ── Camera rotation (the orbit effect) ──────────────────────────────────
  const sceneRotX = useTransform(
    progress, [0, 0.38, 0.72, 1],
    reducedMotion ? [0,0,0,0] : [22, 8, -2, -4]);
  const sceneRotY = useTransform(
    progress, [0, 0.44, 0.78, 1],
    reducedMotion ? [0,0,0,0] : [-7, 0, 4, 3]);

  // ── Aligner descent (Z + Y) ──────────────────────────────────────────────
  const alignerZ = useTransform(
    progress, [0, 0.48, 0.86, 1],
    reducedMotion ? [14,14,8,8] : [90, 70, 16, 8]);
  const alignerY = useTransform(
    progress, [0, 0.50, 0.86, 1],
    reducedMotion ? [0,0,0,0] : [-68, -36, -5, 0]);
  const alignerGlow = useTransform(progress, [0.28, 0.68, 1], [0.55, 0.96, 0.78]);

  // ── Orbit ring pulse ────────────────────────────────────────────────────
  const orbitOp = useTransform(progress, [0, 0.22, 0.8, 1], [0.2, 0.48, 0.6, 0.44]);

  // ── Scan line ────────────────────────────────────────────────────────────
  const scanY  = useTransform(progress, [0, 1], [130, 295]);

  return (
    <div
      className="relative w-full select-none"
      style={{ perspective: "1300px", perspectiveOrigin: "50% 42%" }}
      aria-hidden="true"
    >
      <motion.div
        className="relative w-full"
        style={{
          transformStyle: "preserve-3d",
          rotateX: sceneRotX,
          rotateY: sceneRotY,
          aspectRatio: "760 / 440",
        }}
      >

        {/* ── Z −110 · Ground shadow / ambient bloom ─── */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ transform: "translateZ(-110px)" }}>
          <svg viewBox="0 0 760 440" className="absolute inset-0 w-full h-full overflow-visible">
            <defs>
              <radialGradient id={`ra-${uid}`} cx="50%" cy="68%" r="44%">
                <stop offset="0%" stopColor="#5fd4dd" stopOpacity=".1" />
                <stop offset="100%" stopColor="#5fd4dd" stopOpacity="0" />
              </radialGradient>
            </defs>
            <ellipse cx="380" cy="310" rx="260" ry="80"
              fill={`url(#ra-${uid})`} />
          </svg>
        </div>

        {/* ── Z 0 · Teeth + orbit ring ──────────────── */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ transform: "translateZ(0px)" }}>
          <svg viewBox="0 0 760 440" className="absolute inset-0 w-full h-full overflow-visible">
            <defs>
              {/* Base enamel gradient: incisal (top) → cervical (bottom) —
                  warm natural ivory, brighter at the biting edge. */}
              <linearGradient id={enamelId} x1="0" y1="0" x2=".18" y2="1">
                <stop offset="0%"   stopColor="#fdfbf6" />   {/* incisal – soft white */}
                <stop offset="28%"  stopColor="#f6efe0" />   {/* upper third */}
                <stop offset="60%"  stopColor="#efe2c9" />   {/* middle third */}
                <stop offset="86%"  stopColor="#e2cca6" />   {/* cervical third */}
                <stop offset="100%" stopColor="#d3b285" />   {/* near gum line */}
              </linearGradient>
              {/* Radial labial highlight (simulate the convex enamel surface) */}
              <radialGradient id={enamelHlId} cx="42%" cy="28%" r="60%">
                <stop offset="0%"   stopColor="#ffffff" stopOpacity=".78" />
                <stop offset="50%"  stopColor="#ffffff" stopOpacity=".16" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0"  />
              </radialGradient>
              {/* Tooth group shadow */}
              <filter id={toothShadId} x="-25%" y="-25%" width="150%" height="160%">
                <feDropShadow dx="0" dy="7" stdDeviation="6"
                  floodColor="#000" floodOpacity=".62" />
              </filter>
            </defs>

            {/* Orbit ring — matches the marker ellipse */}
            <motion.ellipse
              cx="380" cy="214" rx="312" ry="150"
              fill="none" stroke="#7fe3ea"
              strokeWidth="1.1" strokeDasharray="2 10" strokeLinecap="round"
              style={{ opacity: orbitOp }}
            />

            {/* All teeth in one shadow group */}
            <g filter={`url(#${toothShadId})`}>
              {TEETH.map((tooth, i) => (
                <AnimatedTooth
                  key={i} tooth={tooth} progress={progress}
                  reducedMotion={reducedMotion} g={enamelId} hl={enamelHlId}
                />
              ))}
            </g>
          </svg>
        </div>

        {/* ── Z dynamic · Aligner tray (descends toward teeth) ─ */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ translateZ: alignerZ, translateY: alignerY }}
        >
          <svg viewBox="0 0 760 440" className="absolute inset-0 w-full h-full overflow-visible">
            <defs>
              {/* Glass fill gradient */}
              <linearGradient id={glassId} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%"   stopColor="#f8feff" stopOpacity=".46" />
                <stop offset="22%"  stopColor="#a0e4eb" stopOpacity=".22" />
                <stop offset="54%"  stopColor="#e4fdff" stopOpacity=".36" />
                <stop offset="78%"  stopColor="#5cc8d2" stopOpacity=".18" />
                <stop offset="100%" stopColor="#ffffff"  stopOpacity=".44" />
              </linearGradient>
              {/* Specular sweep */}
              <linearGradient id={specId} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%"   stopColor="#fff" stopOpacity="0"   />
                <stop offset="22%"  stopColor="#fff" stopOpacity=".9"  />
                <stop offset="52%"  stopColor="#72dce3" stopOpacity=".38" />
                <stop offset="77%"  stopColor="#fff" stopOpacity=".82" />
                <stop offset="100%" stopColor="#fff" stopOpacity="0"   />
              </linearGradient>
              {/* Aligner glow filter */}
              <filter id={glowFiltId} x="-16%" y="-24%" width="132%" height="158%">
                <feDropShadow dx="0" dy="4" stdDeviation="9"
                  floodColor="#5fd4dd" floodOpacity=".4" />
              </filter>
            </defs>

            {/* Outer aqua halo — subtle glow rim along the labial edge */}
            <path d={ALIGNER_RIM}
              fill="none" stroke="#5fd4dd" strokeOpacity=".16"
              strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" />

            {/* ── Main tray body ── generated horseshoe band wrapping every crown
                from the labial edge down past the cervical line. */}
            <motion.path
              d={ALIGNER_BODY}
              fill={`url(#${glassId})`}
              stroke="#ecfeff" strokeOpacity=".9" strokeWidth="2"
              strokeLinejoin="round"
              filter={`url(#${glowFiltId})`}
              style={{ opacity: alignerGlow }}
            />

            {/* Bright specular sweep along the labial rim */}
            <path d={ALIGNER_RIM}
              fill="none" stroke={`url(#${specId})`}
              strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />

            {/* Tooth slots inside tray — glassy cut-outs reusing the exact tooth
                silhouettes, at the exact tooth coordinates. When the aligner is
                fully seated (translateY → 0) each slot caps its tooth below. */}
            {TEETH.map((tooth, i) => (
              <g key={i}
                transform={`translate(${tooth.x} ${tooth.y}) rotate(${tooth.r}) scale(${tooth.s * 1.05})`}>
                <path
                  d={TOOTH_BODY[tooth.type]}
                  fill="rgba(190,243,250,0.1)"
                  stroke="#eafdff" strokeOpacity=".62" strokeWidth="1.1"
                  vectorEffect="non-scaling-stroke"
                />
                {/* slot top sheen */}
                <path d={TOOTH_BODY[tooth.type]}
                  fill="none" stroke="#fff" strokeOpacity=".28" strokeWidth="0.6"
                  vectorEffect="non-scaling-stroke" transform="translate(0 -1.2)" />
              </g>
            ))}
          </svg>
        </motion.div>

        {/* ── Z +32 · Kinetic scan line ─────────────── */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ transform: "translateZ(32px)" }}>
          <svg viewBox="0 0 760 440" className="absolute inset-0 w-full h-full overflow-visible">
            <defs>
              <filter id={scanFiltId} x="-20%" y="-500%" width="140%" height="1100%">
                <feGaussianBlur stdDeviation="2.5" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <motion.line
              x1="128" x2="632"
              y1={reducedMotion ? 200 : scanY}
              y2={reducedMotion ? 200 : scanY}
              stroke="#77edf1" strokeOpacity=".36" strokeWidth="1"
              strokeDasharray="3 10"
              filter={`url(#${scanFiltId})`}
            />
          </svg>
        </div>

      </motion.div>
    </div>
  );
}

// ─── Orbit marker ─────────────────────────────────────────────────────────────
function Marker({ item, index, active, progress, reducedMotion, onActivate }: {
  item: SmileJourneyItem; index: number; active: boolean;
  progress: MotionValue<number>; reducedMotion: boolean; onActivate: () => void;
}) {
  const thresh = 0.06 + index * 0.115;
  const opacity = useTransform(progress, [thresh, thresh + 0.14], [0.42, 1]);
  const scale   = useTransform(progress, [thresh, thresh + 0.14], [0.82, 1]);
  const below   = item.markerPosition.y <= 78;

  return (
    <motion.div
      className="absolute z-20"
      style={{
        left: `${item.markerPosition.x}%`,
        top:  `${item.markerPosition.y}%`,
        x: "-50%", y: "-50%",
        opacity: reducedMotion ? 1 : opacity,
        scale:   reducedMotion ? 1 : scale,
      }}
    >
      <Link
        href={item.href}
        aria-label={`${item.label} — ${item.shortPreview}`}
        onMouseEnter={onActivate} onFocus={onActivate} onPointerDown={onActivate}
        className={[
          "group relative flex h-14 w-14 items-center justify-center rounded-full",
          "border backdrop-blur-lg transition-all duration-300 xl:h-16 xl:w-16",
          active
            ? "border-aqua bg-aqua/20 text-white shadow-[0_0_0_8px_rgba(79,179,191,0.14),0_0_44px_rgba(79,179,191,0.9),inset_0_0_22px_rgba(142,212,218,0.25)]"
            : "border-white/40 bg-night/70 text-aqua shadow-[0_0_22px_rgba(79,179,191,0.22),inset_0_0_16px_rgba(79,179,191,0.1)] hover:border-aqua hover:bg-aqua/18 hover:text-white hover:shadow-[0_0_36px_rgba(79,179,191,0.65)]",
        ].join(" ")}
      >
        <JourneyIcon item={item} className="h-8 w-8 xl:h-9 xl:w-9" strokeWidth={1.6} />
        <span className={[
          "pointer-events-none absolute inset-[-8px] rounded-full border border-aqua/30",
          "transition-opacity duration-300",
          active ? "opacity-100" : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100",
        ].join(" ")} />
        {/* Label */}
        <span className={[
          "pointer-events-none absolute left-1/2 -translate-x-1/2 whitespace-nowrap",
          "text-[0.6rem] font-semibold uppercase tracking-[0.18em] transition-colors duration-300",
          below ? "top-full mt-2.5" : "bottom-full mb-2.5",
          active ? "text-aqua" : "text-white/72",
        ].join(" ")}>
          {item.label}
        </span>
      </Link>
    </motion.div>
  );
}

// ─── Section strip (desktop) ──────────────────────────────────────────────────
function SectionStrip({ items, activeId, ui }: {
  items: SmileJourneyItem[]; activeId: string; ui: DigitalSmileUi;
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
              {ui.previewLabel} · {active.code} / 07
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

      {/* All-sections pill bar — always visible */}
      <nav aria-label={ui.sceneLabel} className="flex flex-wrap gap-1.5">
        {items.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className={[
              "flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-[0.72rem] font-semibold",
              "transition-all duration-200",
              item.id === activeId
                ? "border-aqua bg-aqua/16 text-aqua shadow-[0_0_16px_rgba(79,179,191,0.32)]"
                : "border-white/18 bg-white/[0.05] text-white/68 hover:border-aqua/45 hover:text-white",
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
function MobileFallback({ items, ui, progress, reducedMotion }: {
  items: SmileJourneyItem[]; ui: DigitalSmileUi;
  progress: MotionValue<number>; reducedMotion: boolean;
}) {
  return (
    <div className="lg:hidden">
      {/* Scene framed tighter on the arch — no markers on mobile, so we can
          zoom-crop into the teeth for a larger, better-centred render. */}
      <div className="relative mt-4 aspect-[5/4] overflow-hidden rounded-[1.75rem] border border-white/10 bg-[radial-gradient(circle_at_50%_60%,rgba(26,122,140,0.16),transparent_62%)]">
        <div className="bg-technical-grid pointer-events-none absolute inset-0 opacity-40" />
        <div className="absolute inset-x-0 top-1/2 origin-center -translate-y-1/2 scale-[1.42] sm:scale-[1.2]">
          <DentalScene3D progress={progress} reducedMotion={reducedMotion} />
        </div>
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
            <div className="flex items-center justify-between">
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-aqua/38 bg-aqua/10 text-aqua">
                <JourneyIcon item={item} className="h-6 w-6" />
              </span>
              <span className="text-[0.58rem] tracking-[0.16em] text-white/30">{item.code} / 07</span>
            </div>
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
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion() ?? false;
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");
  const [stage, setStage] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const progressWidth = useTransform(scrollYProgress, [0, 1], ["6%", "100%"]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = v < 0.34 ? 0 : v < 0.72 ? 1 : 2;
    setStage((s) => (s === next ? s : next));
    const idx = Math.min(Math.floor(v * items.length), items.length - 1);
    const nextId = items[idx]?.id;
    if (nextId) setActiveId(nextId);
  });

  return (
    <>
      <section
        ref={sectionRef}
        data-audience={audience}
        className="relative overflow-clip bg-[#050b10] text-canvas"
        style={{ minHeight: "520vh" }}
      >
        <div className="bg-technical-grid pointer-events-none absolute inset-0 opacity-40" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_58%_32%,rgba(26,122,140,0.18),transparent_38%),radial-gradient(circle_at_52%_72%,rgba(79,179,191,0.09),transparent_35%),linear-gradient(180deg,#03080c_0%,#07131a_52%,#03090d_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-aqua/55 to-transparent" />

        {/* Sticky viewport */}
        <div className="sticky top-[4.1rem] z-10 flex min-h-[calc(100vh-4.1rem)] flex-col">

          {/* Top strip — kept left-aligned to leave the top-right corner free
              for the fixed Instagram button. */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 px-6 py-2.5 pr-40 sm:px-10 lg:px-14 lg:pr-52">
            <span className="text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-aqua">
              {ui.eyebrow}
            </span>
            <span className="hidden h-3 w-px bg-white/20 sm:block" />
            <div className="flex items-center gap-2 text-[0.58rem] font-semibold uppercase tracking-[0.2em]">
              <span className="text-aqua/80">{String(stage + 1).padStart(2, "0")} /</span>
              <span className="text-white/90">{ui.stageLabels[stage]}</span>
            </div>
          </div>

          {/* Main grid: left text | right scene+strip */}
          <div className="flex flex-1 flex-col gap-0 lg:grid lg:grid-cols-[0.78fr_1.5fr] lg:items-center lg:gap-8 lg:px-10 lg:pb-6 xl:px-14">

            {/* Left: title + CTAs + progress */}
            <div className="flex flex-col justify-center px-6 pt-6 lg:px-0 lg:pt-10">
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

              <div className="mt-8 hidden lg:block">
                <div className="flex items-center justify-between text-[0.57rem] font-semibold uppercase tracking-[0.2em] text-white/38">
                  <span>{ui.progressLabel}</span>
                  <span className="text-aqua">{String(stage + 1).padStart(2, "0")} / 03</span>
                </div>
                <div className="mt-2.5 h-px overflow-hidden bg-white/10">
                  <motion.div
                    className="h-full bg-gradient-to-r from-teal via-aqua to-aqua-soft"
                    style={{ width: reducedMotion ? "100%" : progressWidth }}
                  />
                </div>
              </div>
            </div>

            {/* Right: 3D scene + section strip. Scene is capped so the whole
                column (scene + markers + strip) fits within one viewport. */}
            <div className="hidden min-w-0 flex-col gap-4 lg:flex">
              <div className="relative mx-auto w-full max-w-[780px] 2xl:max-w-[860px]">
                <DentalScene3D progress={scrollYProgress} reducedMotion={reducedMotion} />
                <nav aria-label={ui.sceneLabel} className="absolute inset-0">
                  {items.map((item, i) => (
                    <Marker
                      key={item.id} item={item} index={i}
                      active={item.id === activeId}
                      progress={scrollYProgress} reducedMotion={reducedMotion}
                      onActivate={() => setActiveId(item.id)}
                    />
                  ))}
                </nav>
              </div>
              <SectionStrip items={items} activeId={activeId} ui={ui} />
            </div>
          </div>

          {/* Mobile */}
          <div className="px-6 pb-10 pt-2 lg:hidden">
            <MobileFallback items={items} ui={ui}
              progress={scrollYProgress} reducedMotion={reducedMotion} />
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
