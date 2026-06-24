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
import { PremiumStats } from '@/features/statistics/PremiumStats'
import { Faq } from '@/features/faq/Faq'
import { Contact } from '@/features/contact/Contact'
import { FinalCTA } from '@/features/cta/FinalCTA'

export function HomePage() {
  return (
    <>
      <SEO
        title="Constructora Clemente | Arquitecto y Construcción en Cochabamba, Bolivia"
        description="Más de 10 años diseñando y construyendo proyectos arquitectónicos en Cochabamba, Bolivia."
        keywords="constructora cochabamba, arquitecto cochabamba, empresa construccion bolivia"
        canonicalUrl="https://constructoraclemente.com"
        ogImage="https://constructoraclemente.com/og-image.jpg"
      />

      <main id="main-content" role="main">
        <Hero />
        <Philosophy />
        <Transformation />
        <AboutUs />
        <Services />
        <FeaturedProjects />
        <ArchitecturalWalkthrough />
        <InspirationGallery />
        <BeforeAfter />
        <PremiumStats />
        {/* <MaterialLibrary /> */}
        <Faq />
        <Contact />
        <FinalCTA />
      </main>
    </>
  )
}
