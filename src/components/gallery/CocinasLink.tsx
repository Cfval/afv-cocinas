'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/lib/navigation'

export default function CocinasLink() {
  const [hovered, setHovered] = useState(false)
  const t = useTranslations('galeria.portfolioLink')

  return (
    <Link
      href="/cocinas#portfolio"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden',
        height: '100px',
        marginBottom: '32px',
        padding: '0 40px',
        textDecoration: 'none',
        backgroundColor: '#1A1A17',
        borderTop: '0.5px solid rgba(201,169,110,0.15)',
        borderBottom: '0.5px solid rgba(201,169,110,0.15)',
        borderLeft: `3px solid ${hovered ? '#C9A96E' : 'rgba(201,169,110,0.35)'}`,
        borderRight: '0.5px solid rgba(201,169,110,0.08)',
        transition: 'border-color 0.3s ease',
      }}
    >
      {/* Subtle angled light sweep */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(105deg, transparent 40%, rgba(201,169,110,0.03) 50%, transparent 60%)',
          transform: hovered ? 'translateX(100%)' : 'translateX(-100%)',
          transition: 'transform 0.6s ease',
        }}
      />

      {/* Left: text */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 500,
            fontSize: '10px',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            color: 'rgba(201,169,110,0.6)',
            marginBottom: '8px',
          }}
        >
          {t('tag')}
        </p>
        <p
          style={{
            fontFamily: 'var(--font-serif)',
            fontWeight: 400,
            fontSize: 'clamp(20px, 2.5vw, 28px)',
            color: '#F2F0E8',
            lineHeight: 1.1,
          }}
        >
          {t('heading')}
        </p>
      </div>

      {/* Right: CTA */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 500,
            fontSize: '11px',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            color: hovered ? '#C9A96E' : '#85837B',
            transition: 'color 0.3s ease',
          }}
        >
          {t('cta')}
        </span>
        <div
          style={{
            width: '32px',
            height: '0.5px',
            backgroundColor: hovered ? '#C9A96E' : 'rgba(201,169,110,0.3)',
            transition: 'background-color 0.3s ease, width 0.3s ease',
          }}
        />
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke={hovered ? '#C9A96E' : 'rgba(201,169,110,0.4)'}
          strokeWidth="1.5"
          style={{ transition: 'stroke 0.3s ease', transform: hovered ? 'translateX(3px)' : 'translateX(0)', transitionProperty: 'stroke, transform' }}
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  )
}
