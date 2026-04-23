import type { PrayerRule, RuleCondition } from '../models/PrayerRule'
import type { UserSettings } from '../models/UserSettings'

export interface EvaluationContext {
  hasMinyan: boolean
  prayerMode: UserSettings['prayerMode']
  userLevel: UserSettings['userLevel']
  dayType: 'weekday' | 'shabbat' | 'yom_tov' | 'fast_day'
  isRoshChodesh?: boolean
  isMotzaeiShabbat?: boolean
}

function conditionMatches(cond: RuleCondition, ctx: EvaluationContext): boolean {
  if (cond.hasMinyan !== undefined && cond.hasMinyan !== ctx.hasMinyan) return false
  if (cond.dayType && !cond.dayType.includes(ctx.dayType)) return false
  if (cond.prayerMode && !cond.prayerMode.includes(ctx.prayerMode)) return false
  if (cond.userLevel && !cond.userLevel.includes(ctx.userLevel)) return false
  if (cond.isRoshChodesh !== undefined && cond.isRoshChodesh !== ctx.isRoshChodesh) return false
  if (cond.isMotzaeiShabbat !== undefined && cond.isMotzaeiShabbat !== ctx.isMotzaeiShabbat) return false
  return true
}

export type RuleResult =
  | { action: 'show' }
  | { action: 'hide' }
  | { action: 'switch_variant'; variantId: string }
  | { action: 'inject_sequence'; sequenceId: string }
  | { action: 'annotate'; message: string }
  | null

/** Evaluate all rules for a given prayerNodeId and return the highest-priority matching result */
export function evaluateRules(
  rules: PrayerRule[],
  prayerNodeId: string,
  ctx: EvaluationContext
): RuleResult {
  const applicable = rules
    .filter((r) => r.appliesToPrayerNodeIds.includes(prayerNodeId))
    .filter((r) => conditionMatches(r.conditions, ctx))
    .sort((a, b) => b.priority - a.priority)

  if (applicable.length === 0) return null

  const top = applicable[0]
  return { action: top.action.type, ...(top.action as object) } as RuleResult
}

/** Returns true if a node should be visible given current context */
export function isNodeVisible(
  rules: PrayerRule[],
  prayerNodeId: string,
  ctx: EvaluationContext
): boolean {
  const result = evaluateRules(rules, prayerNodeId, ctx)
  if (result?.action === 'hide') return false
  return true
}

/** Load rules from a JSON array */
export function buildRulesEngine(rulesData: PrayerRule[]) {
  return {
    evaluate: (nodeId: string, ctx: EvaluationContext) =>
      evaluateRules(rulesData, nodeId, ctx),
    isVisible: (nodeId: string, ctx: EvaluationContext) =>
      isNodeVisible(rulesData, nodeId, ctx),
  }
}
