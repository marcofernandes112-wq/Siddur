import { db, type HistoryEntry } from './db'

export async function recordVisit(prayerNodeId: string): Promise<void> {
  await db.history.add({ prayerNodeId, visitedAt: new Date().toISOString() })
}

export async function getRecentHistory(limit = 20): Promise<HistoryEntry[]> {
  return db.history.orderBy('visitedAt').reverse().limit(limit).toArray()
}

export async function clearHistory(): Promise<void> {
  await db.history.clear()
}
