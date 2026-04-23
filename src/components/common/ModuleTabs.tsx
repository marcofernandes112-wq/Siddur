import type { GuidedModule } from '../../domain/models/GuidedSession'

interface Props {
  activeModule: GuidedModule
  onChange: (module: GuidedModule) => void
}

const TABS: { module: GuidedModule; icon: string; label: string }[] = [
  { module: 'semanal', icon: '☀️', label: 'Semanal' },
  { module: 'shabbat', icon: '✡', label: 'Shabat' },
  { module: 'machzor', icon: '🎺', label: 'Machzor' },
]

export function ModuleTabs({ activeModule, onChange }: Props) {
  return (
    <div className="module-tabs" role="tablist">
      {TABS.map(({ module, icon, label }) => (
        <button
          key={module}
          role="tab"
          aria-selected={activeModule === module}
          data-module={module}
          className={`module-tab${activeModule === module ? ' module-tab--active' : ''}`}
          onClick={() => onChange(module)}
        >
          <span className="module-tab-icon">{icon}</span>
          <span>{label}</span>
        </button>
      ))}
    </div>
  )
}
