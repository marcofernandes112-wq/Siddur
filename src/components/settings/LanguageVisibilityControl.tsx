import { useSettingsStore } from '../../store/settingsStore'

export function LanguageVisibilityControl() {
  const settings = useSettingsStore((s) => s.settings)
  const update = useSettingsStore((s) => s.update)

  return (
    <div className="language-visibility">
      {[
        { key: 'showHebrew' as const, label: 'Hebraico', sublabel: 'עברית' },
        { key: 'showTransliteration' as const, label: 'Transliteração', sublabel: 'Romanização funcional' },
        { key: 'showTranslationPt' as const, label: 'Tradução PT', sublabel: 'Português de Portugal' },
        { key: 'showCommentary' as const, label: 'Comentário', sublabel: 'Kavaná · Mussar · Pedagógico' },
      ].map(({ key, label, sublabel }) => (
        <div key={key} className="setting-row">
          <div className="setting-label-group">
            <span className="setting-label">{label}</span>
            <span className="setting-sublabel">{sublabel}</span>
          </div>
          <button
            className={`toggle-btn ${settings[key] ? 'toggle-btn--on' : ''}`}
            onClick={() => update({ [key]: !settings[key] })}
            role="switch"
            aria-checked={settings[key]}
            aria-label={`${settings[key] ? 'Ocultar' : 'Mostrar'} ${label}`}
          >
            {settings[key] ? 'ON' : 'OFF'}
          </button>
        </div>
      ))}
    </div>
  )
}
