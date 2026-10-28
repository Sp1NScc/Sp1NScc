import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EASE = "expo.out";

type RevealOptions = {
  y?: number;
  stagger?: number;
  start?: string;
  clip?: boolean;
};

function revealGroup(triggerSelector: string, itemSelector: string, options: RevealOptions = {}) {
  const trigger = document.querySelector(triggerSelector);
  if (!trigger) return;

  const items = gsap.utils.toArray<HTMLElement>(itemSelector, trigger);
  if (!items.length) return;

  const { y = 48, stagger = 0.08, start = "top 84%", clip = false } = options;
  const from: gsap.TweenVars = { autoAlpha: 0, y };
  const to: gsap.TweenVars = {
    autoAlpha: 1,
    y: 0,
    duration: 1.3,
    ease: EASE,
    stagger,
    scrollTrigger: { trigger, start, once: true },
  };

  if (clip) {
    from.clipPath = "inset(0% 0% 100% 0%)";
    to.clipPath = "inset(0% 0% 0% 0%)";
    to.onComplete = () => gsap.set(items, { clipPath: "none" });
  }

  gsap.set(items, from);
  gsap.to(items, to);
}

function opening(isMobile: boolean) {
  const intro = document.querySelector<HTMLElement>(".intro");
  const introInner = document.querySelector<HTMLElement>(".intro__inner");
  const introLine = document.querySelector<HTMLElement>(".intro__line");
  const heroLines = gsap.utils.toArray<HTMLElement>(".hero__line > span");

  gsap.set(".site-header", { autoAlpha: 0, y: -24 });
  gsap.set(".hero__bg", { scale: isMobile ? 1.1 : 1.18 });
  gsap.set(heroLines, { yPercent: 125, rotate: 2.6, scaleY: 1.12 });
  gsap.set(".hero__title", { scaleX: 1.09, transformOrigin: "left center" });
  gsap.set(
    [".hero__badge", ".hero__desc", ".hero__genres", ".hero__quick", ".hero__foot"],
    { autoAlpha: 0, y: 26 },
  );
  gsap.set(".hero__sheen", { autoAlpha: 0 });

  if (introInner) gsap.set(introInner, { autoAlpha: 0, y: 26 });
  if (introLine) gsap.set(introLine, { scaleX: 0, transformOrigin: "left center" });

  const tl = gsap.timeline({ defaults: { ease: EASE } });

  if (introInner) tl.to(introInner, { autoAlpha: 1, y: 0, duration: 1, ease: EASE }, 0.1);
  if (introLine) tl.to(introLine, { scaleX: 1, duration: 1.2, ease: "expo.inOut" }, 0.45);
  if (intro) {
    tl.to(intro, { clipPath: "inset(0% 0% 100% 0%)", duration: 1.25, ease: "expo.inOut" }, 1.15);
    tl.set(intro, { display: "none" });
  }

  tl.to(".site-header", { autoAlpha: 1, y: 0, duration: 1.1 }, 1.35)
    .to(".hero__bg", { scale: 1, duration: 2.6, ease: "expo.out" }, 1.25)
    .to(
      heroLines,
      { yPercent: 0, rotate: 0, scaleY: 1, duration: 1.8, stagger: 0.13, ease: "expo.out" },
      1.4,
    )
    .to(".hero__title", { scaleX: 1, duration: 2.1, ease: "expo.out" }, 1.4)
    .to(".hero__badge", { autoAlpha: 1, y: 0, duration: 1.1 }, 1.65)
    .to(".hero__desc", { autoAlpha: 1, y: 0, duration: 1.1 }, 1.8)
    .to(".hero__genres", { autoAlpha: 1, y: 0, duration: 1 }, 1.95)
    .to(".hero__quick", { autoAlpha: 1, y: 0, duration: 1.1 }, 1.9)
    .to(".hero__foot", { autoAlpha: 1, y: 0, duration: 1 }, 2.05)
    .to(".hero__sheen", { autoAlpha: 1, duration: 1.6 }, 1.8);
}

function heroScroll() {
  gsap.to(".hero__inner", {
    yPercent: 10,
    autoAlpha: 0.22,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });

  gsap.to(".hero__bg", {
    yPercent: 6,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });
}

function sectionHeads() {
  document.querySelectorAll<HTMLElement>(".sec-head").forEach((head) => {
    const section = head.closest("section");
    if (!section) return;

    const ghost = head.querySelector<HTMLElement>(".sec-head__ghost");
    const title = head.querySelector<HTMLElement>(".sec-head__title");
    const meta = head.querySelector<HTMLElement>(".sec-head__meta");
    const aside = head.querySelector<HTMLElement>(".sec-head__aside");

    if (ghost) gsap.set(ghost, { autoAlpha: 0, xPercent: -10, clipPath: "inset(0% 100% 0% 0%)" });
    if (title) gsap.set(title, { autoAlpha: 0, yPercent: 58, clipPath: "inset(0% 0% 100% 0%)" });
    if (meta) gsap.set(meta, { autoAlpha: 0, y: 18 });
    if (aside) gsap.set(aside, { autoAlpha: 0, y: 30 });

    const tl = gsap.timeline({
      defaults: { ease: EASE },
      scrollTrigger: { trigger: section, start: "top 76%", once: true },
    });

    if (ghost) {
      tl.to(ghost, { autoAlpha: 1, xPercent: 0, clipPath: "inset(0% 0% 0% 0%)", duration: 1.6 }, 0);
    }
    if (title) {
      tl.to(
        title,
        { autoAlpha: 1, yPercent: 0, clipPath: "inset(0% 0% 0% 0%)", duration: 1.5 },
        0.15,
      );
    }
    if (meta) tl.to(meta, { autoAlpha: 1, y: 0, duration: 0.9 }, 0.35);
    if (aside) tl.to(aside, { autoAlpha: 1, y: 0, duration: 1.1 }, 0.45);
  });
}

function cardGroups(isMobile: boolean) {
  const dist = isMobile ? 32 : 64;

  revealGroup(".cap-grid", ".cap", { y: dist, stagger: 0.08, start: "top 84%" });
  revealGroup(".projects__grid", ".project", {
    y: dist + 12,
    stagger: 0.1,
    start: "top 84%",
    clip: true,
  });
  revealGroup(".stat-band", ".stat-band__item", { y: 38, stagger: 0.08, start: "top 88%" });
  revealGroup(".about__body", ".about__intro, .about__experience, .about__contact", {
    y: 42,
    stagger: 0.12,
    start: "top 82%",
  });

  const media = document.querySelector<HTMLElement>(".about__media");
  if (media) {
    gsap.set(media, { autoAlpha: 0, y: 42, clipPath: "inset(0% 0% 100% 0%)" });
    gsap.to(media, {
      autoAlpha: 1,
      y: 0,
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 1.5,
      ease: EASE,
      scrollTrigger: { trigger: media, start: "top 84%", once: true },
      onComplete: () => gsap.set(media, { clipPath: "none" }),
    });
  }

  const tools = document.querySelector<HTMLElement>(".tools");
  if (tools) {
    gsap.set(tools, { autoAlpha: 0, y: 24 });
    gsap.to(tools, {
      autoAlpha: 1,
      y: 0,
      duration: 1.1,
      ease: EASE,
      scrollTrigger: { trigger: tools, start: "top 90%", once: true },
    });
  }
}

function projectImages(isMobile: boolean) {
  const amount = isMobile ? 2 : 4;

  gsap.utils.toArray<HTMLElement>(".project__frame img").forEach((img) => {
    const frame = img.closest(".project__frame");
    if (!frame) return;

    gsap.fromTo(
      img,
      { scale: 1.1 },
      {
        scale: 1,
        duration: 1.8,
        ease: EASE,
        scrollTrigger: { trigger: frame, start: "top 90%", once: true },
      },
    );

    gsap.fromTo(
      img,
      { yPercent: -amount },
      {
        yPercent: amount,
        ease: "none",
        scrollTrigger: {
          trigger: frame,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.3,
          invalidateOnRefresh: true,
        },
      },
    );
  });
}

function contactSection() {
  const section = document.querySelector<HTMLElement>("#contact");
  if (!section) return;

  const ghost = section.querySelector<HTMLElement>(".contact__ghost");
  const title = section.querySelector<HTMLElement>(".contact__title");
  const top = section.querySelector<HTMLElement>(".contact__top");
  const aside = section.querySelector<HTMLElement>(".contact__aside");
  const email = section.querySelector<HTMLElement>(".contact__email");
  const cells = gsap.utils.toArray<HTMLElement>(".contact__cell", section);
  const foot = section.querySelector<HTMLElement>(".contact__foot");

  if (ghost) gsap.set(ghost, { autoAlpha: 0, xPercent: -8, clipPath: "inset(0% 100% 0% 0%)" });
  if (title) gsap.set(title, { autoAlpha: 0, y: 52, clipPath: "inset(0% 0% 100% 0%)" });
  if (top) gsap.set(top, { autoAlpha: 0, y: 22 });
  if (aside) gsap.set(aside, { autoAlpha: 0, y: 30 });
  if (email) gsap.set(email, { autoAlpha: 0, y: 24 });
  if (cells.length) gsap.set(cells, { autoAlpha: 0, y: 22 });
  if (foot) gsap.set(foot, { autoAlpha: 0, y: 18 });

  const tl = gsap.timeline({
    defaults: { ease: EASE },
    scrollTrigger: { trigger: section, start: "top 68%", once: true },
  });

  if (top) tl.to(top, { autoAlpha: 1, y: 0, duration: 0.9 }, 0);
  if (ghost) {
    tl.to(ghost, { autoAlpha: 1, xPercent: 0, clipPath: "inset(0% 0% 0% 0%)", duration: 1.6 }, 0.05);
  }
  if (title) {
    tl.to(
      title,
      { autoAlpha: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)", duration: 1.5 },
      0.2,
    );
  }
  if (aside) tl.to(aside, { autoAlpha: 1, y: 0, duration: 1.1 }, 0.5);
  if (email) tl.to(email, { autoAlpha: 1, y: 0, duration: 1.1 }, 0.65);
  if (cells.length) tl.to(cells, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.06 }, 0.7);
  if (foot) tl.to(foot, { autoAlpha: 1, y: 0, duration: 0.9 }, 0.9);

  const bg = section.querySelector<HTMLElement>(".contact__bg img");
  if (bg) {
    gsap.fromTo(
      bg,
      { yPercent: -3 },
      {
        yPercent: 3,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.4,
          invalidateOnRefresh: true,
        },
      },
    );
  }
}

export function initSiteMotion() {
  if (typeof window === "undefined") return () => {};

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) {
    document.querySelector(".intro")?.remove();
    return () => {};
  }

  const isMobile = window.matchMedia("(max-width: 760px)").matches;

  const ctx = gsap.context(() => {
    ScrollTrigger.config({ ignoreMobileResize: true });
    opening(isMobile);
    heroScroll();
    sectionHeads();
    cardGroups(isMobile);
    projectImages(isMobile);
    contactSection();
    ScrollTrigger.refresh();
  });

  const refresh = () => ScrollTrigger.refresh();
  window.addEventListener("load", refresh, { once: true });
  if (document.fonts) document.fonts.ready.then(refresh);

  return () => {
    window.removeEventListener("load", refresh);
    ctx.revert();
  };
}
