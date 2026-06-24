import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { servicesContent } from './services.content'

const cardVariants = {
  hidden: { y: 80, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
}

const headerVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
}

export function Services() {
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section id="services" ref={sectionRef} className="relative scroll-mt-16 bg-stone-950 py-32 text-white md:py-48">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
          className="mb-20 grid grid-cols-1 gap-12 lg:grid-cols-2"
        >
          <motion.div variants={headerVariants}>
            <div className="mb-6 text-xs font-medium uppercase tracking-premium text-stone-400">
              {servicesContent.eyebrow}
            </div>
            <h2 className="font-serif text-4xl leading-tight md:text-5xl lg:text-6xl">
              {servicesContent.title}
            </h2>
          </motion.div>
          <motion.div variants={headerVariants} className="flex items-end">
            <p className="max-w-md text-lg font-light text-stone-400">
              {servicesContent.description}
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4"
        >
          {servicesContent.services.map((service) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              className="group relative flex flex-col justify-between border border-white/10 bg-white/[0.02] backdrop-blur-md p-8 transition-all duration-300 ease-out hover:border-white/20 hover:bg-white/5 hover:shadow-card-hover hover:scale-105"
            >
              <div className="mb-16 font-serif text-3xl font-light text-stone-500 transition-colors group-hover:text-white">
                {service.id}
              </div>
              <div>
                <h3 className="mb-4 font-serif text-xl font-medium tracking-wide">
                  {service.title}
                </h3>
                <p className="text-sm font-light leading-relaxed text-stone-400">
                  {service.description}
                </p>
              </div>
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-white transition-all duration-500 ease-out group-hover:w-full" />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
