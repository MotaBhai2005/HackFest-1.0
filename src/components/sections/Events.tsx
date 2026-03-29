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
      className="bg-hack-black border-t-4 md:border-t-8 border-b-4 md:border-b-8 border-hack-red py-16 md:py-26"
    >
      <div className="max-w-7xl w-full mx-auto px-4 md:px-6">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.12 }}
          className="font-display font-bold text-3xl sm:text-4xl md:text-[6vw] lg:text-7xl
            leading-none tracking-tight uppercase text-hack-yellow text-shadow-glitch mb-8 md:mb-16"
        >
          EXECUTION_CYCLE
        </motion.h2>

        {/* Schedule table */}
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
          className="border-4 md:border-8 border-hack-red overflow-hidden"
        >
          {schedule.map((item, i) => (
            <motion.div
              key={item.time}
              custom={i}
              variants={brutalistEntrance}
              whileHover={{ x: 4, transition: { duration: 0.1 } }}
              className={`
                ${item.highlight ? 'bg-hack-red' : 'bg-white'}
                ${i < schedule.length - 1 ? 'border-b-4 md:border-b-8 border-hack-red' : ''}
                p-4 sm:p-6 md:p-8
                grid grid-cols-2 sm:grid-cols-[1fr_1fr_2fr] items-center gap-2 sm:gap-4
                cursor-default
              `}
            >
              {/* Time */}
              <div className={`font-body font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-none
                ${item.highlight ? 'text-white' : 'text-hack-black'}`}>
                {item.time}
              </div>

              {/* Code */}
              <div className={`font-body font-bold text-[8px] sm:text-[10px] md:text-xs lg:text-sm tracking-[0.15em] md:tracking-[0.2em] uppercase
                ${item.highlight ? 'text-hack-black' : 'text-hack-red'}
                hidden sm:block`}>
                {item.code}
              </div>

              {/* Event name */}
              <div className={`font-body font-black text-sm sm:text-base md:text-xl lg:text-[30px] leading-tight
                ${item.highlight ? 'text-white' : 'text-hack-black'}
                col-span-2 sm:col-span-1`}>
                {item.event}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
