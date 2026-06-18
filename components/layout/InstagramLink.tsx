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

export function InstagramFloatingLink() {
  return (
    <a
      href={INSTAGRAM_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Follow me on Instagram ${INSTAGRAM_HANDLE}`}
      className="fixed bottom-24 right-4 z-[70] inline-flex items-center gap-2 rounded-full border border-aqua/70 bg-aqua px-4 py-3 text-sm font-bold text-night shadow-[0_0_36px_-12px_rgba(0,221,249,0.95),0_18px_45px_-24px_rgba(2,7,10,0.9)] backdrop-blur-md transition-all hover:-translate-y-0.5 hover:bg-canvas hover:text-teal-deep sm:bottom-6 sm:right-6"
    >
      <InstagramIcon className="h-5 w-5" />
      <span className="hidden sm:inline">Follow me on IG</span>
      <span>{INSTAGRAM_HANDLE}</span>
    </a>
  );
}
