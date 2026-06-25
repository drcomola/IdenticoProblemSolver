"use client";

import {
  Suspense,
  useEffect,
  useMemo,
  useState,
  type FormEvent,
} from "react";
import { useSearchParams } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/content/types";
import { Icon } from "../ui/icons";

export type ClinicChoice = {
  id: string;
  bookingSlug: string;
  name: string;
  city: string;
};

type BookingLabels = Dictionary["booking"];

const ENDPOINT = "/.netlify/functions/appointment-request";

/**
 * Patient appointment booking form.
 *
 * It collects the patient details + the chosen clinic and POSTs them to the
 * Netlify Function, which resolves the recipient email SERVER-SIDE from the
 * clinic (never from anything the browser sends). No mailto:, no patient data
 * stored locally.
 */
export function AppointmentForm({
  locale,
  labels,
  clinics,
  microcopy,
  submitLabel,
}: {
  locale: Locale;
  labels: BookingLabels;
  clinics: ClinicChoice[];
  microcopy?: string;
  submitLabel: string;
}) {
  const [clinicId, setClinicId] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const selected = useMemo(
    () => clinics.find((c) => c.id === clinicId),
    [clinics, clinicId],
  );

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const xraysRaw = String(data.get("xrays") ?? "");
    const hasXrays =
      xraysRaw === labels.xraysYes ? "yes" : xraysRaw === labels.xraysNo ? "no" : "";

    const payload = {
      kind: "appointment" as const,
      // The clinic is identified by id/slug; the recipient is resolved on the
      // server. We deliberately do NOT send any recipient address.
      clinicId,
      bookingSlug: selected?.bookingSlug,
      firstName: String(data.get("firstName") ?? ""),
      lastName: String(data.get("lastName") ?? ""),
      phone: String(data.get("phone") ?? ""),
      email: String(data.get("email") ?? ""),
      age: String(data.get("age") ?? ""),
      preferredCity: String(data.get("city") ?? ""),
      hasXrays,
      reason: String(data.get("reason") ?? ""),
      consent: data.get("consent") === "on",
      source: `${locale} · ${typeof window !== "undefined" ? window.location.pathname : ""}`,
      // Anti-spam honeypot — must stay empty.
      honeypot: String(data.get("company") ?? ""),
    };

    setStatus("sending");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-2xl border border-aqua/40 bg-aqua/5 p-8 text-center"
      >
        <p className="text-lg font-medium text-teal-deep">{labels.success}</p>
      </div>
    );
  }

  const inputCls =
    "rounded-xl border border-titanium/70 bg-canvas/50 px-4 py-2.5 text-sm focus-visible:border-aqua focus-visible:outline-none";

  return (
    <>
      {microcopy ? (
        <p className="mb-8 text-center text-ink/70">{microcopy}</p>
      ) : null}
      <form
        onSubmit={handleSubmit}
        noValidate
        className="grid gap-5 rounded-2xl border border-titanium/60 bg-white p-7"
      >
        {/* Preselect the clinic from ?sede=<bookingSlug> (Suspense-isolated so
            the rest of the form can stay statically rendered). */}
        <Suspense fallback={null}>
          <SedePreselect clinics={clinics} onPick={setClinicId} />
        </Suspense>

        {/* Clinic picker */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="clinic" className="text-sm font-medium text-ink/80">
            {labels.clinicLabel}
            <span className="text-teal"> *</span>
          </label>
          <select
            id="clinic"
            name="clinic"
            required
            value={clinicId}
            onChange={(e) => setClinicId(e.target.value)}
            className={inputCls}
          >
            <option value="">{labels.clinicPlaceholder}</option>
            {clinics.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} — {c.city}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field name="firstName" label={labels.firstName} required inputCls={inputCls} autoComplete="given-name" />
          <Field name="lastName" label={labels.lastName} required inputCls={inputCls} autoComplete="family-name" />
          <Field name="phone" label={labels.phone} type="tel" required inputCls={inputCls} autoComplete="tel" />
          <Field name="email" label={labels.email} type="email" required inputCls={inputCls} autoComplete="email" />
          <Field name="age" label={labels.age} type="text" inputCls={inputCls} inputMode="numeric" />
          <Field name="city" label={labels.city} inputCls={inputCls} autoComplete="address-level2" />

          <div className="flex flex-col gap-1.5">
            <label htmlFor="xrays" className="text-sm font-medium text-ink/80">
              {labels.xrays}
            </label>
            <select id="xrays" name="xrays" className={inputCls} defaultValue="">
              <option value="">—</option>
              <option value={labels.xraysYes}>{labels.xraysYes}</option>
              <option value={labels.xraysNo}>{labels.xraysNo}</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <label htmlFor="reason" className="text-sm font-medium text-ink/80">
              {labels.reason}
              <span className="text-teal"> *</span>
            </label>
            <textarea id="reason" name="reason" required rows={4} className={inputCls} />
          </div>
        </div>

        {/* Honeypot: hidden from humans, catches bots. Must stay empty. */}
        <div aria-hidden className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0">
          <label htmlFor="company">Company (leave empty)</label>
          <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <label className="flex items-start gap-3 text-xs text-ink/65">
          <input type="checkbox" name="consent" required className="mt-0.5 accent-teal-deep" />
          <span>{labels.consent}</span>
        </label>

        {status === "error" ? (
          <p role="alert" className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
            {labels.error}
          </p>
        ) : null}

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="submit"
            disabled={status === "sending"}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-teal-deep px-7 py-3 text-sm font-medium text-canvas transition-all duration-300 hover:-translate-y-0.5 hover:bg-teal-deep/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "sending" ? (
              <span
                aria-hidden
                className="h-4 w-4 animate-spin rounded-full border-2 border-canvas/40 border-t-canvas"
              />
            ) : (
              <Icon name="mail" className="h-4 w-4" />
            )}
            {status === "sending" ? labels.sending : submitLabel}
          </button>
          <p className="text-xs text-ink/55">{labels.requiredHint}</p>
        </div>
      </form>
    </>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
  inputCls,
  autoComplete,
  inputMode,
}: {
  name: string;
  label: string;
  type?: "text" | "email" | "tel";
  required?: boolean;
  inputCls: string;
  autoComplete?: string;
  inputMode?: "numeric";
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sm font-medium text-ink/80">
        {label}
        {required ? <span className="text-teal"> *</span> : null}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        inputMode={inputMode}
        className={inputCls}
      />
    </div>
  );
}

/** Reads ?sede=<bookingSlug> and preselects the matching clinic once. */
function SedePreselect({
  clinics,
  onPick,
}: {
  clinics: ClinicChoice[];
  onPick: (id: string) => void;
}) {
  const params = useSearchParams();
  useEffect(() => {
    const sede = params.get("sede");
    if (!sede) return;
    const match = clinics.find((c) => c.bookingSlug === sede || c.id === sede);
    if (match) onPick(match.id);
    // Only react to the param/clinics, not to onPick identity.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, clinics]);
  return null;
}
