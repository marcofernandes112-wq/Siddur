import { db, type UserNote } from './db'

export async function getNote(prayerNodeId: string): Promise<UserNote | undefined> {
  return db.notes.where('prayerNodeId').equals(prayerNodeId).first()
}

export async function saveNote(prayerNodeId: string, content: string): Promise<void> {
  const existing = await getNote(prayerNodeId)
  const now = new Date().toISOString()
  if (existing?.id) {
    await db.notes.update(existing.id, { content, updatedAt: now })
  } else {
    await db.notes.add({ prayerNodeId, content, createdAt: now, updatedAt: now })
  }
}

export async function deleteNote(prayerNodeId: string): Promise<void> {
  await db.notes.where('prayerNodeId').equals(prayerNodeId).delete()
}
