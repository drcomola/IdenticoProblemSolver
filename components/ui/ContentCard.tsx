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
      className={`group rounded-2xl border border-titanium/60 bg-white/70 p-7 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-aqua/50 hover:shadow-[0_18px_40px_-24px_rgba(15,76,92,0.45)] ${className}`}
    >
      {title ? (
        <h3 className="mb-3 text-lg font-semibold text-teal-deep">{title}</h3>
      ) : null}
      <div className="text-[0.95rem] leading-relaxed text-ink/80">{children}</div>
    </div>
  );
}
