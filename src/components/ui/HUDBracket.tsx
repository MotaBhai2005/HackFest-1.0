import React from 'react';

interface HUDBracketProps {
  size?: number;
  weight?: number;
  color?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  offset?: number;
}

export default function HUDBracket({
  size = 20,
  weight = 4,
  color = '#c00100',
  children,
  style,
  className,
  offset = -8,
}: HUDBracketProps) {
  const bracketStyle: React.CSSProperties = {
    position: 'absolute',
    width: size,
    height: size,
    borderColor: color,
    borderStyle: 'solid',
    borderWidth: 0,
  };

  return (
    <div style={{ position: 'relative', ...style }} className={className}>
      {/* Top-left */}
      <span
        style={{
          ...bracketStyle,
          top: offset,
          left: offset,
          borderTopWidth: weight,
          borderLeftWidth: weight,
        }}
      />
      {/* Top-right */}
      <span
        style={{
          ...bracketStyle,
          top: offset,
          right: offset,
          borderTopWidth: weight,
          borderRightWidth: weight,
        }}
      />
      {/* Bottom-left */}
      <span
        style={{
          ...bracketStyle,
          bottom: offset,
          left: offset,
          borderBottomWidth: weight,
          borderLeftWidth: weight,
        }}
      />
      {/* Bottom-right */}
      <span
        style={{
          ...bracketStyle,
          bottom: offset,
          right: offset,
          borderBottomWidth: weight,
          borderRightWidth: weight,
        }}
      />
      {children}
    </div>
  );
}
