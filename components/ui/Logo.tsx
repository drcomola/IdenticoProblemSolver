import Image from "next/image";

/**
 * Brand logo — the real supplied mark (watercolor ring + line-art molar).
 *
 * Two prepared variants handle contrast:
 *   - tone "light" → dark tooth outline, for light backgrounds (header)
 *   - tone "dark"  → light tooth outline, for dark backgrounds (gateway, footer)
 *
 * The asset is ~square (381×355); size it via `className` height + `w-auto`.
 */
const SRC = {
  light: "/images/brand/logo-trimmed.png",
  dark: "/images/brand/logo-light.png",
} as const;

export function Logo({
  className = "h-10 w-auto",
  tone = "light",
  priority = false,
  alt = "Dr. Giorgio Comola",
}: {
  className?: string;
  tone?: "light" | "dark";
  priority?: boolean;
  alt?: string;
}) {
  return (
    <Image
      src={SRC[tone]}
      alt={alt}
      width={381}
      height={355}
      priority={priority}
      className={className}
    />
  );
}
