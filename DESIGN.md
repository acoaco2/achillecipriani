---
name: Achille Cipriani — Consulenza
description: Landing-gate di una consulenza professionale; split editoriale, verde petrolio drenched su crema.
colors:
  petrol: "#1f5d63"
  petrol-deep: "#123f44"
  petrol-hover: "#16555b"
  mint: "#8fd4c8"
  cream: "#faf8f3"
  ink: "#1b1a17"
  cream-soft: "#cfdedb"
  muted: "#706b5e"
  line: "#d9d4c7"
  field-line: "#8f8a7c"
  placeholder: "#959082"
  error: "#9a4b3f"
typography:
  display:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "clamp(2.8rem, 4.8vw, 4.4rem)"
    fontWeight: 300
    lineHeight: 1.04
    letterSpacing: "0.01em"
  field-value:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "1.35rem"
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: "normal"
  body:
    fontFamily: "ui-sans-serif, -apple-system, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  label:
    fontFamily: "ui-sans-serif, -apple-system, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "11px"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.3em"
rounded:
  sm: "2px"
  md: "8px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "21px"
  lg: "32px"
components:
  button-primary:
    backgroundColor: "{colors.petrol}"
    textColor: "{colors.cream}"
    rounded: "{rounded.md}"
    padding: "16px 26px"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.petrol-hover}"
    textColor: "{colors.cream}"
  input-field:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.field-value}"
---

# Design System: Achille Cipriani — Consulenza

## 1. Overview

**Creative North Star: "Lo Studio Riservato"**

L'atmosfera è quella di uno studio di consulenza privato: si entra su invito, in un ambiente calmo, ordinato e sicuro di sé. La pagina non vende, accoglie e filtra. Il gesto centrale è uno solo — l'accesso all'area riservata — e tutto il resto gli fa spazio: molto respiro, una sola voce tipografica forte (il nome), un colore che afferma identità senza alzare il tono.

L'impianto è uno **split editoriale**: a sinistra un pannello immerso nel verde petrolio porta l'identità (logo, nome, contatti) in crema; a destra, su carta crema, vive il form di accesso. Il colore non è un accento timido spruzzato qua e là: o **possiede** una superficie (il pannello), o resta il segnale delle azioni (il pulsante, il focus, i link). Niente vie di mezzo.

Questo sistema rifiuta esplicitamente l'estetica da "landing SaaS": niente gradienti decorativi, niente griglie di card, niente occhielli ripetuti sopra ogni sezione, niente blocchi-metrica. Rifiuta anche l'effetto "template generico" e qualsiasi vezzo appariscente. La serietà professionale è il vincolo, non la scusa per il grigiore.

**Key Characteristics:**
- Split drenched: il verde petrolio possiede il pannello identità (~50% su desktop), il crema ospita il form.
- Una sola voce display (il nome, in serif), tutto il resto sussurra.
- Un gesto primario evidente: la CTA piena.
- Spazio come materiale: la gerarchia nasce dal vuoto, non dalla decorazione.

## 2. Colors

Una scala neutra calda (crema/inchiostro) attraversata da un'unica famiglia fredda — il verde petrolio — che afferma identità e azione.

### Primary
- **Verde Petrolio** (`#1f5d63`): il colore-identità. Riempie il pannello sinistro (come gradiente verso `#123f44`), colora la CTA "Accedi", il bordo dei campi in focus e gli accenti interattivi. Su crema rende 7:1 (testo conforme AA).
- **Petrolio Profondo** (`#123f44`): chiusura del gradiente del pannello; dà profondità senza ombre.
- **Petrolio Hover** (`#16555b`): stato hover della CTA.

### Secondary
- **Menta Tenue** (`#8fd4c8`): unico tocco luminoso, riservato al pannello scuro — la riga sotto il nome e l'etichetta "Contatti". Vive solo sul petrolio, mai sul crema.

### Neutral
- **Crema** (`#faf8f3`): la carta. Sfondo del lato form e colore del testo sul pannello scuro.
- **Inchiostro** (`#1b1a17`): testo principale sul crema (16:1). La serietà è qui.
- **Crema Soffusa** (`#cfdedb`): testo secondario sul pannello petrolio (occhiello, tagline).
- **Muted** (`#706b5e`): etichette dei campi e testo di servizio sul crema (5:1, AA).
- **Field-line** (`#8f8a7c`): sottolineatura dei campi a riposo (3.25:1, boundary AA).
- **Line** (`#d9d4c7`): divisori sottili e decorativi.
- **Placeholder** (`#959082`): testo segnaposto nei campi.
- **Errore** (`#9a4b3f`): messaggi di errore del form (5.7:1).

### Named Rules
**La Regola del Pannello.** Il verde petrolio o *possiede* una superficie (drenched, il pannello identità) o è il *segnale di un'azione* (CTA, focus, link). È vietato spruzzarlo come micro-accento decorativo: o tutto, o niente.
**La Regola della Menta.** La menta esiste solo sul petrolio. Sul crema non compare mai.

## 3. Typography

**Display Font:** Cormorant Garamond (fallback Georgia, serif)
**Body / Label Font:** sans di sistema (`ui-sans-serif, -apple-system, Helvetica Neue, Arial`)

**Character:** un serif da incisione, leggero e ad alto contrasto, per il nome e i valori inseriti; un sans di sistema neutro e silenzioso per etichette e testo funzionale. Il contrasto serif/sans è l'unico "ornamento" tipografico.

### Hierarchy
- **Display** (300, `clamp(2.8rem, 4.8vw, 4.4rem)`, lh 1.04): il nome "Achille Cipriani". Una sola occorrenza, è la voce della pagina.
- **Field value** (400, `1.35rem`, serif): il testo digitato nei campi — eleganza anche nell'input.
- **Body** (400, `1rem`, sans): la tagline e il testo corrente (raro).
- **Label** (600, `11px`, tracking `0.3em`, maiuscolo): occhielli e nomi-campo ("CONSULENZA", "AREA RISERVATA CLIENTI", "AZIENDA"). Riservato a etichette brevi (≤4 parole).

### Named Rules
**La Regola della Voce Unica.** Un solo elemento display per schermata: il nome. Nessun'altra scritta compete con lui per dimensione.
**La Regola Maiuscolo-Solo-Etichette.** Il maiuscolo spaziato è ammesso solo su etichette brevi, mai su frasi.

## 4. Elevation

Sistema **piatto**: nessuna ombra, nessun box-shadow. La profondità nasce dal contrasto di superfici — il pannello petrolio contro la carta crema — e da un solo gradiente radiale dentro il pannello (`#235e64` → `#123f44`) che simula luce ambientale. I divisori sono linee da 1px, non ombre.

### Named Rules
**La Regola Senza Ombre.** Le superfici sono piatte. Se serve separare, si usa un cambio di colore o una linea da 1px, mai un'ombra. Un'ombra morbida e larga qui è il segnale di un template: vietata.

## 5. Components

### Buttons
- **Shape:** angoli appena addolciti (`8px`).
- **Primary (CTA "Accedi"):** fondo Verde Petrolio (`#1f5d63`), testo crema, padding `16px 26px`, `min-height 44px`, a tutta larghezza nella colonna form. Carattere "sobrio e sicuro": gesto pieno e deciso.
- **Hover / Focus:** fondo → Petrolio Hover (`#16555b`); il gap interno (testo↔freccia) si allarga di ~4px. Transizioni 0.25s.
- Non esistono varianti ghost/secondary: c'è una sola azione, e ha un solo bottone.

### Inputs / Fields
- **Style:** nessun box; solo sottolineatura da 1px (`#8f8a7c`), sfondo trasparente, valore in serif `1.35rem`.
- **Focus:** la sottolineatura diventa Verde Petrolio (`#1f5d63`); nessun glow.
- **Password:** toggle "occhio" (SVG) a destra del campo, area cliccabile espansa a ≥44px via pseudo-elemento; icona 18px.
- **Error:** messaggio in `#9a4b3f` sotto i campi + shake del form. Lo stato base resta sempre visibile (le animazioni non nascondono mai il contenuto).

### Navigation
Nessuna navigazione: è una pagina singola a gesto unico (accesso). Il footer-contatti vive in basso nel pannello petrolio.

### Signature: il Pannello Drenched
Il componente-firma. Colonna sinistra immersa nel verde petrolio (gradiente radiale `#235e64`→`#123f44`), contenuto in crema, riga menta da 3px sotto il nome, contatti ancorati in basso. Su mobile (<760px) diventa una fascia superiore e il form scorre sotto.

## 6. Do's and Don'ts

### Do:
- **Do** lasciare che il verde petrolio *possieda* il pannello identità; usarlo sul crema solo per azione (CTA, focus, link).
- **Do** mantenere il testo principale in Inchiostro (`#1b1a17`) per serietà e leggibilità (16:1).
- **Do** tenere una sola voce display (il nome) per schermata.
- **Do** rispettare i contrasti AA: etichette su `#706b5e` (5:1), bordi campo su `#8f8a7c` (3.25:1).
- **Do** mantenere il sistema piatto: separare con colore o linee da 1px.
- **Do** conservare la scorciatoia funzionale e gli stati (focus visibile, touch ≥44px, `prefers-reduced-motion`).

### Don't:
- **Don't** ricadere nell'estetica "landing SaaS": niente gradienti decorativi diffusi, niente griglie di card, niente blocchi-metrica.
- **Don't** mettere occhielli maiuscoli ripetuti sopra ogni sezione (è impalcatura da AI).
- **Don't** usare effetti appariscenti o palette accese: il carattere è sobrio.
- **Don't** sembrare un template generico.
- **Don't** spruzzare il petrolio come micro-accento decorativo sul crema (o drenched, o azione).
- **Don't** portare la menta sul crema: vive solo sul pannello petrolio.
- **Don't** aggiungere ombre morbide e larghe a bottoni o superfici.
- **Don't** legare la visibilità del contenuto a un'animazione (lo stato base deve essere già visibile).
