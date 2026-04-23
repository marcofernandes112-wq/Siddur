import { useEffect, type ReactNode } from 'react'
import { loadSiddurTree } from '../../domain/services/navigationService'
import { buildSearchIndex } from '../../domain/services/searchService'
import { useNavigationStore } from '../../store/navigationStore'

export function ContentProvider({ children }: { children: ReactNode }) {
  const setTree = useNavigationStore((s) => s.setTree)
  const setLoading = useNavigationStore((s) => s.setLoading)
  const setError = useNavigationStore((s) => s.setError)

  useEffect(() => {
    setLoading(true)
    loadSiddurTree()
      .then((tree) => {
        setTree(tree)
        buildSearchIndex(tree)
      })
      .catch((e) => setError(String(e)))
      .finally(() => setLoading(false))
  }, [setTree, setLoading, setError])

  return <>{children}</>
}
