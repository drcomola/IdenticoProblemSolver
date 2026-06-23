import { type Locale, audiences } from "@/lib/i18n";
import { audiencePath, localeHomePath, sectionPath } from "@/lib/routes";
import { getDictionary } from "@/content";
import { sectionLabel, orderedSections } from "@/content/navigation";
import { SectionBrandIcon } from "@/components/icons/SectionBrandIcon";
import { Container } from "../ui/Container";
import { NavMenu, type NavGroup } from "./NavMenu";

/** Sticky premium header — wordmark, journey dropdowns, language, mobile menu. */
export function Header({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  const groups: NavGroup[] = audiences.map((audience) => ({
    key: audience,
    label: dict.audienceSelector[audience],
    href: audiencePath(locale, audience),
    items: orderedSections(audience).map((section) => ({
      label: sectionLabel(locale, audience, section),
      href: sectionPath(locale, audience, section),
      icon: <SectionBrandIcon audience={audience} section={section} className="h-[22px] w-[22px]" />,
    })),
  }));

  return (
    <header className="sticky top-0 z-50 border-b border-titanium/45 bg-canvas/[0.86] backdrop-blur-xl">
      <Container>
        <NavMenu
          brandName={dict.brandName}
          brandTagline={dict.brandTagline}
          homeHref={localeHomePath(locale)}
          groups={groups}
          locale={locale}
          langAria={dict.languageSelector.ariaLabel}
        />
      </Container>
    </header>
  );
}
