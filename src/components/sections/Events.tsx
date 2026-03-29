import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { brutalistEntrance } from '../../lib/animations';

const schedule = [
  {
    time: '09:00',
    code: 'SYS_BOOT',
    event: 'REGISTRATION & NEURAL SYNC',
    highlight: false,
  },
  {
    time: '11:00',
    code: 'LINK_ESTABLISHED',
    event: 'KEYNOTE: GHOST_IN_THE_SHELL',
    highlight: true,
  },
  {
    time: '14:00',
    code: 'PACKET_SNIFF',
    event: 'HACKATHON_PHASE_01',
    highlight: false,
  },
  {
    time: '20:00',
    code: 'KERNEL_PANIC',
    event: 'MIDNIGHT_DECRYPT_CHALLENGE',
    highlight: false,
  },
];

export default function Events() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      id="events"
      style={{
        background: '#000',
        borderTop: '8px solid #c00100',
        borderBottom: '8px solid #c00100',
        padding: '104px 0',
      }}
    >
      <div style={{ maxWidth: 1280, width: '100%', margin: '0 auto', padding: '0 24px' }}>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.12 }}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(36px, 6vw, 72px)',
            lineHeight: 1,
            letterSpacing: '-0.04em',
            textTransform: 'uppercase',
            color: '#fde403',
            textShadow: '-3px 0px 0px #0ff, 3px 0px 0px #ba1a1a',
            marginBottom: '4rem',
          }}
        >
          EXECUTION_CYCLE
        </motion.h2>

        {/* Schedule table */}
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
          style={{
            border: '8px solid #c00100',
            overflow: 'hidden',
          }}
        >
          {schedule.map((item, i) => (
            <motion.div
              key={item.time}
              custom={i}
              variants={brutalistEntrance}
              style={{
                background: item.highlight ? '#c00100' : '#fff',
                borderBottom: i < schedule.length - 1 ? '8px solid #c00100' : 'none',
                padding: '32px',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 2fr',
                alignItems: 'center',
                gap: '1rem',
              }}
            >
              {/* Time */}
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 900,
                  fontSize: 'clamp(28px, 4vw, 48px)',
                  color: item.highlight ? '#fff' : '#000',
                  lineHeight: 1,
                }}
              >
                {item.time}
              </div>

              {/* Code */}
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 700,
                  fontSize: 'clamp(10px, 1.2vw, 16px)',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: item.highlight ? '#000' : '#c00100',
                }}
              >
                {item.code}
              </div>

              {/* Event name */}
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 900,
                  fontSize: 'clamp(16px, 2.2vw, 30px)',
                  color: item.highlight ? '#fff' : '#000',
                  lineHeight: 1.1,
                }}
              >
                {item.event}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
