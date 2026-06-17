import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";

/** A quiet editorial band: an H2 heading + supporting paragraph. */
export function PageIntro({
  heading,
  body,
  align = "left",
}: {
  heading: string;
  body: string;
  align?: "left" | "center";
}) {
  return (
    <section className="bg-canvas">
      <Container className="py-16 sm:py-20">
        <Reveal
          className={
            align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"
          }
        >
          <h2 className="text-2xl font-semibold text-teal-deep sm:text-3xl">
            {heading}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink/75">{body}</p>
        </Reveal>
      </Container>
    </section>
  );
}
