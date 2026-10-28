import type { ReactNode } from "react";

type Props = {
  index: string;
  label: string;
  title: ReactNode;
  word?: string;
  note?: ReactNode;
  children?: ReactNode;
};

export function SectionHead({ index, label, title, word, note, children }: Props) {
  return (
    <header className="sec-head" data-reveal>
      {word ? (
        <span className="sec-head__ghost" aria-hidden="true">
          {word}
        </span>
      ) : null}
      <div className="sec-head__meta">
        <span className="sec-head__index mono">
          <span className="sec-head__dot" aria-hidden="true" />
          {index}
        </span>
        <span className="sec-head__label mono">{label}</span>
        {note ? <span className="sec-head__note mono">{note}</span> : null}
      </div>

      <div className={`sec-head__body${children ? " has-aside" : ""}`}>
        <h2 className="sec-head__title">{title}</h2>
        {children ? <div className="sec-head__aside">{children}</div> : null}
      </div>
    </header>
  );
}
