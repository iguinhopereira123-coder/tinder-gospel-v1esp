import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { persistUtmFromSearch, getUtmSearch } from './utils/utm'
import Landing from './pages/Landing'
import Onboarding from './pages/Onboarding'
import Intereses from './pages/Intereses'
import Proposito from './pages/Proposito'
import QuizFe from './pages/QuizFe'
import QuizValores from './pages/QuizValores'
import Conexiones from './pages/Conexiones'
import Checkout from './pages/Checkout'
import Results from './pages/Results'

function UtmPersist() {
  const { search } = useLocation()
  useEffect(() => {
    persistUtmFromSearch(search)
  }, [search])
  return null
}

export default function App() {
  return (
    <>
      <UtmPersist />
      <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/ciudad" element={<Navigate to={`/intereses${getUtmSearch()}`} replace />} />
      <Route path="/intereses" element={<Intereses />} />
      <Route path="/quiz" element={<Navigate to={`/intereses${getUtmSearch()}`} replace />} />
      <Route path="/proposito" element={<Proposito />} />
      <Route path="/fe" element={<QuizFe />} />
      <Route path="/valores" element={<QuizValores />} />
      <Route path="/conexiones" element={<Conexiones />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/results" element={<Results />} />
      <Route path="/perfil" element={<Navigate to={`/results${getUtmSearch()}`} replace />} />
      </Routes>
    </>
  )
}
