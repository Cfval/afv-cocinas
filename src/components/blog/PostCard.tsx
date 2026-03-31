'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Link } from '@/lib/navigation'
import type { Post } from '@/lib/mdx'

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })
}

interface PostCardProps {
  post: Post
  index?: number
}

export default function PostCard({ post, index = 0 }: PostCardProps) {
  const t = useTranslations('blog')

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.1 }}
    >
      <Link
        href={`/blog/${post.slug}`}
        style={{ display: 'block', textDecoration: 'none' }}
        className="group"
      >
        <article
          style={{
            backgroundColor: '#1A1A17',
            border: '0.5px solid rgba(201,169,110,0.08)',
            overflow: 'hidden',
            transition: 'border-color 0.3s ease, transform 0.3s ease',
          }}
          className="group-hover:[border-color:rgba(201,169,110,0.25)] group-hover:[-webkit-transform:translateY(-2px)] group-hover:[transform:translateY(-2px)]"
        >
          {/* Image placeholder */}
          <div
            style={{
              aspectRatio: '16/9',
              backgroundColor: '#222220',
              backgroundImage: 'radial-gradient(ellipse at 60% 40%, rgba(201,169,110,0.06) 0%, transparent 60%)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to bottom, transparent 50%, rgba(14,14,12,0.6) 100%)',
              }}
            />
            {/* Tag */}
            {post.tags[0] && (
              <div
                style={{
                  position: 'absolute',
                  top: '16px',
                  left: '16px',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 500,
                  fontSize: '10px',
                  letterSpacing: '3px',
                  textTransform: 'uppercase',
                  color: '#C9A96E',
                  backgroundColor: 'rgba(14,14,12,0.8)',
                  padding: '5px 10px',
                  backdropFilter: 'blur(4px)',
                }}
              >
                {post.tags[0]}
              </div>
            )}
          </div>

          {/* Content */}
          <div style={{ padding: '24px 24px 28px' }}>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 400,
                fontSize: '12px',
                color: '#85837B',
                marginBottom: '12px',
                letterSpacing: '0.5px',
              }}
            >
              {formatDate(post.date)}
            </p>

            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontWeight: 500,
                fontSize: 'clamp(18px, 1.8vw, 22px)',
                color: '#F2F0E8',
                lineHeight: 1.3,
                marginBottom: '12px',
                transition: 'color 0.2s ease',
              }}
              className="group-hover:[color:#C9A96E]"
            >
              {post.title}
            </h3>

            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 300,
                fontSize: '14px',
                color: '#9C9A8E',
                lineHeight: 1.7,
                marginBottom: '20px',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {post.excerpt}
            </p>

            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 500,
                fontSize: '11px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: '#C9A96E',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'gap 0.2s ease',
              }}
              className="group-hover:[gap:10px]"
            >
              {t('readArticle')}
            </span>
          </div>
        </article>
      </Link>
    </motion.div>
  )
}
