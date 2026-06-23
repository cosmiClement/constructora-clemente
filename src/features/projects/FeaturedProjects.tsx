import { useRef, useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { gsap } from '@/lib/gsap'
import { featuredProjects } from './projects.content'

const SLIDE_VARIANTS = {
  enter: (dir: number) => ({
    x: dir > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] as const },
  },
  exit: (dir: number) => ({
    x: dir < 0 ? '100%' : '-100%',
    opacity: 0,
    transition: { duration: 0.5, ease: [0.7, 0, 0.84, 0] as const },
  }),
}

export function FeaturedProjects() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const [[current, direction], setSlide] = useState([0, 0])
  const touchStart = useRef(0)
  const total = featuredProjects.length

  const go = useCallback((next: number, dir: number) => {
    setSlide([(next + total) % total, dir])
  }, [total])

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStart.current
    if (Math.abs(dx) > 50) go(current + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1)
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
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
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const project = featuredProjects[current]
  const progressPct = ((current + 1) / total) * 100

  return (
    <section id="projects" ref={sectionRef} className="bg-stone-950 text-white select-none">

      {/* ── Header ─────────────────────────────────────── */}
      <div ref={headerRef} className="border-b border-white/10">
        <Container>
          <div className="flex flex-col items-start justify-between py-16 md:flex-row md:items-end">
            <div className="mb-8 md:mb-0">
              <p className="mb-5 text-xs font-semibold uppercase tracking-premium-wide text-stone-500">
                Proyectos destacados
              </p>
              <h2 className="font-serif text-4xl leading-tight md:text-6xl">
                No mostramos obras.{' '}
                <span className="italic text-stone-500">Narramos decisiones.</span>
              </h2>
            </div>

            <div className="hidden items-center gap-3 md:flex">
              <div className="h-px w-28 overflow-hidden bg-white/10">
                <motion.div
                  className="h-full bg-gold"
                  animate={{ width: `${progressPct}%` }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
              <button
                onClick={() => go(current - 1, -1)}
                aria-label="Proyecto anterior"
                className="grid h-11 w-11 place-items-center border border-white/15 transition-colors hover:border-gold hover:text-gold"
              >
                ←
              </button>
              <button
                onClick={() => go(current + 1, 1)}
                aria-label="Proyecto siguiente"
                className="grid h-11 w-11 place-items-center border border-white/15 transition-colors hover:border-gold hover:text-gold"
              >
                →
              </button>
            </div>
          </div>
        </Container>
      </div>

      {/* ── Slide area ─────────────────────────────────── */}
      <div
        className="relative overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.article
            key={project.id}
            custom={direction}
            variants={SLIDE_VARIANTS}
            initial="enter"
            animate="center"
            exit="exit"
            className="grid min-h-[560px] grid-cols-1 lg:grid-cols-2"
          >
            {/* Left: text */}
            <div className="relative flex flex-col justify-between overflow-hidden border-r border-white/10">
              <Container className="flex h-full flex-col justify-between py-12">
                {/* ghost index */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -bottom-4 -right-4 font-serif text-[12rem] leading-none text-white/[0.025] italic select-none"
                >
                  {String(current + 1).padStart(2, '0')}
                </span>

                <div>
                  <div className="mb-8 flex items-center gap-3">
                    <span className="font-serif text-sm italic text-gold">
                      {String(current + 1).padStart(2, '0')}
                    </span>
                    <span className="h-px w-6 bg-white/20" />
                    <span className="text-xs uppercase tracking-premium text-stone-500">
                      {project.location}
                    </span>
                  </div>

                  <h3 className="mb-6 font-serif text-4xl font-normal leading-tight md:text-6xl">
                    {project.name}
                  </h3>

                  <p className="max-w-md text-sm font-light leading-relaxed text-stone-400">
                    {project.concept}
                  </p>
                </div>

                <dl className="grid grid-cols-2 border-t border-white/10 pt-8">
                  <div className="border-r border-white/10 pr-8">
                    <dt className="mb-3 text-[10px] uppercase tracking-premium-xl text-gold/70">
                      Problema
                    </dt>
                    <dd className="text-xs leading-relaxed text-stone-400">
                      {project.problem}
                    </dd>
                  </div>
                  <div className="pl-8">
                    <dt className="mb-3 text-[10px] uppercase tracking-premium-xl text-gold/70">
                      Solución
                    </dt>
                    <dd className="text-xs leading-relaxed text-stone-400">
                      {project.solution}
                    </dd>
                  </div>
                </dl>
              </Container>
            </div>

            {/* Right: image / visual */}
            <div className="group relative min-h-[320px] overflow-hidden bg-stone-900/40 lg:min-h-0">
              <img
                src={project.image}
                alt={project.name}
                className="absolute inset-0 h-full w-full object-cover opacity-70 transition-all duration-700 group-hover:scale-[1.03] group-hover:opacity-90"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent" />

              <div className="absolute left-6 top-6 flex flex-col gap-2">
                {project.tags.map(tag => (
                  <span
                    key={tag}
                    className="border border-white/10 bg-stone-900/40 px-3 py-1.5 text-[10px] uppercase tracking-premium text-stone-400 backdrop-blur-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <span className="absolute bottom-6 right-6 font-serif text-sm italic text-white/20">
                {project.year}
              </span>

              <button className="group/cta absolute bottom-6 left-6 flex items-center gap-3 text-xs uppercase tracking-premium text-white/40 transition-colors hover:text-gold">
                Ver proyecto
                <span className="relative block h-px w-7 bg-current transition-[width] group-hover/cta:w-12">
                  <span className="absolute -right-0 -top-[3px] block h-[7px] w-[7px] rotate-45 border-r border-t border-current" />
                </span>
              </button>
            </div>
          </motion.article>
        </AnimatePresence>
      </div>

      {/* ── Bottom bar ─────────────────────────────────── */}
      <div className="border-t border-white/10">
        <Container>
          <div className="flex items-center justify-between py-5">
            <div className="flex gap-2" role="tablist" aria-label="Proyectos">
              {featuredProjects.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === current}
                  aria-label={`Proyecto ${i + 1}`}
                  onClick={() => go(i, i > current ? 1 : -1)}
                  className={`h-[2px] transition-all duration-500 ${i === current
                      ? 'w-8 bg-gold'
                      : 'w-4 bg-white/15 hover:bg-white/30'
                    }`}
                />
              ))}
            </div>
            <span className="text-[10px] uppercase tracking-premium-wide text-white/20">
              Desliza para explorar
            </span>
          </div>
        </Container>
      </div>
    </section>
  )
}