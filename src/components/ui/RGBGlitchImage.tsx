import { useEffect, useId, useState } from 'react';

/** RGB split, timing, and scan-slice effect from the original speaker cards. */
export default function RGBGlitchImage({ src, alt }: { src: string; alt: string }) {
  const [glitching, setGlitching] = useState(false);
  const filterId = useId().replace(/:/g, '');

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const schedule = () => {
      timer = setTimeout(() => {
        setGlitching(true);
        timer = setTimeout(() => {
          setGlitching(false);
          schedule();
        }, 600);
      }, 3000 + Math.random() * 3000);
    };
    schedule();
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="rgb-glitch-image" data-glitching={glitching}>
      <img src={src} alt={alt} className="rgb-glitch-base" />
      <img src={src} alt="" aria-hidden="true" className="rgb-glitch-layer rgb-glitch-red" style={{ filter: `url(#${filterId}-red)` }} />
      <img src={src} alt="" aria-hidden="true" className="rgb-glitch-layer rgb-glitch-cyan" style={{ filter: `url(#${filterId}-cyan)` }} />
      <div className="rgb-glitch-slice" aria-hidden="true" />
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <filter id={`${filterId}-red`}><feColorMatrix type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" /></filter>
          <filter id={`${filterId}-cyan`}><feColorMatrix type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0" /></filter>
        </defs>
      </svg>
    </div>
  );
}
