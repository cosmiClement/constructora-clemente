import { useState, useEffect, useCallback } from 'react'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import { useScrollToSection } from '@/hooks/scroll/useScrollToSection'

const navItems = [
  { label: 'Nosotros', sectionId: 'about' },
  { label: 'Servicios', sectionId: 'services' },
  { label: 'Proyectos', sectionId: 'projects' },
  { label: 'Proceso', sectionId: 'process' },
  { label: 'FAQ', sectionId: 'faq' },
]

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const scrollToSection = useScrollToSection()

  // Detectar scroll para cambiar el estilo del navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Detectar sección activa con IntersectionObserver
  useEffect(() => {
    const sectionIds = ['hero', ...navItems.map((item) => item.sectionId), 'contact']
    const observers: IntersectionObserver[] = []

    sectionIds.forEach((id) => {
      const element = document.getElementById(id)
      if (!element) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id)
            }
          })
        },
        {
          rootMargin: '-40% 0px -55% 0px',
          threshold: 0,
        }
      )

      observer.observe(element)
      observers.push(observer)
    })

    return () => observers.forEach((obs) => obs.disconnect())
  }, [])

  const handleNavigate = useCallback(
    (sectionId: string) => {
      scrollToSection(sectionId)
      setIsMenuOpen(false)
    },
    [scrollToSection]
  )

  return (
    <header
      className={cn(
        'fixed left-0 right-0 top-0 z-50 transition-all duration-500 ease-premium',
        isScrolled
          ? 'border-b border-white/10 bg-stone-950/90 shadow-lg shadow-black/20 backdrop-blur-xl'
          : 'bg-transparent'
      )}
    >
      <nav
        className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6 lg:h-20 lg:px-12"
        aria-label="Navegación principal - Constructora Clemente"
      >
        {/* ====== LOGO ====== */}
        <button
          className="group relative font-serif text-xl text-white transition-colors hover:text-gold-light lg:text-2xl"
          onClick={() => handleNavigate('hero')}
          aria-label="Ir al inicio de Constructora Clemente"
        >
          Clemente
          {/* Subrayado dorado sutil en hover */}
          <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
        </button>

        {/* ====== DESKTOP NAVIGATION ====== */}
        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const isActive = activeSection === item.sectionId
            return (
              <button
                key={item.sectionId}
                className={cn(
                  'relative px-4 py-2 text-[11px] uppercase tracking-[0.2em] transition-colors duration-300',
                  isActive
                    ? 'text-white'
                    : 'text-stone-400 hover:text-stone-200'
                )}
                onClick={() => handleNavigate(item.sectionId)}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.label}
                {/* Indicador de sección activa */}
                <span
                  className={cn(
                    'absolute bottom-0 left-1/2 h-0.5 -translate-x-1/2 bg-gold transition-all duration-300',
                    isActive ? 'w-4' : 'w-0'
                  )}
                />
              </button>
            )
          })}
        </div>

        {/* ====== CTA BUTTON (Desktop) ====== */}
        <Button
          variant="outline"
          className="hidden min-h-10 border-gold/30 px-4 text-[11px] uppercase tracking-wider text-gold-light transition-all hover:border-gold hover:bg-gold/10 hover:text-gold md:inline-flex"
          onClick={() => handleNavigate('contact')}
        >
          Consulta
          <ArrowUpRight size={14} className="ml-1" aria-hidden="true" />
        </Button>

        {/* ====== MOBILE MENU TOGGLE ====== */}
        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded border border-white/15 text-white transition-colors hover:border-gold/50 hover:text-gold-light md:hidden"
          type="button"
          aria-label={isMenuOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? <X aria-hidden="true" size={18} /> : <Menu aria-hidden="true" size={18} />}
        </button>
      </nav>

      {/* ====== MOBILE MENU ====== */}
      <div
        id="mobile-menu"
        className={cn(
          'overflow-hidden border-t border-white/10 bg-stone-950/98 backdrop-blur-2xl transition-all duration-300 md:hidden',
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        )}
        aria-hidden={!isMenuOpen}
      >
        <div className="flex flex-col gap-1 px-6 py-4">
          {navItems.map((item, index) => {
            const isActive = activeSection === item.sectionId
            return (
              <button
                key={item.sectionId}
                className={cn(
                  'flex items-center justify-between py-3 text-left text-sm uppercase tracking-[0.2em] transition-colors',
                  isActive
                    ? 'font-semibold text-white'
                    : 'text-stone-400 hover:text-stone-200'
                )}
                onClick={() => handleNavigate(item.sectionId)}
                aria-current={isActive ? 'page' : undefined}
                style={{
                  transitionDelay: isMenuOpen ? `${index * 50}ms` : '0ms',
                }}
              >
                {item.label}
                {isActive && (
                  <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" />
                )}
              </button>
            )
          })}
          <div className="mt-3 border-t border-white/10 pt-4">
            <Button
              variant="outline"
              className="w-full border-gold/30 py-3 text-gold-light hover:bg-gold/10"
              onClick={() => handleNavigate('contact')}
            >
              Consulta gratuita
              <ArrowUpRight size={14} className="ml-1" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
