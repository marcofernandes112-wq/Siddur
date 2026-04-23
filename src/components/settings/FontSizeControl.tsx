import { useSettingsStore } from '../../store/settingsStore'

const STEPS = [0.8, 0.9, 1, 1.1, 1.2, 1.35, 1.5]
const LABELS = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL']

export function FontSizeControl() {
  const fontScale = useSettingsStore((s) => s.settings.fontScale)
  const update = useSettingsStore((s) => s.update)

  const currentIdx = STEPS.findIndex((s) => s === fontScale) ?? 2

  return (
    <div className="setting-row">
      <label className="setting-label">Tamanho de texto</label>
      <div className="font-size-btns">
        <button
          className="fs-btn"
          onClick={() => update({ fontScale: STEPS[Math.max(0, currentIdx - 1)] })}
          disabled={currentIdx === 0}
          aria-label="Diminuir texto"
        >
          A-
        </button>
        <span className="fs-value">{LABELS[currentIdx] ?? 'M'}</span>
        <button
          className="fs-btn"
          onClick={() => update({ fontScale: STEPS[Math.min(STEPS.length - 1, currentIdx + 1)] })}
          disabled={currentIdx === STEPS.length - 1}
          aria-label="Aumentar texto"
        >
          A+
        </button>
        <button
          className="fs-btn fs-btn--reset"
          onClick={() => update({ fontScale: 1 })}
          aria-label="Tamanho padrão"
        >
          A
        </button>
      </div>
    </div>
  )
}
