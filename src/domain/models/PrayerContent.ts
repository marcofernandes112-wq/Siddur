import { z } from 'zod'

export const SourceTypeSchema = z.enum(['original', 'adapted', 'imported'])
export type SourceType = z.infer<typeof SourceTypeSchema>

export const ContentStatusSchema = z.enum(['draft', 'reviewed', 'approved'])
export type ContentStatus = z.infer<typeof ContentStatusSchema>

export const PrayerContentSchema = z.object({
  id: z.string(),
  prayerNodeId: z.string(),
  languageOrder: z.array(z.enum(['he', 'translit', 'pt'])),
  text: z.object({
    he: z.array(z.string()).optional(),
    translit: z.array(z.string()).optional(),
    pt: z.array(z.string()).optional(),
  }),
  display: z.object({
    direction: z.enum(['rtl', 'ltr', 'mixed']),
    lineBreakStyle: z.enum(['paragraph', 'verse', 'blessing']),
  }),
  metadata: z.object({
    sourceType: SourceTypeSchema,
    status: ContentStatusSchema,
    transliterationScheme: z.string().optional(),
    lastEditedAt: z.string().optional(),
    notes: z.string().optional(),
  }),
  variants: z
    .record(
      z.string(),
      z.object({
        id: z.string(),
        label: z.string(),
        text: z.object({
          he: z.array(z.string()).optional(),
          translit: z.array(z.string()).optional(),
          pt: z.array(z.string()).optional(),
        }),
      })
    )
    .optional(),
})
export type PrayerContent = z.infer<typeof PrayerContentSchema>
