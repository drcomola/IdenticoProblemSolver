/**
 * Premium watermark — a stylized clear aligner tray (the supplied logo motif),
 * tiled sparsely and very faintly behind hero / CTA sections. Thin single-weight
 * line, generous spacing: luxury-tech, not playful. Decorative (aria-hidden).
 *
 * Place inside a `relative` section and keep real content above with `relative z-10`.
 */
export function Filigree({
  tone = "light",
  className = "",
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  const color = tone === "dark" ? "#7FD7E3" : "#0F4C5C";
  const opacity = tone === "dark" ? 0.07 : 0.05;
  const id = `filigree-aligner-${tone}`;

  return (
    <svg
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id={id}
          width="330"
          height="210"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(-7)"
        >
          <g
            transform="translate(70 78)"
            fill="none"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={opacity}
          >
            {/* aligner tray — top rim + scalloped (tooth) lower edge */}
            <path d="M12 32 C24 9 142 7 154 30 C155 34 154 39 150 42 q-9 9 -18 0 q-9 9 -18 0 q-9 9 -18 0 q-9 9 -18 0 q-9 9 -18 0 q-9 9 -18 0 q-9 9 -18 0 C18 40 13 37 12 32 Z" />
            {/* inner rim line */}
            <path d="M24 30 C42 16 128 15 142 30" opacity="0.7" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
