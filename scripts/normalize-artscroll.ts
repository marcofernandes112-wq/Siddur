/**
 * normalize-artscroll.ts
 *
 * Reads the Artscroll JSON from the Siddur folder, maps keys to canonical IDs
 * using artscroll-to-canonical.json, and outputs a summary of what's populated
 * vs empty.
 *
 * Run: npx ts-node scripts/normalize-artscroll.ts
 */

import * as fs from 'fs'
import * as path from 'path'

const ARTSCROLL_PATH = path.join(__dirname, '../..', 'Siddur/Siddur Sefard - en - Artscroll.json')
const MAPPING_PATH = path.join(__dirname, '../src/data/mappings/artscroll-to-canonical.json')
const OUT_PATH = path.join(__dirname, '../src/data/mappings/artscroll-normalized.json')

interface ArtscrollJson {
  text: Record<string, Record<string, string[]> | string[]>
}

interface Mapping {
  mappings: Record<string, string>
}

function flattenArtscroll(text: ArtscrollJson['text']): Map<string, string[]> {
  const flat = new Map<string, string[]>()

  function walk(obj: unknown, prefix: string) {
    if (Array.isArray(obj)) {
      flat.set(prefix, obj as string[])
    } else if (typeof obj === 'object' && obj !== null) {
      for (const [key, val] of Object.entries(obj)) {
        walk(val, prefix ? `${prefix}/${key}` : key)
      }
    }
  }

  walk(text, '')
  return flat
}

function main() {
  if (!fs.existsSync(ARTSCROLL_PATH)) {
    console.error('Artscroll JSON not found at:', ARTSCROLL_PATH)
    process.exit(1)
  }

  const artscroll: ArtscrollJson = JSON.parse(fs.readFileSync(ARTSCROLL_PATH, 'utf-8'))
  const mapping: Mapping = JSON.parse(fs.readFileSync(MAPPING_PATH, 'utf-8'))

  const flat = flattenArtscroll(artscroll.text)

  const result: Record<string, { canonicalId: string; verses: string[]; hasContent: boolean }> = {}
  let populated = 0
  let empty = 0

  for (const [artscrollKey, canonicalId] of Object.entries(mapping.mappings)) {
    const verses = flat.get(artscrollKey) ?? []
    const hasContent = verses.some((v) => v.trim().length > 0)
    result[artscrollKey] = { canonicalId, verses, hasContent }
    if (hasContent) populated++
    else empty++
  }

  fs.writeFileSync(OUT_PATH, JSON.stringify(result, null, 2), 'utf-8')

  console.log(`\nArtscroll normalization complete:`)
  console.log(`  Mapped entries: ${Object.keys(result).length}`)
  console.log(`  Populated: ${populated}`)
  console.log(`  Empty: ${empty}`)
  console.log(`  Output: ${OUT_PATH}`)
}

main()
