import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUtmSearch } from '../utils/utm'

const TOTAL_STEPS = 6
const CURRENT_STEP = 2

const INTERESES = [
  { id: 'cafe', label: 'Café', icon: '☕' },
  { id: 'te', label: 'Té', icon: '🍵' },
  { id: 'comida', label: 'Comida', icon: '🍴' },
  { id: 'musica', label: 'Música', icon: '🎵' },
  { id: 'lectura', label: 'Lectura', icon: '📖' },
  { id: 'fotografia', label: 'Fotografía', icon: '📷' },
  { id: 'juegos', label: 'Juegos', icon: '🎮' },
  { id: 'ejercicio', label: 'Ejercicio', icon: '💪' },
  { id: 'viajes', label: 'Viajes', icon: '✈️' },
]

export default function Intereses() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState([])

  const toggle = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  const canContinue = selected.length > 0

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!canContinue) return
    navigate('/proposito' + getUtmSearch())
  }

  return (
    <div className="page onboarding">
      <div className="card-romantic onboarding-card">
        <div className="progress-steps" aria-label="Paso 2 de 6">
          {Array.from({ length: TOTAL_STEPS }, (_, i) => (
            <span
              key={i}
              className={`progress-step ${i < CURRENT_STEP ? 'active' : ''}`}
            />
          ))}
        </div>

        <h2 className="onboarding-title">¿Cuáles son tus intereses?</h2>
        <p className="subtitle">
          Selecciona lo que te gusta hacer
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="interest-chips interest-chips-grid">
              {INTERESES.map(({ id, label, icon }) => (
                <button
                  key={id}
                  type="button"
                  className={`interest-chip interest-chip-card ${selected.includes(id) ? 'active' : ''}`}
                  onClick={() => toggle(id)}
                >
                  <span className="interest-chip-icon" aria-hidden>{icon}</span>
                  <span className="interest-chip-label">{label}</span>
                </button>
              ))}
            </div>
            <p className="interest-selected-count">Seleccionados: {selected.length}</p>
          </div>

          <button type="submit" className="continue-btn" disabled={!canContinue}>
            Continuar
          </button>
        </form>
      </div>
    </div>
  )
}
