import { FontSizeControl } from '../components/settings/FontSizeControl'
import { LanguageVisibilityControl } from '../components/settings/LanguageVisibilityControl'
import { ThemeSelector } from '../components/settings/ThemeSelector'
import { PrayerModeSelector } from '../components/settings/PrayerModeSelector'

export function SettingsPage() {
  return (
    <div className="settings-page">
      <h1 className="section-title-text">Definições</h1>
      <div className="settings-sections">
        <section className="settings-section">
          <h2>Aparência</h2>
          <ThemeSelector />
          <FontSizeControl />
        </section>
        <section className="settings-section">
          <h2>Idiomas Visíveis</h2>
          <LanguageVisibilityControl />
        </section>
        <section className="settings-section">
          <h2>Modo de Oração</h2>
          <PrayerModeSelector />
        </section>
      </div>
    </div>
  )
}
