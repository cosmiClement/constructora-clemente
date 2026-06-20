import { ReactLenis } from 'lenis/react'
import type { ReactNode } from 'react'
import { CustomCursor } from '@/components/animations/CustomCursor'
import { Preloader } from '@/components/animations/Preloader'
import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'

interface RootLayoutProps {
  children: ReactNode
}

export function RootLayout({ children }: RootLayoutProps) {
  return (
    <ReactLenis root options={{ lerp: 0.05, duration: 1.5, smoothWheel: true }}>
      <Preloader />
      <CustomCursor />
      <div className="relative min-h-screen w-full bg-background text-foreground">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </div>
    </ReactLenis>
  )
}
