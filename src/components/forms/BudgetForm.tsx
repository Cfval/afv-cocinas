'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useTranslations } from 'next-intl'
import { Link } from '@/lib/navigation'

const FILE_MAX = 5
const FILE_SIZE_MB = 5
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'application/pdf']

function Spinner() {
  return (
    <svg
      className="animate-spin"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </svg>
  )
}

export default function BudgetForm() {
  const [files, setFiles] = useState<File[]>([])
  const [fileError, setFileError] = useState<string | null>(null)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const t = useTranslations('forms.budget')
  const tv = useTranslations('forms.budget.validation')

  const schema = z.object({
    nombre: z.string().min(2, tv('nameRequired')),
    email: z.string().email(tv('emailInvalid')),
    telefono: z.string().min(9, tv('phoneRequired')),
    poblacion: z.string().min(2, tv('cityRequired')),
    tipoServicio: z.enum(['montaje', 'reforma', 'diseno-montaje', 'diseno', 'otro'], {
      message: tv('serviceTypeRequired'),
    }),
    metros: z.string().optional(),
    electrodomesticos: z.enum(['si', 'no', 'algunos'], {
      message: tv('appliancesRequired'),
    }),
    descripcion: z.string().optional(),
    presupuesto: z.enum(['menos-3000', '3000-6000', '6000-10000', 'mas-10000', 'no-se'], {
      message: tv('budgetRequired'),
    }),
  })

  type FormData = z.infer<typeof schema>

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null)
    const selected = Array.from(e.target.files ?? [])
    if (selected.length > FILE_MAX) {
      setFileError(tv('filesTooMany', { max: FILE_MAX }))
      return
    }
    for (const f of selected) {
      if (!ALLOWED_TYPES.includes(f.type)) {
        setFileError(tv('fileTypeInvalid'))
        return
      }
      if (f.size > FILE_SIZE_MB * 1024 * 1024) {
        setFileError(tv('fileTooLarge', { max: FILE_SIZE_MB }))
        return
      }
    }
    setFiles(selected)
  }

  const onSubmit = async (data: FormData) => {
    setStatus('idle')
    try {
      const payload = {
        type: 'presupuesto',
        ...data,
        archivos: files.map((f) => ({ nombre: f.name, tipo: f.type, tamaño: f.size })),
      }
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Server error')
      setStatus('success')
      reset()
      setFiles([])
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div
        style={{
          backgroundColor: 'rgba(93,202,165,0.08)',
          border: '1px solid rgba(93,202,165,0.3)',
          padding: '32px',
          textAlign: 'center',
        }}
      >
        <div style={{ color: '#5DCAA5', fontSize: '32px', marginBottom: '12px' }}>✓</div>
        <h3
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '24px',
            color: '#F2F0E8',
            marginBottom: '10px',
          }}
        >
          {t('successTitle')}
        </h3>
        <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, color: '#9C9A8E', fontSize: '15px' }}>
          {t('successBody')}
        </p>
        <button
          className="btn-outline"
          style={{ marginTop: '24px' }}
          onClick={() => setStatus('idle')}
        >
          {t('sendAnother')}
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* Error banner */}
      {status === 'error' && (
        <div
          style={{
            backgroundColor: 'rgba(226,75,74,0.08)',
            border: '1px solid rgba(226,75,74,0.3)',
            padding: '14px 18px',
            marginBottom: '24px',
            fontFamily: 'var(--font-sans)',
            fontSize: '14px',
            color: '#E24B4A',
          }}
        >
          {t('errorBanner')}
        </div>
      )}

      {/* Datos personales */}
      <p
        style={{
          fontFamily: 'var(--font-sans)',
          fontWeight: 500,
          fontSize: '11px',
          letterSpacing: '3px',
          textTransform: 'uppercase',
          color: '#C9A96E',
          marginBottom: '20px',
        }}
      >
        {t('sectionPersonal')}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        <div>
          <label className="form-label" htmlFor="nombre">{t('nameLabel')}</label>
          <input id="nombre" className={`form-input ${errors.nombre ? 'form-input-error' : ''}`} placeholder={t('namePlaceholder')} {...register('nombre')} />
          {errors.nombre && <p className="form-error">{errors.nombre.message}</p>}
        </div>
        <div>
          <label className="form-label" htmlFor="email">{t('emailLabel')}</label>
          <input id="email" type="email" className={`form-input ${errors.email ? 'form-input-error' : ''}`} placeholder={t('emailPlaceholder')} {...register('email')} />
          {errors.email && <p className="form-error">{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
        <div>
          <label className="form-label" htmlFor="telefono">{t('phoneLabel')}</label>
          <input id="telefono" type="tel" className={`form-input ${errors.telefono ? 'form-input-error' : ''}`} placeholder={t('phonePlaceholder')} {...register('telefono')} />
          {errors.telefono && <p className="form-error">{errors.telefono.message}</p>}
        </div>
        <div>
          <label className="form-label" htmlFor="poblacion">{t('cityLabel')}</label>
          <input id="poblacion" className={`form-input ${errors.poblacion ? 'form-input-error' : ''}`} placeholder={t('cityPlaceholder')} {...register('poblacion')} />
          {errors.poblacion && <p className="form-error">{errors.poblacion.message}</p>}
        </div>
      </div>

      {/* Sobre tu cocina */}
      <p
        style={{
          fontFamily: 'var(--font-sans)',
          fontWeight: 500,
          fontSize: '11px',
          letterSpacing: '3px',
          textTransform: 'uppercase',
          color: '#C9A96E',
          marginBottom: '20px',
        }}
      >
        {t('sectionKitchen')}
      </p>

      <div className="mb-5">
        <label className="form-label" htmlFor="tipoServicio">{t('serviceTypeLabel')}</label>
        <select id="tipoServicio" className={`form-input ${errors.tipoServicio ? 'form-input-error' : ''}`} defaultValue="" {...register('tipoServicio')}>
          <option value="" disabled>{t('serviceTypeDefault')}</option>
          <option value="montaje">{t('serviceMontaje')}</option>
          <option value="reforma">{t('serviceReforma')}</option>
          <option value="diseno-montaje">{t('serviceDisenoMontaje')}</option>
          <option value="diseno">{t('serviceDiseno')}</option>
          <option value="otro">{t('serviceOtro')}</option>
        </select>
        {errors.tipoServicio && <p className="form-error">{errors.tipoServicio.message}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        <div>
          <label className="form-label" htmlFor="metros">{t('metersLabel')}</label>
          <input id="metros" type="number" min="1" step="0.5" className="form-input" placeholder={t('metersPlaceholder')} {...register('metros')} />
        </div>
        <div>
          <label className="form-label">{t('appliancesLabel')}</label>
          <div className="flex flex-col gap-3 mt-2">
            {[
              { value: 'si', label: t('appliancesYes') },
              { value: 'no', label: t('appliancesNo') },
              { value: 'algunos', label: t('appliancesSome') },
            ].map((opt) => (
              <label
                key={opt.value}
                className="flex items-center gap-3 cursor-pointer"
                style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '15px', color: '#9C9A8E' }}
              >
                <input
                  type="radio"
                  value={opt.value}
                  {...register('electrodomesticos')}
                  style={{ accentColor: '#C9A96E', width: '16px', height: '16px' }}
                />
                {opt.label}
              </label>
            ))}
          </div>
          {errors.electrodomesticos && <p className="form-error">{errors.electrodomesticos.message}</p>}
        </div>
      </div>

      <div className="mb-5">
        <label className="form-label" htmlFor="descripcion">{t('descriptionLabel')}</label>
        <textarea
          id="descripcion"
          className="form-input"
          rows={4}
          placeholder={t('descriptionPlaceholder')}
          style={{ resize: 'vertical' }}
          {...register('descripcion')}
        />
      </div>

      <div className="mb-8">
        <label className="form-label" htmlFor="presupuesto">{t('budgetRangeLabel')}</label>
        <select id="presupuesto" className={`form-input ${errors.presupuesto ? 'form-input-error' : ''}`} defaultValue="" {...register('presupuesto')}>
          <option value="" disabled>{t('budgetRangeDefault')}</option>
          <option value="menos-3000">{t('budgetMenos3000')}</option>
          <option value="3000-6000">{t('budget3000a6000')}</option>
          <option value="6000-10000">{t('budget6000a10000')}</option>
          <option value="mas-10000">{t('budgetMas10000')}</option>
          <option value="no-se">{t('budgetNoSe')}</option>
        </select>
        {errors.presupuesto && <p className="form-error">{errors.presupuesto.message}</p>}
      </div>

      {/* Adjuntos */}
      <p
        style={{
          fontFamily: 'var(--font-sans)',
          fontWeight: 500,
          fontSize: '11px',
          letterSpacing: '3px',
          textTransform: 'uppercase',
          color: '#C9A96E',
          marginBottom: '20px',
        }}
      >
        {t('sectionFiles')}
      </p>

      <div className="mb-8">
        <label className="form-label">{t('filesLabel')}</label>
        <label
          className="flex flex-col items-center justify-center gap-3 cursor-pointer"
          style={{
            border: '1px dashed rgba(201,169,110,0.25)',
            padding: '32px',
            backgroundColor: '#1A1A17',
            transition: 'border-color 0.25s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(201,169,110,0.5)')}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(201,169,110,0.25)')}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(201,169,110,0.5)" strokeWidth="1.5">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '14px', color: '#85837B' }}>
            {t('filesDragText')} <span style={{ color: '#C9A96E' }}>{t('filesClickText')}</span>
          </span>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: '#85837B' }}>
            {t('filesHint')}
          </span>
          <input type="file" multiple accept=".jpg,.jpeg,.png,.pdf" className="hidden" onChange={handleFileChange} />
        </label>
        {fileError && <p className="form-error">{fileError}</p>}

        {/* Preview */}
        {files.length > 0 && (
          <div className="flex flex-wrap gap-3 mt-4">
            {files.map((file, i) => (
              <div
                key={i}
                style={{
                  position: 'relative',
                  width: '80px',
                  height: '80px',
                  backgroundColor: '#222220',
                  border: '0.5px solid rgba(201,169,110,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                }}
              >
                {file.type.startsWith('image/') ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: '10px', color: '#9C9A8E', padding: '4px', textAlign: 'center', wordBreak: 'break-all' }}>
                    {file.name.slice(0, 20)}
                  </span>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => setFiles([])}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '11px',
                color: '#85837B',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                alignSelf: 'center',
              }}
            >
              {t('filesRemoveAll')}
            </button>
          </div>
        )}
      </div>

      {/* Submit */}
      <button type="submit" className="btn-primary w-full justify-center" disabled={isSubmitting} style={{ width: '100%', justifyContent: 'center' }}>
        {isSubmitting ? (
          <>
            <Spinner />
            {t('sending')}
          </>
        ) : (
          t('submitButton')
        )}
      </button>

      <p
        style={{
          fontFamily: 'var(--font-sans)',
          fontWeight: 300,
          fontSize: '12px',
          color: '#85837B',
          textAlign: 'center',
          marginTop: '16px',
        }}
      >
        {t('privacyText')}{' '}
        <Link href="/politica-privacidad" style={{ color: '#9C9A8E', textDecoration: 'underline' }}>
          {t('privacyLink')}
        </Link>
        .
      </p>
    </form>
  )
}
