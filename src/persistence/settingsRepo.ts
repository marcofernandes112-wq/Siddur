import { db } from './db'
import { DEFAULT_SETTINGS, type UserSettings } from '../domain/models/UserSettings'

const SETTINGS_ID = 1

export async function loadSettings(): Promise<UserSettings> {
  const record = await db.settings.get(SETTINGS_ID)
  return record?.settings ?? DEFAULT_SETTINGS
}

export async function saveSettings(settings: UserSettings): Promise<void> {
  await db.settings.put({ id: SETTINGS_ID, settings })
}
