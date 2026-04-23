import { useState } from 'react'
import type { PrayerCommentary } from '../../domain/models/PrayerCommentary'
import { KavanaCard } from './KavanaCard'
import { MussarCard } from './MussarCard'
import { PedagogicalCard } from './PedagogicalCard'

interface Props {
  commentary: PrayerCommentary
}

type Tab = 'kavana' | 'mussar' | 'kabbalah' | 'pedagogical' | 'instructions'

export function CommentaryPanel({ commentary }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('kavana')

  const allTabs: { id: Tab; label: string; available: boolean }[] = [
    { id: 'kavana',       label: 'Kavaná',     available: !!commentary.kavana },
    { id: 'mussar',       label: 'Mussar',     available: !!commentary.mussar },
    { id: 'kabbalah',     label: 'Kabalá',     available: !!commentary.kabbalah },
    { id: 'pedagogical',  label: 'Pedagógico', available: !!commentary.pedagogical },
    { id: 'instructions', label: 'Prática',    available: !!commentary.instructions },
  ]
  const tabs = allTabs.filter((t) => t.available)

  if (tabs.length === 0) return null

  return (
    <div className="commentary-panel">
      <div className="commentary-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`commentary-tab ${activeTab === tab.id ? 'commentary-tab--active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="commentary-body">
        {activeTab === 'kavana'      && <KavanaCard     text={commentary.kavana!} />}
        {activeTab === 'mussar'      && <MussarCard      text={commentary.mussar!} />}
        {activeTab === 'kabbalah'    && (
          <div className="kabbalah-card">
            <p>{commentary.kabbalah}</p>
          </div>
        )}
        {activeTab === 'pedagogical' && <PedagogicalCard text={commentary.pedagogical!} />}
        {activeTab === 'instructions' && (
          <div className="instructions-card">
            <p>{commentary.instructions}</p>
          </div>
        )}
      </div>
    </div>
  )
}
