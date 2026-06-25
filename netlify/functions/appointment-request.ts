/**
 * Netlify Function (v2) — patient appointment requests + general contact.
 *
 * Endpoint (auto-derived from the file name):
 *   POST /.netlify/functions/appointment-request
 *
 * Why a Netlify Function (and not a Next.js / Vercel API route)?
 *   This site is hosted on Netlify; server-side email sending lives in a
 *   Netlify Function so it works regardless of the Next runtime.
 *
 * SECURITY — recipient is resolved SERVER-SIDE only:
 *   The frontend sends a clinicId / bookingSlug, never a recipient address.
 *   We look the clinic up here and decide where the email goes. This prevents a
 *   tampered client from redirecting appointment requests to an arbitrary inbox.
 *
 * RECIPIENT FALLBACK:
 *   - clinic has an `email`            → send to that clinic inbox
 *   - clinic has NO `email`            → send to CENTRAL_EMAIL (drcomola@gmail.com)
 *   (see `clinicRecipient` in content/clinics.ts)
 *
 * replyTo = the patient's email, so the clinic secretary can reply straight to
 * the patient from their inbox.
 *
 * Env vars:
 *   RESEND_API_KEY          (required) — https://resend.com
 *   APPOINTMENT_FROM_EMAIL  (optional) — verified sender; defaults to the
 *                                        iDenTiCo sender below
 *   APPOINTMENT_BCC_EMAIL   (optional) — silent copy of every request
 *
 * NOTE: the default sender domain `identicomed.com` must be verified in Resend
 * before delivery works. Until then set APPOINTMENT_FROM_EMAIL to a verified
 * address (e.g. Resend's `onboarding@resend.dev` for testing).
 *
 * This function does NOT use a CMS, a database, and does NOT store patient data:
 * it only sends one email and returns a success/error response.
 */

import {
  CENTRAL_EMAIL,
  clinicByIdOrSlug,
  clinicRecipient,
} from "../../content/clinics";

const DEFAULT_FROM = "iDenTiCo Prenotazioni <no-reply@identicomed.com>";

type AppointmentPayload = {
  kind?: "appointment" | "general";
  // appointment fields
  clinicId?: string;
  bookingSlug?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  age?: string;
  preferredCity?: string;
  hasXrays?: string; // "yes" | "no" | localized label
  reason?: string;
  consent?: boolean;
  source?: string; // language / page the request came from
  // general (colleague) contact fields
  subject?: string;
  replyTo?: string;
  fields?: { label: string; value: string }[];
  // anti-spam
  honeypot?: string;
};

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

// Enough validation for Italian/international numbers: 6–15 digits, optional
// leading "+" and the usual separators (spaces, dots, dashes, slashes, parens).
const isPhone = (v: string) => {
  const cleaned = v.trim();
  if (!/^[+]?[\d\s().\-/]+$/.test(cleaned)) return false;
  const digits = cleaned.replace(/\D/g, "");
  return digits.length >= 6 && digits.length <= 15;
};

const esc = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

async function sendViaResend(opts: {
  from: string;
  to: string;
  replyTo?: string;
  bcc?: string;
  subject: string;
  text: string;
  html: string;
}): Promise<{ ok: true } | { ok: false; status: number; detail?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { ok: false, status: 503, detail: "not-configured" };

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: opts.from,
      to: [opts.to],
      subject: opts.subject,
      text: opts.text,
      html: opts.html,
      ...(opts.replyTo ? { reply_to: opts.replyTo } : {}),
      ...(opts.bcc ? { bcc: [opts.bcc] } : {}),
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    console.error("[resend] error", res.status, detail);
    return { ok: false, status: 502, detail };
  }
  console.log("[resend] sent ok");
  return { ok: true };
}

export default async (req: Request): Promise<Response> => {
  if (req.method !== "POST") return json(405, { ok: false, reason: "method-not-allowed" });

  let body: AppointmentPayload;
  try {
    body = (await req.json()) as AppointmentPayload;
  } catch {
    return json(400, { ok: false, reason: "bad-request" });
  }

  // Anti-spam honeypot: a hidden field no human fills in. If it has a value we
  // silently accept (200) without sending, so bots get no useful signal.
  if (body.honeypot && body.honeypot.trim() !== "") {
    return json(200, { ok: true });
  }

  const from = process.env.APPOINTMENT_FROM_EMAIL?.trim() || DEFAULT_FROM;
  const bcc = process.env.APPOINTMENT_BCC_EMAIL?.trim() || undefined;

  // ── General contact (colleagues "Richiedi consulenza") ────────────────────
  // No clinic involved → always the central inbox. Kept here so the colleague
  // form can submit server-side too (no mailto: anywhere on the site).
  if (body.kind === "general") {
    const replyTo = body.replyTo?.trim();
    if (!body.consent) return json(400, { ok: false, reason: "consent-required" });
    if (replyTo && !isEmail(replyTo)) return json(400, { ok: false, reason: "invalid-email" });

    const subject = body.subject?.trim() || "Richiesta dal sito";
    const rows = (body.fields ?? []).filter((f) => f.value && f.value !== "—");
    const text = rows.map((f) => `${f.label}: ${f.value}`).join("\n");
    const html = `<div style="font-family:Arial,sans-serif;font-size:14px;color:#111827">${rows
      .map((f) => `<p style="margin:4px 0"><strong>${esc(f.label)}:</strong> ${esc(f.value)}</p>`)
      .join("")}</div>`;

    const sent = await sendViaResend({ from, to: CENTRAL_EMAIL, replyTo, bcc, subject, text, html });
    if (!sent.ok) return json(sent.status, { ok: false, reason: "send-failed", detail: sent.detail });
    return json(200, { ok: true });
  }

  // ── Patient appointment request ───────────────────────────────────────────
  const firstName = body.firstName?.trim() ?? "";
  const lastName = body.lastName?.trim() ?? "";
  const phone = body.phone?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const reason = body.reason?.trim() ?? "";

  // Required-field + format validation (mirrors the client, never trusts it).
  if (!firstName || !lastName) return json(400, { ok: false, reason: "missing-name" });
  if (!email || !isEmail(email)) return json(400, { ok: false, reason: "invalid-email" });
  if (!phone || !isPhone(phone)) return json(400, { ok: false, reason: "invalid-phone" });
  if (!reason) return json(400, { ok: false, reason: "missing-reason" });
  if (body.consent !== true) return json(400, { ok: false, reason: "consent-required" });

  // Clinic must match a known clinic by id OR bookingSlug. Recipient is then
  // resolved here, server-side only.
  const clinic = clinicByIdOrSlug(body.clinicId || body.bookingSlug);
  if (!clinic) return json(400, { ok: false, reason: "unknown-clinic" });
  const recipient = clinicRecipient(clinic);

  const patientName = `${firstName} ${lastName}`.trim();
  const xrays =
    body.hasXrays == null || body.hasXrays === ""
      ? "—"
      : /^(yes|sì|si|true)$/i.test(body.hasXrays)
        ? "Sì"
        : "No";
  const timestamp = new Date().toISOString();

  const subject = `Nuova richiesta visita ortodontica - ${clinic.name} - ${patientName}`;

  const rows: [string, string][] = [
    ["Sede selezionata", clinic.name],
    ["Città sede", clinic.city],
    ["Destinatario", recipient],
    ["Paziente", patientName],
    ["Telefono", phone],
    ["Email", email],
    ["Età paziente", body.age?.trim() || "—"],
    ["Città preferita", body.preferredCity?.trim() || "—"],
    ["Radiografie / scansioni", xrays],
    ["Motivo della richiesta", reason],
    ["Origine richiesta", body.source?.trim() || "—"],
    ["Ricevuta il", timestamp],
  ];

  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");
  const html = `
  <div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#111827;line-height:1.55">
    <h2 style="color:#0F4C5C;margin:0 0 12px">Nuova richiesta di visita ortodontica</h2>
    <table style="border-collapse:collapse">
      ${rows
        .map(
          ([k, v]) =>
            `<tr>
               <td style="padding:4px 14px 4px 0;color:#0F4C5C;font-weight:bold;vertical-align:top;white-space:nowrap">${esc(
                 k,
               )}</td>
               <td style="padding:4px 0;vertical-align:top">${esc(v)}</td>
             </tr>`,
        )
        .join("")}
    </table>
    <p style="margin:16px 0 0;color:#6b7280;font-size:12px">
      Rispondendo a questa email scrivi direttamente al paziente (${esc(email)}).
    </p>
  </div>`;

  const sent = await sendViaResend({
    from,
    to: recipient,
    replyTo: email, // clinic secretary replies straight to the patient
    bcc,
    subject,
    text,
    html,
  });

  if (!sent.ok) {
    return json(sent.status, { ok: false, reason: "send-failed", detail: sent.detail });
  }
  return json(200, { ok: true });
};
