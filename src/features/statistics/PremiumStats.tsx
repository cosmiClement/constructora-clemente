import { useEffect, useRef } from 'react'
import { Container } from '@/components/ui/Container'
import { gsap } from '@/lib/gsap'

const stats = [
  { value: 15, prefix: '+', suffix: '', label: 'años de experiencia' },
  { value: 300, prefix: '+', suffix: '', label: 'proyectos desarrollados' },
  { value: 50000, prefix: '+', suffix: '', label: 'm² diseñados', format: true },
  { value: 98, prefix: '', suffix: '%', label: 'satisfacción de clientes' },
]

export function PremiumStats() {
  const sectionRef = useRef<HTMLElement>(null)
  const numbersRef = useRef<(HTMLSpanElement | null)[]>([])
  const containersRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Container stagger fade-in
      gsap.from(containersRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
        },
      })

      // Number counter animation
      numbersRef.current.forEach((el, index) => {
        if (!el) return
        const stat = stats[index]
        gsap.fromTo(
          el,
          { textContent: '0' },
          {
            textContent: stat.value,
            duration: 2,
            ease: 'power2.out',
            snap: { textContent: 1 },
            onUpdate: function () {
              const val = Math.round(Number(this.targets()[0].textContent))
              const formatted = stat.format ? val.toLocaleString('es-ES') : val
              this.targets()[0].textContent = formatted
            },
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%',
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const addToContainers = (el: HTMLDivElement | null, index: number) => {
    containersRef.current[index] = el
  }

  const addToNumbers = (el: HTMLSpanElement | null, index: number) => {
    numbersRef.current[index] = el
  }

  return (
    <section id="statistics" ref={sectionRef} className="scroll-mt-16 bg-stone-950 py-24 text-white md:py-32">
      <Container>
        <div className="grid gap-px overflow-hidden bg-white/10 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              ref={(el) => addToContainers(el, index)}
              className="bg-stone-950 p-8 md:p-10"
            >
              <p className="mb-4 font-serif text-5xl md:text-6xl">
                {stat.prefix}
                <span ref={(el) => addToNumbers(el, index)}>0</span>
                {stat.suffix}
              </p>
              <p className="text-sm uppercase tracking-premium text-stone-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
