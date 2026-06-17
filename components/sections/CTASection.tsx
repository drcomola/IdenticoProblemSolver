import { type ReactNode } from "react";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { Filigree } from "../ui/Filigree";

/** Closing conversion band — dark premium field with a clear primary action. */
export function CTASection({
  heading,
  body,
  actions,
}: {
  heading: string;
  body?: string;
  actions: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-night-field text-canvas">
      <Filigree tone="dark" />
      <Container className="relative z-10 py-20 sm:py-24">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="text-balance text-3xl font-semibold sm:text-4xl">
            {heading}
          </h2>
          {body ? (
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-canvas/70">
              {body}
            </p>
          ) : null}
          <div className="mt-9 flex flex-wrap justify-center gap-4">{actions}</div>
        </Reveal>
      </Container>
    </section>
  );
}
