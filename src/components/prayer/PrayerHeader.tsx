import type { PrayerNode } from '../../domain/models/PrayerNode'
import { BookmarkButton } from './BookmarkButton'
import { Breadcrumbs } from '../navigation/Breadcrumbs'

interface Props {
  node: PrayerNode
}

export function PrayerHeader({ node }: Props) {
  return (
    <div className="prayer-header">
      <Breadcrumbs nodeId={node.id} />
      <div className="prayer-header-main">
        <div className="prayer-header-titles">
          <h1 className="prayer-title-text">{node.titles.pt}</h1>
          {node.titles.he && (
            <p className="text-hebrew prayer-header-he">{node.titles.he}</p>
          )}
        </div>
        <BookmarkButton nodeId={node.id} label={node.titles.pt} />
      </div>
    </div>
  )
}
