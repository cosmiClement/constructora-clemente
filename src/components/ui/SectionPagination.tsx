import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useScrollToSection } from '@/hooks/scroll/useScrollToSection'

const sections = [
  { id: 'hero', label: 'Inicio' },
  { id: 'philosophy', label: 'Filosofía' },
  { id: 'journey', label: 'Transformación' },
  { id: 'about', label: 'Historia' },
  { id: 'services', label: 'Servicios' },
  { id: 'projects', label: 'Proyectos' },
  { id: 'walkthrough', label: 'Recorrido' },
  { id: 'gallery', label: 'Galería' },
  { id: 'comparison', label: 'Antes/Después' },
  { id: 'statistics', label: 'Estadísticas' },
  { id: 'materials', label: 'Materiales' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contact', label: 'Contacto' },
  { id: 'final-cta', label: 'Legado' },
]

export function SectionPagination() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const scrollToSection = useScrollToSection()

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    sections.forEach(({ id }, index) => {
      const element = document.getElementById(id)
      if (!element) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveIndex(index)
            }
          })
        },
        { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
      )

      observer.observe(element)
      observers.push(observer)
    })

    const handleScroll = () => {
      setIsVisible(window.scrollY > window.innerHeight * 0.6)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      observers.forEach((obs) => obs.disconnect())
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleClick = useCallback(
    (sectionId: string) => {
      scrollToSection(sectionId)
    },
    [scrollToSection]
  )

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex"
          aria-label="Navegación de secciones"
        >
          {sections.map(({ id, label }, index) => {
            const isActive = index === activeIndex
            return (
              <button
                key={id}
                onClick={() => handleClick(id)}
                className="group relative flex h-5 w-5 items-center justify-center"
                aria-label={`Ir a ${label}`}
              >
                <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded border border-white/10 bg-stone-900/90 px-2.5 py-1 text-[10px] uppercase tracking-wider text-stone-300 opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100">
                  {label}
                </span>

                <span
                  className={cn(
                    'block rounded-full transition-all duration-300',
                    isActive
                      ? 'h-2.5 w-2.5 bg-gold shadow-[0_0_8px_rgba(234,179,8,0.5)]'
                      : 'h-1.5 w-1.5 bg-stone-600 transition-all duration-200 group-hover:h-2 group-hover:w-2 group-hover:bg-stone-400'
                  )}
                />
              </button>
            )
          })}

          <div className="mt-2 h-12 w-px bg-gradient-to-b from-gold/30 to-transparent" />
        </motion.nav>
      )}
    </AnimatePresence>
  )
}
