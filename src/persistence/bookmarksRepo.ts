import { db } from './db'
import type { Bookmark } from '../domain/services/bookmarkService'

export async function getAllBookmarks(): Promise<Bookmark[]> {
  return db.bookmarks.orderBy('savedAt').reverse().toArray()
}

export async function saveBookmark(bookmark: Bookmark): Promise<void> {
  await db.bookmarks.put(bookmark as Bookmark & { id?: number })
}

export async function deleteBookmark(prayerNodeId: string): Promise<void> {
  await db.bookmarks.where('prayerNodeId').equals(prayerNodeId).delete()
}
