import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocation } from '../hooks/useLocation'
import { useUser } from '../context/UserContext'
import { getUtmSearch } from '../utils/utm'

const ANALYSIS_STEPS = [
  { id: 1, labelKey: 'analyzing' },
  { id: 2, labelKey: 'compatibilities' },
  { id: 3, labelKey: 'profiles' },
  { id: 4, labelKey: 'affinities' },
]

const LOADING_DURATION_MS = 4000
const STEP_INTERVAL_MS = 800

/* Perfis de mulheres (mostrados cuando el usuario seleccionó Masculino) – nombres españoles */
const WOMEN_PROFILES = [
  { id: 'ana', name: 'Ana', age: 26, distance: 2, unlocked: true, imageUrl: 'https://i.pinimg.com/736x/09/17/9c/09179c747f70eab93f12ee7a0ade5375.jpg', bio: 'Líder de jóvenes en la iglesia y apasionada por la cocina. Busco a alguien que comparta mi fe y sueñe con construir una familia bendecida. ¡EN LÍNEA AHORA!' },
  { id: 'beatriz', name: 'Beatriz', age: 29, distance: 1.5, unlocked: false, imageUrl: 'https://i.pinimg.com/736x/ae/2d/de/ae2dde97ee10af11986e66b8740704e8.jpg', bio: 'Profesora cristiana, apasionada por la música gospel y los niños. Creo que Dios tiene planes perfectos para nuestra vida. ¡DISPONIBLE PARA CHATEAR!' },
  { id: 'carmen', name: 'Carmen', age: 24, distance: 3, unlocked: false, imageUrl: 'https://i.pinimg.com/736x/90/c0/97/90c097159b9bf2eac99ed4f5a259ca52.jpg', bio: 'Enfermera dedicada. Creo que Dios tiene planes perfectos para nosotros y busco un compañero de fe. ¡EN LÍNEA AHORA!' },
  { id: 'laura', name: 'Laura', age: 31, distance: 4, unlocked: false, imageUrl: 'https://i.pinimg.com/474x/24/8c/9d/248c9d3bf57f32b87f9c983ba871e74b.jpg', bio: 'Líder de alabanza, amo adorar a Dios y busco un compañero que me ayude a crecer en la fe y en el amor. ¡DISPONIBLE!' },
  { id: 'maria', name: 'María', age: 27, distance: 2.8, unlocked: false, imageUrl: 'https://i.pinimg.com/736x/56/01/a3/5601a3ce697f63a077cca7782ece8586.jpg', bio: 'Psicóloga y cristiana. Quiero construir una familia en los caminos del Señor y servir al prójimo con amor. ¡EN LÍNEA AHORA!' },
  { id: 'lucia', name: 'Lucía', age: 25, distance: 3.2, unlocked: false, imageUrl: 'https://i.pinimg.com/736x/ed/92/45/ed924552e0ec20118b4bad592f133ed4.jpg', bio: 'Pedagoga apasionada por los niños y el ministerio infantil. Busco una relación basada en la Palabra. ¡DISPONIBLE!' },
  { id: 'isabel', name: 'Isabel', age: 33, distance: 1.8, unlocked: false, imageUrl: 'https://i.pinimg.com/736x/10/9e/3f/109e3fba2c49e3f430ed019c1f714906.jpg', bio: 'Empresaria y mujer de fe, quiero compartir mi camino con alguien que sueñe en grande con Dios. ¡EN LÍNEA AHORA!' },
  { id: 'elena', name: 'Elena', age: 28, distance: 2.5, unlocked: false, imageUrl: 'https://i.pinimg.com/736x/82/de/44/82de44d9892f44349553002f697bd2ff.jpg', bio: 'Misionera y enfermera. Amo servir al prójimo y sueño con un hogar cristiano lleno de amor. ¡DISPONIBLE!' },
]

/* Perfis de homens (mostrados cuando el usuario eligió Feminino) – nombres españoles */
const MEN_PROFILES = [
  { id: 'antonio', name: 'Antonio', age: 30, distance: 1.8, unlocked: true, imageUrl: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face', bio: 'Pastor joven, apasionado por evangelizar y servir a la comunidad. Busco una compañera que ame a Dios. ¡EN LÍNEA AHORA!' },
  { id: 'diego', name: 'Diego', age: 28, distance: 2.3, unlocked: false, imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face', bio: 'Músico y líder de alabanza, amo adorar a Dios y busco una mujer para compartir la fe y el amor. ¡DISPONIBLE!' },
  { id: 'carlos', name: 'Carlos', age: 32, distance: 3.1, unlocked: false, imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face', bio: 'Ingeniero y voluntario en la iglesia. Deseo construir una familia cristiana sólida y feliz. ¡EN LÍNEA AHORA!' },
  { id: 'daniel', name: 'Daniel', age: 27, distance: 1.5, unlocked: false, imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face', bio: 'Estudiante de teología y evangelista. Busco una compañera para compartir la vida y la fe. ¡DISPONIBLE!' },
  { id: 'eduardo', name: 'Eduardo', age: 29, distance: 4.2, unlocked: false, imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face', bio: 'Médico dedicado. Quiero encontrar mi compañera de vida y fe para servir juntos al Señor. ¡EN LÍNEA AHORA!' },
  { id: 'felipe', name: 'Felipe', age: 31, distance: 2.7, unlocked: false, imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face', bio: 'Empresario y anciano. Busco una mujer virtuosa para edificar un hogar bendecido. ¡DISPONIBLE!' },
  { id: 'gabriel', name: 'Gabriel', age: 26, distance: 3.5, unlocked: false, imageUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&h=150&fit=crop&crop=face', bio: 'Desarrollador y músico. Quiero encontrar a alguien para crecer en la fe y en el amor. ¡EN LÍNEA AHORA!' },
  { id: 'enrique', name: 'Enrique', age: 33, distance: 2.1, unlocked: false, imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face', bio: 'Profesor y líder de jóvenes. Busco una compañera para servir a Dios y construir una familia. ¡DISPONIBLE!' },
  { id: 'javier', name: 'Javier', age: 29, distance: 3.8, unlocked: false, imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face', bio: 'Abogado cristiano, creo que el amor verdadero es fruto de la fe y del compromiso sincero. ¡EN LÍNEA AHORA!' },
  { id: 'juan', name: 'Juan', age: 35, distance: 1.9, unlocked: false, imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face', bio: 'Pastor auxiliar y consejero espiritual. Busco una mujer para una caminata de fe y amor. ¡DISPONIBLE!' },
  { id: 'luis', name: 'Luis', age: 28, distance: 2.4, unlocked: false, imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face', bio: 'Músico y adorador, busco a alguien para compartir la vida y la pasión por Cristo. ¡EN LÍNEA AHORA!' },
  { id: 'miguel', name: 'Miguel', age: 31, distance: 3.2, unlocked: false, imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face', bio: 'Enfermero y voluntario en misiones. Mi corazón anhela un amor que sirva a Dios conmigo. ¡DISPONIBLE!' },
  { id: 'santiago', name: 'Santiago', age: 27, distance: 2.8, unlocked: false, imageUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&h=150&fit=crop&crop=face', bio: 'Estudiante de psicología y líder de jóvenes. Busco una compañera para crecer en la fe. ¡EN LÍNEA AHORA!' },
  { id: 'pablo', name: 'Pablo', age: 30, distance: 2.6, unlocked: false, imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face', bio: 'Médico y misionero. Quiero encontrar mi compañera de vida y fe para servir juntos. ¡EN LÍNEA AHORA!' },
  { id: 'rafael', name: 'Rafael', age: 29, distance: 3.4, unlocked: false, imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face', bio: 'Ingeniero y líder de alabanza. Busco una mujer para compartir la fe y el amor. ¡DISPONIBLE!' },
  { id: 'samuel', name: 'Samuel', age: 32, distance: 1.7, unlocked: false, imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face', bio: 'Profesor de teología y evangelista. Busco una compañera para compartir la vida y la fe. ¡EN LÍNEA AHORA!' },
  { id: 'sergio', name: 'Sergio', age: 28, distance: 2.9, unlocked: false, imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face', bio: 'Desarrollador y voluntario en la iglesia. Quiero encontrar a alguien para crecer en la fe y en el amor. ¡DISPONIBLE!' },
]

function StarIcon({ className = 'analysis-step-svg' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg className="analysis-step-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}

function UsersIcon() {
  return (
    <svg className="analysis-step-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

function SparklesIcon() {
  return (
    <svg className="analysis-step-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg className="analysis-check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

function AnalysisStepIcon({ index, isDone }) {
  if (isDone) return <CheckIcon />
  switch (index) {
    case 0: return <SearchIcon />
    case 1: return <UsersIcon />
    case 2: return <StarIcon />
    case 3: return <SparklesIcon />
    default: return <CheckIcon />
  }
}

function HeartIcon({ filled }) {
  return (
    <svg className="results-heart-icon" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  )
}

function LockIcon() {
  return (
    <svg className="results-lock-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}

export default function Results() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [completedSteps, setCompletedSteps] = useState(0)
  const { city, region, country } = useLocation()
  const { gender } = useUser()
  const checkoutPath = `/checkout${getUtmSearch()}`
  // Como no site original: se selecionou Homem (M) mostra perfis de mulher; se Mulher (F) mostra perfis de homem
  const profiles = gender === 'M' ? WOMEN_PROFILES : gender === 'F' ? MEN_PROFILES : WOMEN_PROFILES

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), LOADING_DURATION_MS)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!loading) return
    const interval = setInterval(() => {
      setCompletedSteps((n) => (n < 4 ? n + 1 : n))
    }, STEP_INTERVAL_MS)
    return () => clearInterval(interval)
  }, [loading])

  const getStepLabel = (labelKey) => {
    switch (labelKey) {
      case 'analyzing':
        return 'Analizando tus respuestas...'
      case 'compatibilities':
        return 'Identificando compatibilidades PERFECTAS...'
      case 'profiles':
        return `Buscando perfiles en ${(city && country) ? `${city}, ${country}` : (country || city || region || 'tu región')}...`
      case 'affinities':
        return 'Calculando afinidades ESPIRITUALES...'
      default:
        return ''
    }
  }

  if (loading) {
    return (
      <div className="analysis-wrap">
        <div className="analysis-inner">
          <div className="analysis-top">
            <div className="analysis-star-wrap">
              <StarIcon className="analysis-star-icon" />
            </div>
            <h2 className="analysis-title">BUSCANDO EL AMOR DE TU VIDA...</h2>
            <p className="analysis-subtitle">
              Encontrando las conexiones PERFECTAS para ti en este momento.
            </p>
          </div>
          <div className="analysis-steps">
            {ANALYSIS_STEPS.map((step, index) => {
              const isDone = index < completedSteps
              const isCurrent = index === completedSteps
              return (
                <div
                  key={step.id}
                  className={`analysis-step ${isDone ? 'analysis-step-done' : ''} ${isCurrent ? 'analysis-step-current' : ''}`}
                >
                  <div className="analysis-step-icon">
                    <AnalysisStepIcon index={index} isDone={isDone} />
                  </div>
                  <span className="analysis-step-label">{getStepLabel(step.labelKey)}</span>
                </div>
              )
            })}
          </div>
          <p className="analysis-wait">Por favor, espera: estamos encontrando personas INCREÍBLES para ti.</p>
        </div>
      </div>
    )
  }

  const locationText = (city && country) ? `${city}, ${country}` : (country || city || region || 'tu región')

  return (
    <div className="page results-page-wrap">
      <div className="results-header">
        <div className="results-logo" aria-hidden>
          <span className="results-logo-heart">
            <HeartIcon />
          </span>
          <span className="results-logo-badge">✝</span>
        </div>
        <h1 className="results-title">¡ENCONTRAMOS PERSONAS INCREÍBLES PARA TI!</h1>
        <p className="results-subtitle">Aquí están tus conexiones PERFECTAS — elige con sabiduría.</p>
      </div>

      <div className="results-list-wrap">
        <div className="results-list">
          {profiles.map((profile) => (
            <article key={profile.id} className="results-card">
              <div className="results-card-avatar-wrap">
                <img
                  src={profile.imageUrl}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className={`results-card-avatar ${profile.unlocked ? '' : 'results-card-avatar-locked'}`}
                />
                {!profile.unlocked && (
                  <span className="results-card-avatar-lock">
                    <LockIcon />
                  </span>
                )}
              </div>
              <div className="results-card-body">
                <div className="results-card-head">
                  <h3 className="results-card-name">{profile.name}, {profile.age}</h3>
                  <span className="results-card-distance">📍 {profile.distance} km</span>
                </div>
                <p className="results-card-bio">{profile.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="results-banner">
        <p>
          <strong>+247 personas</strong> con tus valores están ESPERANDO por ti en {locationText}
        </p>
      </div>

      <div className="results-cta-fixed">
        <div className="results-cta-inner">
          <a
            href={checkoutPath}
            className="results-cta-btn"
            onClick={(e) => {
              e.preventDefault()
              navigate(checkoutPath)
            }}
          >
            <HeartIcon filled />
            Ver Todas las Conexiones
          </a>
          <p className="results-cta-note">Tus valores y fe han atraído a personas INCREÍBLES de tu región.</p>
        </div>
      </div>
    </div>
  )
}
