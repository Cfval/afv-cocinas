'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/lib/navigation'
import { motion } from 'framer-motion'

const valueIcons = [
  <svg key="q" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>,
  <svg key="p" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
  <svg key="t" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>,
  <svg key="d" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /><line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" /></svg>,
]

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const, delay: i * 0.12 },
  }),
}

const stepNumbers = ['01', '02', '03', '04', '05']

export default function SobreMiContent() {
  const t = useTranslations('sobreMi')

  const values = [
    { title: t('values.quality.title'), description: t('values.quality.description'), icon: valueIcons[0] },
    { title: t('values.punctuality.title'), description: t('values.punctuality.description'), icon: valueIcons[1] },
    { title: t('values.trust.title'), description: t('values.trust.description'), icon: valueIcons[2] },
    { title: t('values.detail.title'), description: t('values.detail.description'), icon: valueIcons[3] },
  ]

  const steps = [
    { number: stepNumbers[0], title: t('process.contact.title'), description: t('process.contact.description') },
    { number: stepNumbers[1], title: t('process.measure.title'), description: t('process.measure.description') },
    { number: stepNumbers[2], title: t('process.quote.title'), description: t('process.quote.description') },
    { number: stepNumbers[3], title: t('process.install.title'), description: t('process.install.description') },
    { number: stepNumbers[4], title: t('process.delivery.title'), description: t('process.delivery.description') },
  ]

  return (
    <>
      {/* Hero */}
      <section className="relative flex items-center justify-center overflow-hidden" style={{ minHeight: '60vh', backgroundColor: '#0E0E0C' }}>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, #1A1A17 0%, #0E0E0C 100%)', backgroundImage: 'radial-gradient(ellipse at 60% 40%, rgba(201,169,110,0.05) 0%, transparent 60%)' }} />
        <div className="relative z-10 text-center px-5 md:px-8">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase', color: '#C9A96E', marginBottom: '20px' }}>
            {t('hero.tag')}
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
            style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, fontSize: 'clamp(36px, 5vw, 60px)', color: '#F2F0E8', lineHeight: 1.1 }}>
            {t('hero.heading')}
          </motion.h1>
          <motion.div initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ duration: 0.6, delay: 0.3 }}
            style={{ width: '50px', height: '1px', backgroundColor: '#C9A96E', opacity: 0.6, margin: '24px auto 0' }} />
        </div>
      </section>

      {/* Historia */}
      <section className="py-16 md:py-24" style={{ backgroundColor: '#0E0E0C' }}>
        <div className="mx-auto px-5 md:px-8" style={{ maxWidth: '1280px' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase', color: '#C9A96E', marginBottom: '20px' }}>
                {t('story.tag')}
              </p>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, fontSize: 'clamp(24px, 2.5vw, 34px)', color: '#F2F0E8', lineHeight: 1.25, marginBottom: '24px' }}>
                {t('story.heading')}
              </h2>
              <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '16px', lineHeight: 1.85, color: '#9C9A8E', display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <p>{t('story.p1')}</p>
                <p>{t('story.p2')}</p>
                <p>{t('story.p3')}</p>
              </div>
            </div>
            <div className="flex flex-col gap-6 lg:pt-16">
              {[
                { value: '15+', label: t('stats.yearsLabel') },
                { value: '500+', label: t('stats.kitchensLabel') },
                { value: 'Alicante', label: t('stats.areaLabel') },
              ].map((item) => (
                <div key={item.label} style={{ borderLeft: '2px solid rgba(201,169,110,0.3)', paddingLeft: '24px' }}>
                  <p style={{ fontFamily: 'var(--font-serif)', fontSize: '36px', color: '#C9A96E', lineHeight: 1, marginBottom: '6px' }}>{item.value}</p>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase', color: '#9C9A8E' }}>{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-16 md:py-24" style={{ backgroundColor: '#1A1A17', borderTop: '0.5px solid rgba(201,169,110,0.08)' }}>
        <div className="mx-auto px-5 md:px-8" style={{ maxWidth: '1280px' }}>
          <div className="mb-14">
            <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase', color: '#C9A96E', marginBottom: '16px' }}>
              {t('values.tag')}
            </p>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, fontSize: 'clamp(26px, 3vw, 38px)', color: '#F2F0E8', lineHeight: 1.2 }}>
              {t('values.heading')}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((value, i) => (
              <motion.div key={value.title} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={cardVariants}
                style={{ backgroundColor: '#0E0E0C', border: '0.5px solid rgba(201,169,110,0.08)', padding: '32px 28px' }}>
                <div style={{ width: '48px', height: '48px', border: '1px solid rgba(139,116,68,0.4)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#C9A96E', marginBottom: '20px' }}>
                  {value.icon}
                </div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 500, fontSize: '22px', color: '#F2F0E8', marginBottom: '12px' }}>{value.title}</h3>
                <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '15px', color: '#9C9A8E', lineHeight: 1.7 }}>{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Proceso */}
      <section className="py-16 md:py-24" style={{ backgroundColor: '#0E0E0C' }}>
        <div className="mx-auto px-5 md:px-8" style={{ maxWidth: '1280px' }}>
          <div className="mb-14 text-center">
            <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase', color: '#C9A96E', marginBottom: '16px' }}>
              {t('process.tag')}
            </p>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, fontSize: 'clamp(26px, 3vw, 38px)', color: '#F2F0E8', lineHeight: 1.2 }}>
              {t('process.heading')}
            </h2>
          </div>
          <div className="relative">
            <div className="hidden md:block absolute top-6 left-0 right-0" style={{ height: '1px', backgroundImage: 'repeating-linear-gradient(to right, rgba(201,169,110,0.25) 0px, rgba(201,169,110,0.25) 6px, transparent 6px, transparent 12px)' }} />
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4">
              {steps.map((step, i) => (
                <motion.div key={step.number} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.5, ease: 'easeOut' as const, delay: i * 0.1 }}
                  className="relative flex flex-col items-center text-center">
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '1px solid rgba(201,169,110,0.4)', backgroundColor: '#0E0E0C', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-serif)', fontSize: '16px', color: '#C9A96E', marginBottom: '20px', position: 'relative', zIndex: 1, flexShrink: 0 }}>
                    {step.number}
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 500, fontSize: '18px', color: '#F2F0E8', marginBottom: '10px' }}>{step.title}</h3>
                  <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '14px', color: '#9C9A8E', lineHeight: 1.65 }}>{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center" style={{ backgroundColor: '#1A1A17', borderTop: '0.5px solid rgba(201,169,110,0.08)' }}>
        <div className="mx-auto px-5 md:px-8" style={{ maxWidth: '600px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, fontSize: 'clamp(26px, 3.5vw, 40px)', color: '#F2F0E8', lineHeight: 1.2, marginBottom: '16px' }}>
            {t('cta.heading')}
          </h2>
          <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '16px', color: '#9C9A8E', lineHeight: 1.75, marginBottom: '32px' }}>
            {t('cta.description')}
          </p>
          <Link href="/presupuesto" className="btn-primary">
            {t('cta.button')}
          </Link>
        </div>
      </section>
    </>
  )
}
