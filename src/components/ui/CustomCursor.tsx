import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  // Keep the original cursor's spring and crosshair motion.
  const springConfig = { damping: 25, stiffness: 700, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    setMounted(true);
    const root = document.documentElement;
    const mouseMedia = window.matchMedia('(any-hover: hover) and (any-pointer: fine)');
    const hide = () => {
      setVisible(false);
      delete root.dataset.customCursor;
    };
    const move = (event: PointerEvent) => {
      if (!mouseMedia.matches || event.pointerType === 'touch') {
        hide();
        return;
      }
      cursorX.set(event.clientX - 16);
      cursorY.set(event.clientY - 16);
      setVisible(true);
      // Hide the system cursor only while its replacement is actually active.
      root.dataset.customCursor = 'active';
    };
    const hover = (event: PointerEvent) => {
      const target = event.target;
      setHovered(target instanceof Element && !!target.closest('a, button, summary, input, select, textarea, [role="button"]'));
    };
    const visibility = () => { if (document.hidden) hide(); };

    window.addEventListener('pointermove', move);
    window.addEventListener('pointerover', hover);
    window.addEventListener('blur', hide);
    root.addEventListener('pointerleave', hide);
    document.addEventListener('visibilitychange', visibility);
    mouseMedia.addEventListener('change', hide);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerover', hover);
      window.removeEventListener('blur', hide);
      root.removeEventListener('pointerleave', hide);
      document.removeEventListener('visibilitychange', visibility);
      mouseMedia.removeEventListener('change', hide);
      delete root.dataset.customCursor;
    };
  }, [cursorX, cursorY]);

  if (!mounted) return null;

  // A body portal keeps the cursor fixed to the viewport during page transforms,
  // the intro loader, and the fullscreen breach sequence.
  return createPortal(
    <motion.div
      className="hackfest-cursor fixed top-0 left-0 z-[100000] pointer-events-none"
      aria-hidden="true"
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.15 }}
      style={{ x: cursorXSpring, y: cursorYSpring }}
    >
      <svg width="32" height="32" viewBox="0 0 32 32" className="transition-transform duration-150"
        style={{ transform: hovered ? 'scale(1.3) rotate(45deg)' : 'scale(1) rotate(0deg)' }}>
        <path d="M16 4 L16 12 M16 20 L16 28 M4 16 L12 16 M20 16 L28 16"
          stroke="#fde403" strokeWidth="2" strokeLinecap="square" />
        <rect x="14" y="14" width="4" height="4" fill="#fde403" />
      </svg>
    </motion.div>,
    document.body,
  );
}
