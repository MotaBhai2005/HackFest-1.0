import React from 'react';
import { motion } from 'framer-motion';
import { glitchLogoHover } from '../../lib/animations';

interface GlitchLogoProps {
  className?: string;
  style?: React.CSSProperties;
}

export default function GlitchLogo({
  className = 'h-4 sm:h-[18px] md:h-5 lg:h-6 w-auto text-hack-black',
  style,
}: GlitchLogoProps) {
  return (
    <motion.span
      className={`relative inline-flex items-center cursor-pointer select-none ${className}`}
      style={style}
      initial="rest"
      whileHover="hover"
      whileTap="hover"
      variants={glitchLogoHover}
      role="img"
      aria-label="HACKFEST"
    >
      <svg
        viewBox="0 0 1147 128"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full block"
        style={{ overflow: 'visible' }}
      >
        {/* H */}
        <path d="M101.423 0H126.779V128H101.423V80H25.3557V128H0V0H25.3557V48H101.423V0Z" />
        {/* A */}
        <path d="M221.813 0H272.525V128H247.169V100L224.983 128H145.746V96L221.813 0ZM247.169 92V32H232.336L181.624 96H214.46L232.463 73.44L247.169 92Z" />
        {/* C */}
        <path d="M316.848 45.28V96H418.27V128H291.492V32L316.848 0H418.27V32H327.37L316.848 45.28Z" />
        {/* K */}
        <path d="M497.458 0H564.016V32H507.98L495.302 48H538.661L564.016 80V128H538.661V93.28L528.138 80H462.593V128H437.238V0H462.593V48H493.02L476.159 26.88L497.458 0Z" />
        {/* F */}
        <path d="M709.762 0V32H608.339V48H709.762V80H618.862L608.339 93.28V128H582.984V80L605.17 52H582.984V0H709.762Z" />
        {/* E */}
        <path d="M728.73 0H855.508V32H754.085V48H855.508V80H764.608L754.085 93.28V96H855.508V128H728.73V80L750.916 52H728.73V0Z" />
        {/* S */}
        <path d="M899.831 0H1001.25V32H910.354L899.831 45.28V48H975.898L1001.25 80V128H874.475V96H975.898V93.28L965.376 80H874.475V32L899.831 0Z" />
        {/* T */}
        <path d="M1093.12 0H1147V32H1096.29V128H1070.93V45.28L1060.41 32H1020.22V0H1070.93V18.2857L1093.12 28V0Z" />
      </svg>
    </motion.span>
  );
}
