import { useEffect, useRef } from 'react'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { gsap } from '@/lib/gsap'
import { contactContent } from './contact.content'

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(infoRef.current, {
        x: -50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      })

      gsap.from(formRef.current, {
        x: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="contact" ref={sectionRef} className="relative scroll-mt-16 bg-stone-950 py-24 text-white md:py-32">
      <Container>
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
          <div ref={infoRef} className="flex flex-col">
            <div className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-stone-400">
              {contactContent.eyebrow}
            </div>
            <h2 className="mb-8 font-serif text-4xl leading-tight md:text-5xl lg:text-6xl">
              {contactContent.title}
            </h2>
            <p className="mb-12 max-w-md text-lg font-light leading-relaxed text-stone-400">
              {contactContent.description}
            </p>

            <div className="mt-auto flex flex-col gap-8 border-t border-white/10 pt-12">
              <div>
                <h4 className="mb-2 text-xs uppercase tracking-widest text-stone-500">Dirección</h4>
                <p className="font-light text-stone-300">{contactContent.contactInfo.address}</p>
              </div>
              <div>
                <h4 className="mb-2 text-xs uppercase tracking-widest text-stone-500">Contacto</h4>
                <p className="font-light text-stone-300">
                  {contactContent.contactInfo.email} <br />
                  {contactContent.contactInfo.phone}
                </p>
              </div>
            </div>
          </div>

          <form ref={formRef} className="flex flex-col gap-6 bg-white/[0.02] backdrop-blur-[32px] border border-white/10 p-8 md:p-12 shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1)] transition-all duration-300 hover:border-white/20 hover:shadow-[0_20px_50px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.15)]">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-xs uppercase tracking-wider text-stone-400">
                  {contactContent.form.name}
                </label>
                <input
                  type="text"
                  id="name"
                  className="border-b border-white/20 bg-transparent py-2 text-white outline-none transition-colors focus:border-white"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-xs uppercase tracking-wider text-stone-400">
                  {contactContent.form.email}
                </label>
                <input
                  type="email"
                  id="email"
                  className="border-b border-white/20 bg-transparent py-2 text-white outline-none transition-colors focus:border-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="projectType" className="text-xs uppercase tracking-wider text-stone-400">
                  {contactContent.form.projectType}
                </label>
                <select
                  id="projectType"
                  className="border-b border-white/20 bg-transparent py-2 text-white outline-none transition-colors focus:border-white"
                >
                  <option value="" className="bg-stone-900 text-white">Seleccione una opción</option>
                  <option value="residencial" className="bg-stone-900 text-white">Residencial</option>
                  <option value="comercial" className="bg-stone-900 text-white">Comercial</option>
                  <option value="remodelacion" className="bg-stone-900 text-white">Remodelación</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="budget" className="text-xs uppercase tracking-wider text-stone-400">
                  {contactContent.form.budget}
                </label>
                <select
                  id="budget"
                  className="border-b border-white/20 bg-transparent py-2 text-white outline-none transition-colors focus:border-white"
                >
                  <option value="" className="bg-stone-900 text-white">Rango estimado</option>
                  <option value="low" className="bg-stone-900 text-white">$50k - $100k</option>
                  <option value="medium" className="bg-stone-900 text-white">$100k - $500k</option>
                  <option value="high" className="bg-stone-900 text-white">$500k+</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="location" className="text-xs uppercase tracking-wider text-stone-400">
                {contactContent.form.location}
              </label>
              <input
                type="text"
                id="location"
                className="border-b border-white/20 bg-transparent py-2 text-white outline-none transition-colors focus:border-white"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-xs uppercase tracking-wider text-stone-400">
                {contactContent.form.message}
              </label>
              <textarea
                id="message"
                rows={4}
                className="resize-none border-b border-white/20 bg-transparent py-2 text-white outline-none transition-colors focus:border-white"
              ></textarea>
            </div>

            <Button type="button" className="mt-4 w-full md:w-auto self-start">
              {contactContent.form.submit}
            </Button>
          </form>
        </div>
      </Container>
    </section>
  )
}
