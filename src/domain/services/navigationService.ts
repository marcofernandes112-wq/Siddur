import type { PrayerNode } from '../models/PrayerNode'

export interface SiddurTree {
  version: number
  mvpSections: string[]
  futureSections: string[]
  nodes: PrayerNode[]
}

let _tree: SiddurTree | null = null

export async function loadSiddurTree(): Promise<SiddurTree> {
  if (_tree) return _tree
  const mod = await import('../../data/schema/siddur-tree.json')
  _tree = mod.default as SiddurTree
  return _tree
}

export function getNodeById(tree: SiddurTree, id: string): PrayerNode | undefined {
  return tree.nodes.find((n) => n.id === id)
}

export function getNodeBySlug(tree: SiddurTree, slug: string): PrayerNode | undefined {
  return tree.nodes.find((n) => n.slug === slug)
}

export function getRootSections(tree: SiddurTree): PrayerNode[] {
  return tree.mvpSections
    .map((id) => getNodeById(tree, id))
    .filter((n): n is PrayerNode => n !== undefined)
}

export function getChildren(tree: SiddurTree, nodeId: string): PrayerNode[] {
  const node = getNodeById(tree, nodeId)
  if (!node) return []
  return node.childrenIds
    .map((id) => getNodeById(tree, id))
    .filter((n): n is PrayerNode => n !== undefined)
}

export function getParent(tree: SiddurTree, nodeId: string): PrayerNode | undefined {
  const node = getNodeById(tree, nodeId)
  if (!node?.parentId) return undefined
  return getNodeById(tree, node.parentId)
}

export function getBreadcrumbs(tree: SiddurTree, nodeId: string): PrayerNode[] {
  const crumbs: PrayerNode[] = []
  let current = getNodeById(tree, nodeId)
  while (current) {
    crumbs.unshift(current)
    current = current.parentId ? getNodeById(tree, current.parentId) : undefined
  }
  return crumbs
}

export function getNextSibling(tree: SiddurTree, nodeId: string): PrayerNode | undefined {
  const node = getNodeById(tree, nodeId)
  if (!node?.parentId) return undefined
  const siblings = getChildren(tree, node.parentId)
  const idx = siblings.findIndex((s) => s.id === nodeId)
  return siblings[idx + 1]
}

export function getPrevSibling(tree: SiddurTree, nodeId: string): PrayerNode | undefined {
  const node = getNodeById(tree, nodeId)
  if (!node?.parentId) return undefined
  const siblings = getChildren(tree, node.parentId)
  const idx = siblings.findIndex((s) => s.id === nodeId)
  return idx > 0 ? siblings[idx - 1] : undefined
}

/** Flatten all leaf nodes under a section (depth-first) */
export function flattenSection(tree: SiddurTree, sectionId: string): PrayerNode[] {
  const result: PrayerNode[] = []
  function walk(id: string) {
    const node = getNodeById(tree, id)
    if (!node) return
    if (node.childrenIds.length === 0) {
      result.push(node)
    } else {
      node.childrenIds.forEach(walk)
    }
  }
  walk(sectionId)
  return result
}
