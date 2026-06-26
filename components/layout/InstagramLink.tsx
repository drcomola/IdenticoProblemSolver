"use client";

const INSTAGRAM_URL = "https://www.instagram.com/dr.gio92/";
const INSTAGRAM_HANDLE = "@dr.gio92";

function InstagramIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="4" y="4" width="16" height="16" rx="5" />
      <circle cx="12" cy="12" r="3.5" />
      <circle cx="17" cy="7" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function InstagramInlineLink({ tone = "light" }: { tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <a
      href={INSTAGRAM_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 text-sm font-medium transition-colors ${
        dark ? "text-canvas/[0.86] hover:text-aqua" : "text-teal-deep hover:text-teal"
      }`}
    >
      <InstagramIcon />
      Follow me on IG: {INSTAGRAM_HANDLE}
    </a>
  );
}

/**
 * Compact Instagram link for the header, sitting next to the language selector.
 * Replaces the old fixed/floating button so the hero top-right stays clear.
 */
export function InstagramHeaderLink() {
  return (
    <a
      href={INSTAGRAM_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Follow me on Instagram ${INSTAGRAM_HANDLE}`}
      className="hidden items-center gap-1.5 rounded-full border border-aqua bg-aqua/90 px-3 py-1.5 text-xs font-bold text-night shadow-[0_2px_14px_-4px_rgba(79,179,191,0.7)] transition-all hover:-translate-y-px hover:bg-aqua sm:inline-flex"
    >
      <InstagramIcon className="h-4 w-4" />
      <span className="hidden xl:inline">Follow me on IG</span>
      <span>{INSTAGRAM_HANDLE}</span>
    </a>
  );
}
