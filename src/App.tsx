import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './styles/globals.css';
import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import SectionDivider from './components/sections/SectionDivider';
import About from './components/sections/About';
import Register from './components/sections/Register';
import PrizePool from './components/sections/PrizePool';
import GuestSpeaker from './components/sections/GuestSpeaker';
import Events from './components/sections/Events';
import Sponsors from './components/sections/Sponsors';
import FAQs from './components/sections/FAQs';
import ScanlineOverlay from './components/ui/ScanlineOverlay';
import Preloader from './components/layout/Preloader';
import CustomCursor from './components/ui/CustomCursor';
import { crtFlicker } from './lib/animations';
import CatalogPage, { type CatalogPath } from './pages/CatalogPage';
import { hasSeenPreloaderToday, markPreloaderSeenToday } from './lib/preloaderStorage';

const rawPath = window.location.pathname.replace(/\/$/, '') || '/';
if (rawPath === '/about') {
  window.history.replaceState(null, '', '/#about');
}
const isHackoutrSoftware = rawPath === '/events/hackoutr-software';
const isHackoutrHardware = rawPath === '/events/hackoutr-hardware';

if (isHackoutrSoftware && !window.location.hash) {
  window.location.hash = '#hackoutr-software';
} else if (isHackoutrHardware && !window.location.hash) {
  window.location.hash = '#hackoutr-hardware';
}

const path = rawPath === '/about'
  ? '/'
  : (isHackoutrSoftware || isHackoutrHardware)
  ? '/events'
  : rawPath;

const isCatalog = ['/events', '/fun-events', '/workshops'].includes(path);

export default function App() {
  const [preloaderDone, setPreloaderDone] = useState(() => {
    if (path !== '/') return true;
    return hasSeenPreloaderToday();
  });
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    if (!preloaderDone) {
      markPreloaderSeenToday();
    }
  }, [preloaderDone]);

  useEffect(() => {
    if (!preloaderDone) return;
    const heroEl = document.getElementById('hero');
    if (!heroEl) return;

    const onScroll = () => {
      setShowNavbar(heroEl.getBoundingClientRect().bottom <= 0);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [preloaderDone]);

  useEffect(() => {
    const titlePrefix = isHackoutrSoftware
      ? 'HackOUTR Software Edition — Competitions'
      : isHackoutrHardware
      ? 'HackOUTR Hardware Edition — Competitions'
      : path === '/events'
      ? 'Competitions'
      : path === '/fun-events'
      ? 'Fun Events'
      : path === '/workshops'
      ? 'Workshops'
      : 'Rewriting Reality';
    document.title = `${titlePrefix} — HACKFEST 2026 | OUTR`;
    const targetHash = window.location.hash || (rawPath === '/about' ? '#about' : '');
    if (!preloaderDone || !targetHash) return;
    const id = requestAnimationFrame(() => {
      const target = document.getElementById(decodeURIComponent(targetHash.slice(1)));
      target?.scrollIntoView();
    });
    return () => cancelAnimationFrame(id);
  }, [preloaderDone]);

  return (
    <>
      <CustomCursor />
      <AnimatePresence>
        {!preloaderDone && (
          <Preloader
            key="preloader"
            onDone={() => {
              markPreloaderSeenToday();
              setPreloaderDone(true);
            }}
          />
        )}
      </AnimatePresence>

      {preloaderDone && (
        <motion.div
          variants={crtFlicker}
          initial="initial"
          animate="animate"
        >
          <ScanlineOverlay />
          <a href="#main-content" className="skip-link">Skip to content</a>

          {/* Sticky Navbar — slides in after scrolling past the hero */}
          <AnimatePresence>
            {(showNavbar || path !== '/') && (
              <motion.div
                key="navbar"
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -80, opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.25, 0, 0.25, 1] }}
                style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100 }}
              >
                <Navbar />
              </motion.div>
            )}
          </AnimatePresence>

          <main id="main-content" tabIndex={-1}>
            {isCatalog ? <CatalogPage path={path as CatalogPath} /> : path !== '/' ? <div className="catalog-header min-h-[60vh]"><h1 className="font-display text-4xl">Page not found</h1><a href="/" className="festival-button mt-8">Return Home →</a></div> : <>
            <h1 className="sr-only">HACKFEST 2026 — Starting 4 November 2026</h1>
            <Hero />
            <SectionDivider />
            <About />
            <Register />
            <PrizePool />
            <GuestSpeaker />
            <Events />
            <Sponsors />
            <FAQs />
            </>}
          </main>
          <Footer />
        </motion.div>
      )}
    </>
  );
}
