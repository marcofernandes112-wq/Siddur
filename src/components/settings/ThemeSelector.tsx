import { useSettingsStore } from '../../store/settingsStore'

const THEMES = [
  { value: 'dark' as const, label: 'Escuro', icon: '🌙' },
  { value: 'light' as const, label: 'Claro', icon: '☀️' },
  { value: 'sepia' as const, label: 'Sépia', icon: '📜' },
]

export function ThemeSelector() {
  const theme = useSettingsStore((s) => s.settings.theme)
  const update = useSettingsStore((s) => s.update)

  return (
    <div className="setting-row">
      <label className="setting-label">Tema</label>
      <div className="theme-btns">
        {THEMES.map((t) => (
          <button
            key={t.value}
            className={`theme-btn ${theme === t.value ? 'theme-btn--active' : ''}`}
            onClick={() => update({ theme: t.value })}
            aria-pressed={theme === t.value}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>
    </div>
  )
}
