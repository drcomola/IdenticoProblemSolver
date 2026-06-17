"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "gc-cookie-choice";

/**
 * Lightweight cookie notice. The site uses only essential/technical storage, so
 * this is primarily informational + records the visitor's acknowledgement in
 * localStorage. Shown once until a choice is made.
 */
export function CookieBanner({
  message,
  accept,
  essential,
  moreLabel,
  moreHref,
}: {
  message: string;
  accept: string;
  essential: string;
  moreLabel: string;
  moreHref: string;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  function choose(value: "accepted" | "essential") {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* ignore */
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie"
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-titanium/60 bg-canvas/95 backdrop-blur-md"
    >
      <div className="container-px flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-3xl text-sm leading-relaxed text-ink/75">
          {message}{" "}
          <Link href={moreHref} className="font-medium text-teal-deep underline underline-offset-2">
            {moreLabel}
          </Link>
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => choose("essential")}
            className="rounded-full border border-teal-deep/25 px-5 py-2 text-sm font-medium text-teal-deep transition-colors hover:bg-teal-deep/5"
          >
            {essential}
          </button>
          <button
            type="button"
            onClick={() => choose("accepted")}
            className="rounded-full bg-teal-deep px-5 py-2 text-sm font-medium text-canvas transition-colors hover:bg-teal-deep/90"
          >
            {accept}
          </button>
        </div>
      </div>
    </div>
  );
}
