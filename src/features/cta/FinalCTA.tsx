import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'

export function FinalCTA() {
  const handleStartConversation = () => {
    window.location.href = 'mailto:contacto@constructoraclemente.com?subject=Consulta%20de%20proyecto%20arquitectonico'
  }

  return (
    <section id="contact" className="relative min-h-[86vh] scroll-mt-16 overflow-hidden bg-stone-950 text-white">
      <img
        src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2200&auto=format&fit=crop"
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-45"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/35 to-stone-950/10" />

      <Container className="relative z-10 flex min-h-[86vh] flex-col justify-end pb-20 md:pb-24">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-stone-300">Legado espacial</p>
        <h2 className="mb-8 max-w-5xl font-serif text-5xl leading-[1] md:text-7xl">
          ¿Qué espacio quieres dejar como legado?
        </h2>
        <div className="flex max-w-3xl flex-col gap-8 md:flex-row md:items-center">
          <p className="text-lg font-light leading-relaxed text-stone-200">
            Convirtamos una intención en una experiencia arquitectónica precisa, memorable y construible.
          </p>
          <Button variant="outline" onClick={handleStartConversation}>Iniciar conversación</Button>
        </div>
      </Container>
    </section>
  )
}
