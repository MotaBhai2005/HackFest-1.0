import { motion } from 'framer-motion';

export default function ScanlineOverlay() {
  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[9999] scanlines"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0.4, 0.3, 0.4, 0.35] }}
      transition={{
        duration: 4,
        repeat: Infinity,
        repeatType: 'mirror',
        ease: 'linear',
      }}
      aria-hidden="true"
    />
  );
}
