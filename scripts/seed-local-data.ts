/**
 * seed-local-data.ts
 *
 * Validates that all prayer nodes in siddur-tree.json have corresponding
 * content JSON files, and reports what's missing.
 *
 * Run: npx ts-node scripts/seed-local-data.ts
 */

import * as fs from 'fs'
import * as path from 'path'

const TREE_PATH = path.join(__dirname, '../src/data/schema/siddur-tree.json')
const PRAYERS_PATH = path.join(__dirname, '../src/data/content/prayers')
const COMMENTARIES_PATH = path.join(__dirname, '../src/data/content/commentaries')

interface SiddurNode {
  id: string
  slug: string
  titles: { pt: string }
  contentId?: string
  childrenIds: string[]
}

interface SiddurTree {
  nodes: SiddurNode[]
}

function main() {
  const tree: SiddurTree = JSON.parse(fs.readFileSync(TREE_PATH, 'utf-8'))
  const leafNodes = tree.nodes.filter((n) => n.childrenIds.length === 0 && n.contentId)

  const prayerFiles = new Set(
    fs.readdirSync(PRAYERS_PATH).map((f) => f.replace('.json', ''))
  )
  const commentaryFiles = new Set(
    fs.readdirSync(COMMENTARIES_PATH).map((f) => f.replace('.json', ''))
  )

  let missingContent = 0
  let hasContent = 0
  let missingCommentary = 0
  let hasCommentary = 0

  console.log('\nContent coverage report:\n')
  for (const node of leafNodes) {
    const slug = node.slug
    const contentExists = prayerFiles.has(slug) || prayerFiles.has(node.id)
    const commentaryExists = commentaryFiles.has(slug) || commentaryFiles.has(node.id)

    if (contentExists) hasContent++
    else { missingContent++; console.log(`  ✗ Content missing: ${node.titles.pt} (${slug})`) }

    if (commentaryExists) hasCommentary++
    else missingCommentary++
  }

  console.log(`\nSummary:`)
  console.log(`  Leaf nodes: ${leafNodes.length}`)
  console.log(`  Content: ${hasContent}/${leafNodes.length} (${missingContent} missing)`)
  console.log(`  Commentary: ${hasCommentary}/${leafNodes.length} (${missingCommentary} missing)`)
}

main()
