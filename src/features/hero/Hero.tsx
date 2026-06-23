import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { MapPin, ArrowRight, Phone, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { gsap } from '@/lib/gsap'
import { useScrollToSection } from '@/hooks/scroll/useScrollToSection'
import { heroContent } from './hero.content'

const socialIcons = {
  tiktok: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  ),
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mediaRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [, setVideoReady] = useState(false)
  const words = heroContent.title.split(' ')
  const scrollToSection = useScrollToSection()
  const prefersReducedMotion = useReducedMotion()

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

      gsap.to(contentRef.current, {
        y: -100,
        opacity: 0,
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

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-stone-950"
      aria-label="Inicio - Constructora Clemente"
    >
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
            onLoadedData={() => setVideoReady(true)}
            onCanPlay={() => setVideoReady(true)}
            className="h-full w-full object-cover object-center"
            src={heroContent.video}
            aria-label="Video de proyectos arquitectónicos de Constructora Clemente en Cochabamba"
          />
          <div
            className="absolute inset-0 transition-opacity duration-1000"
            style={{
              background: `
                linear-gradient(180deg, rgba(10,10,10,0.4) 0%, rgba(10,10,10,0.6) 100%),
                radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, rgba(12,11,9,0.5) 100%)
              `,
            }}
          />
        </div>
      </div>

      <motion.div
        className="absolute left-8 top-1/3 hidden h-32 w-px bg-gradient-to-b from-transparent via-gold/30 to-transparent lg:block"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.2, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
        style={{ originY: 0 }}
      />

      <Container ref={contentRef} className="relative z-10 flex min-h-screen w-full flex-col justify-center px-6 sm:px-8 lg:px-12">
          <motion.div
            className="flex flex-col items-start gap-4 pt-12 sm:pt-16 lg:pt-20"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            className="text-xs font-semibold uppercase tracking-premium-xl text-stone-300"
            variants={fadeSlideUp}
          >
            {heroContent.eyebrow}
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center gap-3"
            variants={fadeSlideUp}
          >
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-medium text-stone-200 backdrop-blur-sm">
              <MapPin size={12} className="text-gold-light" aria-hidden="true" />
              {heroContent.locationBadge.text}
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/20 bg-gold/10 px-3 py-1.5 text-xs font-medium text-gold-light backdrop-blur-sm">
              <span className="font-bold">{heroContent.experienceBadge.highlight}</span>
              {heroContent.experienceBadge.text.replace('10+', '').trim()}
            </span>
          </motion.div>

          <motion.h1
            className="mt-6 max-w-5xl font-serif text-5xl font-medium leading-tight text-stone-50 sm:text-6xl md:text-7xl lg:max-w-6xl lg:text-8xl"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            itemProp="headline"
          >
            {words.map((word, index) => (
              <span
                key={`${word}-${index}`}
                className="mr-[0.25em] inline-block overflow-hidden pb-1"
              >
                <motion.span
                  className="inline-block"
                  variants={wordReveal}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </motion.h1>

          <motion.p
            className="mt-6 max-w-xl text-base font-light leading-relaxed text-stone-300 sm:text-lg"
            variants={fadeSlideUp}
          >
            {heroContent.description}
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap items-center gap-4"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeSlideUp}>
              <Button
                onClick={() => scrollToSection('projects')}
                className="group min-h-12 px-6"
                aria-label="Ver portfolio de proyectos arquitectónicos en Cochabamba"
              >
                Proyectos
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Button>
            </motion.div>

            <motion.div variants={fadeSlideUp}>
              <Button
                variant="outline"
                onClick={() => scrollToSection('contact')}
                className="min-h-12 px-6"
                aria-label="Contactar con Constructora Clemente"
              >
                <Phone size={15} aria-hidden="true" />
                Contacto
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            className="mt-12 flex flex-wrap items-center gap-4 border-t border-white/10 pt-6"
            variants={fadeSlideUp}
          >
            <a
              href={`https://wa.me/591${heroContent.social.whatsapp.number}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-4 py-2 text-xs font-medium text-green-400 transition-colors hover:border-green-400 hover:bg-green-500/20"
              aria-label="Contactar por WhatsApp"
            >
              <MessageCircle size={14} />
              {heroContent.social.whatsapp.label}
            </a>

            <a
              href={heroContent.social.tiktok.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-xs text-stone-300 transition-colors hover:border-white/30 hover:text-white"
              aria-label={heroContent.social.tiktok.label}
            >
              {socialIcons.tiktok}
              <span className="hidden sm:inline">{heroContent.social.tiktok.label}</span>
            </a>

            <a
              href={heroContent.social.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-xs text-stone-300 transition-colors hover:border-pink-500/40 hover:text-pink-400"
              aria-label={heroContent.social.instagram.label}
            >
              {socialIcons.instagram}
              <span className="hidden sm:inline">{heroContent.social.instagram.label}</span>
            </a>

            <a
              href={heroContent.social.facebook.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-xs text-stone-300 transition-colors hover:border-blue-500/40 hover:text-blue-400"
              aria-label={heroContent.social.facebook.label}
            >
              {socialIcons.facebook}
              <span className="hidden sm:inline">{heroContent.social.facebook.label}</span>
            </a>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
