import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ModuleTabs } from '../components/common/ModuleTabs'
import { useServiceDetector } from '../domain/services/useServiceDetector'
import type { GuidedModule } from '../domain/models/GuidedSession'

const WEEKDAY_SECTIONS = [
  { label: 'Ao Acordar', slug: 'upon_arising', icon: '🌅' },
  { label: 'Shacharit', slug: 'weekday_shacharit', icon: '☀️' },
  { label: 'Minchá', slug: 'weekday_mincha', icon: '🌤️' },
  { label: 'Maariv', slug: 'weekday_maariv', icon: '🌙' },
  { label: 'Shemá ao Deitar', slug: 'bedtime_shema', icon: '⭐' },
]

const WEEKDAY_FLOWS = [
  { label: 'Começar Shacharit', flow: 'shacharit', icon: '☀️' },
  { label: 'Começar Minchá', flow: 'mincha', icon: '🌤️' },
  { label: 'Começar Maariv', flow: 'maariv', icon: '🌙' },
  { label: 'Shemá ao Deitar', flow: 'bedtime', icon: '⭐' },
]

const SHABBAT_FLOWS = [
  { label: 'Maariv de Shabat', flow: 'shabbat_maariv', icon: '🕯️', desc: 'Sexta à noite' },
  { label: 'Shacharit de Shabat', flow: 'shabbat_shacharit', icon: '✡', desc: 'Manhã de Sábado' },
  { label: 'Minchá de Shabat', flow: 'shabbat_mincha', icon: '🌅', desc: 'Tarde de Sábado + Havdalá' },
]

const MACHZOR_FLOWS = [
  { label: 'Rosh Hashaná', flow: 'rosh_hashana', icon: '🎺', desc: 'Ano Novo Judaico' },
  { label: 'Kol Nidrei · Shacharit', flow: 'yom_kippur_shacharit', icon: '📜', desc: 'Yom Kipur — Manhã' },
  { label: 'Musaf — Avodá', flow: 'yom_kippur_musaf', icon: '🕍', desc: 'Yom Kipur — Antes do meio-dia' },
  { label: 'Minchá — Jonas', flow: 'yom_kippur_mincha', icon: '🐋', desc: 'Yom Kipur — Tarde' },
  { label: 'Neilá', flow: 'neilah', icon: '🚪', desc: 'Yom Kipur — Fecho das portas' },
]

export function HomePage() {
  const suggestion = useServiceDetector()
  const [activeModule, setActiveModule] = useState<GuidedModule>(suggestion.module)

  return (
    <div className="home-page">
      <div className="title-page">
        <div className="tp-hebrew">סִדּוּר</div>
        <h1>Sidur — Nusach Sefarad</h1>
        <p className="tp-sub">Edição digital pedagógica · Arizal</p>

        <ModuleTabs activeModule={activeModule} onChange={setActiveModule} />

        {activeModule === 'semanal' && (
          <>
            <section className="tp-section">
              <h2>Acesso Rápido</h2>
              <div className="tp-grid">
                {WEEKDAY_SECTIONS.map(({ label, slug, icon }) => (
                  <Link key={slug} to={`/section/${slug.replace(/_/g, '-')}`} className="tp-card">
                    <span className="tp-icon">{icon}</span>
                    <span className="tp-label">{label}</span>
                  </Link>
                ))}
              </div>
            </section>

            <section className="tp-section">
              <h2>Modo Guiado</h2>
              {suggestion.module === 'semanal' && (
                <p className="tp-suggested-label">✦ Sugerido agora: {suggestion.label}</p>
              )}
              <div className="tp-grid">
                {WEEKDAY_FLOWS.map(({ label, flow, icon }) => (
                  <Link
                    key={flow}
                    to={`/guided/${flow}`}
                    className={`tp-card tp-card--guided${suggestion.flowType === flow && suggestion.module === 'semanal' ? ' tp-card--suggested' : ''}`}
                    style={suggestion.flowType === flow && suggestion.module === 'semanal' ? { '--module-accent': '#1D9E75' } as React.CSSProperties : undefined}
                  >
                    <span className="tp-icon">{icon}</span>
                    <span className="tp-label">{label}</span>
                  </Link>
                ))}
              </div>
            </section>
          </>
        )}

        {activeModule === 'shabbat' && (
          <section className="tp-section">
            <h2>Shabat</h2>
            {suggestion.module === 'shabbat' && (
              <p className="tp-suggested-label">✦ Sugerido agora: {suggestion.label}</p>
            )}
            <div className="tp-grid">
              {SHABBAT_FLOWS.map(({ label, flow, icon, desc }) => (
                <Link
                  key={flow}
                  to={`/guided/${flow}`}
                  className={`tp-card tp-card--shabbat${suggestion.flowType === flow ? ' tp-card--suggested' : ''}`}
                  style={suggestion.flowType === flow ? { '--module-accent': '#7F77DD' } as React.CSSProperties : undefined}
                >
                  <span className="tp-icon">{icon}</span>
                  <span className="tp-label">{label}</span>
                  <span className="tp-card-desc">{desc}</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {activeModule === 'machzor' && (
          <section className="tp-section">
            <h2>Machzor</h2>
            <div className="tp-grid">
              {MACHZOR_FLOWS.map(({ label, flow, icon, desc }) => (
                <Link
                  key={flow}
                  to={`/guided/${flow}`}
                  className="tp-card tp-card--machzor"
                >
                  <span className="tp-icon">{icon}</span>
                  <span className="tp-label">{label}</span>
                  <span className="tp-card-desc">{desc}</span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
