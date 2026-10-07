import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell, PageHeader } from "@/components/cube/Shell";
import { ArrowLeft, Eye, RotateCcw, Sparkles, Image as ImageIcon, Info, Save } from "lucide-react";
import { useState } from "react";
import { MediaUpload } from "@/components/cube/MediaUpload";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/prototype/pages/edit")({
  head: () => ({
    meta: [
      { title: "Modifica pagina — Cube CMS" },
      { name: "description", content: "Modifica di una pagina del sito." },
      { property: "og:title", content: "Modifica pagina — Cube CMS" },
      { property: "og:description", content: "Modifica di una pagina del sito." },
    ],
  }),
  component: PageEdit,
});

function PageEdit() {
  const [mediaOpen, setMediaOpen] = useState(false);
  return (
    <Shell
      crumbs={[
        { label: "Bacheca", to: "/prototype/dashboard" },
        { label: "Pagine", to: "/prototype/pages" },
        { label: "(reference) Camera Interna 1" },
      ]}
    >
      <div className="cube-content" style={{ paddingBottom: 24 }}>
        <PageHeader
          title="Modifica pagina"
          subtitle="Camera Interna · ultima modifica 22-07-2026 · De Gennaro Stefania"
          actions={
            <>
              <Link to="/prototype/pages" className="btn btn-ghost btn-sm"><ArrowLeft size={14} /> Torna alla lista</Link>
              <button className="btn btn-secondary btn-sm"><RotateCcw size={14} /> Revisioni</button>
              <button className="btn btn-secondary btn-sm"><Eye size={14} /> Visualizza</button>
            </>
          }
        />

        <div className="row g-4">
          <div className="col-lg-8">
            <div className="cube-card">
              <div className="cube-card__body">
                <div className="cube-form-section" style={{ paddingTop: 0 }}>
                  <h3 className="cube-form-section__title">Informazioni generali</h3>
                  <p className="cube-form-section__hint">Titolo, URL e testo principale della pagina.</p>
                  <div className="cube-form-grid">
                    <div className="cube-form-grid__full">
                      <label className="form-label">URL <span className="cube-required">*</span></label>
                      <div className="cube-input-group">
                        <span className="cube-input-group__prefix">/</span>
                        <input className="form-control" defaultValue="it/prova-camera-interna-1" />
                      </div>
                    </div>
                    <div className="cube-form-grid__full">
                      <label className="form-label">Titolo <span className="cube-required">*</span></label>
                      <input className="form-control" defaultValue="(reference) Camera Interna 1" />
                    </div>
                    <div className="cube-form-grid__full">
                      <label className="form-label">Sottotitolo</label>
                      <input className="form-control" placeholder="Opzionale" />
                    </div>
                    <div className="cube-form-grid__full">
                      <label className="form-label">Testo</label>
                      <textarea className="form-control" rows={6} defaultValue={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dignissim cursus tortor, sed imperdiet lorem ornare eu. Praesent ac dolor quis arcu dictum malesuada et ut nisi."} />
                      <div className="form-text">Parole: 97</div>
                    </div>
                  </div>
                </div>

                <div className="cube-form-section">
                  <h3 className="cube-form-section__title">Sezione top</h3>
                  <p className="cube-form-section__hint">Immagini di apertura della pagina.</p>
                  <div className="row g-3">
                    {["Top-Prova-1.jpg","Top-Prova-2.jpg","Top-Prova-3.jpg"].map((n) => (
                      <div className="col-md-4" key={n}>
                        <div style={{ border: "1px solid var(--cube-border-color)", borderRadius: "var(--cube-radius-md)", padding: 10 }}>
                          <div style={{ height: 96, background: "var(--cube-surface-muted)", borderRadius: "var(--cube-radius-sm)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--cube-text-muted)", marginBottom: 8 }}>
                            <ImageIcon size={22} />
                          </div>
                          <input className="form-control form-control-sm" defaultValue={`temp/${n}`} readOnly />
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" className="mt-3" onClick={() => setMediaOpen(true)}><ImageIcon size={14} /> Seleziona le immagini</Button>
                </div>

                <div className="cube-form-section">
                  <h3 className="cube-form-section__title">Sezione box icone</h3>
                  <p className="cube-form-section__hint">Configura le icone e i relativi testi.</p>
                  <div className="cube-empty" style={{ padding: "24px" }}>
                    <div className="cube-empty__icon"><Info size={22} /></div>
                    <p className="cube-empty__title">Nessun box icone configurato</p>
                    <p className="cube-empty__desc">Aggiungi il primo box per iniziare.</p>
                    <button className="btn btn-secondary btn-sm">Aggiungi box</button>
                  </div>
                </div>

                <div className="cube-form-section">
                  <h3 className="cube-form-section__title">Meta SEO</h3>
                  <p className="cube-form-section__hint">Metadati per l'indicizzazione.</p>
                  <div className="cube-form-grid">
                    <div className="cube-form-grid__full">
                      <label className="form-label">Title <span style={{ color: "var(--cube-text-muted)", fontWeight: 400 }}>[0/70]</span></label>
                      <input className="form-control" />
                    </div>
                    <div className="cube-form-grid__full">
                      <label className="form-label">Description <span style={{ color: "var(--cube-text-muted)", fontWeight: 400 }}>[0/155]</span></label>
                      <textarea className="form-control" rows={3} />
                    </div>
                  </div>
                  <button className="btn btn-ghost btn-sm mt-2"><Sparkles size={14} /> Genera meta</button>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="cube-card mb-3">
              <div className="cube-card__header">Impostazioni</div>
              <div className="cube-card__body">
                <div className="mb-3">
                  <label className="form-label">Stato</label>
                  <select className="form-select"><option>Pubblica</option><option>Bozza</option><option>Archiviata</option></select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Modello</label>
                  <select className="form-select"><option>Camera Interna</option><option>Home Page</option><option>Interne</option></select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Ancora</label>
                  <input className="form-control" placeholder="es. camera-1" />
                </div>
                <div>
                  <label className="form-label">Lingue attive</label>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {["IT","EN","FR","DE","ES"].map((l) => (
                      <span key={l} className="cube-badge is-neutral cube-badge--type">{l}</span>
                    ))}
                  </div>
                </div>
                <button className="btn btn-primary btn-sm w-100 mt-3"><Sparkles size={14} /> Traduci con AI</button>
              </div>
            </div>

            <div className="cube-card">
              <div className="cube-card__header">Immagine anteprima</div>
              <div className="cube-card__body">
                <div style={{ height: 140, background: "var(--cube-surface-muted)", borderRadius: "var(--cube-radius-md)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--cube-text-muted)" }}>
                  <ImageIcon size={28} />
                </div>
                <div className="form-check mt-3">
                  <input className="form-check-input" type="checkbox" id="preview" />
                  <label className="form-check-label" htmlFor="preview" style={{ fontSize: 13 }}>Info anteprima</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <MediaUpload open={mediaOpen} onOpenChange={setMediaOpen} />
      <div className="cube-save-bar">
        <span className="cube-save-bar__status">
          <span style={{ width: 8, height: 8, borderRadius: 4, background: "var(--cube-warning)" }} />
          Modifiche non salvate
        </span>
        <div className="cube-save-bar__spacer" />
        <button className="btn btn-ghost btn-sm">Annulla</button>
        <button className="btn btn-secondary btn-sm"><Save size={14} /> Salva</button>
        <button className="btn btn-primary btn-sm">Salva ed esci</button>
      </div>
    </Shell>
  );
}
