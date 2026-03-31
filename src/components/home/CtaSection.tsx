'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/lib/navigation'

export default function CtaSection() {
  const t = useTranslations('home.cta')

  return (
    <section
      className="py-16 md:py-24"
      style={{
        backgroundColor: '#0E0E0C',
        borderTop: '0.5px solid rgba(201,169,110,0.1)',
      }}
    >
      <div
        className="mx-auto px-5 md:px-8 text-center"
        style={{ maxWidth: '640px' }}
      >
        {/* Tag */}
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 500,
            fontSize: '11px',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            color: '#C9A96E',
            marginBottom: '20px',
          }}
        >
          {t('tag')}
        </p>

        {/* Title */}
        <h2
          style={{
            fontFamily: 'var(--font-serif)',
            fontWeight: 400,
            fontSize: 'clamp(28px, 3.5vw, 44px)',
            color: '#F2F0E8',
            lineHeight: 1.2,
            marginBottom: '20px',
          }}
        >
          {t('heading')}{' '}
          <span className="block"><em style={{ color: '#C9A96E', fontStyle: 'italic' }}>{t('headingEm')}</em></span>
        </h2>

        {/* Description */}
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 300,
            fontSize: '16px',
            lineHeight: 1.75,
            color: '#9C9A8E',
            marginBottom: '36px',
          }}
        >
          {t('description')}
        </p>

        {/* CTA button */}
        <Link href="/presupuesto" className="btn-primary">
          {t('button')}
        </Link>
      </div>
    </section>
  )
}
