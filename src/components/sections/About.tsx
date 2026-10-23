import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { brutalistEntrance } from '../../lib/animations';
import CountUpNumber from '../ui/CountUpNumber';
import CyberBox from '../ui/CyberBox';

// ─── Constants ────────────────────────────────────────────────────────────────

const BODY_TEXT =
  "WELCOME TO HACKFEST 2026. ORGANIZED BY TEchSoC AT ODISHA UNIVERSITY OF TECHNOLOGY AND RESEARCH (OUTR), THIS IS ODISHA'S PREMIER TECH CONVERGENCE. 36 HOURS OF NON-STOP HARDWARE & SOFTWARE PROTOTYPING ACROSS 17+ CURATED COMPETITIONS, ARENAS, AND HANDS-ON MASTERCLASSES.";

const STATS = [
  {
    target: 36,
    suffix: 'H',
    pad: 0,
    label: 'UPTIME_REQUIRED',
    sub: 'Non-stop HackOUTR build',
    icon: 'clock',
  },
  {
    target: 17,
    suffix: '+',
    pad: 0,
    label: 'CURATED_EVENTS',
    sub: 'Hackathons, CTF, workshops',
    icon: 'nodes',
  },
];

// ─── Animation Variants ───────────────────────────────────────────────────────

const slamUp = {
  hidden: { y: 24, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 800,
      damping: 50,
      delay: i * 0.08,
    },
  }),
};

const barReveal = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: [0, 0.55, 1],
    transition: {
      duration: 0.18,
      times: [0, 0.45, 1],
      ease: 'linear',
      delay: 0.2,
    },
  },
};

const statCardEntrance = {
  hidden: { y: 20, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 700,
      damping: 50,
      delay: 0.1 + i * 0.1,
    },
  }),
};

const BLINK_STYLE = `@keyframes tw-blink { 0%,100%{opacity:1} 50%{opacity:0} }`;

// ─── TypewriterText ───────────────────────────────────────────────────────────

function TypewriterText({ trigger }: { trigger: boolean }) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    if (!trigger) return;

    if (shouldReduce) {
      setDisplayed(BODY_TEXT);
      setDone(true);
      return;
    }

    let i = 0;
    setDisplayed('');
    setDone(false);

    let doneTimeout: ReturnType<typeof setTimeout>;

    const id = setInterval(() => {
      i++;
      setDisplayed(BODY_TEXT.slice(0, i));
      if (i >= BODY_TEXT.length) {
        clearInterval(id);
        doneTimeout = setTimeout(() => setDone(true), 400);
      }
    }, 16);

    return () => {
      clearInterval(id);
      clearTimeout(doneTimeout);
    };
  }, [trigger, shouldReduce]);

  return (
    <div className="font-mono text-xs sm:text-sm text-white/90 uppercase leading-relaxed">
      <style>{BLINK_STYLE}</style>
      <span className="text-hack-yellow font-bold mr-1.5">&gt;</span>
      {displayed}
      {!done && (
        <span
          className="text-hack-yellow ml-0.5"
          style={{ animation: 'tw-blink 0.6s step-start infinite' }}
          aria-hidden
        >
          ▋
        </span>
      )}
    </div>
  );
}

// ─── StatIcon with CRT Glitch Spark ───────────────────────────────────────────

function StatIcon({ type, className }: { type: string; className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    if (shouldReduce) return;
    const el = ref.current;
    if (!el) return;

    let running = true;
    const ids: ReturnType<typeof setTimeout>[] = [];

    const flicker = () => {
      if (!running) return;
      const seq: [number, number][] = [
        [0.35, 0],
        [1, 35],
        [0.2, 45],
        [1, 30],
      ];
      let acc = 0;

      seq.forEach(([op, delay]) => {
        acc += delay;
        ids.push(
          setTimeout(() => {
            requestAnimationFrame(() => {
              if (el) el.style.opacity = String(op);
            });
          }, acc),
        );
      });

      ids.push(setTimeout(flicker, 2500 + Math.random() * 4000));
    };

    ids.push(setTimeout(flicker, Math.random() * 2000));

    return () => {
      running = false;
      ids.forEach(clearTimeout);
    };
  }, [shouldReduce]);

  const sharedProps = {
    ref,
    viewBox: '0 0 24 24',
    className,
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    style: { color: '#fde403', opacity: 1, transition: 'none' } as React.CSSProperties,
  };

  if (type === 'clock') {
    return (
      <svg {...sharedProps}>
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    );
  }

  // Nodes icon
  return (
    <svg {...sharedProps}>
      <circle cx="12" cy="5" r="3" />
      <circle cx="5" cy="19" r="3" />
      <circle cx="19" cy="19" r="3" />
      <line x1="12" y1="8" x2="5" y2="16" />
      <line x1="12" y1="8" x2="19" y2="16" />
      <line x1="8" y1="19" x2="16" y2="19" />
    </svg>
  );
}

// ─── Main About Component ─────────────────────────────────────────────────────

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const shouldReduce = useReducedMotion();

  return (
    <section
      ref={ref}
      id="about"
      className="bg-hack-black border-y-4 md:border-y-8 border-hack-red relative lg:h-[calc(100vh-4.5rem)] lg:min-h-[560px] lg:max-h-[820px] flex flex-col justify-between overflow-hidden"
    >
      {/* ── Top Cyber Status Bar ── */}
      <div className="bg-hack-black border-b-2 border-hack-red/40 px-4 md:px-8 py-2 flex flex-wrap items-center justify-between gap-2 text-[10px] md:text-xs font-mono text-white/70 shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-green-400 animate-pulse" />
          <span className="text-hack-yellow font-bold uppercase tracking-wider">
            SYSTEM // TEchSoC_OUTR
          </span>
          <span className="hidden sm:inline text-white/40">|</span>
          <span className="hidden sm:inline uppercase">CORE_DIAGNOSTICS_ONLINE</span>
        </div>
        <div className="flex items-center gap-3 text-hack-yellow/80 font-bold tracking-wider text-[10px] md:text-xs">
          <span>04–06 NOV 2026</span>
          <span>·</span>
          <span>OUTR BHUBANESWAR</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 lg:min-h-0">
        {/* ── Left Column: The Mission & Narrative (7 Cols) ── */}
        <div className="lg:col-span-7 bg-hack-red border-b-4 lg:border-b-0 lg:border-r-4 border-hack-black flex flex-col justify-between p-6 sm:p-8 lg:p-10 xl:p-12 relative overflow-hidden">
          {/* Faint Background Watermark */}
          <div
            aria-hidden
            className="absolute -right-6 -bottom-8 md:-bottom-12 font-display font-black text-[120px] sm:text-[160px] md:text-[220px]
              tracking-tighter leading-none select-none pointer-events-none z-0 text-black/15"
          >
            01
          </div>

          <div className="relative z-10 flex flex-col justify-between h-full">
            <div>
              {/* Header Badge */}
              <motion.div
                custom={0}
                variants={shouldReduce ? brutalistEntrance : slamUp}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                className="inline-flex items-center gap-2 bg-hack-black px-3 py-1 text-xs font-mono font-bold text-hack-yellow tracking-widest uppercase mb-3 sm:mb-4"
              >
                <span>[</span>
                <span>ABOUT // THE_GENESIS</span>
                <span>]</span>
              </motion.div>

              {/* Kinetic Typography Headline */}
              <motion.h2
                custom={1}
                variants={shouldReduce ? brutalistEntrance : slamUp}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                className="font-display font-black text-3xl sm:text-5xl lg:text-4xl xl:text-6xl text-white uppercase leading-[0.92] tracking-tight mb-3 sm:mb-4"
              >
                ANALOG HEART.
                <br />
                <span className="text-hack-yellow">DIGITAL MIND.</span>
                <br />
                RAW EXECUTION.
              </motion.h2>

              {/* Decorative Divider Bar */}
              <motion.div
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                variants={shouldReduce ? { hidden: { scaleX: 0 }, visible: { scaleX: 1 } } : barReveal}
                className="h-2 w-24 bg-hack-black mb-4 sm:mb-6 origin-left"
              />

              {/* Narrative Content */}
              <motion.div
                custom={2}
                variants={shouldReduce ? brutalistEntrance : slamUp}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                className="text-white/95 font-body text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl"
              >
                <p>
                  Organized by the <strong>Technical Society (TEchSoC)</strong> at{' '}
                  <strong>Odisha University of Technology and Research (OUTR, Bhubaneswar)</strong>,
                  HACKFEST 2026 is Odisha&apos;s premier 3-day engineering festival uniting programmers,
                  hardware makers, and innovators from across the country.
                </p>
              </motion.div>
            </div>

            {/* Bottom Left Readout */}
            <div className="relative z-10 pt-4 mt-6 border-t-2 border-black/30 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-white/85 shrink-0">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-hack-yellow" />
                HOST: TEchSoC × OUTR BHUBANESWAR
              </span>
              <span className="uppercase text-hack-yellow font-bold tracking-wider">
                FORMAT: HYBRID // CAMPUS ARENA
              </span>
            </div>
          </div>
        </div>

        {/* ── Right Column: Interactive Diagnostics & Stat Matrix (5 Cols) ── */}
        <div className="lg:col-span-5 bg-[#0a0a0a] flex flex-col justify-between p-6 sm:p-8 lg:p-8 xl:p-10 relative">
          <div className="relative z-10 flex flex-col justify-between h-full gap-4 sm:gap-6">
            {/* Terminal Header */}
            <div className="flex items-center justify-between border-b border-white/15 pb-2.5">
              <span className="font-mono font-bold text-xs tracking-[0.2em] text-hack-yellow uppercase flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-hack-red animate-pulse" />
                TELEMETRY_DASHBOARD
              </span>
              <span className="font-mono text-[10px] text-white/40 uppercase">v2.6_STABLE</span>
            </div>

            {/* Typewriter Terminal Console */}
            <div className="bg-[#111111] border-2 border-hack-yellow/40 p-4 shadow-[4px_4px_0_0_#c00100] relative">
              <div className="font-mono text-[10px] text-white/50 mb-1.5 uppercase flex items-center justify-between">
                <span>ROOT@HACKFEST:~# ./manifesto.sh</span>
                <span className="text-green-400">STATUS: 200 OK</span>
              </div>
              <TypewriterText trigger={inView} />
            </div>

            {/* 2 Stat Cards (Single Row: 36H & 17+) */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  custom={i}
                  variants={statCardEntrance}
                  className="relative"
                >
                  {/* Hard drop shadow */}
                  <div
                    aria-hidden
                    className="absolute inset-0 z-0 bg-hack-red translate-x-1 translate-y-1"
                    style={{
                      clipPath:
                        'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)',
                    }}
                  />

                  {/* Main Cyber Box Card */}
                  <motion.div
                    className="relative z-10"
                    whileHover={
                      shouldReduce
                        ? {}
                        : {
                            x: -2,
                            y: -2,
                            transition: { duration: 0.1 },
                          }
                    }
                  >
                    <CyberBox
                      bgClass="bg-[#121212]"
                      borderClass="bg-hack-yellow"
                      borderWidth={2}
                      size="sm"
                      innerClassName="p-3.5 sm:p-4 flex flex-col justify-between min-h-[96px] sm:min-h-[105px]"
                    >
                      <div className="flex items-start justify-between gap-1">
                        <CountUpNumber
                          target={stat.target}
                          suffix={stat.suffix}
                          pad={stat.pad}
                          duration={1.6}
                          trigger={inView}
                          className="font-display font-bold text-3xl sm:text-4xl text-white leading-none tracking-tight"
                        />
                        <StatIcon type={stat.icon} className="h-6 w-6 shrink-0 mt-0.5" />
                      </div>

                      <div>
                        <div className="font-mono font-bold text-[11px] text-hack-yellow tracking-wider uppercase mt-2">
                          {stat.label}
                        </div>
                        <div className="font-mono text-[10px] text-white/60 leading-tight mt-0.5">
                          {stat.sub}
                        </div>
                      </div>
                    </CyberBox>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Quick Event Matrix Breakdown */}
            <div className="bg-[#111111] border border-white/20 p-3 flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] sm:text-xs text-white/70">
              <span className="text-hack-yellow font-bold uppercase">EVENT BREAKDOWN:</span>
              <span className="text-white/90">2 Hackathons</span>
              <span>·</span>
              <span className="text-white/90">5 Flagships</span>
              <span>·</span>
              <span className="text-white/90">7 Fun Events</span>
              <span>·</span>
              <span className="text-white/90">3 Workshops</span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-1">
              <a
                href="/events"
                className="flex-1 text-center py-3 px-3 bg-hack-yellow text-hack-black font-body font-black text-xs uppercase tracking-wider border-2 border-hack-yellow hover:bg-white hover:border-white transition-colors shadow-[3px_3px_0_0_#c00100]"
              >
                Explore All 17 Events →
              </a>
              <a
                href="/events#hackoutr"
                className="text-center py-3 px-3 bg-transparent text-white font-mono font-bold text-xs uppercase tracking-wider border-2 border-white/30 hover:border-hack-yellow hover:text-hack-yellow transition-colors whitespace-nowrap"
              >
                HackOUTR Tracks ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
