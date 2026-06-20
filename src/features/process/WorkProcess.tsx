import { Container } from '@/components/ui/Container'

const processSteps = [
  'Reunión inicial',
  'Conceptualización',
  'Diseño',
  'Renderizado',
  'Construcción',
  'Entrega',
]

export function WorkProcess() {
  return (
    <section id="process" className="scroll-mt-16 bg-stone-100 py-28 text-stone-950 md:py-40">
      <Container>
        <div className="mb-16 max-w-2xl">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-stone-500">Proceso de trabajo</p>
          <h2 className="font-serif text-4xl leading-tight md:text-6xl">Un método claro para decisiones complejas.</h2>
        </div>

        <ol className="grid gap-px overflow-hidden bg-stone-300 md:grid-cols-3">
          {processSteps.map((step, index) => (
            <li key={step} className="group min-h-56 bg-stone-100 p-8 transition duration-500 hover:bg-stone-950 hover:text-white">
              <p className="mb-10 text-xs uppercase tracking-[0.3em] text-stone-500">
                {String(index + 1).padStart(2, '0')}
              </p>
              <h3 className="font-serif text-3xl">{step}</h3>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}
