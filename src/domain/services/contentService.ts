import type { PrayerContent } from '../models/PrayerContent'
import type { PrayerCommentary } from '../models/PrayerCommentary'

/** Dynamically imports a prayer content JSON from data/content/prayers/ */
export async function loadPrayerContent(
  prayerNodeId: string
): Promise<PrayerContent | null> {
  try {
    // Try slug form first, then id form
    const slug = prayerNodeId.replace(/_/g, '-')
    const mod = await import(`../../data/content/prayers/${slug}.json`)
    return mod.default as PrayerContent
  } catch {
    try {
      const mod = await import(`../../data/content/prayers/${prayerNodeId}.json`)
      return mod.default as PrayerContent
    } catch {
      console.warn(`[contentService] No content found for: ${prayerNodeId}`)
      return null
    }
  }
}

/**
 * Loads commentary for a prayer node.
 * Tries nodeId first (context-specific override), then falls back to contentId
 * (generic reusable commentary). This allows context-specific commentaries to
 * coexist with generic ones without changing existing files.
 *
 * Example: aleinu-mincha → tries commentaries/aleinu-mincha.json first,
 *          then falls back to commentaries/aleinu.json
 */
export async function loadPrayerCommentary(
  nodeId: string,
  contentId?: string
): Promise<PrayerCommentary | null> {
  const tryLoad = async (id: string): Promise<PrayerCommentary | null> => {
    try {
      const slug = id.replace(/_/g, '-')
      const mod = await import(`../../data/content/commentaries/${slug}.json`)
      return mod.default as PrayerCommentary
    } catch {
      return null
    }
  }

  const result = await tryLoad(nodeId)
  if (result) return result
  if (contentId && contentId !== nodeId) return tryLoad(contentId)
  return null
}

/** Returns only the text layers that should be visible based on settings */
export function filterVisibleText(
  content: PrayerContent,
  opts: {
    showHebrew: boolean
    showTransliteration: boolean
    showTranslationPt: boolean
  }
): PrayerContent['text'] {
  const filtered: PrayerContent['text'] = {}
  if (opts.showHebrew && content.text.he) filtered.he = content.text.he
  if (opts.showTransliteration && content.text.translit) filtered.translit = content.text.translit
  if (opts.showTranslationPt && content.text.pt) filtered.pt = content.text.pt
  return filtered
}

/** Resolves a variant from content.variants by ID */
export function resolveVariant(
  content: PrayerContent,
  variantId: string
): PrayerContent | null {
  if (!content.variants?.[variantId]) return null
  const variant = content.variants[variantId]
  return {
    ...content,
    text: {
      he: variant.text.he ?? content.text.he,
      translit: variant.text.translit ?? content.text.translit,
      pt: variant.text.pt ?? content.text.pt,
    },
  }
}
