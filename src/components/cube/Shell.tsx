import { Link, useRouterState } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import {
  LayoutDashboard,
  FileText,
  Pin,
  Image,
  Newspaper,
  Star,
  LayoutGrid,
  Images,
  Palette,
  Settings,
  FileCode2,
  Sparkles,
  ChevronRight,
  Menu,
  Search,
  Bell,
  Globe,
} from "lucide-react";

const CUBE_LOGO = "https://cube.blastness.site/assets/images/logo_interno.png";

type NavItem = { to: string; label: string; icon: typeof LayoutDashboard; expandable?: boolean };

const NAV: NavItem[] = [
  { to: "/prototype/dashboard", label: "Bacheca", icon: LayoutDashboard },
  { to: "/prototype/pages", label: "Pagine", icon: FileText, expandable: true },
  { to: "/prototype/articles", label: "Articoli", icon: Pin, expandable: true },
  { to: "/prototype/gallery", label: "Gallery", icon: Image, expandable: true },
  { to: "/prototype/pressroom", label: "Pressroom", icon: Newspaper, expandable: true },
  { to: "/prototype/reviews", label: "Recensioni", icon: Star },
  { to: "/prototype/elements", label: "Elementi", icon: LayoutGrid, expandable: true },
  { to: "/prototype/media", label: "Media", icon: Images, expandable: true },
  { to: "/prototype/settings", label: "Aspetto", icon: Palette, expandable: true },
  { to: "/prototype/site-settings", label: "Impostazioni sito", icon: Settings },
  { to: "/prototype/htaccess", label: "htaccess", icon: FileCode2 },
];

export type Crumb = { label: string; to?: string };

export function Shell({
  crumbs = [],
  children,
}: {
  crumbs?: Crumb[];
  children: ReactNode;
}) {
  const [compact, setCompact] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className={`cube-shell${compact ? " is-compact" : ""}`}>
      <aside className={`cube-sidebar${compact ? " is-compact" : ""}`}>
        <div className="cube-sidebar__brand">
          <img src={CUBE_LOGO} alt="Cube" />
        </div>
        <nav className="cube-sidebar__nav">
          {!compact && <div className="cube-sidebar__group-label">Gestione</div>}
          {NAV.map((item) => {
            const isActive = pathname === item.to || pathname.startsWith(item.to + "/");
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`cube-nav-item${isActive ? " is-active" : ""}`}
              >
                <Icon size={17} />
                <span>{item.label}</span>
                {item.expandable && <ChevronRight size={14} className="cube-nav-item__chevron" />}
              </Link>
            );
          })}
          <div className="cube-sidebar__group-label" style={{ marginTop: 12 }}>
            {!compact && "Sistema"}
          </div>
          <Link
            to="/prototype/design-system"
            className={`cube-nav-item${pathname === "/prototype/design-system" ? " is-active" : ""}`}
          >
            <Sparkles size={17} />
            <span>Design System</span>
          </Link>
        </nav>
        <div className="cube-sidebar__footer">© Blastcube v. 2.6 · 2026</div>
      </aside>

      <div className="cube-main">
        <header className="cube-header">
          <button
            className="cube-header__toggle"
            onClick={() => setCompact((c) => !c)}
            aria-label="Toggle sidebar"
            type="button"
          >
            <Menu size={18} />
          </button>
          <nav className="cube-breadcrumb" aria-label="breadcrumb">
            {crumbs.length === 0 ? (
              <span className="cube-breadcrumb__item is-current">Cube</span>
            ) : (
              crumbs.map((c, i) => (
                <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                  {i > 0 && <span className="cube-breadcrumb__sep">/</span>}
                  {c.to && i < crumbs.length - 1 ? (
                    <Link to={c.to} className="cube-breadcrumb__item">
                      {c.label}
                    </Link>
                  ) : (
                    <span
                      className={`cube-breadcrumb__item${i === crumbs.length - 1 ? " is-current" : ""}`}
                    >
                      {c.label}
                    </span>
                  )}
                </span>
              ))
            )}
          </nav>
          <div className="cube-header__spacer" />
          <button type="button" className="cube-site-picker">
            <span className="cube-site-picker__dot" />
            <Globe size={13} />
            Hotel Cosmopolitan 2026
          </button>
          <button type="button" className="cube-icon-btn" aria-label="Cerca">
            <Search size={16} />
          </button>
          <button type="button" className="cube-icon-btn" aria-label="Notifiche">
            <Bell size={16} />
            <span className="cube-icon-btn__dot" />
          </button>
          <button type="button" className="cube-avatar" aria-label="Profilo">
            SD
          </button>
        </header>
        {children}
      </div>
    </div>
  );
}

export function PageHeader({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="cube-page-header">
      <div>
        <h1 className="cube-page-title">{title}</h1>
        {subtitle && <p className="cube-page-subtitle">{subtitle}</p>}
      </div>
      {actions && <div className="cube-page-header__actions">{actions}</div>}
    </div>
  );
}
