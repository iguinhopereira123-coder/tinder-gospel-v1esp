import { useState, useEffect } from 'react'

const CLOUDFLARE_TRACE = 'https://cloudflare.com/cdn-cgi/trace'

/** Parsea la respuesta texto de Cloudflare trace; loc= es el código ISO de país (2 letras). */
async function fetchCloudflareCountry() {
  const res = await fetch(CLOUDFLARE_TRACE)
  if (!res.ok) return null
  const text = await res.text()
  const match = text.match(/^loc=(.+)$/m)
  const code = match ? match[1].trim() : null
  if (!code || code.length !== 2) return null
  return { countryCode: code.toUpperCase(), country: countryCodeToName(code.toUpperCase()) }
}

const COUNTRY_NAMES = {
  ES: 'España', BR: 'Brasil', MX: 'México', AR: 'Argentina', CO: 'Colombia',
  CL: 'Chile', PE: 'Perú', EC: 'Ecuador', VE: 'Venezuela', US: 'Estados Unidos',
  PT: 'Portugal', IT: 'Italia', FR: 'Francia', DE: 'Alemania', GB: 'Reino Unido',
  UY: 'Uruguay', PY: 'Paraguay', BO: 'Bolivia', PA: 'Panamá', CR: 'Costa Rica'
}
function countryCodeToName(code) {
  return COUNTRY_NAMES[code] || code
}

/**
 * APIs que devuelven ciudad + región + país por IP (CORS abierto para frontend).
 * Se prueban en orden; la primera que devuelva ciudad o región gana.
 */
const GEO_APIS = [
  {
    url: 'https://ip-api.com/json/?fields=status,city,regionName,country',
    parse: (data) => {
      if (data.status !== 'success') return null
      return {
        city: data.city || null,
        region: data.regionName || null,
        country: data.country || null
      }
    }
  },
  {
    url: 'https://ipwho.is/',
    parse: (data) => {
      if (data.success !== true) return null
      return {
        city: data.city || null,
        region: data.region || null,
        country: data.country || null
      }
    }
  },
  {
    url: 'https://get.geojs.io/v1/ip/geo.json',
    parse: (data) => {
      if (!data) return null
      return {
        city: data.city || null,
        region: data.region || null,
        country: data.country || null
      }
    }
  },
  {
    url: 'https://ipapi.co/json/',
    parse: (data) => {
      if (!data || data.error) return null
      return {
        city: data.city || null,
        region: data.region || null,
        country: data.country_name || data.country || null
      }
    }
  }
]

export function useLocation() {
  const [city, setCity] = useState(null)
  const [region, setRegion] = useState(null)
  const [country, setCountry] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    let cancelled = false
    async function fetchLocation() {
      let cloudflareCountry = null
      try {
        cloudflareCountry = await fetchCloudflareCountry()
        if (cancelled) return
      } catch {
        // seguir sin país de Cloudflare
      }

      let best = null
      for (const api of GEO_APIS) {
        if (cancelled) return
        try {
          const res = await fetch(api.url)
          if (!res.ok) continue
          const data = await res.json()
          if (cancelled) return
          const parsed = api.parse(data)
          if (!parsed || !(parsed.city || parsed.region || parsed.country)) continue
          const hasCity = !!parsed.city
          const hasRegion = !!parsed.region
          if (!best || hasCity > !!best.city || (hasCity === !!best.city && hasRegion > !!best.region)) {
            best = parsed
            if (best.city) break
          }
        } catch {
          // intentar siguiente API
        }
      }

      if (!cancelled && best) {
        setCity(best.city)
        setRegion(best.region)
        setCountry(best.country)
        setError(false)
      } else if (!cancelled && cloudflareCountry?.country) {
        setCountry(cloudflareCountry.country)
        setCity(null)
        setRegion(null)
        setError(false)
      } else if (!cancelled) {
        setError(true)
      }
      if (!cancelled) setLoading(false)
    }
    fetchLocation()
    return () => { cancelled = true }
  }, [])

  return { city, region, country, loading, error }
}
