import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Shell, PageHeader } from "@/components/cube/Shell";
import { Settings2, Code2, Image as ImageIcon, Star, QrCode, Save } from "lucide-react";

export const Route = createFileRoute("/prototype/settings")({
  head: () => ({
    meta: [
      { title: "Aspetto — Cube CMS" },
      { name: "description", content: "Impostazioni di aspetto del sito." },
      { property: "og:title", content: "Aspetto — Cube CMS" },
      { property: "og:description", content: "Impostazioni di aspetto del sito." },
    ],
  }),
  component: SettingsPage,
});

const TABS = [
  { id: "config", label: "Configurazioni", icon: Settings2 },
  { id: "drt", label: "Drt", icon: Code2 },
  { id: "logos", label: "Loghi", icon: ImageIcon },
  { id: "favicon", label: "Favicon", icon: Star },
  { id: "qr", label: "Impostazioni QR", icon: QrCode },
];

function SettingsPage() {
  const [tab, setTab] = useState("config");
  return (
    <Shell crumbs={[{ label: "Bacheca", to: "/prototype/dashboard" }, { label: "Aspetto" }]}>
      <div className="cube-content" style={{ paddingBottom: 24 }}>
        <PageHeader title="Impostazioni" subtitle="Configura l'aspetto e i comportamenti del sito" />

        <div className="cube-card">
          <ul className="nav nav-tabs" role="tablist" style={{ padding: "0 12px", margin: 0 }}>
            {TABS.map((t) => {
              const Icon = t.icon;
              return (
                <li className="nav-item" key={t.id} role="presentation">
                  <button type="button" className={`nav-link${tab === t.id ? " active" : ""}`} onClick={() => setTab(t.id)}>
                    <Icon size={14} /> {t.label}
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="cube-card__body">
            {tab === "config" && (
              <>
                <h3 className="cube-section-title">Configurazione menu default</h3>
                <div className="cube-form-grid mb-4">
                  <div>
                    <label className="form-label">Modello di default</label>
                    <select className="form-select"><option>Interne</option><option>Home Page</option></select>
                  </div>
                  <div>
                    <label className="form-label">Menu top di default</label>
                    <select className="form-select"><option>Menu Top</option></select>
                  </div>
                  <div>
                    <label className="form-label">Menu bottom di default</label>
                    <select className="form-select"><option>Menu Footer</option></select>
                  </div>
                </div>

                <h3 className="cube-section-title">Configurazione immagini</h3>
                <div className="cube-form-grid">
                  <div>
                    <label className="form-label">Title immagini default</label>
                    <input className="form-control" />
                  </div>
                  <div>
                    <label className="form-label">Caption immagini default</label>
                    <input className="form-control" />
                  </div>
                  <div className="cube-form-grid__full">
                    <label className="form-label">Geo location immagini</label>
                    <input className="form-control" placeholder="Latitudine, longitudine" />
                    <div className="form-text">Applicata come metadato EXIF alle nuove immagini caricate.</div>
                  </div>
                </div>
              </>
            )}
            {tab !== "config" && (
              <div className="cube-empty">
                <div className="cube-empty__icon">•</div>
                <p className="cube-empty__title">Sezione «{TABS.find((t) => t.id === tab)?.label}»</p>
                <p className="cube-empty__desc">Contenuto della tab conservato dal CMS attuale. Non ridisegnato in questa fase.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="cube-save-bar">
        <span className="cube-save-bar__status">Tutte le modifiche sincronizzate</span>
        <div className="cube-save-bar__spacer" />
        <button className="btn btn-primary btn-sm"><Save size={14} /> Salva</button>
      </div>
    </Shell>
  );
}
