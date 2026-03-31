import { useTranslations } from 'next-intl'
import { Post } from '@/lib/mdx'
import PostCard from './PostCard'

interface PostListProps {
  posts: Post[]
}

export default function PostList({ posts }: PostListProps) {
  const t = useTranslations('blog')

  if (posts.length === 0) {
    return (
      <p
        style={{
          fontFamily: 'var(--font-sans)',
          fontWeight: 300,
          fontSize: '15px',
          color: '#85837B',
          textAlign: 'center',
          padding: '60px 0',
        }}
      >
        {t('noPosts')}
      </p>
    )
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
        gap: '24px',
      }}
    >
      {posts.map((post, i) => (
        <PostCard key={post.slug} post={post} index={i} />
      ))}
    </div>
  )
}
