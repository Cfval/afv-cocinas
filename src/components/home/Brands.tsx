'use client'

import { useTranslations } from 'next-intl'

const brands = ['Silestone', 'Siemens', 'Franke', 'Bosch', 'Neff', 'Smeg']

export default function Brands() {
  const t = useTranslations('home.brands')

  return (
    <section className="py-16 md:py-24" style={{ backgroundColor: '#0E0E0C' }}>
      <div className="mx-auto px-5 md:px-8" style={{ maxWidth: '1280px' }}>
        {/* Header */}
        <p
          className="text-center mb-10"
          style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 500,
            fontSize: '11px',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            color: '#85837B',
          }}
        >
          {t('tag')}
        </p>

        {/* Brands grid */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-y-8 gap-x-6 items-center justify-items-center">
          {brands.map((brand) => (
            <div
              key={brand}
              className="group cursor-default select-none"
            >
              <span
                className="transition-colors duration-300"
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontWeight: 400,
                  fontSize: 'clamp(16px, 2vw, 20px)',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  color: '#6B6A60',
                  display: 'block',
                  textAlign: 'center',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#C9A96E')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#6B6A60')}
              >
                {brand}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
