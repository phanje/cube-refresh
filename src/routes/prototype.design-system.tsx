import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Shell, PageHeader } from "@/components/cube/Shell";
import { Badge, LangFlags } from "@/components/cube/atoms";
import { Check, X, AlertTriangle, Info, Trash2, Pencil, Copy, Plus, Loader2, Search } from "lucide-react";

const CUBE_LOGO = "https://cube.blastness.site/assets/images/logo_interno.png";

export const Route = createFileRoute("/prototype/design-system")({
  head: () => ({
    meta: [
      { title: "Design System — Cube CMS" },
      { name: "description", content: "Token, componenti, mapping variabili e regole di utilizzo." },
      { property: "og:title", content: "Design System — Cube CMS" },
      { property: "og:description", content: "Token, componenti, mapping variabili e regole di utilizzo." },
    ],
  }),
  component: DesignSystem,
});

const SECTIONS = [
  { id: "logo", label: "Logo" },
  { id: "palette", label: "Palette & Token" },
  { id: "typography", label: "Tipografia" },
  { id: "spacing", label: "Spaziature & radius" },
  { id: "buttons", label: "Bottoni" },
  { id: "forms", label: "Form" },
  { id: "tables", label: "Tabelle" },
  { id: "badges", label: "Badge & Stati" },
  { id: "alerts", label: "Alert" },
  { id: "tabs", label: "Tab" },
  { id: "modals", label: "Modali" },
  { id: "empty", label: "Stati vuoti / loading" },
  { id: "mapping", label: "Mapping variabili" },
  { id: "dos", label: "Do & Don't" },
];

function DesignSystem() {
  const [showModal, setShowModal] = useState(false);
  const [showDanger, setShowDanger] = useState(false);

  return (
    <Shell crumbs={[{ label: "Bacheca", to: "/prototype/dashboard" }, { label: "Design System" }]}>
      <div className="cube-content">
        <PageHeader
          title="Design System"
          subtitle="Fonte di verità per token, componenti e regole di utilizzo di Cube."
        />

        <div className="row g-4">
          <div className="col-lg-2 d-none d-lg-block">
            <nav className="cube-ds-nav">
              {SECTIONS.map((s) => (
                <a key={s.id} href={`#${s.id}`}>{s.label}</a>
              ))}
            </nav>
          </div>
          <div className="col-lg-10">

            <Section id="logo" title="Logo Cube">
              <div className="row g-3">
                <div className="col-md-6">
                  <div style={{ background: "var(--cube-sidebar-bg)", padding: 24, borderRadius: "var(--cube-radius-md)" }}>
                    <img src={CUBE_LOGO} alt="Cube" style={{ height: 32 }} />
                  </div>
                  <p className="cube-ds-swatch-label mt-2">Su sfondo scuro (sidebar) — versione primaria.</p>
                </div>
                <div className="col-md-6">
                  <div style={{ background: "var(--cube-surface-bg)", border: "1px solid var(--cube-border-color)", padding: 24, borderRadius: "var(--cube-radius-md)" }}>
                    <img src={CUBE_LOGO} alt="Cube" style={{ height: 32 }} />
                  </div>
                  <p className="cube-ds-swatch-label mt-2">Su sfondo chiaro — usare solo se compatibile con la leggibilità.</p>
                </div>
              </div>
              <ul style={{ fontSize: 13, color: "var(--cube-text-secondary)", marginTop: 16 }}>
                <li>Non modificare forma, proporzioni, colori, contenuto o stile.</li>
                <li>Area di rispetto minima intorno al logo: 16px.</li>
                <li>In stato sidebar compatta, se il glifo "cube" non è isolabile, nascondere il logo — non inventare un simbolo.</li>
              </ul>
            </Section>

            <Section id="palette" title="Palette & Token semantici">
              <SwatchGroup
                title="Brand"
                items={[
                  ["--cube-brand-primary", "#dc007e"],
                  ["--cube-brand-primary-hover", "#b80069"],
                  ["--cube-brand-primary-active", "#9c0058"],
                  ["--cube-brand-primary-subtle", "#fce6f1"],
                ]}
              />
              <SwatchGroup
                title="Superfici"
                items={[
                  ["--cube-page-bg", "#f5f7fa"],
                  ["--cube-surface-bg", "#ffffff"],
                  ["--cube-surface-muted", "#f0f2f5"],
                  ["--cube-sidebar-bg", "#182733"],
                  ["--cube-sidebar-active", "#294257"],
                ]}
              />
              <SwatchGroup
                title="Testo"
                items={[
                  ["--cube-text-primary", "#182733"],
                  ["--cube-text-secondary", "#4a5a6b"],
                  ["--cube-text-muted", "#7a8899"],
                ]}
              />
              <SwatchGroup
                title="Semantici"
                items={[
                  ["--cube-success", "#1f9d6b"],
                  ["--cube-info", "#2a7fb8"],
                  ["--cube-warning", "#c58a00"],
                  ["--cube-danger", "#c8322a"],
                ]}
              />
            </Section>

            <Section id="typography" title="Tipografia">
              <div className="row g-3">
                <div className="col-md-6">
                  <p className="cube-ds-token">Titolo pagina · 22px / 600</p>
                  <h1 className="cube-page-title">Lista pagine</h1>
                </div>
                <div className="col-md-6">
                  <p className="cube-ds-token">Sottotitolo · 13px / 400 / secondary</p>
                  <p className="cube-page-subtitle">Tutte le pagine del sito Hotel Cosmopolitan 2026</p>
                </div>
                <div className="col-md-6">
                  <p className="cube-ds-token">Section title · 11px / 600 / uppercase / muted</p>
                  <h3 className="cube-section-title">Accesso rapido</h3>
                </div>
                <div className="col-md-6">
                  <p className="cube-ds-token">Body · 14px / 400 / primary</p>
                  <p style={{ margin: 0 }}>Testo standard dell'interfaccia. Deve garantire buona leggibilità a distanza normale.</p>
                </div>
                <div className="col-md-6">
                  <p className="cube-ds-token">Small · 12.5px / 500 / secondary</p>
                  <p style={{ margin: 0, fontSize: 12.5, color: "var(--cube-text-secondary)" }}>Metadati, hint di form, testi ausiliari.</p>
                </div>
                <div className="col-md-6">
                  <p className="cube-ds-token">Mono · 12px</p>
                  <p className="cube-mono" style={{ margin: 0 }}>it/prova-camera-interna-1</p>
                </div>
              </div>
              <p style={{ fontSize: 13, color: "var(--cube-text-muted)", marginTop: 12 }}>
                Font stack: <code className="cube-mono">system-ui, -apple-system, "Segoe UI", Inter, sans-serif</code>. Un solo family — no font display editoriale.
              </p>
            </Section>

            <Section id="spacing" title="Spaziature, radius, ombre">
              <div className="row g-3">
                <div className="col-md-6">
                  <h4 className="cube-section-title">Radius</h4>
                  {[["sm","6px","var(--cube-radius-sm)"],["md","8px","var(--cube-radius-md)"],["lg","12px","var(--cube-radius-lg)"],["pill","999px","var(--cube-radius-pill)"]].map(([n,v,r]) => (
                    <div key={n} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                      <div style={{ width: 48, height: 32, background: "var(--cube-brand-primary-subtle)", borderRadius: r, border: "1px solid var(--cube-brand-primary)" }} />
                      <span style={{ fontSize: 13 }}><strong>{n}</strong> — {v}</span>
                    </div>
                  ))}
                </div>
                <div className="col-md-6">
                  <h4 className="cube-section-title">Ombre</h4>
                  {[["sm","var(--cube-shadow-sm)"],["md","var(--cube-shadow-md)"],["lg","var(--cube-shadow-lg)"]].map(([n,s]) => (
                    <div key={n} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                      <div style={{ width: 56, height: 32, background: "#fff", borderRadius: 8, boxShadow: s, border: "1px solid var(--cube-border-color)" }} />
                      <span style={{ fontSize: 13 }}><strong>{n}</strong></span>
                    </div>
                  ))}
                </div>
              </div>
            </Section>

            <Section id="buttons" title="Bottoni — 5 varianti, tutti gli stati">
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
                <button className="btn btn-primary btn-sm">Primary</button>
                <button className="btn btn-secondary btn-sm">Secondary</button>
                <button className="btn btn-ghost btn-sm">Ghost</button>
                <button className="btn btn-danger btn-sm">Danger</button>
                <button className="btn btn-outline-danger btn-sm">Danger outline</button>
                <button className="btn btn-primary btn-sm"><Plus size={14} /> Con icona</button>
                <button className="btn btn-ghost btn-sm btn-icon" aria-label="Modifica"><Pencil size={14} /></button>
              </div>
              <table className="table cube-table" style={{ marginBottom: 0 }}>
                <thead><tr><th>Stato</th><th>Primary</th><th>Secondary</th><th>Danger</th></tr></thead>
                <tbody>
                  <tr><td>default</td><td><button className="btn btn-primary btn-sm">Salva</button></td><td><button className="btn btn-secondary btn-sm">Annulla</button></td><td><button className="btn btn-danger btn-sm">Elimina</button></td></tr>
                  <tr><td>disabled</td><td><button className="btn btn-primary btn-sm" disabled>Salva</button></td><td><button className="btn btn-secondary btn-sm" disabled>Annulla</button></td><td><button className="btn btn-danger btn-sm" disabled>Elimina</button></td></tr>
                  <tr><td>loading</td><td><button className="btn btn-primary btn-sm is-loading">Salva</button></td><td><button className="btn btn-secondary btn-sm is-loading">Annulla</button></td><td><button className="btn btn-danger btn-sm is-loading">Elimina</button></td></tr>
                </tbody>
              </table>
            </Section>

            <Section id="forms" title="Form">
              <div className="cube-form-grid">
                <div>
                  <label className="form-label">Campo standard <span className="cube-required">*</span></label>
                  <input className="form-control" placeholder="Inserisci un valore" />
                  <div className="form-text">Testo di supporto</div>
                </div>
                <div>
                  <label className="form-label">Campo focus</label>
                  <input className="form-control" defaultValue="In focus" autoFocus={false} style={{ boxShadow: "var(--cube-focus-ring)", borderColor: "var(--cube-brand-primary)" }} />
                </div>
                <div>
                  <label className="form-label">Errore</label>
                  <input className="form-control is-invalid" defaultValue="Valore non valido" />
                  <div className="invalid-feedback">Il campo è obbligatorio.</div>
                </div>
                <div>
                  <label className="form-label">Disabilitato</label>
                  <input className="form-control" disabled defaultValue="Non modificabile" />
                </div>
                <div>
                  <label className="form-label">Read-only</label>
                  <input className="form-control" readOnly defaultValue="Solo lettura" />
                </div>
                <div>
                  <label className="form-label">Select</label>
                  <select className="form-select"><option>Opzione A</option><option>Opzione B</option></select>
                </div>
                <div className="cube-form-grid__full">
                  <label className="form-label">Textarea</label>
                  <textarea className="form-control" rows={3} placeholder="Descrizione" />
                </div>
                <div>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="ck1" defaultChecked />
                    <label className="form-check-label" htmlFor="ck1">Checkbox selezionato</label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="ck2" />
                    <label className="form-check-label" htmlFor="ck2">Checkbox non selezionato</label>
                  </div>
                </div>
                <div>
                  <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" id="sw1" defaultChecked />
                    <label className="form-check-label" htmlFor="sw1">Switch attivo</label>
                  </div>
                  <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" id="sw2" />
                    <label className="form-check-label" htmlFor="sw2">Switch disattivo</label>
                  </div>
                </div>
              </div>
            </Section>

            <Section id="tables" title="Tabelle">
              <div className="cube-table-wrap">
                <table className="table cube-table">
                  <thead><tr><th className="cube-table__checkbox"><input type="checkbox" className="form-check-input" /></th><th>Pagina</th><th>Stato</th><th>Lingue</th><th className="cube-table__actions">Azioni</th></tr></thead>
                  <tbody>
                    <tr><td><input type="checkbox" className="form-check-input" /></td><td className="cube-table__cell-strong">Home Page</td><td><Badge variant="success">pubblica</Badge></td><td><LangFlags langs={["it","en","fr"]} /></td><td className="cube-table__actions"><div className="cube-table__row-actions"><button className="btn btn-ghost btn-sm btn-icon"><Pencil size={14} /></button><button className="btn btn-ghost btn-sm btn-icon"><Copy size={14} /></button><button className="btn btn-ghost btn-sm btn-icon" style={{ color: "var(--cube-danger)" }}><Trash2 size={14} /></button></div></td></tr>
                    <tr className="is-selected"><td><input type="checkbox" className="form-check-input" defaultChecked /></td><td className="cube-table__cell-strong">Offerte (selezionata)</td><td><Badge variant="warning">bozza</Badge></td><td><LangFlags langs={["it","en"]} /></td><td className="cube-table__actions"><div className="cube-table__row-actions"><button className="btn btn-ghost btn-sm btn-icon"><Pencil size={14} /></button></div></td></tr>
                    <tr><td><input type="checkbox" className="form-check-input" /></td><td className="cube-table__cell-strong">Gallery</td><td><Badge variant="success">pubblica</Badge></td><td><LangFlags langs={["it","en","fr","de","es"]} /></td><td className="cube-table__actions"><div className="cube-table__row-actions"><button className="btn btn-ghost btn-sm btn-icon"><Pencil size={14} /></button></div></td></tr>
                  </tbody>
                </table>
              </div>
            </Section>

            <Section id="badges" title="Badge e stati">
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                <Badge variant="success">online</Badge>
                <Badge variant="neutral">offline</Badge>
                <Badge variant="warning">bozza</Badge>
                <Badge variant="danger">errore</Badge>
                <Badge variant="info">info</Badge>
                <Badge variant="brand">pubblica</Badge>
                <span className="cube-badge is-neutral cube-badge--type">Custom</span>
                <span className="cube-badge is-info cube-badge--type">Giga</span>
                <span className="cube-badge is-brand cube-badge--type">Instant</span>
              </div>
            </Section>

            <Section id="alerts" title="Alert">
              <div className="alert alert-info"><Info size={16} /> Informazione: la revisione è stata caricata correttamente.</div>
              <div className="alert alert-success"><Check size={16} /> Le modifiche sono state salvate.</div>
              <div className="alert alert-warning"><AlertTriangle size={16} /> Attenzione: mancano traduzioni in 2 lingue.</div>
              <div className="alert alert-danger"><X size={16} /> Errore: impossibile pubblicare la pagina.</div>
            </Section>

            <Section id="tabs" title="Tab">
              <ul className="nav nav-tabs">
                <li className="nav-item"><button className="nav-link active">Configurazioni</button></li>
                <li className="nav-item"><button className="nav-link">Drt</button></li>
                <li className="nav-item"><button className="nav-link">Loghi</button></li>
                <li className="nav-item"><button className="nav-link">Favicon</button></li>
              </ul>
              <p style={{ padding: 20, margin: 0, background: "var(--cube-surface-muted)", borderRadius: "0 0 var(--cube-radius-md) var(--cube-radius-md)", fontSize: 13, color: "var(--cube-text-secondary)" }}>
                Contenuto della tab attiva.
              </p>
            </Section>

            <Section id="modals" title="Modali">
              <div style={{ display: "flex", gap: 8 }}>
                <button className="btn btn-secondary btn-sm" onClick={() => setShowModal(true)}>Apri modale standard</button>
                <button className="btn btn-outline-danger btn-sm" onClick={() => setShowDanger(true)}>Apri modale distruttiva</button>
              </div>
            </Section>

            <Section id="empty" title="Stati vuoti e loading">
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="cube-card">
                    <div className="cube-empty">
                      <div className="cube-empty__icon"><Search size={22} /></div>
                      <p className="cube-empty__title">Nessun risultato</p>
                      <p className="cube-empty__desc">Non abbiamo trovato pagine per i filtri applicati. Prova a modificare i criteri di ricerca.</p>
                      <button className="btn btn-secondary btn-sm">Reimposta filtri</button>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="cube-card">
                    <div className="cube-card__body">
                      <div className="cube-skeleton mb-2" style={{ height: 16, width: "40%" }} />
                      <div className="cube-skeleton mb-2" style={{ height: 12 }} />
                      <div className="cube-skeleton mb-2" style={{ height: 12, width: "80%" }} />
                      <div className="cube-skeleton mb-3" style={{ height: 12, width: "65%" }} />
                      <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--cube-text-muted)" }}>
                        <Loader2 size={14} className="cube-spinner" style={{ border: 0, animation: "cube-spin 0.7s linear infinite" }} />
                        Caricamento in corso…
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Section>

            <Section id="mapping" title="Mapping variabili">
              <p style={{ fontSize: 13, color: "var(--cube-text-secondary)" }}>
                I token Cube sono la fonte di verità. Le variabili Bootstrap (<code>--bs-*</code>) e legacy (<code>--blast-*</code>, <code>--primary</code>, ecc.) sono mantenute come alias per garantire compatibilità durante la transizione.
              </p>
              <div className="cube-table-wrap">
                <table className="table cube-table">
                  <thead><tr><th>Concetto</th><th>Token Cube</th><th>Variabile Bootstrap</th><th>Variabile legacy</th></tr></thead>
                  <tbody>
                    {[
                      ["Colore primario", "--cube-brand-primary", "--bs-primary", "--blast-color, --primary"],
                      ["Hover primario", "--cube-brand-primary-hover", "override componente", "--blast-color-hover, --primaryHover"],
                      ["Sfondo pagina", "--cube-page-bg", "--bs-body-bg", "da verificare tra --light1/2/3"],
                      ["Superficie card", "--cube-surface-bg", "--bs-tertiary-bg", "--mainLight"],
                      ["Testo primario", "--cube-text-primary", "--bs-body-color", "--mainDark"],
                      ["Bordo standard", "--cube-border-color", "--bs-border-color", "possibile --light4"],
                      ["Sidebar", "--cube-sidebar-bg", "override componente", "--dark-color"],
                      ["Sidebar hover/attivo", "--cube-sidebar-active", "—", "--dark-color-soft"],
                      ["Info subtle", "--cube-info-subtle", "—", "--azzurro"],
                      ["Warning", "--cube-warning", "—", "--giallo"],
                      ["Warning subtle", "--cube-warning-subtle", "—", "--gialloChiaro"],
                      ["Easing", "--cube-easing-standard", "—", "--cubic"],
                    ].map(([c, t, bs, l]) => (
                      <tr key={c}>
                        <td>{c}</td>
                        <td className="cube-mono">{t}</td>
                        <td className="cube-mono" style={{ color: "var(--cube-text-secondary)" }}>{bs}</td>
                        <td className="cube-mono" style={{ color: "var(--cube-text-muted)" }}>{l}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="alert alert-warning mt-3">
                <AlertTriangle size={16} />
                <div>
                  <strong>Variabili non accorpate.</strong> <code>--blu</code>, <code>--fa-color-dark</code>, <code>--light1/2/3</code> restano come alias attuali e vanno confermate leggendo il codice del CMS reale prima di essere riassegnate a un token Cube.
                </div>
              </div>
            </Section>

            <Section id="dos" title="Do & Don't">
              <div className="row g-3">
                <div className="col-md-6"><div className="cube-ds-do"><strong>✓ Fare</strong><br />Usa magenta per l'azione primaria della pagina o per lo stato attivo, non come fondo di chrome.</div></div>
                <div className="col-md-6"><div className="cube-ds-dont"><strong>✗ Non fare</strong><br />Non colorare l'intero header di magenta pieno: consuma la saturazione riservata alle azioni.</div></div>
                <div className="col-md-6"><div className="cube-ds-do"><strong>✓ Fare</strong><br />Riduci le azioni di riga a icon-button ghost; raccogli le secondarie sotto un menu ⋯.</div></div>
                <div className="col-md-6"><div className="cube-ds-dont"><strong>✗ Non fare</strong><br />Non usare bottoni pieni verde/grigio/rosso su ogni riga: il verde non è "modifica".</div></div>
                <div className="col-md-6"><div className="cube-ds-do"><strong>✓ Fare</strong><br />Un'unica save-bar sticky in fondo, con stato di salvataggio.</div></div>
                <div className="col-md-6"><div className="cube-ds-dont"><strong>✗ Non fare</strong><br />Non ripetere azioni di salvataggio in header, Quick link e footer contemporaneamente.</div></div>
              </div>
            </Section>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="cube-modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="cube-modal" onClick={(e) => e.stopPropagation()}>
            <div className="cube-modal__header">
              <div className="cube-modal__icon"><Info size={18} /></div>
              <div>
                <h3 className="cube-modal__title">Conferma pubblicazione</h3>
                <p className="cube-modal__desc">La pagina verrà pubblicata immediatamente e sarà visibile ai visitatori del sito.</p>
              </div>
              <button className="cube-modal__close" onClick={() => setShowModal(false)} aria-label="Chiudi">×</button>
            </div>
            <div className="cube-modal__footer">
              <button className="btn btn-secondary btn-sm" onClick={() => setShowModal(false)}>Annulla</button>
              <button className="btn btn-primary btn-sm" onClick={() => setShowModal(false)}>Pubblica</button>
            </div>
          </div>
        </div>
      )}
      {showDanger && (
        <div className="cube-modal-backdrop" onClick={() => setShowDanger(false)}>
          <div className="cube-modal" onClick={(e) => e.stopPropagation()}>
            <div className="cube-modal__header">
              <div className="cube-modal__icon is-danger"><AlertTriangle size={18} /></div>
              <div>
                <h3 className="cube-modal__title">Eliminare definitivamente?</h3>
                <p className="cube-modal__desc">L'operazione è irreversibile. Verranno rimossi anche i riferimenti in tutte le lingue.</p>
              </div>
              <button className="cube-modal__close" onClick={() => setShowDanger(false)} aria-label="Chiudi">×</button>
            </div>
            <div className="cube-modal__body">
              <div className="alert alert-danger" style={{ margin: 0 }}>
                <AlertTriangle size={16} />
                <span>Digita <strong>ELIMINA</strong> per confermare.</span>
              </div>
              <input className="form-control mt-3" placeholder="ELIMINA" />
            </div>
            <div className="cube-modal__footer">
              <button className="btn btn-secondary btn-sm" onClick={() => setShowDanger(false)}>Annulla</button>
              <button className="btn btn-danger btn-sm" onClick={() => setShowDanger(false)}><Trash2 size={14} /> Elimina definitivamente</button>
            </div>
          </div>
        </div>
      )}
    </Shell>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} style={{ scrollMarginTop: 80, marginBottom: 40 }}>
      <div className="cube-card">
        <div className="cube-card__header">{title}</div>
        <div className="cube-card__body">{children}</div>
      </div>
    </section>
  );
}

function SwatchGroup({ title, items }: { title: string; items: [string, string][] }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <h4 className="cube-section-title">{title}</h4>
      <div className="row g-2">
        {items.map(([token, hex]) => (
          <div className="col-6 col-md-3" key={token}>
            <div className="cube-ds-swatch" style={{ background: hex }} />
            <p className="cube-ds-swatch-label" style={{ marginBottom: 2 }}>{hex}</p>
            <p className="cube-ds-token" style={{ margin: 0 }}>{token}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
