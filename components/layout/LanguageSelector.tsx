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
    <nav aria-label={ariaLabel} className="flex items-center gap-1">
      {locales.map((locale, i) => {
        const isCurrent = locale === current;
        return (
          <span key={locale} className="flex items-center">
            {i > 0 ? (
              <span aria-hidden className={dark ? "text-white/25" : "text-titanium"}>
                /
              </span>
            ) : null}
            <Link
              href={translatePath(pathname, locale)}
              hrefLang={locale}
              aria-current={isCurrent ? "true" : undefined}
              className={[
                "px-2 py-1 text-xs font-medium uppercase tracking-wider transition-colors",
                isCurrent
                  ? dark
                    ? "text-aqua-dark"
                    : "text-teal-deep"
                  : dark
                    ? "text-white/55 hover:text-white"
                    : "text-ink/50 hover:text-teal-deep",
              ].join(" ")}
            >
              <span className="sr-only">{localeNames[locale]} — </span>
              {locale}
            </Link>
          </span>
        );
      })}
    </nav>
  );
}

export type { Locale };
