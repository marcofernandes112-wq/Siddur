interface Props {
  text: string
}

const BOW_DOWN = '⬇'
const STRAIGHTEN = '⬆'
// '◈' = general instruction

export function RitualCue({ text }: Props) {
  const isBow = text.startsWith(BOW_DOWN)
  const isStraighten = text.startsWith(STRAIGHTEN)

  const label = isBow
    ? BOW_DOWN
    : isStraighten
    ? STRAIGHTEN
    : '◈'

  const body = text.replace(/^[⬇⬆◈]\s*/, '')

  const mod = isBow
    ? 'ritual-cue--bow'
    : isStraighten
    ? 'ritual-cue--straighten'
    : 'ritual-cue--instruction'

  return (
    <div className={`ritual-cue ${mod}`}>
      <span className="ritual-cue__icon">{label}</span>
      <span className="ritual-cue__text">{body}</span>
    </div>
  )
}
