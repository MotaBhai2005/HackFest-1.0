import React from 'react';

interface HUDBracketProps {
  size?: number;
  weight?: number;
  color?: string;
  children: React.ReactNode;
  className?: string;
  offset?: number;
}

export default function HUDBracket({
  size = 20,
  weight = 4,
  color = '#c00100',
  children,
  className = '',
  offset = -8,
}: HUDBracketProps) {
  const bracketBase = `absolute border-solid`;

  return (
    <div className={`relative ${className}`}>
      {/* Top-left */}
      <span
        className={bracketBase}
        style={{
          width: size, height: size,
          top: offset, left: offset,
          borderColor: color,
          borderWidth: 0,
          borderTopWidth: weight,
          borderLeftWidth: weight,
        }}
      />
      {/* Top-right */}
      <span
        className={bracketBase}
        style={{
          width: size, height: size,
          top: offset, right: offset,
          borderColor: color,
          borderWidth: 0,
          borderTopWidth: weight,
          borderRightWidth: weight,
        }}
      />
      {/* Bottom-left */}
      <span
        className={bracketBase}
        style={{
          width: size, height: size,
          bottom: offset, left: offset,
          borderColor: color,
          borderWidth: 0,
          borderBottomWidth: weight,
          borderLeftWidth: weight,
        }}
      />
      {/* Bottom-right */}
      <span
        className={bracketBase}
        style={{
          width: size, height: size,
          bottom: offset, right: offset,
          borderColor: color,
          borderWidth: 0,
          borderBottomWidth: weight,
          borderRightWidth: weight,
        }}
      />
      {children}
    </div>
  );
}
