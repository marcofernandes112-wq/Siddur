import { Link } from 'react-router-dom'
import { useNavigationStore } from '../../store/navigationStore'
import { getNextSibling, getPrevSibling } from '../../domain/services/navigationService'

interface Props {
  nodeId: string
}

export function PrayerSequence({ nodeId }: Props) {
  const tree = useNavigationStore((s) => s.tree)
  if (!tree) return null

  const prev = getPrevSibling(tree, nodeId)
  const next = getNextSibling(tree, nodeId)

  if (!prev && !next) return null

  return (
    <nav className="prayer-sequence" aria-label="Próxima/anterior oração">
      <div className="ps-prev">
        {prev && (
          <Link to={`/prayer/${prev.slug}`} className="ps-btn ps-btn--prev">
            ‹ {prev.titles.pt}
          </Link>
        )}
      </div>
      <div className="ps-next">
        {next && (
          <Link to={`/prayer/${next.slug}`} className="ps-btn ps-btn--next">
            {next.titles.pt} ›
          </Link>
        )}
      </div>
    </nav>
  )
}
