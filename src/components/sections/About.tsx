import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { brutalistEntrance } from '../../lib/animations';
import CountUpNumber from '../ui/CountUpNumber';

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
      stiffness: 700,
      damping: 45,
      delay: i * 0.08,
    },
  }),
};

const barReveal = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: {
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1],
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
      stiffness: 600,
      damping: 40,
      delay: 0.1 + i * 0.1,
    },
  }),
};

const BLINK_STYLE = `@keyframes tw-blink { 0%,100%{opacity:1} 50%{opacity:0} }`;

// ─── Chamfer Clip Paths (Two Opposite Diagonal Cut Corners) ──────────────────

const CHAMFER_CARD =
  'polygon(16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%, 0 16px)';

const CHAMFER_SM =
  'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)';

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
    <div className="font-mono text-xs sm:text-sm text-neutral-200 uppercase leading-relaxed tracking-wide">
      <style>{BLINK_STYLE}</style>
      <span className="text-hack-yellow font-bold mr-1.5">&gt;</span>
      {displayed}
      {!done && (
        <span
          className="text-hack-yellow ml-0.5 inline-block"
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
        [0.4, 0],
        [1, 35],
        [0.3, 45],
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
    style: { opacity: 1, transition: 'none' } as React.CSSProperties,
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
      className="bg-[#07080c] text-white border-y border-white/10 relative lg:min-h-[580px] flex flex-col justify-between overflow-hidden"
    >
      {/* ── Background Cyber Ambient Glow & Grid ── */}
      <div
        aria-hidden
        className="absolute top-1/4 -left-32 w-96 h-96 bg-hack-red/15 rounded-full blur-[130px] pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute bottom-10 right-10 w-96 h-96 bg-hack-yellow/10 rounded-full blur-[120px] pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"
      />

      {/* ── Top Cyber Status Bar ── */}
      <div className="bg-[#0b0d14]/90 backdrop-blur-md border-b border-white/10 px-4 md:px-8 py-2 flex flex-wrap items-center justify-between gap-3 shrink-0 z-20 relative before:absolute before:inset-x-0 before:top-0 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent">
        {/* Left: System Status Chip */}
        <div className="flex items-center gap-3">
          <div
            className="p-[1px] bg-white/20 shadow-sm"
            style={{ clipPath: CHAMFER_SM }}
          >
            <div
              className="flex items-center gap-2 px-3 py-1 bg-[#0b0d14]"
              style={{ clipPath: CHAMFER_SM }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-hack-red opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-hack-red shadow-[0_0_8px_#c00100]" />
              </span>
              <span className="font-display font-bold text-[11px] text-hack-yellow uppercase tracking-wider">
                TEchSoC × OUTR
              </span>
              <span className="text-white/20">/</span>
              <span className="font-body text-[10px] text-hack-red font-semibold uppercase tracking-widest">
                SYSTEM ONLINE
              </span>
            </div>
          </div>

          <span className="hidden sm:inline font-mono text-[10px] text-white/40 uppercase tracking-widest">
            CORE_DIAGNOSTICS_ACTIVE
          </span>
        </div>

        {/* Center: Live Telemetry Breadcrumbs (Desktop) */}
        <div className="hidden lg:flex items-center gap-3 text-xs font-body text-neutral-400">
          <span className="flex items-center gap-1.5 text-neutral-200 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-hack-red shadow-[0_0_6px_#c00100]" />
            EDITION // 2026
          </span>
          <span className="text-white/15">·</span>
          <span className="text-neutral-300">3-DAY NATIONAL ENGINEERING FESTIVAL</span>
          <span className="text-white/15">·</span>
          <span className="px-2 py-0.5 rounded-sm bg-white/5 border border-white/10 text-[10px] font-mono text-hack-yellow uppercase">
            HYBRID ARENA
          </span>
        </div>

        {/* Right: Date & Venue Badges */}
        <div className="flex items-center gap-2">
          <div
            className="p-[1px] bg-hack-yellow/60 shadow-[0_0_14px_rgba(253,228,3,0.2)] shrink-0"
            style={{ clipPath: CHAMFER_SM }}
          >
            <div
              className="px-3 py-1 bg-hack-yellow/15 text-hack-yellow font-display font-bold text-xs tracking-wider"
              style={{ clipPath: CHAMFER_SM }}
            >
              04–06 NOV 2026
            </div>
          </div>
          <div
            className="p-[1px] bg-white/20 shrink-0"
            style={{ clipPath: CHAMFER_SM }}
          >
            <div
              className="px-3 py-1 bg-white/[0.04] text-neutral-300 font-body text-xs tracking-wide"
              style={{ clipPath: CHAMFER_SM }}
            >
              OUTR BHUBANESWAR
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Two-Column Layout ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 relative z-10">
        {/* ── Left Column: The Mission & Narrative (7 Cols) ── */}
        <div className="lg:col-span-7 bg-[#0b0d13]/70 backdrop-blur-md border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col justify-between p-6 sm:p-8 lg:p-10 xl:p-12 relative overflow-hidden">
          {/* Faint Background Watermark */}
          <div
            aria-hidden
            className="absolute -right-6 -bottom-8 md:-bottom-12 font-display font-black text-[120px] sm:text-[160px] md:text-[220px]
              tracking-tighter leading-none select-none pointer-events-none z-0 text-white/[0.03]"
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
                className="inline-flex items-center gap-2 bg-white/[0.05] border border-white/10 px-3.5 py-1 rounded-full text-xs font-mono font-bold text-hack-yellow tracking-widest uppercase mb-4 sm:mb-6 shadow-sm"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-hack-red shadow-[0_0_6px_#c00100] animate-pulse" />
                <span>01 // THE_GENESIS</span>
              </motion.div>

              {/* Kinetic Typography Headline */}
              <motion.h2
                custom={1}
                variants={shouldReduce ? brutalistEntrance : slamUp}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                className="font-display font-black text-3xl sm:text-5xl lg:text-4xl xl:text-6xl text-white uppercase leading-[0.95] tracking-tight mb-4 sm:mb-5"
              >
                ANALOG HEART.
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-hack-yellow via-amber-300 to-yellow-500 drop-shadow-[0_0_25px_rgba(253,228,3,0.25)]">
                  DIGITAL MIND.
                </span>
                <br />
                <span className="text-neutral-200">RAW EXECUTION.</span>
              </motion.h2>

              {/* Decorative Gradient Bar */}
              <motion.div
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                variants={barReveal}
                className="h-1 w-24 bg-gradient-to-r from-hack-red via-hack-yellow to-transparent rounded-full mb-6 origin-left"
              />

              {/* Narrative Content */}
              <motion.div
                custom={2}
                variants={shouldReduce ? brutalistEntrance : slamUp}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                className="text-neutral-300 font-body text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl"
              >
                <p>
                  Organized by the <strong className="text-white font-semibold">Technical Society (TEchSoC)</strong> at{' '}
                  <strong className="text-white font-semibold">Odisha University of Technology and Research (OUTR, Bhubaneswar)</strong>,
                  HACKFEST 2026 is Odisha&apos;s premier 3-day engineering festival uniting programmers,
                  hardware makers, and innovators from across the country.
                </p>
              </motion.div>
            </div>

            {/* Bottom Left Readout */}
            <div className="relative z-10 pt-5 mt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-neutral-400 shrink-0">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-hack-red shadow-[0_0_8px_#c00100]" />
                HOST: <span className="text-neutral-200">TEchSoC × OUTR BHUBANESWAR</span>
              </span>
              <span className="px-2.5 py-0.5 rounded bg-white/5 border border-white/10 text-hack-yellow font-semibold tracking-wider uppercase text-[11px]">
                FORMAT: HYBRID // CAMPUS ARENA
              </span>
            </div>
          </div>
        </div>

        {/* ── Right Column: Interactive Diagnostics & Stat Matrix (5 Cols) ── */}
        <div className="lg:col-span-5 bg-[#080a0f]/90 flex flex-col justify-between p-6 sm:p-8 lg:p-8 xl:p-10 relative">
          <div className="relative z-10 flex flex-col justify-between h-full gap-5 sm:gap-6">
            {/* Terminal Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="font-mono font-semibold text-xs tracking-[0.2em] text-hack-yellow uppercase flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-hack-red shadow-[0_0_8px_#c00100]" />
                TELEMETRY_DASHBOARD
              </span>
              <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest">v2.6_STABLE</span>
            </div>

            {/* Typewriter Terminal Console */}
            <div
              className="p-[1px] bg-white/10 hover:bg-white/20 transition-colors shadow-[0_8px_24px_rgba(0,0,0,0.4)] relative group"
              style={{ clipPath: CHAMFER_CARD }}
            >
              <div
                className="bg-[#0e1118]/95 backdrop-blur-md p-4 relative"
                style={{ clipPath: CHAMFER_CARD }}
              >
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-hack-yellow/40 to-transparent" />
                <div className="font-mono text-[10px] text-white/50 mb-2 uppercase flex items-center justify-between">
                  <span className="text-neutral-400 font-medium">ROOT@HACKFEST:~# ./manifesto.sh</span>
                  <span
                    className="p-[1px] bg-hack-red/40 inline-block"
                    style={{ clipPath: CHAMFER_SM }}
                  >
                    <span
                      className="block text-hack-red font-semibold px-2 py-0.5 bg-hack-red/10 text-[10px]"
                      style={{ clipPath: CHAMFER_SM }}
                    >
                      STATUS: 200 OK
                    </span>
                  </span>
                </div>
                <TypewriterText trigger={inView} />
              </div>
            </div>

            {/* 2 Stat Cards (Single Row: 36H & 17+) */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  custom={i}
                  variants={statCardEntrance}
                  className="relative group"
                >
                  <motion.div
                    whileHover={
                      shouldReduce
                        ? {}
                        : {
                            y: -3,
                            transition: { duration: 0.15 },
                          }
                    }
                    className="h-full"
                  >
                    <div
                      className="h-full p-[1px] bg-white/10 hover:bg-hack-yellow/40 transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.4)] group-hover:shadow-[0_0_30px_rgba(253,228,3,0.15)] relative"
                      style={{ clipPath: CHAMFER_CARD }}
                    >
                      <div
                        className="h-full bg-gradient-to-b from-[#131722]/95 to-[#0a0c12]/98 p-4 sm:p-5 flex flex-col justify-between relative overflow-hidden"
                        style={{ clipPath: CHAMFER_CARD }}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <CountUpNumber
                            target={stat.target}
                            suffix={stat.suffix}
                            pad={stat.pad}
                            duration={1.6}
                            trigger={inView}
                            className="font-display font-black text-4xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-neutral-300 leading-none tracking-tight"
                          />
                          <div
                            className="w-10 h-10 p-[1px] bg-hack-yellow/20 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-hack-yellow/40 transition-all duration-300"
                            style={{ clipPath: CHAMFER_SM }}
                          >
                            <div
                              className="w-full h-full bg-[#131722] flex items-center justify-center text-hack-yellow"
                              style={{ clipPath: CHAMFER_SM }}
                            >
                              <StatIcon type={stat.icon} className="h-5 w-5" />
                            </div>
                          </div>
                        </div>

                        <div className="mt-4">
                          <div className="font-display font-bold text-xs tracking-wider text-hack-yellow uppercase flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 bg-hack-yellow/80 shadow-[0_0_6px_#fde403]" />
                            {stat.label.replace('_', ' ')}
                          </div>
                          <div className="font-body text-xs text-neutral-400 leading-relaxed mt-1">
                            {stat.sub}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Quick Event Matrix Breakdown */}
            <div
              className="p-[1px] bg-white/10 hover:bg-hack-yellow/40 transition-colors duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.35)] relative"
              style={{ clipPath: CHAMFER_CARD }}
            >
              <div
                className="bg-gradient-to-b from-[#11141e]/95 to-[#0a0c12]/98 p-3.5 sm:p-4"
                style={{ clipPath: CHAMFER_CARD }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-display font-bold text-xs tracking-wider text-hack-yellow uppercase flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-hack-yellow shadow-[0_0_8px_#fde403] animate-pulse" />
                    EVENT BREAKDOWN
                  </span>
                  <span
                    className="p-[1px] bg-white/15 inline-block"
                    style={{ clipPath: CHAMFER_SM }}
                  >
                    <span
                      className="block text-[10px] font-mono font-medium text-neutral-400 uppercase tracking-wider px-2 py-0.5 bg-white/5"
                      style={{ clipPath: CHAMFER_SM }}
                    >
                      17 TOTAL
                    </span>
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { count: '2', name: 'Hackathons', glow: 'group-hover/chip:text-hack-yellow' },
                    { count: '5', name: 'Flagships', glow: 'group-hover/chip:text-amber-300' },
                    { count: '7', name: 'Fun Events', glow: 'group-hover/chip:text-rose-400' },
                    { count: '3', name: 'Workshops', glow: 'group-hover/chip:text-emerald-400' },
                  ].map((item) => (
                    <div
                      key={item.name}
                      className="p-[1px] bg-white/10 hover:bg-white/25 transition-all duration-200 group/chip"
                      style={{ clipPath: CHAMFER_SM }}
                    >
                      <div
                        className="bg-white/[0.03] group-hover/chip:bg-white/[0.08] p-2.5 flex flex-col items-center justify-center text-center transition-all duration-200"
                        style={{ clipPath: CHAMFER_SM }}
                      >
                        <span className={`font-display font-black text-lg sm:text-xl text-white ${item.glow} group-hover/chip:scale-110 transition-all duration-200 leading-tight`}>
                          {item.count}
                        </span>
                        <span className="font-body text-[11px] text-neutral-400 font-medium tracking-tight mt-0.5 whitespace-nowrap">
                          {item.name}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-1">
              <a
                href="/events"
                className="flex-1 text-center py-3.5 px-4 bg-hack-yellow text-black font-body font-bold text-xs uppercase tracking-wider hover:bg-yellow-300 transition-all duration-200 shadow-[0_0_20px_rgba(253,228,3,0.25)] hover:shadow-[0_0_30px_rgba(253,228,3,0.45)] transform hover:-translate-y-0.5 active:translate-y-0"
                style={{ clipPath: CHAMFER_SM }}
              >
                Explore All 17 Events →
              </a>
              <a
                href="/events#hackoutr"
                className="text-center p-[1px] bg-white/20 hover:bg-hack-yellow/60 transition-all duration-200 whitespace-nowrap transform hover:-translate-y-0.5 active:translate-y-0"
                style={{ clipPath: CHAMFER_SM }}
              >
                <span
                  className="block py-3.5 px-4 bg-[#0a0c12] text-white hover:text-hack-yellow font-mono font-medium text-xs uppercase tracking-wider transition-colors"
                  style={{ clipPath: CHAMFER_SM }}
                >
                  HackOUTR Tracks ↗
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
