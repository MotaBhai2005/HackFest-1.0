import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { slideFromLeft, slideFromRight } from '../../lib/animations';
import { festival } from '../../data/festival';
import RGBGlitchImage from '../ui/RGBGlitchImage';

export default function GuestSpeaker() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} id="speakers" className="bg-hack-yellow py-16 md:py-24 px-4 md:px-6">
      <div className="max-w-7xl w-full mx-auto">
        <motion.h2 initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.12 }}
          className="font-display font-bold text-[36px] sm:text-[48px] md:text-[7vw] lg:text-[100px] xl:text-[128px] leading-[0.85] tracking-tighter uppercase text-hack-black mb-10 md:mb-20">
          GUEST ENTITIES
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 items-start">
          {festival.speakers.map((signal, i) => (
            <motion.article key={signal} className="bg-hack-black border-4 border-hack-black flex flex-col relative group"
              variants={i % 2 === 0 ? slideFromLeft : slideFromRight}
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}>
              <div className="relative w-full aspect-square overflow-hidden border-[8px] md:border-[16px] border-hack-black -mb-4 md:-mb-8">
                <RGBGlitchImage src="/images/mystery-speaker.svg" alt="Mystery speaker silhouette" />
                <div className="absolute inset-0 bg-white mix-blend-saturation group-hover:opacity-0 transition-opacity duration-500 pointer-events-none" />
              </div>
              <div className="bg-white border-4 border-hack-black shadow-[8px_8px_0px_#000] md:shadow-[12px_12px_0px_#000] p-4 md:p-6 relative z-[1]">
                <p className="font-mono font-bold text-[10px] md:text-xs text-hack-red mb-2 uppercase">{signal}</p>
                <h3 className="font-body font-black text-lg sm:text-xl md:text-2xl lg:text-3xl text-hack-black uppercase tracking-tight leading-none mb-3">To Be Announced</h3>
                <div className="border-t-2 border-hack-black pt-3 md:pt-[18px] flex justify-between flex-wrap gap-2 items-center">
                  <span className="bg-hack-black px-2 py-0.5 font-mono text-[8px] md:text-[10px] text-white uppercase">IDENTITY: ENCRYPTED</span>
                  <span className="font-mono text-[8px] md:text-[10px] text-hack-red uppercase">REVEAL_PENDING</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
