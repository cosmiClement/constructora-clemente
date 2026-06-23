import { useRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import { useGlobalStore } from '@/store/globalStore'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'light' | 'dark' | 'outline'
}

export function Button({ children, className, variant = 'light', ...props }: ButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const setCursorType = useGlobalStore((state) => state.setCursorType)
  const { onMouseEnter, onMouseLeave } = props

  const handlePointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return
    const { clientX, clientY } = e
    const { height, width, left, top } = buttonRef.current.getBoundingClientRect()
    const x = clientX - (left + width / 2)
    const y = clientY - (top + height / 2)
    
    buttonRef.current.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`
  }

  const handlePointerLeave = () => {
    if (!buttonRef.current) return
    buttonRef.current.style.transform = 'translate(0px, 0px)'
  }

  return (
    <button
      ref={buttonRef}
      className={cn(
        'group relative inline-flex min-h-12 items-center justify-center gap-3 border px-6 text-xs font-semibold uppercase tracking-premium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 overflow-hidden',
        variant === 'light' && 'border-white bg-white text-stone-950 hover:bg-stone-100 focus-visible:outline-white',
        variant === 'dark' && 'border-stone-950 bg-stone-950 text-white hover:bg-stone-800 focus-visible:outline-stone-950',
        variant === 'outline' && 'border-white/30 bg-transparent text-white hover:border-white hover:bg-white/5 focus-visible:outline-white',
        className
      )}
      style={{ transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s, border-color 0.3s' }}
      {...props}
      onPointerMove={handlePointerMove}
      onPointerLeave={(e) => {
        handlePointerLeave()
        setCursorType('default')
        onMouseLeave?.(e as unknown as React.MouseEvent<HTMLButtonElement, MouseEvent>)
      }}
      onMouseEnter={(event) => {
        setCursorType('hover')
        onMouseEnter?.(event as unknown as React.MouseEvent<HTMLButtonElement, MouseEvent>)
      }}
    >
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </button>
  )
}
