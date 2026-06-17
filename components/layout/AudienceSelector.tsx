import Link from "next/link";
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
}: {
  patients: Choice;
  colleagues: Choice;
}) {
  const choices = [patients, colleagues];
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {choices.map((choice, i) => (
        <Reveal key={choice.href} delay={0.1 + i * 0.08}>
          <Link
            href={choice.href}
            className="group flex h-full flex-col justify-between rounded-3xl border border-titanium/70 bg-white/80 p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-aqua/60 hover:shadow-[0_28px_60px_-30px_rgba(15,76,92,0.5)]"
          >
            <div>
              <h2 className="text-2xl font-semibold text-teal-deep">
                {choice.label}
              </h2>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-ink/70">
                {choice.description}
              </p>
            </div>
            <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-aqua transition-transform duration-300 group-hover:gap-3">
              →
            </span>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
