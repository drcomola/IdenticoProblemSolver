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
// Frontal smile arch viewed slightly from above. Local coords per crown:
// 0,0 = centre · incisal/occlusal edge at TOP (−y) · cervical/gum at BOTTOM (+y).
// 10 anatomical teeth (symmetric): 2 central + 2 lateral incisors, 2 canines,
// 2 first + 2 second premolars. x,y = crown centre in viewBox (760×440).
type ToothType = "central" | "lateral" | "canine" | "premolar";
type ToothDef = {
  x: number; y: number; r: number; s: number;
  type: ToothType;
  dx: number; dy: number; dr: number;
};
const TEETH: ToothDef[] = [
  // left side (viewer) — positive rotation tilts crown outward
  { x: 138, y: 168, r: 54, s: 0.80, type: "premolar", dx: -11, dy: 7,  dr: -13 },
  { x: 178, y: 206, r: 42, s: 0.86, type: "premolar", dx: 9,   dy: -9, dr: 12  },
  { x: 224, y: 238, r: 30, s: 0.96, type: "canine",   dx: -12, dy: 9,  dr: -11 },
  { x: 286, y: 261, r: 18, s: 0.93, type: "lateral",  dx: 9,   dy:-10, dr: 9   },
  { x: 346, y: 273, r: 7,  s: 1.00, type: "central",  dx: -8,  dy: 9,  dr: -8  },
  // right side — negative rotation
  { x: 414, y: 273, r: -7, s: 1.00, type: "central",  dx: 9,   dy: -9, dr: 8   },
  { x: 474, y: 261, r:-18, s: 0.93, type: "lateral",  dx: -9,  dy: 8,  dr: -8  },
  { x: 536, y: 238, r:-30, s: 0.96, type: "canine",   dx: 11,  dy: -8, dr: 10  },
  { x: 582, y: 206, r:-42, s: 0.86, type: "premolar", dx: -9,  dy: 8,  dr: -10 },
  { x: 622, y: 168, r:-54, s: 0.80, type: "premolar", dx: 9,   dy: -7, dr: 11  },
];

// Shared silhouette per crown type — reused for the enamel body, the convex
// highlight overlay and the aligner cut-out slot, so they always register.
const TOOTH_BODY: Record<ToothType, string> = {
  central:
    "M-23,-25 Q-25,-30 -19,-31 L19,-31 Q25,-30 23,-25 L20,17 Q17,30.5 0,31 Q-17,30.5 -20,17 Z",
  lateral:
    "M-18,-21 Q-20,-26 -14,-27 L14,-27 Q20,-26 18,-21 L15,15 Q13,27 0,27.5 Q-13,27 -15,15 Z",
  canine:
    "M-15,-15 Q-16,-25 -8,-30 L-3,-33 Q0,-34 3,-33 L8,-30 Q16,-25 15,-15 L13,15 Q11,27 0,28 Q-11,27 -13,15 Z",
  premolar:
    "M-19,-12 Q-20,-21 -11,-25 L-6,-27 Q0,-28 6,-27 L11,-25 Q20,-21 19,-12 L17,12 Q15,23 0,24 Q-15,23 -17,12 Z",
};

// ─── Per-type crown anatomy (incisal at top, cervical at bottom) ─────────────
function ToothCrown({ type, g, hl }: { type: ToothType; g: string; hl: string }) {
  const body = TOOTH_BODY[type];
  const incisor = type === "central" || type === "lateral";
  const w = type === "central" ? 23 : type === "lateral" ? 18 : type === "canine" ? 15 : 19;
  return (
    <>
      {/* Enamel body */}
      <path d={body} fill={`url(#${g})`} />
      {/* Convex labial sheen */}
      <path d={body} fill={`url(#${hl})`} opacity=".9" />

      {incisor && (
        <>
          {/* Translucent incisal band (real enamel goes blue-grey at the edge) */}
          <path
            d={type === "central"
              ? "M-19,-31 L19,-31 L16,-22 Q0,-19 -16,-22 Z"
              : "M-14,-27 L14,-27 L12,-19 Q0,-16 -12,-19 Z"}
            fill="#dcebf2" opacity=".5" />
          {/* Three soft mamelon lobes on the incisal edge */}
          <path
            d={type === "central"
              ? "M-12,-30 Q-7,-23 -3,-30 M-3,-30 Q0,-22 3,-30 M3,-30 Q7,-23 12,-30"
              : "M-9,-26 Q-5,-20 -2,-26 M-2,-26 Q0,-19 2,-26 M2,-26 Q5,-20 9,-26"}
            stroke="#cfe4ee" strokeOpacity=".55" strokeWidth="1"
            fill="none" vectorEffect="non-scaling-stroke" />
          {/* Two faint developmental grooves */}
          <path d={`M${-w * 0.42},${-22} Q${-w * 0.5},0 ${-w * 0.4},${18}`}
            stroke="#b89a78" strokeOpacity=".2" strokeWidth="1.6"
            fill="none" vectorEffect="non-scaling-stroke" />
          <path d={`M${w * 0.42},${-22} Q${w * 0.5},0 ${w * 0.4},${18}`}
            stroke="#b89a78" strokeOpacity=".2" strokeWidth="1.6"
            fill="none" vectorEffect="non-scaling-stroke" />
        </>
      )}

      {type === "canine" && (
        <>
          {/* Cusp tip glow */}
          <ellipse cx="0" cy="-32" rx="2.6" ry="2" fill="#fff" fillOpacity=".7" />
          {/* Mesial & distal incisal slopes */}
          <path d="M-13,-15 L0,-33 L13,-15"
            stroke="#fff" strokeOpacity=".5" strokeWidth="1.3"
            fill="none" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
          {/* Strong central ridge from the tip */}
          <path d="M0,-31 Q0,-6 0,18"
            stroke="#fff" strokeOpacity=".28" strokeWidth="5"
            strokeLinecap="round" fill="none" vectorEffect="non-scaling-stroke" />
        </>
      )}

      {type === "premolar" && (
        <>
          {/* Buccal & lingual cusp tips */}
          <path d="M-9,-24 Q-5,-28 -2,-25 M2,-25 Q5,-28 9,-24"
            stroke="#fff" strokeOpacity=".5" strokeWidth="1.3"
            fill="none" vectorEffect="non-scaling-stroke" />
          {/* Central occlusal groove */}
          <path d="M0,-24 Q0,-2 0,16"
            stroke="#b09576" strokeOpacity=".3" strokeWidth="1.6"
            fill="none" vectorEffect="non-scaling-stroke" />
          {/* Two cusp ridge highlights */}
          <path d="M-7,-22 Q-8,-2 -7,14" stroke="#fff" strokeOpacity=".2"
            strokeWidth="3.4" strokeLinecap="round" fill="none" vectorEffect="non-scaling-stroke" />
          <path d="M7,-22 Q8,-2 7,14" stroke="#fff" strokeOpacity=".2"
            strokeWidth="3.4" strokeLinecap="round" fill="none" vectorEffect="non-scaling-stroke" />
        </>
      )}

      {/* Cervical (gum-line) curve, shared */}
      <path
        d={`M${-w * 0.62},${incisor ? 19 : 14} Q0,${incisor ? 28 : 23} ${w * 0.62},${incisor ? 19 : 14}`}
        stroke="#a87f6e" strokeOpacity=".42" strokeWidth="1.8"
        fill="none" vectorEffect="non-scaling-stroke" />
    </>
  );
}

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
  const gumGradId     = `gm-${uid}`;
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

        {/* ── Z −22 · Gum arch ─────────────────────── */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ transform: "translateZ(-22px)" }}>
          <svg viewBox="0 0 760 440" className="absolute inset-0 w-full h-full overflow-visible">
            <defs>
              <linearGradient id={gumGradId} x1=".5" y1="0" x2=".5" y2="1">
                <stop offset="0%"   stopColor="#d39a8a" stopOpacity=".92" />
                <stop offset="42%"  stopColor="#9a5d54" stopOpacity=".8" />
                <stop offset="100%" stopColor="#311d1f" stopOpacity=".22" />
              </linearGradient>
            </defs>
            {/* Gum tissue – emerges just below the cervical line of the teeth */}
            <path
              d="M128 182 C170 312 272 344 380 346 C488 344 590 312 632 182
                 C604 372 498 398 380 400 C262 398 156 372 128 182 Z"
              fill={`url(#${gumGradId})`}
            />
            {/* Interdental papillae — soft scallops between the crowns */}
            <path d="M150 196 C190 322 274 350 380 352 C486 350 570 322 610 196"
              fill="none" stroke="#e6bfb6" strokeOpacity=".22"
              strokeWidth="6" strokeLinecap="round" />
          </svg>
        </div>

        {/* ── Z 0 · Teeth + orbit ring ──────────────── */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ transform: "translateZ(0px)" }}>
          <svg viewBox="0 0 760 440" className="absolute inset-0 w-full h-full overflow-visible">
            <defs>
              {/* Base enamel gradient: incisal (top) → cervical (bottom) */}
              <linearGradient id={enamelId} x1="0" y1="0" x2=".22" y2="1">
                <stop offset="0%"   stopColor="#ffffff" />   {/* incisal – bright white */}
                <stop offset="16%"  stopColor="#fdfaf4" />   {/* upper third */}
                <stop offset="48%"  stopColor="#f4e9d6" />   {/* middle third */}
                <stop offset="78%"  stopColor="#e6cda6" />   {/* cervical third */}
                <stop offset="100%" stopColor="#cda678" />   {/* near gum line */}
              </linearGradient>
              {/* Radial labial highlight (simulate convex surface) */}
              <radialGradient id={enamelHlId} cx="40%" cy="30%" r="56%">
                <stop offset="0%"   stopColor="#ffffff" stopOpacity=".82" />
                <stop offset="55%"  stopColor="#ffffff" stopOpacity=".18" />
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

            {/* Outer aqua halo — subtle glow rim */}
            <path
              d="M98 16 C130 156 222 300 380 310 C538 300 630 156 662 16"
              fill="none" stroke="#5fd4dd" strokeOpacity=".18"
              strokeWidth="10" strokeLinecap="round" />

            {/* ── Main tray body ── outer rim wraps every crown (deepest crown,
                the central incisor, reaches y≈304), inner rim peaks at y≈206. */}
            <motion.path
              d="M102 8 C132 168 222 300 380 310 C538 300 628 168 658 8
                 C625 116 530 200 380 208 C230 200 135 116 102 8 Z"
              fill={`url(#${glassId})`}
              stroke="#ecfeff" strokeOpacity=".95" strokeWidth="2.2"
              filter={`url(#${glowFiltId})`}
              style={{ opacity: alignerGlow }}
            />

            {/* Bright specular sweep — main rim highlight */}
            <path
              d="M116 22 C148 154 236 216 380 224 C524 216 612 154 644 22"
              fill="none" stroke={`url(#${specId})`}
              strokeWidth="5.5" strokeLinecap="round" />

            {/* Inner refraction lines */}
            <path
              d="M130 38 C162 150 246 202 380 210 C514 202 598 150 630 38"
              fill="none" stroke="#bff4f8" strokeOpacity=".5" strokeWidth="1.5" />
            <path
              d="M146 54 C174 146 254 190 380 198 C506 190 586 146 614 54"
              fill="none" stroke="#66d7df" strokeOpacity=".3" strokeWidth="1.1" />

            {/* Tooth slots inside tray — glassy cut-outs reusing the exact tooth
                silhouettes, at the exact tooth coordinates. When the aligner is
                fully seated (translateY → 0) each slot caps its tooth below. */}
            {TEETH.map((tooth, i) => (
              <g key={i}
                transform={`translate(${tooth.x} ${tooth.y}) rotate(${tooth.r}) scale(${tooth.s * 1.04})`}>
                <path
                  d={TOOTH_BODY[tooth.type]}
                  fill="rgba(190,243,250,0.12)"
                  stroke="#eafdff" strokeOpacity=".7" strokeWidth="1.2"
                  vectorEffect="non-scaling-stroke"
                />
                {/* slot top sheen */}
                <path d={TOOTH_BODY[tooth.type]}
                  fill="none" stroke="#fff" strokeOpacity=".3" strokeWidth="0.6"
                  vectorEffect="non-scaling-stroke" transform="translate(0 -1)" />
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
      <div className="relative mt-6 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02]">
        <div className="bg-technical-grid pointer-events-none absolute inset-0 opacity-40" />
        <DentalScene3D progress={progress} reducedMotion={reducedMotion} />
      </div>
      <h2 className="mt-10 text-2xl font-semibold text-white">{ui.mobileHeading}</h2>
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
