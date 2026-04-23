import { useEffect, useState } from 'react'
import type { PrayerNode } from '../../domain/models/PrayerNode'
import type { PrayerContent } from '../../domain/models/PrayerContent'
import { loadPrayerContent, filterVisibleText } from '../../domain/services/contentService'
import { useSettingsStore } from '../../store/settingsStore'
import { PrayerTextBlock } from '../prayer/PrayerTextBlock'
import { BookmarkButton } from '../prayer/BookmarkButton'
import { PrayerBadge } from '../prayer/PrayerBadge'

interface Props {
  node: PrayerNode
  isLast: boolean
}

export function GuidedStep({ node, isLast }: Props) {
  const settings = useSettingsStore((s) => s.settings)
  const [content, setContent] = useState<PrayerContent | null>(null)

  useEffect(() => {
    setContent(null)
    loadPrayerContent(node.contentId ?? node.id).then(setContent)
  }, [node.id, node.contentId])

  const visibleText = content
    ? filterVisibleText(content, {
        showHebrew: settings.showHebrew,
        showTransliteration: settings.showTransliteration,
        showTranslationPt: settings.showTranslationPt,
      })
    : null

  return (
    <div className={`guided-step ${isLast ? 'guided-step--last' : ''}`}>
      <div className="guided-step-header">
        <div>
          <h2 className="prayer-title-text">{node.titles.pt}</h2>
          {node.titles.he && <p className="text-hebrew">{node.titles.he}</p>}
        </div>
        <div className="guided-step-header-actions">
          {node.badge && <PrayerBadge badge={node.badge} />}
          <BookmarkButton nodeId={node.id} label={node.titles.pt} />
        </div>
      </div>
      {content && visibleText ? (
        <PrayerTextBlock
          content={content}
          visibleText={visibleText}
          languageOrder={content.languageOrder}
        />
      ) : (
        <p className="guided-step-placeholder">Conteúdo em preparação...</p>
      )}
      {isLast && (
        <div className="guided-complete-msg">
          <p>✓ Concluído — que a tua oração suba aos céus.</p>
        </div>
      )}
    </div>
  )
}
