import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlitchLogo from '../ui/GlitchLogo';
import { navigation } from '../../data/navigation';

const navLinks = navigation;
const currentPath = window.location.pathname.replace(/\/$/, '') || '/';

/* ─── Blinking dot status indicator ─────────────────────────────────── */
function SysStatus() {
  const [on, setOn] = useState(true);

  useEffect(() => {
    const id = setInterval(() => setOn(v => !v), 900);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="hidden lg:flex items-center gap-1.5 ml-4">
      <span
        className="inline-block w-2 h-2 rounded-full bg-hack-red"
        style={{ opacity: on ? 1 : 0.2, transition: 'none' }}
      />
      <span className="font-mono text-[9px] tracking-[0.2em] text-hack-black uppercase font-bold">
        SYS.ONLINE
      </span>
    </div>
  );
}

/* ─── Desktop nav link ───────────────────────────────────────────────── */
function NavLink({ link, active }: { link: typeof navLinks[0]; active: boolean }) {
  const [hovered, setHovered] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if ((link.href === '/' || link.section === 'hero') && currentPath === '/') {
      e.preventDefault();
      const hero = document.getElementById('hero');
      if (hero) {
        hero.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else if (link.href.startsWith('/#') && currentPath === '/') {
      e.preventDefault();
      const targetId = link.href.replace('/#', '');
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', `/#${targetId}`);
      }
    }
  };

  return (
    <a
      href={link.href}
      onClick={handleClick}
      aria-current={active ? (link.href.includes('#') ? 'location' : 'page') : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative font-display font-bold text-sm xl:text-base tracking-tight uppercase"
      style={{
        backgroundColor: hovered ? '#000' : 'transparent',
        color: hovered ? '#fde403' : active ? '#c00100' : '#000',
        padding: hovered ? '2px 6px' : '2px 6px',
        transition: 'none',
      }}
    >
      {active && !hovered ? (
        <>
          <span className="text-hack-black">[</span>
          {link.label}
          <span
            className="text-hack-red ml-0.5"
            style={{ animation: 'blink-nav 0.7s step-start infinite' }}
          >
            _
          </span>
          <span className="text-hack-black">]</span>
        </>
      ) : (
        link.label
      )}
    </a>
  );
}

/* ─── Navbar ─────────────────────────────────────────────────────────── */
export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const isActive = (link: typeof navLinks[0]) => {
    if (currentPath !== '/') {
      return currentPath === link.href;
    }
    if (link.href === '/' || link.section === 'hero') {
      return activeSection === 'hero';
    }
    if (link.section === 'about') {
      return activeSection === 'about';
    }
    if (link.section === 'sponsors') {
      return activeSection === 'sponsors';
    }
    if (link.section === 'events') {
      return activeSection === 'events';
    }
    return false;
  };

  useEffect(() => {
    if (!mobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileOpen(false);
        document.getElementById('mobile-menu-toggle')?.focus();
      }
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [mobileOpen]);

  // Track active section on home page based on scroll position
  useEffect(() => {
    if (currentPath !== '/') return;

    const sections = [
      'hero',
      'about',
      'register',
      'prize-pool',
      'speakers',
      'events',
      'sponsors',
      'faq',
    ];

    const handleScroll = () => {
      let current = '';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 250 && rect.bottom > 100) {
            current = id;
            break;
          }
        }
      }
      if (current) {
        setActiveSection(current);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <style>{`
        @keyframes blink-nav {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>

      <nav aria-label="Main navigation" className="relative w-full z-[100] bg-hack-yellow border-b-4 border-hack-black flex items-center justify-between gap-4 px-4 py-3 md:px-6 md:py-4 lg:py-5">
        {/* Logo + status */}
        <a
          href="/"
          aria-label="HACKFEST home"
          className="flex items-center shrink-0"
          onClick={(e) => {
            if (currentPath === '/') {
              e.preventDefault();
              const hero = document.getElementById('hero');
              if (hero) {
                hero.scrollIntoView({ behavior: 'smooth' });
              } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }
          }}
        >
          <GlitchLogo className="h-4 sm:h-[18px] md:h-5 lg:h-6 w-auto text-hack-black" />
          <SysStatus />
        </a>

        {/* Desktop nav links */}
        <div className="hidden lg:flex gap-2 xl:gap-5 items-center">
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              link={link}
              active={isActive(link)}
            />
          ))}
        </div>

        {/* Desktop CTA */}
        <motion.a
          href="https://drive.google.com/file/d/1Vnb9OGS_HjEma9LvXwF-3PN6JefXlWO0/view?usp=drivesdk"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden xl:inline-block bg-hack-black text-hack-yellow font-body font-black text-xs tracking-widest uppercase px-5 py-3"
          style={{ boxShadow: '4px 4px 0px #c00100' }}
          whileHover={{ boxShadow: '2px 2px 0px #c00100', x: 2, y: 2 }}
          whileTap={{ boxShadow: '0px 0px 0px #c00100', x: 4, y: 4 }}
          transition={{ duration: 0.04 }}
        >
          STUDENT BROCHURE
        </motion.a>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 relative z-[110]"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
          id="mobile-menu-toggle"
          aria-expanded={mobileOpen}
          aria-controls={mobileOpen ? 'mobile-navigation' : undefined}
        >
          <motion.span
            className="block w-7 h-[3px] bg-hack-black origin-center"
            animate={mobileOpen ? { rotate: 45, y: 7.5 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.15 }}
          />
          <motion.span
            className="block w-7 h-[3px] bg-hack-black"
            animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.1 }}
          />
          <motion.span
            className="block w-7 h-[3px] bg-hack-black origin-center"
            animate={mobileOpen ? { rotate: -45, y: -7.5 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.15 }}
          />
        </button>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-navigation"
            className="mobile-navigation fixed inset-0 z-[99] bg-hack-black flex flex-col items-center justify-center gap-6"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.3, ease: [0.25, 0, 0.25, 1] }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                aria-current={isActive(link) ? (link.href.includes('#') ? 'location' : 'page') : undefined}
                className="font-display font-bold text-3xl md:text-5xl tracking-tight uppercase text-hack-yellow hover:text-hack-red"
                style={{ transition: 'none' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: i * 0.05, duration: 0.2 }}
                onClick={(e) => {
                  setMobileOpen(false);
                  if ((link.href === '/' || link.section === 'hero') && currentPath === '/') {
                    e.preventDefault();
                    const hero = document.getElementById('hero');
                    if (hero) {
                      hero.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  } else if (link.href.startsWith('/#') && currentPath === '/') {
                    e.preventDefault();
                    const targetId = link.href.replace('/#', '');
                    const el = document.getElementById(targetId);
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth' });
                      window.history.pushState(null, '', `/#${targetId}`);
                    }
                  }
                }}
              >
                {isActive(link) ? `[ ${link.label}_ ]` : link.label}
              </motion.a>
            ))}

            <motion.a
              href="/events"
              className="mt-4 bg-hack-red text-white font-body font-black text-lg tracking-widest uppercase px-10 py-4 border-4 border-white"
              style={{ boxShadow: '8px 8px 0px #fde403' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
            >
              EXPLORE_EVENTS
            </motion.a>

            <motion.a
              href="https://drive.google.com/file/d/1Vnb9OGS_HjEma9LvXwF-3PN6JefXlWO0/view?usp=drivesdk"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-hack-yellow text-hack-black font-body font-black text-sm tracking-widest uppercase px-6 py-2.5 border-2 border-black"
              style={{ boxShadow: '4px 4px 0px #c00100' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
            >
              STUDENT BROCHURE ↗
            </motion.a>

            {/* HUD corners */}
            <div className="absolute top-16 left-4 w-8 h-8 border-t-4 border-l-4 border-hack-red" />
            <div className="absolute bottom-8 right-4 w-8 h-8 border-b-4 border-r-4 border-hack-red" />

            {/* Status */}
            <div className="absolute bottom-8 left-4 font-mono text-[10px] tracking-[0.3em] text-hack-red uppercase">
              NAV_PROTOCOL_ACTIVE
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
