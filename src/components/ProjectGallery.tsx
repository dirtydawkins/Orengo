"use client";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent,
  type KeyboardEvent,
} from "react";
import {
  screenshotIndex,
  swipeDirection,
  type PortfolioProject,
} from "@/lib/projects";

export function ProjectGallery({
  project,
  priority = false,
  sizes = "(max-width: 760px) calc(100vw - 44px), 86vw",
}: {
  project: Pick<PortfolioProject, "id" | "title" | "url" | "images">;
  priority?: boolean;
  sizes?: string;
}) {
  const [index, setIndex] = useState(0);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [failed, setFailed] = useState<string[]>([]);
  const dialog = useRef<HTMLDialogElement>(null);
  const launcher = useRef<HTMLButtonElement>(null);
  const closeControl = useRef<HTMLButtonElement>(null);
  const gesture = useRef<{ x: number; y: number; pointer: number } | null>(
    null,
  );
  const suppressClick = useRef(false);
  const item = project.images[index];
  const first = project.images[0];
  const multiple = project.images.length > 1;
  const unavailable = !item || failed.includes(item.id);
  useEffect(() => {
    if (!viewerOpen || !dialog.current) return;
    const element = dialog.current;
    const returnTo = launcher.current;
    const previousOverflow = document.body.style.overflow;
    element.showModal();
    document.body.style.overflow = "hidden";
    closeControl.current?.focus();
    return () => {
      if (element.open) element.close();
      document.body.style.overflow = previousOverflow;
      if (returnTo?.isConnected) returnTo.focus({ preventScroll: true });
    };
  }, [viewerOpen]);
  function next(delta: number) {
    setIndex((current) =>
      screenshotIndex(current, delta, project.images.length),
    );
  }
  function keys(event: KeyboardEvent) {
    if (!multiple || (event.key !== "ArrowRight" && event.key !== "ArrowLeft"))
      return;
    event.preventDefault();
    event.stopPropagation();
    next(event.key === "ArrowRight" ? 1 : -1);
  }
  function start(event: PointerEvent) {
    suppressClick.current = false;
    gesture.current =
      event.pointerType === "mouse"
        ? null
        : { x: event.clientX, y: event.clientY, pointer: event.pointerId };
  }
  function end(event: PointerEvent) {
    const origin = gesture.current;
    gesture.current = null;
    if (!origin || origin.pointer !== event.pointerId || !multiple) return;
    const direction = swipeDirection(
      event.clientX - origin.x,
      event.clientY - origin.y,
    );
    if (direction) {
      suppressClick.current = true;
      next(direction);
    }
  }
  function failure() {
    if (item)
      setFailed((current) =>
        current.includes(item.id) ? current : [...current, item.id],
      );
  }
  const fallback = (
    <div className="project-preview-unavailable">
      <p>Screenshot unavailable.</p>
      <a
        className="under-link"
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        Visit the live website ↗
      </a>
    </div>
  );
  const counter = item
    ? `${String(index + 1).padStart(2, "0")} / ${String(project.images.length).padStart(2, "0")} · ${item.caption}`
    : "Preview unavailable";
  return (
    <div
      className="project-gallery"
      role="region"
      aria-label={`${project.title} screenshot gallery`}
    >
      <div
        className="project-preview-frame"
        style={
          {
            "--preview-ratio": first
              ? `${first.width} / ${first.height}`
              : "16 / 10",
            "--mobile-preview-ratio": first?.mobile
              ? `${first.mobile.width} / ${first.mobile.height}`
              : first
                ? `${first.width} / ${first.height}`
                : "16 / 10",
          } as CSSProperties
        }
        onPointerDown={start}
        onPointerUp={end}
        onPointerCancel={() => {
          gesture.current = null;
          suppressClick.current = false;
        }}
      >
        {unavailable ? (
          fallback
        ) : (
          <button
            ref={launcher}
            type="button"
            className="project-preview-open"
            aria-label={`Enlarge ${project.title} screenshot ${index + 1}: ${item.caption}`}
            aria-haspopup="dialog"
            onKeyDown={keys}
            onClick={(event) => {
              if (suppressClick.current && event.detail !== 0) {
                event.preventDefault();
                suppressClick.current = false;
                return;
              }
              setViewerOpen(true);
            }}
          >
            <picture key={item.id}>
              {item.mobile ? (
                <source
                  media="(max-width: 760px)"
                  type={item.mobile.webp ? "image/webp" : undefined}
                  srcSet={item.mobile.webp ?? item.mobile.src}
                  width={item.mobile.width}
                  height={item.mobile.height}
                />
              ) : null}
              {item.mobile?.webp ? (
                <source
                  media="(max-width: 760px)"
                  srcSet={item.mobile.src}
                  width={item.mobile.width}
                  height={item.mobile.height}
                />
              ) : null}
              {item.sources?.length ? (
                <source
                  type="image/webp"
                  srcSet={item.sources
                    .map((source) => `${source.src} ${source.width}w`)
                    .join(", ")}
                  sizes={sizes}
                />
              ) : null}
              <img
                src={item.src}
                alt={item.alt}
                width={item.width}
                height={item.height}
                loading={priority && index === 0 ? "eager" : "lazy"}
                decoding="async"
                onError={failure}
              />
            </picture>
            <span className="project-expand">
              Full screen <span aria-hidden="true">↗</span>
            </span>
          </button>
        )}
      </div>
      <div className="project-gallery-caption">
        <p className="mono" aria-live="polite" aria-atomic="true">
          {counter}
        </p>
        {multiple ? (
          <div className="arrow-controls">
            <button
              type="button"
              onClick={() => next(-1)}
              aria-label="Previous project screenshot"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => next(1)}
              aria-label="Next project screenshot"
            >
              →
            </button>
          </div>
        ) : null}
      </div>
      <dialog
        className="project-lightbox"
        ref={dialog}
        aria-label={`${project.title} screenshot viewer`}
        onCancel={(event) => {
          event.preventDefault();
          setViewerOpen(false);
        }}
        onClose={() => {
          if (!dialog.current?.open) setViewerOpen(false);
        }}
        onKeyDown={keys}
      >
        {viewerOpen ? (
          <>
            <div className="project-viewer-top">
              <p className="mono">
                {project.title} / {item?.caption ?? "Preview unavailable"}
              </p>
              <button
                ref={closeControl}
                type="button"
                className="text-button"
                onClick={() => setViewerOpen(false)}
              >
                Close ×
              </button>
            </div>
            <div
              className="project-lightbox-canvas"
              onPointerDown={start}
              onPointerUp={end}
              onPointerCancel={() => {
                gesture.current = null;
              }}
            >
              {unavailable ? (
                fallback
              ) : (
                <picture key={item.id}>
                  {item.mobile ? (
                    <source
                      media="(max-width: 760px)"
                      srcSet={item.mobile.src}
                      width={item.mobile.width}
                      height={item.mobile.height}
                    />
                  ) : null}
                  <img
                    src={item.src}
                    alt={item.alt}
                    width={item.width}
                    height={item.height}
                    onError={failure}
                  />
                </picture>
              )}
            </div>
            <div className="project-viewer-bottom">
              <p className="mono" aria-live="polite" aria-atomic="true">
                {counter}
              </p>
              {multiple ? (
                <div className="arrow-controls">
                  <button
                    type="button"
                    onClick={() => next(-1)}
                    aria-label="Previous fullscreen screenshot"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={() => next(1)}
                    aria-label="Next fullscreen screenshot"
                  >
                    →
                  </button>
                </div>
              ) : null}
            </div>
          </>
        ) : null}
      </dialog>
    </div>
  );
}
