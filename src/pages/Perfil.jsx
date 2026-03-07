import { Link } from 'react-router-dom'
import { getUtmSearch } from '../utils/utm'

export default function Perfil() {
  return (
    <div className="page content-page">
      <Link to={`/checkout${getUtmSearch()}`} className="back-link">← Volver</Link>
      <h2>Tu perfil</h2>
      <p>
        Aquí podrás ver tu perfil y las personas que coinciden contigo según tu fe y tus respuestas.
      </p>
      <p>
        <Link to={`/${getUtmSearch()}`} className="back-link">Volver al inicio</Link>
      </p>
    </div>
  )
}
