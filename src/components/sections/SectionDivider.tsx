import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const TICKER_TEXT = 'SYSTEM_LOG: DATA_STREAM_OPEN // NO_RETREAT ';

export default function SectionDivider() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!trackRef.current) return;
    const el = trackRef.current;
    const totalWidth = el.scrollWidth / 2;

    const tl = gsap.fromTo(
      el,
      { x: 0 },
      {
        x: -totalWidth,
        ease: 'none',
        duration: 18,
        repeat: -1,
      }
    );

    return () => { tl.kill(); };
  }, []);

  const repeated = Array(8).fill(TICKER_TEXT).join('');

  return (
    <div
      style={{
        background: '#000',
        height: 96,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      <div
        ref={trackRef}
        style={{
          display: 'flex',
          alignItems: 'center',
          whiteSpace: 'nowrap',
          willChange: 'transform',
        }}
      >
        {[repeated, repeated].map((text, i) => (
          <span
            key={i}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 900,
              fontSize: '1.5rem',
              color: '#fde403',
              letterSpacing: '0.02em',
              textTransform: 'uppercase',
              paddingRight: '4rem',
            }}
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
