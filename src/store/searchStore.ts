import { create } from 'zustand'
import type { SearchEntry } from '../domain/services/searchService'

interface SearchStore {
  query: string
  results: SearchEntry[]
  isOpen: boolean
  setQuery: (q: string) => void
  setResults: (r: SearchEntry[]) => void
  open: () => void
  close: () => void
  clear: () => void
}

export const useSearchStore = create<SearchStore>()((set) => ({
  query: '',
  results: [],
  isOpen: false,
  setQuery: (q) => set({ query: q }),
  setResults: (r) => set({ results: r }),
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false, query: '', results: [] }),
  clear: () => set({ query: '', results: [] }),
}))
