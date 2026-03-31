'use client'

import { useState, useEffect } from 'react'
import {
  ReactCompareSlider,
} from 'react-compare-slider'

interface BeforeAfterProps {
  before: { src: string; alt: string }
  after: { src: string; alt: string }
  labels?: { before?: string; after?: string }
}

function PlaceholderImage({ alt, tone }: { alt: string; tone: 'dark' | 'medium' }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: tone === 'dark' ? '#141412' : '#2A2A27',
        backgroundImage: tone === 'dark'
          ? 'radial-gradient(ellipse at 40% 50%, rgba(139,116,68,0.08) 0%, transparent 60%)'
          : 'radial-gradient(ellipse at 60% 50%, rgba(201,169,110,0.06) 0%, transparent 60%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-sans)',
          fontWeight: 300,
          fontSize: '11px',
          color: '#85837B',
          textAlign: 'center',
          lineHeight: 1.5,
        }}
      >
        {alt}
      </p>
    </div>
  )
}

function SliderHandle() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0',
        cursor: 'ew-resize',
      }}
    >
      {/* Vertical line */}
      <div
        style={{
          width: '1px',
          height: '100vh',
          backgroundColor: '#C9A96E',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          opacity: 0.8,
        }}
      />
      {/* Circle */}
      <div
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: '#0E0E0C',
          border: '1.5px solid #C9A96E',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 1,
          flexShrink: 0,
        }}
      >
        <svg
          width="18"
          height="14"
          viewBox="0 0 18 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 7H1M1 7L3.5 4M1 7L3.5 10M13 7H17M17 7L14.5 4M17 7L14.5 10"
            stroke="#C9A96E"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  )
}

export default function BeforeAfter({ before, after, labels }: BeforeAfterProps) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const beforeLabel = labels?.before ?? 'ANTES'
  const afterLabel = labels?.after ?? 'DESPUÉS'

  if (!mounted) return <div style={{ aspectRatio: '16/9', backgroundColor: '#1A1A17' }} />

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      <ReactCompareSlider
        handle={<SliderHandle />}
        itemOne={
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            {before.src
              ? <img src={before.src} alt={before.alt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              : <PlaceholderImage alt={before.alt} tone="dark" />
            }
            {/* Before label */}
            <div
              style={{
                position: 'absolute',
                top: '16px',
                left: '16px',
                fontFamily: 'var(--font-sans)',
                fontWeight: 500,
                fontSize: '10px',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                color: '#F2F0E8',
                backgroundColor: 'rgba(14,14,12,0.75)',
                padding: '5px 10px',
                backdropFilter: 'blur(4px)',
                border: '0.5px solid rgba(201,169,110,0.2)',
              }}
            >
              {beforeLabel}
            </div>
          </div>
        }
        itemTwo={
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            {after.src
              ? <img src={after.src} alt={after.alt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              : <PlaceholderImage alt={after.alt} tone="medium" />
            }
            {/* After label */}
            <div
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                fontFamily: 'var(--font-sans)',
                fontWeight: 500,
                fontSize: '10px',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                color: '#C9A96E',
                backgroundColor: 'rgba(14,14,12,0.75)',
                padding: '5px 10px',
                backdropFilter: 'blur(4px)',
                border: '0.5px solid rgba(201,169,110,0.3)',
              }}
            >
              {afterLabel}
            </div>
          </div>
        }
        style={{ aspectRatio: '16/9' }}
      />
    </div>
  )
}
