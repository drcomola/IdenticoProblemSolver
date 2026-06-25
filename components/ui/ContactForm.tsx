"use client";

import { useState, type FormEvent } from "react";
import { Icon } from "./icons";

export type Field = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "textarea" | "select";
  required?: boolean;
  options?: string[];
};

const ENDPOINT = "/.netlify/functions/appointment-request";

/**
 * General contact form (colleagues "Richiedi consulenza"). On submit it POSTs
 * to the Netlify Function in "general" mode — the request is delivered to the
 * central inbox server-side. No mailto: anywhere; the email client never opens.
 */
export function ContactForm({
  fields,
  submitLabel,
  successMessage,
  errorMessage,
  consentLabel,
  subject,
  hint,
}: {
  fields: Field[];
  submitLabel: string;
  successMessage: string;
  errorMessage: string;
  consentLabel: string;
  subject: string;
  hint?: string;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const fieldData = fields.map((f) => ({
      label: f.label,
      value: (data.get(f.name) as string | null)?.trim() || "—",
    }));

    const emailField = fields.find((f) => f.type === "email");
    const replyTo = emailField ? String(data.get(emailField.name) ?? "") : undefined;

    setStatus("sending");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: "general",
          subject,
          replyTo,
          consent: data.get("consent") === "on",
          fields: fieldData,
          honeypot: String(data.get("company") ?? ""),
        }),
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
                {field.required ? <span className="text-teal"> *</span> : null}
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

      {/* Honeypot — hidden anti-spam field, must stay empty. */}
      <div aria-hidden className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0">
        <label htmlFor="company">Company (leave empty)</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <label className="flex items-start gap-3 text-xs text-ink/65">
        <input type="checkbox" name="consent" required className="mt-0.5 accent-teal-deep" />
        <span>{consentLabel}</span>
      </label>

      {status === "error" ? (
        <p role="alert" className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMessage}
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
          {submitLabel}
        </button>
        {hint ? <p className="text-xs text-ink/55">{hint}</p> : null}
      </div>
    </form>
  );
}
