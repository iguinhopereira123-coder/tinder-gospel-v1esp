import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUtmSearch } from '../utils/utm'
import { useCountry } from '../hooks/useCountry'
import { useLocation } from '../hooks/useLocation'
import { useUser } from '../context/UserContext'

const TOTAL_STEPS = 6
const CURRENT_STEP = 1

export default function Onboarding() {
  const navigate = useNavigate()
  const { setGender: setUserGender, setName: setUserName, setAge: setUserAge } = useUser()
  const { loading } = useCountry()
  const { city: detectedCity } = useLocation()
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [gender, setGender] = useState(null)

  const ageNum = parseInt(age.trim(), 10)
  const ageUnder18 = age.trim() !== '' && !Number.isNaN(ageNum) && ageNum < 18
  const canContinue = name.trim().length > 0 && age.trim().length > 0 && gender && !ageUnder18

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!canContinue) return
    setUserGender(gender)
    setUserName(name.trim())
    setUserAge(age.trim())
    navigate('/intereses' + getUtmSearch())
  }

  if (loading) {
    return (
      <div className="page">
        <p style={{ textAlign: 'center', marginTop: '3rem', color: 'hsl(var(--muted-foreground))' }}>Cargando...</p>
      </div>
    )
  }

  return (
    <div className="page onboarding">
      <div className="card-romantic onboarding-card">
        <div className="progress-steps" aria-label="Paso 1 de 6">
          {Array.from({ length: TOTAL_STEPS }, (_, i) => (
            <span
              key={i}
              className={`progress-step ${i < CURRENT_STEP ? 'active' : ''}`}
            />
          ))}
        </div>

        <h2 className="onboarding-title">¡Vamos a encontrar el amor de tu vida!</h2>
        <p className="subtitle">
          Cuéntanos sobre ti: solo 2 minutos para cambiar tu vida para siempre.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Tu nombre</label>
            <input
              id="name"
              type="text"
              placeholder="Escribe tu nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="age">Tu edad</label>
            <input
              id="age"
              type="number"
              min="18"
              max="120"
              placeholder="Escribe tu edad"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className={ageUnder18 ? 'input-error' : ''}
              aria-invalid={ageUnder18}
              aria-describedby={ageUnder18 ? 'age-error' : undefined}
            />
            {ageUnder18 && (
              <p id="age-error" className="form-age-error" role="alert">
                Disponible solo para mayores de 18 años.
              </p>
            )}
          </div>

          <div className="form-group">
            <label>Género</label>
            <div className="gender-row">
              <button
                type="button"
                className={`gender-btn ${gender === 'M' ? 'active' : ''}`}
                onClick={() => setGender('M')}
              >
                Masculino
              </button>
              <button
                type="button"
                className={`gender-btn ${gender === 'F' ? 'active' : ''}`}
                onClick={() => setGender('F')}
              >
                Femenino
              </button>
            </div>
          </div>

          {detectedCity && (
            <p className="location-detected-hint">Ciudad detectada: <strong>{detectedCity}</strong></p>
          )}

          <button
            type="submit"
            className="continue-btn"
            disabled={!canContinue}
          >
            Continuar
          </button>
        </form>
      </div>
    </div>
  )
}
