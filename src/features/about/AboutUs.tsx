import { Container } from '@/components/ui/Container'

export function AboutUs() {
  return (
    <section id="about" className="scroll-mt-16 bg-stone-100 py-28 text-stone-950 md:py-40">
      <Container>
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          <div>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-stone-500">
              Nuestra historia
            </p>
            <h2 className="font-serif text-4xl leading-tight md:text-6xl">
              Más de 15 años construyendo experiencias.
            </h2>
          </div>
          <div className="flex flex-col justify-center gap-8">
            <p className="text-lg font-light leading-relaxed text-stone-600">
              Somos una constructora especializada en arquitectura residencial y comercial de alta calidad.
              Cada proyecto es una oportunidad para crear espacios que perduren en el tiempo y mejoren la vida
              de quienes los habitan.
            </p>
            <p className="text-lg font-light leading-relaxed text-stone-600">
              Nuestro enfoque combina la precisión técnica con una visión estética contemporánea,
              garantizando resultados que superan las expectativas de nuestros clientes.
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default AboutUs