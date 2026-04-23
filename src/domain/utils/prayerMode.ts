import type { UserSettings } from '../models/UserSettings'
import type { PrayerNode } from '../models/PrayerNode'

export function isModeAvailable(
  node: PrayerNode,
  mode: 'full' | 'short' | 'guided'
): boolean {
  return node.availability?.modes.includes(mode) ?? true
}

export function getEffectiveMode(
  requested: UserSettings['prayerMode'],
  node: PrayerNode
): 'full' | 'short' | 'guided' {
  if (isModeAvailable(node, requested)) return requested
  // fallback chain: guided → full → short
  if (isModeAvailable(node, 'full')) return 'full'
  return 'short'
}
