import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUtmSearch } from '../utils/utm'

const TOTAL_STEPS = 6
const CURRENT_STEP = 3

const OPCIONES = [
  { id: 'especial', label: 'Sí, creo que Dios tiene alguien especial para mí' },
  { id: 'compartir-fe', label: 'Quiero conocer personas que compartan mi fe' },
  { id: 'abierto', label: 'Estoy abierto/a a las posibilidades que Dios prepare' },
  { id: 'valores', label: 'Prefiero relaciones basadas en valores cristianos' },
]

export default function Proposito() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState(null)

  const canContinue = selected !== null

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!canContinue) return
    navigate('/fe' + getUtmSearch())
  }

  return (
    <div className="page onboarding">
      <div className="card-romantic onboarding-card">
        <div className="progress-steps" aria-label="Paso 3 de 6">
          {Array.from({ length: TOTAL_STEPS }, (_, i) => (
            <span
              key={i}
              className={`progress-step ${i < CURRENT_STEP ? 'active' : ''}`}
            />
          ))}
        </div>

        <h2 className="onboarding-title">
          ¿Estás buscando una relación con propósito?
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
