import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { brutalistEntrance } from '../../lib/animations';

gsap.registerPlugin(ScrollTrigger);

// Figma asset URLs (valid 7 days from generation)
const imgCyberpunkTech =
  'https://www.figma.com/api/mcp/asset/4f8f1460-252d-4a1a-a10e-057fd3215e15';

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const headline1Ref = useRef<HTMLDivElement>(null);
  const headline2Ref = useRef<HTMLDivElement>(null);
  const ghostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      // Parallax layers at different speeds
      if (headline1Ref.current) {
        gsap.to(headline1Ref.current, {
          y: -80,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
      if (ghostRef.current) {
        gsap.to(ghostRef.current, {
          y: -40,
          x: 30,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const words = ['COMING', 'SOON'];

  return (
    <section
      ref={heroRef}
      id="hero"
      style={{
        background: '#fde403',
        minHeight: '100vh',
        overflow: 'hidden',
        position: 'relative',
        paddingTop: '80px', // navbar offset
      }}
    >
      {/* Ghost background text */}
      <div
        ref={ghostRef}
        style={{
          position: 'absolute',
          top: '-60px',
          left: '-200px',
          right: '-200px',
          opacity: 0.1,
          pointerEvents: 'none',
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 700,
          fontSize: 'clamp(120px, 18vw, 320px)',
          letterSpacing: '-0.05em',
          lineHeight: 0.85,
          color: '#000',
          whiteSpace: 'nowrap',
          userSelect: 'none',
        }}
      >
        HACK_SYSTEM
      </div>

      {/* Scaffolding elements */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
        }}
      >
        {/* Left vertical line + dot */}
        <div
          style={{
            position: 'absolute',
            left: 40,
            top: 160,
            width: 1,
            height: 256,
            background: 'rgba(0,0,0,0.2)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 24,
            top: 160,
            width: 8,
            height: 8,
            background: '#c00100',
          }}
        />
        {/* Right vertical line + dot */}
        <div
          style={{
            position: 'absolute',
            right: 40,
            bottom: 160,
            width: 1,
            height: 256,
            background: 'rgba(0,0,0,0.2)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: 24,
            bottom: 160,
            width: 8,
            height: 8,
            background: '#c00100',
          }}
        />
        {/* Vertical label */}
        <div
          style={{
            position: 'absolute',
            left: 42,
            top: '50%',
            transform: 'translateY(-50%) rotate(-90deg)',
            transformOrigin: 'center center',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '10px',
            letterSpacing: '5px',
            color: 'rgba(0,0,0,0.4)',
            whiteSpace: 'nowrap',
          }}
        >
          SYSTEM_AUTH_REQUIRED_V.2.0.4
        </div>
      </div>

      {/* Main content area */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: 64,
          right: 64,
          transform: 'translateY(-45%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '2rem',
        }}
      >
        {/* Left text */}
        <div ref={headline1Ref} style={{ flex: '0 0 auto', maxWidth: '55%' }}>
          {/* COMING SOON headline */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08 } },
            }}
          >
            {words.map((word, i) => (
              <motion.div
                key={word}
                custom={i}
                variants={brutalistEntrance}
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: 'clamp(80px, 13vw, 192px)',
                  lineHeight: 0.88,
                  letterSpacing: '-0.05em',
                  textTransform: 'uppercase',
                  color: '#c00100',
                  textShadow: '-3px 0px 0px #0ff, 3px 0px 0px #ba1a1a',
                }}
              >
                {word}
              </motion.div>
            ))}
          </motion.div>

          {/* WE_CREATE_THE_FUTURE skewed badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.1 }}
            style={{ marginTop: '2.5rem' }}
          >
            <div
              style={{
                display: 'inline-block',
                transform: 'skewX(-12deg)',
              }}
            >
              <div
                style={{
                  background: '#000',
                  padding: '24px',
                  boxShadow: '8px 8px 0px #c00100',
                }}
              >
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 900,
                    fontSize: 'clamp(14px, 1.5vw, 24px)',
                    color: '#fff',
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap',
                    display: 'block',
                    transform: 'skewX(12deg)',
                  }}
                >
                  WE_CREATE_THE_FUTURE
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right: Character image */}
        <motion.div
          ref={headline2Ref}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.12 }}
          style={{
            flex: '0 0 auto',
            position: 'relative',
            width: 'clamp(300px, 38vw, 520px)',
          }}
        >
          {/* Dashed outer border */}
          <div
            style={{
              position: 'absolute',
              inset: '-16px',
              border: '2px dashed rgba(0,0,0,0.3)',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />

          {/* Image block */}
          <div
            style={{
              position: 'relative',
              border: '8px solid #000',
              boxShadow: '20px 20px 0px #000',
              aspectRatio: '1/1',
              overflow: 'hidden',
              zIndex: 1,
            }}
          >
            <img
              src={imgCyberpunkTech}
              alt="HackFest Hero"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'saturate(0)',
              }}
              onError={(e) => {
                // Fallback if asset expires
                (e.target as HTMLImageElement).style.background = '#333';
                (e.target as HTMLImageElement).src = '';
              }}
            />
            {/* Desaturate overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: '#fff',
                mixBlendMode: 'saturation',
              }}
            />
          </div>

          {/* ROOT_ACCESS GRANTED badge */}
          <div
            style={{
              position: 'absolute',
              bottom: '-40px',
              right: '-24px',
              background: '#c00100',
              border: '4px solid #000',
              padding: '20px 28px',
              boxShadow: '12px 12px 0px #000',
              zIndex: 2,
            }}
          >
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 900,
                fontSize: 'clamp(14px, 1.6vw, 24px)',
                color: '#fff',
                textTransform: 'uppercase',
                lineHeight: 1.1,
                letterSpacing: '-0.04em',
              }}
            >
              ROOT_ACCESS
              <br />
              GRANTED
            </div>
          </div>
        </motion.div>
      </div>

      {/* HUD — top right coordinates */}
      <div
        style={{
          position: 'absolute',
          top: 96,
          right: 24,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '10px',
          letterSpacing: '0.2em',
          color: 'rgba(0,0,0,0.5)',
          textTransform: 'uppercase',
          lineHeight: 1.6,
        }}
      >
        <div>LAT: 20.2961° N</div>
        <div>LON: 85.8245° E</div>
        <div>SYS: ONLINE</div>
      </div>

      {/* HUD — bottom left status chip */}
      <div
        style={{
          position: 'absolute',
          bottom: 32,
          left: 64,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '10px',
          letterSpacing: '0.15em',
          color: '#000',
          textTransform: 'uppercase',
        }}
      >
        <div
          style={{ width: 8, height: 8, background: '#c00100' }}
        />
        STATUS: AWAITING_DEPLOY
      </div>
    </section>
  );
}
