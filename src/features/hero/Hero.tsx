import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { gsap } from '@/lib/gsap'
import { useScrollToSection } from '@/hooks/scroll/useScrollToSection'
import { heroContent } from './hero.content'

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mediaRef = useRef<HTMLDivElement>(null)
  const words = heroContent.title.split(' ')
  const scrollToSection = useScrollToSection()

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      gsap.to(mediaRef.current, {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="hero" ref={containerRef} className="relative flex h-screen w-full scroll-mt-16 items-center justify-center overflow-hidden bg-stone-950">
      <div className="absolute inset-0 z-0">
        <div ref={mediaRef} className="absolute inset-[-10%] h-[120%] w-[120%]">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover object-center opacity-65"
            src={heroContent.video}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.08),transparent_38%),linear-gradient(180deg,rgba(0,0,0,0.3),rgba(10,10,10,0.88))]" />
        </div>
      </div>

      <Container className="relative z-10 flex h-full flex-col justify-between py-24 md:py-32">
        {/* Contenido superior más compacto */}
        <div className="pt-8">
          <motion.p
            className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-stone-100"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {heroContent.eyebrow}
          </motion.p>

          <h1 className="max-w-5xl font-serif text-4xl font-medium leading-tight text-white md:text-5xl lg:text-6xl">
            {words.map((word, index) => (
              <span key={`${word}-${index}`} className="mr-4 inline-block overflow-hidden pb-2">
                <motion.span
                  className={word === 'trascienden' ? 'inline-block italic text-stone-300' : 'inline-block'}
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.08 * index }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>
        </div>

        {/* Contenido inferior - botones y descripción */}
        <motion.div
          className="flex flex-col items-start gap-6"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
        >
          <p className="max-w-lg text-base font-light leading-relaxed text-stone-300 md:text-lg">{heroContent.description}</p>
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => scrollToSection('projects')}>{heroContent.cta}</Button>
            <Button variant="outline" onClick={() => scrollToSection('contact')}>
              {heroContent.secondaryCta}
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
