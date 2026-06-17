import Link from "next/link";
import type { Audience, Locale } from "@/lib/i18n";
import { sectionPath } from "@/lib/routes";
import { sectionLabel, orderedSections } from "@/content/navigation";
import { Icon, sectionIconName } from "@/components/ui/icons";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";

/** Visual section navigation: an icon-led grid linking to every section page. */
export function SectionNavGrid({
  locale,
  audience,
  heading,
}: {
  locale: Locale;
  audience: Audience;
  heading: string;
}) {
  const sections = orderedSections(audience);

  return (
    <section className="bg-canvas">
      <Container className="py-16 sm:py-20">
        <Reveal>
          <h2 className="text-2xl font-semibold text-teal-deep sm:text-3xl">
            {heading}
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((section, i) => (
            <Reveal key={section} delay={i * 0.04}>
              <Link
                href={sectionPath(locale, audience, section)}
                className="group flex items-center gap-4 rounded-2xl border border-titanium/60 bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-aqua/50 hover:shadow-[0_18px_40px_-26px_rgba(15,76,92,0.5)]"
              >
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-teal-deep/6 text-teal-deep ring-1 ring-teal-deep/8 transition-colors group-hover:bg-aqua/15">
                  <Icon name={sectionIconName(audience, section)} className="h-7 w-7" />
                </span>
                <span className="font-medium text-ink/85 group-hover:text-teal-deep">
                  {sectionLabel(locale, audience, section)}
                </span>
                <span
                  aria-hidden
                  className="ml-auto text-aqua opacity-0 transition-opacity group-hover:opacity-100"
                >
                  →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
