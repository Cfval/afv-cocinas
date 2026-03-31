import { getTranslations } from 'next-intl/server'
import { Link } from '@/lib/navigation'

export default async function NotFoundPage() {
  const t = await getTranslations('notFound')

  return (
    <section
      className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-5 md:px-8"
      style={{ backgroundColor: '#0E0E0C' }}
    >
      <div className="text-center" style={{ maxWidth: '560px' }}>
        <p
          style={{
            fontFamily: 'var(--font-serif)',
            fontWeight: 400,
            fontSize: 'clamp(92px, 18vw, 180px)',
            lineHeight: 0.95,
            color: '#C9A96E',
            marginBottom: '18px',
          }}
        >
          404
        </p>
        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontWeight: 400,
            fontSize: 'clamp(26px, 4vw, 40px)',
            color: '#F2F0E8',
            lineHeight: 1.15,
            marginBottom: '14px',
          }}
        >
          {t('title')}
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 300,
            fontSize: '16px',
            color: '#9C9A8E',
            lineHeight: 1.75,
            marginBottom: '30px',
          }}
        >
          {t('description')}
        </p>
        <Link href="/" className="btn-primary">
          {t('cta')}
        </Link>
      </div>
    </section>
  )
}
