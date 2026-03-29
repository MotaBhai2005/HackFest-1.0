import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { brutalistEntrance } from '../../lib/animations';

const sponsors = [
  { name: 'NEURO_CORP', tier: 1 },
  { name: 'SYNTH_DYNE', tier: 1 },
  { name: 'VOID_LABS', tier: 1 },
  { name: 'OMEGA_OS', tier: 1 },
];

export default function Sponsors() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      id="sponsors"
      style={{
        background: '#fde403',
        padding: '96px 0',
        position: 'relative',
      }}
    >
      {/* Red tape separator at top */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: '#c00100',
        }}
      />

      <div
        style={{
          maxWidth: 1280,
          width: '100%',
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '4rem',
        }}
      >
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          {/* Hazard stripe accent */}
          <motion.div
            custom={0}
            variants={brutalistEntrance}
            style={{
              width: 96,
              height: 16,
              background: `repeating-linear-gradient(
                45deg,
                #fde403 0px,
                #fde403 9px,
                #000 9px,
                #000 18px
              )`,
            }}
          />
          <motion.div
            custom={1}
            variants={brutalistEntrance}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(14px, 1.6vw, 20px)',
              letterSpacing: '0.5em',
              textTransform: 'uppercase',
              color: '#000',
              textAlign: 'center',
            }}
          >
            Transmission_Supported_By
          </motion.div>
        </motion.div>

        {/* Sponsor grid */}
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          style={{
            border: '4px solid #000',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
          }}
        >
          {sponsors.map((sponsor, i) => (
            <motion.div
              key={sponsor.name}
              custom={i}
              variants={brutalistEntrance}
              style={{
                borderRight: i < sponsors.length - 1 ? '4px solid #000' : 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '48px 32px',
                height: 132,
                cursor: 'pointer',
                transition: 'background 0.05s',
              }}
              whileHover={{ backgroundColor: '#fff' }}
            >
              <span
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: 'clamp(16px, 2.2vw, 30px)',
                  letterSpacing: '-0.05em',
                  color: '#000',
                  textAlign: 'center',
                }}
              >
                {sponsor.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
