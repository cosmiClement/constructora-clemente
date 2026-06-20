import { lazy, Suspense } from 'react'
import { Hero } from '@/features/hero/Hero'
import { Philosophy } from '@/features/philosophy/Philosophy'
import { Transformation } from '@/features/journey/Transformation'

const FeaturedProjects = lazy(() => import('@/features/projects/FeaturedProjects').then((module) => ({ default: module.FeaturedProjects })))
const ArchitecturalWalkthrough = lazy(() => import('@/features/walkthrough/ArchitecturalWalkthrough').then((module) => ({ default: module.ArchitecturalWalkthrough })))
const InspirationGallery = lazy(() => import('@/features/gallery/InspirationGallery').then((module) => ({ default: module.InspirationGallery })))
const BeforeAfter = lazy(() => import('@/features/comparison/BeforeAfter').then((module) => ({ default: module.BeforeAfter })))
const ModelViewer = lazy(() => import('@/features/model-viewer/ModelViewer').then((module) => ({ default: module.ModelViewer })))
const WorkProcess = lazy(() => import('@/features/process/WorkProcess').then((module) => ({ default: module.WorkProcess })))
const PremiumStats = lazy(() => import('@/features/statistics/PremiumStats').then((module) => ({ default: module.PremiumStats })))
const MaterialLibrary = lazy(() => import('@/features/materials/MaterialLibrary').then((module) => ({ default: module.MaterialLibrary })))
const Services = lazy(() => import('@/features/services/Services').then((module) => ({ default: module.Services })))
const AboutUs = lazy(() => import('@/features/about/AboutUs').then((module) => ({ default: module.AboutUs })))
const Faq = lazy(() => import('@/features/faq/Faq').then((module) => ({ default: module.Faq })))
const Contact = lazy(() => import('@/features/contact/Contact').then((module) => ({ default: module.Contact })))
const FinalCTA = lazy(() => import('@/features/cta/FinalCTA').then((module) => ({ default: module.FinalCTA })))

function SectionFallback() {
  return <div className="min-h-48 bg-stone-950" aria-hidden="true" />
}

export function HomePage() {
  return (
    <div className="flex w-full flex-col">
      <Hero />
      <Philosophy />
      <Transformation />
      <Suspense fallback={<SectionFallback />}>
        <div className="relative z-10 flex w-full flex-col bg-background">
        <AboutUs />
        <Services />
        <FeaturedProjects />
        <ArchitecturalWalkthrough />
        <InspirationGallery />
        <BeforeAfter />
        <ModelViewer />
        <WorkProcess />
        <PremiumStats />
        <MaterialLibrary />
        <Faq />
        <Contact />
          <FinalCTA />
        </div>
      </Suspense>
    </div>
  )
}
