import { NextResponse } from "next/server";
import { CENTRAL_EMAIL, clinicById } from "@/content/clinics";

/**
 * Contact endpoint. Sends the form as an email via Resend.
 *
 * Recipient routing:
 *   - patients → the selected clinic's inbox (fallback: central inbox)
 *   - colleagues → central inbox (drcomola@gmail.com)
 *
 * Configure with env vars (e.g. on Vercel):
 *   RESEND_API_KEY   — from https://resend.com (free tier)
 *   CONTACT_FROM     — a verified sender, e.g. "Sito <noreply@giorgiocomola.com>"
 *                      (for first tests Resend allows "onboarding@resend.dev")
 *
 * If RESEND_API_KEY is missing, returns 503 so the client falls back to mailto.
 */

type Payload = {
  audience?: "patients" | "colleagues";
  clinicId?: string;
  subject?: string;
  replyTo?: string;
  fields?: { label: string; value: string }[];
};

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, reason: "bad-request" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { ok: false, reason: "not-configured" },
      { status: 503 },
    );
  }

  const recipient =
    body.audience === "patients" && body.clinicId
      ? clinicById(body.clinicId)?.email ?? CENTRAL_EMAIL
      : CENTRAL_EMAIL;

  const subject = body.subject?.trim() || "Richiesta dal sito";
  const lines = (body.fields ?? []).map((f) => `${f.label}: ${f.value}`);
  const text = lines.join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM || "onboarding@resend.dev",
        to: [recipient],
        subject,
        text,
        ...(body.replyTo ? { reply_to: body.replyTo } : {}),
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      return NextResponse.json(
        { ok: false, reason: "send-failed", detail },
        { status: 502 },
      );
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, reason: "send-error" }, { status: 502 });
  }
}
