/**
 * Placeholder clinic list. Real collaborating clinics + availability are added
 * in a later phase (and may later carry LocalBusiness JSON-LD). Phase 1 renders
 * the layout shell only — no invented locations.
 */
export function ClinicList({
  emptyLabel,
}: {
  emptyLabel: string;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-titanium bg-white/60 p-8 text-center">
      <p className="text-sm text-ink/60">{emptyLabel}</p>
    </div>
  );
}
