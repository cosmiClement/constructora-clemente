import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { MapPin, ArrowRight, Phone } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { gsap } from '@/lib/gsap'
import { useScrollToSection } from '@/hooks/scroll/useScrollToSection'
import { heroContent } from './hero.content'

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mediaRef = useRef<HTMLDivElement>(null)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const words = heroContent.title.split(' ')
  const scrollToSection = useScrollToSection()
  const prefersReducedMotion = useReducedMotion()

  // GSAP Parallax en el video al hacer scroll
  useEffect(() => {
    if (!containerRef.current || prefersReducedMotion) return

    const ctx = gsap.context(() => {
      gsap.to(mediaRef.current, {
        yPercent: 20,
        scale: 1.1,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [prefersReducedMotion])

  // Stagger configuration para animaciones
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  }

  const wordReveal = {
    hidden: { y: '120%', opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  }

  const fadeSlideUp = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  }

  const scaleIn = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  }

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-stone-950"
      aria-label="Inicio - Constructora Clemente"
    >
      {/* ====== VIDEO BACKGROUND ====== */}
      <div className="absolute inset-0 z-0">
        <div
          ref={mediaRef}
          className="absolute inset-[-5%] h-[110%] w-[110%]"
          style={{ willChange: 'transform' }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onLoadedData={() => setVideoLoaded(true)}
            className={`h-full w-full object-cover object-center transition-opacity duration-1000 ${videoLoaded ? 'opacity-80' : 'opacity-0'
              }`}
            src={heroContent.video}
            aria-label="Video de proyectos arquitectónicos de Constructora Clemente en Cochabamba"
          />
          {/* Gradientes superpuestos para legibilidad y estética */}
          <div className="absolute inset-0 bg-gradient-hero" />
          <div className="absolute inset-0 bg-gradient-radial-hero" />
          {/* Subtle vignette */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, rgba(12,11,9,0.6) 100%)',
            }}
          />
        </div>
      </div>

      {/* ====== DECORATIVE ELEMENTS ====== */}
      {/* Línea dorada sutil a la izquierda */}
      <motion.div
        className="absolute left-8 top-1/3 hidden h-32 w-px bg-gradient-to-b from-transparent via-gold/30 to-transparent lg:block"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.2, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
        style={{ originY: 0 }}
      />

      {/* ====== MAIN CONTENT ====== */}
      <Container className="relative z-10 flex min-h-screen w-full flex-col justify-between px-6 py-24 sm:px-8 lg:px-12 lg:py-32">
        {/* --- Zona superior: Eyebrow + Badges --- */}
        <motion.div
          className="flex flex-col items-start gap-4 pt-20 sm:pt-24 lg:pt-28"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Eyebrow */}
          <motion.p
            className="text-[10px] font-semibold uppercase tracking-[0.35em] text-stone-300 sm:text-xs"
            variants={fadeSlideUp}
          >
            {heroContent.eyebrow}
          </motion.p>

          {/* Badges de confianza */}
          <motion.div
            className="flex flex-wrap items-center gap-3"
            variants={fadeSlideUp}
          >
            {/* Badge ubicación Cochabamba */}
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/8 px-3 py-1.5 text-[11px] font-medium text-stone-200 backdrop-blur-sm">
              <MapPin size={12} className="text-gold-light" aria-hidden="true" />
              {heroContent.locationBadge.text}
            </span>

            {/* Badge años de experiencia */}
            <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/20 bg-gold/10 px-3 py-1.5 text-[11px] font-medium text-gold-light backdrop-blur-sm">
              <span className="font-bold">{heroContent.experienceBadge.highlight}</span>
              {heroContent.experienceBadge.text.replace('10+', '').trim()}
            </span>
          </motion.div>
        </motion.div>

        {/* --- Zona central: Título principal --- */}
        <div className="flex-1 py-12 lg:py-16">
          <motion.h1
            className="max-w-4xl font-serif text-display-lg text-stone-50 lg:max-w-5xl"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            itemProp="headline"
          >
            {words.map((word, index) => {
              // Palabra clave visual: espacios/arquitectura en énfasis
              const isAccent =
                word.toLowerCase() === 'espacios' ||
                word.toLowerCase() === 'transforman'
              return (
                <span
                  key={`${word}-${index}`}
                  className="mr-[0.25em] inline-block overflow-hidden pb-1"
                >
                  <motion.span
                    className={`inline-block ${isAccent
                        ? 'italic text-gold-light'
                        : ''
                      }`}
                    variants={wordReveal}
                  >
                    {word}
                  </motion.span>
                </span>
              )
            })}
          </motion.h1>

          {/* Descripción + CTAs en fila */}
          <motion.div
            className="mt-8 flex max-w-2xl flex-col gap-8 lg:mt-10"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.p
              className="text-base font-light leading-relaxed text-stone-300 sm:text-lg"
              variants={fadeSlideUp}
              itemProp="description"
            >
              {heroContent.description}
            </motion.p>

            <motion.div
              className="flex flex-wrap items-center gap-4"
              variants={fadeSlideUp}
            >
              <Button
                onClick={() => scrollToSection('projects')}
                className="group min-h-12 px-6"
                aria-label="Ver portfolio de proyectos arquitectónicos en Cochabamba"
              >
                {heroContent.cta}
                <ArrowRight
                  size={16}
                  className="ml-2 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Button>

              <Button
                variant="outline"
                onClick={() => scrollToSection('contact')}
                className="min-h-12 px-6"
                aria-label="Solicitar asesoría arquitectónica gratuita"
              >
                <Phone size={15} className="mr-2" aria-hidden="true" />
                {heroContent.secondaryCta}
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* --- Zona inferior: Stats + Scroll indicator --- */}
        <motion.div
          className="flex flex-col gap-8 border-t border-white/10 pt-8 lg:flex-row lg:items-end lg:justify-between"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Estadísticas de confianza */}
          <motion.div
            className="flex flex-wrap gap-8 lg:gap-12"
            variants={staggerContainer}
          >
            {heroContent.stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="flex flex-col"
                variants={scaleIn}
                custom={index}
              >
                <span className="text-2xl font-bold text-gold sm:text-3xl lg:text-4xl">
                  {stat.value}
                </span>
                <span className="mt-1 text-xs font-medium uppercase tracking-wider text-stone-400">
                  {stat.label}
                </span>
                <span className="mt-0.5 hidden text-[11px] text-stone-500 sm:block">
                  {stat.description}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Scroll indicator sutil */}
          <motion.div
            className="hidden flex-col items-center gap-2 lg:flex"
            variants={fadeSlideUp}
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-stone-500">
              Desplaza
            </span>
            <motion.div
              className="h-8 w-px bg-gradient-to-b from-stone-500 to-transparent"
              animate={{ scaleY: [1, 0.5, 1] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
