'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/lib/navigation'
import type { Kitchen } from '@/data/kitchens'

export default function KitchenCard({ kitchen }: { kitchen: Kitchen }) {
  const [hovered, setHovered] = useState(false)
  const ts = useTranslations('cocinas.styleLabels')
  const tk = useTranslations('cocinas.kitchens')
  const translatedName = tk(`${kitchen.slug}.name`)

  return (
    <Link
      href={`/cocinas/${kitchen.slug}`}
      className="relative block overflow-hidden group"
      style={{ aspectRatio: '4/3', display: 'block' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="absolute inset-0">
        <Image
          src={kitchen.images[0]}
          alt={translatedName}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{
            objectFit: 'cover',
            transform: hovered ? 'scale(1.04)' : 'scale(1)',
            transition: 'transform 0.7s ease',
          }}
        />
      </div>

      {/* Overlay gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, rgba(14,14,12,0.9) 0%, rgba(14,14,12,0.2) 50%, transparent 100%)',
        }}
      />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <span
          style={{
            display: 'inline-block',
            fontFamily: 'var(--font-sans)',
            fontWeight: 500,
            fontSize: '10px',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: '#C9A96E',
            border: '0.5px solid rgba(201,169,110,0.4)',
            padding: '4px 10px',
            marginBottom: '8px',
          }}
        >
          {ts(kitchen.style)}
        </span>
        <p
          style={{
            fontFamily: 'var(--font-serif)',
            fontWeight: 400,
            fontSize: '18px',
            color: '#F2F0E8',
            lineHeight: 1.3,
          }}
        >
          {translatedName}
        </p>
      </div>

      {/* Arrow on hover */}
      <div
        className="absolute top-4 right-4 transition-all duration-300"
        style={{
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'translate(0,0)' : 'translate(-4px,4px)',
          color: '#C9A96E',
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M7 17L17 7M17 7H7M17 7v10" />
        </svg>
      </div>
    </Link>
  )
}
