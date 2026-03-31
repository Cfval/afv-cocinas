import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import LegalLayout from '@/components/legal/LegalLayout'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'legalPage' })
  return {
    title: t('notice.metaTitle'),
    description: t('notice.metaDescription'),
    robots: { index: false },
  }
}

export default async function AvisoLegalPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'legalPage' })

  return (
    <LegalLayout title={t('notice.title')} subtitle={t('notice.subtitle')}>
      <LegalSection title={t('notice.section1.title')}>
        <p>{t('notice.section1.intro')}</p>
        <ul>
          <li><strong>{t('notice.section1.ownerLabel')}</strong> {t('notice.section1.ownerName')}</li>
          <li><strong>{t('notice.section1.activityLabel')}</strong> {t('notice.section1.activityValue')}</li>
          <li><strong>{t('notice.section1.addressLabel')}</strong> {t('notice.section1.addressValue')}</li>
          <li><strong>{t('notice.section1.emailLabel')}</strong> {t('notice.section1.emailValue')}</li>
          <li><strong>{t('notice.section1.phoneLabel')}</strong> {t('notice.section1.phoneValue')}</li>
        </ul>
      </LegalSection>
      <LegalSection title={t('notice.section2.title')}>
        <p>{t('notice.section2.text')}</p>
      </LegalSection>
      <LegalSection title={t('notice.section3.title')}>
        <p>{t('notice.section3.text1')}</p>
        <p>{t('notice.section3.text2')}</p>
      </LegalSection>
      <LegalSection title={t('notice.section4.title')}>
        <p>{t('notice.section4.text1')}</p>
        <p>{t('notice.section4.text2')}</p>
      </LegalSection>
      <LegalSection title={t('notice.section5.title')}>
        <p>{t('notice.section5.text')}</p>
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
