"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, localeNames, type Locale } from "@/lib/i18n";
import { translatePath } from "@/lib/routes";

/**
 * Locale switcher. Keeps the visitor on the equivalent page in the target
 * language by translating the current pathname through the route maps.
 */
export function LanguageSelector({
  current,
  ariaLabel,
  tone = "light",
}: {
  current: Locale;
  ariaLabel: string;
  tone?: "light" | "dark";
}) {
  const pathname = usePathname() ?? `/${current}`;
  const dark = tone === "dark";

  return (
    <nav
      aria-label={ariaLabel}
      className={[
        "inline-flex items-center gap-1 rounded-full border p-1",
        dark
          ? "border-white/[0.12] bg-white/[0.04]"
          : "border-titanium/60 bg-white/75 shadow-[0_12px_35px_-28px_rgba(0,50,61,0.9)]",
      ].join(" ")}
    >
      {locales.map((locale) => {
        const isCurrent = locale === current;
        return (
          <Link
            key={locale}
            href={translatePath(pathname, locale)}
            hrefLang={locale}
            aria-current={isCurrent ? "true" : undefined}
            className={[
              "rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all duration-300",
              isCurrent
                ? dark
                  ? "bg-aqua text-night shadow-[0_0_24px_-12px_rgba(0,221,249,0.95)]"
                  : "bg-teal-deep text-canvas"
                : dark
                  ? "text-white/[0.58] hover:bg-white/[0.08] hover:text-white"
                  : "text-ink/55 hover:bg-teal-deep/5 hover:text-teal-deep",
            ].join(" ")}
          >
            <span className="sr-only">{localeNames[locale]} - </span>
            {locale}
          </Link>
        );
      })}
    </nav>
  );
}

export type { Locale };
