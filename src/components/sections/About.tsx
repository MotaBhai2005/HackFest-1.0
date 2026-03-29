import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { brutalistEntrance } from '../../lib/animations';
import HUDBracket from '../ui/HUDBracket';

const imgContainer = 'https://www.figma.com/api/mcp/asset/dbfbc5df-ad31-484f-92b3-dbcaaaae1678';
const imgContainer1 = 'https://www.figma.com/api/mcp/asset/bfe48a2c-274a-4ef2-8292-074b53526c01';

const stats = [
  {
    value: '48H',
    label: 'UPTIME_REQUIRED',
    icon: imgContainer,
  },
  {
    value: '2048',
    label: 'CONNECTED_NODES',
    icon: imgContainer1,
  },
];

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      id="about"
      style={{
        background: '#000',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        minHeight: '960px',
        borderBottom: '8px solid #000',
      }}
    >
      {/* Left col — red bg */}
      <div
        style={{
          background: '#c00100',
          borderRight: '8px solid #000',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px 96px',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Ghost number */}
        <div
          style={{
            position: 'absolute',
            left: '-80px',
            top: '50%',
            transform: 'translateY(-60%)',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(160px, 22vw, 320px)',
            color: 'rgba(0,0,0,0.2)',
            letterSpacing: '-0.05em',
            lineHeight: 0.85,
            userSelect: 'none',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        >
          01
        </div>

        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
          style={{ position: 'relative', zIndex: 1 }}
        >
          {['ANALOG', 'HEART', 'DIGITAL', 'MIND'].map((word, i) => (
            <motion.div
              key={word}
              custom={i}
              variants={brutalistEntrance}
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: 'clamp(56px, 9vw, 128px)',
                lineHeight: 1,
                letterSpacing: '-0.04em',
                textTransform: 'uppercase',
                color: '#fff',
              }}
            >
              {word}
            </motion.div>
          ))}
        </motion.div>

        {/* Black bar accent */}
        <div
          style={{
            marginTop: '2rem',
            height: 24,
            width: 192,
            background: '#000',
            position: 'relative',
            zIndex: 1,
          }}
        />
      </div>

      {/* Right col — black bg */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px 96px',
          position: 'relative',
        }}
      >
        {/* HUD bracket corners */}
        <HUDBracket size={48} offset={-12} color="#c00100">
          <motion.div
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
            style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
          >
            {/* Label */}
            <motion.div custom={0} variants={brutalistEntrance}>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 700,
                  fontSize: '1rem',
                  letterSpacing: '0.4em',
                  color: '#c00100',
                  textTransform: 'uppercase',
                }}
              >
                {'> CORE_DIAGNOSTICS'}
              </span>
            </motion.div>

            {/* Body */}
            <motion.div custom={1} variants={brutalistEntrance}>
              <p
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 700,
                  fontStyle: 'italic',
                  fontSize: 'clamp(14px, 1.6vw, 24px)',
                  color: '#fff',
                  textTransform: 'uppercase',
                  lineHeight: 1.4,
                }}
              >
                Welcome to the nexus.
                <br />
                HACK_FEST is not just an
                <br />
                event; it&apos;s a cognitive
                <br />
                rewrite. We merge raw brutalist
                <br />
                engineering with the precision
                <br />
                of dystopian UI.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              custom={2}
              variants={brutalistEntrance}
              style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingTop: '2rem' }}
            >
              {stats.map((stat) => (
                <div
                  key={stat.value}
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '4px solid #c00100',
                    padding: '28px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    height: 112,
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontWeight: 700,
                        fontSize: 'clamp(24px, 3vw, 36px)',
                        color: '#c00100',
                        lineHeight: 1,
                      }}
                    >
                      {stat.value}
                    </div>
                    <div
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '12px',
                        color: 'rgba(255,255,255,0.6)',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        marginTop: 4,
                      }}
                    >
                      {stat.label}
                    </div>
                  </div>
                  <img
                    src={stat.icon}
                    alt=""
                    style={{ height: 36, width: 'auto', opacity: 0.8 }}
                    onError={(e) => ((e.target as HTMLImageElement).style.display = 'none')}
                  />
                </div>
              ))}
            </motion.div>
          </motion.div>
        </HUDBracket>
      </div>
    </section>
  );
}
