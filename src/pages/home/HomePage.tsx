import { SEO } from '@/components/SEO'
import { Hero } from '@/features/hero/Hero'
import { Philosophy } from '@/features/philosophy/Philosophy'
import { Transformation } from '@/features/journey/Transformation'
import { AboutUs } from '@/features/about/AboutUs'
import { Services } from '@/features/services/Services'
import { FeaturedProjects } from '@/features/projects/FeaturedProjects'
import { ArchitecturalWalkthrough } from '@/features/walkthrough/ArchitecturalWalkthrough'
import { InspirationGallery } from '@/features/gallery/InspirationGallery'
import { BeforeAfter } from '@/features/comparison/BeforeAfter'
import { ModelViewer } from '@/features/model-viewer/ModelViewer'
import { WorkProcess } from '@/features/process/WorkProcess'
import { PremiumStats } from '@/features/statistics/PremiumStats'
import { MaterialLibrary } from '@/features/materials/MaterialLibrary'
import { Faq } from '@/features/faq/Faq'
import { Contact } from '@/features/contact/Contact'
import { FinalCTA } from '@/features/cta/FinalCTA'

/**
 * HomePage - Landing page principal de Constructora Clemente
 *
 * Estructura semántica optimizada para SEO:
 * - <main> envuelve todo el contenido principal
 * - Cada <section> tiene un id único para navegación por anclas
 * - Orden lógico de contenido para crawlers
 * - Keywords distribuidas naturalmente en headings
 */
export function HomePage() {
  return (
    <>
      {/* SEO Global de la página principal */}
      <SEO
        title="Constructora Clemente | Arquitecto y Construcción en Cochabamba, Bolivia"
        description="Más de 10 años diseñando y construyendo proyectos arquitectónicos en Cochabamba, Bolivia. Especialistas en arquitectura residencial, comercial, dirección de obra y diseño de interiores. Solicita tu asesoría gratuita."
        keywords="constructora cochabamba, arquitecto cochabamba, empresa construccion bolivia, proyectos arquitectonicos, direccion obra cochabamba, construccion residencial, diseno interiores cochabamba, arquitectura bolivia, constructora confiable cochabamba, construccion de casas cochabamba"
        canonicalUrl="https://constructoraclemente.com"
        ogImage="https://constructoraclemente.com/og-image.jpg"
      />

      <main id="main-content" role="main">
        {/* ====== 1. HERO ======
            - Video de fondo con arquitectura
            - Keywords: "espacios", "transforman"
            - Stats de confianza visibles
            - Badge de ubicación Cochabamba
        */}
        <Hero />

        {/* ====== 2. PHILOSOPHY ======
            - Frase filosófica con scroll reveal
            - Refuerzo de marca y valores
        */}
        <Philosophy />

        {/* ====== 3. TRANSFORMATION / JOURNEY ======
            - Scroll pinneado con etapas del proyecto
            - Muestra el proceso creativo
        */}
        <Transformation />

        {/* ====== 4. ABOUT US ======
            - Información sobre la constructora
            - Historia, equipo, valores
            - Keywords: "sobre nosotros", "equipo"
        */}
        <AboutUs />

        {/* ====== 5. SERVICES ======
            - Tarjetas de servicios ofrecidos
            - Keywords: "servicios", "arquitectura", "construcción"
            - Cada servicio es un artículo semántico
        */}
        <Services />

        {/* ====== 6. FEATURED PROJECTS ======
            - Carrusel de proyectos destacados
            - Cada proyecto con imagen, ubicación, tags
            - Keywords: "proyectos", "cochabamba"
        */}
        <FeaturedProjects />

        {/* ====== 7. ARCHITECTURAL WALKTHROUGH ======
            - Recorrido por espacios arquitectónicos
            - Experiencia inmersiva
        */}
        <ArchitecturalWalkthrough />

        {/* ====== 8. INSPIRATION GALLERY ======
            - Galería con filtros por categoría
            - Imágenes de interior, exterior, detalles
        */}
        <InspirationGallery />

        {/* ====== 9. BEFORE / AFTER ======
            - Comparador deslizable antes/después
            - Prueba social visual de transformaciones
        */}
        <BeforeAfter />

        {/* ====== 10. MODEL VIEWER 3D ======
            - Visualizador 3D interactivo
            - Diferentes materiales
        */}
        <ModelViewer />

        {/* ====== 11. WORK PROCESS ======
            - Pasos del proceso de trabajo
            - Keywords: "proceso", "pasos", "cómo trabajamos"
        */}
        <WorkProcess />

        {/* ====== 12. PREMIUM STATS ======
            - Números destacados (años, proyectos, m²)
            - Refuerzo de credibilidad
        */}
        <PremiumStats />

        {/* ====== 13. MATERIAL LIBRARY ======
            - Biblioteca de materiales
            - Aplicaciones y usos
        */}
        <MaterialLibrary />

        {/* ====== 14. FAQ ======
            - Preguntas frecuentes con Schema.org FAQPage
            - Keywords: "preguntas frecuentes", "faq"
            - Rich snippets en Google
        */}
        <Faq />

        {/* ====== 15. CONTACT ======
            - Formulario de contacto completo
            - Información de contacto local
            - Keywords: "contacto", "cochabamba"
        */}
        <Contact />

        {/* ====== 16. FINAL CTA ======
            - Llamado a la acción final
            - Email directo
        */}
        <FinalCTA />
      </main>
    </>
  )
}
