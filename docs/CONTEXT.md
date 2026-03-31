# AFV Cocinas - Contexto Operativo para Agentes

Ultima actualizacion: 2026-03-31
Objetivo: servir como contexto rapido y fiable cuando un agente pierda estado del proyecto.

## 1) Estado general del proyecto

- Proyecto en produccion de frontend con enfoque escaparate premium para captacion de leads.
- Implementacion real va por delante del plan original de `docs/SPECS.md` en varias areas (i18n, legal, SEO base, blog, formularios, componentes clave).
- Hay mucho trabajo visual reciente en curso (muchos archivos modificados en home, blog, cocinas, formularios y layout).
- `docs/SPECS.md` sigue siendo referencia de vision y diseño, pero no refleja al 100% el estado actual.

## 2) Stack real (confirmado en codigo)

- `next@16.2.1`, `react@19.2.4`, `typescript@5`, `tailwindcss@4`, `eslint@9`.
- i18n con `next-intl@4.8.3`.
- Animaciones con `framer-motion`.
- Blog MDX con `@next/mdx`, `gray-matter`.
- Formularios con `react-hook-form` + `zod`.
- Galeria/lightbox con `yet-another-react-lightbox`.
- Before/after con `react-compare-slider`.

Nota importante: el SPECS menciona Next 14/Tailwind 3; el proyecto real esta en Next 16/Tailwind 4.

## 3) Arquitectura y organizacion real

- Ruteo localizado bajo `src/app/[locale]/...`.
- `src/app/layout.tsx` es minimo; el layout real esta en `src/app/[locale]/layout.tsx`.
- Layout de locale incluye:
  - fuentes (`Cormorant`, `Outfit`, `Sora`)
  - `NextIntlClientProvider`
  - `Navbar`, `Footer`, `WhatsAppButton`, `CookieBanner`
  - JSON-LD `LocalBusiness`
  - metadata global con `getTranslations(...)`
- Navegacion i18n centralizada en:
  - `src/i18n/routing.ts`
  - `src/i18n/request.ts`
  - `src/lib/navigation.ts`

## 4) Rutas principales y estado

- Home: `src/app/[locale]/page.tsx`
  - Hero, servicios, parallax x2, featured work, stats, brands, CTA.
- Cocinas listado: `src/app/[locale]/cocinas/page.tsx` + `.../cocinas/_content.tsx`
  - Grid con filtros, bloques editoriales y componentes de valor.
- Detalle cocina: `src/app/[locale]/cocinas/[slug]/page.tsx`
  - SEO por item, breadcrumbs, detalle + relacionadas.
- Galeria: `src/app/[locale]/galeria/page.tsx`
  - Lee archivos de `public/images/galeria`, masonry + lightbox.
- Presupuesto: `src/app/[locale]/presupuesto/page.tsx`
  - Formulario completo + calculadora orientativa por pasos.
- Contacto: `src/app/[locale]/contacto/page.tsx` + `.../contacto/_content.tsx`
  - Info, formulario, CTA WhatsApp, placeholder de mapa.
- Sobre mi: `src/app/[locale]/sobre-mi/page.tsx` + `.../sobre-mi/_content.tsx`
  - Historia, valores, proceso, CTA.
- Blog:
  - listado `src/app/[locale]/blog/page.tsx`
  - detalle `src/app/[locale]/blog/[slug]/page.tsx`
  - contenido en `src/content/blog/*.mdx` via `src/lib/mdx.ts`.
- Legales presentes:
  - `aviso-legal`, `politica-privacidad`, `politica-cookies`.

## 5) i18n real

- Locales: `es` (default) y `en`.
- Prefijo: `as-needed` (espanol en raiz `/`, ingles en `/en`).
- Traducciones centralizadas en:
  - `messages/es.json`
  - `messages/en.json`
- Namespaces importantes ya activos:
  - `metadata`, `navbar`, `footer`, `whatsapp`, `home`, `sobreMi`, `cocinas`, `galeria`, `presupuesto`, `contacto`, `blog`, `forms`, `calculator`, `cookies`.

## 6) Datos y componentes clave

- Datos de cocinas: `src/data/kitchens.ts`.
- Home: `src/components/home/*`.
- Cocinas: `src/components/cocinas/*`.
- Galeria: `src/components/gallery/MasonryGrid.tsx` (lightbox y carga por lotes).
- Formularios:
  - `src/components/forms/BudgetForm.tsx`
  - `src/components/forms/ContactForm.tsx`
  - `src/components/forms/BudgetCalculator.tsx`
- Layout:
  - `src/components/layout/Navbar.tsx`
  - `src/components/layout/Footer.tsx`
  - `src/components/layout/WhatsAppButton.tsx`
  - `src/components/layout/CookieBanner.tsx`

## 7) SEO y metadata

- Metadata por pagina implementada de forma consistente en rutas principales.
- JSON-LD LocalBusiness inyectado en layout de locale.
- OG/Twitter base presente.
- Pendiente validar `sitemap/robots` real en codigo y pipeline (no auditado en este balance).

## 8) Backend/API real (estado)

- Endpoint: `src/app/api/contact/route.ts`.
- Estado actual: responde success y hace `console.log` del payload.
- Integracion de email (Resend) aun pendiente (hay TODO comentado).

Implicacion:
- Los formularios funcionan en UX, pero no hay envio real de correo todavia.

## 9) Gaps detectados entre SPECS y estado actual

- SPECS desactualizado en versiones (Next/Tailwind) y avance de fases.
- Estructura real con `[locale]` no aparece reflejada de forma completa en SPECS.
- Falta pagina 404 personalizada (`not-found.tsx` no existe).
- No existe componente `ScrollToTop`.
- Endpoint de contacto sin integracion final de email.
- Algunas mejoras UX ya aparecen aplicadas (ej. link activo en Navbar, `::selection` custom).

## 10) Backlog recomendado (prioridad alta)

1. Cerrar captura de leads real
- Integrar Resend en `api/contact`.
- Añadir manejo de errores robusto y validacion server-side.
- Revisar limite/tamano/formato de adjuntos extremo.

2. Robustez UX de navegacion
- Crear `not-found.tsx` localizada con traducciones (`notFound` en `messages/*.json`).
- Crear `ScrollToTop` y montarlo en layout.

3. Consistencia visual de animaciones
- Migrar reveals de imagen a `clip-path` donde aun hay fade/translate:
  - `src/components/gallery/MasonryGrid.tsx`
  - `src/components/home/FeaturedWork.tsx`
  - `src/components/cocinas/KitchenDetail.tsx`

4. Cerrar detalles Home
- Indicador de scroll en `src/components/home/Hero.tsx` (si se decide implementar).

## 11) Estado de las mejoras ejemplo que propusiste

- Active link Navbar: implementado (deteccion de ruta + estilo dorado).
- Selection color custom: implementado en `src/app/globals.css`.
- 404 personalizada: pendiente.
- Image reveal con clip-path: pendiente (actualmente hay motion/opacity/translate y hover scale).
- Scroll-to-top button: pendiente.
- Hero scroll indicator: pendiente.

## 12) Reglas de trabajo para futuros agentes

- Usar este archivo para estado real y `docs/SPECS.md` para vision y guidelines de diseño.
- Antes de tocar UI:
  - revisar `src/app/globals.css` y paleta/tipografia.
  - mantener estilo premium oscuro + acentos dorados.
- Antes de tocar rutas:
  - respetar i18n (`[locale]`, `next-intl`, `Link` desde `@/lib/navigation`).
- Antes de tocar copy:
  - actualizar siempre `messages/es.json` y `messages/en.json`.
- Antes de tocar forms/API:
  - validar implicaciones en lead capture real (`/api/contact`).

## 13) Checklist rapido de recuperacion de contexto

Si un agente entra "a ciegas", leer en este orden:

1. `docs/CONTEXT.md` (este archivo)
2. `docs/SPECS.md` (vision y criterios de diseño)
3. `src/app/[locale]/layout.tsx` (estructura global)
4. `src/i18n/routing.ts` + `src/i18n/request.ts` + `src/lib/navigation.ts` (i18n)
5. Paginas clave:
   - `src/app/[locale]/page.tsx`
   - `src/app/[locale]/cocinas/page.tsx`
   - `src/app/[locale]/presupuesto/page.tsx`
   - `src/app/[locale]/contacto/page.tsx`
   - `src/app/[locale]/blog/page.tsx`
6. `src/app/api/contact/route.ts` (estado de backend de formularios)

