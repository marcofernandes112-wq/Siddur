export interface Bookmark {
  prayerNodeId: string
  savedAt: string
  label?: string
}

export function addBookmark(bookmarks: Bookmark[], nodeId: string, label?: string): Bookmark[] {
  if (bookmarks.some((b) => b.prayerNodeId === nodeId)) return bookmarks
  return [...bookmarks, { prayerNodeId: nodeId, savedAt: new Date().toISOString(), label }]
}

export function removeBookmark(bookmarks: Bookmark[], nodeId: string): Bookmark[] {
  return bookmarks.filter((b) => b.prayerNodeId !== nodeId)
}

export function isBookmarked(bookmarks: Bookmark[], nodeId: string): boolean {
  return bookmarks.some((b) => b.prayerNodeId === nodeId)
}

export function toggleBookmark(bookmarks: Bookmark[], nodeId: string, label?: string): Bookmark[] {
  return isBookmarked(bookmarks, nodeId)
    ? removeBookmark(bookmarks, nodeId)
    : addBookmark(bookmarks, nodeId, label)
}
