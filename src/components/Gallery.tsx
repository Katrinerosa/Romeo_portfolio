"use client";

import { useState } from "react";
import Image from "next/image";
import { Dialog } from "@base-ui/react/dialog";
import { ArrowLeft, ArrowRight, ArrowUpRight, Expand, X } from "lucide-react";
import { galleryPhotos } from "@/data/gallery";
import "./Gallery.css";

export default function Gallery() {
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [triggerId, setTriggerId] = useState<string | null>(null);
  const selected = galleryPhotos[selectedIndex];

  function movePhoto(direction: number) {
    setSelectedIndex(current => (current + direction + galleryPhotos.length) % galleryPhotos.length);
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen} triggerId={triggerId}>
      <div className="gallery-intro">
        <span>{galleryPhotos.length} photographs</span>
        <span>Click a frame to explore <ArrowUpRight size={14} aria-hidden="true" /></span>
      </div>
      <ul className="gallery-grid" aria-label="Photography gallery">
        {galleryPhotos.map((photo, index) => (
          <li className="gallery-item" key={photo.id}>
            <Dialog.Trigger
              id={`gallery-${photo.id}`}
              className="gallery-trigger"
              aria-label={`View ${photo.title}`}
              onClick={() => {
                setSelectedIndex(index);
                setTriggerId(`gallery-${photo.id}`);
              }}
            >
              <span className="gallery-image-wrap">
                <Image
                  src={photo.image}
                  alt={photo.description}
                  className="gallery-image"
                  placeholder={photo.image.blurDataURL ? "blur" : "empty"}
                  sizes="(max-width: 560px) calc(100vw - 40px), (max-width: 900px) 45vw, 380px"
                />
                <span className="gallery-expand" aria-hidden="true"><Expand size={18} /></span>
              </span>
              <span className="gallery-caption">
                <span className="gallery-title">{photo.title}</span>
                <span className="gallery-category">{photo.category}</span>
              </span>
            </Dialog.Trigger>
          </li>
        ))}
      </ul>

      <Dialog.Portal>
        <Dialog.Backdrop className="gallery-backdrop" />
        <Dialog.Viewport className="gallery-viewport">
          <Dialog.Popup
            className="gallery-lightbox"
            onKeyDown={event => {
              if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
                event.preventDefault();
                movePhoto(event.key === "ArrowLeft" ? -1 : 1);
              }
            }}
          >
            <div className="gallery-lightbox-toolbar">
              <span className="gallery-lightbox-counter" aria-live="polite" aria-atomic="true">
                {String(selectedIndex + 1).padStart(2, "0")} / {String(galleryPhotos.length).padStart(2, "0")}
              </span>
              <span className="gallery-lightbox-credit">Photography by Romeo Nordstrøm</span>
              <Dialog.Close className="gallery-icon-button" aria-label="Close photograph">
                <X size={22} aria-hidden="true" />
              </Dialog.Close>
            </div>
            <div className="gallery-lightbox-stage">
              <Image
                key={selected.id}
                src={selected.image}
                alt={selected.description}
                fill
                sizes="(max-width: 900px) 95vw, (max-width: 1500px) 75vw, 1100px"
                className="gallery-lightbox-image"
                placeholder={selected.image.blurDataURL ? "blur" : "empty"}
                loading="eager"
              />
              <button className="gallery-icon-button gallery-previous" type="button" aria-label="Previous photograph" onClick={() => movePhoto(-1)}>
                <ArrowLeft size={22} aria-hidden="true" />
              </button>
              <button className="gallery-icon-button gallery-next" type="button" aria-label="Next photograph" onClick={() => movePhoto(1)}>
                <ArrowRight size={22} aria-hidden="true" />
              </button>
            </div>
            <aside className="gallery-lightbox-info">
              <p className="gallery-lightbox-category">{selected.category}</p>
              <Dialog.Title className="gallery-lightbox-title">{selected.title}</Dialog.Title>
              <Dialog.Description className="gallery-lightbox-description">{selected.description}</Dialog.Description>
              <dl className="gallery-details">
                <div><dt>Photographer</dt><dd>Romeo Nordstrøm</dd></div>
                <div><dt>Resolution</dt><dd>{selected.image.width} × {selected.image.height} px</dd></div>
                <div><dt>Format</dt><dd>{Math.abs(selected.image.width / selected.image.height - 1) < 0.05 ? "Square" : selected.image.width > selected.image.height ? "Landscape" : "Portrait"}</dd></div>
              </dl>
              <a className="gallery-original" href={selected.image.src} target="_blank" rel="noreferrer">
                Open full size <ArrowUpRight size={17} aria-hidden="true" />
              </a>
              <p className="gallery-keyboard-hint">← → Browse &nbsp; · &nbsp; Esc Close</p>
            </aside>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
