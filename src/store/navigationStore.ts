import { create } from 'zustand'
import type { SiddurTree } from '../domain/services/navigationService'

interface NavigationStore {
  tree: SiddurTree | null
  currentNodeId: string | null
  isLoading: boolean
  error: string | null
  setTree: (tree: SiddurTree) => void
  setCurrentNode: (id: string) => void
  setLoading: (v: boolean) => void
  setError: (e: string | null) => void
}

export const useNavigationStore = create<NavigationStore>()((set) => ({
  tree: null,
  currentNodeId: null,
  isLoading: false,
  error: null,
  setTree: (tree) => set({ tree }),
  setCurrentNode: (id) => set({ currentNodeId: id }),
  setLoading: (v) => set({ isLoading: v }),
  setError: (e) => set({ error: e }),
}))
