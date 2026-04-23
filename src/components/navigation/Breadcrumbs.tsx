import { Link } from 'react-router-dom'
import { useNavigationStore } from '../../store/navigationStore'
import { getBreadcrumbs } from '../../domain/services/navigationService'

interface Props {
  nodeId: string
}

export function Breadcrumbs({ nodeId }: Props) {
  const tree = useNavigationStore((s) => s.tree)
  if (!tree) return null

  const crumbs = getBreadcrumbs(tree, nodeId)
  if (crumbs.length <= 1) return null

  return (
    <nav className="breadcrumbs" aria-label="Localização">
      {crumbs.map((crumb, i) => (
        <span key={crumb.id} className="breadcrumb-item">
          {i > 0 && <span className="breadcrumb-sep">›</span>}
          {i < crumbs.length - 1 ? (
            <Link to={`/section/${crumb.slug}`} className="breadcrumb-link">
              {crumb.titles.pt}
            </Link>
          ) : (
            <span className="breadcrumb-current">{crumb.titles.pt}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
