// features/projects/FeaturedProjects.tsx
import { useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { featuredProjects } from './projects.content'
import type { ProjectData } from '@/types/project.types'

const SLIDE_VARIANTS = {
  enter: (dir: number) => ({
    x: dir > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
  },
  exit: (dir: number) => ({
    x: dir < 0 ? '100%' : '-100%',
    opacity: 0,
    transition: { duration: 0.5, ease: [0.7, 0, 0.84, 0] },
  }),
}

export function FeaturedProjects() {
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

  const project = featuredProjects[current]
  const progressPct = ((current + 1) / total) * 100

  return (
    <section id="projects" className="bg-stone-950 text-white select-none">

      {/* ── Header ─────────────────────────────────────── */}
      <div className="flex items-end justify-between border-b border-white/[0.06] px-[5vw] py-10 md:px-[7vw]">
        <div>
          <p className="mb-4 text-[0.65rem] font-medium uppercase tracking-[0.4em] text-amber-700">
            Obra seleccionada
          </p>
          <h2 className="font-serif text-3xl font-normal leading-[1.1] md:text-5xl">
            No mostramos obras.{' '}
            <em className="italic text-stone-500">Narramos decisiones.</em>
          </h2>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {/* progress bar */}
          <div className="h-px w-28 overflow-hidden bg-white/10">
            <motion.div
              className="h-full bg-amber-700"
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
          <button
            onClick={() => go(current - 1, -1)}
            aria-label="Proyecto anterior"
            className="grid h-11 w-11 place-items-center border border-white/15 transition-colors hover:border-amber-700 hover:text-amber-700"
          >
            ←
          </button>
          <button
            onClick={() => go(current + 1, 1)}
            aria-label="Proyecto siguiente"
            className="grid h-11 w-11 place-items-center border border-white/15 transition-colors hover:border-amber-700 hover:text-amber-700"
          >
            →
          </button>
        </div>
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
            <div className="relative flex flex-col justify-between overflow-hidden border-r border-white/[0.06] px-[5vw] py-12 md:px-[7vw]">
              {/* ghost index */}
              <span
                aria-hidden
                className="pointer-events-none absolute -bottom-4 -right-4 font-serif text-[12rem] leading-none text-white/[0.025] italic select-none"
              >
                {String(current + 1).padStart(2, '0')}
              </span>

              <div>
                <div className="mb-8 flex items-center gap-3">
                  <span className="font-serif text-sm italic text-amber-700">
                    {String(current + 1).padStart(2, '0')}
                  </span>
                  <span className="h-px w-6 bg-white/20" />
                  <span className="text-[0.7rem] uppercase tracking-[0.2em] text-stone-500">
                    {project.location}
                  </span>
                </div>

                <h3 className="mb-6 font-serif text-4xl font-normal leading-[1.05] md:text-6xl">
                  {project.name}
                </h3>

                <p className="max-w-md text-[0.9rem] font-light leading-[1.85] text-stone-400">
                  {project.concept}
                </p>
              </div>

              {/* problem / solution */}
              <dl className="grid grid-cols-2 border-t border-white/[0.07] pt-8">
                <div className="pr-8 border-r border-white/[0.07]">
                  <dt className="mb-3 text-[0.6rem] uppercase tracking-[0.35em] text-amber-800/70">
                    Problema
                  </dt>
                  <dd className="text-[0.82rem] leading-[1.75] text-stone-400">
                    {project.problem}
                  </dd>
                </div>
                <div className="pl-8">
                  <dt className="mb-3 text-[0.6rem] uppercase tracking-[0.35em] text-amber-800/70">
                    Solución
                  </dt>
                  <dd className="text-[0.82rem] leading-[1.75] text-stone-400">
                    {project.solution}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Right: image / visual */}
            <div className="group relative min-h-[320px] overflow-hidden bg-stone-900/40 lg:min-h-0">
              <img
                src={project.image}
                alt={project.name}
                className="absolute inset-0 h-full w-full object-cover opacity-70 transition-[opacity,transform] duration-700 group-hover:opacity-90 group-hover:scale-[1.03]"
              />

              {/* vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent" />

              {/* tags top-left */}
              <div className="absolute left-6 top-6 flex flex-col gap-2">
                {project.tags.map(tag => (
                  <span
                    key={tag}
                    className="bg-black/40 px-3 py-1.5 text-[0.6rem] uppercase tracking-[0.25em] text-stone-400 backdrop-blur-sm border border-white/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* year bottom-right */}
              <span className="absolute bottom-6 right-6 font-serif text-sm italic text-white/20">
                {project.year}
              </span>

              {/* CTA bottom-left */}
              <button className="group/cta absolute bottom-6 left-6 flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.2em] text-white/40 transition-colors hover:text-amber-700">
                Ver proyecto
                <span className="relative block h-px w-7 bg-current transition-[width] group-hover/cta:w-12">
                  <span className="absolute -top-[3px] right-0 block h-[7px] w-[7px] border-r border-t border-current rotate-45" />
                </span>
              </button>
            </div>
          </motion.article>
        </AnimatePresence>
      </div>

      {/* ── Bottom bar ─────────────────────────────────── */}
      <div className="flex items-center justify-between border-t border-white/[0.06] px-[5vw] py-5 md:px-[7vw]">
        <div className="flex gap-2" role="tablist" aria-label="Proyectos">
          {featuredProjects.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === current}
              aria-label={`Proyecto ${i + 1}`}
              onClick={() => go(i, i > current ? 1 : -1)}
              className={`h-[2px] transition-all duration-500 ${i === current
                  ? 'w-8 bg-amber-700'
                  : 'w-4 bg-white/15 hover:bg-white/30'
                }`}
            />
          ))}
        </div>
        <span className="text-[0.65rem] uppercase tracking-[0.3em] text-white/20">
          Desliza para explorar
        </span>
      </div>
    </section>
  )
}