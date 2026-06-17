import Link from "next/link";
import { type Locale } from "@/lib/i18n";
import { audiencePath } from "@/lib/routes";
import { getDictionary } from "@/content";
import { PRACTITIONER } from "@/content/legal";
import { SITE_TAGLINE } from "@/lib/seo";
import { Container } from "../ui/Container";
import { Logo } from "../ui/Logo";
import { LanguageSelector } from "./LanguageSelector";

/** Premium footer: journeys, language, legal/medical disclaimers. */
export function Footer({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const year = new Date().getFullYear();

  return (
    <footer className="bg-night text-canvas">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <Logo tone="dark" className="h-12 w-auto" />
              <p className="font-display text-xl font-semibold tracking-tightish">
                {dict.brandName}
              </p>
            </div>
            <p className="mt-3 text-sm uppercase tracking-[0.2em] text-aqua-dark">
              {SITE_TAGLINE}
            </p>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-canvas/60">
              {dict.footer.medicalNote}
            </p>
          </div>

          <nav aria-label={dict.footer.sectionsTitle}>
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-canvas/50">
              {dict.footer.sectionsTitle}
            </h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link
                  href={audiencePath(locale, "patients")}
                  className="text-canvas/80 transition-colors hover:text-aqua-dark"
                >
                  {dict.nav.patients}
                </Link>
              </li>
              <li>
                <Link
                  href={audiencePath(locale, "colleagues")}
                  className="text-canvas/80 transition-colors hover:text-aqua-dark"
                >
                  {dict.nav.colleagues}
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-canvas/50">
              {dict.footer.legalTitle}
            </h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link
                  href={`/${locale}/legal/privacy`}
                  className="text-canvas/80 transition-colors hover:text-aqua-dark"
                >
                  {dict.footer.privacy}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/legal/cookie`}
                  className="text-canvas/80 transition-colors hover:text-aqua-dark"
                >
                  {dict.footer.cookie}
                </Link>
              </li>
            </ul>
            <div className="mt-5">
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
          <p className="mt-4 text-xs leading-relaxed text-canvas/40">
            {PRACTITIONER.name} — {PRACTITIONER.address}, {PRACTITIONER.zip}{" "}
            {PRACTITIONER.city} — P.IVA {PRACTITIONER.vat} — C.F.{" "}
            {PRACTITIONER.fiscalCode}
          </p>
          <p className="mt-2 text-xs text-canvas/40">
            © {year} {dict.brandName}. {dict.footer.rights}
          </p>
        </div>
      </Container>
    </footer>
  );
}
