'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { useTranslations } from 'next-intl'

interface Stat {
  value: number | null
  suffix: string
  label: string
  display?: string
}

function useCounter(target: number, duration: number, active: boolean) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!active) return
    let startTime: number | null = null
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [active, target, duration])

  return count
}

function StatItem({ stat, active }: { stat: Stat; active: boolean }) {
  const count = useCounter(stat.value ?? 0, 1800, active && stat.value !== null)

  return (
    <div className="flex flex-col items-center text-center px-4 py-10 md:py-14">
      <div
        style={{
          fontFamily: 'var(--font-serif)',
          fontWeight: 400,
          fontSize: 'clamp(40px, 4.5vw, 60px)',
          color: '#C9A96E',
          lineHeight: 1,
          marginBottom: '12px',
          letterSpacing: '-0.01em',
        }}
      >
        {stat.value !== null ? `${count}${stat.suffix}` : stat.display}
      </div>

      <p
        style={{
          fontFamily: 'var(--font-sans)',
          fontWeight: 500,
          fontSize: '11px',
          letterSpacing: '3px',
          textTransform: 'uppercase',
          color: '#9C9A8E',
        }}
      >
        {stat.label}
      </p>
    </div>
  )
}

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const t = useTranslations('home.stats')

  const stats: Stat[] = [
    { value: 15, suffix: '+', label: t('yearsLabel') },
    { value: 500, suffix: '+', label: t('kitchensLabel') },
    { value: 100, suffix: '%', label: t('satisfactionLabel') },
    { value: null, suffix: '', label: t('areaLabel'), display: 'Alicante' },
  ]

  return (
    <section
      ref={ref}
      style={{
        backgroundColor: '#1A1A17',
        borderTop: '0.5px solid rgba(201,169,110,0.1)',
        borderBottom: '0.5px solid rgba(201,169,110,0.1)',
      }}
    >
      <div
        className="mx-auto"
        style={{ maxWidth: '1280px' }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={[
                'relative',
                /* Right border: on mobile only left column (even index); on desktop all except last */
                i % 2 === 0 ? 'border-r' : '',
                i < stats.length - 1 && i % 2 !== 0 ? 'md:border-r' : '',
                /* Bottom border on mobile for top row */
                i < 2 ? 'border-b md:border-b-0' : '',
              ].join(' ')}
              style={{ borderColor: 'rgba(201,169,110,0.12)' }}
            >
              <StatItem stat={stat} active={isInView} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
