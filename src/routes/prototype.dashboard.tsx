import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell, PageHeader } from "@/components/cube/Shell";
import { Badge, LangFlags } from "@/components/cube/atoms";
import { FileText, Pin, Image, Newspaper, Star, LayoutGrid, Images, Palette, Settings, FileCode2, Plus, ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/prototype/dashboard")({
  head: () => ({
    meta: [
      { title: "Bacheca — Cube CMS" },
      { name: "description", content: "Panoramica del sito con statistiche e accessi rapidi." },
      { property: "og:title", content: "Bacheca — Cube CMS" },
      { property: "og:description", content: "Panoramica del sito con statistiche e accessi rapidi." },
    ],
  }),
  component: Dashboard,
});

const QUICK = [
  { to: "/prototype/pages", label: "Pagine", icon: FileText },
  { to: "/prototype/articles", label: "Articoli", icon: Pin },
  { to: "/prototype/gallery", label: "Gallery", icon: Image },
  { to: "/prototype/pressroom", label: "Pressroom", icon: Newspaper },
  { to: "/prototype/reviews", label: "Recensioni", icon: Star },
  { to: "/prototype/elements", label: "Elementi", icon: LayoutGrid },
  { to: "/prototype/media", label: "Media", icon: Images },
  { to: "/prototype/settings", label: "Aspetto", icon: Palette },
  { to: "/prototype/site-settings", label: "Impostazioni", icon: Settings },
  { to: "/prototype/htaccess", label: "htaccess", icon: FileCode2 },
];

const SITES = [
  { id: "#1000000", type: "Custom", name: "Hotel Cosmopolitan 2026", slug: "hotelcosmopolitanbologna2026", status: "offline" as const, langs: ["it", "en", "fr", "de", "es"] },
  { id: "#1699", type: "Giga", name: "Porta Pia Comfy Rooms", slug: "portapiacomfyrooms", status: "online" as const, langs: ["it", "en"] },
  { id: "#1628", type: "Custom", name: "Default Template E", slug: "default-template-e", status: "offline" as const, langs: ["it", "en"] },
  { id: "#1489", type: "Custom", name: "Art Hotel Pasitea", slug: "hotelpasitea-2025", status: "online" as const, langs: ["it", "en"] },
  { id: "#1466", type: "Giga", name: "Cà Luis", slug: "caluisavenice", status: "online" as const, langs: ["it", "en", "de"] },
  { id: "#1226", type: "Custom", name: "Infinity Tropea 2024", slug: "infinitytropea_2024", status: "online" as const, langs: ["it", "en"] },
  { id: "#598",  type: "Instant", name: "Budoni Beach Hotel", slug: "budonibeachhotel", status: "online" as const, langs: ["it", "en", "fr", "de"] },
];

function Dashboard() {
  return (
    <Shell crumbs={[{ label: "Bacheca" }]}>
      <div className="cube-content">
        <PageHeader
          title="Hotel Cosmopolitan 2026"
          subtitle="Panoramica del sito attualmente selezionato"
          actions={
            <>
              <button type="button" className="btn btn-secondary btn-sm">Visualizza sito</button>
              <button type="button" className="btn btn-primary btn-sm"><Plus size={14} /> Nuova pagina</button>
            </>
          }
        />

        <div className="row g-3 mb-4">
          <div className="col-md-3 col-sm-6"><StatCard value="7" label="Siti" /></div>
          <div className="col-md-3 col-sm-6"><StatCard value="5" label="Online" tone="success" /></div>
          <div className="col-md-3 col-sm-6"><StatCard value="128" label="Pagine" tone="info" /></div>
          <div className="col-md-3 col-sm-6"><StatCard value="1.034" label="Utenti" tone="warning" /></div>
        </div>

        <h2 className="cube-section-title">Accesso rapido</h2>
        <div className="row g-2 mb-4">
          {QUICK.map(({ to, label, icon: Icon }) => (
            <div className="col-6 col-md-3 col-lg-2" key={to}>
              <Link to={to} className="cube-quick-card" style={{ padding: 14, gap: 8, height: "100%" }}>
                <div className="cube-quick-card__icon" style={{ width: 32, height: 32 }}><Icon size={16} /></div>
                <p className="cube-quick-card__title" style={{ fontSize: 13 }}>{label}</p>
              </Link>
            </div>
          ))}
        </div>

        <div className="cube-card">
          <div className="cube-card__header">
            <span>Ultimi siti creati</span>
            <span className="cube-badge is-neutral" style={{ marginLeft: 8 }}>{SITES.length}</span>
            <div style={{ marginLeft: "auto" }}>
              <button className="btn btn-ghost btn-sm">Vedi tutti <ArrowUpRight size={13} /></button>
            </div>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table className="table cube-table">
              <thead>
                <tr>
                  <th>Tipo</th>
                  <th>Brand</th>
                  <th>Stato</th>
                  <th>Lingue</th>
                  <th style={{ textAlign: "right" }}>ID</th>
                </tr>
              </thead>
              <tbody>
                {SITES.map((s) => (
                  <tr key={s.id}>
                    <td><Badge variant={s.type === "Instant" ? "brand" : s.type === "Giga" ? "info" : "neutral"} dot={false}>{s.type}</Badge></td>
                    <td>
                      <div className="cube-table__cell-strong">{s.name}</div>
                      <div className="cube-table__cell-muted">{s.slug}</div>
                    </td>
                    <td>
                      <Badge variant={s.status === "online" ? "success" : "neutral"}>{s.status}</Badge>
                    </td>
                    <td><LangFlags langs={s.langs} /></td>
                    <td className="cube-mono" style={{ textAlign: "right", color: "var(--cube-text-muted)" }}>{s.id}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Shell>
  );
}

function StatCard({ value, label, tone = "brand" }: { value: string; label: string; tone?: "brand" | "success" | "info" | "warning" }) {
  const toneMap: Record<string, { bg: string; fg: string }> = {
    brand: { bg: "var(--cube-brand-primary-subtle)", fg: "var(--cube-brand-primary)" },
    success: { bg: "var(--cube-success-subtle)", fg: "var(--cube-success)" },
    info: { bg: "var(--cube-info-subtle)", fg: "var(--cube-info)" },
    warning: { bg: "var(--cube-warning-subtle)", fg: "#7a5600" },
  };
  const t = toneMap[tone];
  return (
    <div className="cube-stat-card">
      <div className="cube-stat-card__icon" style={{ background: t.bg, color: t.fg }}>●</div>
      <div>
        <div className="cube-stat-card__value">{value}</div>
        <div className="cube-stat-card__label">{label}</div>
      </div>
    </div>
  );
}
