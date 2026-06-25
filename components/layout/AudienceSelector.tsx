import Link from "next/link";
import { AlignerIcon } from "@/components/icons/BrandIcons";
import { Reveal } from "../ui/Reveal";

type Choice = {
  href: string;
  label: string;
  description: string;
};

/**
 * Landing-page path chooser: two large premium cards (Patients / Colleagues).
 * This is the core "two journeys, one philosophy" interaction from the Brand.
 */
export function AudienceSelector({
  patients,
  colleagues,
  support,
  actionLabel,
}: {
  patients: Choice;
  colleagues: Choice;
  support: Choice & { actionLabel: string };
  actionLabel: string;
}) {
  const choices = [
    { ...patients, eyebrow: "01" },
    { ...colleagues, eyebrow: "02" },
  ];

  return (
    <div>
      <div className="grid gap-5 lg:grid-cols-2">
        {choices.map((choice, i) => (
          <Reveal key={choice.href} delay={0.1 + i * 0.08}>
            <Link
              href={choice.href}
              className="group relative flex min-h-[22rem] flex-col justify-between overflow-hidden rounded-xl border border-titanium/60 bg-white/[0.86] p-8 shadow-soft backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-aqua/70 hover:shadow-glow sm:p-10"
            >
              <span className="absolute right-6 top-5 font-display text-7xl leading-none text-teal-deep/[0.045] transition-colors group-hover:text-aqua/[0.12]">
                {choice.eyebrow}
              </span>
              <span className="mb-10 h-px w-24 bg-gradient-to-r from-aqua to-blue-accent" />
              <div>
                <h2 className="max-w-sm text-3xl font-semibold leading-tight text-teal-deep sm:text-4xl">
                  {choice.label}
                </h2>
                <p className="mt-5 max-w-md text-base leading-relaxed text-ink/70">
                  {choice.description}
                </p>
              </div>
              <span className="mt-10 inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-teal transition-all duration-300 group-hover:gap-4 group-hover:text-aqua">
                {actionLabel} <span aria-hidden>-&gt;</span>
              </span>
            </Link>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.28}>
        <Link
          href={support.href}
          className="group mt-5 flex flex-col gap-5 rounded-xl border border-aqua/40 bg-gradient-to-r from-teal-deep to-teal p-6 text-canvas shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-aqua hover:shadow-glow sm:flex-row sm:items-center sm:p-8"
        >
          <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-white/10 text-aqua-soft">
            <AlignerIcon className="h-11 w-11" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block font-display text-2xl font-semibold sm:text-3xl">
              {support.label}
            </span>
            <span className="mt-2 block max-w-3xl text-sm leading-relaxed text-canvas/75 sm:text-base">
              {support.description}
            </span>
          </span>
          <span className="inline-flex shrink-0 items-center gap-3 text-sm font-semibold uppercase tracking-[0.14em] text-aqua-soft transition-all group-hover:gap-4 group-hover:text-white">
            {support.actionLabel} <span aria-hidden>-&gt;</span>
          </span>
        </Link>
      </Reveal>
    </div>
  );
}
