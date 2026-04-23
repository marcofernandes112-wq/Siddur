import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import {
  addBookmark,
  removeBookmark,
  isBookmarked,
  type Bookmark,
} from '../domain/services/bookmarkService'

interface BookmarksStore {
  bookmarks: Bookmark[]
  toggle: (nodeId: string, label?: string) => void
  remove: (nodeId: string) => void
  isBookmarked: (nodeId: string) => boolean
  clear: () => void
}

export const useBookmarksStore = create<BookmarksStore>()(
  persist(
    (set, get) => ({
      bookmarks: [],
      toggle: (nodeId, label) =>
        set((s) => ({
          bookmarks: isBookmarked(s.bookmarks, nodeId)
            ? removeBookmark(s.bookmarks, nodeId)
            : addBookmark(s.bookmarks, nodeId, label),
        })),
      remove: (nodeId) =>
        set((s) => ({ bookmarks: removeBookmark(s.bookmarks, nodeId) })),
      isBookmarked: (nodeId) => isBookmarked(get().bookmarks, nodeId),
      clear: () => set({ bookmarks: [] }),
    }),
    { name: 'sidur-bookmarks' }
  )
)
