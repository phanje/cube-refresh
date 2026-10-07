import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Upload, Images } from "lucide-react";
import { Shell, PageHeader } from "@/components/cube/Shell";
import { Button } from "@/components/ui/button";
import { MediaUpload } from "@/components/cube/MediaUpload";

export const Route = createFileRoute("/prototype/media")({
  head: () => ({ meta: [
    { title: "Media Manager — Cube CMS" },
    { name: "description", content: "Gestione e caricamento dei media del sito in Cube CMS." },
    { property: "og:title", content: "Media Manager — Cube CMS" },
    { property: "og:description", content: "Gestione e caricamento dei media del sito in Cube CMS." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: MediaManager,
});

function MediaManager() {
  const [open, setOpen] = useState(false);
  return <Shell crumbs={[{ label: "Bacheca", to: "/prototype/dashboard" }, { label: "Media" }]}>
    <div className="cube-content">
      <PageHeader title="Media Manager" actions={<Button onClick={() => setOpen(true)}><Upload /> Carica Media</Button>} />
      <div className="cube-empty">
        <div className="cube-empty__icon"><Images size={24} /></div>
        <p className="cube-empty__title">Nessun media selezionato</p>
      </div>
    </div>
    <MediaUpload open={open} onOpenChange={setOpen} />
  </Shell>;
}