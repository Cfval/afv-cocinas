import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/lib/navigation'
import { routing } from '@/i18n/routing'
import { getAllPosts, getPostBySlug, formatDate } from '@/lib/mdx'
import { mdxComponents } from '@/components/blog/MdxComponents'

type Props = { params: Promise<{ locale: string; slug: string }> }

export async function generateStaticParams() {
  const posts = getAllPosts()
  return routing.locales.flatMap((locale) =>
    posts.map((post) => ({ locale, slug: post.slug }))
  )
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | AFV Cocinas`,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: post.title }],
    },
    twitter: { title: post.title, description: post.excerpt },
  }
}

export const dynamicParams = false

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'blog' })

  const post = getPostBySlug(slug)
  if (!post) notFound()

  const { default: PostContent } = await import(`@/content/blog/${slug}.mdx`)

  return (
    <>
      {/* Hero */}
      <section
        style={{
          backgroundColor: '#0E0E0C',
          backgroundImage: 'radial-gradient(ellipse at 60% 40%, rgba(201,169,110,0.05) 0%, transparent 55%)',
          paddingTop: '128px',
          paddingBottom: '56px',
          borderBottom: '0.5px solid rgba(201,169,110,0.08)',
        }}
      >
        <div className="mx-auto px-5 md:px-8" style={{ maxWidth: '768px' }}>
          <Link
            href="/blog"
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 400,
              fontSize: '13px',
              color: '#85837B',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              marginBottom: '40px',
              letterSpacing: '0.5px',
              transition: 'color 0.2s ease',
            }}
          >
            {t('backToBlogShort')}
          </Link>

          {post.tags.length > 0 && (
            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 500,
                    fontSize: '10px',
                    letterSpacing: '3px',
                    textTransform: 'uppercase',
                    color: '#C9A96E',
                    border: '0.5px solid rgba(201,169,110,0.3)',
                    padding: '4px 10px',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h1 style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, fontSize: 'clamp(28px, 4vw, 48px)', color: '#F2F0E8', lineHeight: 1.15, marginBottom: '20px' }}>
            {post.title}
          </h1>
          <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 400, fontSize: '13px', color: '#85837B', letterSpacing: '0.5px' }}>
            {formatDate(post.date)}
          </p>
        </div>
      </section>

      {/* Image placeholder */}
      <div style={{ width: '100%', aspectRatio: '21/7', backgroundColor: '#1A1A17', backgroundImage: 'radial-gradient(ellipse at 50% 50%, rgba(201,169,110,0.06) 0%, transparent 65%)', borderBottom: '0.5px solid rgba(201,169,110,0.06)' }} />

      {/* Article content */}
      <article style={{ backgroundColor: '#0E0E0C', paddingTop: '64px', paddingBottom: '96px' }}>
        <div className="mx-auto px-5 md:px-8" style={{ maxWidth: '768px' }}>
          <PostContent components={mdxComponents} />
          <div style={{ height: '0.5px', backgroundColor: 'rgba(201,169,110,0.1)', margin: '56px 0 48px' }} />
          <Link href="/blog" className="btn-outline" style={{ display: 'inline-block' }}>
            {t('backToBlog')}
          </Link>
        </div>
      </article>
    </>
  )
}
