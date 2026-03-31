import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { getAllPosts } from '@/lib/mdx'
import PostList from '@/components/blog/PostList'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'blog.meta' })
  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('ogTitle'),
      description: t('ogDescription'),
      url: locale === 'es' ? 'https://afvcocinas.es/blog' : 'https://afvcocinas.es/en/blog',
      images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: t('ogImageAlt') }],
    },
    twitter: { title: t('ogTitle'), description: t('ogDescription') },
  }
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'blog' })
  const posts = getAllPosts()

  return (
    <>
      {/* Hero */}
      <section
        style={{
          backgroundColor: '#0E0E0C',
          backgroundImage: 'radial-gradient(ellipse at 70% 50%, rgba(201,169,110,0.04) 0%, transparent 60%)',
          paddingTop: '128px',
          paddingBottom: '64px',
          borderBottom: '0.5px solid rgba(201,169,110,0.08)',
        }}
      >
        <div className="mx-auto px-5 md:px-8" style={{ maxWidth: '1280px' }}>
          <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase', color: '#C9A96E', marginBottom: '20px' }}>
            {t('tag')}
          </p>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, fontSize: 'clamp(34px, 5vw, 58px)', color: '#F2F0E8', lineHeight: 1.1, marginBottom: '20px', maxWidth: '600px' }}>
            {t('heading')}
          </h1>
          <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '16px', color: '#9C9A8E', lineHeight: 1.7, maxWidth: '480px' }}>
            {t('description')}
          </p>
        </div>
      </section>

      {/* Posts grid */}
      <section style={{ backgroundColor: '#0E0E0C', paddingTop: '64px', paddingBottom: '96px' }}>
        <div className="mx-auto px-5 md:px-8" style={{ maxWidth: '1280px' }}>
          <PostList posts={posts} />
        </div>
      </section>
    </>
  )
}
