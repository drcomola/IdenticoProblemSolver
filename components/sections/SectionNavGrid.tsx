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
  const dark = audience === "colleagues";

  return (
    <section className={dark ? "bg-night text-canvas" : "bg-canvas"}>
      <Container className="py-16 sm:py-20">
        <Reveal>
          <h2
            className={`text-2xl font-semibold sm:text-3xl ${
              dark ? "text-canvas" : "text-teal-deep"
            }`}
          >
            {heading}
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((section, i) => (
            <Reveal key={section} delay={i * 0.04}>
              <Link
                href={sectionPath(locale, audience, section)}
                className={`group flex items-center gap-4 rounded-xl border p-5 transition-all duration-300 hover:-translate-y-0.5 ${
                  dark
                    ? "border-white/10 bg-white/[0.045] shadow-panel hover:border-aqua/55 hover:bg-white/[0.07]"
                    : "border-titanium/60 bg-white shadow-soft hover:border-aqua/50 hover:shadow-glow"
                }`}
              >
                <span
                  className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-lg ring-1 transition-colors ${
                    dark
                      ? "bg-aqua/10 text-teal ring-aqua/20 group-hover:bg-aqua/[0.18]"
                      : "bg-teal-deep/6 text-teal-deep ring-teal-deep/8 group-hover:bg-aqua/15"
                  }`}
                >
                  <Icon name={sectionIconName(audience, section)} className="h-7 w-7" />
                </span>
                <span
                  className={`font-semibold ${
                    dark
                      ? "text-canvas/[0.78] group-hover:text-canvas"
                      : "text-ink/85 group-hover:text-teal-deep"
                  }`}
                >
                  {sectionLabel(locale, audience, section)}
                </span>
                <span
                  aria-hidden
                  className="ml-auto text-teal opacity-0 transition-opacity group-hover:opacity-100"
                >
                  -&gt;
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
