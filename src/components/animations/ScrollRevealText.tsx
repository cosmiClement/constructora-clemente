import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ScrollRevealTextProps {
  text: string
  className?: string
}

export function ScrollRevealText({ text, className }: ScrollRevealTextProps) {
  const container = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start 85%', 'end 50%']
  })

  const words = text.split(' ')

  return (
    <div ref={container} className={cn('flex flex-wrap gap-x-2', className)}>
      {words.map((word, i) => {
        const start = i / words.length
        const end = start + (1 / words.length)
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1])
        
        return (
          <motion.span key={i} style={{ opacity }} className="inline-block">
            {word}
          </motion.span>
        )
      })}
    </div>
  )
}
