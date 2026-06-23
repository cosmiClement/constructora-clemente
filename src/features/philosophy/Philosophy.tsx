import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { philosophyContent } from './philosophy.content'
import { ScrollRevealText } from '@/components/animations/ScrollRevealText'

export function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['0% 75%', '50% 50%'] as const
  })

  const lineScale = useTransform(scrollYProgress, [0, 0.5], [0, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])
  const yOffset = useTransform(scrollYProgress, [0, 0.5], [50, 0])

  return (
    <section id="philosophy" ref={sectionRef} className="relative scroll-mt-16 bg-stone-50 py-32 text-stone-900 md:py-48">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-24">
          <div className="flex flex-col justify-start lg:col-span-4">
            <motion.div 
              style={{ opacity, y: yOffset }}
              className="mb-8 text-xs font-medium uppercase tracking-premium text-stone-400"
            >
              {philosophyContent.eyebrow}
            </motion.div>
            <motion.div 
              style={{ scaleX: lineScale, transformOrigin: 'left center' }}
              className="mb-12 h-px w-24 bg-stone-300" 
            />
          </div>

          <div className="flex flex-col justify-center lg:col-span-8">
            <motion.h2 
              style={{ opacity, y: yOffset }}
              className="mb-12 text-balance font-serif text-4xl leading-tight md:text-5xl lg:text-7xl"
            >
              <div className="overflow-hidden pb-2">
                <div>{philosophyContent.titleLineOne}</div>
              </div>
              <div className="overflow-hidden">
                <div className="italic text-stone-400">
                  {philosophyContent.titleLineTwo}
                </div>
              </div>
            </motion.h2>

            <ScrollRevealText 
              text={philosophyContent.description} 
              className="max-w-2xl text-lg font-light leading-relaxed text-stone-900 md:text-2xl" 
            />
          </div>
        </div>
      </Container>
    </section>
  )
}
