import Image from "next/image";

/**
 * Premium watermark — flowing guilloché "ribbon" lines (digital/aligner motion),
 * placed full-bleed behind hero / CTA sections. Tone picks the contrast-correct
 * variant (teal on light, aqua on dark). Decorative (aria-hidden).
 *
 * Place inside a `relative` section and keep real content above with `relative z-10`.
 */
const SRC = {
  light: "/images/brand/filigree-wave.png",
  dark: "/images/brand/filigree-wave-dark.png",
} as const;

export function Filigree({
  tone = "light",
  className = "",
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <Image
        src={SRC[tone]}
        alt=""
        fill
        priority={false}
        sizes="100vw"
        className="select-none object-cover object-right"
      />
    </div>
  );
}
