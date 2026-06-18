import type { SVGProps } from "react";
import type { Audience } from "@/lib/i18n";
import type { SectionKey } from "@/lib/routes";

/** Icon name union — keeps usage type-safe. */
export type IconName =
  | "user"
  | "clipboard"
  | "scan"
  | "aligner"
  | "stethoscope"
  | "cases"
  | "pin"
  | "faq"
  | "calendar"
  | "cap"
  | "presentation"
  | "certificate"
  | "exchange"
  | "handshake"
  | "chevron"
  | "menu"
  | "close"
  | "mail"
  | "whatsapp"
  | "phone"
  | "directions";

const paths: Record<IconName, React.ReactNode> = {
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M5 21c0-3.9 3.1-7 7-7s7 3.1 7 7" />
    </>
  ),
  clipboard: (
    <>
      <rect x="6" y="4" width="12" height="17" rx="2" />
      <path d="M9 4a3 3 0 0 1 6 0M9 11h6M9 15h4" />
    </>
  ),
  scan: (
    <>
      <path d="M4 8V6a2 2 0 0 1 2-2h2M16 4h2a2 2 0 0 1 2 2v2M20 16v2a2 2 0 0 1-2 2h-2M8 20H6a2 2 0 0 1-2-2v-2" />
      <path d="M4 12h16" />
    </>
  ),
  aligner: (
    <>
      <path d="M5 9c0-2 2-3 7-3s7 1 7 3c0 3-1.5 8-3 8-1 0-1-2-4-2s-3 2-4 2c-1.5 0-3-5-3-8Z" />
    </>
  ),
  stethoscope: (
    <>
      <path d="M6 4v5a4 4 0 0 0 8 0V4" />
      <path d="M10 17a5 5 0 0 0 9 0v-2" />
      <circle cx="19" cy="13" r="2" />
    </>
  ),
  cases: (
    <>
      <rect x="3" y="6" width="8" height="12" rx="1.5" />
      <rect x="13" y="6" width="8" height="12" rx="1.5" />
      <path d="M7 10v4M17 10v4M15 12h4" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  faq: (
    <>
      <path d="M21 15a2 2 0 0 1-2 2H8l-4 4V5a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2Z" />
      <path d="M9.5 9a2.5 2.5 0 0 1 4.5 1.5c0 1.5-2 2-2 3M12 16h.01" />
    </>
  ),
  calendar: (
    <>
      <rect x="4" y="5" width="16" height="16" rx="2" />
      <path d="M4 10h16M8 3v4M16 3v4M9 15l2 2 4-4" />
    </>
  ),
  cap: (
    <>
      <path d="M12 5 2 9l10 4 10-4-10-4Z" />
      <path d="M6 11v5c0 1.1 2.7 2.5 6 2.5s6-1.4 6-2.5v-5M22 9v5" />
    </>
  ),
  presentation: (
    <>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20l4-4 4 4M7 11l2.5-2.5L12 11l3-3.5" />
    </>
  ),
  certificate: (
    <>
      <rect x="4" y="4" width="16" height="12" rx="2" />
      <circle cx="12" cy="10" r="2.5" />
      <path d="M9.5 15 8 21l4-2 4 2-1.5-6" />
    </>
  ),
  exchange: (
    <>
      <path d="M4 8h13l-3-3M20 16H7l3 3" />
    </>
  ),
  handshake: (
    <>
      <path d="M3 12l4-4 5 4 2-2 5 4M11 12l2 2M14 10l2 2" />
      <path d="M3 12v4l4 3 5-3M21 12v4l-4 3" />
    </>
  ),
  chevron: <path d="M6 9l6 6 6-6" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  whatsapp: (
    <path d="M12 3a9 9 0 0 0-7.7 13.6L3 21l4.5-1.3A9 9 0 1 0 12 3Zm-3 5.5c.2 0 .4 0 .6.4l.8 1.8c.1.2 0 .4-.1.6l-.5.6c-.2.2-.2.4-.1.6.3.6.9 1.4 1.6 1.9.6.4 1 .5 1.3.6.2 0 .4 0 .5-.2l.5-.7c.2-.2.4-.2.6-.1l1.7.8c.3.1.3.4.3.6 0 1-.8 1.8-1.6 1.9-1 .1-2 0-4-1.1-2.3-1.4-3.6-3.7-3.7-3.9-.1-.2-.9-1.3-.9-2.5s.6-1.8.9-2c.2-.3.5-.3.7-.3Z" />
  ),
  phone: (
    <path d="M5 4h3l2 5-2 1c.8 1.8 2.2 3.2 4 4l1-2 5 2v3c0 1-.8 1.8-1.8 1.7C12.5 22 4 16 3.3 7.8 3.2 6.8 4 6 5 6Z" />
  ),
  directions: (
    <>
      <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
      <path d="m9.5 10.5 5-2-2 5-1-2-2-1Z" />
    </>
  ),
};

/** Stroke icon. Inherits color via currentColor; size via className (w/h). */
export function Icon({
  name,
  className = "h-6 w-6",
  ...rest
}: { name: IconName; className?: string } & SVGProps<SVGSVGElement>) {
  const filled = name === "whatsapp" || name === "phone";
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden
      fill={filled ? "currentColor" : "none"}
      stroke={filled ? "none" : "currentColor"}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      {paths[name]}
    </svg>
  );
}

/** Maps each (audience, section) to its recognizable icon. */
const sectionIconMap: Record<Audience, Partial<Record<SectionKey, IconName>>> = {
  patients: {
    about: "user",
    "what-i-offer": "clipboard",
    "digital-orthodontics": "scan",
    invisalign: "aligner",
    "invisalign-game": "aligner",
    "patient-expert-program": "certificate",
    "first-consultation": "stethoscope",
    "clinical-cases": "cases",
    clinics: "pin",
    faq: "faq",
    book: "calendar",
  },
  colleagues: {
    about: "user",
    education: "cap",
    "private-courses": "presentation",
    "sas-courses": "certificate",
    "align-p2p": "exchange",
    "clinical-cases": "cases",
    consulting: "handshake",
  },
};

export function sectionIconName(
  audience: Audience,
  section: SectionKey,
): IconName {
  return sectionIconMap[audience][section] ?? "clipboard";
}
