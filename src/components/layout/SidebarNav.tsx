import { NavLink, Link } from 'react-router-dom'
import { useNavigationStore } from '../../store/navigationStore'
import { getRootSections, getChildren } from '../../domain/services/navigationService'
import { SearchBox } from '../common/SearchBox'
import { useState } from 'react'

interface Props {
  isOpen: boolean
  onClose: () => void
}

const SECTION_ICONS: Record<string, string> = {
  upon_arising: '🌅',
  weekday_shacharit: '☀️',
  weekday_mincha: '🌤️',
  weekday_maariv: '🌙',
  bedtime_shema: '⭐',
  shabbat: '✡',
  machzor: '🎺',
}

export function SidebarNav({ isOpen, onClose }: Props) {
  const tree = useNavigationStore((s) => s.tree)
  const [expanded, setExpanded] = useState<string | null>(null)

  const sections = tree ? getRootSections(tree) : []

  return (
    <aside
      id="sidebar"
      className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}
      aria-label="Navegação do Sidur"
    >
      <div className="sidebar-header">
        <Link to="/" className="sidebar-logo" onClick={onClose}>
          <span className="sidebar-logo-he">סִדּוּר</span>
          <span className="sidebar-logo-pt">Sidur</span>
        </Link>
        <SearchBox compact onSelect={onClose} />
      </div>

      <nav className="sidebar-nav">
        <ul>
          <li>
            <NavLink to="/" end className="nav-item nav-item--home" onClick={onClose}>
              📖 Início
            </NavLink>
          </li>
          {sections.map((section) => {
            const children = tree ? getChildren(tree, section.id) : []
            const icon = SECTION_ICONS[section.id] ?? '✡️'
            const isExpanded = expanded === section.id
            return (
              <li key={section.id} className="nav-section-item">
                <button
                  className={`nav-section-btn ${isExpanded ? 'nav-section-btn--open' : ''}`}
                  onClick={() => setExpanded(isExpanded ? null : section.id)}
                  aria-expanded={isExpanded}
                >
                  <span>{icon} {section.titles.pt}</span>
                  <span className="nav-chevron">{isExpanded ? '▾' : '›'}</span>
                </button>
                {isExpanded && (
                  <ul className="nav-subnav">
                    <li>
                      <NavLink
                        to={`/section/${section.slug}`}
                        className="nav-subitem nav-subitem--section"
                        onClick={onClose}
                      >
                        Ver tudo
                      </NavLink>
                    </li>
                    {children.map((child) => (
                      <li key={child.id}>
                        <NavLink
                          to={child.childrenIds.length > 0 ? `/section/${child.slug}` : `/prayer/${child.slug}`}
                          className="nav-subitem"
                          onClick={onClose}
                        >
                          {child.titles.pt}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <NavLink to="/favorites" className="sb-btn" onClick={onClose}>⭐ Favoritos</NavLink>
        <NavLink to="/settings" className="sb-btn" onClick={onClose}>⚙️ Definições</NavLink>
        <NavLink to="/about" className="sb-btn" onClick={onClose}>ℹ️ Sobre</NavLink>
      </div>
    </aside>
  )
}
