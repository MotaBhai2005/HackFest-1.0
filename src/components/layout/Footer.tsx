export default function Footer() {
  const socials = [
    { label: 'X_PROTOCOL', href: '#' },
    { label: 'INSTA_SYNC', href: '#' },
    { label: 'DISCORD_NODE', href: '#' },
  ];

  return (
    <footer
      style={{
        background: '#000',
        borderTop: '12px solid #c00100',
        padding: '92px 40px 40px',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Main row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gap: '2.5rem',
          marginBottom: '5rem',
        }}
      >
        {/* Left: brand */}
        <div
          style={{
            gridColumn: '1 / span 6',
            position: 'relative',
            alignSelf: 'end',
          }}
        >
          {/* Ghost CYBER text */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: '-16px',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(80px, 16vw, 240px)',
              color: 'rgba(255,255,255,0.05)',
              lineHeight: 0.85,
              letterSpacing: '-0.04em',
              userSelect: 'none',
              pointerEvents: 'none',
            }}
          >
            CYBER
          </div>

          <div style={{ position: 'relative', paddingTop: '14rem' }}>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '14px',
                letterSpacing: '0.4em',
                color: '#c00100',
                textTransform: 'uppercase',
                marginBottom: '12px',
              }}
            >
              SYSTEM_DIAGNOSTIC_LOG_V2.0.4_STABLE
            </div>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 900,
                fontSize: 'clamp(16px, 1.8vw, 24px)',
                color: '#fff',
                textTransform: 'uppercase',
              }}
            >
              TECH_SOC // REWRITING_REALITY
            </div>
          </div>
        </div>

        {/* Right: socials + info box */}
        <div
          style={{
            gridColumn: '7 / span 6',
            display: 'flex',
            gap: '3rem',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
          }}
        >
          {/* Vertical social links */}
          <div style={{ display: 'flex', gap: '3rem', alignItems: 'flex-end' }}>
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  writingMode: 'vertical-rl',
                  textOrientation: 'mixed',
                  transform: 'rotate(180deg)',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 900,
                  fontSize: '14px',
                  letterSpacing: '0.1em',
                  color: '#fde403',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                  transition: 'color 0.04s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#c00100')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#fde403')}
              >
                {social.label}
              </a>
            ))}
          </div>

          {/* Info box */}
          <div
            style={{
              background: '#c00100',
              border: '4px solid #c00100',
              padding: '28px',
              flexShrink: 0,
            }}
          >
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '10px',
                color: '#fff',
                lineHeight: 1.6,
                textTransform: 'uppercase',
              }}
            >
              <div>SECURE_ENCRYPTION_ENABLED</div>
              <div>256_BIT_AES_CONNECTED</div>
              <div>LOCATION: [ REDACTED ]</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div
        style={{
          borderTop: '1px solid rgba(255,255,255,0.1)',
          paddingTop: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          opacity: 0.4,
        }}
      >
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '10px',
            color: '#fde403',
            textTransform: 'uppercase',
          }}
        >
          © 2024 TECH_SOC PROTOCOL
        </span>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '10px',
            color: '#fde403',
            textTransform: 'uppercase',
          }}
        >
          STAY_CONNECTED_OR_BE_DISCONNECTED
        </span>
      </div>
    </footer>
  );
}
