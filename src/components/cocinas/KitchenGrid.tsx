'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Kitchen } from '@/data/kitchens'
import KitchenCard from './KitchenCard'
import KitchenFilters from './KitchenFilters'

export default function KitchenGrid({ kitchens }: { kitchens: Kitchen[] }) {
  const [activeFilter, setActiveFilter] = useState('todas')

  const filtered = kitchens.filter((k) => {
    if (activeFilter === 'todas') return true
    if (activeFilter === 'con-isla') return k.hasIsland === true
    return k.style === activeFilter
  })

  return (
    <div>
      {/* Filters */}
      <div className="mb-10">
        <KitchenFilters activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <AnimatePresence mode="popLayout">
          {filtered.map((kitchen) => (
            <motion.div
              key={kitchen.slug}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: 'easeOut' as const }}
            >
              <KitchenCard kitchen={kitchen} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <p
          className="text-center py-16"
          style={{
            fontFamily: 'var(--font-sans)',
            color: '#85837B',
            fontSize: '15px',
          }}
        >
          No hay cocinas en esta categoría todavía.
        </p>
      )}
    </div>
  )
}
