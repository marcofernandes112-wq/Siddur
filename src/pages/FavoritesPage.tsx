import { useBookmarksStore } from '../store/bookmarksStore'
import { useNavigationStore } from '../store/navigationStore'
import { getNodeById } from '../domain/services/navigationService'
import { Link } from 'react-router-dom'

export function FavoritesPage() {
  const bookmarks = useBookmarksStore((s) => s.bookmarks)
  const remove = useBookmarksStore((s) => s.remove)
  const tree = useNavigationStore((s) => s.tree)

  return (
    <div className="favorites-page">
      <h1 className="section-title-text">Favoritos</h1>
      {bookmarks.length === 0 ? (
        <p className="empty-state">Nenhum favorito guardado. Clique ☆ ao lado de uma oração para guardar.</p>
      ) : (
        <ul className="bookmarks-list">
          {bookmarks.map((bm) => {
            const node = tree ? getNodeById(tree, bm.prayerNodeId) : null
            return (
              <li key={bm.prayerNodeId} className="bm-item">
                <Link to={`/prayer/${node?.slug ?? bm.prayerNodeId}`} className="bm-link">
                  <span>{node?.titles.pt ?? bm.prayerNodeId}</span>
                  {node?.titles.he && <span className="bm-he">{node.titles.he}</span>}
                </Link>
                <button className="bm-remove" onClick={() => remove(bm.prayerNodeId)} aria-label="Remover favorito">✕</button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
