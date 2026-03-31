'use client'

import Image from 'next/image'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import Lightbox from 'yet-another-react-lightbox'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import 'yet-another-react-lightbox/styles.css'

const PAGE_SIZE = 12
const aspects = ['3/4', '4/3', '3/4', '1/1', '4/5', '3/4', '16/9', '3/4', '4/5', '3/4', '4/3', '1/1']

interface GalleryImage {
  src: string
  alt: string
}

export default function MasonryGrid({ images }: { images: GalleryImage[] }) {
  const [visible, setVisible] = useState(PAGE_SIZE)
  const [lightboxIndex, setLightboxIndex] = useState(-1)
  const [loaded, setLoaded] = useState<Record<string, boolean>>({})
  const t = useTranslations('galeria')

  const visibleImages = images.slice(0, visible)
  const hasMore = visible < images.length
  const slides = images.map((img) => ({ src: img.src }))

  return (
    <>
      <div
        style={{ columnGap: '12px' }}
        className="[column-count:1] sm:[column-count:2] lg:[column-count:3]"
      >
        {visibleImages.map((img, i) => (
          <div
            key={img.src}
            style={{ breakInside: 'avoid', marginBottom: '12px', display: 'block' }}
          >
            <button
              className="relative w-full overflow-hidden group block"
              onClick={() => setLightboxIndex(i)}
              style={{ aspectRatio: aspects[i % aspects.length], cursor: 'zoom-in' }}
            >
              <div className="absolute inset-0 img-shimmer" />
              <motion.div
                className="absolute inset-0"
                initial={{ clipPath: 'inset(0 0 100% 0)' }}
                whileInView={{ clipPath: 'inset(0 0 0% 0)' }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.65,
                  ease: [0.22, 1, 0.36, 1],
                  delay: Math.min((i % PAGE_SIZE) * 0.03, 0.2),
                }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  priority={i < 3}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 60vw, 50vw"
                  quality={85}
                  onLoad={() => setLoaded((prev) => ({ ...prev, [img.src]: true }))}
                  style={{
                    objectFit: 'cover',
                    transition: 'transform 0.7s ease, opacity 0.2s ease',
                    opacity: loaded[img.src] ? 1 : 0,
                  }}
                  className="group-hover:scale-[1.04]"
                />
              </motion.div>
              {/* Hover overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                style={{ backgroundColor: 'rgba(14,14,12,0.3)' }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(201,169,110,0.8)" strokeWidth="1.5">
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                </svg>
              </div>
            </button>
          </div>
        ))}
      </div>

      {/* Load more */}
      {hasMore && (
        <div className="flex justify-center mt-12 mb-4">
          <button
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            className="btn-outline"
          >
            {t('loadMore')}
          </button>
        </div>
      )}

      <Lightbox
        open={lightboxIndex >= 0}
        index={lightboxIndex}
        close={() => setLightboxIndex(-1)}
        slides={slides}
        plugins={[Zoom]}
      />
    </>
  )
}
