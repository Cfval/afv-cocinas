import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/lib/navigation'
import { kitchens } from '@/data/kitchens'
import { routing } from '@/i18n/routing'
import KitchenDetail from '@/components/cocinas/KitchenDetail'
import KitchenCard from '@/components/cocinas/KitchenCard'

type Props = { params: Promise<{ locale: string; slug: string }> }

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    kitchens.map((k) => ({ locale, slug: k.slug }))
  )
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params
  const kitchen = kitchens.find((k) => k.slug === slug)
  if (!kitchen) return {}
  const tk = await getTranslations({ locale, namespace: 'cocinas.kitchens' })
  const translatedName = tk(`${slug}.name`)
  const translatedDescription = tk(`${slug}.description`)
  const desc = translatedDescription.slice(0, 160)
  return {
    title: translatedName,
    description: desc,
    openGraph: {
      title: `${translatedName} | AFV Cocinas`,
      description: desc,
      images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: translatedName }],
    },
    twitter: { title: translatedName, description: desc },
  }
}

export default async function KitchenPage({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const kitchen = kitchens.find((k) => k.slug === slug)
  if (!kitchen) notFound()

  const t = await getTranslations({ locale, namespace: 'cocinas.detail' })
  const tk = await getTranslations({ locale, namespace: 'cocinas.kitchens' })
  const translatedName = tk(`${kitchen.slug}.name`)

  const related = kitchens
    .filter((k) => k.slug !== kitchen.slug && k.style === kitchen.style)
    .slice(0, 3)

  const fallbackRelated =
    related.length === 0
      ? kitchens.filter((k) => k.slug !== kitchen.slug).slice(0, 3)
      : related

  return (
    <>
      {/* Gold accent top bar */}
      <div style={{ height: '3px', background: 'linear-gradient(to right, transparent, #C9A96E 30%, #C9A96E 70%, transparent)' }} />

      {/* Breadcrumb */}
      <div className="mx-auto px-5 md:px-8 pt-20" style={{ maxWidth: '1280px' }}>
        <nav style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: '#85837B', display: 'flex', gap: '8px', alignItems: 'center' }}>
          <Link href="/" style={{ color: '#85837B', textDecoration: 'none' }}>{t('breadcrumbHome')}</Link>
          <span>›</span>
          <Link href="/cocinas" style={{ color: '#85837B', textDecoration: 'none' }}>{t('breadcrumbKitchens')}</Link>
          <span>›</span>
          <span style={{ color: '#9C9A8E' }}>{translatedName}</span>
        </nav>
      </div>

      {/* Kitchen detail */}
      <KitchenDetail kitchen={kitchen} />

      {/* Related kitchens */}
      {fallbackRelated.length > 0 && (
        <section
          className="py-16 md:py-24"
          style={{ backgroundColor: '#1A1A17', borderTop: '0.5px solid rgba(201,169,110,0.08)' }}
        >
          <div className="mx-auto px-5 md:px-8" style={{ maxWidth: '1280px' }}>
            <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase', color: '#C9A96E', marginBottom: '16px' }}>
              {t('relatedTag')}
            </p>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, fontSize: 'clamp(22px, 2.5vw, 32px)', color: '#F2F0E8', marginBottom: '32px' }}>
              {t('relatedHeading')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {fallbackRelated.map((k) => (
                <KitchenCard key={k.slug} kitchen={k} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
