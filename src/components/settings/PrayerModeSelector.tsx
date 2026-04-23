import { useSettingsStore } from '../../store/settingsStore'

const MODES = [
  { value: 'full' as const, label: 'Completo', desc: 'Todas as orações' },
  { value: 'short' as const, label: 'Breve', desc: 'Versão abreviada' },
  { value: 'guided' as const, label: 'Guiado', desc: 'Passo a passo' },
]

export function PrayerModeSelector() {
  const mode = useSettingsStore((s) => s.settings.prayerMode)
  const update = useSettingsStore((s) => s.update)
  const minian = useSettingsStore((s) => s.settings.hasMinyanDefault)

  return (
    <div className="prayer-mode-selector">
      <div className="setting-row">
        <label className="setting-label">Modo</label>
        <div className="mode-btns">
          {MODES.map((m) => (
            <button
              key={m.value}
              className={`mode-btn ${mode === m.value ? 'mode-btn--active' : ''}`}
              onClick={() => update({ prayerMode: m.value })}
              aria-pressed={mode === m.value}
              title={m.desc}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>
      <div className="setting-row">
        <div className="setting-label-group">
          <span className="setting-label">Tenho Minian</span>
          <span className="setting-sublabel">Activa secções que requerem minian</span>
        </div>
        <button
          className={`toggle-btn ${minian ? 'toggle-btn--on' : ''}`}
          onClick={() => update({ hasMinyanDefault: !minian })}
          role="switch"
          aria-checked={minian}
        >
          {minian ? 'Sim' : 'Não'}
        </button>
      </div>
    </div>
  )
}
