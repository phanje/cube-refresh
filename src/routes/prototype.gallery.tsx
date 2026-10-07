import { createFileRoute } from "@tanstack/react-router";
import { Shell, PageHeader } from "@/components/cube/Shell";
import { Plus, Trash2, Pencil, Copy, Image as ImageIcon } from "lucide-react";

export const Route = createFileRoute("/prototype/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Cube CMS" },
      { name: "description", content: "Elenco delle gallery del sito." },
      { property: "og:title", content: "Gallery — Cube CMS" },
      { property: "og:description", content: "Elenco delle gallery del sito." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GalleryList,
});

const IMGS = [
  "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=200&auto=format&fit=crop",
];

function GalleryList() {
  return (
    <Shell crumbs={[{ label: "Bacheca", to: "/prototype/dashboard" }, { label: "Gallery" }]}>
      <div className="cube-content">
        <PageHeader
          title="Lista gallery"
          subtitle="Raccolte di immagini del sito"
          actions={
            <>
              <button className="btn btn-secondary btn-sm"><Trash2 size={14} /> Cestino</button>
              <button className="btn btn-primary btn-sm"><Plus size={14} /> Inserisci gallery</button>
            </>
          }
        />

        <div className="cube-toolbar" style={{ background: "var(--cube-surface-bg)", border: "1px solid var(--cube-border-color)", borderRadius: "var(--cube-radius-lg)", marginBottom: 16 }}>
          <label className="form-label mb-0 me-2">Lingua</label>
          <select className="form-select form-select-sm" style={{ width: "auto" }}>
            <option>Italiano</option>
          </select>
        </div>

        <div className="row g-3">
          <div className="col-lg-6">
            <div className="cube-card">
              <div className="cube-card__header">
                <ImageIcon size={16} style={{ color: "var(--cube-brand-primary)" }} />
                Gallery
                <span className="cube-badge is-neutral" style={{ marginLeft: 8 }}>9 immagini</span>
                <div style={{ marginLeft: "auto", display: "flex", gap: 4 }}>
                  <button className="btn btn-ghost btn-sm btn-icon" aria-label="Modifica"><Pencil size={14} /></button>
                  <button className="btn btn-ghost btn-sm btn-icon" aria-label="Duplica"><Copy size={14} /></button>
                  <button className="btn btn-ghost btn-sm btn-icon" aria-label="Elimina" style={{ color: "var(--cube-danger)" }}><Trash2 size={14} /></button>
                </div>
              </div>
              <div className="cube-card__body">
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
                  {IMGS.map((src, i) => (
                    <div key={i} style={{ aspectRatio: "4/3", background: "var(--cube-surface-muted)", borderRadius: "var(--cube-radius-md)", backgroundImage: `url(${src})`, backgroundSize: "cover", backgroundPosition: "center" }} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="cube-card" style={{ height: "100%" }}>
              <div className="cube-empty">
                <div className="cube-empty__icon"><ImageIcon size={22} /></div>
                <p className="cube-empty__title">Aggiungi una nuova gallery</p>
                <p className="cube-empty__desc">Crea una raccolta di immagini per il tuo sito, con supporto multilingua.</p>
                <button className="btn btn-primary btn-sm"><Plus size={14} /> Inserisci gallery</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}
