import { useEffect, useRef, useState } from "react";

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

  /* defer the 12MB hero clip until the opening overlay has painted */
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setTimeout(() => setVideoSrc("/video/hero-render.mp4"), 1000);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    if (!videoSrc) return;
    const video = videoRef.current;
    if (!video) return;
    video.load();
    const attempt = video.play();
    if (attempt) attempt.catch(() => {});
  }, [videoSrc]);

  /* pause the footage while the hero is off screen */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.12 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="hero" id="home" aria-label="首页">
      <div className="hero__bg" aria-hidden="true">
        <video
          ref={videoRef}
          className="hero__video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/hero-render-poster.webp"
          tabIndex={-1}
        >
          {videoSrc ? <source src={videoSrc} type="video/mp4" /> : null}
        </video>
        <span className="hero__glow" />
      </div>
      <span className="hero__sheen" aria-hidden="true" />

      <div className="hero__inner container">
        <div className="hero__main">
          <div className="hero__copy">
            <span className="hero__badge">
              <span className="hero__badge-tag">2026</span>
              <span className="hero__badge-text">作品集 · 求职中</span>
            </span>

            <h1 className="hero__title">
              <span className="hero__line">
                <span>让每一帧，</span>
              </span>
              <span className="hero__line">
                <span>都有它的理由。</span>
              </span>
            </h1>

            <p className="hero__desc">
              摄影师 / 剪辑师 贾蕙铭，西安。商业短片、人像与现场记录，从脚本、拍摄到剪辑调色，独立完成整条链路。
            </p>

            <ul className="hero__genres mono" aria-label="服务类型">
              <li>Commercial</li>
              <li>Portrait</li>
              <li>Live</li>
              <li>Aerial</li>
            </ul>
          </div>

          <nav className="hero__quick" aria-label="快速入口">
            <a className="quick is-active" href="#work">
              <span>作品</span>
              <em className="mono">05</em>
            </a>
            <a className="quick" href="#capabilities">
              <span>优势</span>
              <em className="mono">06</em>
            </a>
            <a className="quick" href="#contact">
              <span>联系</span>
              <em className="mono">↗</em>
            </a>
          </nav>
        </div>

        <div className="hero__foot">
          <span className="mono">Showreel — 2024 / 2026</span>
          <span className="mono hero__foot-mid">34.26°N / 108.94°E — 西安</span>
          <span className="mono hero__foot-scroll">
            Scroll to explore
            <span aria-hidden="true">↓</span>
          </span>
        </div>
      </div>
    </section>
  );
}
