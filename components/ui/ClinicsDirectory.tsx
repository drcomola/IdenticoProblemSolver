import {
  clinics,
  clinicEmbedUrl,
  clinicFullAddress,
  clinicMapsUrl,
  clinicPoints,
  clinicWhatsappUrl,
} from "@/content/clinics";
import type { Dictionary } from "@/content/types";
import { Icon } from "./icons";
import { ClinicsMap } from "./ClinicsMap";

type Labels = Dictionary["clinics"];

/**
 * Directory of collaborating clinics. Each card carries the address, a tel link,
 * a WhatsApp button (only for mobile-capable numbers), a Google Maps directions
 * link and an on-demand inline map embed (keyless, no API key, lazy-loaded).
 *
 * An optional combined all-pins map is shown at the top when
 * NEXT_PUBLIC_CLINICS_MAP_URL (a Google "My Maps" embed URL) is configured.
 */
export function ClinicsDirectory({ labels }: { labels: Labels }) {
  const overviewUrl = process.env.NEXT_PUBLIC_CLINICS_MAP_URL;

  return (
    <div>
      {/* Combined overview map: a Google "My Maps" embed if configured, otherwise
          a keyless Leaflet/OpenStreetMap map with every pin. */}
      <div className="mb-10">
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-aqua">
          {labels.mapOverviewTitle}
        </h3>
        {overviewUrl ? (
          <div className="overflow-hidden rounded-2xl border border-titanium/60">
            <iframe
              title={labels.mapOverviewTitle}
              src={overviewUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[460px] w-full"
            />
          </div>
        ) : (
          <ClinicsMap points={clinicPoints()} linkLabel={labels.directions} />
        )}
      </div>

      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {clinics.map((clinic) => (
          <li
            key={clinic.id}
            className="flex flex-col rounded-2xl border border-titanium/60 bg-white p-6"
          >
            <h3 className="text-base font-semibold text-teal-deep">{clinic.name}</h3>
            <p className="mt-2 flex items-start gap-2 text-sm leading-relaxed text-ink/70">
              <Icon name="pin" className="mt-0.5 h-4 w-4 shrink-0 text-aqua" />
              <span>
                {clinic.address ? (
                  <>
                    {clinic.address}
                    <br />
                  </>
                ) : null}
                {[clinic.zip, clinic.city].filter(Boolean).join(" ")}
                {clinic.province ? ` (${clinic.province})` : ""}
              </span>
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {clinic.tel ? (
                <a
                  href={`tel:${clinic.tel}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-teal-deep/20 px-3 py-1.5 text-xs font-medium text-teal-deep transition-colors hover:bg-teal-deep/5"
                >
                  <Icon name="phone" className="h-3.5 w-3.5" />
                  {labels.call}
                </a>
              ) : null}
              {clinic.mobile && clinic.tel ? (
                <a
                  href={clinicWhatsappUrl(clinic)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-teal-deep/20 px-3 py-1.5 text-xs font-medium text-teal-deep transition-colors hover:bg-teal-deep/5"
                >
                  <Icon name="whatsapp" className="h-3.5 w-3.5" />
                  {labels.whatsapp}
                </a>
              ) : null}
              <a
                href={`mailto:${clinic.email}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-teal-deep/20 px-3 py-1.5 text-xs font-medium text-teal-deep transition-colors hover:bg-teal-deep/5"
              >
                <Icon name="mail" className="h-3.5 w-3.5" />
                {labels.email}
              </a>
              <a
                href={clinicMapsUrl(clinic)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-teal-deep/20 px-3 py-1.5 text-xs font-medium text-teal-deep transition-colors hover:bg-teal-deep/5"
              >
                <Icon name="directions" className="h-3.5 w-3.5" />
                {labels.directions}
              </a>
            </div>

            <details className="group mt-4">
              <summary className="cursor-pointer list-none text-xs font-medium text-aqua hover:text-teal-deep">
                {labels.showMap}
              </summary>
              <div className="mt-3 overflow-hidden rounded-xl border border-titanium/60">
                <iframe
                  title={`${clinic.name} — ${clinicFullAddress(clinic)}`}
                  src={clinicEmbedUrl(clinic)}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-56 w-full"
                />
              </div>
            </details>
          </li>
        ))}
      </ul>
    </div>
  );
}
