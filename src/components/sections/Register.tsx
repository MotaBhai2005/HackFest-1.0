import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { brutalistEntrance } from '../../lib/animations';
import PrimaryButton from '../ui/PrimaryButton';

export default function Register() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      id="register"
      style={{
        background: '#fde403',
        padding: '128px 64px',
        position: 'relative',
      }}
    >
      {/* Hazard stripe border top */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 16,
          background: `repeating-linear-gradient(
            45deg,
            #fde403 0px,
            #fde403 14px,
            #000 14px,
            #000 28px
          )`,
        }}
      />

      <motion.div
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
        style={{
          background: '#000',
          border: '12px solid #c00100',
          padding: 'clamp(60px, 8vw, 140px)',
          maxWidth: 1152,
          width: '100%',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative QR icon bg */}
        <div
          style={{
            position: 'absolute',
            top: '-28px',
            right: '-28px',
            width: 360,
            height: 360,
            opacity: 0.08,
            transform: 'rotate(12deg)',
            pointerEvents: 'none',
            fontFamily: 'monospace',
            fontSize: 240,
            color: '#c00100',
            lineHeight: 1,
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          ▣
        </div>

        {/* Headline */}
        <motion.div custom={0} variants={brutalistEntrance}>
          {['YOUR', 'ONLINE', 'EXISTENCE', 'AWAITS'].map((word) => (
            <div
              key={word}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 900,
                fontSize: 'clamp(56px, 11vw, 160px)',
                lineHeight: 0.82,
                letterSpacing: '-0.05em',
                textTransform: 'uppercase',
                color: '#fde403',
              }}
            >
              {word}
            </div>
          ))}
        </motion.div>

        {/* CTA row */}
        <motion.div
          custom={1}
          variants={brutalistEntrance}
          style={{
            marginTop: '3rem',
            display: 'flex',
            alignItems: 'center',
            gap: '2.5rem',
            flexWrap: 'wrap',
          }}
        >
          <PrimaryButton size="lg" href="#register-form">
            SYNC_NOW
          </PrimaryButton>

          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.875rem',
              color: '#c00100',
              letterSpacing: '0.1em',
              lineHeight: 1.6,
            }}
          >
            <div>[ STATUS: WAITING_FOR_USER_INPUT ]</div>
            <div>[ UPLOAD_SPEED: UNRESTRICTED ]</div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
