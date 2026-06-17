"use client";

import { useMemo, useState, type FormEvent } from "react";
import { Icon } from "./icons";

export type Field = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "textarea" | "select";
  required?: boolean;
  options?: string[];
};

export type ClinicOption = {
  id: string;
  name: string;
  city: string;
  email: string;
  tel?: string;
  mobile?: boolean;
  whatsappUrl: string;
  mapsUrl: string;
};

export type ClinicPicker = {
  label: string;
  placeholder: string;
  options: ClinicOption[];
  contactTitle: string;
  callLabel: string;
  whatsappLabel: string;
  directionsLabel: string;
};

/**
 * Contact form that, on submit, opens the visitor's email client with a
 * pre-filled message (no backend in Phase 1). Patients can also pick a preferred
 * clinic — which is added to the message and surfaces direct call/WhatsApp/map
 * shortcuts for that location.
 */
export function ContactForm({
  fields,
  submitLabel,
  successMessage,
  consentLabel,
  mailtoTo,
  mailtoSubject,
  hint,
  audience,
  clinicPicker,
}: {
  fields: Field[];
  submitLabel: string;
  successMessage: string;
  consentLabel: string;
  mailtoTo: string;
  mailtoSubject: string;
  hint?: string;
  audience: "patients" | "colleagues";
  clinicPicker?: ClinicPicker;
}) {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [clinicId, setClinicId] = useState("");

  const selectedClinic = useMemo(
    () => clinicPicker?.options.find((c) => c.id === clinicId),
    [clinicPicker, clinicId],
  );

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const fieldData = fields.map((f) => ({
      label: f.label,
      value: (data.get(f.name) as string | null)?.trim() || "—",
    }));
    if (clinicPicker && selectedClinic) {
      fieldData.push({
        label: clinicPicker.label,
        value: `${selectedClinic.name} (${selectedClinic.city})`,
      });
    }

    const emailField = fields.find((f) => f.type === "email");
    const replyTo = emailField
      ? String(data.get(emailField.name) ?? "")
      : undefined;

    setSending(true);
    // Try the server endpoint first (real email); fall back to mailto.
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          audience,
          clinicId: selectedClinic?.id,
          subject: mailtoSubject,
          replyTo,
          fields: fieldData,
        }),
      });
      if (res.ok) {
        setSent(true);
        setSending(false);
        return;
      }
    } catch {
      /* network/endpoint unavailable → fall back */
    }

    const recipient = selectedClinic?.email || mailtoTo;
    const body = fieldData.map((f) => `${f.label}: ${f.value}`).join("\n");
    const params = new URLSearchParams({ subject: mailtoSubject, body });
    window.location.href = `mailto:${recipient}?${params.toString()}`;
    setSending(false);
    setSent(true);
  }

  if (sent) {
    return (
      <div
        role="status"
        className="rounded-2xl border border-aqua/40 bg-aqua/5 p-8 text-center"
      >
        <p className="text-lg font-medium text-teal-deep">{successMessage}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="grid gap-5 rounded-2xl border border-titanium/60 bg-white p-7"
    >
      {clinicPicker ? (
        <div className="flex flex-col gap-1.5">
          <label htmlFor="clinic" className="text-sm font-medium text-ink/80">
            {clinicPicker.label}
          </label>
          <select
            id="clinic"
            name="clinic"
            value={clinicId}
            onChange={(e) => setClinicId(e.target.value)}
            className="rounded-xl border border-titanium/70 bg-canvas/50 px-4 py-2.5 text-sm focus-visible:border-aqua"
          >
            <option value="">{clinicPicker.placeholder}</option>
            {clinicPicker.options.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} — {c.city}
              </option>
            ))}
          </select>

          {selectedClinic ? (
            <div className="mt-2 rounded-xl border border-aqua/30 bg-aqua/5 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-aqua">
                {clinicPicker.contactTitle}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {selectedClinic.tel ? (
                  <a
                    href={`tel:${selectedClinic.tel}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-teal-deep/20 bg-white px-3 py-1.5 text-xs font-medium text-teal-deep hover:bg-teal-deep/5"
                  >
                    <Icon name="phone" className="h-3.5 w-3.5" />
                    {clinicPicker.callLabel}
                  </a>
                ) : null}
                {selectedClinic.mobile && selectedClinic.tel ? (
                  <a
                    href={selectedClinic.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-teal-deep/20 bg-white px-3 py-1.5 text-xs font-medium text-teal-deep hover:bg-teal-deep/5"
                  >
                    <Icon name="whatsapp" className="h-3.5 w-3.5" />
                    {clinicPicker.whatsappLabel}
                  </a>
                ) : null}
                <a
                  href={selectedClinic.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-teal-deep/20 bg-white px-3 py-1.5 text-xs font-medium text-teal-deep hover:bg-teal-deep/5"
                >
                  <Icon name="directions" className="h-3.5 w-3.5" />
                  {clinicPicker.directionsLabel}
                </a>
              </div>
            </div>
          ) : null}
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        {fields.map((field) => {
          const isWide = field.type === "textarea";
          return (
            <div
              key={field.name}
              className={`flex flex-col gap-1.5 ${isWide ? "sm:col-span-2" : ""}`}
            >
              <label htmlFor={field.name} className="text-sm font-medium text-ink/80">
                {field.label}
                {field.required ? <span className="text-aqua"> *</span> : null}
              </label>
              {field.type === "textarea" ? (
                <textarea
                  id={field.name}
                  name={field.name}
                  required={field.required}
                  rows={4}
                  className="rounded-xl border border-titanium/70 bg-canvas/50 px-4 py-2.5 text-sm focus-visible:border-aqua"
                />
              ) : field.type === "select" ? (
                <select
                  id={field.name}
                  name={field.name}
                  required={field.required}
                  className="rounded-xl border border-titanium/70 bg-canvas/50 px-4 py-2.5 text-sm focus-visible:border-aqua"
                >
                  <option value="">—</option>
                  {field.options?.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  id={field.name}
                  name={field.name}
                  type={field.type ?? "text"}
                  required={field.required}
                  className="rounded-xl border border-titanium/70 bg-canvas/50 px-4 py-2.5 text-sm focus-visible:border-aqua"
                />
              )}
            </div>
          );
        })}
      </div>

      <label className="flex items-start gap-3 text-xs text-ink/65">
        <input type="checkbox" name="consent" required className="mt-0.5 accent-teal-deep" />
        <span>{consentLabel}</span>
      </label>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={sending}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-teal-deep px-7 py-3 text-sm font-medium text-canvas transition-all duration-300 hover:-translate-y-0.5 hover:bg-teal-deep/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Icon name="mail" className="h-4 w-4" />
          {submitLabel}
        </button>
        {hint ? <p className="text-xs text-ink/55">{hint}</p> : null}
      </div>
    </form>
  );
}
