'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import { Link } from '@/lib/navigation'

type Encimera = 'laminado' | 'silestone' | 'granito' | 'dekton'
type Electrodomesticos = 'media' | 'alta' | 'no'
type TipoTrabajo = 'montaje' | 'montaje-muebles' | 'reforma'

interface CalcState {
  metros: number
  encimera: Encimera | null
  electrodomesticos: Electrodomesticos | null
  trabajo: TipoTrabajo | null
}

function calcularPresupuesto(
  state: CalcState,
  encimeraOpciones: { id: Encimera; precioMedio: number }[],
  electroOpciones: { id: Electrodomesticos; extra: number }[],
  trabajoOpciones: { id: TipoTrabajo; factor: number }[],
): { min: number; max: number } | null {
  if (!state.encimera || !state.electrodomesticos || !state.trabajo) return null
  const enc = encimeraOpciones.find((e) => e.id === state.encimera)!
  const elec = electroOpciones.find((e) => e.id === state.electrodomesticos)!
  const trab = trabajoOpciones.find((e) => e.id === state.trabajo)!

  const base = state.metros * enc.precioMedio + elec.extra
  const total = base * trab.factor

  return {
    min: Math.round((total * 0.8) / 100) * 100,
    max: Math.round((total * 1.2) / 100) * 100,
  }
}

const slideVariants = {
  enter: (dir: number) => ({ opacity: 0, x: dir * 40 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir * -40 }),
}

export default function BudgetCalculator() {
  const [step, setStep] = useState(1)
  const [dir, setDir] = useState(1)
  const [state, setState] = useState<CalcState>({
    metros: 4,
    encimera: null,
    electrodomesticos: null,
    trabajo: null,
  })

  const t = useTranslations('calculator')
  const locale = useLocale()

  function formatEuro(n: number): string {
    return n.toLocaleString(locale === 'en' ? 'en-GB' : 'es-ES') + ' €'
  }

  const encimeraOpciones: { id: Encimera; label: string; rango: string; precioMedio: number }[] = [
    { id: 'laminado', label: t('step2.laminadoLabel'), rango: t('step2.laminadoRange'), precioMedio: 200 },
    { id: 'silestone', label: t('step2.silestoneLabel'), rango: t('step2.silestoneRange'), precioMedio: 500 },
    { id: 'granito', label: t('step2.granitoLabel'), rango: t('step2.granitoRange'), precioMedio: 425 },
    { id: 'dekton', label: t('step2.dektonLabel'), rango: t('step2.dektonRange'), precioMedio: 600 },
  ]

  const electroOpciones: { id: Electrodomesticos; label: string; sublabel: string; extra: number }[] = [
    { id: 'media', label: t('step3.mediaLabel'), sublabel: t('step3.mediaSublabel'), extra: 2000 },
    { id: 'alta', label: t('step3.altaLabel'), sublabel: t('step3.altaSublabel'), extra: 5000 },
    { id: 'no', label: t('step3.noLabel'), sublabel: t('step3.noSublabel'), extra: 0 },
  ]

  const trabajoOpciones: { id: TipoTrabajo; label: string; sublabel: string; factor: number }[] = [
    { id: 'montaje', label: t('step4.montajeLabel'), sublabel: t('step4.montajeSublabel'), factor: 1 },
    { id: 'montaje-muebles', label: t('step4.montajeMueblesLabel'), sublabel: t('step4.montajeMueblesSublabel'), factor: 2.5 },
    { id: 'reforma', label: t('step4.reformaLabel'), sublabel: t('step4.reformaSublabel'), factor: 4 },
  ]

  const totalSteps = 4
  const resultado = step === 5 ? calcularPresupuesto(state, encimeraOpciones, electroOpciones, trabajoOpciones) : null

  function goNext() {
    setDir(1)
    setStep((s) => Math.min(s + 1, 5))
  }
  function goPrev() {
    setDir(-1)
    setStep((s) => Math.max(s - 1, 1))
  }

  function canAdvance() {
    if (step === 1) return true
    if (step === 2) return state.encimera !== null
    if (step === 3) return state.electrodomesticos !== null
    if (step === 4) return state.trabajo !== null
    return false
  }

  return (
    <div
      style={{
        backgroundColor: '#1A1A17',
        border: '0.5px solid rgba(201,169,110,0.12)',
        padding: 'clamp(28px, 4vw, 48px)',
      }}
    >
      {/* Progress bar */}
      {step <= totalSteps && (
        <div style={{ marginBottom: '36px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 500,
                fontSize: '11px',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                color: '#C9A96E',
              }}
            >
              {t('stepOf', { step, total: totalSteps })}
            </span>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', color: '#85837B' }}>
              {Math.round((step / totalSteps) * 100)}%
            </span>
          </div>
          <div
            style={{
              height: '2px',
              backgroundColor: 'rgba(201,169,110,0.12)',
              display: 'flex',
              gap: '3px',
            }}
          >
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: '100%',
                  backgroundColor: i < step ? '#C9A96E' : 'transparent',
                  transition: 'background-color 0.3s ease',
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Steps */}
      <div style={{ minHeight: '280px', position: 'relative', overflow: 'hidden' }}>
        <AnimatePresence mode="wait" custom={dir}>
          {step === 1 && (
            <motion.div
              key="step1"
              custom={dir}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <p style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, fontSize: 'clamp(20px, 2.5vw, 28px)', color: '#F2F0E8', marginBottom: '8px' }}>
                {t('step1.question')}
              </p>
              <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '14px', color: '#85837B', marginBottom: '40px' }}>
                {t('step1.hint')}
              </p>

              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <span style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, fontSize: 'clamp(48px, 8vw, 72px)', color: '#C9A96E', lineHeight: 1 }}>
                  {state.metros}
                </span>
                <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '18px', color: '#9C9A8E', marginLeft: '8px' }}>
                  {t('step1.unit')}
                </span>
              </div>

              <input
                type="range"
                min={2}
                max={10}
                step={0.5}
                value={state.metros}
                onChange={(e) => setState({ ...state, metros: parseFloat(e.target.value) })}
                style={{
                  width: '100%',
                  appearance: 'none',
                  height: '3px',
                  backgroundColor: 'rgba(201,169,110,0.2)',
                  outline: 'none',
                  cursor: 'pointer',
                  accentColor: '#C9A96E',
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontFamily: 'var(--font-sans)', fontSize: '12px', color: '#85837B' }}>
                <span>{t('step1.minLabel')}</span>
                <span>{t('step1.maxLabel')}</span>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              custom={dir}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <p style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, fontSize: 'clamp(20px, 2.5vw, 28px)', color: '#F2F0E8', marginBottom: '8px' }}>
                {t('step2.question')}
              </p>
              <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '14px', color: '#85837B', marginBottom: '28px' }}>
                {t('step2.hint')}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '12px' }}>
                {encimeraOpciones.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setState({ ...state, encimera: opt.id })}
                    style={{
                      padding: '20px 16px',
                      backgroundColor: state.encimera === opt.id ? 'rgba(201,169,110,0.1)' : '#0E0E0C',
                      border: state.encimera === opt.id ? '1px solid #C9A96E' : '0.5px solid rgba(201,169,110,0.12)',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <p style={{ fontFamily: 'var(--font-serif)', fontWeight: 500, fontSize: '18px', color: state.encimera === opt.id ? '#C9A96E' : '#F2F0E8', marginBottom: '6px' }}>
                      {opt.label}
                    </p>
                    <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '12px', color: '#85837B' }}>
                      {opt.rango}
                    </p>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              custom={dir}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <p style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, fontSize: 'clamp(20px, 2.5vw, 28px)', color: '#F2F0E8', marginBottom: '8px' }}>
                {t('step3.question')}
              </p>
              <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '14px', color: '#85837B', marginBottom: '28px' }}>
                {t('step3.hint')}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {electroOpciones.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setState({ ...state, electrodomesticos: opt.id })}
                    style={{
                      padding: '20px 24px',
                      backgroundColor: state.electrodomesticos === opt.id ? 'rgba(201,169,110,0.1)' : '#0E0E0C',
                      border: state.electrodomesticos === opt.id ? '1px solid #C9A96E' : '0.5px solid rgba(201,169,110,0.12)',
                      cursor: 'pointer',
                      textAlign: 'left',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '16px',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <div>
                      <p style={{ fontFamily: 'var(--font-serif)', fontWeight: 500, fontSize: '18px', color: state.electrodomesticos === opt.id ? '#C9A96E' : '#F2F0E8', marginBottom: '4px' }}>
                        {opt.label}
                      </p>
                      <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '13px', color: '#85837B' }}>
                        {opt.sublabel}
                      </p>
                    </div>
                    {opt.extra > 0 && (
                      <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 400, fontSize: '12px', color: '#8B7444', whiteSpace: 'nowrap' }}>
                        +{formatEuro(opt.extra)}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              custom={dir}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <p style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, fontSize: 'clamp(20px, 2.5vw, 28px)', color: '#F2F0E8', marginBottom: '8px' }}>
                {t('step4.question')}
              </p>
              <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '14px', color: '#85837B', marginBottom: '28px' }}>
                {t('step4.hint')}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {trabajoOpciones.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setState({ ...state, trabajo: opt.id })}
                    style={{
                      padding: '20px 24px',
                      backgroundColor: state.trabajo === opt.id ? 'rgba(201,169,110,0.1)' : '#0E0E0C',
                      border: state.trabajo === opt.id ? '1px solid #C9A96E' : '0.5px solid rgba(201,169,110,0.12)',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <p style={{ fontFamily: 'var(--font-serif)', fontWeight: 500, fontSize: '18px', color: state.trabajo === opt.id ? '#C9A96E' : '#F2F0E8', marginBottom: '4px' }}>
                      {opt.label}
                    </p>
                    <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '13px', color: '#85837B' }}>
                      {opt.sublabel}
                    </p>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 5 && resultado && (
            <motion.div
              key="result"
              custom={dir}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              style={{ textAlign: 'center', paddingTop: '16px' }}
            >
              <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase', color: '#C9A96E', marginBottom: '20px' }}>
                {t('result.tag')}
              </p>
              <p style={{ fontFamily: 'var(--font-serif)', fontWeight: 300, fontSize: 'clamp(16px, 2vw, 20px)', color: '#9C9A8E', marginBottom: '12px' }}>
                {t('result.intro')}
              </p>
              <p style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, fontSize: 'clamp(32px, 6vw, 54px)', color: '#C9A96E', lineHeight: 1.1, marginBottom: '4px' }}>
                {formatEuro(resultado.min)} – {formatEuro(resultado.max)}
              </p>
              <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '12px', color: '#85837B', marginBottom: '36px', maxWidth: '420px', margin: '12px auto 40px', lineHeight: 1.6 }}>
                {t('result.disclaimer')}
              </p>
              <Link href="/presupuesto" className="btn-primary" style={{ display: 'inline-block' }}>
                {t('result.exactCta')}
              </Link>
              <div style={{ marginTop: '20px' }}>
                <button
                  onClick={() => {
                    setDir(-1)
                    setStep(1)
                    setState({ metros: 4, encimera: null, electrodomesticos: null, trabajo: null })
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '12px',
                    color: '#85837B',
                    letterSpacing: '1px',
                    padding: '8px',
                    textDecoration: 'underline',
                    textDecorationColor: 'rgba(107,106,96,0.4)',
                  }}
                >
                  {t('result.recalculate')}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation buttons */}
      {step <= totalSteps && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '36px',
            paddingTop: '24px',
            borderTop: '0.5px solid rgba(201,169,110,0.08)',
          }}
        >
          <button
            onClick={goPrev}
            disabled={step === 1}
            style={{
              background: 'none',
              border: '0.5px solid rgba(201,169,110,0.2)',
              padding: '10px 20px',
              cursor: step === 1 ? 'default' : 'pointer',
              fontFamily: 'var(--font-sans)',
              fontWeight: 500,
              fontSize: '11px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: step === 1 ? '#3A3A37' : '#9C9A8E',
              borderColor: step === 1 ? 'rgba(201,169,110,0.06)' : 'rgba(201,169,110,0.2)',
              transition: 'all 0.2s ease',
            }}
          >
            {t('nav.prev')}
          </button>

          <button
            onClick={goNext}
            disabled={!canAdvance()}
            style={{
              backgroundColor: canAdvance() ? '#C9A96E' : 'rgba(201,169,110,0.15)',
              border: 'none',
              padding: '12px 28px',
              cursor: canAdvance() ? 'pointer' : 'default',
              fontFamily: 'var(--font-sans)',
              fontWeight: 500,
              fontSize: '11px',
              letterSpacing: '2.5px',
              textTransform: 'uppercase',
              color: canAdvance() ? '#0E0E0C' : '#85837B',
              transition: 'all 0.3s ease',
            }}
          >
            {step === totalSteps ? t('nav.viewResult') : t('nav.next')}
          </button>
        </div>
      )}
    </div>
  )
}
