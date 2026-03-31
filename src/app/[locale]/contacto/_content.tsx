'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import ContactForm from '@/components/forms/ContactForm'
import contactoHero from '../../../../public/images/hero/contacto-hero.jpg'

const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '34600000000'

const contactIcons = {
  phone: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 11.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6.2 6.2l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>,
  email: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>,
  clock: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
  map: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>,
}

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const, delay: i * 0.08 },
  }),
}

export default function ContactoContent() {
  const t = useTranslations('contacto')

  const waLink = `https://wa.me/${waNumber}?text=${t('whatsappMessage')}`

  const contactInfo = [
    { label: t('phoneLabel'), value: '+34 600 000 000', href: 'tel:+34600000000', icon: contactIcons.phone },
    { label: t('emailLabel'), value: 'info@afvcocinas.es', href: 'mailto:info@afvcocinas.es', icon: contactIcons.email },
    { label: t('scheduleLabel'), value: t('scheduleValue'), href: null, icon: contactIcons.clock },
    { label: t('areaLabel'), value: t('areaValue'), href: null, icon: contactIcons.map },
  ]

  return (
    <>
      {/* Header */}
      <section className="relative flex items-center justify-center text-center overflow-hidden" style={{ minHeight: '40vh' }}>
        <div className="absolute inset-0">
          <Image
            src={contactoHero}
            alt="Contacta con AFV Cocinas"
            fill
            priority
            sizes="100vw"
            placeholder="blur"
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
          <div className="absolute inset-0" style={{ backgroundColor: 'rgba(14,14,12,0.42)' }} />
        </div>
        <div className="relative z-10 px-5 md:px-8">
          <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase', color: '#C9A96E', marginBottom: '16px' }}>
            {t('tag')}
          </p>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, fontSize: 'clamp(32px, 5vw, 54px)', color: '#F2F0E8', lineHeight: 1.1 }}>
            {t('heading')}
          </h1>
        </div>
      </section>

      {/* Main content */}
      <section className="pt-16 pb-16 md:pt-24 md:pb-24 px-5 md:px-8" style={{ backgroundColor: '#0E0E0C' }}>
        <div className="mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16" style={{ maxWidth: '1280px' }}>
          {/* Left — Contact info */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase', color: '#C9A96E', marginBottom: '24px' }}
            >
              {t('infoTag')}
            </motion.p>
            <div className="flex flex-col gap-5 mb-10">
              {contactInfo.map((item, i) => (
                <motion.div
                  key={item.label}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                  variants={cardVariants}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', padding: '18px 20px', backgroundColor: '#1A1A17', border: '0.5px solid rgba(201,169,110,0.08)' }}
                >
                  <div style={{ color: '#C9A96E', marginTop: '2px', flexShrink: 0 }}>{item.icon}</div>
                  <div>
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: '10px', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase', color: '#85837B', marginBottom: '4px' }}>
                      {item.label}
                    </p>
                    {item.href ? (
                      <a href={item.href} style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '15px', color: '#F2F0E8', textDecoration: 'none', transition: 'color 0.2s' }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = '#C9A96E')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = '#F2F0E8')}>
                        {item.value}
                      </a>
                    ) : (
                      <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '15px', color: '#F2F0E8' }}>{item.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <a href={waLink} target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', backgroundColor: '#25D366', color: '#fff', padding: '14px 28px', fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', textDecoration: 'none', transition: 'background-color 0.3s ease' }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1eaf56')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#25D366')}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                {t('whatsappCta')}
              </a>
            </motion.div>
          </div>

          {/* Right — Contact form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          >
            <h2 style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, fontSize: 'clamp(22px, 2.5vw, 32px)', color: '#F2F0E8', lineHeight: 1.2, marginBottom: '28px' }}>
              {t('formHeading')}
            </h2>
            <ContactForm />
          </motion.div>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="px-5 md:px-8 pb-16 md:pb-20" style={{ backgroundColor: '#0E0E0C' }}>
        <div className="mx-auto" style={{ maxWidth: '1280px' }}>
          <div className="flex items-center justify-center" style={{ minHeight: '300px', backgroundColor: '#1A1A17', border: '0.5px solid rgba(201,169,110,0.08)' }}>
            <div className="text-center px-5 md:px-8">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(201,169,110,0.3)" strokeWidth="1.5" style={{ margin: '0 auto 16px' }}>
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
              </svg>
              <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '14px', color: '#85837B' }}>{t('mapPlaceholder')}</p>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', color: '#4A4A44', marginTop: '8px' }}>{t('mapNote')}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
