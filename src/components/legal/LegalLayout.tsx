import type { ReactNode } from 'react'

interface LegalLayoutProps {
  title: string
  subtitle: string
  children: ReactNode
}

export default function LegalLayout({ title, subtitle, children }: LegalLayoutProps) {
  return (
    <>
      {/* Hero */}
      <section
        style={{
          backgroundColor: '#0E0E0C',
          backgroundImage: 'radial-gradient(ellipse at 60% 40%, rgba(201,169,110,0.03) 0%, transparent 55%)',
          paddingTop: '128px',
          paddingBottom: '48px',
          borderBottom: '0.5px solid rgba(201,169,110,0.08)',
        }}
      >
        <div className="mx-auto px-5 md:px-8" style={{ maxWidth: '768px' }}>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 500,
              fontSize: '11px',
              letterSpacing: '4px',
              textTransform: 'uppercase',
              color: '#C9A96E',
              marginBottom: '16px',
            }}
          >
            Legal
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 400,
              fontSize: 'clamp(28px, 4vw, 44px)',
              color: '#F2F0E8',
              lineHeight: 1.15,
              marginBottom: '12px',
            }}
          >
            {title}
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 300,
              fontSize: '14px',
              color: '#85837B',
              lineHeight: 1.6,
            }}
          >
            {subtitle}
          </p>
        </div>
      </section>

      {/* Content */}
      <section
        style={{
          backgroundColor: '#0E0E0C',
          paddingTop: '56px',
          paddingBottom: '96px',
        }}
      >
        <div
          className="mx-auto px-5 md:px-8 legal-content"
          style={{ maxWidth: '768px' }}
        >
          {children}
        </div>
      </section>
    </>
  )
}
