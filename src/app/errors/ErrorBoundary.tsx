import type { ErrorInfo, ReactNode } from 'react'
import { Component } from 'react'
import { Button } from '@/components/ui/Button'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Application error boundary caught an error:', error, info)
  }

  render() {
    if (!this.state.hasError) return this.props.children

    return (
      <main className="grid min-h-screen place-items-center bg-stone-950 px-6 text-white">
        <div className="max-w-xl text-center">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-stone-500">Error inesperado</p>
          <h1 className="mb-6 font-serif text-4xl">La experiencia necesita reiniciarse.</h1>
          <Button onClick={() => window.location.reload()}>Reintentar</Button>
        </div>
      </main>
    )
  }
}
