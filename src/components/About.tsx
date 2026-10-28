import { useState, type CSSProperties } from "react";
import { experiences, profile, stats } from "../data/content";
import { SectionHead } from "./SectionHead";
import BorderGlow from "./BorderGlow";

const frames = [
  {
    src: "/images/about/id.webp",
    thumb: "/images/about/id-thumb.webp",
    label: "证件照",
    caption: "ID PORTRAIT / 2026",
  },
  {
    src: "/images/about/01.webp",
    thumb: "/images/about/01-thumb.webp",
    label: "活动现场",
    caption: "ON SET / 2025",
  },
  {
    src: "/images/about/02.webp",
    thumb: "/images/about/02-thumb.webp",
    label: "外景途中",
    caption: "ON LOCATION / 2025",
  },
  {
    src: "/images/about/03.webp",
    thumb: "/images/about/03-thumb.webp",
    label: "山野片场",
    caption: "IN THE FIELD / 2025",
  },
  {
    src: "/images/about/04.webp",
    thumb: "/images/about/04-thumb.webp",
    label: "登顶之前",
    caption: "ON THE WAY / 2025",
  },
  {
    src: "/images/about/05.webp",
    thumb: "/images/about/05-thumb.webp",
    label: "高原之上",
    caption: "HIGH ALTITUDE / 2025",
  },
];

export function About() {
  const [active, setActive] = useState(0);

  return (
    <section className="section about" id="about" aria-labelledby="about-title">
      <div className="container">
        <SectionHead
          index="02"
          label="Profile / 关于我"
          word="PROFILE"
          title={
            <span id="about-title">
              影像工作者，
              <br />
              也是讲故事的人。
            </span>
          }
          note="山西朔州 · 现居西安 — 23 岁"
        >
          <div className="about__facts">
            <div className="about__fact">
              <span className="mono">Hometown</span>
              <span>山西朔州</span>
            </div>
            <div className="about__fact">
              <span className="mono">Based in</span>
              <span>西安</span>
            </div>
            <div className="about__fact">
              <span className="mono">Open to</span>
              <span>杭州 / 西安</span>
            </div>
          </div>
        </SectionHead>

        <div className="about__grid">
          <aside className="about__media" data-reveal>
            <div className="photo-deck">
              <div className="photo-deck__card">
                <div className="photo-deck__head mono">
                  <span>Portrait / Selected frames</span>
                  <span>{String(frames.length).padStart(2, "0")}</span>
                </div>

                <div className="photo-deck__stage">
                  {frames.map((frame, i) => (
                    <img
                      key={frame.src}
                      src={frame.src}
                      alt={`${profile.name} — ${frame.label}`}
                      width={1000}
                      height={1250}
                      className={i === active ? "is-active" : undefined}
                      loading="lazy"
                    />
                  ))}
                  <span className="photo-deck__chip mono">{frames[active].label}</span>
                </div>

                <div className="photo-deck__caption">
                  <span className="photo-deck__name">
                    {profile.name}
                    <span className="photo-deck__name-en mono">{profile.nameEn}</span>
                  </span>
                  <span className="photo-deck__role mono">{profile.role} — 西安</span>
                  <div className="photo-deck__meta mono">
                    <span>{frames[active].caption}</span>
                    <span>
                      {String(active + 1).padStart(2, "0")} / {String(frames.length).padStart(2, "0")}
                    </span>
                  </div>
                </div>
              </div>

              <div className="photo-deck__rail" aria-label="照片选择">
                <div className="photo-deck__track">
                  {[0, 1].map((copy) => (
                    <div
                      className="photo-deck__group"
                      key={copy}
                      aria-hidden={copy === 1 ? true : undefined}
                    >
                      {frames.map((frame, i) => (
                        <button
                          type="button"
                          key={frame.src}
                          className={`photo-deck__thumb${i === active ? " is-active" : ""}`}
                          onMouseEnter={() => setActive(i)}
                          onFocus={() => setActive(i)}
                          onClick={() => setActive(i)}
                          aria-label={`查看照片：${frame.label}`}
                          aria-pressed={i === active}
                          tabIndex={copy === 1 ? -1 : undefined}
                        >
                          <img src={frame.thumb} alt="" width={320} height={400} loading="lazy" />
                          <span className="mono">{String(i + 1).padStart(2, "0")}</span>
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <div className="about__body" data-reveal style={{ "--d": "120ms" } as CSSProperties}>
            <div className="about__intro">
              {profile.intro.map((paragraph) => (
                <p key={paragraph.slice(0, 12)}>{paragraph}</p>
              ))}
              <p className="about__signature serif">— every frame has a reason.</p>

              <blockquote className="about__quote">
                <p>「先把故事讲清楚，再谈画面好不好看。」</p>
                <cite className="mono">贾蕙铭 / 2026</cite>
              </blockquote>
            </div>


            <div className="about__experience">
              <h3 className="about__subhead mono">Experience / 经历</h3>
              <ul className="xp">
                {experiences.map((item) => (
                  <li className="xp__row" key={item.org}>
                    <span className="xp__period mono">{item.period}</span>
                    <span className="xp__org">{item.org}</span>
                    <span className="xp__role">{item.role}</span>
                    <span className="xp__loc mono">{item.location}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="about__contact">
              <h3 className="about__subhead mono">Contact / 联系方式</h3>
              <div className="contact-grid">
                <a className="contact-cell" href={profile.phoneHref}>
                  <span className="mono contact-cell__label">Phone</span>
                  <span className="contact-cell__value">{profile.phoneDisplay}</span>
                  <span className="contact-cell__arrow" aria-hidden="true">
                    ↗
                  </span>
                </a>
                <a className="contact-cell" href={profile.emailHref}>
                  <span className="mono contact-cell__label">Email</span>
                  <span className="contact-cell__value">{profile.email}</span>
                  <span className="contact-cell__arrow" aria-hidden="true">
                    ↗
                  </span>
                </a>
                <div className="contact-cell">
                  <span className="mono contact-cell__label">Education</span>
                  <span className="contact-cell__value">{profile.education}</span>
                </div>
                <div className="contact-cell">
                  <span className="mono contact-cell__label">Degree</span>
                  <span className="contact-cell__value">{profile.degree}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ul className="stat-band" aria-label="项目数据" data-reveal>
          {stats.map((stat) => (
            <li className="stat-band__item" key={stat.label}>
              <BorderGlow
                className="stat-glow"
                backgroundColor="#0b0908"
                borderRadius={14}
                glowColor="5 100% 60%"
                colors={["#ff3b2f", "#ff8a6a", "#8f1a12"]}
                glowIntensity={1.5}
                glowRadius={34}
                edgeSensitivity={30}
                coneSpread={26}
                fillOpacity={0.5}
              >
                <div className="stat-band__inner">
                  <span className="stat-band__value">
                    {stat.value}
                    {stat.unit ? <span className="stat-band__unit">{stat.unit}</span> : null}
                  </span>
                  <span className="stat-band__label mono">{stat.label}</span>
                </div>
              </BorderGlow>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
