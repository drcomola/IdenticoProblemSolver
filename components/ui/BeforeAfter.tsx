"use client";

import Image from "next/image";
import { useId, useState } from "react";

/**
 * Before/after comparison with a draggable divider. Accessible via a range
 * slider. Used on clinical-case detail pages.
 */
export function BeforeAfter({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  beforeLabel = "Prima",
  afterLabel = "Dopo",
}: {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  beforeLabel?: string;
  afterLabel?: string;
}) {
  const id = useId();
  const [pos, setPos] = useState(50);

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-titanium/60 bg-night">
      <div className="relative aspect-[4/3] w-full select-none">
        {/* after (full) */}
        <Image src={afterSrc} alt={afterAlt} fill className="object-cover" sizes="(max-width:768px) 100vw, 700px" />
        {/* before (clipped to pos%) */}
        <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
          <Image
            src={beforeSrc}
            alt={beforeAlt}
            fill
            className="object-cover"
            sizes="(max-width:768px) 100vw, 700px"
            style={{ width: "100%" }}
          />
        </div>

        {/* divider */}
        <div
          className="pointer-events-none absolute inset-y-0 w-0.5 bg-canvas/90"
          style={{ left: `${pos}%` }}
        />

        <span className="absolute left-3 top-3 rounded-full bg-night/70 px-3 py-1 text-xs font-medium text-canvas">
          {beforeLabel}
        </span>
        <span className="absolute right-3 top-3 rounded-full bg-night/70 px-3 py-1 text-xs font-medium text-canvas">
          {afterLabel}
        </span>
      </div>

      <label className="sr-only" htmlFor={id}>
        {beforeLabel} / {afterLabel}
      </label>
      <input
        id={id}
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        className="absolute inset-x-0 bottom-1/2 h-2 w-full cursor-ew-resize appearance-none bg-transparent accent-aqua"
      />
    </div>
  );
}
