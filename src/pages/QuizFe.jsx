import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUtmSearch } from '../utils/utm'

const TOTAL_STEPS = 6
const CURRENT_STEP = 4

const OPCIONES = [
  { id: 'fe-dios', label: 'Fe en Dios por encima de todo' },
  { id: 'honestidad', label: 'Honestidad y transparencia' },
  { id: 'respeto', label: 'Respeto y compañerismo' },
  { id: 'proposito', label: 'Propósito y crecimiento mutuo' },
]

export default function QuizFe() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState(null)

  const canContinue = selected !== null

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!canContinue) return
    navigate('/valores' + getUtmSearch())
  }

  return (
    <div className="page onboarding">
      <div className="card-romantic onboarding-card">
        <div className="progress-steps" aria-label="Paso 4 de 6">
          {Array.from({ length: TOTAL_STEPS }, (_, i) => (
            <span
              key={i}
              className={`progress-step ${i < CURRENT_STEP ? 'active' : ''}`}
            />
          ))}
        </div>

        <h2 className="onboarding-title">
          ¿Qué valores consideras esenciales en una relación?
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

          <button type="submit" className="continue-btn" disabled={!canContinue}>
            Continuar
          </button>
        </form>
      </div>
    </div>
  )
}
