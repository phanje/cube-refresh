import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, LayoutDashboard, FileText, Image, Sparkles, PencilRuler, ClipboardList } from "lucide-react";

const CUBE_LOGO = "https://cube.blastness.site/assets/images/logo_interno.png";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Cube CMS — Prototipo del redesign" },
    { name: "description", content: "Schermate e design system del redesign grafico di Cube CMS." },
    { property: "og:title", content: "Cube CMS — Prototipo del redesign" },
    { property: "og:description", content: "Schermate e design system del redesign grafico di Cube CMS." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Landing,
});

const LINKS = [
  { to: "/prototype/dashboard", title: "Bacheca", desc: "Panoramica sito, statistiche, accessi rapidi", icon: LayoutDashboard },
  { to: "/prototype/pages", title: "Lista pagine", desc: "Tabella, filtri, azioni riga, paginazione", icon: FileText },
  { to: "/prototype/pages/edit", title: "Modifica pagina", desc: "Form lungo, sezioni, save bar sticky", icon: PencilRuler },
  { to: "/prototype/gallery", title: "Gallery", desc: "Griglia media con azioni per elemento", icon: Image },
  { to: "/prototype/settings", title: "Impostazioni Aspetto", desc: "Pagina a tab con configurazioni", icon: ClipboardList },
  { to: "/prototype/design-system", title: "Design System", desc: "Token, componenti, mapping, do/don't", icon: Sparkles },
];

function Landing() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--cube-page-bg)" }}>
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "56px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
          <img src={CUBE_LOGO} alt="Cube" style={{ height: 32, background: "var(--cube-sidebar-bg)", padding: "6px 10px", borderRadius: 8 }} />
          <span className="cube-badge is-brand" style={{ padding: "3px 10px" }}>Redesign prototype · Fase 1</span>
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 600, letterSpacing: "-0.02em", margin: "0 0 8px" }}>
          Cube CMS — nuova direzione visiva
        </h1>
        <p style={{ fontSize: 15, color: "var(--cube-text-secondary)", maxWidth: 640, marginBottom: 32 }}>
          Prototipo navigabile del redesign. Stesso Cube, stesse funzionalità, un solo design system
          basato su token semantici mappati su Bootstrap 5.3 e sulle variabili legacy esistenti.
        </p>

        <div className="row g-3">
          {LINKS.map(({ to, title, desc, icon: Icon }) => (
            <div className="col-md-6" key={to}>
              <Link to={to} className="cube-quick-card" style={{ height: "100%" }}>
                <div className="cube-quick-card__icon"><Icon size={18} /></div>
                <div>
                  <p className="cube-quick-card__title">{title}</p>
                  <p className="cube-quick-card__desc">{desc}</p>
                </div>
                <div style={{ marginLeft: "auto", color: "var(--cube-brand-primary)", display: "inline-flex", alignItems: "center", gap: 4, fontSize: 12.5, fontWeight: 500 }}>
                  Apri <ArrowRight size={14} />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
