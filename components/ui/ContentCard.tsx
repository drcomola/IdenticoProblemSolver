import { type ReactNode } from "react";

/** Reusable premium card — used for "who it is for", services, feature lists. */
export function ContentCard({
  title,
  children,
  className = "",
}: {
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`group rounded-xl premium-panel p-7 transition-all duration-300 hover:-translate-y-1 hover:border-aqua/55 hover:shadow-glow ${className}`}
    >
      {title ? (
        <h3 className="mb-3 text-lg font-semibold text-teal-deep">{title}</h3>
      ) : null}
      <div className="text-[0.95rem] leading-relaxed text-ink/[0.78]">{children}</div>
    </div>
  );
}
