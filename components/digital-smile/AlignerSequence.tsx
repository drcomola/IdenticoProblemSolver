"use client";

import { useEffect, useMemo, useRef } from "react";

/**
 * AlignerSequence
 * ---------------------------------------------------------------------------
 * Animazione di ortodonzia digitale in SVG puro (zero dipendenze): un'arcata
 * dentale superiore in vista 3/4 con denti ANATOMICI realistici (corona di
 * smalto + radice digitale, uniti dalla linea-gengiva). Un loop racconta:
 *   1) uno scanner stilizzato passa e "cattura" i denti (wireframe → smalto);
 *   2) la sequenza di mascherine (allineatori) li raddrizza progressivamente.
 *
 * Palette: i denti usano colori reali di smalto (avorio/caldo); tutta la parte
 * "digitale" (gengiva, allineatore, scanner, HUD) resta nella palette del sito
 * (teal/aqua/titanio su fondo scuro).
 *
 * - Loop con requestAnimationFrame (throttle ~30fps, cleanup su unmount).
 * - prefers-reduced-motion: stato finale allineato statico (mascherina N/N).
 * - SSR-safe: window/matchMedia solo dentro useEffect; markup da funzione pura.
 *
 * Esempio d'uso in una pagina Next.js (App Router):
 *
 *   import { AlignerSequence } from "@/components/digital-smile/AlignerSequence";
 *   export default function Page() {
 *     return (
 *       <section className="bg-[#050b10]">
 *         <AlignerSequence numeroMascherine={14} durataCiclo={9000} />
 *       </section>
 *     );
 *   }
 */

export type AlignerSequenceProps = {
  /** Numero di mascherine della sequenza. Default 14. */
  numeroMascherine?: number;
  /** Durata di un ciclo completo in ms. Default 9000. */
  durataCiclo?: number;
  /** Override del reduced-motion (di norma rilevato da matchMedia). */
  reducedMotion?: boolean;
  className?: string;
};

// ─── Palette brand (sito) per la parte "digitale" ──────────────────────────────
const C = {
  panelBorder: "rgba(79,179,191,0.18)",
  teal: "#4FB3BF",
  tealDeep: "#2C8C99",
  aqua: "#7FD7E3",
  aquaBright: "#9af0f4",
  titanium: "#C5CCD3",
  gum: "#5fd0db",
  text: "#BFEFF5",
  muted: "#7c979d",
  pillFuture: "#33424a",
};

const MONO = "ui-monospace,SFMono-Regular,Menlo,Consolas,monospace";

// Denti che partono storti e si raddrizzano (offset ×res, niente frecce).
type Offset = { rot?: number; dx?: number; dy?: number };
const OFFSETS: Record<number, Offset> = {
  2: { rot: 6 },
  3: { rot: -15, dx: -2 },
  4: { rot: 12, dx: 2 },
  5: { rot: 9, dy: 3 },
  9: { dy: 8, rot: -7 },
  10: { rot: -13, dx: 3 },
  11: { rot: 6, dy: 4 },
};

const smoothstep = (x: number) => x * x * (3 - 2 * x);
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const pad2 = (n: number) => String(n).padStart(2, "0");
const f1 = (n: number) => n.toFixed(1);

type ToothType = "central" | "lateral" | "canine" | "premolar" | "molar";
const HRATIO: Record<ToothType, number> = {
  central: 1.32, lateral: 1.24, canine: 1.46, premolar: 1.08, molar: 0.92,
};
const WBOOST: Record<ToothType, number> = {
  central: 1, lateral: 0.9, canine: 0.98, premolar: 1.06, molar: 1.16,
};
function typeOf(i: number): ToothType {
  const d = i <= 6 ? 6 - i : i - 7;
  return d === 0 ? "central" : d === 1 ? "lateral" : d === 2 ? "canine" : d <= 4 ? "premolar" : "molar";
}

type Tooth = {
  i: number; px: number; py: number; depth: number; s: number;
  type: ToothType; w: number; h: number;
};
function baseTeeth(): Tooth[] {
  const arr: Tooth[] = [];
  for (let i = 0; i < 14; i++) {
    const u = i / 13;
    const a = -0.95 + 1.9 * u;
    const side = Math.sin(a);
    const depth = 1 - Math.cos(a);
    const s = (1 - 0.42 * depth) * (1 - 0.16 * Math.max(0, side));
    const px = 340 + 150 * Math.sin(a) * (1 - 0.12 * Math.max(0, side));
    const py = 300 - 120 * depth * 0.9 - 6 - 10 * Math.max(0, side);
    arr.push({ i, px, py, depth, s, type: typeOf(i), w: 0, h: 0 });
  }
  for (let i = 0; i < 14; i++) {
    const c = arr[i];
    let d = 1e9;
    if (i > 0) d = Math.min(d, Math.abs(c.px - arr[i - 1].px));
    if (i < 13) d = Math.min(d, Math.abs(c.px - arr[i + 1].px));
    c.w = d * 1.04 * WBOOST[c.type];
    c.h = c.w * HRATIO[c.type];
  }
  return arr;
}
const TEETH = baseTeeth();

// ─── Nuvola di punti di sfondo (profondità + vita, non rebuild ogni frame) ─────
function mulberry(seed: number) {
  return function () {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
type Dust = { x: number; y: number; r: number; op: number; grp: 0 | 1; dur: number; delay: number; c: string };
const DUST: Dust[] = (() => {
  const rnd = mulberry(20260626);
  const cols = ["#7FD7E3", "#9fe6ee", "#C5CCD3"];
  const out: Dust[] = [];
  for (let i = 0; i < 76; i++) {
    const near = rnd() > 0.6;
    out.push({
      x: +(28 + rnd() * 620).toFixed(1),
      y: +(26 + rnd() * 410).toFixed(1),
      r: near ? +(1.3 + rnd() * 1.4).toFixed(2) : +(0.5 + rnd() * 0.8).toFixed(2),
      op: near ? +(0.32 + rnd() * 0.3).toFixed(2) : +(0.1 + rnd() * 0.18).toFixed(2),
      grp: rnd() > 0.5 ? 1 : 0,
      dur: +(3.5 + rnd() * 4).toFixed(2),
      delay: +(rnd() * 5).toFixed(2),
      c: cols[Math.floor(rnd() * cols.length)],
    });
  }
  return out;
})();

// ─── Anatomia: silhouette labiale della corona per tipo ────────────────────────
function crownPath(cx: number, top: number, w: number, h: number, type: ToothType): string {
  const hw = w / 2;
  const bot = top + h;
  const cerv = hw * 0.82;
  if (type === "central" || type === "lateral") {
    const r = Math.min(4, hw * 0.5);
    return `M${f1(cx - cerv)},${f1(top)} ` +
      `C${f1(cx - hw)},${f1(top + h * 0.24)} ${f1(cx - hw)},${f1(top + h * 0.55)} ${f1(cx - hw)},${f1(bot - r - h * 0.06)} ` +
      `Q${f1(cx - hw)},${f1(bot)} ${f1(cx - hw + r)},${f1(bot)} ` +
      `L${f1(cx + hw - r)},${f1(bot)} ` +
      `Q${f1(cx + hw)},${f1(bot)} ${f1(cx + hw)},${f1(bot - r - h * 0.06)} ` +
      `C${f1(cx + hw)},${f1(top + h * 0.55)} ${f1(cx + hw)},${f1(top + h * 0.24)} ${f1(cx + cerv)},${f1(top)} Z`;
  }
  if (type === "canine") {
    const tip = bot, sh = bot - h * 0.2;
    return `M${f1(cx - cerv)},${f1(top)} ` +
      `C${f1(cx - hw)},${f1(top + h * 0.3)} ${f1(cx - hw * 0.96)},${f1(sh - h * 0.05)} ${f1(cx - hw * 0.55)},${f1(sh)} ` +
      `Q${f1(cx - hw * 0.12)},${f1(tip)} ${f1(cx)},${f1(tip)} ` +
      `Q${f1(cx + hw * 0.12)},${f1(tip)} ${f1(cx + hw * 0.55)},${f1(sh)} ` +
      `C${f1(cx + hw * 0.96)},${f1(sh - h * 0.05)} ${f1(cx + hw)},${f1(top + h * 0.3)} ${f1(cx + cerv)},${f1(top)} Z`;
  }
  if (type === "premolar") {
    const sh = bot - h * 0.14;
    return `M${f1(cx - cerv)},${f1(top)} ` +
      `C${f1(cx - hw)},${f1(top + h * 0.3)} ${f1(cx - hw)},${f1(sh - h * 0.05)} ${f1(cx - hw * 0.72)},${f1(sh)} ` +
      `Q${f1(cx)},${f1(bot)} ${f1(cx + hw * 0.72)},${f1(sh)} ` +
      `C${f1(cx + hw)},${f1(sh - h * 0.05)} ${f1(cx + hw)},${f1(top + h * 0.3)} ${f1(cx + cerv)},${f1(top)} Z`;
  }
  const sh = bot - h * 0.12;
  return `M${f1(cx - cerv)},${f1(top)} ` +
    `C${f1(cx - hw)},${f1(top + h * 0.26)} ${f1(cx - hw)},${f1(sh - h * 0.05)} ${f1(cx - hw * 0.84)},${f1(sh)} ` +
    `Q${f1(cx - hw * 0.44)},${f1(bot)} ${f1(cx - hw * 0.12)},${f1(sh)} ` +
    `Q${f1(cx)},${f1(sh - h * 0.06)} ${f1(cx + hw * 0.12)},${f1(sh)} ` +
    `Q${f1(cx + hw * 0.44)},${f1(bot)} ${f1(cx + hw * 0.84)},${f1(sh)} ` +
    `C${f1(cx + hw)},${f1(sh - h * 0.05)} ${f1(cx + hw)},${f1(top + h * 0.26)} ${f1(cx + cerv)},${f1(top)} Z`;
}

// Dettagli anatomici (cuspidi, fosse, solchi, smalto translucido). op = quanto è
// "catturato" dallo scanner (0→1).
function crownDetail(cx: number, top: number, w: number, h: number, type: ToothType, op: number): string {
  const hw = w / 2, bot = top + h;
  const o = (v: number) => (v * op).toFixed(2);
  let s = "";
  // velo translucido incisale/occlusale (smalto sottile, blu freddo)
  s += `<path d="M${f1(cx - hw * 0.7)},${f1(bot - h * 0.16)} Q${f1(cx)},${f1(bot - h * 0.05)} ${f1(cx + hw * 0.7)},${f1(bot - h * 0.16)}" fill="none" stroke="#cfe6ef" stroke-opacity="${o(0.55)}" stroke-width="${(h * 0.12).toFixed(1)}" stroke-linecap="round"/>`;
  if (type === "central" || type === "lateral") {
    for (const gx of [-0.32, 0.32]) {
      s += `<path d="M${f1(cx + hw * gx)},${f1(top + h * 0.42)} Q${f1(cx + hw * gx * 1.1)},${f1(top + h * 0.7)} ${f1(cx + hw * gx)},${f1(bot - h * 0.14)}" fill="none" stroke="#b89a72" stroke-opacity="${o(0.22)}" stroke-width="0.8"/>`;
    }
  } else if (type === "canine") {
    s += `<path d="M${f1(cx)},${f1(top + h * 0.22)} L${f1(cx)},${f1(bot - h * 0.04)}" stroke="#ffffff" stroke-opacity="${o(0.28)}" stroke-width="${(w * 0.14).toFixed(1)}" stroke-linecap="round"/>`;
    s += `<path d="M${f1(cx - hw * 0.5)},${f1(top + h * 0.4)} Q${f1(cx - hw * 0.2)},${f1(top + h * 0.75)} ${f1(cx)},${f1(bot - h * 0.05)}" fill="none" stroke="#b89a72" stroke-opacity="${o(0.18)}" stroke-width="0.7"/>`;
  } else if (type === "premolar") {
    s += `<path d="M${f1(cx)},${f1(top + h * 0.3)} L${f1(cx)},${f1(bot - h * 0.06)}" stroke="#a98f6f" stroke-opacity="${o(0.24)}" stroke-width="0.9"/>`;
    s += `<path d="M${f1(cx - hw * 0.5)},${f1(top + h * 0.32)} L${f1(cx - hw * 0.5)},${f1(bot - h * 0.16)}" stroke="#ffffff" stroke-opacity="${o(0.14)}" stroke-width="${(w * 0.1).toFixed(1)}" stroke-linecap="round"/>`;
  } else {
    s += `<path d="M${f1(cx)},${f1(top + h * 0.28)} L${f1(cx)},${f1(bot - h * 0.05)}" stroke="#a98f6f" stroke-opacity="${o(0.26)}" stroke-width="0.9"/>`;
    s += `<path d="M${f1(cx - hw * 0.5)},${f1(top + h * 0.34)} Q${f1(cx)},${f1(top + h * 0.46)} ${f1(cx + hw * 0.5)},${f1(top + h * 0.34)}" fill="none" stroke="#a98f6f" stroke-opacity="${o(0.2)}" stroke-width="0.8"/>`;
    for (const gx of [-0.5, 0.5]) {
      s += `<path d="M${f1(cx + hw * gx)},${f1(top + h * 0.36)} L${f1(cx + hw * gx)},${f1(bot - h * 0.14)}" stroke="#ffffff" stroke-opacity="${o(0.12)}" stroke-width="${(w * 0.09).toFixed(1)}" stroke-linecap="round"/>`;
    }
  }
  // sheen labiale (convessità dello smalto)
  s += `<path d="M${f1(cx - hw * 0.22)},${f1(top + h * 0.16)} Q${f1(cx - hw * 0.05)},${f1(top + h * 0.5)} ${f1(cx - hw * 0.16)},${f1(bot - h * 0.2)}" fill="none" stroke="#ffffff" stroke-opacity="${o(0.3)}" stroke-width="${(w * 0.13).toFixed(1)}" stroke-linecap="round"/>`;
  return s;
}

// Radice "digitale" (teal), sopra la gengiva, dietro la corona. Proporzione
// realistica: la radice è PIÙ LUNGA della corona (canino la più lunga) e sfuma
// verso l'apice grazie al gradiente, così non crea "picchi" duri.
function rootPath(cx: number, top: number, w: number, h: number, type: ToothType): string {
  const hw = w / 2;
  const rl = h * (type === "molar" ? 0.95 : type === "premolar" ? 1.15 : type === "canine" ? 1.6 : 1.4);
  const cone = (ox: number, lean: number, rw: number) => {
    const ax = cx + ox + lean;
    return `M${f1(cx + ox - rw)},${f1(top + 2)} ` +
      `C${f1(cx + ox - rw)},${f1(top - rl * 0.45)} ${f1(ax - rw * 0.35)},${f1(top - rl * 0.85)} ${f1(ax)},${f1(top - rl)} ` +
      `C${f1(ax + rw * 0.35)},${f1(top - rl * 0.85)} ${f1(cx + ox + rw)},${f1(top - rl * 0.45)} ${f1(cx + ox + rw)},${f1(top + 2)} Z`;
  };
  if (type === "molar") {
    return `<path d="${cone(-hw * 0.4, -hw * 0.3, hw * 0.4)}" fill="url(#alnRoot)" stroke="rgba(127,215,227,0.1)" stroke-width="0.5"/>` +
      `<path d="${cone(hw * 0.4, hw * 0.3, hw * 0.4)}" fill="url(#alnRoot)" stroke="rgba(127,215,227,0.1)" stroke-width="0.5"/>`;
  }
  return `<path d="${cone(0, 0, hw * (type === "premolar" ? 0.66 : 0.6))}" fill="url(#alnRoot)" stroke="rgba(127,215,227,0.11)" stroke-width="0.5"/>`;
}

// ─── Costruzione scena (pura) ──────────────────────────────────────────────────
type SceneState = { align: number; scan: number; beamX: number; beamActive: boolean; alignerOp: number; seat: number; N: number };

function buildScene(st: SceneState): string {
  const { align, scan, beamX, beamActive, alignerOp, seat, N } = st;
  const res = 1 - align;
  let out = "";

  // Posizioni correnti (con disallineamento residuo ×res)
  const cur = TEETH.map((t) => {
    const off = OFFSETS[t.i] ?? {};
    const dx = (off.dx ?? 0) * res;
    const dy = (off.dy ?? 0) * res;
    const rot = (off.rot ?? 0) * res;
    const top = t.py - t.h + dy;
    return { ...t, cx: t.px + dx, top, bot: t.py + dy, rot };
  });

  // Painter's algorithm: i denti più lontani (py minore) per primi
  const order = [...cur].sort((a, b) => a.py - b.py);
  for (const t of order) {
    const tScan = beamActive ? clamp((beamX - (t.cx - 26)) / 52, 0, 1) : 1;
    const cp = crownPath(t.cx, t.top, t.w, t.h, t.type);
    const tr = t.rot ? ` transform="rotate(${t.rot.toFixed(2)} ${f1(t.cx)} ${f1(t.bot)})"` : "";
    out += `<g${tr}>`;
    // radice digitale (dietro)
    out += rootPath(t.cx, t.top, t.w, t.h, t.type);
    // contorno wireframe (sempre, si attenua a cattura avvenuta)
    out += `<path d="${cp}" fill="none" stroke="${C.aqua}" stroke-opacity="${(0.12 + 0.3 * (1 - tScan)).toFixed(2)}" stroke-width="0.8"/>`;
    // corona di smalto (compare con lo scanner)
    out += `<path d="${cp}" fill="url(#alnEnamel)" fill-opacity="${tScan.toFixed(2)}" stroke="#caa877" stroke-opacity="${(0.5 * tScan).toFixed(2)}" stroke-width="0.8" stroke-linejoin="round"/>`;
    // profondità: i denti dietro più scuri
    if (t.depth > 0.04) out += `<path d="${cp}" fill="#06141b" fill-opacity="${(t.depth * 0.4).toFixed(2)}"/>`;
    // anatomia (cuspidi/fosse/solchi/sheen)
    out += crownDetail(t.cx, t.top, t.w, t.h, t.type, tScan);
    // ombre di contatto laterali (separazione/profondità)
    out += `<path d="M${f1(t.cx - t.w / 2)},${f1(t.top + 3)} L${f1(t.cx - t.w / 2)},${f1(t.bot - 3)}" stroke="#3a2a16" stroke-opacity="${(0.18 * tScan).toFixed(2)}" stroke-width="1.1"/>`;
    out += `<path d="M${f1(t.cx + t.w / 2)},${f1(t.top + 3)} L${f1(t.cx + t.w / 2)},${f1(t.bot - 3)}" stroke="#3a2a16" stroke-opacity="${(0.18 * tScan).toFixed(2)}" stroke-width="1.1"/>`;
    out += `</g>`;
  }

  // Linea-gengiva digitale (festone morbido, teal luminoso) al colletto delle
  // corone: spline liscia attraverso i margini cervicali.
  const gpts = cur.map((t) => ({ x: t.cx, y: t.top - 1 }));
  let gum = `M${f1(gpts[0].x)},${f1(gpts[0].y)}`;
  for (let k = 1; k < gpts.length; k++) {
    const mx = (gpts[k - 1].x + gpts[k].x) / 2;
    const my = (gpts[k - 1].y + gpts[k].y) / 2;
    gum += ` Q${f1(gpts[k - 1].x)},${f1(gpts[k - 1].y)} ${f1(mx)},${f1(my)}`;
  }
  gum += ` L${f1(gpts[gpts.length - 1].x)},${f1(gpts[gpts.length - 1].y)}`;
  out += `<path d="${gum}" fill="none" stroke="${C.gum}" stroke-opacity="0.7" stroke-width="1.8" stroke-linecap="round" filter="url(#alnGlow)"/>`;

  // Allineatore sui denti frontali (compare dopo lo scan, "si siede" ad ogni step)
  if (alignerOp > 0.01) {
    const front = cur.filter((t) => t.depth < 0.82).sort((a, b) => a.cx - b.cx);
    if (front.length > 1) {
      let top = "";
      const bot: string[] = [];
      front.forEach((t, k) => {
        top += (k ? " L" : "M") + `${f1(t.cx)},${f1(t.top + 3)}`;
        bot.push(`${f1(t.cx)},${f1(t.bot + 4)}`);
      });
      const shell = top + bot.reverse().map((p) => " L" + p).join("") + " Z";
      out += `<g opacity="${alignerOp.toFixed(2)}">`;
      out += `<path d="${shell}" fill="none" stroke="${C.aqua}" stroke-opacity="${(0.12 + 0.5 * seat).toFixed(2)}" stroke-width="5" stroke-linejoin="round"/>`;
      out += `<path d="${shell}" fill="rgba(127,215,227,0.08)" stroke="${C.aqua}" stroke-width="1.5" stroke-linejoin="round"/>`;
      out += `</g>`;
    }
  }

  // Scanner stilizzato (fascia luminosa che attraversa l'arcata)
  if (beamActive) {
    const x = beamX;
    out += `<rect x="${f1(x - 26)}" y="150" width="26" height="220" fill="url(#alnScan)"/>`;
    out += `<line x1="${f1(x)}" y1="150" x2="${f1(x)}" y2="370" stroke="${C.aquaBright}" stroke-opacity="0.9" stroke-width="2" filter="url(#alnGlow)"/>`;
    for (let s = 0; s < 4; s++) {
      out += `<circle cx="${f1(x)}" cy="${(180 + s * 55).toFixed(0)}" r="1.6" fill="#eafdff" fill-opacity="0.9"/>`;
    }
  }

  // HUD (NON scalato: resta agganciato ai bordi del pannello) ─────────────────
  let hud = "";
  // contatore mascherina
  const cur1 = Math.min(N, Math.floor(align * N) + 1);
  hud += `<text x="650" y="40" text-anchor="end" font-family="${MONO}" font-size="13" letter-spacing="1.5" fill="${C.aqua}">ALIGNER ${pad2(cur1)} / ${N}</text>`;
  // pillole + percentuale
  const curIdx = clamp(Math.floor(align * N), 0, N - 1);
  const gx = 40, gw = 560, gap = 3;
  const pwid = (gw - (N - 1) * gap) / N;
  for (let i = 0; i < N; i++) {
    const x = gx + i * (pwid + gap);
    const fill = i < curIdx ? C.tealDeep : i === curIdx ? C.aqua : C.pillFuture;
    hud += `<rect x="${f1(x)}" y="424" width="${f1(pwid)}" height="5" rx="2.5" fill="${fill}"/>`;
  }
  hud += `<text x="650" y="429" text-anchor="end" font-family="${MONO}" font-size="12" fill="${C.text}">${Math.round(align * 100)}%</text>`;

  // Arcata scalata ~1.3× attorno al proprio centro per riempire l'orbita dei
  // marker in modo armonico, lasciando l'HUD ai bordi.
  const SC = 1.3, CX = 340, CY = 252;
  return `<g transform="translate(${CX} ${CY}) scale(${SC}) translate(${-CX} ${-CY})">${out}</g>${hud}`;
}

// Stato per render statico (SSR / reduced-motion): arcata allineata e catturata.
const STATIC_STATE: SceneState = { align: 1, scan: 1, beamX: 0, beamActive: false, alignerOp: 1, seat: 0, N: 14 };

export function AlignerSequence({
  numeroMascherine = 14,
  durataCiclo = 9000,
  reducedMotion = false,
  className,
}: AlignerSequenceProps) {
  const N = numeroMascherine;
  const gRef = useRef<SVGGElement>(null);

  const initialMarkup = useMemo(() => buildScene({ ...STATIC_STATE, N }), [N]);

  useEffect(() => {
    const g = gRef.current;
    if (!g) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion || prefersReduced) {
      g.innerHTML = buildScene({ ...STATIC_STATE, N });
      g.setAttribute("opacity", "1");
      return;
    }

    const grow = durataCiclo * (6500 / 9000);
    const fadeOutStart = durataCiclo * (8400 / 9000);
    const fadeOutEnd = durataCiclo * (8900 / 9000);
    const xMin = 150, xMax = 530;
    let raf = 0;
    let last = -100;

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (now - last < 33) return; // ~30fps
      last = now;

      const tt = now % durataCiclo;
      const raw = clamp(tt / grow, 0, 1);
      const scan = clamp(raw / 0.3, 0, 1);
      const align = smoothstep(clamp((raw - 0.3) / 0.7, 0, 1));
      const beamActive = raw < 0.32;
      const beamX = lerp(xMin, xMax, scan);
      const alignerOp = clamp((raw - 0.32) / 0.12, 0, 1);
      const frac = (align * N) % 1;
      const seat = Math.max(0, 1 - frac * 6);

      let fade = 1;
      if (tt < 500) fade = tt / 500;
      else if (tt > fadeOutStart) fade = clamp((fadeOutEnd - tt) / (fadeOutEnd - fadeOutStart), 0, 1);

      g.innerHTML = buildScene({ align, scan, beamX, beamActive, alignerOp, seat, N });
      g.setAttribute("opacity", fade.toFixed(3));
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [N, durataCiclo, reducedMotion]);

  return (
    <svg
      viewBox="0 0 680 460"
      width="100%"
      role="img"
      className={className}
      style={{ display: "block" }}
    >
      <title>Sequenza di allineatori ortodontici</title>
      <desc>
        Arcata dentale superiore in vista tre quarti: uno scanner cattura i denti
        e una sequenza di mascherine trasparenti li allinea progressivamente, con
        contatore della mascherina e barra di avanzamento.
      </desc>

      <defs>
        <linearGradient id="alnEnamel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d2bd97" />
          <stop offset="32%" stopColor="#e7dcc6" />
          <stop offset="64%" stopColor="#f1ece0" />
          <stop offset="100%" stopColor="#f6fafc" />
        </linearGradient>
        <linearGradient id="alnScan" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#7FD7E3" stopOpacity="0" />
          <stop offset="100%" stopColor="#7FD7E3" stopOpacity="0.16" />
        </linearGradient>
        <linearGradient id="alnRoot" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4FB3BF" stopOpacity="0" />
          <stop offset="55%" stopColor="#4FB3BF" stopOpacity="0.07" />
          <stop offset="100%" stopColor="#5fd0db" stopOpacity="0.2" />
        </linearGradient>
        <filter id="alnGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2.2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <pattern id="alnGrid" width="42" height="42" patternUnits="userSpaceOnUse">
          <path d="M42 0 H0 V42" fill="none" stroke="rgba(127,215,227,0.05)" strokeWidth="1" />
        </pattern>
      </defs>

      {/* Pannello di fondo + griglia tenue — leggero, non "inscatola" i marker. */}
      <rect x="8" y="8" width="664" height="444" rx="18" fill="rgba(8,19,25,0.35)" stroke={C.panelBorder} strokeWidth="1" />
      <rect x="8" y="8" width="664" height="444" rx="18" fill="url(#alnGrid)" />

      {/* Nuvola di punti digitali — dà profondità/tridimensionalità allo sfondo.
          Due gruppi con deriva lenta (parallasse) + twinkle per-punto. Tutto si
          disattiva con prefers-reduced-motion. */}
      <style>{`
        .aln-cloud-a{animation:alnDriftA 17s ease-in-out infinite}
        .aln-cloud-b{animation:alnDriftB 23s ease-in-out infinite}
        .aln-pt{animation-name:alnTwk;animation-timing-function:ease-in-out;animation-iteration-count:infinite}
        @keyframes alnDriftA{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
        @keyframes alnDriftB{0%,100%{transform:translateY(0)}50%{transform:translateY(6px)}}
        @keyframes alnTwk{0%,100%{opacity:.3}50%{opacity:1}}
        @media (prefers-reduced-motion: reduce){.aln-cloud-a,.aln-cloud-b,.aln-pt{animation:none}}
      `}</style>
      {([0, 1] as const).map((grp) => (
        <g key={grp} className={grp === 0 ? "aln-cloud-a" : "aln-cloud-b"}>
          {DUST.filter((p) => p.grp === grp).map((p, i) => (
            <circle
              key={i} className="aln-pt" cx={p.x} cy={p.y} r={p.r}
              fill={p.c} fillOpacity={p.op}
              style={{ animationDuration: `${p.dur}s`, animationDelay: `${p.delay}s` }}
            />
          ))}
        </g>
      ))}

      {/* Scena dinamica (arcata anatomica + scanner + allineatore + HUD) */}
      <g ref={gRef} dangerouslySetInnerHTML={{ __html: initialMarkup }} />
    </svg>
  );
}
