import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSearchStore } from '../../store/searchStore'
import { search } from '../../domain/services/searchService'

interface Props {
  compact?: boolean
  autoFocus?: boolean
  onSelect?: () => void
}

export function SearchBox({ compact, autoFocus, onSelect }: Props) {
  const { query, results, setQuery, setResults, close } = useSearchStore()
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus()
  }, [autoFocus])

  useEffect(() => {
    if (query.length >= 2) {
      setResults(search(query))
    } else {
      setResults([])
    }
  }, [query, setResults])

  function handleSelect(slug: string) {
    navigate(`/prayer/${slug}`)
    close()
    onSelect?.()
  }

  return (
    <div className={`search-box ${compact ? 'search-box--compact' : ''}`}>
      <input
        ref={inputRef}
        type="search"
        className="search-input"
        placeholder="Pesquisar orações..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Pesquisar orações"
      />
      {results.length > 0 && (
        <ul className="search-dropdown" role="listbox">
          {results.slice(0, 8).map((entry) => (
            <li
              key={entry.nodeId}
              role="option"
              className="search-dropdown-item"
              onClick={() => handleSelect(entry.slug)}
            >
              <span className="sdi-pt">{entry.titlePt}</span>
              <span className="sdi-he">{entry.titleHe}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
