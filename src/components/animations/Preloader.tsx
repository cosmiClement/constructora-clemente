import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function Preloader() {
  const [progress, setProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Disable scroll while loading
    document.body.style.overflow = 'hidden'
    
    // Simulate loading progress
    const duration = 2000 // 2 seconds total loading
    const interval = 20 // update every 20ms
    const steps = duration / interval
    let currentStep = 0

    const timer = setInterval(() => {
      currentStep++
      const newProgress = Math.min(Math.round((currentStep / steps) * 100), 100)
      setProgress(newProgress)

      if (currentStep >= steps) {
        clearInterval(timer)
        setTimeout(() => {
          setIsLoading(false)
          document.body.style.overflow = 'auto' // Re-enable scroll
        }, 400) // slight pause at 100%
      }
    }, interval)

    return () => {
      clearInterval(timer)
      document.body.style.overflow = 'auto'
    }
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-stone-950 text-white"
          initial={{ opacity: 1 }}
          exit={{ 
            y: '-100%', 
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
        >
          <div className="flex flex-col items-center justify-center space-y-4">
            <motion.div 
              className="text-sm font-semibold uppercase tracking-[0.3em] text-stone-400"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Constructora Clemente
            </motion.div>
            
            <div className="font-serif text-6xl font-medium md:text-8xl">
              {progress}%
            </div>
            
            <div className="h-[2px] w-48 overflow-hidden bg-stone-800">
              <motion.div 
                className="h-full bg-white"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1, ease: 'linear' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
