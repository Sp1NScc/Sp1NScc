import { useCallback, useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { projects } from "../data/content";
import { SectionHead } from "./SectionHead";
import { ProjectModal } from "./ProjectModal";
import GlitchText from "./GlitchText";
import gsap from "gsap";

export function Projects() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const navigate = useCallback((direction: -1 | 1) => {
    setOpenIndex((current) => {
      if (current === null) return current;
      return (current + direction + projects.length) % projects.length;
    });
  }, []);

  /* ProfileCard-style tilt + glare + holographic sheen */
  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reduced) return;

    const cleanups: Array<() => void> = [];

    document.querySelectorAll<HTMLElement>(".project").forEach((article) => {
      const frame = article.querySelector<HTMLElement>(".project__frame");
      if (!frame) return;

      gsap.set(frame, { transformPerspective: 1000, transformStyle: "preserve-3d" });
      const rotateX = gsap.quickTo(frame, "rotationX", { duration: 0.65, ease: "power3.out" });
      const rotateY = gsap.quickTo(frame, "rotationY", { duration: 0.65, ease: "power3.out" });

      const enter = () => frame.classList.add("is-tilting");
      const move = (event: PointerEvent) => {
        const rect = frame.getBoundingClientRect();
        if (event.clientY > rect.bottom + 8) return;

        const px = Math.min(Math.max((event.clientX - rect.left) / rect.width, 0), 1) - 0.5;
        const py = Math.min(Math.max((event.clientY - rect.top) / rect.height, 0), 1) - 0.5;

        rotateY(px * 10);
        rotateX(-py * 10);
        frame.style.setProperty("--gx", `${(px + 0.5) * 100}%`);
        frame.style.setProperty("--gy", `${(py + 0.5) * 100}%`);
        frame.style.setProperty("--holo-angle", `${180 + px * 70}deg`);
      };
      const leave = () => {
        frame.classList.remove("is-tilting");
        rotateX(0);
        rotateY(0);
        frame.style.setProperty("--gx", "50%");
        frame.style.setProperty("--gy", "50%");
        frame.style.setProperty("--holo-angle", "180deg");
      };

      article.addEventListener("pointerenter", enter);
      article.addEventListener("pointermove", move);
      article.addEventListener("pointerleave", leave);

      cleanups.push(() => {
        article.removeEventListener("pointerenter", enter);
        article.removeEventListener("pointermove", move);
        article.removeEventListener("pointerleave", leave);
        gsap.killTweensOf(frame);
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <section className="section projects" id="work" aria-labelledby="work-title">
      <div className="container">
        <SectionHead
          index="03"
          label="Selected Works / 精选项目"
          word="SELECTED WORKS"
          title={
            <span id="work-title">
              <GlitchText
                mode="slices"
                trigger="always"
                speed={1}
                intensity={0.5}
                burstDuration={0.6}
                offset={10}
                skew={0}
                flicker={false}
                fontWeight={900}
                enableShadows
                shadowColors={["#ff0000", "#00ffff"]}
                className="sec-head__glitch"
              >
                作品不多，
              </GlitchText>
              <br />
              <GlitchText
                mode="slices"
                trigger="always"
                speed={1}
                intensity={0.5}
                burstDuration={0.6}
                offset={10}
                skew={0}
                flicker={false}
                fontWeight={900}
                enableShadows
                shadowColors={["#ff0000", "#00ffff"]}
                className="sec-head__glitch"
              >
                但每一支都算数。
              </GlitchText>
            </span>
          }
          note="2024 — 2026 · 05 个项目"
        >
          <p className="sec-head__text">
            商业项目与个人创作混编。点击任意卡片，查看它在拍摄、结构与后期上的完整信息。
          </p>
        </SectionHead>

        <div className="projects__grid">
          {projects.map((project, i) => (
            <article
              className={`project project--${project.aspect}`}
              key={project.id}
              data-reveal
              style={{ "--d": `${i * 70}ms` } as CSSProperties}
            >
              <div className="project__frame">
                <img
                  src={project.image}
                  alt={`${project.title} — ${project.category}`}
                  loading="lazy"
                  width={2000}
                  height={project.aspect === "tall" ? 1500 : 1250}
                />
                <span className="project__index mono">{project.index}</span>
                {project.featured ? (
                  <span className="project__badge mono">Featured</span>
                ) : null}
                <span className="project__view" aria-hidden="true">
                  {project.gallery ? (
                    <span className="project__view-play">▦</span>
                  ) : project.video ? (
                    <span className="project__view-play">▶</span>
                  ) : (
                    <span className="project__view-arrow">↗</span>
                  )}
                  <span className="mono">
                    {project.gallery ? "Enter" : project.video ? "Play" : "View"}
                  </span>
                </span>

                {project.featured ? (
                  <div className="project__overlay">
                    <span className="project__overlay-meta mono">
                      {project.category} — {project.year}
                    </span>
                    {project.titleCard ? null : (
                      <h3 className="project__overlay-title">{project.title}</h3>
                    )}
                    <p className="project__overlay-text">{project.summary}</p>
                    <span className="project__overlay-role mono">{project.role}</span>
                  </div>
                ) : null}
              </div>

              <button
                type="button"
                className="project__hit"
                onClick={() => setOpenIndex(i)}
                aria-label={`查看项目：${project.title}`}
              />

              {!project.featured ? (
                <div className="project__caption">
                  <span className="project__cap-index mono">{project.index}</span>
                  <span className="project__cap-main">
                    <span className="project__cap-title">{project.title}</span>
                    <span className="project__cap-en mono">{project.english}</span>
                  </span>
                  <span className="project__cap-meta mono">
                    {project.category}
                    <span className="project__cap-year"> / {project.year}</span>
                  </span>
                  <span className="project__cap-arrow" aria-hidden="true">
                    ↗
                  </span>
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </div>

      <ProjectModal
        index={openIndex}
        onClose={close}
        onNavigate={navigate}
      />
    </section>
  );
}
