import Link from "next/link";
import { type Locale } from "@/lib/i18n";
import { audiencePath } from "@/lib/routes";
import { getDictionary } from "@/content";
import { PRACTITIONER } from "@/content/legal";
import { SITE_TAGLINE } from "@/lib/seo";
import { Container } from "../ui/Container";
import { Logo } from "../ui/Logo";
import { LanguageSelector } from "./LanguageSelector";
import { InstagramInlineLink } from "./InstagramLink";

/** Premium footer: journeys, language, legal/medical disclaimers. */
export function Footer({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-night text-canvas">
      <div className="bg-technical-grid pointer-events-none absolute inset-0 opacity-45" />
      <Logo
        tone="dark"
        alt=""
        className="pointer-events-none absolute -right-20 bottom-8 h-80 w-auto opacity-[0.035]"
      />
      <Container className="relative z-10 py-16 sm:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_0.8fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <Logo tone="dark" className="h-14 w-auto" />
              <p className="font-display text-2xl font-semibold">
                {dict.brandName}
              </p>
            </div>
            <p className="mt-4 max-w-md text-sm font-semibold uppercase tracking-[0.2em] text-aqua">
              {SITE_TAGLINE}
            </p>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-canvas/[0.62]">
              {dict.footer.medicalNote}
            </p>
            <div className="mt-5">
              <InstagramInlineLink tone="dark" />
            </div>
          </div>

          <nav aria-label={dict.footer.sectionsTitle}>
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              {dict.footer.sectionsTitle}
            </h2>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <Link
                  href={audiencePath(locale, "patients")}
                  className="text-canvas/[0.78] transition-colors hover:text-aqua"
                >
                  {dict.nav.patients}
                </Link>
              </li>
              <li>
                <Link
                  href={audiencePath(locale, "colleagues")}
                  className="text-canvas/[0.78] transition-colors hover:text-aqua"
                >
                  {dict.nav.colleagues}
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              {dict.footer.legalTitle}
            </h2>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <Link
                  href={`/${locale}/legal/privacy`}
                  className="text-canvas/[0.78] transition-colors hover:text-aqua"
                >
                  {dict.footer.privacy}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/legal/cookie`}
                  className="text-canvas/[0.78] transition-colors hover:text-aqua"
                >
                  {dict.footer.cookie}
                </Link>
              </li>
            </ul>
            <div className="mt-6">
              <LanguageSelector
                current={locale}
                ariaLabel={dict.languageSelector.ariaLabel}
                tone="dark"
              />
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-8">
          <p className="text-xs leading-relaxed text-canvas/45">
            {dict.footer.disclaimer}
          </p>
          <p className="mt-4 text-xs leading-relaxed text-canvas/[0.38]">
            {PRACTITIONER.name} - {PRACTITIONER.address}, {PRACTITIONER.zip}{" "}
            {PRACTITIONER.city} - P.IVA {PRACTITIONER.vat} - C.F.{" "}
            {PRACTITIONER.fiscalCode}
          </p>
          <p className="mt-2 text-xs text-canvas/[0.38]">
            (c) {year} {dict.brandName}. {dict.footer.rights}
          </p>
        </div>
      </Container>
    </footer>
  );
}
