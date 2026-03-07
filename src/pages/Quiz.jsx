import { Link } from 'react-router-dom'
import { getUtmSearch } from '../utils/utm'

export default function Quiz() {
  return (
    <div className="page content-page">
      <Link to={`/onboarding${getUtmSearch()}`} className="back-link">← Volver</Link>
      <h2>Un momento más para conocerte</h2>
      <p>
        Próximamente podrás responder unas breves preguntas para que podamos mostrarte
        las personas más afines a tu fe y a tu estilo de vida.
      </p>
      <p>
        <Link to={`/checkout${getUtmSearch()}`} className="btn-hero landing-cta" style={{ display: 'inline-block', marginTop: '1rem' }}>
          Ver oferta especial
        </Link>
      </p>
    </div>
  )
}
