'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Link } from '@/lib/navigation'
import heroImg from '../../../public/images/hero/home-hero.jpg'

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: 'easeOut' as const, delay },
})

export default function Hero() {
  const t = useTranslations('home.hero')

  return (
    <section className="relative flex items-center justify-center min-h-screen overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={heroImg}
          alt="Cocina de diseño premium"
          fill
          priority
          sizes="100vw"
          placeholder="blur"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(14,14,12,0.55)' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-5 md:px-8 max-w-3xl mx-auto">
        {/* Tag */}
        <motion.p
          {...fadeUp(0)}
          style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 500,
            fontSize: '11px',
            letterSpacing: '4px',
            color: '#C9A96E',
            textTransform: 'uppercase',
            textShadow: '0 0 12px rgba(0,0,0,0.8), 0 1px 3px rgba(0,0,0,0.9)',
            marginBottom: '24px',
          }}
        >
          {t('tag')}
        </motion.p>

        {/* Headline */}
        <motion.h1
          {...fadeUp(0.15)}
          style={{
            fontFamily: 'var(--font-serif)',
            fontWeight: 400,
            fontSize: 'clamp(36px, 5.5vw, 64px)',
            lineHeight: 1.1,
            color: '#F2F0E8',
            textShadow: '0 2px 20px rgba(0,0,0,0.6), 0 1px 4px rgba(0,0,0,0.5)',
            marginBottom: '24px',
          }}
        >
          {t('headline')}{' '}
          <span className="block"><em style={{ fontStyle: 'italic', color: '#C9A96E' }}>{t('headlineEm')}</em></span>
        </motion.h1>

        {/* Description */}
        <motion.p
          {...fadeUp(0.3)}
          className="max-w-md"
          style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: 1.75,
            color: '#F2F0E8',
            textShadow: 'none',
            marginBottom: '40px',
          }}
        >
          {t('description')}
        </motion.p>

        {/* CTA */}
        <motion.div {...fadeUp(0.45)}>
          <Link href="/presupuesto" className="btn-primary">
            {t('cta')}
          </Link>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24"
        style={{
          background: 'linear-gradient(to bottom, transparent, #0E0E0C)',
        }}
      />

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.4 }}
        aria-hidden="true"
      >
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 500,
            fontSize: '9px',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: 'rgba(201,169,110,0.6)',
          }}
        >
          Scroll
        </span>
        <motion.svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#C9A96E"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path d="M7 10l5 5 5-5" />
        </motion.svg>
      </motion.div>
    </section>
  )
}
