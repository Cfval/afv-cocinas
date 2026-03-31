'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

const serviceIcons = [
  <svg key="assembly" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>,
  <svg key="design" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
  </svg>,
  <svg key="sales" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>,
]

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const, delay: i * 0.15 },
  }),
}

export default function Services() {
  const t = useTranslations('home.services')

  const services = [
    { title: t('assembly.title'), description: t('assembly.description'), icon: serviceIcons[0] },
    { title: t('design.title'), description: t('design.description'), icon: serviceIcons[1] },
    { title: t('sales.title'), description: t('sales.description'), icon: serviceIcons[2] },
  ]

  return (
    <section
      className="py-16 md:py-24"
      style={{ backgroundColor: '#0E0E0C' }}
    >
      <div className="mx-auto px-5 md:px-8" style={{ maxWidth: '1280px' }}>
        {/* Header */}
        <div className="mb-14">
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

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={cardVariants}
              style={{
                backgroundColor: '#1A1A17',
                border: '0.5px solid rgba(201,169,110,0.08)',
                padding: '32px 28px',
                transition: 'border-color 0.3s ease, transform 0.3s ease',
              }}
              whileHover={{
                y: -4,
                transition: { duration: 0.2 },
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(201,169,110,0.25)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(201,169,110,0.08)'
              }}
            >
              {/* Icon */}
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  border: '1px solid rgba(139,116,68,0.4)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#C9A96E',
                  marginBottom: '24px',
                }}
              >
                {service.icon}
              </div>

              {/* Title */}
              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontWeight: 500,
                  fontSize: '22px',
                  color: '#F2F0E8',
                  lineHeight: 1.3,
                  marginBottom: '14px',
                }}
              >
                {service.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 300,
                  fontSize: '15px',
                  color: '#9C9A8E',
                  lineHeight: 1.7,
                }}
              >
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
