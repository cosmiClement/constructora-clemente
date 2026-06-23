import { useEffect, useRef } from 'react'
import { Container } from '@/components/ui/Container'
import { gsap } from '@/lib/gsap'

export function AboutUs() {
  const sectionRef = useRef<HTMLElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const leftColRef = useRef<HTMLDivElement>(null)
  const rightColRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      mm.add('(min-width: 1024px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=120%',
            pin: true,
            pinSpacing: true,
            scrub: 1,
          },
        })

        tl.to(pinRef.current, {
          yPercent: -30,
          opacity: 0.6,
          ease: 'power2.inOut',
        })

        tl.to(
          leftColRef.current,
          { yPercent: -80, opacity: 0, ease: 'power2.in' },
          0
        )

        tl.to(
          rightColRef.current,
          { yPercent: -40, opacity: 0, ease: 'power2.in' },
          0
        )

        tl.to(
          lineRef.current,
          { scaleX: 1, ease: 'none' },
          0
        )
      })

      mm.add('(max-width: 1023px)', () => {
        gsap.from(leftColRef.current, {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        })

        gsap.from(rightColRef.current?.children || [], {
          y: 40,
          opacity: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        })

        gsap.fromTo(
          lineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%',
              end: 'center center',
              scrub: true,
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative scroll-mt-16 overflow-hidden bg-stone-100 text-stone-950"
    >
      <div ref={pinRef} className="py-28 md:py-40">
        <Container>
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            <div ref={leftColRef} className="relative z-10">
              <div className="mb-8 flex items-center gap-4">
                <p className="text-xs font-semibold uppercase tracking-premium-wide text-stone-500">
                  Nuestra historia
                </p>
                <div ref={lineRef} className="h-px w-24 origin-left bg-stone-300" />
              </div>
              <h2 className="font-serif text-4xl leading-tight md:text-6xl">
                Más de 15 años construyendo experiencias.
              </h2>
            </div>
            <div ref={rightColRef} className="flex flex-col justify-center gap-8 lg:mt-12">
              <p className="text-lg font-light leading-relaxed text-stone-600">
                Somos una constructora especializada en arquitectura residencial y comercial de alta calidad.
                Cada proyecto es una oportunidad para crear espacios que perduren en el tiempo y mejoren la vida
                de quienes los habitan.
              </p>
              <p className="text-lg font-light leading-relaxed text-stone-600">
                Nuestro enfoque combina la precisión técnica con una visión estética contemporánea,
                garantizando resultados que superan las expectativas de nuestros clientes.
              </p>
            </div>
          </div>
        </Container>
      </div>
    </section>
  )
}

export default AboutUs
