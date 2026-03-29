import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { slideFromLeft, slideFromRight } from '../../lib/animations';

const imgEntity01 = 'https://www.figma.com/api/mcp/asset/f2dfc946-8100-4064-8135-5290f1fce0f9';
const imgEntity02 = 'https://www.figma.com/api/mcp/asset/9e8140b8-2817-4c94-9903-28b16655f6ca';
const imgPlaceholder = 'https://www.figma.com/api/mcp/asset/e12141f0-b0ed-4c3a-b7bb-ae9e200b18ab';

const speakers = [
  {
    id: 'ID_001_ROOT_ACCESS',
    name: 'XENON_BYTE',
    role: 'SECURITY ARCHITECT',
    rank: 'LEGENDARY',
    cpu: '99%',
    image: imgEntity01,
  },
  {
    id: 'ID_002_CORE_SYNC',
    name: 'NOVA_LEAK',
    role: 'DATA WHISPERER',
    rank: 'ELITE',
    cpu: '84%',
    image: imgEntity02,
  },
];

function SpeakerCard({ speaker, index }: { speaker: typeof speakers[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      variants={index % 2 === 0 ? slideFromLeft : slideFromRight}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      style={{
        background: '#000',
        border: '4px solid #000',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      {/* Image area */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '1/1',
          overflow: 'hidden',
          border: '16px solid #000',
          marginBottom: '-32px',
        }}
      >
        <img
          src={speaker.image}
          alt={speaker.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
          onError={(e) => {
            const el = e.target as HTMLImageElement;
            el.style.background = '#333';
            el.src = '';
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

      {/* Info panel */}
      <div
        style={{
          background: '#fff',
          border: '4px solid #000',
          boxShadow: '12px 12px 0px #000',
          padding: '24px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* ID */}
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 700,
            fontSize: '12px',
            color: '#c00100',
            marginBottom: '8px',
            textTransform: 'uppercase',
          }}
        >
          {speaker.id}
        </div>

        {/* Name */}
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(22px, 2.5vw, 36px)',
            color: '#000',
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
            lineHeight: 1,
            marginBottom: '8px',
          }}
        >
          {speaker.name}
        </div>

        {/* Role */}
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 900,
            fontSize: '14px',
            color: '#c00100',
            textTransform: 'uppercase',
            marginBottom: '16px',
          }}
        >
          {speaker.role}
        </div>

        {/* Divider + meta */}
        <div
          style={{
            borderTop: '2px solid #000',
            paddingTop: '18px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ background: '#000', padding: '2px 8px' }}>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '10px',
                color: '#fff',
                textTransform: 'uppercase',
              }}
            >
              RANK: {speaker.rank}
            </span>
          </div>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '10px',
              color: '#000',
              textTransform: 'uppercase',
            }}
          >
            CPU_LOAD: {speaker.cpu}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function GuestSpeaker() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      id="speakers"
      style={{
        background: '#fde403',
        padding: '96px 24px',
      }}
    >
      <div style={{ maxWidth: 1280, width: '100%', margin: '0 auto' }}>
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.12 }}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(48px, 9vw, 128px)',
            lineHeight: 0.85,
            letterSpacing: '-0.05em',
            textTransform: 'uppercase',
            color: '#000',
            marginBottom: '5rem',
          }}
        >
          GUEST ENTITIES
        </motion.h2>

        {/* Cards grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '3rem',
            alignItems: 'start',
          }}
        >
          {speakers.map((speaker, i) => (
            <SpeakerCard key={speaker.id} speaker={speaker} index={i} />
          ))}

          {/* Placeholder card */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.12 }}
            style={{
              border: '6px dashed rgba(0,0,0,0.2)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '54px',
              minHeight: 400,
            }}
          >
            <img
              src={imgPlaceholder}
              alt=""
              style={{ width: 88, height: 'auto', marginBottom: '1rem', opacity: 0.4 }}
              onError={(e) => ((e.target as HTMLImageElement).style.display = 'none')}
            />
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 900,
                fontSize: '16px',
                color: 'rgba(0,0,0,0.3)',
                textTransform: 'uppercase',
                textAlign: 'center',
                letterSpacing: '0.05em',
              }}
            >
              Next_Signal_Pending...
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
