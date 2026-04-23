import { z } from 'zod'

export const GuidedFlowTypeSchema = z.enum([
  'shacharit',
  'mincha',
  'maariv',
  'bedtime',
  'shabbat_maariv',
  'shabbat_shacharit',
  'shabbat_mincha',
  'rosh_hashana',
  'yom_kippur_shacharit',
  'yom_kippur_musaf',
  'yom_kippur_mincha',
  'neilah',
])
export type GuidedFlowType = z.infer<typeof GuidedFlowTypeSchema>

export const GuidedModuleSchema = z.enum(['semanal', 'shabbat', 'machzor'])
export type GuidedModule = z.infer<typeof GuidedModuleSchema>

export const GuidedSessionSchema = z.object({
  id: z.string(),
  flowType: GuidedFlowTypeSchema,
  module: GuidedModuleSchema.optional(),
  context: z.object({
    hasMinyan: z.boolean(),
    prayerMode: z.enum(['full', 'short', 'guided']),
    dayType: z.enum(['weekday', 'shabbat', 'yom_tov', 'fast_day']),
  }),
  orderedPrayerNodeIds: z.array(z.string()),
  currentIndex: z.number().int().nonnegative(),
  startedAt: z.string(),
  completedAt: z.string().optional(),
})
export type GuidedSession = z.infer<typeof GuidedSessionSchema>
