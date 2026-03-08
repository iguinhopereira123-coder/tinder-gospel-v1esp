import { useState, useEffect } from 'react'
import { useLocation } from '../hooks/useLocation'
import { useCountry } from '../hooks/useCountry'
import { appendUtmToUrl } from '../utils/utm'

function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

function HeartIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

function ShieldIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    </svg>
  )
}

const BENEFITS = [
  'Acceso vitalicio a TODOS los chats',
  'Envío y recepción de mensajes ILIMITADOS',
  'Chat privado ILIMITADO',
  'Soporte VIP exclusivo 24h',
  'Ebook gratuito: "Cómo superar traumas de relación"',
]

export default function Checkout() {
  const { city, region, country } = useLocation()
  const { regionCount, loading } = useCountry()
  const [minutes, setMinutes] = useState(14)
  const [seconds, setSeconds] = useState(52)

  const locationText = (city && country) ? `${city}, ${country}` : (country || city || region || 'tu región')
  const count = loading ? '424' : String(regionCount)

  useEffect(() => {
    const t = setInterval(() => {
      setSeconds((s) => {
        if (s > 0) return s - 1
        setMinutes((m) => (m > 0 ? m - 1 : 14))
        return 59
      })
    }, 1000)
    return () => clearInterval(t)
  }, [])

  const pad = (n) => String(n).padStart(2, '0')
  const timer = `${pad(minutes)}:${pad(seconds)}`

  return (
    <div className="checkout-page">
      {/* Banner oferta relâmpago */}
      <div className="checkout-banner">
        <div className="checkout-banner-title">OFERTA RELÁMPAGO - TERMINA EN 24H</div>
        <div className="checkout-banner-timer">
          <ClockIcon />
          <span>{timer}</span>
        </div>
      </div>

      <div className="checkout-container">
        {/* Hero */}
        <div className="checkout-hero">
          <div className="checkout-hero-head">
            <span className="checkout-hero-emoji">🙏</span>
            <h1 className="checkout-hero-title">
              Estás a UN CLIC <span className="checkout-hero-title-accent">de distancia</span> de encontrar el amor de tu vida
            </h1>
          </div>
          <p className="checkout-hero-text">
            ATENCIÓN: Mientras piensas, 3 personas de tu región acaban de conectarse. Cada minuto que pasa, pierdes la oportunidad de conocer a alguien especial. Nuestra comunidad exclusiva ya ha transformado 2.394 vidas y conectado a miles de solteros cristianos que, como tú, estaban cansados de aplicaciones vacías y querían algo real basado en la fe.
          </p>
          <div className="checkout-urgency-box">
            <ClockIcon />
            <div>
              <strong className="checkout-urgency-label">URGENTE:</strong>
              <span> EXACTAMENTE {count} personas con tus valores están EN LÍNEA AHORA en {locationText} esperándote</span>
            </div>
          </div>
        </div>

        {/* Comunidade */}
        <section className="checkout-section">
          <h2 className="checkout-section-title">Nuestra Comunidad Exclusiva</h2>
          <p className="checkout-section-desc">
            Un espacio sagrado, organizado y ultra seguro, creado por Dios para facilitar conexiones basadas en la fe, el respeto y el propósito en todas las etapas de la vida.
          </p>
          <div className="checkout-cards-grid">
            <div className="checkout-card">
              <div className="checkout-card-inner">
                <div className="checkout-card-icon-wrap checkout-card-icon-heart">
                  <HeartIcon />
                </div>
                <h3 className="checkout-card-title">Chat Jóvenes</h3>
                <p className="checkout-card-meta">(19 a 39 años)</p>
                <p className="checkout-card-text">Conexiones instantáneas, conversaciones profundas y relaciones con propósito divino.</p>
              </div>
            </div>
            <div className="checkout-card">
              <div className="checkout-card-inner">
                <div className="checkout-card-icon-wrap checkout-card-icon-heart">
                  <HeartIcon />
                </div>
                <h3 className="checkout-card-title">Chat Adultos</h3>
                <p className="checkout-card-meta">(40 a 59 años)</p>
                <p className="checkout-card-text">Conversaciones conscientes, experiencias transformadoras y relaciones que duran para siempre.</p>
              </div>
            </div>
            <div className="checkout-card">
              <div className="checkout-card-inner">
                <div className="checkout-card-icon-wrap checkout-card-icon-heart">
                  <HeartIcon />
                </div>
                <h3 className="checkout-card-title">Chat Mayores</h3>
                <p className="checkout-card-meta">(60+)</p>
                <p className="checkout-card-text">Sabiduría, fe y nuevas posibilidades para vivir el amor con madurez y propósito.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Preço + CTA */}
        <div className="checkout-price-wrap">
          <div className="checkout-price-card">
            <div className="checkout-price-card-deco checkout-price-deco-1" aria-hidden />
            <div className="checkout-price-card-deco checkout-price-deco-2" aria-hidden />
            <div className="checkout-price-header">
              <span className="checkout-price-emoji">👑</span>
              <h3 className="checkout-price-title">ACCESO VITALICIO + BONOS EXCLUSIVOS</h3>
            </div>
            <p className="checkout-price-subtitle">
              Acceso para SIEMPRE + Ebook gratuito: "Cómo superar traumas de relación y divorcio" + Bono secreto
            </p>
            <div className="checkout-price-box">
              <div className="checkout-price-old">De 29,90 USD</div>
              <div className="checkout-price-current">6,90 USD</div>
              <div className="checkout-price-label">PAGO ÚNICO - SIN MENSUALIDAD</div>
              <div className="checkout-price-save">AHORRA 23 USD</div>
            </div>
            <ul className="checkout-benefits">
              {BENEFITS.map((text, i) => (
                <li key={i} className="checkout-benefit-item">
                  <span className="checkout-benefit-icon">
                    <CheckIcon />
                  </span>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
            <div className="checkout-cta-wrap">
              <a href={appendUtmToUrl('https://hotm.io/cacSfFl')} target="_blank" rel="noopener noreferrer" className="checkout-cta-btn" id="purchase-button">
                <span className="checkout-cta-shine" aria-hidden />
                <span className="checkout-cta-inner">
                  <span>🎁</span>
                  <span>¡GARANTIZAR ACCESO!</span>
                  <span>⚡</span>
                </span>
              </a>
              <p className="checkout-cta-note">Acceso INMEDIATO tras el pago • Garantía de 7 días • Soporte 24h</p>
            </div>
          </div>
        </div>

        {/* Esta comunidade é PERFEITA */}
        <section className="checkout-section">
          <h2 className="checkout-section-title checkout-section-title-center">
            <span className="checkout-section-title-icon"><HeartIcon /></span>
            Esta comunidad es PERFECTA para ti si...
          </h2>
          <div className="checkout-perfect-list">
            <div className="checkout-perfect-item">Buscas una relación con propósito y fundamentada en la fe</div>
            <div className="checkout-perfect-item">Crees que Dios tiene a alguien especial preparado para ti</div>
            <div className="checkout-perfect-item">Estás CANSADO/A de aplicaciones superficiales que no llevan a nada serio</div>
            <div className="checkout-perfect-item">Deseas formar parte de una comunidad seria y comprometida</div>
            <div className="checkout-perfect-item">Quieres conocer a alguien que comparta los mismos valores cristianos</div>
          </div>
        </section>

        {/* Urgência */}
        <section className="checkout-section">
          <h2 className="checkout-section-title checkout-section-title-center">
            <span className="checkout-section-title-icon"><HeartIcon /></span>
            ¿Tu historia de amor puede empezar HOY — o quieres seguir solo/a un año más?
          </h2>
          <div className="checkout-urgency-card">
            <p className="checkout-urgency-card-p">
              <span className="checkout-urgency-ok">✅</span> 93 personas están chateando AHORA — alguien podría estar hablando de ti en este mismo momento.
            </p>
            <p className="checkout-urgency-card-p">
              ¡PARA TODO! 2.394 parejas ya se han casado gracias a nuestra comunidad. Mientras dudas, otros están encontrando el amor de su vida. ¡No seas una estadística más de soledad!
            </p>
          </div>
        </section>

        {/* FAQ / Acesso + Seguro */}
        <section className="checkout-section checkout-faq">
          <div className="checkout-faq-card checkout-faq-blue">
            <div className="checkout-faq-icon">?</div>
            <div>
              <h3 className="checkout-faq-title">CÓMO RECIBIR ACCESO INMEDIATO:</h3>
              <p className="checkout-faq-text">
                Tras el pago, recibirás acceso INSTANTÁNEO por email (revisa la carpeta de spam). Si no lo recibes en 2 minutos, contacta: Instagram @namoradoscristao o por email. ¡Soporte 24h garantizado!
              </p>
              <p className="checkout-faq-highlight">¡NO ESPERES — Esta oferta termina en 24 horas!</p>
              <p className="checkout-faq-sm">📱 @namoradoscristao</p>
            </div>
          </div>
          <div className="checkout-faq-card checkout-faq-green">
            <div className="checkout-faq-icon-wrap checkout-faq-icon-shield">
              <ShieldIcon />
            </div>
            <div>
              <h3 className="checkout-faq-title">¿ES 100% SEGURO?</h3>
              <p className="checkout-faq-text">
                GARANTÍA TOTAL: Nuestra comunidad está monitorizada 24h por especialistas. Cada perfil verificado, cada conversación supervisada. Cero tolerancia con comportamientos inadecuados. Estás 100% protegido/a y seguro/a.
              </p>
              <p className="checkout-faq-highlight checkout-faq-highlight-green">
                Aquí solo encontrarás personas serias, verificadas y comprometidas con valores cristianos. Sin perfiles falsos, sin juegos, sin pérdida de tiempo. Solo amor verdadero con propósito. ❤️ ✝️
              </p>
            </div>
          </div>
        </section>

        {/* Trust footer */}
        <div className="checkout-trust">
          <div className="checkout-trust-badges">
            <div className="checkout-trust-badge">
              <span className="checkout-trust-icon"><CheckIcon /></span>
              <span>100% Seguro</span>
            </div>
            <div className="checkout-trust-badge">
              <span className="checkout-trust-icon"><ShieldIcon /></span>
              <span>Privacidad Garantizada</span>
            </div>
            <div className="checkout-trust-badge">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" /></svg>
              <span>Soporte 24h</span>
            </div>
          </div>
          <p className="checkout-trust-note">Tus datos están protegidos con cifrado de nivel militar. Transacción procesada en un entorno ultra seguro.</p>
        </div>
      </div>
    </div>
  )
}
