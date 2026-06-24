import { useMemo, useState, useEffect, useRef } from 'react'
import { Container } from '@/components/ui/Container'
import { cn } from '@/lib/utils'
import { gsap } from '@/lib/gsap'
import { galleryFilters, galleryItems } from './gallery.content'

type GalleryFilter = (typeof galleryFilters)[number]

export function InspirationGallery() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<(HTMLElement | null)[]>([])
  
  const [activeFilter, setActiveFilter] = useState<GalleryFilter>('Todos')
  
  const visibleItems = useMemo(
    () => activeFilter === 'Todos' ? galleryItems : galleryItems.filter((item) => item.category === activeFilter),
    [activeFilter]
  )

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.from(headerRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      })

      // Gallery items stagger reveal
      gsap.from(itemsRef.current, {
        y: 60,
        scale: 0.85,
        rotation: 2,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'back.out(1.2)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, []) // Empty dependency array means this runs on mount.

  // Re-run animation when filter changes, but without scrollTrigger
  useEffect(() => {
    if (!itemsRef.current.length) return
    
    gsap.fromTo(itemsRef.current, 
      { y: 30, scale: 0.95, opacity: 0 },
      { y: 0, scale: 1, opacity: 1, duration: 0.6, stagger: 0.05, ease: 'power3.out', overwrite: 'auto' }
    )
  }, [visibleItems])

  const addToRefs = (el: HTMLElement | null, index: number) => {
    itemsRef.current[index] = el
  }

  return (
    <section id="gallery" ref={sectionRef} className="scroll-mt-16 bg-stone-950 py-28 text-white md:py-40">
      <Container>
        <div ref={headerRef} className="mb-12 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="mb-5 text-xs font-semibold uppercase tracking-premium-wide text-stone-500">Galería inspiracional</p>
            <h2 className="font-serif text-4xl leading-tight md:text-6xl">Referencias que construyen atmósfera.</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {galleryFilters.map((filter) => (
              <button
                key={filter}
                className={cn(
                  'border px-4 py-2 text-xs uppercase tracking-premium transition',
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
            <figure 
              key={item.id} 
              ref={(el) => addToRefs(el, index)}
              className={cn('mb-5 break-inside-avoid overflow-hidden bg-stone-900', index % 2 === 0 ? 'pt-0' : 'pt-0 md:pt-10')}
            >
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
