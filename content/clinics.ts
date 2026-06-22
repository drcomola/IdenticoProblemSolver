/**
 * Collaborating clinics (studi). Real partner practices supplied by Dr. Comola.
 * Phones are kept as given for display; `tel` is the dialable E.164-ish form and
 * `mobile` marks numbers that can receive WhatsApp.
 */

export type Clinic = {
  id: string;
  name: string;
  address?: string; // street + number (optional until confirmed)
  zip?: string;
  city: string;
  province?: string;
  country: string; // ISO display ("IT")
  phone?: string; // display (optional until confirmed)
  tel?: string; // dialable, e.g. +393396897057
  mobile?: boolean; // true → WhatsApp-capable
  email: string; // booking inbox for this clinic
  logo?: string; // /images/clinics/<id>.<ext> — empty when no logo supplied
};

/** Fallback inbox for clinics without a dedicated address. */
export const CENTRAL_EMAIL = "drcomola@gmail.com";

export const clinics: Clinic[] = [
  {
    id: "calabrese-torino",
    name: "Dott. Davide Calabrese",
    address: "Corso Francia 2/TER",
    zip: "10143",
    city: "Torino",
    country: "IT",
    phone: "+39 114 373515",
    tel: "+39114373515",
    mobile: false,
    email: "infostudiocalabrese@gmail.com",
  },
  {
    id: "givi-seregno",
    name: "Gi.Vi Dental Seregno",
    address: "Piazza Donatori del Sangue 2",
    zip: "20831",
    city: "Seregno",
    province: "MB",
    country: "IT",
    phone: "+39 39 238522",
    tel: "+3939238522",
    mobile: false,
    email: "accettazione@gividental.com",
  },
  {
    id: "givi-monza",
    name: "Gi.Vi Dental Monza",
    address: "Via Carlo Meda 63",
    zip: "20900",
    city: "Monza",
    province: "MB",
    country: "IT",
    phone: "+39 039 748434",
    tel: "+39039748434",
    mobile: false,
    email: "accettazione@gividental.com",
  },
  {
    id: "zorzi-piera",
    name: "Dr. Thomas Zorzi",
    address: "Località Piera 2",
    zip: "38038",
    city: "Piera",
    country: "IT",
    phone: "339 6897057",
    tel: "+393396897057",
    mobile: true,
    email: "thomaszorziodontoiatra@gmail.com",
  },
  {
    id: "arri-asti",
    name: "Dr. Marcello Arri",
    address: "Corso Volta 101",
    zip: "14100",
    city: "Asti",
    country: "IT",
    phone: "339 6897057",
    tel: "+393396897057",
    mobile: true,
    email: CENTRAL_EMAIL,
  },
  {
    id: "marco-pasqualini-milano",
    name: "Dr. Marco Pasqualini",
    address: "Via Cuneo 4",
    zip: "20149",
    city: "Milano",
    country: "IT",
    phone: "+39 02 799651",
    tel: "+3902799651",
    mobile: false,
    email: CENTRAL_EMAIL,
  },
  {
    id: "paolo-pasqualini-borgovalsugana",
    name: "Dr. Paolo Pasqualini",
    address: "Via Spagolla 6",
    zip: "38051",
    city: "Borgo Valsugana",
    province: "TN",
    country: "IT",
    phone: "+39 461 753176",
    tel: "+39461753176",
    mobile: false,
    email: "infostudiodentisticopasqualini@gmail.com",
  },
  {
    id: "massimo-pasqualini-trento",
    name: "Dr. Massimo Pasqualini",
    address: "Via dei Muredei 48",
    zip: "38122",
    city: "Trento",
    province: "TN",
    country: "IT",
    phone: "+39 461 923444",
    tel: "+39461923444",
    mobile: false,
    email: "studio.massimo.pasqualini@gmail.com",
  },
  {
    id: "manenti-bergamo",
    name: "Dr. Pierangelo Manenti",
    address: "Via Brigata Lupi 2",
    zip: "24122",
    city: "Bergamo",
    country: "IT",
    phone: "+39 35 238782",
    tel: "+3935238782",
    mobile: false,
    email: "info@studiodentisticomanenti.it",
  },
  {
    id: "dental-chiese-creto",
    name: "Dental Chiese",
    address: "Via Roma 37",
    zip: "38085",
    city: "Creto",
    province: "TN",
    country: "IT",
    phone: "+39 465 674621",
    tel: "+39465674621",
    mobile: false,
    email: "dentalchiese@gmail.com",
  },
  {
    id: "rinonapoli-milano",
    name: "Dr. Rinonapoli Mauro",
    address: "Via Pinamonte da Vimercate 3",
    zip: "20121",
    city: "Milano",
    country: "IT",
    phone: "+39 02 798740",
    tel: "+3902798740",
    mobile: false,
    email: CENTRAL_EMAIL,
  },
  {
    id: "methas-montebelluna",
    name: "Methas — Dott. Matteo Callegarin",
    address: "Via Monte Cauriol 2",
    zip: "31044",
    city: "Montebelluna",
    province: "TV",
    country: "IT",
    phone: "+39 42 321159",
    tel: "+3942321159",
    mobile: false,
    email: "info@methas.it",
  },
  {
    id: "leonardi-genova",
    name: "Dottor Leonardi Alessandro",
    address: "Piazza della Vittoria 12/18",
    zip: "16121",
    city: "Genova",
    country: "IT",
    phone: "+39 0105 740296",
    tel: "+390105740296",
    mobile: false,
    email: "info@alessandroleonardi.it",
  },
  {
    id: "clinica-sorriso-tione",
    name: "Clinica del Sorriso Tione",
    address: "Via Monsignor Donato Perli 3",
    zip: "38079",
    city: "Tione di Trento",
    province: "TN",
    country: "IT",
    phone: "+39 0465 881611",
    tel: "+390465881611",
    mobile: false,
    email: "Saranna.sas01@gmail.com",
  },
  {
    id: "tv-odontoiatria-gardolo",
    name: "T&V Odontoiatria",
    address: "Via Aeroporto 1",
    zip: "38121",
    city: "Trento — Gardolo",
    province: "TN",
    country: "IT",
    phone: "+39 0461 961718",
    tel: "+390461961718",
    mobile: false,
    email: "info@tvodontoiatria.it",
  },
  {
    id: "identico-pagani",
    name: "iDenTiCo — Dr. Comola, Dr. Tortora",
    address: "Piazza d'Arezzo 26",
    zip: "84016",
    city: "Pagani",
    province: "SA",
    country: "IT",
    phone: "+39 0811 9758822",
    tel: "+3908119758822",
    mobile: false,
    email: CENTRAL_EMAIL,
  },
];

/**
 * Clinic logos (from the "Loghi Studi" folder, normalized into public/images/clinics).
 * Studi without a supplied logo are intentionally absent → no logo shown.
 */
const clinicLogos: Record<string, string> = {
  "calabrese-torino": "/images/clinics/calabrese-torino.webp",
  "givi-seregno": "/images/clinics/givi.png",
  "givi-monza": "/images/clinics/givi.png",
  "zorzi-piera": "/images/clinics/zorzi-piera.jpg",
  "marco-pasqualini-milano": "/images/clinics/marco-pasqualini-milano.png",
  "massimo-pasqualini-trento": "/images/clinics/massimo-pasqualini-trento.png",
  "manenti-bergamo": "/images/clinics/manenti-bergamo.jpg",
  "dental-chiese-creto": "/images/clinics/dental-chiese-creto.avif",
  "methas-montebelluna": "/images/clinics/methas-montebelluna.webp",
  "leonardi-genova": "/images/clinics/leonardi-genova.jpg",
  "clinica-sorriso-tione": "/images/clinics/clinica-sorriso-tione.jpg",
  "tv-odontoiatria-gardolo": "/images/clinics/tv-odontoiatria-gardolo.webp",
  "identico-pagani": "/images/clinics/identico-pagani.png",
};

for (const c of clinics) {
  if (clinicLogos[c.id]) c.logo = clinicLogos[c.id];
}

/** Full one-line address for display and geocoding (skips missing parts). */
export function clinicFullAddress(c: Clinic): string {
  const cityLine = [c.zip, c.city].filter(Boolean).join(" ");
  return [c.address, cityLine, c.country].filter(Boolean).join(", ");
}

/** Google Maps "search" deep link for a single clinic. */
export function clinicMapsUrl(c: Clinic): string {
  const q = encodeURIComponent(`${c.name} ${clinicFullAddress(c)}`);
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}

/** Keyless Google Maps embed URL for a single clinic (no API key required). */
export function clinicEmbedUrl(c: Clinic): string {
  const q = encodeURIComponent(`${c.name} ${clinicFullAddress(c)}`);
  return `https://www.google.com/maps?q=${q}&output=embed`;
}

/** wa.me link (digits only, no +). Only meaningful when c.mobile is true. */
export function clinicWhatsappUrl(c: Clinic, text?: string): string {
  const digits = (c.tel ?? "").replace(/[^\d]/g, "");
  const suffix = text ? `?text=${encodeURIComponent(text)}` : "";
  return `https://wa.me/${digits}${suffix}`;
}

export function clinicById(id: string): Clinic | undefined {
  return clinics.find((c) => c.id === id);
}

/**
 * Approximate coordinates per clinic, for the combined overview map. These are
 * area-level pins; the exact pin is always reachable via each clinic's Google
 * Maps link (which searches the full address).
 */
const coords: Record<string, [number, number]> = {
  "calabrese-torino": [45.0772, 7.66],
  "givi-seregno": [45.6505, 9.203],
  "givi-monza": [45.575, 9.288],
  "zorzi-piera": [46.28, 11.51],
  "arri-asti": [44.899, 8.206],
  "marco-pasqualini-milano": [45.479, 9.149],
  "paolo-pasqualini-borgovalsugana": [46.053, 11.453],
  "massimo-pasqualini-trento": [46.064, 11.118],
  "manenti-bergamo": [45.696, 9.67],
  "dental-chiese-creto": [45.987, 10.632],
  "rinonapoli-milano": [45.476, 9.196],
  "methas-montebelluna": [45.776, 12.046],
  "leonardi-genova": [44.405, 8.946],
  "clinica-sorriso-tione": [46.037, 10.722],
  "tv-odontoiatria-gardolo": [46.098, 11.118],
  "identico-pagani": [40.743, 14.616],
};

export type ClinicPoint = {
  id: string;
  name: string;
  city: string;
  lat: number;
  lng: number;
  mapsUrl: string;
};

/** Clinics that have coordinates, shaped for the map markers. */
export function clinicPoints(): ClinicPoint[] {
  return clinics
    .filter((c) => coords[c.id])
    .map((c) => ({
      id: c.id,
      name: c.name,
      city: c.city,
      lat: coords[c.id][0],
      lng: coords[c.id][1],
      mapsUrl: clinicMapsUrl(c),
    }));
}
