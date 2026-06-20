import { useCallback } from 'react'
import { useLenis } from 'lenis/react'

export function useScrollToSection() {
  const lenis = useLenis()

  const scrollToSection = useCallback(
    (sectionId: string) => {
      const section = document.getElementById(sectionId)
      if (!section) return

      if (lenis) {
        lenis.scrollTo(section, { offset: -64 }) // Offset for navbar height
      } else {
        section.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      }
    },
    [lenis]
  )

  return scrollToSection
}
