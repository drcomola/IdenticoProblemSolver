import {
  clinics,
  clinicEmbedUrl,
  clinicFullAddress,
  clinicMapsUrl,
  clinicPoints,
  clinicWhatsappUrl,
} from "@/content/clinics";
import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/content/types";
import { Icon } from "./icons";
import { ClinicsMap } from "./ClinicsMap";
import { ClinicEmail } from "./ClinicEmail";

type Labels = Dictionary["clinics"];

/**
 * Directory of collaborating clinics. Each card carries the address, a tel link,
 * a WhatsApp button (only for mobile-capable numbers), a Google Maps directions
 * link and an on-demand inline map embed (keyless, no API key, lazy-loaded).
 *
 * An optional combined all-pins map is shown at the top when
 * NEXT_PUBLIC_CLINICS_MAP_URL (a Google "My Maps" embed URL) is configured.
 */
export function ClinicsDirectory({
  labels,
  bookingBasePath,
}: {
  labels: Labels;
  /** Base path of the booking page, e.g. /it/pazienti/prenota. The per-clinic
   *  CTA appends ?sede=<bookingSlug>. */
  bookingBasePath: string;
}) {
  const overviewUrl = process.env.NEXT_PUBLIC_CLINICS_MAP_URL;

  return (
    <div>
      {/* Combined overview map: a Google "My Maps" embed if configured, otherwise
          a keyless Leaflet/OpenStreetMap map with every pin. */}
      <div className="mb-10">
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-teal">
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
            {clinic.logo ? (
              <div className="relative mb-4 h-14 w-36">
                <Image
                  src={clinic.logo}
                  alt={clinic.name}
                  fill
                  className="object-contain object-left"
                  sizes="144px"
                />
              </div>
            ) : null}
            <h3 className="text-base font-semibold text-teal-deep">
              {clinic.website ? (
                <a
                  href={clinic.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline-offset-2 transition-colors hover:text-teal hover:underline"
                >
                  {clinic.name}
                  <span aria-hidden className="ml-1 text-xs text-teal/70">↗</span>
                </a>
              ) : (
                clinic.name
              )}
            </h3>
            <p className="mt-2 flex items-start gap-2 text-sm leading-relaxed text-ink/70">
              <Icon name="pin" className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
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

            {/* Contact shortcuts. Phone stays a tel: link; directions stay an
                external map link; email is a reveal/copy (NOT mailto:). */}
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
              {clinic.whatsapp ? (
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
                href={clinicMapsUrl(clinic)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-teal-deep/20 px-3 py-1.5 text-xs font-medium text-teal-deep transition-colors hover:bg-teal-deep/5"
              >
                <Icon name="directions" className="h-3.5 w-3.5" />
                {labels.directions}
              </a>
            </div>

            {/* Email: revealed as plain text + copy, or a graceful note. */}
            <div className="mt-3">
              <ClinicEmail email={clinic.email} labels={labels} />
            </div>

            <details className="group mt-4">
              <summary className="cursor-pointer list-none text-xs font-medium text-teal hover:text-teal-deep">
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

            {/* Booking CTA → preselects this clinic on the booking page. */}
            <Link
              href={`${bookingBasePath}?sede=${clinic.bookingSlug}`}
              className="mt-5 inline-flex items-center justify-center gap-1.5 rounded-full bg-teal-deep px-4 py-2.5 text-xs font-semibold text-canvas transition-all duration-300 hover:-translate-y-0.5 hover:bg-teal-deep/90"
            >
              <Icon name="calendar" className="h-3.5 w-3.5" />
              {labels.bookHere}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
