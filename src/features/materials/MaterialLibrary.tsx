import { useState, useEffect, useRef } from 'react'
import { Container } from '@/components/ui/Container'
import { cn } from '@/lib/utils'
import { gsap } from '@/lib/gsap'
import { materials } from './materials.content'

export function MaterialLibrary() {
  const [activeMaterialType, setActiveMaterialType] = useState(materials[0].id)
  const selectedMaterial = materials.find((material) => material.id === activeMaterialType) ?? materials[0]

  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

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

      // Image parallax
      gsap.to(imageRef.current, {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: imageRef.current?.parentElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })

      // Content staggered reveal
      gsap.from(contentRef.current?.children || [], {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 80%',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Animar el cambio de material
  useEffect(() => {
    if (!imageRef.current || !contentRef.current) return
    gsap.fromTo([imageRef.current, contentRef.current], 
      { opacity: 0, filter: 'blur(5px)' }, 
      { opacity: 1, filter: 'blur(0px)', duration: 0.6, ease: 'power2.out', overwrite: 'auto' }
    )
  }, [activeMaterialType])

  return (
    <section id="materials" ref={sectionRef} className="scroll-mt-16 bg-stone-100 py-28 text-stone-950 md:py-40">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div ref={headerRef} className="lg:col-span-5">
            <p className="mb-5 text-xs font-semibold uppercase tracking-premium-wide text-stone-500">Biblioteca de materiales</p>
            <h2 className="mb-8 font-serif text-4xl leading-tight md:text-6xl">La materia define cómo envejece un espacio.</h2>
            <div className="flex flex-wrap gap-3">
              {materials.map((material) => (
                <button
                  key={material.id}
                  className={cn(
                    'border px-4 py-2 text-xs uppercase tracking-premium transition',
                    activeMaterialType === material.id ? 'border-stone-950 bg-stone-950 text-white' : 'border-stone-300 text-stone-500 hover:border-stone-950 hover:text-stone-950'
                  )}
                  onClick={() => setActiveMaterialType(material.id)}
                >
                  {material.name}
                </button>
              ))}
            </div>
          </div>

          <article className="grid gap-8 lg:col-span-7 lg:grid-cols-2 lg:items-end">
            <div className="overflow-hidden bg-stone-200">
              <img 
                ref={imageRef} 
                src={selectedMaterial.image} 
                alt={selectedMaterial.name} 
                className="aspect-[4/5] h-[115%] w-full object-cover" 
              />
            </div>
            <div ref={contentRef}>
              <h3 className="mb-4 font-serif text-4xl">{selectedMaterial.name}</h3>
              <p className="mb-8 text-lg font-light leading-relaxed text-stone-600">{selectedMaterial.description}</p>
              <ul className="space-y-3">
                {selectedMaterial.applications.map((application) => (
                  <li key={application} className="border-t border-stone-300 pt-3 text-sm uppercase tracking-premium text-stone-500">
                    {application}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </div>
      </Container>
    </section>
  )
}
