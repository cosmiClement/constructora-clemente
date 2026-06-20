import { useState } from 'react'
import { Container } from '@/components/ui/Container'
import { cn } from '@/lib/utils'
import { materials } from './materials.content'

export function MaterialLibrary() {
  const [activeMaterialType, setActiveMaterialType] = useState(materials[0].id)
  const selectedMaterial = materials.find((material) => material.id === activeMaterialType) ?? materials[0]

  return (
    <section id="materials" className="scroll-mt-16 bg-stone-100 py-28 text-stone-950 md:py-40">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-5">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-stone-500">Biblioteca de materiales</p>
            <h2 className="mb-8 font-serif text-4xl leading-tight md:text-6xl">La materia define cómo envejece un espacio.</h2>
            <div className="flex flex-wrap gap-3">
              {materials.map((material) => (
                <button
                  key={material.id}
                  className={cn(
                    'border px-4 py-2 text-xs uppercase tracking-[0.2em] transition',
                    activeMaterialType === material.id ? 'border-stone-950 bg-stone-950 text-white' : 'border-stone-300 text-stone-500 hover:border-stone-950 hover:text-stone-950'
                  )}
                  onClick={() => setActiveMaterialType(material.id)}
                >
                  {material.name}
                </button>
              ))}
            </div>
          </div>

          <article className="grid gap-8 lg:col-span-7 lg:grid-cols-2 lg:items-end">
            <img src={selectedMaterial.image} alt={selectedMaterial.name} className="aspect-[4/5] w-full object-cover" />
            <div>
              <h3 className="mb-4 font-serif text-4xl">{selectedMaterial.name}</h3>
              <p className="mb-8 text-lg font-light leading-relaxed text-stone-600">{selectedMaterial.description}</p>
              <ul className="space-y-3">
                {selectedMaterial.applications.map((application) => (
                  <li key={application} className="border-t border-stone-300 pt-3 text-sm uppercase tracking-[0.18em] text-stone-500">
                    {application}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </div>
      </Container>
    </section>
  )
}
