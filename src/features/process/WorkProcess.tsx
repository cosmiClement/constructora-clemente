import { useEffect, useRef } from 'react'
import { Container } from '@/components/ui/Container'
import { gsap } from '@/lib/gsap'

const processSteps = [
  'Reunión inicial',
  'Conceptualización',
  'Diseño',
  'Renderizado',
  'Construcción',
  'Entrega',
]

export function WorkProcess() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<(HTMLLIElement | null)[]>([])

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

      // Steps staggered animation
      gsap.from(stepsRef.current, {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'back.out(1.2)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const addToRefs = (el: HTMLLIElement | null, index: number) => {
    stepsRef.current[index] = el
  }

  return (
    <section id="process" ref={sectionRef} className="scroll-mt-16 bg-stone-100 py-28 text-stone-950 md:py-40">
      <Container>
        <div ref={headerRef} className="mb-16 max-w-2xl">
          <p className="mb-5 text-xs font-semibold uppercase tracking-premium-wide text-stone-500">Proceso de trabajo</p>
          <h2 className="font-serif text-4xl leading-tight md:text-6xl">Un método claro para decisiones complejas.</h2>
        </div>

        <ol className="grid gap-px overflow-hidden bg-stone-300 md:grid-cols-3">
          {processSteps.map((step, index) => (
            <li 
              key={step} 
              ref={(el) => addToRefs(el, index)}
              className="group min-h-56 bg-stone-100 p-8 transition duration-500 hover:bg-stone-950 hover:text-white"
            >
              <p className="mb-10 text-xs uppercase tracking-premium-wide text-stone-500">
                {String(index + 1).padStart(2, '0')}
              </p>
              <h3 className="font-serif text-3xl">{step}</h3>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}
