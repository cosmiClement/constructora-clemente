import { forwardRef, type ReactNode, type ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'

interface ContainerProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('mx-auto w-full max-w-7xl px-6 lg:px-12', className)} {...props}>
        {children}
      </div>
    )
  }
)

Container.displayName = 'Container'
