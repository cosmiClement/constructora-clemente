import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useGlobalStore } from '@/store/globalStore'

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const { cursorType } = useGlobalStore()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
      backgroundColor: 'rgba(255, 255, 255, 1)',
      mixBlendMode: 'difference' as const,
      scale: 1
    },
    hover: {
      x: mousePosition.x - 40,
      y: mousePosition.y - 40,
      height: 80,
      width: 80,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.5)',
      mixBlendMode: 'normal' as const,
      scale: 1.5
    },
  }

  return (
    <>
      <style>
        {`
          @media (hover: hover) and (pointer: fine) {
            body { cursor: none; }
            a, button, input, select, textarea { cursor: none; }
          }
        `}
      </style>
      <motion.div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-50 hidden items-center justify-center rounded-full text-xs font-medium uppercase tracking-widest text-white md:flex"
        variants={variants}
        animate={cursorType}
        transition={{ 
          type: 'spring', 
          stiffness: 500, 
          damping: 28, 
          mass: 0.5 
        }}
      >
      </motion.div>
    </>
  )
}
