import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import LegalLayout from '@/components/legal/LegalLayout'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'legalPage' })
  return {
    title: t('privacy.metaTitle'),
    description: t('privacy.metaDescription'),
    robots: { index: false },
  }
}

export default async function PoliticaPrivacidadPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'legalPage' })
  const section2Items = t.raw('privacy.section2.items') as string[]
  const section3Items = t.raw('privacy.section3.items') as string[]
  const section4Items = t.raw('privacy.section4.items') as string[]
  const section7Items = t.raw('privacy.section7.items') as string[]

  return (
    <LegalLayout title={t('privacy.title')} subtitle={t('privacy.subtitle')}>
      <LegalSection title={t('privacy.section1.title')}>
        <p>{t('privacy.section1.text')}</p>
      </LegalSection>
      <LegalSection title={t('privacy.section2.title')}>
        <p>{t('privacy.section2.text')}</p>
        <ul>
          {section2Items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </LegalSection>
      <LegalSection title={t('privacy.section3.title')}>
        <p>{t('privacy.section3.text')}</p>
        <ul>
          {section3Items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </LegalSection>
      <LegalSection title={t('privacy.section4.title')}>
        <p>{t('privacy.section4.text')}</p>
        <ul>
          {section4Items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </LegalSection>
      <LegalSection title={t('privacy.section5.title')}>
        <p>{t('privacy.section5.text')}</p>
      </LegalSection>
      <LegalSection title={t('privacy.section6.title')}>
        <p>{t('privacy.section6.text')}</p>
      </LegalSection>
      <LegalSection title={t('privacy.section7.title')}>
        <p>{t('privacy.section7.text')}</p>
        <ul>
          {section7Items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p>{t('privacy.section7.contact')}</p>
      </LegalSection>
    </LegalLayout>
  )
}

function LegalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '40px' }}>
      <h2 style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, fontSize: 'clamp(18px, 2vw, 24px)', color: '#F2F0E8', lineHeight: 1.3, marginBottom: '16px', paddingBottom: '10px', borderBottom: '0.5px solid rgba(201,169,110,0.1)' }}>
        {title}
      </h2>
      <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '15px', color: '#9C9A8E', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {children}
      </div>
    </div>
  )
}
