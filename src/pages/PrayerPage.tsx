import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useNavigationStore } from '../store/navigationStore'
import { useSettingsStore } from '../store/settingsStore'
import { getNodeBySlug } from '../domain/services/navigationService'
import { loadPrayerContent, loadPrayerCommentary, filterVisibleText } from '../domain/services/contentService'
import { PrayerHeader } from '../components/prayer/PrayerHeader'
import { PrayerTextBlock } from '../components/prayer/PrayerTextBlock'
import { CommentaryPanel } from '../components/prayer/CommentaryPanel'
import { PrayerSequence } from '../components/navigation/PrayerSequence'
import type { PrayerContent } from '../domain/models/PrayerContent'
import type { PrayerCommentary } from '../domain/models/PrayerCommentary'

export function PrayerPage() {
  const { prayerSlug } = useParams<{ prayerSlug: string }>()
  const tree = useNavigationStore((s) => s.tree)
  const settings = useSettingsStore((s) => s.settings)
  const [content, setContent] = useState<PrayerContent | null>(null)
  const [commentary, setCommentary] = useState<PrayerCommentary | null>(null)

  const node = tree && prayerSlug ? getNodeBySlug(tree, prayerSlug) : null

  useEffect(() => {
    if (!node) return
    setContent(null)
    setCommentary(null)
    loadPrayerContent(node.contentId ?? node.id).then(setContent)
    loadPrayerCommentary(node.id, node.contentId).then(setCommentary)
  }, [node])

  if (!node) return <div className="not-found">Oração não encontrada.</div>

  const visibleText = content
    ? filterVisibleText(content, {
        showHebrew: settings.showHebrew,
        showTransliteration: settings.showTransliteration,
        showTranslationPt: settings.showTranslationPt,
      })
    : null

  return (
    <div className="prayer-page">
      <PrayerHeader node={node} />
      {content && visibleText ? (
        <PrayerTextBlock
          content={content}
          visibleText={visibleText}
          languageOrder={content.languageOrder}
        />
      ) : (
        <div className="content-placeholder">
          <p style={{ color: 'var(--color-text-dim)', fontStyle: 'italic' }}>
            Conteúdo desta oração ainda não foi importado.
          </p>
        </div>
      )}
      {settings.showCommentary && commentary && (
        <CommentaryPanel commentary={commentary} />
      )}
      <PrayerSequence nodeId={node.id} />
    </div>
  )
}
