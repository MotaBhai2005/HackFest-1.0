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
            Power the next cycle. Partner with HACKFEST 2026 and help bring new ideas to life.
          </p>
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
        <div className="text-center">
          <PrimaryButton href={sponsorshipMailto()} size="sm">Sponsor Us ↗</PrimaryButton>
          <p className="font-mono text-xs mt-6 break-words">{festival.sponsorship.email || 'Sponsorship contact email to be announced.'}</p>
        </div>
      </div>
    </section>
  );
}
