const INSTAGRAM_URL = "https://www.instagram.com/drgio.92/";
const INSTAGRAM_HANDLE = "@drgio.92";

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
        dark ? "text-canvas/80 hover:text-aqua-dark" : "text-teal-deep hover:text-aqua"
      }`}
    >
      <InstagramIcon />
      Follow me on IG: {INSTAGRAM_HANDLE}
    </a>
  );
}

export function InstagramFloatingLink() {
  return (
    <a
      href={INSTAGRAM_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Follow me on Instagram ${INSTAGRAM_HANDLE}`}
      className="fixed bottom-24 right-4 z-[70] inline-flex items-center gap-2 rounded-full border border-white/25 bg-night/92 px-4 py-3 text-sm font-semibold text-canvas shadow-[0_18px_45px_-20px_rgba(15,76,92,0.7)] backdrop-blur-md transition-transform hover:-translate-y-0.5 hover:bg-teal-deep sm:bottom-6 sm:right-6"
    >
      <InstagramIcon className="h-5 w-5" />
      <span className="hidden sm:inline">Follow me on IG</span>
      <span>{INSTAGRAM_HANDLE}</span>
    </a>
  );
}
