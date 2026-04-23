import { useBookmarksStore } from '../../store/bookmarksStore'

interface Props {
  nodeId: string
  label?: string
}

export function BookmarkButton({ nodeId, label }: Props) {
  const toggle = useBookmarksStore((s) => s.toggle)
  const bookmarked = useBookmarksStore((s) => s.isBookmarked(nodeId))

  return (
    <button
      className={`bookmark-btn ${bookmarked ? 'bookmark-btn--active' : ''}`}
      onClick={() => toggle(nodeId, label)}
      aria-label={bookmarked ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
      title={bookmarked ? 'Remover favorito' : 'Guardar favorito'}
    >
      {bookmarked ? '★' : '☆'}
    </button>
  )
}
