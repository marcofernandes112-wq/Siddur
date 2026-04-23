import { useMemo } from 'react'
import type { GuidedFlowType, GuidedModule } from '../models/GuidedSession'

export interface ServiceSuggestion {
  module: GuidedModule
  flowType: GuidedFlowType
  label: string
  dayType: 'weekday' | 'shabbat' | 'yom_tov'
}

function isShabbat(now: Date): boolean {
  const day = now.getDay() // 0=Dom, 5=Sex, 6=Sáb
  const hour = now.getHours()
  if (day === 5 && hour >= 18) return true
  if (day === 6 && hour < 21) return true
  return false
}

function detectSuggestion(now: Date): ServiceSuggestion {
  const hour = now.getHours()

  if (isShabbat(now)) {
    if (hour >= 18 || hour < 3) {
      return { module: 'shabbat', flowType: 'shabbat_maariv', label: 'Shabat · Maariv', dayType: 'shabbat' }
    }
    if (hour >= 6 && hour < 12) {
      return { module: 'shabbat', flowType: 'shabbat_shacharit', label: 'Shabat · Shacharit', dayType: 'shabbat' }
    }
    return { module: 'shabbat', flowType: 'shabbat_mincha', label: 'Shabat · Minchá', dayType: 'shabbat' }
  }

  if (hour >= 6 && hour < 11) {
    return { module: 'semanal', flowType: 'shacharit', label: 'Shacharit', dayType: 'weekday' }
  }
  if (hour >= 12 && hour < 18) {
    return { module: 'semanal', flowType: 'mincha', label: 'Minchá', dayType: 'weekday' }
  }
  return { module: 'semanal', flowType: 'maariv', label: 'Maariv', dayType: 'weekday' }
}

export function useServiceDetector(): ServiceSuggestion {
  return useMemo(() => detectSuggestion(new Date()), [])
}
