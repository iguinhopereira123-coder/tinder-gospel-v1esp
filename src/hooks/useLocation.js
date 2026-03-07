import { useState, useEffect } from 'react'

const LOCATION_API = 'https://ipwho.is/'

/**
 * Detecta ciudad, región y país por IP (para la etapa "identificar ciudad").
 * Usa ipwho.is (HTTPS); devuelve city, region, country.
 */
export function useLocation() {
  const [city, setCity] = useState(null)
  const [region, setRegion] = useState(null)
  const [country, setCountry] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    let cancelled = false
    async function fetchLocation() {
      try {
        const res = await fetch(LOCATION_API)
        if (!res.ok) throw new Error('Location failed')
        const data = await res.json()
        if (cancelled) return
        if (data.success !== true) throw new Error('No data')
        setCity(data.city || null)
        setRegion(data.region || null)
        setCountry(data.country || null)
      } catch {
        if (!cancelled) setError(true)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    fetchLocation()
    return () => { cancelled = true }
  }, [])

  return { city, region, country, loading, error }
}
