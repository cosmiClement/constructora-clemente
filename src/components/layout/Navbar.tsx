import { useState } from 'react'
import { Menu, X } from 'lucide-react'
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
  const scrollToSection = useScrollToSection()

  const handleNavigate = (sectionId: string) => {
    scrollToSection(sectionId)
    setIsMenuOpen(false)
  }

  return (
    <header className="fixed left-0 right-0 top-0 z-40 border-b border-white/10 bg-gradient-to-b from-black/80 to-black/20 backdrop-blur-xl shadow-[0_4px_12px_rgba(0,0,0,0.3)]">
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6 lg:px-12" aria-label="Principal">
        <button className="font-serif text-xl text-white" onClick={() => handleNavigate('hero')}>
          Clemente
        </button>

        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <button
              key={item.sectionId}
              className="text-xs uppercase tracking-[0.24em] text-stone-300 transition hover:text-white"
              onClick={() => handleNavigate(item.sectionId)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <Button
          variant="outline"
          className="hidden min-h-10 px-4 md:inline-flex"
          onClick={() => handleNavigate('contact')}
        >
          Consulta
        </Button>

        <button
          className="inline-flex h-10 w-10 items-center justify-center border border-white/20 text-white md:hidden"
          type="button"
          aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? <X aria-hidden="true" size={18} /> : <Menu aria-hidden="true" size={18} />}
        </button>
      </nav>

      <div
        className={cn(
          'border-t border-white/10 bg-stone-950/95 px-6 py-5 transition md:hidden',
          isMenuOpen ? 'block' : 'hidden'
        )}
      >
        <div className="flex flex-col gap-4">
          {navItems.map((item) => (
            <button
              key={item.sectionId}
              className="text-left text-xs uppercase tracking-[0.24em] text-stone-300"
              onClick={() => handleNavigate(item.sectionId)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  )
}
