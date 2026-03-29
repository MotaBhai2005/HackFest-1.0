import React from 'react';
import { motion } from 'framer-motion';
import { buttonGlitch } from '../../lib/animations';

interface PrimaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'dark';
}

const sizes = {
  sm: { padding: '12px 28px', fontSize: '0.875rem' },
  md: { padding: '20px 48px', fontSize: '1.125rem' },
  lg: { padding: '36px 68px', fontSize: '2.25rem' },
};

export default function PrimaryButton({
  children,
  onClick,
  href,
  size = 'md',
  variant = 'primary',
}: PrimaryButtonProps) {
  const isPrimary = variant === 'primary';
  const sizeStyle = sizes[size];

  const baseStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: sizeStyle.padding,
    background: isPrimary ? '#c00100' : '#000',
    color: '#ffffff',
    fontFamily: "'Inter', sans-serif",
    fontWeight: 900,
    fontSize: sizeStyle.fontSize,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    border: isPrimary ? '4px solid #ffffff' : 'none',
    cursor: 'pointer',
    userSelect: 'none',
    position: 'relative',
    whiteSpace: 'nowrap',
  };

  const content = (
    <motion.div
      style={baseStyle}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      variants={buttonGlitch}
    >
      {children}
    </motion.div>
  );

  if (href) {
    return <a href={href} style={{ display: 'inline-block' }}>{content}</a>;
  }

  return (
    <button onClick={onClick} style={{ background: 'none', border: 'none', padding: 0 }}>
      {content}
    </button>
  );
}
