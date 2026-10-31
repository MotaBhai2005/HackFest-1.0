import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function EarlyBirdBanner() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    try {
      if (sessionStorage.getItem('hide_early_bird_banner') === 'true') {
        setVisible(false);
      }
    } catch {
      // Ignore storage access errors
    }
  }, []);

  const handleDismiss = () => {
    setVisible(false);
    try {
      sessionStorage.setItem('hide_early_bird_banner', 'true');
    } catch {
      // Ignore
    }
  };

  if (!visible) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.aside
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          aria-label="Limited time announcement"
          className="relative z-[120] bg-hack-black border-b-2 border-hack-yellow text-white overflow-hidden shadow-[0_4px_20px_rgba(253,228,3,0.15)]"
        >
          {/* Top hazard accent line */}
          <div className="h-1 w-full bg-gradient-to-r from-hack-red via-hack-yellow to-hack-red animate-pulse" />

          <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 sm:py-2 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-xs sm:text-sm">
            {/* Promo text & badges */}
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              <span className="font-mono text-[10px] sm:text-xs font-black uppercase bg-hack-yellow text-hack-black px-2 py-0.5 tracking-wider inline-flex items-center gap-1 shrink-0">
                <span className="animate-ping inline-block w-1.5 h-1.5 rounded-full bg-hack-red" />
                FLASH OFFER
              </span>
              <p className="font-mono font-medium text-white/95 leading-tight">
                <span className="text-hack-yellow font-bold">EARLY BIRD ₹299</span> for both HackOUTR Hackathons (Software & Hardware)!
                <span className="text-white/60 ml-1.5 hidden md:inline">Regular: <span className="line-through">₹499</span></span>
                <span className="text-hack-yellow/90 font-bold ml-2">Ends tonight: 29/10/26 11:59 PM IST</span>
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2 sm:gap-3 ml-auto sm:ml-0 shrink-0">
              <a
                href="/events#hackoutr"
                className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider px-3 py-1 bg-hack-yellow hover:bg-white text-hack-black transition-colors inline-flex items-center gap-1 shadow-[2px_2px_0_0_#c00100]"
              >
                <span>Claim ₹299 Offer</span>
                <span aria-hidden="true">↗</span>
              </a>

              <button
                type="button"
                onClick={handleDismiss}
                className="p-1 text-white/50 hover:text-white hover:bg-white/10 transition-colors rounded"
                aria-label="Dismiss early bird offer banner"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
