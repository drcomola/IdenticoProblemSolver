"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "./icons";

type Labels = {
  email: string;
  emailCopy: string;
  emailCopied: string;
  emailUnavailable: string;
  emailUseForm: string;
};

/**
 * Premium inline email reveal for a clinic card. Intentionally NOT a mailto:
 * link — clicking "Email" reveals the address as plain visible text with a
 * one-click copy. When the clinic has no email we never show an empty value:
 * we show "Email non disponibile" and point the user to the booking form.
 */
export function ClinicEmail({ email, labels }: { email?: string; labels: Labels }) {
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);

  // No address for this clinic → no empty email, just a clear note.
  if (!email) {
    return (
      <div className="mt-3 rounded-xl border border-titanium/60 bg-canvas/40 px-3 py-2">
        <p className="text-xs font-medium text-ink/55">{labels.emailUnavailable}</p>
        <p className="mt-0.5 text-xs text-ink/45">{labels.emailUseForm}</p>
      </div>
    );
  }

  function markCopied() {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function copy() {
    const text = email!;
    // Prefer the async Clipboard API; fall back to execCommand for contexts
    // where it's unavailable. If both fail, the address stays visible to copy
    // manually.
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        markCopied();
        return;
      }
    } catch {
      /* fall through to legacy copy */
    }
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      document.execCommand("copy");
      ta.remove();
      markCopied();
    } catch {
      /* leave the address on screen for manual copy */
    }
  }

  if (!revealed) {
    return (
      <button
        type="button"
        onClick={() => setRevealed(true)}
        className="inline-flex items-center gap-1.5 rounded-full border border-teal-deep/20 px-3 py-1.5 text-xs font-medium text-teal-deep transition-colors hover:bg-teal-deep/5"
      >
        <Icon name="mail" className="h-3.5 w-3.5" />
        {labels.email}
      </button>
    );
  }

  return (
    <AnimatePresence initial={false}>
      <motion.div
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        className="inline-flex flex-wrap items-center gap-2 rounded-full border border-aqua/40 bg-aqua/5 px-3 py-1.5"
      >
        <Icon name="mail" className="h-3.5 w-3.5 text-teal" />
        <span className="select-all text-xs font-medium text-teal-deep">{email}</span>
        <button
          type="button"
          onClick={copy}
          className="inline-flex items-center gap-1 rounded-full border border-teal-deep/20 bg-white px-2.5 py-1 text-[0.7rem] font-medium text-teal-deep transition-colors hover:bg-teal-deep/5"
        >
          {copied ? (
            <>
              <span aria-hidden>✓</span> {labels.emailCopied}
            </>
          ) : (
            labels.emailCopy
          )}
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
