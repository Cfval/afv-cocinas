'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/lib/navigation'
import Logo from '@/components/layout/Logo'

export default function Footer() {
  const t = useTranslations('footer')

  const footerLinks = [
    { href: '/' as const, label: t('links.home') },
    { href: '/cocinas' as const, label: t('links.kitchens') },
    { href: '/galeria' as const, label: t('links.gallery') },
    { href: '/sobre-mi' as const, label: t('links.about') },
    { href: '/contacto' as const, label: t('links.contact') },
  ]

  const legalLinks = [
    { href: '/aviso-legal' as const, label: t('legal.notice') },
    { href: '/politica-privacidad' as const, label: t('legal.privacy') },
    { href: '/politica-cookies' as const, label: t('legal.cookies') },
  ]

  return (
    <footer
      className="border-t"
      style={{
        backgroundColor: '#1A1A17',
        borderColor: 'rgba(139, 116, 68, 0.15)',
      }}
    >
      <div
        className="mx-auto px-5 md:px-8 py-16"
        style={{ maxWidth: '1280px' }}
      >
        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">

          {/* Col 1: Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/" aria-label="AFV Cocinas — Inicio">
              <Logo height={34} />
            </Link>
            <p
              className="text-sm leading-relaxed"
              style={{
                color: '#85837B',
                fontFamily: 'var(--font-sans)',
                fontWeight: 300,
                whiteSpace: 'pre-line',
              }}
            >
              {t('tagline')}
            </p>
            {/* Social icons */}
            <div className="flex gap-4 mt-2">
              <a
                href="#"
                aria-label="Instagram"
                className="transition-colors duration-300"
                style={{ color: '#85837B' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#C9A96E')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#85837B')}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="transition-colors duration-300"
                style={{ color: '#85837B' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#C9A96E')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#85837B')}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Nav links */}
          <div className="flex flex-col gap-3">
            <p
              className="text-xs uppercase tracking-widest mb-1"
              style={{
                color: '#C9A96E',
                fontFamily: 'var(--font-sans)',
                fontWeight: 500,
                letterSpacing: '3px',
              }}
            >
              {t('navHeading')}
            </p>
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm transition-colors duration-300"
                style={{
                  color: '#85837B',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 400,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#9C9A8E')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#85837B')}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Col 3: Contact */}
          <div className="flex flex-col gap-3">
            <p
              className="text-xs uppercase tracking-widest mb-1"
              style={{
                color: '#C9A96E',
                fontFamily: 'var(--font-sans)',
                fontWeight: 500,
                letterSpacing: '3px',
              }}
            >
              {t('contactHeading')}
            </p>
            <p
              className="text-sm"
              style={{ color: '#85837B', fontFamily: 'var(--font-sans)', fontWeight: 400 }}
            >
              {t('location')}
            </p>
            <a
              href="tel:+34600000000"
              className="text-sm transition-colors duration-300"
              style={{ color: '#85837B', fontFamily: 'var(--font-sans)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#C9A96E')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#85837B')}
            >
              +34 600 000 000
            </a>
            <a
              href="mailto:info@afvcocinas.es"
              className="text-sm transition-colors duration-300"
              style={{ color: '#85837B', fontFamily: 'var(--font-sans)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#C9A96E')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#85837B')}
            >
              info@afvcocinas.es
            </a>
            <Link
              href="/presupuesto"
              className="mt-2 inline-flex items-center gap-2 text-sm transition-colors duration-300"
              style={{
                color: '#C9A96E',
                fontFamily: 'var(--font-sans)',
                fontWeight: 500,
                fontSize: '11px',
                textTransform: 'uppercase',
                letterSpacing: '2px',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#E2CFA0')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#C9A96E')}
            >
              {t('requestQuote')}
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 border-t"
          style={{ borderColor: 'rgba(139, 116, 68, 0.1)' }}
        >
          <p
            className="text-xs"
            style={{ color: '#85837B', fontFamily: 'var(--font-sans)' }}
          >
            {t('copyright', { year: new Date().getFullYear() })}
          </p>
          <div className="flex gap-6">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs transition-colors duration-300"
                style={{ color: '#85837B', fontFamily: 'var(--font-sans)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#9C9A8E')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#85837B')}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
