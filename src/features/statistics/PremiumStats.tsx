import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'

const stats = [
  { value: '+15', label: 'años de experiencia' },
  { value: '+300', label: 'proyectos desarrollados' },
  { value: '+50.000', label: 'm² diseñados' },
  { value: '98%', label: 'satisfacción de clientes' },
]

export function PremiumStats() {
  return (
    <section id="statistics" className="scroll-mt-16 bg-stone-950 py-24 text-white">
      <Container>
        <div className="grid gap-px overflow-hidden bg-white/10 md:grid-cols-4">
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              className="bg-stone-950 p-8 md:p-10"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="mb-4 font-serif text-5xl md:text-6xl">{stat.value}</p>
              <p className="text-sm uppercase tracking-[0.22em] text-stone-500">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
