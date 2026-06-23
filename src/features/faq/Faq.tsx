import { useEffect, useRef, useState } from 'react'
import { Plus } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { gsap } from '@/lib/gsap'
import { cn } from '@/lib/utils'
import { faqContent } from './faq.content'

export function Faq() {
  const sectionRef = useRef<HTMLElement>(null)
  const itemsRef = useRef<HTMLDivElement[]>([])
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(itemsRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const addToRefs = (el: HTMLDivElement) => {
    if (el && !itemsRef.current.includes(el)) {
      itemsRef.current.push(el)
    }
  }

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" ref={sectionRef} className="relative scroll-mt-16 bg-stone-900 py-24 text-white md:py-32">
      <Container>
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <div className="sticky top-32">
              <div className="mb-6 text-xs font-medium uppercase tracking-premium text-stone-400">
                {faqContent.eyebrow}
              </div>
              <h2 className="font-serif text-4xl leading-tight md:text-5xl">
                {faqContent.title}
              </h2>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="flex flex-col border-t border-white/10">
              {faqContent.faqs.map((faq, index) => {
                const isOpen = openIndex === index

                return (
                  <div
                    key={index}
                    ref={addToRefs}
                    className="border-b border-white/10"
                  >
                    <button
                      className="flex w-full items-center justify-between py-6 text-left"
                      onClick={() => toggleFaq(index)}
                      aria-expanded={isOpen}
                    >
                      <span className="pr-8 font-serif text-xl font-light md:text-2xl">
                        {faq.question}
                      </span>
                      <Plus
                        className={cn(
                          'h-6 w-6 shrink-0 text-stone-400 transition-transform duration-500',
                          isOpen && 'rotate-45 text-white'
                        )}
                      />
                    </button>
                    <div
                      className={cn(
                        'grid transition-all duration-500 ease-in-out',
                        isOpen ? 'grid-rows-[1fr] pb-6' : 'grid-rows-[0fr]'
                      )}
                    >
                      <div className="overflow-hidden">
                        <p className="max-w-2xl text-lg font-light leading-relaxed text-stone-400">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
