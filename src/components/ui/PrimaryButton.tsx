import React from 'react';
import { motion } from 'framer-motion';
import { buttonGlitch } from '../../lib/animations';

interface PrimaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'dark';
  className?: string;
  tooltip?: string;
  target?: string;
  rel?: string;
}

const sizeClasses = {
  sm: 'px-7 py-3 text-sm',
  md: 'px-12 py-5 text-lg',
  lg: 'px-10 py-6 text-xl md:px-16 md:py-9 md:text-4xl',
};

/* Injected once — hard step color swap on hover, no ease */
const GLITCH_STYLE = `
  .btn-primary-glitch {
    background-color: #c00100;
    transition: background-color 0ms step-end, color 0ms step-end;
  }
  .btn-primary-glitch:hover {
    background-color: #cb0100;
  }
  .btn-dark-glitch {
    background-color: #000000;
    color: #fde403;
    transition: background-color 0ms step-end, color 0ms step-end;
  }
  .btn-dark-glitch:hover {
    background-color: #141414;
    color: #ffffff;
  }
`;

const darkButtonGlitch = {
  rest: {
    scale: 1,
    x: 0,
    boxShadow: '10px 10px 0px 0px #c00100',
    transition: { duration: 0 },
  },
  hover: {
    scale: 1.02,
    x: [0, 3, -2, 3, 0],
    boxShadow: '8px 8px 0px 0px #c00100',
    transition: {
      scale: { duration: 0.05, ease: [1, 0, 1, 0] },
      x: { duration: 0.05, times: [0, 0.25, 0.5, 0.75, 1], ease: 'linear' },
      boxShadow: { duration: 0 },
    },
  },
  tap: {
    scale: 0.97,
    boxShadow: '4px 4px 0px 0px #c00100',
    transition: { duration: 0 },
  },
};

export default function PrimaryButton({
  children,
  onClick,
  href,
  size = 'md',
  variant = 'primary',
  className = '',
  tooltip,
  target,
  rel,
}: PrimaryButtonProps) {
  const isPrimary = variant === 'primary';
  const [showTooltip, setShowTooltip] = React.useState(false);

  const baseClasses = `
    inline-flex items-center justify-center
    font-body font-black tracking-wider uppercase
    select-none whitespace-nowrap relative cursor-pointer
    ${isPrimary ? 'btn-primary-glitch text-white border-4 border-white' : 'btn-dark-glitch text-hack-yellow border-4 border-hack-black'}
    cyber-box-sm
    ${sizeClasses[size]}
    ${className}
  `;

  const content = (
    <div className="relative inline-block">
      <style dangerouslySetInnerHTML={{ __html: GLITCH_STYLE }} />
      <motion.div
        className={baseClasses}
        initial="rest"
        whileHover="hover"
        whileTap="tap"
        variants={isPrimary ? buttonGlitch : darkButtonGlitch}
        onHoverStart={() => tooltip && setShowTooltip(true)}
        onHoverEnd={() => setShowTooltip(false)}
      >
        {children}
      </motion.div>

      {/* Instant tooltip — 0ms black box */}
      {tooltip && showTooltip && (
        <div
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50
            bg-black text-white font-mono text-xs tracking-widest uppercase
            px-3 py-1.5 whitespace-nowrap pointer-events-none"
          style={{ transition: 'none' }}
        >
          {tooltip}
          {/* Arrow */}
          <span
            className="absolute top-full left-1/2 -translate-x-1/2
              border-4 border-transparent border-t-black"
          />
        </div>
      )}
    </div>
  );

  if (href) {
    const isExternal = href.startsWith('http') || target === '_blank';
    return (
      <a
        href={href}
        className="inline-block"
        target={target || (isExternal ? '_blank' : undefined)}
        rel={rel || (isExternal ? 'noopener noreferrer' : undefined)}
      >
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} className="bg-transparent border-0 p-0">
      {content}
    </button>
  );
}
