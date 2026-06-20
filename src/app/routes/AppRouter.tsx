import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { RootLayout } from '@/app/layouts/RootLayout'
import { HomePage } from '@/pages/home/HomePage'
import { ScrollToTop } from './ScrollToTop'

export function AppRouter() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <RootLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </RootLayout>
    </BrowserRouter>
  )
}
