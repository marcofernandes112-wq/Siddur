import type { PrayerBadge as PrayerBadgeType } from '../../domain/models/PrayerNode'

const BADGE_LABELS: Record<PrayerBadgeType, string> = {
  shared: 'Partilhado',
  only: 'Exclusivo',
  extra: 'Adicional',
  omit: 'Omitido',
}

interface Props {
  badge: PrayerBadgeType
}

export function PrayerBadge({ badge }: Props) {
  return (
    <span className={`prayer-badge prayer-badge--${badge}`}>
      {BADGE_LABELS[badge]}
    </span>
  )
}
