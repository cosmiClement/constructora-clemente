import { Container } from '@/components/ui/Container'

export function Footer() {
  return (
    <footer className="bg-stone-950 py-10 text-stone-500">
      <Container className="flex flex-col justify-between gap-4 border-t border-white/10 pt-8 text-sm md:flex-row">
        <p>Constructora Clemente</p>
        <p>Arquitectura, construcción y dirección integral de proyectos.</p>
      </Container>
    </footer>
  )
}
