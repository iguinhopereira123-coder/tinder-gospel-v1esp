import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCountry } from '../hooks/useCountry'
import { useLocation } from '../hooks/useLocation'
import { getUtmSearch } from '../utils/utm'

const NOMINATIM_REVERSE = 'https://nominatim.openstreetmap.org/reverse'

async function reverseGeocode(lat, lon) {
  const url = `${NOMINATIM_REVERSE}?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}&format=json`
  const res = await fetch(url, {
    headers: {
      Accept: 'application/json',
      'User-Agent': 'TinderGospel-Landing/1.0'
    }
  })
  if (!res.ok) throw new Error('Geocode failed')
  const data = await res.json()
  const a = data.address || {}
  const city = a.city || a.town || a.village || a.municipality || null
  const region = a.state || a.region || a.county || null
  const country = a.country || null
  return { city, region, country }
}

function HeartIcon() {
  return (
    <svg className="heart" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  )
}

function UsersIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

function MapPinIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

export default function Landing() {
  const navigate = useNavigate()
  const { loading, regionCount, todayCount } = useCountry()
  const { city, region, country, loading: locationLoading } = useLocation()
  const [browserLocation, setBrowserLocation] = useState(null)
  const [browserLocationLoading, setBrowserLocationLoading] = useState(false)
  const [browserLocationError, setBrowserLocationError] = useState(null)

  const requestBrowserLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setBrowserLocationError('Tu navegador no admite geolocalización.')
      return
    }
    setBrowserLocationError(null)
    setBrowserLocationLoading(true)
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { city: c, region: r, country: co } = await reverseGeocode(
            position.coords.latitude,
            position.coords.longitude
          )
          setBrowserLocation({ city: c, region: r, country: co })
        } catch {
          setBrowserLocationError('No se pudo obtener la ciudad.')
        } finally {
          setBrowserLocationLoading(false)
        }
      },
      () => {
        setBrowserLocationError('Permiso denegado o ubicación no disponible.')
        setBrowserLocationLoading(false)
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 60000 }
    )
  }, [])

  const hasLocation = (city || region || country) || (browserLocation?.city || browserLocation?.region || browserLocation?.country)
  const effectiveCity = city || browserLocation?.city
  const effectiveCountry = country || browserLocation?.country
  const locationLabel = effectiveCity && effectiveCountry
    ? `${effectiveCity}, ${effectiveCountry}`
    : (effectiveCountry || effectiveCity || '')

  if (loading) {
    return (
      <div className="page">
        <p style={{ textAlign: 'center', marginTop: '3rem', color: 'hsl(var(--muted-foreground))' }}>Cargando...</p>
      </div>
    )
  }

  return (
    <div className="page landing-page">
      <div className="landing-logo" aria-hidden>
        <HeartIcon />
        <span className="cross" aria-hidden>+</span>
      </div>

      <h1>
        ¡ATENCIÓN: Dios tiene a alguien <strong>ESPECIAL</strong> esperándote <strong>¡AHORA!</strong>
      </h1>
      <p className="landing-subtext">
        Haz clic en «EMPEZAR AHORA» y descubre quién te está buscando en este mismo momento.{' '}
        <strong>{regionCount} personas de tu región ya están en línea.</strong>
      </p>

      <div className="card-romantic landing-card">
        <div className="today-count">
          <UsersIcon />
          <span>+{todayCount.toLocaleString('es')} personas se conectaron HOY</span>
        </div>
        <a
          className="btn-hero landing-cta"
          href={`/onboarding${getUtmSearch()}`}
          onClick={(e) => {
            e.preventDefault()
            navigate('/onboarding' + getUtmSearch())
          }}
        >
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" fill="currentColor" />
          </svg>
          EMPEZAR AHORA
        </a>
        <div className="landing-location">
          <MapPinIcon />
          <span>
            {locationLoading ? (
              'Buscando tu región...'
            ) : browserLocationLoading ? (
              'Buscando tu región...'
            ) : hasLocation ? (
              <>
                Ubicación detectada: <strong>{locationLabel}</strong> — Personas <strong>INCREÍBLES</strong> cerca de ti <strong>¡AHORA!</strong>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className="landing-location-link"
                  onClick={requestBrowserLocation}
                  disabled={browserLocationLoading}
                >
                  Activa tu ubicación
                </button>
                {' para encontrar personas '}
                <strong>INCREÍBLES</strong>
                {' cerca de ti '}
                <strong>¡AHORA!</strong>
                {browserLocationError && (
                  <small className="landing-location-error"> {browserLocationError}</small>
                )}
              </>
            )}
          </span>
        </div>
      </div>
    </div>
  )
}
