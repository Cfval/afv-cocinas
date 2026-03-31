import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import LegalLayout from '@/components/legal/LegalLayout'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'legalPage' })
  return {
    title: t('cookies.metaTitle'),
    description: t('cookies.metaDescription'),
    robots: { index: false },
  }
}

export default async function PoliticaCookiesPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'legalPage' })
  const rows = t.raw('cookies.cookieTable') as Array<{ name: string; type: string; duration: string; purpose: string }>

  return (
    <LegalLayout title={t('cookies.title')} subtitle={t('cookies.subtitle')}>
      <LegalSection title={t('cookies.section1.title')}>
        <p>{t('cookies.section1.text')}</p>
      </LegalSection>
      <LegalSection title={t('cookies.section2.title')}>
        <p>{t('cookies.section2.text')}</p>
        <div style={{ overflowX: 'auto', marginTop: '8px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr>
                {[
                  t('cookies.tableHeaders.name'),
                  t('cookies.tableHeaders.type'),
                  t('cookies.tableHeaders.duration'),
                  t('cookies.tableHeaders.purpose'),
                ].map((h) => (
                  <th key={h} style={{ textAlign: 'left', padding: '10px 14px', fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: '#C9A96E', borderBottom: '0.5px solid rgba(201,169,110,0.15)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={row.name} style={{ backgroundColor: i % 2 === 0 ? 'transparent' : 'rgba(201,169,110,0.02)' }}>
                  <td style={{ padding: '10px 14px', borderBottom: '0.5px solid rgba(201,169,110,0.06)', color: '#E2CFA0', fontFamily: 'monospace', fontSize: '12px' }}>{row.name}</td>
                  <td style={{ padding: '10px 14px', borderBottom: '0.5px solid rgba(201,169,110,0.06)', color: '#9C9A8E' }}>{row.type}</td>
                  <td style={{ padding: '10px 14px', borderBottom: '0.5px solid rgba(201,169,110,0.06)', color: '#9C9A8E' }}>{row.duration}</td>
                  <td style={{ padding: '10px 14px', borderBottom: '0.5px solid rgba(201,169,110,0.06)', color: '#9C9A8E' }}>{row.purpose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </LegalSection>
      <LegalSection title={t('cookies.section3.title')}>
        <p>{t('cookies.section3.text')}</p>
      </LegalSection>
      <LegalSection title={t('cookies.section4.title')}>
        <p>{t('cookies.section4.text')}</p>
      </LegalSection>
      <LegalSection title={t('cookies.section5.title')}>
        <p>{t('cookies.section5.text')}</p>
        <ul>
          <li><strong>{locale === 'es' ? 'Chrome' : 'Chrome'}:</strong> {locale === 'es' ? 'Configuración → Privacidad y seguridad → Cookies' : 'Settings → Privacy and security → Cookies'}</li>
          <li><strong>{locale === 'es' ? 'Firefox' : 'Firefox'}:</strong> {locale === 'es' ? 'Opciones → Privacidad y seguridad' : 'Options → Privacy and security'}</li>
          <li><strong>{locale === 'es' ? 'Safari' : 'Safari'}:</strong> {locale === 'es' ? 'Preferencias → Privacidad' : 'Preferences → Privacy'}</li>
          <li><strong>{locale === 'es' ? 'Edge' : 'Edge'}:</strong> {locale === 'es' ? 'Configuración → Permisos del sitio → Cookies' : 'Settings → Site permissions → Cookies'}</li>
        </ul>
        <p>{t('cookies.section5.note')}</p>
      </LegalSection>
      <LegalSection title={t('cookies.section6.title')}>
        <p>{t('cookies.section6.text')}</p>
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
