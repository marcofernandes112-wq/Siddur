import { useParams, Link } from 'react-router-dom'
import { useNavigationStore } from '../store/navigationStore'
import { getNodeBySlug, getChildren } from '../domain/services/navigationService'

export function SectionPage() {
  const { sectionSlug } = useParams<{ sectionSlug: string }>()
  const tree = useNavigationStore((s) => s.tree)

  if (!tree || !sectionSlug) return <div className="loading">A carregar...</div>

  const node = getNodeBySlug(tree, sectionSlug)
  if (!node) return <div className="not-found">Secção não encontrada.</div>

  const children = getChildren(tree, node.id)

  return (
    <div className="section-page">
      <h1 className="section-title-text">{node.titles.pt}</h1>
      {node.titles.he && <p className="text-hebrew section-he-title">{node.titles.he}</p>}
      <ul className="prayer-list">
        {children.map((child) => (
          <li key={child.id}>
            <Link to={`/prayer/${child.slug}`} className="prayer-list-item">
              <span className="pli-pt">{child.titles.pt}</span>
              <span className="pli-he">{child.titles.he}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
