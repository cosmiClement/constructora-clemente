import { useState } from 'react'
import { Container } from '@/components/ui/Container'

export function BeforeAfter() {
  const [position, setPosition] = useState(52)

  return (
    <section id="comparison" className="scroll-mt-16 bg-stone-100 py-28 text-stone-950 md:py-40">
      <Container>
        <div className="mb-12 max-w-2xl">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-stone-500">Antes y después</p>
          <h2 className="font-serif text-4xl leading-tight md:text-6xl">La transformación se entiende al tocarla.</h2>
        </div>

        <div className="relative aspect-[16/9] overflow-hidden bg-stone-300">
          <img
            src="https://images.unsplash.com/photo-1600566753151-384129cf4e3e?q=80&w=1800&auto=format&fit=crop"
            alt="Espacio antes de la intervención"
            className="absolute inset-0 h-full w-full object-cover grayscale"
          />
          <div className="absolute inset-0 overflow-hidden" style={{ width: `${position}%` }}>
            <img
              src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb3?q=80&w=1800&auto=format&fit=crop"
              alt="Espacio después de la intervención"
              className="h-full w-[calc(100vw-3rem)] max-w-7xl object-cover md:w-[calc(100vw-6rem)]"
            />
          </div>
          <div className="absolute inset-y-0 w-px bg-white" style={{ left: `${position}%` }} />
          <input
            aria-label="Comparar antes y después"
            type="range"
            min="15"
            max="85"
            value={position}
            onChange={(event) => setPosition(Number(event.target.value))}
            className="absolute inset-x-6 bottom-8 h-2 accent-white"
          />
        </div>
      </Container>
    </section>
  )
}
