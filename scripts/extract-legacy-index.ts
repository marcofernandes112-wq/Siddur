/**
 * extract-legacy-index.ts
 *
 * Parses the legacy index.html and extracts all section IDs and their
 * mapped canonical prayer node IDs.
 *
 * Run: npx ts-node scripts/extract-legacy-index.ts
 */

import * as fs from 'fs'
import * as path from 'path'

const HTML_PATH = path.join(__dirname, '../..', 'Siddur/index.html')
const MAPPING_PATH = path.join(__dirname, '../src/data/mappings/legacy-html-ids.json')

interface LegacyMapping {
  mappings: Record<string, string>
}

function main() {
  if (!fs.existsSync(HTML_PATH)) {
    console.error('index.html not found at:', HTML_PATH)
    process.exit(1)
  }

  const html = fs.readFileSync(HTML_PATH, 'utf-8')
  const mapping: LegacyMapping = JSON.parse(fs.readFileSync(MAPPING_PATH, 'utf-8'))

  // Extract all id="..." attributes
  const idRegex = /\s+id="([^"]+)"/g
  const foundIds = new Set<string>()
  let match: RegExpExecArray | null

  while ((match = idRegex.exec(html)) !== null) {
    foundIds.add(match[1])
  }

  const mapped = [...foundIds].filter((id) => mapping.mappings[id])
  const unmapped = [...foundIds].filter((id) => !mapping.mappings[id])

  console.log(`\nLegacy HTML ID extraction:`)
  console.log(`  Total IDs found: ${foundIds.size}`)
  console.log(`  Mapped to canonical: ${mapped.length}`)
  console.log(`  Unmapped: ${unmapped.length}`)
  console.log(`\n  Mapped:`)
  mapped.forEach((id) => console.log(`    ${id} → ${mapping.mappings[id]}`))
  if (unmapped.length) {
    console.log(`\n  Unmapped (add to legacy-html-ids.json if needed):`)
    unmapped.slice(0, 20).forEach((id) => console.log(`    ${id}`))
  }
}

main()
