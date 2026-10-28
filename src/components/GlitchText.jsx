import { useEffect, useRef, useState } from 'react';
import './GlitchText.css';

const SLICES = [
  { top: '6%', bottom: '78%', color: '#ff0000', delay: '0s' },
  { top: '34%', bottom: '50%', color: '#00ffff', delay: '0.12s' },
  { top: '62%', bottom: '22%', color: '#f2efe8', delay: '0.24s' },
  { top: '18%', bottom: '66%', color: '#ff0000', delay: '0.36s' },
  { top: '78%', bottom: '6%', color: '#00ffff', delay: '0.48s' },
];

export default function GlitchText({
  children,
  className = '',
  mode = 'slices',
  trigger = 'hover',
  speed = 1,
  intensity = 0.5,
  burstDuration = 0.6,
  offset = 10,
  skew = 0,
  flicker = false,
  fontWeight = 700,
  enableShadows = true,
  shadowColors = ['#ff0000', '#00ffff'],
}) {
  const text = typeof children === 'string' ? children : String(children ?? '');
  const rootRef = useRef(null);
  const [onScreen, setOnScreen] = useState(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setOnScreen(entry.isIntersecting),
      { rootMargin: '120px 0px', threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <span
      ref={rootRef}
      className={`glitch-text glitch-text--${mode} glitch-text--${trigger}${flicker ? ' is-flickering' : ''}${onScreen ? ' is-on-screen' : ''} ${className}`.trim()}
      data-text={text}
      style={{
        '--glitch-speed': `${4.2 / Math.max(speed, 0.1)}s`,
        '--glitch-intensity': intensity,
        '--glitch-burst': `${burstDuration}s`,
        '--glitch-offset': `${offset}px`,
        '--glitch-skew': `${skew}deg`,
        '--glitch-shadow-a': shadowColors[0] || '#ff0000',
        '--glitch-shadow-b': shadowColors[1] || '#00ffff',
        fontWeight,
      }}
      aria-label={text}
    >
      <span className="glitch-text__base" aria-hidden="true">
        {children}
      </span>

      {enableShadows ? (
        <>
          <span className="glitch-text__shadow glitch-text__shadow--a" aria-hidden="true">
            {children}
          </span>
          <span className="glitch-text__shadow glitch-text__shadow--b" aria-hidden="true">
            {children}
          </span>
        </>
      ) : null}

      {mode === 'slices'
        ? SLICES.map((slice) => (
            <span
              key={`${slice.top}-${slice.color}`}
              className="glitch-text__slice"
              aria-hidden="true"
              style={{
                '--slice-top': slice.top,
                '--slice-bottom': slice.bottom,
                '--slice-color': slice.color,
                '--slice-delay': slice.delay,
              }}
            >
              {children}
            </span>
          ))
        : null}
    </span>
  );
}
