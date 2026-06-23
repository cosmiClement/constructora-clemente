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
      const mm = gsap.matchMedia()

      mm.add('(min-width: 768px)', () => {
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

        articlesRef.current.forEach((article, index) => {
          gsap.from(article, {
            x: index % 2 === 0 ? -200 : 200,
            rotationY: index % 2 === 0 ? 15 : -15,
            scale: 0.85,
            opacity: 0,
            filter: 'blur(6px)',
            duration: 1.4,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: article,
              start: 'top 85%',
              end: 'top 40%',
              scrub: 1.5,
            },
          })
        })

        imagesRef.current.forEach((img) => {
          gsap.to(img, {
            yPercent: 20,
            scale: 1.08,
            ease: 'none',
            scrollTrigger: {
              trigger: img.parentElement,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          })
        })
      })

      mm.add('(max-width: 767px)', () => {
        gsap.from(headerRef.current, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        })

        articlesRef.current.forEach((article) => {
          gsap.from(article, {
            y: 60,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: article,
              start: 'top 85%',
            },
          })
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
