import Dexie, { type Table } from 'dexie'
import type { Bookmark } from '../domain/services/bookmarkService'
import type { UserSettings } from '../domain/models/UserSettings'
import type { GuidedSession } from '../domain/models/GuidedSession'

export interface HistoryEntry {
  id?: number
  prayerNodeId: string
  visitedAt: string
}

export interface UserNote {
  id?: number
  prayerNodeId: string
  content: string
  createdAt: string
  updatedAt: string
}

export interface SettingsRecord {
  id: number
  settings: UserSettings
}

class SidurDatabase extends Dexie {
  bookmarks!: Table<Bookmark & { id?: number }>
  history!: Table<HistoryEntry>
  notes!: Table<UserNote>
  settings!: Table<SettingsRecord>
  guidedSessions!: Table<GuidedSession & { id?: number }>

  constructor() {
    super('SidurDB')
    this.version(1).stores({
      bookmarks: '++id, prayerNodeId, savedAt',
      history: '++id, prayerNodeId, visitedAt',
      notes: '++id, prayerNodeId, createdAt',
      settings: 'id',
      guidedSessions: '++id, flowType, startedAt',
    })
  }
}

export const db = new SidurDatabase()
