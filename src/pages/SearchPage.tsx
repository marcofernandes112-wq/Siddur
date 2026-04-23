import { SearchBox } from '../components/common/SearchBox'
import { useSearchStore } from '../store/searchStore'
import { Link } from 'react-router-dom'

export function SearchPage() {
  const { results, query } = useSearchStore()

  return (
    <div className="search-page">
      <h1 className="section-title-text">Pesquisar</h1>
      <SearchBox autoFocus />
      {query && results.length === 0 && (
        <p className="empty-state">Nenhum resultado para "{query}".</p>
      )}
      {results.length > 0 && (
        <ul className="search-results">
          {results.map((entry) => (
            <li key={entry.nodeId}>
              <Link to={`/prayer/${entry.slug}`} className="search-result-item">
                <span className="sri-pt">{entry.titlePt}</span>
                <span className="sri-he">{entry.titleHe}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
