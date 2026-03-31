'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { Link } from '@/lib/navigation'
import { kitchens } from '@/data/kitchens'

const FEATURED_SLUGS = ['negra-madera-roble', 'verde-salvia-marmol', 'elegante-isla-vistas-mar']
const kitchensData = FEATURED_SLUGS.map((slug) => kitchens.find((k) => k.slug === slug)!)

function KitchenItem({
  kitchen,
  styleLabel,
  className,
  minHeight,
  revealDelay = 0,
}: {
  kitchen: (typeof kitchensData)[number]
  styleLabel: string
  className?: string
  minHeight?: string
  revealDelay?: number
}) {
  const [hovered, setHovered] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const tk = useTranslations('cocinas.kitchens')
  const translatedName = tk(`${kitchen.slug}.name`)

  return (
    <Link
      href={`/cocinas/${kitchen.slug}`}
      className={`relative overflow-hidden block group ${className ?? ''}`}
      style={{ minHeight }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="absolute inset-0 img-shimmer" />
      {/* Real image */}
      <motion.div
        className="absolute inset-0"
        initial={{ clipPath: 'inset(0 0 100% 0)' }}
        whileInView={{ clipPath: 'inset(0 0 0% 0)' }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: revealDelay }}
      >
        <Image
          src={kitchen.images[0]}
          alt={translatedName}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700"
          onLoad={() => setLoaded(true)}
          style={{
            transform: hovered ? 'scale(1.04)' : 'scale(1)',
            opacity: loaded ? 1 : 0,
            transition: 'transform 0.7s ease, opacity 0.2s ease',
          }}
        />
      </motion.div>

      {/* Overlay gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, rgba(14,14,12,0.9) 0%, rgba(14,14,12,0.3) 40%, transparent 70%)',
        }}
      />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        {/* Style badge */}
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
            marginBottom: '10px',
          }}
        >
          {styleLabel}
        </span>

        {/* Name */}
        <p
          style={{
            fontFamily: 'var(--font-serif)',
            fontWeight: 400,
            fontSize: '20px',
            color: '#F2F0E8',
            lineHeight: 1.3,
          }}
        >
          {translatedName}
        </p>
      </div>

      {/* Arrow on hover */}
      <div
        className="absolute top-5 right-5 transition-all duration-300"
        style={{
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'translate(0, 0)' : 'translate(-4px, 4px)',
          color: '#C9A96E',
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M7 17L17 7M17 7H7M17 7v10" />
        </svg>
      </div>
    </Link>
  )
}

export default function FeaturedWork() {
  const t = useTranslations('home.featuredWork')
  const ts = useTranslations('cocinas.styleLabels')

  return (
    <section className="py-16 md:py-24" style={{ backgroundColor: '#0E0E0C' }}>
      <div className="mx-auto px-5 md:px-8" style={{ maxWidth: '1280px' }}>
        {/* Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 500,
                fontSize: '11px',
                letterSpacing: '4px',
                color: '#C9A96E',
                textTransform: 'uppercase',
                marginBottom: '16px',
              }}
            >
              {t('tag')}
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontWeight: 400,
                fontSize: 'clamp(28px, 3vw, 40px)',
                color: '#F2F0E8',
                lineHeight: 1.2,
              }}
            >
              {t('heading')}
            </h2>
          </div>
        </div>

        {/* Asymmetric grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          style={{ gridTemplateRows: 'auto' }}
        >
          {/* Large item - spans 2 rows on desktop */}
          <div className="md:row-span-2">
            <KitchenItem
              kitchen={kitchensData[0]}
              styleLabel={ts(kitchensData[0].style)}
              minHeight="480px"
              className="h-full"
              revealDelay={0.05}
            />
          </div>

          {/* Two stacked items on right */}
          <KitchenItem kitchen={kitchensData[1]} styleLabel={ts(kitchensData[1].style)} minHeight="230px" revealDelay={0.12} />
          <KitchenItem kitchen={kitchensData[2]} styleLabel={ts(kitchensData[2].style)} minHeight="230px" revealDelay={0.2} />
        </motion.div>

        {/* Footer link */}
        <div className="mt-8 flex justify-end">
          <Link
            href="/cocinas"
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 500,
              fontSize: '12px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: '#C9A96E',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'color 0.3s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#E2CFA0')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#C9A96E')}
          >
            {t('viewAll')}
          </Link>
        </div>
      </div>
    </section>
  )
}
