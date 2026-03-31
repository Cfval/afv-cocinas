import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { readdir } from 'fs/promises'
import path from 'path'
import MasonryGrid from '@/components/gallery/MasonryGrid'
import CocinasLink from '@/components/gallery/CocinasLink'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'galeria.meta' })
  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('ogTitle'),
      description: t('ogDescription'),
      url: locale === 'es' ? 'https://afvcocinas.es/galeria' : 'https://afvcocinas.es/en/galeria',
      images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: t('ogImageAlt') }],
    },
    twitter: { title: t('ogTitle'), description: t('ogDescription') },
  }
}

async function getGalleryImages() {
  const dir = path.join(process.cwd(), 'public/images/galeria')
  const files = await readdir(dir)
  return files
    .filter((f) => f !== 'banner.jpg' && /\.(jpe?g|png|webp)$/i.test(f))
    .sort((a, b) => parseInt(a) - parseInt(b))
    .map((f) => ({
      src: `/images/galeria/${f}`,
      alt: `Cocina AFV — foto ${f.replace(/\.[^.]+$/, '')}`,
    }))
}

export default async function GaleriaPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const [t, images] = await Promise.all([
    getTranslations({ locale, namespace: 'galeria' }),
    getGalleryImages(),
  ])

  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-16 md:pt-36 md:pb-24 text-center" style={{ backgroundColor: '#0E0E0C' }}>
        <div className="mx-auto px-5 md:px-8" style={{ maxWidth: '1280px' }}>
          <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase', color: '#C9A96E', marginBottom: '16px' }}>
            {t('tag')}
          </p>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, fontSize: 'clamp(32px, 5vw, 58px)', color: '#F2F0E8', lineHeight: 1.1, marginBottom: '16px' }}>
            {t('heading')}
          </h1>
          <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '16px', color: '#9C9A8E', lineHeight: 1.7, maxWidth: '480px', margin: '0 auto' }}>
            {t('description')}
          </p>
        </div>
      </section>

      {/* Masonry grid */}
      <section className="pb-16 md:pb-24" style={{ backgroundColor: '#0E0E0C' }}>
        <div className="mx-auto px-5 md:px-8" style={{ maxWidth: '1440px' }}>
          <CocinasLink />
          <MasonryGrid images={images} />
        </div>
      </section>
    </>
  )
}
