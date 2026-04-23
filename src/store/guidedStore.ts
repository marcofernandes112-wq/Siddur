import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { GuidedSession } from '../domain/models/GuidedSession'
import {
  advanceSession,
  retreatSession,
  isSessionComplete,
  getCurrentNodeId,
  getProgressPercent,
} from '../domain/services/guidedModeService'

interface GuidedStore {
  session: GuidedSession | null
  isActive: boolean
  startSession: (session: GuidedSession) => void
  advance: () => void
  retreat: () => void
  endSession: () => void
  currentNodeId: () => string | null
  progressPercent: () => number
  isComplete: () => boolean
}

export const useGuidedStore = create<GuidedStore>()(
  persist(
    (set, get) => ({
      session: null,
      isActive: false,
      startSession: (session) => set({ session, isActive: true }),
      advance: () => {
        const { session } = get()
        if (!session) return
        set({ session: advanceSession(session) })
      },
      retreat: () => {
        const { session } = get()
        if (!session) return
        set({ session: retreatSession(session) })
      },
      endSession: () => {
        const { session } = get()
        if (!session) return
        set({
          isActive: false,
          session: { ...session, completedAt: new Date().toISOString() },
        })
      },
      currentNodeId: () => {
        const { session } = get()
        return session ? getCurrentNodeId(session) : null
      },
      progressPercent: () => {
        const { session } = get()
        return session ? getProgressPercent(session) : 0
      },
      isComplete: () => {
        const { session } = get()
        return session ? isSessionComplete(session) : false
      },
    }),
    { name: 'sidur-guided-session' }
  )
)
