import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import BudgetForm from '@/components/forms/BudgetForm'
import BudgetCalculator from '@/components/forms/BudgetCalculator'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'presupuesto.meta' })
  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('ogTitle'),
      description: t('ogDescription'),
      url: locale === 'es' ? 'https://afvcocinas.es/presupuesto' : 'https://afvcocinas.es/en/presupuesto',
      images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: t('ogImageAlt') }],
    },
    twitter: { title: t('ogTitle'), description: t('ogDescription') },
  }
}

export default async function PresupuestoPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'presupuesto' })

  const trustSignals = [
    { icon: '✓', text: t('trustNoCommitment') },
    { icon: '✓', text: t('trust48h') },
    { icon: '✓', text: t('trustFree') },
  ]

  return (
    <section style={{ backgroundColor: '#0E0E0C', paddingBottom: '80px' }}>
      {/* Header */}
      <div className="text-center px-5 md:px-8 pt-32 md:pt-36 pb-14" style={{ backgroundColor: '#0E0E0C' }}>
        <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase', color: '#C9A96E', marginBottom: '16px' }}>
          {t('tag')}
        </p>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, fontSize: 'clamp(32px, 5vw, 54px)', color: '#F2F0E8', lineHeight: 1.1, marginBottom: '16px' }}>
          {t('heading')}
        </h1>
        <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '16px', color: '#9C9A8E', lineHeight: 1.7, maxWidth: '480px', margin: '0 auto' }}>
          {t('description')}
        </p>

        {/* Trust signals */}
        <div className="flex flex-wrap items-center justify-center gap-8 mt-8">
          {trustSignals.map((s) => (
            <div key={s.text} className="flex items-center gap-2" style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: '#9C9A8E' }}>
              <span style={{ color: '#5DCAA5', fontWeight: 600 }}>{s.icon}</span>
              {s.text}
            </div>
          ))}
        </div>

        {/* Gold separator */}
        <div style={{ width: '50px', height: '1px', backgroundColor: 'rgba(201,169,110,0.4)', margin: '24px auto 0' }} />
      </div>

      {/* Form */}
      <div className="mx-auto px-5 md:px-8" style={{ maxWidth: '720px' }}>
        <BudgetForm />
      </div>

      {/* Divider */}
      <div style={{ width: '60px', height: '0.5px', backgroundColor: 'rgba(201,169,110,0.25)', margin: '80px auto 0' }} />

      {/* Budget Calculator */}
      <div className="mx-auto px-5 md:px-8" style={{ maxWidth: '760px', paddingTop: '80px', paddingBottom: '96px' }}>
        <div className="text-center" style={{ marginBottom: '48px' }}>
          <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase', color: '#C9A96E', marginBottom: '16px' }}>
            {t('calculatorTag')}
          </p>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, fontSize: 'clamp(24px, 3.5vw, 38px)', color: '#F2F0E8', lineHeight: 1.2, marginBottom: '14px' }}>
            {t('calculatorHeading')}
          </h2>
          <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '15px', color: '#9C9A8E', lineHeight: 1.7, maxWidth: '440px', margin: '0 auto' }}>
            {t('calculatorDescription')}
          </p>
        </div>
        <BudgetCalculator />
      </div>
    </section>
  )
}
