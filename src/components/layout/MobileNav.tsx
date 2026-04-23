import { NavLink } from 'react-router-dom'

export function MobileNav() {
  return (
    <nav className="mobile-nav" aria-label="Navegação rápida">
      <NavLink to="/" end className="mn-item">
        <span className="mn-icon">📖</span>
        <span className="mn-label">Início</span>
      </NavLink>
      <NavLink to="/guided/shacharit" className="mn-item">
        <span className="mn-icon">☀️</span>
        <span className="mn-label">Guiado</span>
      </NavLink>
      <NavLink to="/search" className="mn-item">
        <span className="mn-icon">🔍</span>
        <span className="mn-label">Pesquisa</span>
      </NavLink>
      <NavLink to="/favorites" className="mn-item">
        <span className="mn-icon">⭐</span>
        <span className="mn-label">Favoritos</span>
      </NavLink>
      <NavLink to="/settings" className="mn-item">
        <span className="mn-icon">⚙️</span>
        <span className="mn-label">Definições</span>
      </NavLink>
    </nav>
  )
}
