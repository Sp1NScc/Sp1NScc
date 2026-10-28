import { lazy, Suspense, useEffect, useLayoutEffect, useState } from "react";
import { SiteHeader } from "./components/SiteHeader";
import { ScrollProgress } from "./components/ScrollProgress";
import { Hero } from "./components/Hero";
import { Marquee } from "./components/Marquee";
import { About } from "./components/About";
import { Projects } from "./components/Projects";
import { Strengths } from "./components/Strengths";
import { Contact } from "./components/Contact";
import { useActiveSection, useFloatingNav } from "./hooks/useSite";
import { initSiteMotion } from "./motion/siteMotion";

import "./styles/header.css";
import "./styles/hero.css";
import "./styles/sections.css";
import "./styles/projects.css";
import "./styles/sections2.css";
import "./styles/motion.css";

const SECTION_IDS = ["home", "about", "work", "capabilities", "contact"];
const GhostFibers = lazy(() => import("./components/GhostFibers"));

export default function App() {
  const floating = useFloatingNav(0.92);
  const active = useActiveSection(SECTION_IDS);
  const [fibersMounted, setFibersMounted] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);
  const [locked, setLocked] = useState(false);
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useLayoutEffect(() => initSiteMotion(), []);

  /* initialize the canvas after the opening has settled, so scrolling stays smooth */
  useEffect(() => {
    if (reducedMotion || fibersMounted) return;
    const id = window.setTimeout(() => setFibersMounted(true), 3500);
    return () => window.clearTimeout(id);
  }, [reducedMotion, fibersMounted]);

  /* mount WebGL only once the visitor starts scrolling past the hero */
  useEffect(() => {
    if (reducedMotion) return;
    if (window.scrollY > 60) {
      setFibersMounted(true);
      return;
    }

    const onScroll = () => {
      if (window.scrollY > 60) {
        setFibersMounted(true);
        window.removeEventListener("scroll", onScroll);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [reducedMotion]);

  /* the closing section has its own background — pause the canvas behind it */
  useEffect(() => {
    const contact = document.querySelector("#contact");
    if (!contact) return;
    const observer = new IntersectionObserver(
      ([entry]) => setContactVisible(entry.isIntersecting),
      { threshold: 0.01 },
    );
    observer.observe(contact);
    return () => observer.disconnect();
  }, []);

  /* project modal adds body.is-locked — pause WebGL while it is open */
  useEffect(() => {
    const update = () => setLocked(document.body.classList.contains("is-locked"));
    const observer = new MutationObserver(update);
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    update();
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="intro" aria-hidden="true">
        <div className="intro__inner">
          <span className="intro__mark mono">JIA HUIMING — PORTFOLIO</span>
          <span className="intro__name">贾蕙铭</span>
          <span className="intro__meta mono">Photographer / Editor · 2026</span>
          <span className="intro__line" aria-hidden="true" />
        </div>
      </div>

      <ScrollProgress />
      <SiteHeader floating={floating} active={active} />

      <main className="site-main">
        {fibersMounted ? (
          <div className="page-bg" aria-hidden="true">
            <Suspense fallback={null}>
              <GhostFibers
            glowColor="#ff3b2f"
            lineColor="#ffd2c7"
            secondaryColor="#5e0b06"
            gradient="across"
            layers={3}
            waves={1.05}
            twist={1.35}
            volume={0.7}
            spread={1.5}
            scale={1.5}
            rotation={18}
            perspective={0.32}
            threads={80}
            density={1}
            thickness={1.35}
            fiberStyle="lines"
            tips={0.5}
            foldGlow={1.4}
            speed={0.18}
            flow={0.3}
            rollSpeed={-0.16}
            depthOfField={0.9}
            focusDepth={0.12}
            particles={0.3}
            sparkle={0.45}
            glow={1.4}
            brightness={2.4}
            vignette={0.45}
            grain={0.05}
            mouseInteraction={false}
            hoverEffect="none"
            intro
                paused={!floating || contactVisible || locked}
                dpr={Math.min(window.devicePixelRatio || 1, 1.5)}
              />
            </Suspense>
          </div>
        ) : null}

        <Hero />
        <Marquee />
        <About />
        <Projects />
        <Strengths />
        <Contact />
      </main>

      <div className="grain" aria-hidden="true" />
    </>
  );
}
