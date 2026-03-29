import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { brutalistEntrance } from '../../lib/animations';

const faqs = [
  {
    id: 1,
    question: 'CAN I ENTER THE MATRIX SOLO?',
    answer:
      'YES. SOLITARY NODES ARE PERMITTED. WE WILL CLUSTER YOU WITH COMPATIBLE ENTITIES DURING SYNC PHASE.',
  },
  {
    id: 2,
    question: 'DO I NEED A RIG TO COMPETE?',
    answer:
      'MINIMUM SPECS: LAPTOP, CHARGER, AND A WILLINGNESS TO BYPASS CONVENTIONAL LIMITS.',
  },
  {
    id: 3,
    question: 'WHAT IS THE PRIZE POOL STRUCTURE?',
    answer:
      'TOTAL_POOL: 230K. DISTRIBUTED ACROSS ALPHA, ROOT, AND BETA ACCESS TIERS. ADDITIONAL BOUNTIES UNLOCKED DURING EXECUTION_CYCLE.',
  },
  {
    id: 4,
    question: 'IS PRIOR EXPERIENCE REQUIRED?',
    answer:
      'NEGATIVE. ALL SKILL_LEVELS ACCEPTED. THE ONLY PREREQUISITE IS THE WILL TO REWRITE REALITY.',
  },
  {
    id: 5,
    question: 'HOW DO I REGISTER MY TEAM?',
    answer:
      'INITIATE_UPLOAD VIA THE SYNC_NOW BUTTON. PROVIDE TEAM DATA, NODE COUNT (2–5), AND DOMAIN PREFERENCE. CONFIRMATION TRANSMITTED WITHIN 48H.',
  },
];

function FAQItem({ faq, index }: { faq: typeof faqs[0]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      custom={index}
      variants={brutalistEntrance}
      style={{
        background: open ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.05)',
        border: `4px solid ${open ? '#c00100' : '#fff'}`,
        position: 'relative',
        transition: 'border-color 0.04s, background 0.04s',
      }}
    >
      {/* HUD bracket — top left */}
      <div
        style={{
          position: 'absolute',
          top: -8,
          left: -8,
          width: 20,
          height: 20,
          borderTop: '4px solid #000',
          borderLeft: '4px solid #000',
          zIndex: 1,
        }}
      />
      {/* HUD bracket — bottom right */}
      <div
        style={{
          position: 'absolute',
          bottom: -8,
          right: -8,
          width: 20,
          height: 20,
          borderBottom: '4px solid #000',
          borderRight: '4px solid #000',
          zIndex: 1,
        }}
      />

      {/* Question row */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%',
          background: 'none',
          border: 'none',
          padding: '44px',
          display: 'flex',
          gap: '1.5rem',
          alignItems: 'flex-start',
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 700,
            fontSize: 'clamp(16px, 2vw, 24px)',
            color: '#c00100',
            flexShrink: 0,
            lineHeight: 1.2,
          }}
        >
          QRY:
        </span>
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(16px, 2.2vw, 30px)',
            color: '#fff',
            textTransform: 'uppercase',
            lineHeight: 1.2,
            flex: 1,
          }}
        >
          {faq.question}
        </span>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '24px',
            color: '#c00100',
            flexShrink: 0,
            lineHeight: 1,
            transform: open ? 'rotate(45deg)' : 'none',
            transition: 'transform 0.05s',
          }}
        >
          +
        </span>
      </button>

      {/* Answer */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.05 }}
            style={{ overflow: 'hidden' }}
          >
            <div
              style={{
                padding: '0 44px 44px 44px',
                paddingLeft: 'calc(44px + clamp(16px, 2vw, 24px) + 1.5rem)',
              }}
            >
              <div
                style={{
                  borderLeft: '4px solid #c00100',
                  paddingLeft: '28px',
                }}
              >
                <p
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 'clamp(12px, 1.4vw, 18px)',
                    color: 'rgba(253, 228, 3, 0.8)',
                    lineHeight: 1.6,
                    textTransform: 'uppercase',
                  }}
                >
                  {faq.answer}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQs() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      id="faq"
      style={{
        background: '#000',
        padding: '128px 0',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Giant ghost FAQ text */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          fontFamily: "'Inter', sans-serif",
          fontWeight: 900,
          fontSize: 'clamp(160px, 22vw, 320px)',
          color: 'rgba(255,255,255,0.05)',
          letterSpacing: '-0.05em',
          lineHeight: 0.85,
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      >
        FAQ
      </div>

      <div
        style={{
          maxWidth: 1024,
          width: '100%',
          margin: '0 auto',
          padding: '0 24px',
          position: 'relative',
        }}
      >
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, x: -24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.12 }}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(32px, 5vw, 72px)',
            lineHeight: 1,
            letterSpacing: '-0.05em',
            textTransform: 'uppercase',
            color: '#c00100',
            marginBottom: '5rem',
          }}
        >
          {'> SYSTEM_LOGS.FAQ'}
        </motion.h2>

        {/* FAQ items */}
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
          }}
        >
          {faqs.map((faq, i) => (
            <FAQItem key={faq.id} faq={faq} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
