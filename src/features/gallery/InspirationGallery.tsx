import { useMemo, useState } from 'react'
import { Container } from '@/components/ui/Container'
import { cn } from '@/lib/utils'
import { galleryFilters, galleryItems } from './gallery.content'

type GalleryFilter = (typeof galleryFilters)[number]

export function InspirationGallery() {
  const [activeFilter, setActiveFilter] = useState<GalleryFilter>('Todos')
  const visibleItems = useMemo(
    () => activeFilter === 'Todos' ? galleryItems : galleryItems.filter((item) => item.category === activeFilter),
    [activeFilter]
  )

  return (
    <section id="gallery" className="scroll-mt-16 bg-stone-950 py-28 text-white md:py-40">
      <Container>
        <div className="mb-12 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-stone-500">Galería inspiracional</p>
            <h2 className="font-serif text-4xl leading-tight md:text-6xl">Referencias que construyen atmósfera.</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {galleryFilters.map((filter) => (
              <button
                key={filter}
                className={cn(
                  'border px-4 py-2 text-xs uppercase tracking-[0.2em] transition',
                  activeFilter === filter ? 'border-white bg-white text-stone-950' : 'border-white/20 text-stone-400 hover:border-white hover:text-white'
                )}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="columns-1 gap-5 md:columns-2 lg:columns-3">
          {visibleItems.map((item, index) => (
            <figure key={item.id} className={cn('mb-5 break-inside-avoid overflow-hidden bg-stone-900', index % 2 === 0 ? 'pt-0' : 'pt-10')}>
              <img src={item.image} alt={item.title} className="w-full object-cover transition duration-700 hover:scale-105" />
              <figcaption className="flex items-center justify-between p-5 text-sm text-stone-400">
                <span>{item.title}</span>
                <span>{item.category}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  )
}
