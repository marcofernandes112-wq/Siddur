import { useGuidedStore } from '../../store/guidedStore'
import { useNavigationStore } from '../../store/navigationStore'
import { getNodeById } from '../../domain/services/navigationService'
import { GuidedStep } from './GuidedStep'
import { NextPrevControls } from './NextPrevControls'
import { MiniMap } from './MiniMap'
import { ContextBadge } from './ContextBadge'

const MODULE_COLORS: Record<string, string> = {
  semanal: '#1D9E75',
  shabbat: '#7F77DD',
  machzor: '#D85A30',
}
const MODULE_COLORS_DIM: Record<string, string> = {
  semanal: 'rgba(29, 158, 117, 0.12)',
  shabbat: 'rgba(127, 119, 221, 0.12)',
  machzor: 'rgba(216, 90, 48, 0.12)',
}

interface Props {
  onExit: () => void
}

export function GuidedFlow({ onExit }: Props) {
  const { session, progressPercent, isComplete } = useGuidedStore()
  const tree = useNavigationStore((s) => s.tree)

  if (!session || !tree) return null

  const currentId = session.orderedPrayerNodeIds[session.currentIndex]
  const currentNode = getNodeById(tree, currentId)

  if (!currentNode) return null

  const pct = progressPercent()
  const complete = isComplete()
  const mod = session.module ?? 'semanal'
  const accentColor = MODULE_COLORS[mod]
  const accentDim = MODULE_COLORS_DIM[mod]

  const contextLabel = session.context.dayType === 'shabbat'
    ? `Shabat · ${session.flowType === 'shabbat_maariv' ? 'Maariv' : session.flowType === 'shabbat_shacharit' ? 'Shacharit' : 'Minchá'}`
    : session.context.dayType === 'yom_tov'
    ? 'Machzor'
    : undefined

  return (
    <div
      className="guided-flow"
      style={
        {
          '--module-accent': accentColor,
          '--module-accent-dim': accentDim,
        } as React.CSSProperties
      }
    >
      {contextLabel && <ContextBadge label={contextLabel} />}

      {/* Progress bar */}
      <div className="guided-progress" role="progressbar" aria-valuenow={pct} aria-valuemax={100}>
        <div className="guided-progress-bar" style={{ width: `${pct}%` }} />
        <span className="guided-progress-label">
          {session.currentIndex + 1} / {session.orderedPrayerNodeIds.length}
        </span>
      </div>

      <MiniMap total={session.orderedPrayerNodeIds.length} currentIndex={session.currentIndex} />

      {/* Current step */}
      <GuidedStep node={currentNode} isLast={complete} />

      {/* Controls */}
      <NextPrevControls onExit={onExit} />
    </div>
  )
}
