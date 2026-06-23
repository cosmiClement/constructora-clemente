import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'
import { useState, useEffect, useRef } from 'react'
import { Container } from '@/components/ui/Container'
import { cn } from '@/lib/utils'
import { gsap } from '@/lib/gsap'

const materialOptions = [
  { id: 'travertine', label: 'Travertino', color: '#c8b89d' },
  { id: 'concrete', label: 'Hormigón', color: '#8d8a82' },
  { id: 'obsidian', label: 'Obsidiana', color: '#171717' },
]

export function ModelViewer() {
  const [selectedMaterialId, setSelectedMaterialId] = useState(materialOptions[0].id)
  const selectedMaterial = materialOptions.find((material) => material.id === selectedMaterialId) ?? materialOptions[0]
  
  const sectionRef = useRef<HTMLElement>(null)
  const textColRef = useRef<HTMLDivElement>(null)
  const canvasColRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text column slide-in from left
      gsap.from(textColRef.current, {
        x: -60,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      })

      // Canvas column slide-in from right
      gsap.from(canvasColRef.current, {
        x: 60,
        opacity: 0,
        duration: 1.2,
        delay: 0.2, // slight stagger
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="model-viewer" ref={sectionRef} className="scroll-mt-16 overflow-hidden bg-stone-950 py-28 text-white md:py-40">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div ref={textColRef} className="lg:col-span-4">
            <p className="mb-5 text-xs font-semibold uppercase tracking-premium-wide text-stone-500">Visualizador 3D</p>
            <h2 className="mb-6 font-serif text-4xl leading-tight md:text-6xl">Explora volumen, sombra y material.</h2>
            <div className="flex flex-wrap gap-3">
              {materialOptions.map((material) => (
                <button
                  key={material.id}
                  className={cn(
                    'border px-4 py-2 text-xs uppercase tracking-premium transition',
                    selectedMaterialId === material.id ? 'border-white bg-white text-stone-950' : 'border-white/20 text-stone-400 hover:border-white hover:text-white'
                  )}
                  onClick={() => setSelectedMaterialId(material.id)}
                >
                  {material.label}
                </button>
              ))}
            </div>
          </div>

          <div ref={canvasColRef} className="h-[520px] w-full overflow-hidden bg-stone-900 lg:col-span-8">
            <Canvas camera={{ position: [4, 3, 5], fov: 38 }}>
              <ambientLight intensity={0.55} />
              <directionalLight position={[5, 6, 4]} intensity={2.4} />
              <group rotation={[0, -0.45, 0]}>
                <mesh position={[0, 0, 0]}>
                  <boxGeometry args={[3.2, 1.8, 2.2]} />
                  <meshStandardMaterial color={selectedMaterial.color} roughness={0.55} metalness={0.08} />
                </mesh>
                <mesh position={[0.72, 1.22, 0]}>
                  <boxGeometry args={[1.75, 1.3, 2.2]} />
                  <meshStandardMaterial color={selectedMaterial.color} roughness={0.48} metalness={0.1} />
                </mesh>
                <mesh position={[-1.1, -1.05, 0]}>
                  <boxGeometry args={[1.1, 0.25, 2.6]} />
                  <meshStandardMaterial color="#2c2a26" roughness={0.7} />
                </mesh>
              </group>
              <Environment preset="city" />
              <OrbitControls enablePan={false} minDistance={4} maxDistance={8} />
            </Canvas>
          </div>
        </div>
      </Container>
    </section>
  )
}
