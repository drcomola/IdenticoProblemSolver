import Link from "next/link";
import { type ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "onDark";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-semibold tracking-wide transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua focus-visible:ring-offset-2";

const variants: Record<Variant, string> = {
  primary:
    "bg-teal-deep text-canvas shadow-[0_18px_45px_-28px_rgba(0,50,61,0.95)] hover:bg-teal hover:shadow-glow hover:-translate-y-0.5",
  secondary:
    "border border-teal-deep/30 bg-white/70 text-teal-deep backdrop-blur-sm hover:border-aqua/70 hover:bg-white hover:text-teal",
  ghost: "text-teal-deep hover:text-teal",
  onDark:
    "bg-aqua text-night shadow-[0_0_32px_-14px_rgba(0,221,249,0.95)] hover:bg-canvas hover:-translate-y-0.5 focus-visible:ring-offset-night",
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
