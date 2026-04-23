import { z } from 'zod'

export const PrayerCategorySchema = z.enum([
  'upon_arising',
  'weekday_shacharit',
  'weekday_mincha',
  'weekday_maariv',
  'bedtime_shema',
  'shabbat',
  'shabbat_maariv',
  'shabbat_shacharit',
  'shabbat_mincha',
  'rosh_chodesh',
  'holidays',
  'rosh_hashana',
  'yom_kippur',
  'brachot',
  'other',
])
export type PrayerCategory = z.infer<typeof PrayerCategorySchema>

export const PrayerBadgeSchema = z.enum(['shared', 'only', 'extra', 'omit'])
export type PrayerBadge = z.infer<typeof PrayerBadgeSchema>

export const PrayerNodeSchema = z.object({
  id: z.string(),
  slug: z.string(),
  parentId: z.string().nullable(),
  order: z.number().int().nonnegative(),
  category: PrayerCategorySchema,
  titles: z.object({
    he: z.string(),
    en: z.string().optional(),
    pt: z.string(),
  }),
  sourceRefs: z
    .object({
      artscrollKey: z.string().optional(),
      legacyHtmlId: z.string().optional(),
      docxSection: z.string().optional(),
    })
    .optional(),
  tags: z.array(z.string()),
  childrenIds: z.array(z.string()),
  contentId: z.string().optional(),
  ruleIds: z.array(z.string()).optional(),
  badge: PrayerBadgeSchema.optional(),
  availability: z
    .object({
      modes: z.array(z.enum(['full', 'short', 'guided'])),
      requiresMinyan: z.boolean().optional(),
    })
    .optional(),
})
export type PrayerNode = z.infer<typeof PrayerNodeSchema>
