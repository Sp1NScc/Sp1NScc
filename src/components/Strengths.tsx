import type { CSSProperties } from "react";
import { capabilities, tools } from "../data/content";
import { SectionHead } from "./SectionHead";
import BorderGlow from "./BorderGlow";

export function Strengths() {
  return (
    <section className="section strengths" id="capabilities" aria-labelledby="cap-title">
      <div className="container">
        <SectionHead
          index="04"
          label="Capabilities / 个人优势"
          word="CAPABILITIES"
          title={
            <span id="cap-title">
              能一个人完成，
              <br />
              也能带团队推进。
            </span>
          }
          note="06 项核心能力"
        >
          <p className="sec-head__text">
            拍摄、剪辑、调色、统筹——不是四份工作，而是同一支片子的四个阶段。以下是我能独立负责的部分。
          </p>
        </SectionHead>

        <ul className="cap-grid">
          {capabilities.map((capability, i) => (
            <li
              className="cap"
              key={capability.index}
              data-reveal
              style={{ "--d": `${i * 60}ms` } as CSSProperties}
            >
              <BorderGlow
                className="cap-glow"
                backgroundColor="#0b0908"
                borderRadius={18}
                glowColor="5 100% 60%"
                colors={["#ff3b2f", "#ff8a6a", "#8f1a12"]}
                glowIntensity={1.6}
                glowRadius={42}
                edgeSensitivity={32}
                coneSpread={26}
                fillOpacity={0.55}
              >
                <div className="cap__inner">
                  <div className="cap__top">
                    <span className="cap__index mono">{capability.index}</span>
                    <span className="cap__en mono">{capability.english}</span>
                  </div>
                  <h3 className="cap__title">{capability.title}</h3>
                  <p className="cap__desc">{capability.description}</p>
                  <ul className="cap__tags">
                    {capability.keywords.map((keyword) => (
                      <li className="mono" key={keyword}>
                        {keyword}
                      </li>
                    ))}
                  </ul>
                </div>
              </BorderGlow>
            </li>
          ))}
        </ul>

        <div className="tools" data-reveal>
          <span className="tools__label mono">Tools / 工具</span>
          <ul className="tools__list">
            {tools.map((tool) => (
              <li key={tool}>{tool}</li>
            ))}
          </ul>
          <span className="tools__note mono">Camera · Light · Post</span>
        </div>
      </div>
    </section>
  );
}
