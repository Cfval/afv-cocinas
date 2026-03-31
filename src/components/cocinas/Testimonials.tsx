'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Testimonial } from '@/data/testimonials'

interface TestimonialsProps {
  testimonials: Testimonial[]
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  const tCocinas = useTranslations('cocinas.testimonials')

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 420px), 1fr))',
        gap: '24px',
      }}
    >
      {testimonials.map((t, i) => (
        <motion.div
          key={t.id}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, ease: 'easeOut', delay: i * 0.12 }}
          style={{
            backgroundColor: '#1A1A17',
            border: '0.5px solid rgba(201,169,110,0.08)',
            padding: 'clamp(28px, 4vw, 44px)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Decorative large quote */}
          <div
            aria-hidden
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '120px',
              lineHeight: 0.8,
              color: 'rgba(201,169,110,0.12)',
              position: 'absolute',
              top: '16px',
              left: '28px',
              userSelect: 'none',
              pointerEvents: 'none',
            }}
          >
            &ldquo;
          </div>

          {/* Quote text */}
          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 500,
              fontStyle: 'italic',
              fontSize: 'clamp(17px, 1.8vw, 21px)',
              color: '#F2F0E8',
              lineHeight: 1.6,
              marginBottom: '28px',
              position: 'relative',
              zIndex: 1,
              paddingTop: '32px',
            }}
          >
            &ldquo;{tCocinas(`items.${t.id}.quote`)}&rdquo;
          </p>

          {/* Separator */}
          <div
            style={{
              width: '40px',
              height: '0.5px',
              backgroundColor: '#8B7444',
              marginBottom: '20px',
            }}
          />

          {/* Author */}
          <div>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 500,
                fontSize: '14px',
                color: '#F2F0E8',
                marginBottom: '4px',
              }}
            >
              {t.name}
            </p>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 300,
                fontSize: '12px',
                color: '#85837B',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
              }}
            >
              {t.location}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
