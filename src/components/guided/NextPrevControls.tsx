import { useGuidedStore } from '../../store/guidedStore'

interface Props {
  onExit: () => void
}

export function NextPrevControls({ onExit }: Props) {
  const { session, advance, retreat, endSession, isComplete } = useGuidedStore()

  if (!session) return null

  const atStart = session.currentIndex === 0
  const complete = isComplete()

  return (
    <div className="next-prev-controls">
      <button
        className="npc-btn npc-btn--prev"
        onClick={retreat}
        disabled={atStart}
        aria-label="Oração anterior"
      >
        ‹ Anterior
      </button>

      {complete ? (
        <button
          className="npc-btn npc-btn--finish"
          onClick={() => { endSession(); onExit() }}
        >
          Concluir ✓
        </button>
      ) : (
        <button
          className="npc-btn npc-btn--next"
          onClick={advance}
          aria-label="Próxima oração"
        >
          Seguinte ›
        </button>
      )}

      <button
        className="npc-btn npc-btn--exit"
        onClick={onExit}
        aria-label="Sair do modo guiado"
      >
        Sair
      </button>
    </div>
  )
}
