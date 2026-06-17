# Immagini casi clinici

Questa cartella contiene le immagini dei casi clinici prima/dopo.

## Categorie predisposte

- `affollamento`
- `morso-aperto`
- `morso-coperto`
- `seconda-classe`
- `terza-classe`
- `pre-protesico`
- `parodontale`
- `estetico`
- `agenesie`
- `casi-complessi`
- `morso-crociato` consigliata come categoria aggiuntiva

## Struttura di un caso

Dentro la categoria crea una cartella con uno slug semplice, senza spazi o accenti:

```text
public/images/cases/affollamento/affollamento-adulto-01/
  before-upper-arch.jpg
  after-upper-arch.jpg
  before-lower-arch.jpg
  after-lower-arch.jpg
  before-front.jpg
  after-front.jpg
```

Questa e' la dotazione minima consigliata: 3 immagini pre e 3 immagini post.

## Viste minime

- `upper-arch`: arcata superiore
- `lower-arch`: arcata inferiore
- `front`: frontale

## Viste opzionali

Quando il caso lo merita, puoi arrivare a 6 confronti:

```text
before-right-lateral.jpg
after-right-lateral.jpg
before-left-lateral.jpg
after-left-lateral.jpg
before-smile.jpg
after-smile.jpg
```

Altre immagini non necessariamente prima/dopo:

```text
xray-01.jpg
render3d-01.jpg
profile-01.jpg
```

## Come vengono mostrate

Per pubblicare il caso nel sito, le immagini vanno collegate in `content/cases.ts`.
Ogni coppia con la stessa vista viene accoppiata automaticamente:

- nella griglia dei casi viene usato il primo confronto completo disponibile;
- nella pagina del singolo caso viene mostrata una griglia di confronti con cursore slide;
- se il caso ha 3 viste, compariranno 3 slide;
- se il caso ha 6 viste, compariranno 6 slide.

## Prima di pubblicare

- Verificare consenso del paziente.
- Rimuovere dati identificativi da foto, radiografie e screenshot.
- Usare immagini coerenti tra prima e dopo: stessa inquadratura, luce e proporzione.
- Preferire file `.jpg` o `.webp`, orientati in formato 4:3 quando possibile.
