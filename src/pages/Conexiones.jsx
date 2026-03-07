import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUtmSearch } from '../utils/utm'

const TOTAL_STEPS = 6
const CURRENT_STEP = 6

const OPCIONES = [
  { id: 'aqui', label: 'Sí, sería perfecto conocer a alguien por aquí' },
  { id: 'expandir', label: 'Estoy dispuesto/a a ampliar mi círculo social' },
  { id: 'grupos', label: 'Me gustaría participar en grupos cristianos locales' },
  { id: 'cualquier', label: 'Creo que Dios puede usar cualquier medio' },
]

export default function Conexiones() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState(null)

  const canContinue = selected !== null

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!canContinue) return
    navigate('/results' + getUtmSearch())
  }

  return (
    <div className="page onboarding">
      <div className="card-romantic onboarding-card">
        <div className="progress-steps" aria-label="Paso 6 de 6">
          {Array.from({ length: TOTAL_STEPS }, (_, i) => (
            <span
              key={i}
              className={`progress-step ${i < CURRENT_STEP ? 'active' : ''}`}
            />
          ))}
        </div>

        <h2 className="onboarding-title">
          ¿Estás abierto a conectar con alguien de tu región?
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group quiz-options">
            {OPCIONES.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                className={`quiz-option-chip ${selected === id ? 'active' : ''}`}
                onClick={() => setSelected(id)}
              >
                <span className="quiz-option-radio" aria-hidden />
                <span className="quiz-option-label">{label}</span>
              </button>
            ))}
          </div>

          <button type="submit" className="continue-btn continue-btn-cta" disabled={!canContinue}>
            ENCONTRAR MIS CONEXIONES
          </button>
        </form>
      </div>
    </div>
  )
}
