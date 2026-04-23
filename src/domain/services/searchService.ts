import Fuse from 'fuse.js'
import type { PrayerNode } from '../models/PrayerNode'
import type { SiddurTree } from './navigationService'

export interface SearchEntry {
  nodeId: string
  slug: string
  titlePt: string
  titleHe: string
  titleEn?: string
  category: string
  tags: string[]
  /** flat text for full-text search — populated lazily */
  textPt?: string
  textTranslit?: string
}

let _index: Fuse<SearchEntry> | null = null
let _entries: SearchEntry[] = []

export function buildSearchIndex(tree: SiddurTree): Fuse<SearchEntry> {
  _entries = tree.nodes.map((node: PrayerNode) => ({
    nodeId: node.id,
    slug: node.slug,
    titlePt: node.titles.pt,
    titleHe: node.titles.he,
    titleEn: node.titles.en,
    category: node.category,
    tags: node.tags,
  }))

  _index = new Fuse(_entries, {
    keys: [
      { name: 'titlePt', weight: 0.4 },
      { name: 'titleHe', weight: 0.2 },
      { name: 'titleEn', weight: 0.2 },
      { name: 'tags', weight: 0.1 },
      { name: 'textPt', weight: 0.05 },
      { name: 'textTranslit', weight: 0.05 },
    ],
    threshold: 0.35,
    includeScore: true,
    minMatchCharLength: 2,
  })

  return _index
}

export function search(query: string): SearchEntry[] {
  if (!_index || query.trim().length < 2) return []
  const results = _index.search(query)
  return results.map((r) => r.item)
}

export function enrichEntry(nodeId: string, textPt?: string, textTranslit?: string) {
  const entry = _entries.find((e) => e.nodeId === nodeId)
  if (!entry) return
  if (textPt) entry.textPt = textPt
  if (textTranslit) entry.textTranslit = textTranslit
  if (_index) {
    _index.setCollection(_entries)
  }
}
