import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUtmSearch } from '../utils/utm'

const TOTAL_STEPS = 6
const CURRENT_STEP = 5

const OPCIONES = [
  { id: 'confio', label: 'Absolutamente, confío en el tiempo de Dios' },
  { id: 'mi-parte', label: 'Sí, pero también hago mi parte' },
  { id: 'oro', label: 'Creo y oro por ello cada día' },
  { id: 'mejor', label: 'Tengo fe en que lo mejor está por venir' },
]

export default function QuizValores() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState(null)

  const canContinue = selected !== null

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!canContinue) return
    navigate('/conexiones' + getUtmSearch())
  }

  return (
    <div className="page onboarding">
      <div className="card-romantic onboarding-card">
        <div className="progress-steps" aria-label="Paso 5 de 6">
          {Array.from({ length: TOTAL_STEPS }, (_, i) => (
            <span
              key={i}
              className={`progress-step ${i < CURRENT_STEP ? 'active' : ''}`}
            />
          ))}
        </div>

        <h2 className="onboarding-title">
          ¿Crees que Dios prepara el momento adecuado para todo?
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
