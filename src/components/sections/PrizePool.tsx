import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { boltOnReveal } from '../../lib/animations';
import HUDBracket from '../ui/HUDBracket';

gsap.registerPlugin(ScrollTrigger);

const imgIcon = 'https://www.figma.com/api/mcp/asset/07b0974f-3911-4d5c-8991-92c97aac833f';
const imgIcon1 = 'https://www.figma.com/api/mcp/asset/c4f306e7-f33b-4066-9265-f6eb6fe4d74c';
const imgIcon2 = 'https://www.figma.com/api/mcp/asset/d6727e42-b139-40dc-887a-6a1540bf5fca';

interface PrizeCard {
  amount: string;
  numericAmount: number;
  title: string;
  fileId: string;
  accessLevel: string;
  icon: string;
  isGrand?: boolean;
}

const prizes: PrizeCard[] = [
  {
    amount: '50K',
    numericAmount: 50000,
    title: 'MAIN_FRAME_CHAMP',
    fileId: '#FILE_001',
    accessLevel: 'ACCESS_LEVEL: ALPHA',
    icon: imgIcon,
  },
  {
    amount: '150K',
    numericAmount: 150000,
    title: 'GRAND_SYS_ADMIN',
    fileId: '#SYSTEM_ROOT',
    accessLevel: 'TOTAL_POOL_RESERVE',
    icon: imgIcon1,
    isGrand: true,
  },
  {
    amount: '30K',
    numericAmount: 30000,
    title: 'NEURAL_EXPLORER',
    fileId: '#FILE_003',
    accessLevel: 'ACCESS_LEVEL: BETA',
    icon: imgIcon2,
  },
];

function PrizeCard({ prize, index }: { prize: PrizeCard; index: number }) {
  const amountRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, { once: true, margin: '-80px' });

  useEffect(() => {
    if (!inView || !amountRef.current) return;
    const el = amountRef.current;
    const isMega = prize.amount.includes('150');
    const suffix = prize.amount.replace(/\d+/g, '');
    const target = { val: 0 };

    gsap.to(target, {
      val: prize.numericAmount / 1000,
      duration: isMega ? 1.8 : 1.2,
      ease: 'power2.out',
      delay: index * 0.15,
      onUpdate: () => {
        el.textContent = Math.round(target.val) + 'K';
      },
    });
  }, [inView, prize.numericAmount, prize.amount, index]);

  const bg = prize.isGrand ? '#c00100' : '#fde403';
  const textColor = prize.isGrand ? '#fff' : '#000';
  const iconColor = prize.isGrand ? '#fff' : '#000';

  return (
    <motion.div
      ref={cardRef}
      custom={index}
      variants={boltOnReveal}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      style={{
        background: bg,
        border: '4px solid #000',
        height: 404,
        position: 'relative',
        boxShadow: prize.isGrand ? '15px 15px 0px #000' : 'none',
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
        }}
      />

      {/* Top row: icon + file ID */}
      <div
        style={{
          position: 'absolute',
          top: 40,
          left: 40,
          right: 40,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        <img
          src={prize.icon}
          alt=""
          style={{ height: 50, width: 'auto', opacity: 0.9 }}
          onError={(e) => ((e.target as HTMLImageElement).style.display = 'none')}
        />
        {prize.isGrand ? (
          <div style={{ background: '#fff', padding: '2px 8px' }}>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 700,
                fontSize: '12px',
                color: '#000',
              }}
            >
              {prize.fileId}
            </span>
          </div>
        ) : (
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '12px',
              color: 'rgba(0,0,0,0.4)',
            }}
          >
            {prize.fileId}
          </span>
        )}
      </div>

      {/* Amount */}
      <div
        style={{
          position: 'absolute',
          top: 148,
          left: 40,
          right: 40,
        }}
      >
        <div
          ref={amountRef}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(56px, 7vw, 96px)',
            lineHeight: 1,
            color: textColor,
          }}
        >
          {prize.amount}
        </div>
      </div>

      {/* Title */}
      <div
        style={{
          position: 'absolute',
          top: 260,
          left: 40,
          right: 40,
        }}
      >
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(12px, 1.4vw, 20px)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: textColor,
          }}
        >
          {prize.title}
        </div>
      </div>

      {/* Access level */}
      <div
        style={{
          position: 'absolute',
          top: 320,
          left: 40,
          right: 40,
        }}
      >
        {prize.isGrand ? (
          <div
            style={{
              background: '#000',
              display: 'inline-block',
              padding: '8px 16px',
            }}
          >
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 900,
                fontSize: '14px',
                color: '#fde403',
                textTransform: 'uppercase',
              }}
            >
              {prize.accessLevel}
            </span>
          </div>
        ) : (
          <div
            style={{
              borderTop: '2px solid rgba(0,0,0,0.2)',
              paddingTop: '18px',
            }}
          >
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '12px',
                color: 'rgba(0,0,0,0.6)',
              }}
            >
              {prize.accessLevel}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function PrizePool() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      id="prize-pool"
      style={{
        background: '#fff',
        borderTop: '16px solid #000',
        borderBottom: '16px solid #000',
        padding: '112px 24px',
      }}
    >
      <div style={{ maxWidth: 1280, width: '100%', margin: '0 auto' }}>

        {/* Heading row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: '5rem',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.12 }}
          >
            <h2
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: 'clamp(48px, 11vw, 160px)',
                lineHeight: 1,
                letterSpacing: '-0.05em',
                textTransform: 'uppercase',
                color: '#000',
              }}
            >
              REWARD_FILES
            </h2>
          </motion.div>

          {/* Encryption metadata */}
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '12px',
              color: 'rgba(0,0,0,0.5)',
              textAlign: 'right',
              lineHeight: 1.6,
              paddingBottom: '1rem',
              flexShrink: 0,
              marginLeft: '1rem',
            }}
          >
            <div>ENCRYPTION:</div>
            <div>AES_256</div>
            <div>SOURCE:</div>
            <div>CENTRAL_VAULT</div>
          </div>
        </div>

        {/* Prize cards grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '2rem',
          }}
        >
          {prizes.map((prize, i) => (
            <PrizeCard key={prize.title} prize={prize} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
