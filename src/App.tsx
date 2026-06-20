import { ErrorBoundary } from '@/app/errors/ErrorBoundary'
import { AppRouter } from '@/app/routes/AppRouter'

function App() {
  return (
    <ErrorBoundary>
      <AppRouter />
    </ErrorBoundary>
  )
}

export default App
