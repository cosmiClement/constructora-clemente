import { ReactLenis } from 'lenis/react'
import type { ReactNode } from 'react'
import { CustomCursor } from '@/components/animations/CustomCursor'
import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { SectionPagination } from '@/components/ui/SectionPagination'

interface RootLayoutProps {
  children: ReactNode
}

export function RootLayout({ children }: RootLayoutProps) {
  return (
    <ReactLenis root options={{ lerp: 0.05, duration: 1.5, smoothWheel: true }}>
      <CustomCursor />
      <div className="relative min-h-screen w-full bg-background text-foreground">
        <Navbar />
        <SectionPagination />
        <main>{children}</main>
        <Footer />
      </div>
    </ReactLenis>
  )
}
