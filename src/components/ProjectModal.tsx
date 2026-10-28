import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { projects, type Project } from "../data/content";

type Props = {
  index: number | null;
  onClose: () => void;
  onNavigate: (direction: -1 | 1) => void;
};

export function ProjectModal({ index, onClose, onNavigate }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const isOpen = index !== null;

  useEffect(() => {
    if (!isOpen) return;

    const previous = document.activeElement as HTMLElement | null;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.classList.add("is-locked");
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;
    panelRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      /* don't hijack arrow keys while scrubbing the film */
      const target = event.target as HTMLElement | null;
      if (target?.closest("video, input, textarea, select")) return;
      if (event.key === "ArrowRight") onNavigate(1);
      if (event.key === "ArrowLeft") onNavigate(-1);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("is-locked");
      document.body.style.paddingRight = "";
      previous?.focus?.();
    };
  }, [isOpen, onClose, onNavigate]);

  if (index === null) return null;
  const project = projects[index];
  const hasVideo = Boolean(project.video);

  if (project.gallery?.length) {
    return createPortal(
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="project-modal-title">
        <div className="modal__backdrop" onClick={onClose} aria-hidden="true" />

        <div className="modal__panel modal__panel--gallery" ref={panelRef} tabIndex={-1}>
          <button type="button" className="modal__close" onClick={onClose} aria-label="关闭展厅">
            <span aria-hidden="true">✕</span>
          </button>
          <GalleryView project={project} />
        </div>

        <p className="modal__hint mono" aria-hidden="true">
          Esc 关闭 &nbsp;·&nbsp; 点击展项切换
        </p>
      </div>,
      document.body,
    );
  }

  return createPortal(
    <div className="modal" role="dialog" aria-modal="true" aria-labelledby="project-modal-title">
      <div className="modal__backdrop" onClick={onClose} aria-hidden="true" />

      <div
        className={`modal__panel${hasVideo ? " modal__panel--film" : ""}`}
        ref={panelRef}
        tabIndex={-1}
      >
        <button type="button" className="modal__close" onClick={onClose} aria-label="关闭项目详情">
          <span aria-hidden="true">✕</span>
        </button>

        <div className={`modal__media${hasVideo ? " modal__media--film" : ""}`}>
          {hasVideo ? (
            <>
              <img className="modal__backdrop" src={project.videoPoster} alt="" aria-hidden="true" />
              <div className="modal__player" key={project.id}>
                <video
                  controls
                  playsInline
                  preload="metadata"
                  poster={project.videoPoster}
                  aria-label={`${project.title} 完整影片`}
                >
                  <source src={project.video} type="video/mp4" />
                </video>
                <div className="modal__player-bar">
                  <span className="mono">{project.videoTitle ?? project.title}</span>
                  <span className="mono">{project.videoMeta}</span>
                </div>
              </div>
            </>
          ) : (
            <img src={project.image} alt={`${project.title} — ${project.category}`} />
          )}
          <span className="modal__media-label mono">
            {project.category} / {project.year}
          </span>
        </div>

        <div className="modal__content">
          <span className="modal__eyebrow mono">
            Project {project.index} <span className="modal__eyebrow-dim">/ 0{projects.length}</span>
          </span>

          <h3 className="modal__title" id="project-modal-title">
            {project.title}
            <span className="modal__title-en serif">{project.english}</span>
          </h3>

          <p className="modal__summary">{project.summary}</p>

          <dl className="modal__meta">
            {project.meta.map((item) => (
              <div className="modal__meta-item" key={item.label}>
                <dt className="mono">{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>

          <p className="modal__desc">{project.description}</p>

          <ul className="modal__list">
            {project.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>

          <div className="modal__foot">
            <button type="button" className="modal__nav" onClick={() => onNavigate(-1)}>
              <span aria-hidden="true">←</span> 上一个
            </button>
            <span className="modal__foot-role mono">{project.role}</span>
            <button type="button" className="modal__nav" onClick={() => onNavigate(1)}>
              下一个 <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </div>

      <p className="modal__hint mono" aria-hidden="true">
        Esc 关闭 &nbsp;·&nbsp; ← → 切换项目
      </p>
    </div>,
    document.body,
  );
}


function GalleryView({ project }: { project: Project }) {
  const items = project.gallery ?? [];
  const [active, setActive] = useState(0);
  const item = items[active] ?? items[0];
  if (!item) return null;

  return (
    <div className="gallery">
      <header className="gallery__head">
        <div>
          <span className="gallery__eyebrow mono">Exhibition / {project.index}</span>
          <h3 className="gallery__title" id="project-modal-title">
            {project.title}
            <span className="gallery__title-en serif">{project.english}</span>
          </h3>
        </div>
        <span className="gallery__count mono">
          {project.index} / 0{projects.length}
        </span>
      </header>

      <div className="gallery__stage">
        {item.src ? (
          <video
            key={item.src}
            controls
            playsInline
            preload="metadata"
            poster={item.poster}
            aria-label={`${item.title} 影片`}
          >
            <source src={item.src} type="video/mp4" />
          </video>
        ) : (
          <div className="gallery__external">
            <img src={item.poster} alt="" aria-hidden="true" />
            <div className="gallery__external-overlay">
              <span className="mono">External exhibit / 外部展项</span>
              <a href={item.external} target="_blank" rel="noreferrer">
                {item.externalLabel ?? "在新窗口观看"} <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        )}
      </div>

      <div className="gallery__rail" aria-label="展项">
        {items.map((it, i) => (
          <button
            type="button"
            key={it.title}
            className={`gallery__item${i === active ? " is-active" : ""}`}
            onClick={() => setActive(i)}
            aria-pressed={i === active}
            aria-label={`查看展项：${it.title}`}
          >
            <span className="gallery__thumb">
              <img src={it.poster} alt="" loading="lazy" />
              <span className="gallery__mark mono" aria-hidden="true">
                {it.src ? "▶" : "↗"}
              </span>
            </span>
            <span className="gallery__item-title">{it.title}</span>
            <span className="gallery__item-meta mono">{it.meta}</span>
          </button>
        ))}
      </div>

      <footer className="gallery__foot mono">
        <span>Selected works — 2025 / 2026</span>
        <span>
          {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
        </span>
      </footer>
    </div>
  );
}
