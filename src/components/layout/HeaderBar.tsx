import { Link, useNavigate } from 'react-router-dom'

interface Props {
  onMenuClick: () => void
}

export function HeaderBar({ onMenuClick }: Props) {
  const navigate = useNavigate()

  return (
    <header className="header-bar">
      <button
        className="header-menu-btn"
        onClick={onMenuClick}
        aria-label="Abrir menu"
      >
        ☰
      </button>
      <Link to="/" className="header-title">
        Sidur
      </Link>
      <div className="header-actions">
        <button
          className="header-search-btn"
          onClick={() => navigate('/search')}
          aria-label="Pesquisar"
        >
          🔍
        </button>
      </div>
    </header>
  )
}
