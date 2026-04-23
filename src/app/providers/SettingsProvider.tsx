import { type ReactNode } from 'react'
// Settings are loaded via Zustand persist — no extra async needed.
// This provider exists as a hook point for future hydration from IndexedDB.
export function SettingsProvider({ children }: { children: ReactNode }) {
  return <>{children}</>
}
