import { useEffect, useRef } from 'react'
import { Container } from '@/components/ui/Container'
import { gsap } from '@/lib/gsap'
import { servicesContent } from './services.content'

export function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardsRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'bottom 80%',
          toggleActions: 'play none none reverse',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const addToRefs = (el: HTMLDivElement) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el)
    }
  }

  return (
    <section id="services" ref={sectionRef} className="relative scroll-mt-16 bg-stone-950 py-32 text-white md:py-48">
      <Container>
        <div className="mb-20 grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <div className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-stone-400">
              {servicesContent.eyebrow}
            </div>
            <h2 className="font-serif text-4xl leading-tight md:text-5xl lg:text-6xl">
              {servicesContent.title}
            </h2>
          </div>
          <div className="flex items-end">
            <p className="max-w-md text-lg font-light text-stone-400">
              {servicesContent.description}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {servicesContent.services.map((service) => (
            <div
              key={service.id}
              ref={addToRefs}
              className="group relative flex flex-col justify-between border border-white/10 bg-white/[0.02] backdrop-blur-md p-8 transition-all duration-300 ease-out hover:border-white/20 hover:bg-white/5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3),inset_0_1px_0_0_rgba(255,255,255,0.1)] hover:scale-105"
            >
              <div className="mb-16 font-serif text-3xl font-light text-stone-500 transition-colors group-hover:text-white">
                {service.id}
              </div>
              <div>
                <h3 className="mb-4 text-xl font-medium tracking-wide">
                  {service.title}
                </h3>
                <p className="text-sm font-light leading-relaxed text-stone-400">
                  {service.description}
                </p>
              </div>
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-white transition-all duration-500 ease-out group-hover:w-full" />
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
