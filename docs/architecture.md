# Sidur App — Architecture

## Core Principle

The application is built around four strictly separated concerns:

| Layer | Type | Location |
|-------|------|----------|
| `PrayerNode` | Structure / Navigation | `domain/models/PrayerNode.ts` |
| `PrayerContent` | Liturgical text (he / translit / pt) | `domain/models/PrayerContent.ts` |
| `PrayerCommentary` | Editorial layer (kavana / mussar / etc.) | `domain/models/PrayerCommentary.ts` |
| `PrayerRule` | Contextual display logic | `domain/models/PrayerRule.ts` |

## Data Sources

1. **`siddur-tree.json`** — canonical structural truth. Built from Artscroll + docx.
2. **`data/content/prayers/*.json`** — liturgical text per prayer.
3. **`data/content/commentaries/*.json`** — editorial commentary per prayer.
4. **`data/rules/*.rules.json`** — display rules (minian, mode, day type).

## State Management

- **Zustand** stores for: settings, bookmarks, navigation, guided session, search.
- **Dexie/IndexedDB** for durable persistence across sessions.
- Zustand `persist` middleware syncs to localStorage as a fast cache.

## Rules Engine

All display decisions flow through `rulesEngine.ts`:
- Input: `EvaluationContext` (hasMinyan, prayerMode, dayType, etc.)
- Output: show / hide / switch_variant / annotate
- Used by both Reader and Guided Mode — single source of truth.

## Guided Mode

`GuidedSession` drives step-by-step prayer:
1. `buildGuidedSession(flowType, tree, rules, ctx)` → filtered ordered node list.
2. `GuidedStore` holds session state.
3. `GuidedFlow` renders current step + progress + controls.

## Import Pipeline

```
Artscroll JSON ──► normalize-artscroll.ts ──► artscroll-to-canonical.json
Legacy HTML   ──► extract-legacy-index.ts ──► legacy-html-ids.json
Sidur.docx    ──► parse-docx.ts           ──► content/prayers/*.json
                                               content/commentaries/*.json
```
