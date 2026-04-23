import type { GuidedSession, GuidedFlowType, GuidedModule } from '../models/GuidedSession'
import type { SiddurTree } from './navigationService'
import type { PrayerRule } from '../models/PrayerRule'
import type { EvaluationContext } from './rulesEngine'
import { flattenSection } from './navigationService'
import { isNodeVisible } from './rulesEngine'

/** Canonical flow definitions for guided mode */
const GUIDED_FLOWS: Record<GuidedFlowType, string> = {
  shacharit: 'weekday_shacharit',
  mincha: 'weekday_mincha',
  maariv: 'weekday_maariv',
  bedtime: 'bedtime_shema',
  shabbat_maariv: 'shabbat_maariv',
  shabbat_shacharit: 'shabbat_shacharit',
  shabbat_mincha: 'shabbat_mincha',
  rosh_hashana: 'rosh_hashana',
  yom_kippur_shacharit: 'yom_kippur_shacharit',
  yom_kippur_musaf: 'yom_kippur_musaf',
  yom_kippur_mincha: 'yom_kippur_mincha',
  neilah: 'neilah',
}

export function resolveModule(flowType: GuidedFlowType): GuidedModule {
  if (flowType.startsWith('shabbat_')) return 'shabbat'
  if (
    flowType === 'rosh_hashana' ||
    flowType.startsWith('yom_kippur_') ||
    flowType === 'neilah'
  )
    return 'machzor'
  return 'semanal'
}

export function buildGuidedSession(
  flowType: GuidedFlowType,
  tree: SiddurTree,
  rules: PrayerRule[],
  ctx: EvaluationContext
): GuidedSession {
  const sectionId = GUIDED_FLOWS[flowType]
  const allNodes = flattenSection(tree, sectionId)
  const filtered = allNodes.filter((n) => isNodeVisible(rules, n.id, ctx))

  return {
    id: `guided-${flowType}-${Date.now()}`,
    flowType,
    module: resolveModule(flowType),
    context: {
      hasMinyan: ctx.hasMinyan,
      prayerMode: ctx.prayerMode,
      dayType: ctx.dayType,
    },
    orderedPrayerNodeIds: filtered.map((n) => n.id),
    currentIndex: 0,
    startedAt: new Date().toISOString(),
  }
}

export function advanceSession(session: GuidedSession): GuidedSession {
  const next = Math.min(session.currentIndex + 1, session.orderedPrayerNodeIds.length - 1)
  return { ...session, currentIndex: next }
}

export function retreatSession(session: GuidedSession): GuidedSession {
  const prev = Math.max(session.currentIndex - 1, 0)
  return { ...session, currentIndex: prev }
}

export function isSessionComplete(session: GuidedSession): boolean {
  return session.currentIndex >= session.orderedPrayerNodeIds.length - 1
}

export function getCurrentNodeId(session: GuidedSession): string {
  return session.orderedPrayerNodeIds[session.currentIndex]
}

export function getProgressPercent(session: GuidedSession): number {
  if (session.orderedPrayerNodeIds.length === 0) return 0
  return Math.round(
    ((session.currentIndex + 1) / session.orderedPrayerNodeIds.length) * 100
  )
}
