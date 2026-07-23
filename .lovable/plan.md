# Redesign Cube CMS — Fase 1

Come richiesto, non procedo subito col redesign completo. Parto da analisi, design system, mapping variabili e shell + un set ristretto di schermate chiave. Le altre pagine seguiranno solo dopo la tua approvazione della direzione.

## 1. Analisi sintetica degli screenshot

**Componenti ricorrenti identificati**
- Sidebar scura fissa a sinistra (dark navy `#182733`), header magenta pieno (`#dc007e`) con topbar di icone
- Titoli pagina in font display bold/serif condensato (es. "Lista pagina", "Bacheca", "Modifica pagina") — stile molto marcato, quasi editoriale
- Tabelle a righe alternate con badge stato ("pubblica", "online/offline"), colonne lingua con bandiere circolari, azioni per riga in bottoni pieni verde (edit) / grigio (duplica) / rosso (elimina)
- Card bianche con radius medio su sfondo `#f5f5f7`-ish
- Bottoni azione principale (Inserisci pagina, Inserisci gallery) in outline magenta in alto a destra
- Form modifica pagina: label sopra input, blocchi accordion ("SEZIONE BOX ICONE", "SEZIONE MINIGALLERY", "Meta SEO"), barra "Quick link" flottante in basso a sinistra, bottoni salva/salva-ed-esci flottanti in basso a destra
- Bacheca con card "accesso rapido" grigie con icona magenta soft

**Incoerenze rilevate**
- Header magenta pieno stride visivamente con il resto dell'UI molto sobria — massima saturazione riservata ora al chrome invece che alle azioni
- Due sistemi di bottone azione: outline magenta (top-right pagine) vs pieni colorati (verde/grigio/rosso per riga) — pesi e famiglie diverse
- Titoli pagina in display font "artistico" contrastano con densità tabellare sotto: sembrano di due prodotti diversi
- Icone topbar (8+ icone senza label) non hanno gerarchia né tooltip visibili; convivono con contatore "0%" giallo poco chiaro
- Bandiere lingua come cerchi pieni: buone ma il pattern non è replicato altrove per stati
- Bottoni riga tabella verde brillante = colore success usato come "modifica" (semantica scorretta)
- Sidebar item attivo: sfondo magenta pieno, molto pesante rispetto a un'app di produttività
- Card bacheca tutte identiche in dimensione senza gerarchia funzionale
- Modifica pagina: 3 zone di azione (Quick link, salva sticky, "Torna alla lista/Revisioni/Visualizza" in header) senza gerarchia chiara
- Spaziature form generose in verticale ma dense in orizzontale — inconsistente

## 2. Direzione grafica proposta

**Principi**
- SaaS B2B da uso intensivo: densità alta, cromia sobria, magenta come accento non come chrome
- Sidebar scura mantenuta (identità Cube) ma desaturata; header bianco/chiaro con solo bordo inferiore; magenta riservato a: logo, stato attivo sidebar (barra + testo, non fill pieno), CTA primarie, focus ring
- Tipografia: sistem-ui / Inter per UI, un solo display leggero per titoli pagina (no font editoriale pesante). H1 pagina 22–24px semibold, non 40px display.
- Bottoni: una famiglia sola con 5 varianti (primary magenta, secondary outline neutro, ghost, danger, icon-only). Le azioni di riga diventano icon-button ghost + menu contestuale (⋯) per le secondarie.
- Tabelle: header sticky, righe compatte 44px, hover riga, badge stato pill soft (bg tinted + testo scuro), non pieni saturi
- Form: label sopra, spacing verticale 12px, gruppi in sezioni con divider sottile invece di accordion aggressivi; salvataggio in barra sticky footer unica (rimuove ambiguità Quick link vs salva)
- Radius coerente 8px (md) / 6px (sm) / 12px (lg); ombre sottili solo per popover/modali

## 3. Palette

Preservo i colori fondativi Cube.

```
Brand
  primary          #DC007E   (invariato = --blast-color)
  primary-hover    #B80069
  primary-subtle   #FCE6F1
  primary-contrast #FFFFFF

Sidebar / dark
  sidebar-bg       #182733   (= --dark-color)
  sidebar-bg-soft  #294257   (= --dark-color-soft, per hover/active-bg)
  sidebar-fg       #E6ECF2
  sidebar-fg-muted #8FA0B3

Surfaces
  page-bg          #F5F7FA
  surface          #FFFFFF
  surface-muted    #F0F2F5
  surface-hover    #EEF1F5
  header-bg        #FFFFFF

Text
  text-primary     #182733
  text-secondary   #4A5A6B
  text-muted       #7A8899
  text-inverse     #FFFFFF

Borders
  border           #E3E7EC
  border-strong    #C7CFD8

Semantic (soft + solid)
  success  #1F9D6B / subtle #E4F5EC
  info     #2A7FB8 / subtle #CDEDEB   (mantiene --azzurro come subtle)
  warning  #C58A00 / subtle #FBEFC7   (mantiene --giallo/--gialloChiaro)
  danger   #C8322A / subtle #F9E4E2
```

## 4. Token Cube (fonte di verità)

File `styles/tokens/cube-tokens.css` con tutti i `--cube-*` come da tuo schema (brand, surfaces, text, borders, semantic, radius, shadows, motion). Un solo set, no varianti per pagina.

## 5. Mapping variabili (fonte → alias)

`styles/tokens/bootstrap-mapping.css` mappa `--bs-*` sui token Cube.  
`styles/tokens/legacy-aliases.css` tiene TUTTE le variabili legacy come alias (nessuna rimozione, nessun rename):

| Concetto | Token Cube | Bootstrap | Legacy |
|---|---|---|---|
| Colore primario | `--cube-brand-primary` | `--bs-primary` | `--blast-color`, `--primary` |
| Hover primario | `--cube-brand-primary-hover` | override | `--blast-color-hover`, `--primaryHover` |
| Sfondo pagina | `--cube-page-bg` | `--bs-body-bg` | `--mainLight` (da verificare vs `--light1/2/3`) |
| Superficie card | `--cube-surface-bg` | `--bs-tertiary-bg` | `--mainLight` |
| Testo primario | `--cube-text-primary` | `--bs-body-color` | `--mainDark` |
| Testo secondario | `--cube-text-secondary` | `--bs-secondary-color` | — |
| Bordo | `--cube-border-color` | `--bs-border-color` | `--light4` (probabile) |
| Sidebar bg | `--cube-sidebar-bg` | — (override componente) | `--dark-color` |
| Sidebar hover/active bg | `--cube-sidebar-hover` | — | `--dark-color-soft` |
| Info subtle | `--cube-info-subtle` | — | `--azzurro` |
| Warning | `--cube-warning` | — | `--giallo` |
| Warning subtle | `--cube-warning-subtle` | — | `--gialloChiaro` |
| Easing | `--cube-easing-standard` | — | `--cubic` |

Variabili `--blu`, `--fa-color-dark`, `--light1/2/3` NON accorpate automaticamente: lasciate come alias attuali e marcate `TODO: verificare uso reale nel CMS` — il loro ruolo semantico va confermato guardando il codice esistente, non dedotto dal valore.

## 6. Deliverable Fase 1 (prototipo navigabile)

Route TanStack Start dedicate al prototipo (l'app resta un normale progetto Lovable, il prototipo è la home `/`):

- `/` — landing prototipo con indice sezioni
- `/prototype/dashboard` — Bacheca redesign (screenshot "Hotel Cosmopolitan 2026")
- `/prototype/pages` — Lista pagine (tabella + filtri + azioni riga)
- `/prototype/pages/edit` — Modifica pagina (form lungo + sezioni + save bar sticky)
- `/prototype/gallery` — Lista gallery (esempio pagina con card griglia)
- `/prototype/settings` — Impostazioni Aspetto (esempio pagina a tab)
- `/prototype/design-system` — Design System completo (logo, palette, token, tipografia, spaziature, tutti i componenti con tutti gli stati, tabella mapping, do/don't)

**Shell comune** (`SidebarShell`):
- Sidebar dark con logo originale `logo_interno.png` (link diretto, non ricreato), area di rispetto 16px, versione compatta mostra solo il glifo "cube" isolabile dal logo (nessun simbolo inventato — se non isolabile, si nasconde e resta solo la toggle)
- Header bianco con: breadcrumb, selettore sito (pill), notifiche, avatar utente
- Titolo pagina 22px semibold + descrizione opzionale + slot azioni
- Save-bar sticky bottom nelle pagine form

**Componenti coperti in Design System**: sidebar item, header, breadcrumb, titles, buttons (primary/secondary/ghost/danger/icon) × stati, inputs/textarea/select/checkbox/radio/switch × stati, table (header/row/hover/selected), badges (stato/lingua), tabs, accordion, alerts (info/success/warning/danger), tooltip, dropdown menu, modal standard, modal distruttiva, drawer, pagination, empty state, skeleton loading, spinner, toast.

## 7. Dettagli tecnici

- Stack: TanStack Start del template (invariato)
- Bootstrap 5.3 aggiunto via `bun add bootstrap` + import CSS nel root; classi Bootstrap usate direttamente (`.btn`, `.table`, `.form-control`, `.nav-tabs`, `.modal`, `.alert`, `.badge`, `.pagination`)
- Nessuna dipendenza da Tailwind per il prototipo — layout con classi Bootstrap + CSS custom nei file token/componenti
- Struttura CSS come richiesto:
  ```
  src/styles/
    tokens/{cube-tokens,bootstrap-mapping,legacy-aliases}.css
    base/{typography,layout}.css
    components/{buttons,forms,tables,navigation,tabs,dropdowns,modals,alerts,badges,pagination,sidebar,header,save-bar,empty-state,skeleton}.css
    pages/page-specific-overrides.css
  ```
- Logo: `<img src="https://cube.blastness.site/assets/images/logo_interno.png">` diretto, `height` fisso, mai `object-fit: cover`, mai filtri colore
- Tipografia UI: `system-ui, -apple-system, "Segoe UI", Inter, sans-serif`; titoli pagina stessa famiglia peso 600 (no font display artistico)
- Icone: `lucide-react` (già coerente con SaaS moderni), 18px in sidebar, 16px inline
- Contenuti reali dagli screenshot: nomi pagina "(reference) Camera Interna 1", "Home Page", "Gallery"; siti "Hotel Cosmopolitan 2026", "Porta Pia Comfy Rooms" ecc.; date reali; utente "De Gennaro Stefania"

## 8. Cosa NON faccio in questa fase

- Non ridisegno tutte le pagine viste (Articoli, Pressroom, Recensioni, Elementi, Media, htaccess, Utenti, Lingue, Parametri, Release note, Traduzioni) — dopo tua approvazione della direzione
- Non tocco funzionalità, campi, flussi
- Non rimuovo variabili legacy
- Non introduco un terzo sistema di token parallelo

## Domanda prima di procedere

Confermi questa direzione (sidebar dark mantenuta + header chiaro + magenta come accento e non come chrome, titoli pagina sobri e non display editoriale) o preferisci mantenere l'header magenta pieno attuale come segno d'identità forte?
