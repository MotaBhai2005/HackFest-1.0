import { motion } from 'framer-motion';
import GlitchText from '../ui/GlitchText';

const navLinks = [
  { label: '01_About', href: '#about' },
  { label: '02_Register', href: '#register' },
  { label: '03_Prize Pool', href: '#prize-pool' },
  { label: '04_Events', href: '#events' },
  { label: '05_FAQ', href: '#faq' },
];

export default function Navbar() {
  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: '#fde403',
        borderBottom: '4px solid #000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 24px 20px',
      }}
    >
      {/* Logo */}
      <GlitchText
        as="span"
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 700,
          fontSize: '1.875rem',
          letterSpacing: '-0.05em',
          color: '#000',
          lineHeight: 1,
        }}
      >
        HACK_FEST
      </GlitchText>

      {/* Nav links */}
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: '1rem',
              letterSpacing: '-0.04em',
              textTransform: 'uppercase',
              color: '#000',
              transition: 'color 0.05s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#c00100')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#000')}
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* CTA */}
      <motion.a
        href="#register"
        style={{
          background: '#000',
          color: '#fde403',
          fontFamily: "'Inter', sans-serif",
          fontWeight: 900,
          fontSize: '0.875rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          padding: '12px 32px',
          boxShadow: '4px 4px 0px #c00100',
          display: 'inline-block',
        }}
        whileHover={{ boxShadow: '2px 2px 0px #c00100', x: 2, y: 2 }}
        whileTap={{ boxShadow: '0px 0px 0px #c00100', x: 4, y: 4 }}
        transition={{ duration: 0.04 }}
      >
        INITIATE_UPLOAD
      </motion.a>
    </nav>
  );
}
