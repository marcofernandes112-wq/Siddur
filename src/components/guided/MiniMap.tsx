interface Props {
  total: number
  currentIndex: number
}

const MAX_DOTS = 30

export function MiniMap({ total, currentIndex }: Props) {
  const count = Math.min(total, MAX_DOTS)
  const groupSize = total > MAX_DOTS ? Math.ceil(total / MAX_DOTS) : 1

  function getState(dotIndex: number): 'done' | 'current' | 'future' {
    const prayerIndex = dotIndex * groupSize
    const endIndex = prayerIndex + groupSize - 1
    if (currentIndex > endIndex) return 'done'
    if (currentIndex >= prayerIndex && currentIndex <= endIndex) return 'current'
    return 'future'
  }

  return (
    <div className="mini-map" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => {
        const state = getState(i)
        return (
          <span
            key={i}
            className={[
              'mini-map-dot',
              state === 'done' ? 'mini-map-dot--done' : '',
              state === 'current' ? 'mini-map-dot--current' : '',
            ]
              .filter(Boolean)
              .join(' ')}
          />
        )
      })}
    </div>
  )
}
