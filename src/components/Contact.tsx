import { profile } from "../data/content";
import { Clock } from "./Clock";
import GlitchText from "./GlitchText";

export function Contact() {
  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <div className="contact__bg" aria-hidden="true">
        <img src="/images/contact-bg.webp" alt="" loading="lazy" />
      </div>
      <div className="contact__scrim" aria-hidden="true" />

      <div className="contact__inner container">
        <span className="contact__ghost" aria-hidden="true">
          CONTACT
        </span>

        <div className="contact__top" data-reveal>
          <span className="contact__label mono">
            <span className="contact__dot" aria-hidden="true" />
            05 — Contact / 联系方式
          </span>
          <span className="contact__status mono">
            OPEN TO WORK
            <span className="contact__status-dim"> / 2026</span>
          </span>
        </div>

        <div className="contact__main">
          <h2 className="contact__title" id="contact-title">
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
              className="contact__glitch"
            >
              无限进步
            </GlitchText>
          </h2>

          <div className="contact__aside">
            <p className="contact__text">
              这里我借用Tim老师的一段话：“真正的失败，是一个人开始拒绝思考和尝试进步的时候。”我也有清楚的短板，但不会绕开它们——拆开、练习，再回到现场。每一段经历，顺的也好，笨拙的也好，都在把我往更完整的方向推。希望下一段经历，能留在一个值得长期投入的团队里，寻找我们的价值。
            </p>
            <a className="contact__email" href={profile.emailHref}>
              <span className="contact__email-text">{profile.email}</span>
              <span className="contact__email-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          </div>
        </div>

        <div className="contact__grid" data-reveal>
          <a className="contact__cell" href={profile.phoneHref}>
            <span className="mono">Phone</span>
            <span className="contact__cell-value">{profile.phoneDisplay}</span>
          </a>
          <a className="contact__cell" href={profile.emailHref}>
            <span className="mono">Email</span>
            <span className="contact__cell-value">{profile.email}</span>
          </a>
          <div className="contact__cell">
            <span className="mono">Based in</span>
            <span className="contact__cell-value">西安 · 中国</span>
          </div>
          <div className="contact__cell">
            <span className="mono">Open to</span>
            <span className="contact__cell-value">西安 / 杭州</span>
          </div>
        </div>

        <footer className="contact__foot">
          <span className="contact__copy">© 2026 贾蕙铭 — JIA HUIMING</span>
          <span className="contact__clock mono">
            XI'AN · <Clock /> <span className="contact__clock-dim">CST</span>
          </span>
          <span className="contact__credit mono">Designed &amp; built from scratch</span>
          <a className="contact__totop mono" href="#home">
            回到顶部
            <span aria-hidden="true">↑</span>
          </a>
        </footer>
      </div>
    </section>
  );
}
