import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { brutalistEntrance } from '../../lib/animations';
import { festival, sponsorshipMailto } from '../../data/festival';
import PrimaryButton from '../ui/PrimaryButton';

export default function Sponsors() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} id="sponsors" className="bg-hack-yellow py-16 md:py-24 relative">
      <div className="absolute top-0 left-0 right-0 h-1 bg-hack-red" />
      <div className="max-w-7xl w-full mx-auto px-4 md:px-6 flex flex-col gap-10 md:gap-16">
        <motion.div initial="hidden" animate={inView ? 'visible' : 'hidden'}
          variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
          className="flex flex-col items-center gap-3 md:gap-4">
          <motion.div custom={0} variants={brutalistEntrance} className="w-16 md:w-24 h-3 md:h-4 hazard-stripe-sm" />
          <motion.h2 custom={1} variants={brutalistEntrance}
            className="font-body font-black text-xs sm:text-sm md:text-base lg:text-xl tracking-[0.3em] md:tracking-[0.5em] uppercase text-hack-black text-center">
            SPONSORSHIP_NODES
          </motion.h2>
          <p className="font-mono text-xs text-center text-hack-black/70 max-w-xl leading-relaxed">
            Meet the partners helping bring HACKFEST 2026 to life.
          </p>
        </motion.div>
        <motion.div
          initial="hidden" animate={inView ? 'visible' : 'hidden'}
          custom={2} variants={brutalistEntrance}
          className="hackerrank-partner border-4 border-hack-black bg-[#141419] text-white shadow-[8px_8px_0_0_#000]"
        >
          <div className="px-6 py-4 sm:px-10 border-b border-white/15 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-bold">Coding Partner</p>
            <span className="text-xs text-white/65">HACKFEST 2026</span>
          </div>
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center p-6 sm:p-10 lg:p-14">
            <div className="py-8 sm:py-12 lg:py-16">
              <img
                src="/images/partners/hackerrank-logo-light.svg"
                alt="HackerRank"
                width="616" height="65"
                loading="lazy"
                className="w-full max-w-[440px] h-auto mx-auto"
              />
            </div>
            <div>
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                Built on ideas.<br />Driven by <span className="text-[#05C770]">skills.</span>
              </h3>
              <p className="text-base leading-relaxed text-white/75 mt-5 max-w-lg">
                HackerRank joins HACKFEST 2026 as our coding partner, supporting a community ready to solve problems, build together, and put their skills into practice.
              </p>
              <a
                href="https://www.hackerrank.com/"
                target="_blank" rel="noopener noreferrer"
                aria-label="Explore HackerRank (opens in a new tab)"
                className="inline-flex items-center gap-6 mt-7 px-6 py-3 bg-[#05C770] text-[#141419] font-bold hover:bg-[#DBFFC2] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white transition-colors"
              >
                Explore HackerRank <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </motion.div>
        <motion.div initial="hidden" animate={inView ? 'visible' : 'hidden'}
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          className="border-4 border-hack-black grid grid-cols-2 lg:grid-cols-4">
          {festival.sponsorship.placeholders.map((name, i) => (
            <motion.div key={name} custom={i} variants={brutalistEntrance}
              className={`sponsor-node flex flex-col items-center justify-center text-center gap-3 p-5 sm:p-8 md:p-10 min-h-32 hover:bg-white transition-colors duration-100 ${i % 2 === 0 ? 'border-r-4 border-hack-black' : ''} ${i < 2 ? 'border-b-4 lg:border-b-0 border-hack-black' : ''} ${i === 1 ? 'lg:border-r-4 lg:border-hack-black' : ''}`}
              whileHover={{ scale: 1.02 }}>
              <span className="font-display font-bold text-base sm:text-lg md:text-xl lg:text-2xl tracking-tighter text-hack-black uppercase">{name}</span>
              <span className="font-mono text-[9px] text-hack-red uppercase">Sponsor slot · To Be Announced</span>
            </motion.div>
          ))}
        </motion.div>
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <PrimaryButton
              href={festival.sponsorship.brochureUrl}
              target="_blank"
              rel="noopener noreferrer"
              size="sm"
              variant="dark"
            >
              Sponsorship Brochure ↗
            </PrimaryButton>
            <PrimaryButton
              href={sponsorshipMailto()}
              size="sm"
              variant="primary"
            >
              Sponsor Us ↗
            </PrimaryButton>
          </div>
          <p className="font-mono text-xs mt-2 break-words text-hack-black/80">
            Direct enquiries:{' '}
            <a
              href={`mailto:${festival.sponsorship.email}`}
              className="font-bold underline hover:text-hack-red transition-colors"
            >
              {festival.sponsorship.email}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
