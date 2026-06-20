import { Container } from '@/components/ui/Container'
import { walkthroughSpaces } from './walkthrough.content'

export function ArchitecturalWalkthrough() {
  return (
    <section id="walkthrough" className="scroll-mt-16 bg-stone-100 py-28 text-stone-950 md:py-40">
      <Container>
        <div className="sticky top-20 z-10 mb-14 max-w-2xl">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-stone-500">Recorrido arquitectónico</p>
          <h2 className="font-serif text-4xl leading-tight md:text-6xl">Camina el proyecto antes de construirlo.</h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {walkthroughSpaces.map((space, index) => (
            <article key={space.id} className={index % 2 === 0 ? 'md:mt-24' : ''}>
              <div className="group relative overflow-hidden">
                <img src={space.image} alt={space.name} className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 p-8 text-white">
                  <p className="mb-3 text-xs uppercase tracking-[0.3em] text-stone-300">{String(index + 1).padStart(2, '0')}</p>
                  <h3 className="mb-3 font-serif text-4xl">{space.name}</h3>
                  <p className="max-w-sm text-sm leading-relaxed text-stone-200">{space.description}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
