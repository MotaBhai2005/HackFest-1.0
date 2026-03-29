import React from 'react';
import { motion } from 'framer-motion';
import { glitchHover } from '../../lib/animations';

type AsType = 'h1' | 'h2' | 'h3' | 'h4' | 'span' | 'p';

interface GlitchTextProps {
  children: React.ReactNode;
  as?: AsType;
  className?: string;
  style?: React.CSSProperties;
}

export default function GlitchText({
  children,
  as: Tag = 'span',
  className,
  style,
}: GlitchTextProps) {
  const MotionTag = motion[Tag as keyof typeof motion] as typeof motion.span;

  return (
    <MotionTag
      className={className}
      style={style}
      initial="rest"
      whileHover="hover"
      variants={glitchHover}
    >
      {children}
    </MotionTag>
  );
}
