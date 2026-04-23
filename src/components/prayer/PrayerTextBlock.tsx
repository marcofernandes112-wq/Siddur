import type { PrayerContent } from '../../domain/models/PrayerContent'
import { HebrewBlock } from './HebrewBlock'
import { TransliterationBlock } from './TransliterationBlock'
import { TranslationBlock } from './TranslationBlock'
import { RitualCue } from './RitualCue'

interface Props {
  content: PrayerContent
  visibleText: PrayerContent['text']
  languageOrder: ('he' | 'translit' | 'pt')[]
}

const RITUAL_RE = /^[⬇⬆◈]/


export function PrayerTextBlock({ content, visibleText, languageOrder }: Props) {
  // Use raw arrays to get true line count (includes cue lines hidden by filter)
  const lineCount = Math.max(
    content.text.he?.length ?? 0,
    content.text.translit?.length ?? 0,
    content.text.pt?.length ?? 0
  )

  if (lineCount === 0) return null

  return (
    <div
      className={`prayer-text-block prayer-text-block--${content.display.lineBreakStyle}`}
      data-direction={content.display.direction}
    >
      {Array.from({ length: lineCount }).map((_, i) => {
        // Check using raw content (cue lines may be filtered out of visibleText)
        const ptRaw = content.text.pt?.[i]
        const heRaw = content.text.he?.[i]
        const cueText =
          (ptRaw && RITUAL_RE.test(ptRaw) ? ptRaw : null) ??
          (heRaw && RITUAL_RE.test(heRaw) ? heRaw : null)

        if (cueText) {
          return <RitualCue key={i} text={cueText} />
        }

        return (
          <div key={i} className="prayer-verse">
            {languageOrder.map((lang) => {
              if (lang === 'he' && visibleText.he?.[i] !== undefined) {
                return <HebrewBlock key="he" text={visibleText.he![i]} />
              }
              if (lang === 'translit' && visibleText.translit?.[i] !== undefined) {
                return <TransliterationBlock key="translit" text={visibleText.translit![i]} />
              }
              if (lang === 'pt' && visibleText.pt?.[i] !== undefined) {
                return <TranslationBlock key="pt" text={visibleText.pt![i]} />
              }
              return null
            })}
          </div>
        )
      })}
    </div>
  )
}
