import type { Locale } from "@/lib/i18n";

/** Minimal, rounded SVG flags for the locale chooser. Decorative (aria-hidden). */
export function Flag({ locale, className = "" }: { locale: Locale; className?: string }) {
  const common = {
    viewBox: "0 0 60 40",
    className,
    "aria-hidden": true as const,
    xmlns: "http://www.w3.org/2000/svg",
  };

  switch (locale) {
    case "it":
      return (
        <svg {...common}>
          <defs>
            <clipPath id="r-it">
              <rect width="60" height="40" rx="6" />
            </clipPath>
          </defs>
          <g clipPath="url(#r-it)">
            <rect width="20" height="40" fill="#008C45" />
            <rect x="20" width="20" height="40" fill="#F4F5F0" />
            <rect x="40" width="20" height="40" fill="#CD212A" />
          </g>
        </svg>
      );
    case "es":
      return (
        <svg {...common}>
          <defs>
            <clipPath id="r-es">
              <rect width="60" height="40" rx="6" />
            </clipPath>
          </defs>
          <g clipPath="url(#r-es)">
            <rect width="60" height="40" fill="#AA151B" />
            <rect y="10" width="60" height="20" fill="#F1BF00" />
          </g>
        </svg>
      );
    case "en":
    default:
      return (
        <svg {...common}>
          <defs>
            <clipPath id="r-en">
              <rect width="60" height="40" rx="6" />
            </clipPath>
          </defs>
          <g clipPath="url(#r-en)">
            <rect width="60" height="40" fill="#012169" />
            <path d="M0 0 60 40M60 0 0 40" stroke="#fff" strokeWidth="8" />
            <path d="M0 0 60 40M60 0 0 40" stroke="#C8102E" strokeWidth="4" />
            <path d="M30 0V40M0 20H60" stroke="#fff" strokeWidth="13" />
            <path d="M30 0V40M0 20H60" stroke="#C8102E" strokeWidth="7" />
          </g>
        </svg>
      );
  }
}

/** Patient icon — a person, "exemplary" per the request. */
export function PatientIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      aria-hidden
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="24" cy="16" r="8" />
      <path d="M10 40c0-7.7 6.3-14 14-14s14 6.3 14 14" />
    </svg>
  );
}

/** Colleague icon — an academic / education cap, for professionals. */
export function ColleagueIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      aria-hidden
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M24 10 44 19 24 28 4 19z" />
      <path d="M12 23v9c0 2.2 5.4 5 12 5s12-2.8 12-5v-9" />
      <path d="M44 19v10" />
    </svg>
  );
}
