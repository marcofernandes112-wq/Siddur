import { z } from 'zod'

export const UserSettingsSchema = z.object({
  fontScale: z.number().min(0.6).max(1.8).default(1),
  theme: z.enum(['light', 'dark', 'sepia']).default('dark'),
  showHebrew: z.boolean().default(true),
  showTransliteration: z.boolean().default(true),
  showTranslationPt: z.boolean().default(true),
  showCommentary: z.boolean().default(false),
  prayerMode: z.enum(['full', 'short', 'guided']).default('full'),
  hasMinyanDefault: z.boolean().default(false),
  preferredNusach: z.enum(['sefarad_arizal']).default('sefarad_arizal'),
  lastOpenedPrayerNodeId: z.string().optional(),
  userLevel: z.enum(['beginner', 'regular', 'advanced']).default('regular'),
})
export type UserSettings = z.infer<typeof UserSettingsSchema>

export const DEFAULT_SETTINGS: UserSettings = UserSettingsSchema.parse({})
