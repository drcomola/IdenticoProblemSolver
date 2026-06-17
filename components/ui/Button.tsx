import Link from "next/link";
import { type ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "onDark";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-medium tracking-wide transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua focus-visible:ring-offset-2";

const variants: Record<Variant, string> = {
  primary:
    "bg-teal-deep text-canvas shadow-sm hover:bg-teal-deep/90 hover:shadow-md hover:-translate-y-0.5",
  secondary:
    "border border-teal-deep/25 bg-transparent text-teal-deep hover:border-teal-deep/60 hover:bg-teal-deep/5",
  ghost: "text-teal-deep hover:text-aqua",
  onDark:
    "bg-aqua-dark text-night shadow-sm hover:bg-aqua-dark/90 hover:-translate-y-0.5 focus-visible:ring-offset-night",
};

/** Link-styled CTA button. Internal links use next/link; external get rel/target. */
export function Button({
  href,
  variant = "primary",
  external = false,
  className = "",
  children,
}: {
  href: string;
  variant?: Variant;
  external?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const cls = `${base} ${variants[variant]} ${className}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
