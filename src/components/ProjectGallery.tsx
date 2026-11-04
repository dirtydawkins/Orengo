"use client";
import { useRef, useState } from "react";
import { project } from "@/data/portfolio";
export function ProjectGallery() {
  const [index, setIndex] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const touch = useRef(0);
  const item = project.images[index];
  function next(delta: number) {
    setIndex(
      (i) => (i + delta + project.images.length) % project.images.length,
    );
  }
  function close() {
    dialog.current?.close();
    document.body.style.overflow = "";
  }
  const image = (
    <img
      src={item.src}
      alt={item.alt}
      width={1440}
      height={900}
      loading="lazy"
    />
  );
  return (
    <div className="gallery">
      <div
        className="gallery-frame"
        onTouchStart={(e) => {
          touch.current = e.changedTouches[0].clientX;
        }}
        onTouchEnd={(e) => {
          const dx = e.changedTouches[0].clientX - touch.current;
          if (Math.abs(dx) > 65) next(dx < 0 ? 1 : -1);
        }}
      >
        <button
          className="gallery-open"
          onClick={() => {
            dialog.current?.showModal();
            document.body.style.overflow = "hidden";
          }}
          aria-label={`Enlarge LOCKD screenshot ${index + 1}`}
        >
          {image}
          <span>View full screen ↗</span>
        </button>
      </div>
      <div className="gallery-caption">
        <p className="mono" aria-live="polite">
          {item.caption}
        </p>
        <div className="arrow-controls">
          <button
            onClick={() => next(-1)}
            aria-label="Previous project screenshot"
          >
            ←
          </button>
          <button onClick={() => next(1)} aria-label="Next project screenshot">
            →
          </button>
        </div>
      </div>
      <dialog
        className="gallery-dialog"
        ref={dialog}
        onCancel={close}
        onClose={() => {
          document.body.style.overflow = "";
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") next(1);
          if (e.key === "ArrowLeft") next(-1);
        }}
        aria-label="LOCKD screenshot viewer"
      >
        <div className="viewer-top">
          <span className="mono">{item.caption}</span>
          <button className="text-button" onClick={close}>
            Close ×
          </button>
        </div>
        <img src={item.src} alt={item.alt} width={1440} height={900} />
        <div className="viewer-bottom">
          <span className="mono">Arrow keys to browse · Escape to close</span>
          <div className="arrow-controls">
            <button
              onClick={() => next(-1)}
              aria-label="Previous fullscreen screenshot"
            >
              ←
            </button>
            <button
              onClick={() => next(1)}
              aria-label="Next fullscreen screenshot"
            >
              →
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
