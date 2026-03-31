'use client'

import Image from 'next/image'
import editorialImg from '../../../../public/images/cocinas/detalle-editorial.jpg'
import { useTranslations } from 'next-intl'
import { Link } from '@/lib/navigation'
import { motion } from 'framer-motion'
import cocinasHero from '../../../../public/images/hero/cocinas-hero.jpg'
import { kitchens } from '@/data/kitchens'
import { testimonials } from '@/data/testimonials'
import KitchenGrid from '@/components/cocinas/KitchenGrid'
import Testimonials from '@/components/cocinas/Testimonials'
import BeforeAfter from '@/components/shared/BeforeAfter'

const valueIcons = [
  <svg key="q" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>,
  <svg key="f" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
  </svg>,
  <svg key="d" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
  </svg>,
  <svg key="p" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>,
]

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const, delay: i * 0.12 },
  }),
}

export default function CocinasContent() {
  const t = useTranslations('cocinas')

  const valueCards = [
    { title: t('whyUs.premium.title'), description: t('whyUs.premium.description'), icon: valueIcons[0] },
    { title: t('whyUs.function.title'), description: t('whyUs.function.description'), icon: valueIcons[1] },
    { title: t('whyUs.custom.title'), description: t('whyUs.custom.description'), icon: valueIcons[2] },
    { title: t('whyUs.price.title'), description: t('whyUs.price.description'), icon: valueIcons[3] },
  ]

  return (
    <>
      {/* Hero */}
      <section
        className="relative flex items-center overflow-hidden"
        style={{ minHeight: '50vh', backgroundColor: '#0E0E0C' }}
      >
        <div className="absolute inset-0">
          <Image
            src={cocinasHero}
            alt="Portfolio de cocinas AFV"
            fill
            priority
            sizes="100vw"
            placeholder="blur"
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
          <div className="absolute inset-0" style={{ backgroundColor: 'rgba(14,14,12,0.42)' }} />
        </div>
        <div className="relative z-10 mx-auto px-5 md:px-8 py-20" style={{ maxWidth: '1280px' }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase', color: '#C9A96E', marginBottom: '20px' }}
          >
            {t('hero.tag')}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
            style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, fontSize: 'clamp(36px, 5vw, 60px)', color: '#F2F0E8', lineHeight: 1.1, maxWidth: '600px' }}
          >
            {t('hero.heading')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
            style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '16px', color: '#9C9A8E', lineHeight: 1.7, marginTop: '20px', maxWidth: '480px' }}
          >
            {t('hero.description')}
          </motion.p>
        </div>
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{ height: '60px', background: 'linear-gradient(to bottom, transparent, #0E0E0C)' }}
        />
      </section>

      {/* Por qué elegirnos — Values */}
      <section className="py-16 md:py-24" style={{ backgroundColor: '#1A1A17', borderTop: '0.5px solid rgba(201,169,110,0.08)' }}>
        <div className="mx-auto px-5 md:px-8" style={{ maxWidth: '1280px' }}>
          <div className="mb-12">
            <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase', color: '#C9A96E', marginBottom: '16px' }}>
              {t('whyUs.tag')}
            </p>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, fontSize: 'clamp(26px, 3vw, 38px)', color: '#F2F0E8', lineHeight: 1.2 }}>
              {t('whyUs.heading')}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {valueCards.map((card, i) => (
              <motion.div
                key={card.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                variants={cardVariants}
                style={{ backgroundColor: '#0E0E0C', border: '0.5px solid rgba(201,169,110,0.08)', padding: '32px 28px' }}
              >
                <div style={{ width: '48px', height: '48px', border: '1px solid rgba(139,116,68,0.4)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#C9A96E', marginBottom: '20px' }}>
                  {card.icon}
                </div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 500, fontSize: '22px', color: '#F2F0E8', marginBottom: '12px' }}>{card.title}</h3>
                <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '15px', color: '#9C9A8E', lineHeight: 1.7 }}>{card.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial */}
      <section className="py-16 md:py-24" style={{ backgroundColor: '#0E0E0C' }}>
        <div className="mx-auto px-5 md:px-8" style={{ maxWidth: '1280px' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              style={{ aspectRatio: '4/3', position: 'relative', overflow: 'hidden' }}
            >
              <Image
                src={editorialImg}
                alt="Detalle de cocina personalizada"
                fill
                priority={false}
                placeholder="blur"
                sizes="(max-width: 1024px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
            >
              <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase', color: '#C9A96E', marginBottom: '20px' }}>
                {t('approach.tag')}
              </p>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, fontSize: 'clamp(24px, 2.8vw, 38px)', color: '#F2F0E8', lineHeight: 1.2, marginBottom: '20px' }}>
                {t('approach.heading')}
              </h2>
              <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '16px', color: '#9C9A8E', lineHeight: 1.8, marginBottom: '32px' }}>
                {t('approach.body')}
              </p>
              <Link href="/galeria" className="btn-outline">{t('approach.galleryButton')}</Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Before / After */}
      <section className="py-16 md:py-24" style={{ backgroundColor: '#1A1A17', borderTop: '0.5px solid rgba(201,169,110,0.08)' }}>
        <div className="mx-auto px-5 md:px-8" style={{ maxWidth: '1280px' }}>
          <div className="mb-12 text-center">
            <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase', color: '#C9A96E', marginBottom: '16px' }}>
              {t('beforeAfter.tag')}
            </p>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, fontSize: 'clamp(26px, 3vw, 38px)', color: '#F2F0E8', lineHeight: 1.2 }}>
              {t('beforeAfter.heading')}
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 560px), 1fr))', gap: '24px' }}>
            <BeforeAfter
              before={{ src: '', alt: 'Cocina antes de la reforma — cocina antigua con muebles en mal estado' }}
              after={{ src: '', alt: 'Cocina después de la reforma — cocina moderna con acabado blanco' }}
              labels={{ before: t('beforeAfter.before'), after: t('beforeAfter.after') }}
            />
            <BeforeAfter
              before={{ src: '', alt: 'Cocina antes — muebles rústicos oscuros' }}
              after={{ src: '', alt: 'Cocina después — diseño minimalista con isla' }}
              labels={{ before: t('beforeAfter.before'), after: t('beforeAfter.after') }}
            />
          </div>
        </div>
      </section>

      {/* Kitchen grid */}
      <section id="portfolio" className="py-16 md:py-24" style={{ backgroundColor: '#0E0E0C', borderTop: '0.5px solid rgba(201,169,110,0.08)' }}>
        <div className="mx-auto px-5 md:px-8" style={{ maxWidth: '1280px' }}>
          <div className="mb-12">
            <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase', color: '#C9A96E', marginBottom: '16px' }}>
              {t('portfolio.tag')}
            </p>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, fontSize: 'clamp(26px, 3vw, 38px)', color: '#F2F0E8', lineHeight: 1.2, marginBottom: '32px' }}>
              {t('portfolio.heading')}
            </h2>
          </div>
          <KitchenGrid kitchens={kitchens} />
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24" style={{ backgroundColor: '#1A1A17', borderTop: '0.5px solid rgba(201,169,110,0.08)' }}>
        <div className="mx-auto px-5 md:px-8" style={{ maxWidth: '1280px' }}>
          <div className="mb-12">
            <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase', color: '#C9A96E', marginBottom: '16px' }}>
              {t('testimonials.tag')}
            </p>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, fontSize: 'clamp(26px, 3vw, 38px)', color: '#F2F0E8', lineHeight: 1.2 }}>
              {t('testimonials.heading')}
            </h2>
          </div>
          <Testimonials testimonials={testimonials} />
        </div>
      </section>

      {/* CTA bottom */}
      <section className="py-16 md:py-20 text-center" style={{ backgroundColor: '#0E0E0C', borderTop: '0.5px solid rgba(201,169,110,0.08)' }}>
        <div className="mx-auto px-5 md:px-8" style={{ maxWidth: '600px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, fontSize: 'clamp(22px, 2.8vw, 34px)', color: '#F2F0E8', lineHeight: 1.25, marginBottom: '16px' }}>
            {t('bottomCta.heading')}
          </h2>
          <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '15px', color: '#9C9A8E', lineHeight: 1.7, marginBottom: '28px' }}>
            {t('bottomCta.description')}
          </p>
          <Link href="/contacto" className="btn-outline">{t('bottomCta.button')}</Link>
        </div>
      </section>
    </>
  )
}
