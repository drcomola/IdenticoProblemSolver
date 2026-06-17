# Dr. Giorgio Comola — Sito ufficiale

Sito vetrina **premium, multilingua e statico** per il Dr. Giorgio Comola — ortodonzia
digitale, allineatori trasparenti, formazione clinica e mentorship.

Stack: **Next.js (App Router) · TypeScript · Tailwind CSS · Framer Motion**.
Tre lingue (`/it`, `/en`, `/es`), due percorsi (Pazienti / Colleghi), nessun CMS in Fase 1.

## Avvio in locale

```bash
npm install
npm run dev        # http://localhost:3000  (→ redirect a /it)
```

Altri comandi:

```bash
npm run build      # build di produzione (SSG)
npm run start      # serve la build
npm run lint       # ESLint (next/core-web-vitals)
npm run typecheck  # tsc --noEmit
```

> Imposta l'origine pubblica con `NEXT_PUBLIC_SITE_URL` (es. su Vercel).
> Default: `https://www.giorgiocomola.com` — usato per canonical, hreflang, sitemap e OG.

## Struttura del progetto

```
app/
  layout.tsx              # root passthrough (metadata globali)
  page.tsx                # "/" → welcome gateway (lingua + percorso, noindex)
  not-found.tsx           # 404 self-contained
  robots.ts               # robots.txt
  sitemap.ts              # sitemap.xml (con hreflang, 57 URL)
  fonts.ts                # Playfair Display (display) + Inter (sans)
  globals.css             # Tailwind + base premium (palette, focus, gradienti)
  [locale]/
    layout.tsx            # owner di <html lang> · Header/Footer · JSON-LD Person
    page.tsx              # landing localizzata (hero + AudienceSelector)
    [audience]/
      layout.tsx          # generateStaticParams slug audience (→ propaga a [section])
      page.tsx            # home Pazienti / Colleghi (slug localizzati)
      [section]/
        page.tsx          # pagine di sezione (block-based) per ogni slug localizzato
components/
  gateway/                # GatewayChooser (welcome client: bandiere + icone percorso)
  layout/                 # Header · Footer · LanguageSelector · AudienceSelector
  sections/               # HeroSection · PageIntro · CTASection · SectionBlocks
  ui/                     # Button · Container · Reveal · ContentCard · CaseCard · Flag
                          # FAQAccordion · ClinicList · ContactForm · PremiumPlaceholder · JsonLd
content/
  it.ts · en.ts · es.ts   # testi home (landing + pazienti + colleghi)
  sections/{it,en,es}.ts  # testi delle 16 pagine di sezione per lingua
  dictionaries.ts         # stringhe UI (header/footer/selettori/gateway/form)
  types.ts · index.ts     # modello tipizzato (blocchi) + accessor
lib/
  i18n.ts                 # locali, audience, helper lingua
  routes.ts               # mappa slug localizzati · path builder · hreflang · translatePath
  seo.ts                  # metadata builder · JSON-LD Person/FAQPage · costanti sito
  links.ts                # risoluzione CTA → href localizzato
public/images/og/         # immagine OG di default (SVG segnaposto)
```

## Cosa è incluso

- **Welcome gateway** su `/`: schermata di benvenuto che chiede lingua (bandiere IT/EN/ES) e
  percorso (icone Paziente / Collega); il click su un percorso porta a `/{lingua}/{percorso}`.
  La pagina è `noindex` (le pagine indicizzate sono le landing localizzate).
- Routing multilingua con **slug localizzati** (`/it/pazienti/invisalign`,
  `/en/patients/invisalign`, …) gestito da `[locale]/[audience]/[section]` + mappe in `lib/routes.ts`.
- **Landing** localizzata + **Home Pazienti/Colleghi** + **tutte le 16 pagine di sezione**
  (9 pazienti, 7 colleghi) nelle tre lingue, con i testi reali dei documenti — **57 URL**
  prerenderizzati staticamente.
- Pagine di sezione **block-based**: i tipi di blocco (`list`, `statement`, `faq`, `cases`,
  `clinics`, `form`) sono renderizzati da `SectionBlocks`. Aggiungere/riordinare contenuti
  significa solo modificare i dati in `content/sections/*`.
- SEO completo: una sola `H1`/pagina, gerarchia `H2/H3`, `title`/`description`/`canonical`/`openGraph`
  per pagina, **hreflang** reciproci + `x-default`, `sitemap.xml`, `robots.txt`,
  **JSON-LD Person** site-wide + **FAQPage** sulle pagine FAQ.
- Componenti riutilizzabili (incl. placeholder per casi clinici, studi, form attivo lato client) —
  **nessun caso clinico falso, nessuna foto stock dentistica**.
- Design responsive premium (palette brand, Playfair + Inter) con animazioni **sobrie**
  (Framer Motion) e rispetto di `prefers-reduced-motion`.

## Brand / Logo

- **Logo reale**: il file fornito è in `public/images/brand/logo.png`. Da esso sono generate due
  varianti usate da [Logo.tsx](components/ui/Logo.tsx) (next/image, prop `tone`):
  `logo-trimmed.png` (croppato, per **sfondi chiari** → header) e `logo-light.png` (dente schiarito,
  per **sfondi scuri** → footer e gateway).
- **Marchi derivati dal logo reale**: **favicon** [app/icon.png](app/icon.png) + apple-icon, e
  immagine **OG** [default-og.png](public/images/og/default-og.png) (1200×630).
  > Rigenerabili con uno script Pillow (trim + variante chiara + OG con font di sistema).
- **Filigrana** ([Filigree.tsx](components/ui/Filigree.tsx)): motivo dente tile a bassa opacità dietro
  hero / CTA / gateway.
- **Main page**: sul gateway il logo (grande) + il nome **Dr. Giorgio Comola** come `h1` (fino a
  `text-7xl`) + tagline.

## Navigazione, icone, studi e form

- **Menu di navigazione** ([NavMenu.tsx](components/layout/NavMenu.tsx)): due dropdown (Pazienti/Colleghi)
  con tutte le sezioni + icona; su mobile diventa un pannello a tendina. Etichette in
  [content/navigation.ts](content/navigation.ts).
- **Iconografia per sezione** ([icons.tsx](components/ui/icons.tsx)): ogni sezione ha un'icona
  riconoscibile, usata nel menu, nella griglia `SectionNavGrid` della home di pubblico e nell'hero.
- **Studi** ([content/clinics.ts](content/clinics.ts) + [ClinicsDirectory.tsx](components/ui/ClinicsDirectory.tsx)):
  16 sedi reali con telefono (`tel:`), WhatsApp (solo numeri mobili), email per studio, link Google
  Maps ed embed mappa per sede. **Mappa unica con tutti i pin**: [ClinicsMap.tsx](components/ui/ClinicsMap.tsx)
  con **Leaflet + OpenStreetMap** (nessuna API key). In alternativa, impostando la env
  `NEXT_PUBLIC_CLINICS_MAP_URL` con un embed di Google **My Maps**, viene usato quello.
- **Form** ([ContactForm.tsx](components/ui/ContactForm.tsx)): all'invio aprono l'email del visitatore
  con messaggio precompilato verso `drcomola@gmail.com` (nessun backend in fase 1).
  Il form **pazienti** include la scelta della **sede**: l'invio va alla **mailto dedicata della sede
  scelta** (in `content/clinics.ts`, con fallback `drcomola@gmail.com`), + scorciatoie
  chiama/WhatsApp/email/mappa. Il form **colleghi** invia a `drcomola@gmail.com` con oggetto dedicato.

## Legale, cookie e form

- **Pagine legali** ([content/legal.ts](content/legal.ts) + [app/[locale]/legal/[doc]](app/%5Blocale%5D/legal/%5Bdoc%5D/page.tsx)):
  Privacy Policy e Cookie Policy in IT/EN/ES → `/it/legal/privacy`, `/it/legal/cookie`, ecc.
  Link nel footer + dati identificativi (`PRACTITIONER`) per la trasparenza sanitaria.
  > ⚠️ I testi legali sono una **bozza** di partenza: farli validare da un legale/DPO.
- **Banner cookie** ([CookieBanner.tsx](components/layout/CookieBanner.tsx)): informativo, scelta salvata in
  `localStorage`. Il sito non usa cookie di profilazione.

### Form → email reale (Resend)

Il form invia tramite la route [`/api/contact`](app/api/contact/route.ts) usando **Resend**.
Pazienti → casella della **sede scelta**; colleghi → `drcomola@gmail.com`.
Finché non è configurato, il client fa **fallback automatico a `mailto`** (tutto continua a funzionare).

Per attivarlo:
1. crea un account gratuito su [resend.com](https://resend.com) e genera una **API key**;
2. verifica un dominio mittente (per i primi test va bene `onboarding@resend.dev`);
3. imposta le env (es. su Vercel): `RESEND_API_KEY` e `CONTACT_FROM` (es. `Sito <noreply@giorgiocomola.com>`).

### Casi clinici

- Dati: [content/cases.ts](content/cases.ts) (tipo `ClinicalCase`, array oggi **vuoto** — nessun caso inventato).
- Foto: `public/images/cases/<slug>/before.jpg|after.jpg|...`.
- Dettaglio: route [`[case]`](app/%5Blocale%5D/%5Baudience%5D/%5Bsection%5D/%5Bcase%5D/page.tsx) con
  [BeforeAfter.tsx](components/ui/BeforeAfter.tsx); la pagina `clinical-cases` mostra le `CaseCard` reali
  quando esistono, altrimenti le categorie. Ogni caso richiede `consent: true`.

## Prossimi step (file da toccare)

1. **Form → backend reale**: oggi è un `mailto`. Per tracciare le richieste, collegare a un endpoint
   o servizio email (es. Resend/Formspree) mantenendo il `mailto` come fallback.
2. **Mappa unica studi**: creare una Google My Maps con i 15 indirizzi e impostarne l'embed in
   `NEXT_PUBLIC_CLINICS_MAP_URL` (oppure passare alla Maps Embed API con key).
3. **Immagini**: sostituire i `PremiumPlaceholder` con asset reali (WebP/AVIF) e aggiornare gli `alt`.
4. **Course/Event schema** sulle pagine corsi (privati / SAS) + **LocalBusiness** sulle sedi.
5. **Blog / Education hub**: nuove route `app/[locale]/blog` e `app/[locale]/education`.

## Assunzioni

- Dominio di produzione provvisorio: `https://www.giorgiocomola.com` (modificabile via env).
- `/` è la **welcome gateway** (lingua + percorso); l'italiano è la lingua di default e `x-default`.
  Dalla welcome il percorso porta direttamente alla home di pubblico in quella lingua
  (es. `/it/pazienti`). La landing di lingua `/it` resta raggiungibile dall'header.
- I testi sono quelli dei documenti v1; i claim restano prudenti (nessuna promessa assoluta).
- Lingua di default + locale dell'`<html>` impostati per pagina (it-IT / en / es-ES).
- Deploy previsto su **Vercel** (SSG, immagini AVIF/WebP già configurate).
