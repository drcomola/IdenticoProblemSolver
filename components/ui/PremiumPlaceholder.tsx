/**
 * Premium image placeholder.
 *
 * Per the Brand spec we must NOT use generic dental stock photography. Until the
 * real assets (clinical cases, congress photos, 3D renders, schematics) are
 * shot/curated in a later phase, image slots render this minimal, on-brand
 * placeholder carrying an editable label + alt note.
 */
export function PremiumPlaceholder({
  label,
  ratio = "4 / 3",
  tone = "light",
  className = "",
}: {
  label: string;
  ratio?: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  const isDark = tone === "dark";
  return (
    <div
      role="img"
      aria-label={label}
      style={{ aspectRatio: ratio }}
      className={[
        "relative w-full overflow-hidden rounded-2xl border",
        isDark
          ? "border-white/10 bg-night-soft"
          : "border-titanium/60 bg-gradient-to-br from-white to-canvas",
        className,
      ].join(" ")}
    >
      {/* Minimal schematic grid — luxury-tech, non-photographic */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage: isDark
            ? "linear-gradient(rgba(127,215,227,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(127,215,227,0.06) 1px, transparent 1px)"
            : "linear-gradient(rgba(15,76,92,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(15,76,92,0.05) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div aria-hidden className="absolute inset-0 flex items-center justify-center p-6">
        <span
          className={[
            "rounded-full px-4 py-1.5 text-[0.7rem] font-medium uppercase tracking-[0.18em]",
            isDark ? "bg-white/5 text-aqua-dark" : "bg-teal-deep/5 text-teal-deep/70",
          ].join(" ")}
        >
          {label}
        </span>
      </div>
    </div>
  );
}
