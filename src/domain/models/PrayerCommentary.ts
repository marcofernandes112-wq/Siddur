import { z } from 'zod'

export const AudienceSchema = z.enum(['adultos', 'jovens', 'familia', 'grupo_estudo'])
export type Audience = z.infer<typeof AudienceSchema>

export const PrayerCommentarySchema = z.object({
  id: z.string(),
  prayerNodeId: z.string(),
  kavana: z.string().optional(),
  mussar: z.string().optional(),
  kabbalah: z.string().optional(),
  pedagogical: z.string().optional(),
  instructions: z.string().optional(),
  audience: z.array(AudienceSchema).optional(),
  metadata: z
    .object({
      status: z.enum(['draft', 'reviewed', 'approved']),
      source: z.string().optional(),
    })
    .optional(),
})
export type PrayerCommentary = z.infer<typeof PrayerCommentarySchema>
