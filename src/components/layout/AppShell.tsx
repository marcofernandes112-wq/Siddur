import { Outlet } from 'react-router-dom'
import { SidebarNav } from './SidebarNav'
import { HeaderBar } from './HeaderBar'
import { MobileNav } from './MobileNav'
import { useState, useEffect } from 'react'
import { useNavigationStore } from '../../store/navigationStore'

export function AppShell() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showBackTop, setShowBackTop] = useState(false)
  const error = useNavigationStore((s) => s.error)

  useEffect(() => {
    function onScroll() { setShowBackTop(window.scrollY > 300) }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (error) {
    return (
      <div className="app-error">
        <p>Erro ao carregar o Sidur. Recarrega a página.</p>
        <p className="app-error-detail">{error}</p>
      </div>
    )
  }

  return (
    <div className="app-shell">
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} aria-hidden="true" />
      )}
      <SidebarNav isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className={`app-main ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <HeaderBar onMenuClick={() => setSidebarOpen((v) => !v)} />
        <main className="app-content">
          <div className="content-container">
            <Outlet />
          </div>
        </main>
      </div>
      <MobileNav />
      {showBackTop && (
        <button
          id="back-top"
          className="back-to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Voltar ao topo"
        >
          ↑
        </button>
      )}
    </div>
  )
}
