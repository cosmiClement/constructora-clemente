import { useEffect, useRef } from 'react'
import { Container } from '@/components/ui/Container'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { transformationStages } from './journey.content'

export function Transformation() {
  const containerRef = useRef<HTMLElement>(null)
  const imagesRef = useRef<(HTMLImageElement | null)[]>([])
  const textsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = transformationStages.slice(1).reduce((tl, _stage, index) => {
        const nextIndex = index + 1
        return tl
          .to(imagesRef.current[nextIndex], { opacity: 1, duration: 1 })
          .to(textsRef.current[index], { opacity: 0, y: -20, duration: 0.5 }, '<')
          .to(textsRef.current[nextIndex], { opacity: 1, y: 0, duration: 0.5 }, '<0.5')
      }, gsap.timeline())

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: '+=360%',
        pin: true,
        scrub: true,
        animation: timeline,
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="journey" ref={containerRef} className="relative h-screen w-full scroll-mt-16 overflow-hidden bg-stone-900">
      <div className="absolute inset-0 z-0">
        {transformationStages.map((stage, index) => (
          <img
            key={stage.id}
            ref={(el) => { imagesRef.current[index] = el }}
            src={stage.image}
            alt={stage.title}
            className="absolute inset-0 h-full w-full object-cover object-center grayscale transition-all duration-1000 hover:grayscale-0"
            style={{ opacity: index === 0 ? 1 : 0 }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/40 to-transparent" />
      </div>

      <Container className="relative z-10 flex h-full flex-col justify-end pb-24">
        <div className="relative h-44 max-w-2xl">
          {transformationStages.map((stage, index) => (
            <div
              key={stage.id}
              ref={(el) => { textsRef.current[index] = el }}
              className="absolute bottom-0 left-0"
              style={{
                opacity: index === 0 ? 1 : 0,
                transform: `translateY(${index === 0 ? 0 : 20}px)`,
              }}
            >
              <p className="mb-4 text-xs font-semibold uppercase tracking-premium-wide text-stone-400">
                {String(index + 1).padStart(2, '0')} / {String(transformationStages.length).padStart(2, '0')}
              </p>
              <h3 className="mb-4 font-serif text-4xl text-white md:text-5xl">{stage.title}</h3>
              <p className="text-lg font-light leading-relaxed text-stone-300">{stage.desc}</p>
            </div>
          ))}
        </div>

        <div className="absolute bottom-12 right-6 flex items-center gap-4 text-sm uppercase tracking-widest text-stone-400 lg:right-12">
          <span>Scroll</span>
          <div className="relative h-px w-12 overflow-hidden bg-stone-400/50">
            <div className="animate-progress-line absolute left-0 top-0 h-full w-full origin-left bg-stone-100" />
          </div>
        </div>
      </Container>
    </section>
  )
}
