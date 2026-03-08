import { useState, useEffect } from 'react'

const GEO_JSON_URL = 'https://get.geojs.io/v1/ip/geo.json'

/**
 * Obtiene ciudad, región y país usando solo geo.json (GeoJS).
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
        const res = await fetch(GEO_JSON_URL)
        if (!res.ok) throw new Error('Geo failed')
        const data = await res.json()
        if (cancelled) return
        if (data.city || data.region || data.country) {
          setCity(data.city || null)
          setRegion(data.region || null)
          setCountry(data.country || null)
          setError(false)
        } else {
          setError(true)
        }
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
