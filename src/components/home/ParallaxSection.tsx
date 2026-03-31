'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import parallax1 from '../../../public/images/parallax/parallax-1.jpg'
import parallax2 from '../../../public/images/parallax/parallax-2.jpg'

interface ParallaxSectionProps {
  phraseKey: 'phrase1' | 'phrase2'
}

export default function ParallaxSection({ phraseKey }: ParallaxSectionProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [translateY, setTranslateY] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const t = useTranslations('home.parallax')
  const imgSrc = phraseKey === 'phrase1' ? parallax1 : parallax2

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    if (isMobile) return
    const handleScroll = () => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height)
      setTranslateY((progress - 0.5) * 80)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isMobile])

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden flex items-center justify-center"
      style={{ minHeight: isMobile ? '280px' : '420px' }}
    >
      {/* Parallax image */}
      <div
        className="absolute"
        style={{
          inset: '-15% 0',
          transform: isMobile ? 'none' : `translateY(${translateY}px)`,
          transition: isMobile ? 'none' : undefined,
        }}
      >
        <Image
          src={imgSrc}
          alt="Cocina de diseño"
          fill
          sizes="100vw"
          placeholder="blur"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
      </div>

      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: 'rgba(14,14,12,0.6)' }}
      />

      {/* Thin gold lines decoration */}
      <div
        className="absolute left-0 right-0"
        style={{
          top: 0,
          height: '0.5px',
          backgroundColor: 'rgba(201,169,110,0.15)',
        }}
      />
      <div
        className="absolute left-0 right-0"
        style={{
          bottom: 0,
          height: '0.5px',
          backgroundColor: 'rgba(201,169,110,0.15)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-5 md:px-8">
        {/* Decorative dash */}
        <div
          style={{
            width: '40px',
            height: '1px',
            backgroundColor: 'rgba(201,169,110,0.5)',
            margin: '0 auto 20px',
          }}
        />

        <p
          style={{
            fontFamily: 'var(--font-serif)',
            fontWeight: 400,
            fontStyle: 'italic',
            fontSize: 'clamp(24px, 3.5vw, 40px)',
            color: '#C9A96E',
            lineHeight: 1.3,
            letterSpacing: '0.02em',
          }}
        >
          {t(phraseKey)}
        </p>

        {/* Decorative dash */}
        <div
          style={{
            width: '40px',
            height: '1px',
            backgroundColor: 'rgba(201,169,110,0.5)',
            margin: '20px auto 0',
          }}
        />
      </div>
    </div>
  )
}
