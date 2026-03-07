import { useState, useEffect } from 'react'

const GEO_API = 'https://api.country.is/'

/**
 * Detecta país (y opcionalmente número de "personas en tu región") por IP.
 * Usado para i18n y para el texto dinámico "X personas de tu región ya están en línea".
 */
export function useCountry() {
  const [country, setCountry] = useState(null)
  const [loading, setLoading] = useState(true)
  const [regionCount, setRegionCount] = useState(424)
  const [todayCount, setTodayCount] = useState(2847) // "X personas se conectaron hoy"

  useEffect(() => {
    let cancelled = false
    async function fetchGeo() {
      try {
        const res = await fetch(GEO_API)
        if (!res.ok) throw new Error('Geo failed')
        const data = await res.json()
        if (cancelled) return
        setCountry(data.country || null)
        // Número ficticio por país para dar sensación de localización (ejemplo)
        const counts = { BR: 424, ES: 318, MX: 512, AR: 287, CO: 391, US: 1204 }
        setRegionCount(counts[data.country] ?? 424)
      } catch {
        if (!cancelled) setCountry(null)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    fetchGeo()
    return () => { cancelled = true }
  }, [])

  return { country, loading, regionCount, todayCount }
}
