import { useRef, useState } from "react";
import { AlertTriangle, Upload, FileImage } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MEDIA_UPLOAD_WARNING } from "@/lib/media-copy";

export function MediaUpload({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const input = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const addFiles = (incoming: FileList | null) => {
    if (incoming) setFiles((current) => [...current, ...Array.from(incoming)]);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="cube-media-modal" aria-describedby="media-upload-warning">
        <div className="cube-media-modal__heading">
          <DialogTitle>Carica Media</DialogTitle>
          <DialogDescription className="sr-only">Media Manager di Cube</DialogDescription>
        </div>
        <div className="alert alert-warning cube-media-warning" role="note" id="media-upload-warning">
          <AlertTriangle size={20} aria-hidden="true" />
          <p>{MEDIA_UPLOAD_WARNING}</p>
        </div>
        <div className="cube-media-modal__scroll">
          <div className="cube-media-dropzone" onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); addFiles(event.dataTransfer.files); }}>
            <Upload size={28} aria-hidden="true" />
            <Button variant="outline" onClick={() => input.current?.click()}>Seleziona i file</Button>
            <span>oppure trascina i file qui</span>
            <input ref={input} type="file" multiple className="sr-only" aria-label="File da caricare" onChange={(event) => { addFiles(event.target.files); event.target.value = ""; }} />
          </div>
          {files.length > 0 && <ul className="cube-media-files" aria-label="File selezionati" aria-live="polite">
            {files.map((file, index) => <li key={`${file.name}-${index}`}><FileImage size={18} aria-hidden="true" /><span>{file.name}</span><small>{Math.ceil(file.size / 1024)} KB</small></li>)}
          </ul>}
        </div>
      </DialogContent>
    </Dialog>
  );
}