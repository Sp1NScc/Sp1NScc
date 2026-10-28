import { marqueeItems } from "../data/content";

export function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {[0, 1].map((copy) => (
          <div className="marquee__group" key={copy}>
            {marqueeItems.map((item) => (
              <span className="marquee__item mono" key={`${copy}-${item}`}>
                {item}
                <span className="marquee__star">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
