import { useEffect, useRef } from 'react'
import { Container } from '@/components/ui/Container'
import { gsap } from '@/lib/gsap'
import { walkthroughSpaces } from './walkthrough.content'

export function ArchitecturalWalkthrough() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const articlesRef = useRef<HTMLElement[]>([])
  const imagesRef = useRef<HTMLImageElement[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header fade in
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

      // Staggered reveal for articles
      articlesRef.current.forEach((article) => {
        gsap.from(article, {
          y: 80,
          opacity: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: article,
            start: 'top 85%',
          },
        })
      })

      // Parallax for images
      imagesRef.current.forEach((img) => {
        gsap.to(img, {
          yPercent: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: img.parentElement,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const addToArticles = (el: HTMLElement | null) => {
    if (el && !articlesRef.current.includes(el)) {
      articlesRef.current.push(el)
    }
  }

  const addToImages = (el: HTMLImageElement | null) => {
    if (el && !imagesRef.current.includes(el)) {
      imagesRef.current.push(el)
    }
  }

  return (
    <section id="walkthrough" ref={sectionRef} className="scroll-mt-16 bg-stone-100 py-28 text-stone-950 md:py-40">
      <Container>
        <div ref={headerRef} className="sticky top-20 z-10 mb-14 max-w-2xl">
          <p className="mb-5 text-xs font-semibold uppercase tracking-premium-wide text-stone-500">Recorrido arquitectónico</p>
          <h2 className="font-serif text-4xl leading-tight md:text-6xl">Camina el proyecto antes de construirlo.</h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {walkthroughSpaces.map((space, index) => (
            <article 
              key={space.id} 
              ref={addToArticles}
              className={index % 2 === 0 ? 'md:mt-24' : ''}
            >
              <div className="group relative overflow-hidden">
                <div className="aspect-[4/5] w-full overflow-hidden">
                  <img 
                    ref={addToImages}
                    src={space.image} 
                    alt={space.name} 
                    className="h-[115%] w-full object-cover transition duration-700 group-hover:scale-105" 
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/10 to-transparent" />
                <div className="absolute bottom-0 left-0 p-8 text-white">
                  <p className="mb-3 text-xs uppercase tracking-premium-wide text-stone-300">{String(index + 1).padStart(2, '0')}</p>
                  <h3 className="mb-3 font-serif text-4xl">{space.name}</h3>
                  <p className="max-w-sm text-sm leading-relaxed text-stone-200">{space.description}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
