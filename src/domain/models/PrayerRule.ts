import { z } from 'zod'

export const RuleConditionSchema = z.object({
  dayType: z
    .array(z.enum(['weekday', 'shabbat', 'yom_tov', 'fast_day']))
    .optional(),
  isRoshChodesh: z.boolean().optional(),
  isMotzaeiShabbat: z.boolean().optional(),
  hasMinyan: z.boolean().optional(),
  prayerMode: z.array(z.enum(['full', 'short', 'guided'])).optional(),
  userLevel: z.array(z.enum(['beginner', 'regular', 'advanced'])).optional(),
})
export type RuleCondition = z.infer<typeof RuleConditionSchema>

export const RuleActionSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('show') }),
  z.object({ type: z.literal('hide') }),
  z.object({ type: z.literal('switch_variant'), variantId: z.string() }),
  z.object({ type: z.literal('inject_sequence'), sequenceId: z.string() }),
  z.object({ type: z.literal('annotate'), message: z.string() }),
])
export type RuleAction = z.infer<typeof RuleActionSchema>

export const PrayerRuleSchema = z.object({
  id: z.string(),
  appliesToPrayerNodeIds: z.array(z.string()),
  priority: z.number().int(),
  conditions: RuleConditionSchema,
  action: RuleActionSchema,
})
export type PrayerRule = z.infer<typeof PrayerRuleSchema>
