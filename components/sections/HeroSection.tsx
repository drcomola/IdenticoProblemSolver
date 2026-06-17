import { type ReactNode } from "react";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { Filigree } from "../ui/Filigree";

/**
 * Primary hero. Renders the single page H1. `eyebrow` is a small label above the
 * title; `tone` switches between the light premium wash and the dark night field.
 */
export function HeroSection({
  eyebrow,
  icon,
  title,
  subtitle,
  intro,
  actions,
  tone = "light",
  aside,
}: {
  eyebrow?: string;
  icon?: ReactNode;
  title: string;
  subtitle?: string;
  intro?: string;
  actions?: ReactNode;
  tone?: "light" | "dark";
  aside?: ReactNode;
}) {
  const dark = tone === "dark";
  return (
    <section
      className={`relative overflow-hidden ${dark ? "bg-night-field text-canvas" : "bg-aqua-wash text-ink"}`}
    >
      <Filigree tone={dark ? "dark" : "light"} />
      <Container className="relative z-10 py-20 sm:py-28 lg:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            {icon || eyebrow ? (
              <Reveal>
                <div className="mb-5 flex items-center gap-3">
                  {icon ? (
                    <span
                      className={`flex h-14 w-14 items-center justify-center rounded-2xl [&_svg]:h-8 [&_svg]:w-8 ${
                        dark
                          ? "bg-white/5 text-aqua-dark ring-1 ring-white/10"
                          : "bg-teal-deep/8 text-teal-deep ring-1 ring-teal-deep/10"
                      }`}
                    >
                      {icon}
                    </span>
                  ) : null}
                  {eyebrow ? (
                    <p
                      className={`text-xs font-semibold uppercase tracking-[0.22em] ${
                        dark ? "text-aqua-dark" : "text-aqua"
                      }`}
                    >
                      {eyebrow}
                    </p>
                  ) : null}
                </div>
              </Reveal>
            ) : null}

            <Reveal delay={0.05}>
              <h1 className="text-balance text-4xl font-semibold leading-[1.08] sm:text-5xl lg:text-6xl">
                {title}
              </h1>
            </Reveal>

            {subtitle ? (
              <Reveal delay={0.12}>
                <p
                  className={`mt-6 max-w-xl text-lg leading-relaxed ${
                    dark ? "text-canvas/75" : "text-ink/70"
                  }`}
                >
                  {subtitle}
                </p>
              </Reveal>
            ) : null}

            {intro ? (
              <Reveal delay={0.16}>
                <p
                  className={`mt-5 max-w-xl text-[0.98rem] leading-relaxed ${
                    dark ? "text-canvas/60" : "text-ink/60"
                  }`}
                >
                  {intro}
                </p>
              </Reveal>
            ) : null}

            {actions ? (
              <Reveal delay={0.2}>
                <div className="mt-9 flex flex-wrap gap-4">{actions}</div>
              </Reveal>
            ) : null}
          </div>

          {aside ? (
            <Reveal delay={0.15} className="lg:pl-6">
              {aside}
            </Reveal>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
