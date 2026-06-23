import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import { useScrollToSection } from '@/hooks/scroll/useScrollToSection'
import { useGlobalStore } from '@/store/globalStore'

const navItems = [
  { label: 'Nosotros', sectionId: 'about' },
  { label: 'Servicios', sectionId: 'services' },
  { label: 'Proyectos', sectionId: 'projects' },
  //{ label: 'Proceso', sectionId: 'process' },
  { label: 'FAQ', sectionId: 'faq' },
]

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [scrollProgress, setScrollProgress] = useState(0)
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 })
  const navRef = useRef<HTMLDivElement>(null)
  const buttonsRef = useRef<Map<string, HTMLButtonElement>>(new Map())
  const scrollToSection = useScrollToSection()
  const setCursorType = useGlobalStore((state) => state.setCursorType)

  const updateIndicator = useCallback(() => {
    const activeButton = buttonsRef.current.get(activeSection)
    if (activeButton && navRef.current) {
      const navRect = navRef.current.getBoundingClientRect()
      const btnRect = activeButton.getBoundingClientRect()
      setIndicatorStyle({
        left: btnRect.left - navRect.left,
        width: btnRect.width,
      })
    }
  }, [activeSection])

  useEffect(() => {
    updateIndicator()
    window.addEventListener('resize', updateIndicator)
    return () => window.removeEventListener('resize', updateIndicator)
  }, [updateIndicator])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      const docEl = document.documentElement
      const scrollPct = (window.scrollY / (docEl.scrollHeight - docEl.clientHeight)) * 100
      setScrollProgress(Math.min(scrollPct, 100))
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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

  const setButtonRef = (id: string, el: HTMLButtonElement | null) => {
    if (el) {
      buttonsRef.current.set(id, el)
    } else {
      buttonsRef.current.delete(id)
    }
  }

  return (
    <header
      className={cn(
        'fixed left-0 right-0 top-0 z-50 transition-all duration-500 ease-premium',
        isScrolled
          ? 'border-b border-white/10 bg-stone-950/90 shadow-lg shadow-black/20 backdrop-blur-xl'
          : 'bg-transparent'
      )}
    >
      {/* Scroll progress bar */}
      <div className="absolute -bottom-px left-0 right-0 h-px bg-white/10">
        <motion.div
          className="h-full bg-gold"
          style={{ width: `${scrollProgress}%` }}
          transition={{ duration: 0.1, ease: 'linear' }}
        />
      </div>

      <nav
        className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6 lg:h-20 lg:px-12"
        aria-label="Navegación principal - Constructora Clemente"
      >
        {/* ====== LOGO ====== */}
        <button
          className="group relative font-serif text-xl text-white transition-colors hover:text-gold-light lg:text-2xl"
          onClick={() => handleNavigate('hero')}
          onMouseEnter={() => setCursorType('hover')}
          onMouseLeave={() => setCursorType('default')}
          aria-label="Ir al inicio de Constructora Clemente"
        >
          Clemente
          <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
        </button>

        {/* ====== DESKTOP NAVIGATION ====== */}
        <div ref={navRef} className="relative hidden items-center md:flex">
          {navItems.map((item) => {
            const isActive = activeSection === item.sectionId
            return (
              <button
                key={item.sectionId}
                ref={(el) => setButtonRef(item.sectionId, el)}
                className={cn(
                  'relative px-4 py-2 text-xs uppercase tracking-premium transition-colors duration-300',
                  isActive ? 'text-white' : 'text-stone-400 hover:text-stone-200'
                )}
                onClick={() => handleNavigate(item.sectionId)}
                onMouseEnter={() => setCursorType('hover')}
                onMouseLeave={() => setCursorType('default')}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.label}
              </button>
            )
          })}
          {/* Sliding active indicator */}
          <motion.span
            className="absolute -bottom-px h-0.5 bg-gold"
            animate={{ width: indicatorStyle.width, x: indicatorStyle.left }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>

        {/* ====== CTA BUTTON (Desktop) ====== */}
        <Button
          variant="outline"
          className="hidden min-h-10 border-gold/30 px-4 text-xs uppercase tracking-wider text-gold-light transition-all hover:border-gold hover:bg-gold/10 hover:text-gold md:inline-flex"
          onClick={() => handleNavigate('contact')}
          onMouseEnter={() => setCursorType('hover')}
          onMouseLeave={() => setCursorType('default')}
        >
          Consulta
          <ArrowUpRight size={14} aria-hidden="true" />
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
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-white/10 bg-stone-950/98 backdrop-blur-2xl md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {navItems.map((item, index) => {
                const isActive = activeSection === item.sectionId
                return (
                  <motion.button
                    key={item.sectionId}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className={cn(
                      'flex items-center justify-between py-3 text-left text-sm uppercase tracking-premium transition-colors',
                      isActive
                        ? 'font-semibold text-white'
                        : 'text-stone-400 hover:text-stone-200'
                    )}
                    onClick={() => handleNavigate(item.sectionId)}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.label}
                    {isActive && (
                      <motion.span
                        layoutId="mobile-active-dot"
                        className="h-1.5 w-1.5 rounded-full bg-gold"
                        aria-hidden="true"
                      />
                    )}
                  </motion.button>
                )
              })}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="mt-3 border-t border-white/10 pt-4"
              >
                <Button
                  variant="outline"
                  className="w-full border-gold/30 py-3 text-gold-light hover:bg-gold/10"
                  onClick={() => handleNavigate('contact')}
                >
                  Consulta gratuita
                  <ArrowUpRight size={14} className="ml-1" aria-hidden="true" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
