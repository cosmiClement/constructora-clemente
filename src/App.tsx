import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { ErrorBoundary } from '@/app/errors/ErrorBoundary'
import { RootLayout } from '@/app/layouts/RootLayout'
import '@/styles/globals.css'

// Lazy load de páginas para code-splitting y mejor performance
const HomePage = lazy(() =>
  import('@/pages/home/HomePage').then((module) => ({ default: module.HomePage }))
)

/**
 * Loading fallback con semantic HTML para SEO
 * Muestra contenido incluso antes de que React hidrate
 */
function PageLoader() {
  return (
    <div
      className="flex min-h-screen items-center justify-center bg-stone-950"
      role="status"
      aria-label="Cargando página"
      aria-live="polite"
    >
      <div className="flex flex-col items-center gap-4">
        {/* Spinner accesible */}
        <div
          className="h-10 w-10 animate-spin rounded-full border-2 border-stone-700 border-t-gold"
          aria-hidden="true"
        />
        <p className="text-sm tracking-wider text-stone-400">Constructora Clemente</p>
      </div>
    </div>
  )
}

/**
 * App - Punto de entrada de la aplicación
 *
 * Envuelto con HelmetProvider para SEO dinámico con react-helmet-async
 * ErrorBoundary captura errores sin romper la app
 * Suspense con fallback semántico para lazy loading
 */
export default function App() {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <BrowserRouter>
          <RootLayout>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                {/* 404 - Redirige al home para SPA con scroll a secciones */}
                <Route path="*" element={<HomePage />} />
              </Routes>
            </Suspense>
          </RootLayout>
        </BrowserRouter>
      </ErrorBoundary>
    </HelmetProvider>
  )
}
