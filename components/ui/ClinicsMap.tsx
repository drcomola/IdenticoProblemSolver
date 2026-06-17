"use client";

import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";
import type { ClinicPoint } from "@/content/clinics";

/**
 * Combined overview map with all clinic pins. Uses Leaflet + OpenStreetMap tiles
 * — no API key required. Leaflet is loaded inside an effect (client only), so it
 * never runs during SSR. Markers are custom on-brand pins; popups link out to the
 * clinic's exact location on Google Maps.
 */
export function ClinicsMap({
  points,
  linkLabel,
}: {
  points: ClinicPoint[];
  linkLabel: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    let map: import("leaflet").Map | undefined;
    let cancelled = false;

    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !ref.current) return;

      map = L.map(ref.current, {
        scrollWheelZoom: false,
        attributionControl: true,
      }).setView([45.5, 10.6], 6);

      L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          maxZoom: 18,
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        },
      ).addTo(map);

      const icon = L.divIcon({
        className: "",
        html: `<span style="display:block;width:18px;height:18px;border-radius:9999px;background:#0F4C5C;border:2.5px solid #fff;box-shadow:0 2px 6px rgba(15,76,92,.5)"></span>`,
        iconSize: [18, 18],
        iconAnchor: [9, 9],
        popupAnchor: [0, -10],
      });

      const markers = points.map((p) => {
        const m = L.marker([p.lat, p.lng], { icon }).addTo(map!);
        m.bindPopup(
          `<div style="font-family:Inter,system-ui,sans-serif;min-width:160px">
             <strong style="color:#0F4C5C">${p.name}</strong><br/>
             <span style="color:#475569">${p.city}</span><br/>
             <a href="${p.mapsUrl}" target="_blank" rel="noopener noreferrer" style="color:#1F7F93;font-weight:600">${linkLabel} →</a>
           </div>`,
        );
        return m;
      });

      if (markers.length) {
        map.fitBounds(L.featureGroup(markers).getBounds().pad(0.2));
      }
    })();

    return () => {
      cancelled = true;
      if (map) map.remove();
    };
  }, [points, linkLabel]);

  return (
    <div
      ref={ref}
      className="h-[460px] w-full rounded-2xl border border-titanium/60"
      role="region"
      aria-label="Mappa delle sedi"
    />
  );
}
