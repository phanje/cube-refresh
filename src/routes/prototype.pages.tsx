import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { Shell, PageHeader } from "@/components/cube/Shell";
import { Badge, LangFlags } from "@/components/cube/atoms";
import { Plus, Trash2, Search, FileDown, Pencil, Copy, MoreHorizontal, AlertTriangle } from "lucide-react";

export const Route = createFileRoute("/prototype/pages")({
  head: () => ({
    meta: [
      { title: "Lista pagine — Cube CMS" },
      { name: "description", content: "Elenco delle pagine del sito con filtri e azioni." },
      { property: "og:title", content: "Lista pagine — Cube CMS" },
      { property: "og:description", content: "Elenco delle pagine del sito con filtri e azioni." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PagesRoute,
});

function PagesRoute() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  return pathname === "/prototype/pages" ? <PagesList /> : <Outlet />;
}

const PAGES = [
  { name: "(reference) Camera Interna 1", url: "it/prova-camera-interna-1", model: "Camera Interna", status: "pubblica", langs: ["it","en","fr","de","es"], date: "22-07-2026 10:18", user: "De Gennaro Stefania" },
  { name: "(reference) Interna base",     url: "it/prova-interna",           model: "Interne",        status: "pubblica", langs: ["it","en","fr","de","es"], date: "21-07-2026 14:27", user: "De Gennaro Stefania" },
  { name: "Home Page",                    url: "index",                      model: "Home Page",      status: "pubblica", langs: ["it","en","fr","de","es"], date: "20-07-2026 15:29", user: "De Gennaro Stefania" },
  { name: "(reference) Box Alternati",    url: "it/prova-box-alternati",     model: "Box Alternati",  status: "pubblica", langs: ["it","en","fr","de","es"], date: "25-05-2026 12:19", user: "De Gennaro Stefania" },
  { name: "(reference) Prova FAQ",        url: "it/prova-faq",               model: "Testo Comparsa", status: "pubblica", langs: ["it","en","fr","de","es"], date: "07-01-2026 17:39", user: "De Gennaro Stefania" },
  { name: "(reference) Prova Articoli",   url: "it/prova-articoli",          model: "News",           status: "pubblica", langs: ["it","en","fr","de","es"], date: "07-01-2026 14:21", user: "De Gennaro Stefania" },
  { name: "(reference) Pressroom",        url: "it/prova-pressroom",         model: "Pressroom",      status: "pubblica", langs: ["it","en","fr","de","es"], date: "07-01-2026 12:24", user: "De Gennaro Stefania" },
  { name: "(reference) Prova Form",       url: "it/prova-form",              model: "Form",           status: "bozza",    langs: ["it","en","fr","de","es"], date: "07-01-2026 09:25", user: "De Gennaro Stefania" },
  { name: "Offerte",                      url: "it/offerte",                 model: "Offerte",        status: "pubblica", langs: ["it","en","fr","de","es"], date: "02-01-2026 17:18", user: "De Gennaro Stefania" },
  { name: "Gallery",                      url: "it/gallery",                 model: "Gallery",        status: "pubblica", langs: ["it","en","fr","de","es"], date: "02-01-2026 17:07", user: "De Gennaro Stefania" },
];

function PagesList() {
  const [showDelete, setShowDelete] = useState(false);
  const [selected, setSelected] = useState<Set<number>>(new Set());

  const toggle = (i: number) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i); else next.add(i);
      return next;
    });
  };

  return (
    <Shell crumbs={[{ label: "Bacheca", to: "/prototype/dashboard" }, { label: "Pagine" }]}>
      <div className="cube-content">
        <PageHeader
          title="Lista pagine"
          subtitle="Tutte le pagine del sito Hotel Cosmopolitan 2026"
          actions={
            <>
              <button type="button" className="btn btn-secondary btn-sm"><Trash2 size={14} /> Cestino</button>
              <Link to="/prototype/pages/edit" className="btn btn-primary btn-sm"><Plus size={14} /> Inserisci pagina</Link>
            </>
          }
        />

        <div className="cube-card">
          <div className="cube-toolbar">
            <div>
              <label className="form-label mb-0 me-2" style={{ display: "inline-block" }}>Lingua</label>
              <select className="form-select form-select-sm" style={{ display: "inline-block", width: "auto" }}>
                <option>Italiano</option><option>Inglese</option><option>Francese</option>
              </select>
            </div>
            <div>
              <label className="form-label mb-0 me-2" style={{ display: "inline-block" }}>Mostra</label>
              <select className="form-select form-select-sm" style={{ display: "inline-block", width: "auto" }}>
                <option>50</option><option>25</option><option>100</option>
              </select>
              <span className="ms-2" style={{ fontSize: 12.5, color: "var(--cube-text-muted)" }}>elementi</span>
            </div>
            <div style={{ marginLeft: "auto", display: "flex", gap: 8, alignItems: "center" }}>
              <div className="cube-input-group" style={{ width: 260 }}>
                <span className="cube-input-group__prefix"><Search size={13} /></span>
                <input type="search" className="form-control form-control-sm" placeholder="Cerca pagine…" />
              </div>
              <button className="btn btn-ghost btn-sm"><FileDown size={14} /> Excel</button>
              <button className="btn btn-ghost btn-sm"><FileDown size={14} /> PDF</button>
            </div>
          </div>

          {selected.size > 0 && (
            <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 16px", background: "var(--cube-brand-primary-subtle)", borderBottom: "1px solid var(--cube-border-color)", fontSize: 13 }}>
              <strong>{selected.size}</strong> selezionati
              <button className="btn btn-ghost btn-sm">Duplica</button>
              <button className="btn btn-ghost btn-sm" style={{ color: "var(--cube-danger)" }} onClick={() => setShowDelete(true)}>Elimina</button>
              <button className="btn btn-ghost btn-sm" style={{ marginLeft: "auto" }} onClick={() => setSelected(new Set())}>Annulla</button>
            </div>
          )}

          <div style={{ overflowX: "auto" }}>
            <table className="table cube-table">
              <thead>
                <tr>
                  <th className="cube-table__checkbox"><input type="checkbox" className="form-check-input" /></th>
                  <th>Pagina</th>
                  <th>URL</th>
                  <th>Modello</th>
                  <th>Stato</th>
                  <th>Lingue</th>
                  <th>Ultima modifica</th>
                  <th className="cube-table__actions">Azioni</th>
                </tr>
              </thead>
              <tbody>
                {PAGES.map((p, i) => (
                  <tr key={p.url} className={selected.has(i) ? "is-selected" : ""}>
                    <td><input type="checkbox" className="form-check-input" checked={selected.has(i)} onChange={() => toggle(i)} /></td>
                    <td className="cube-table__cell-strong">{p.name}</td>
                    <td className="cube-mono" style={{ color: "var(--cube-text-secondary)" }}>{p.url}</td>
                    <td>{p.model}</td>
                    <td><Badge variant={p.status === "pubblica" ? "success" : "warning"}>{p.status}</Badge></td>
                    <td><LangFlags langs={p.langs} /></td>
                    <td>
                      <div style={{ fontSize: 12.5 }}>{p.date}</div>
                      <div className="cube-table__row-meta">{p.user}</div>
                    </td>
                    <td className="cube-table__actions">
                      <div className="cube-table__row-actions">
                        <Link to="/prototype/pages/edit" className="btn btn-ghost btn-sm btn-icon" aria-label="Modifica"><Pencil size={14} /></Link>
                        <button className="btn btn-ghost btn-sm btn-icon" aria-label="Duplica"><Copy size={14} /></button>
                        <button className="btn btn-ghost btn-sm btn-icon" aria-label="Elimina" onClick={() => setShowDelete(true)} style={{ color: "var(--cube-danger)" }}><Trash2 size={14} /></button>
                        <button className="btn btn-ghost btn-sm btn-icon" aria-label="Altro"><MoreHorizontal size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ display: "flex", alignItems: "center", padding: "12px 16px", borderTop: "1px solid var(--cube-border-color)", fontSize: 12.5, color: "var(--cube-text-muted)" }}>
            Risultati da 1 a 10 di 10 elementi
            <nav className="ms-auto" aria-label="Paginazione">
              <ul className="pagination pagination-sm mb-0">
                <li className="page-item disabled"><span className="page-link">«</span></li>
                <li className="page-item disabled"><span className="page-link">‹</span></li>
                <li className="page-item active"><span className="page-link">1</span></li>
                <li className="page-item disabled"><span className="page-link">›</span></li>
                <li className="page-item disabled"><span className="page-link">»</span></li>
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {showDelete && (
        <div className="cube-modal-backdrop" onClick={() => setShowDelete(false)}>
          <div className="cube-modal" onClick={(e) => e.stopPropagation()}>
            <div className="cube-modal__header">
              <div className="cube-modal__icon is-danger"><AlertTriangle size={18} /></div>
              <div>
                <h3 className="cube-modal__title">Eliminare le pagine selezionate?</h3>
                <p className="cube-modal__desc">
                  Le pagine verranno spostate nel cestino. L'operazione può essere annullata entro 30 giorni.
                </p>
              </div>
              <button className="cube-modal__close" onClick={() => setShowDelete(false)} aria-label="Chiudi">×</button>
            </div>
            <div className="cube-modal__footer">
              <button className="btn btn-secondary btn-sm" onClick={() => setShowDelete(false)}>Annulla</button>
              <button className="btn btn-danger btn-sm" onClick={() => setShowDelete(false)}>Sposta nel cestino</button>
            </div>
          </div>
        </div>
      )}
    </Shell>
  );
}
