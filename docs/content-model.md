# Content Model

## PrayerNode (structure)
- Canonical ID, slug, parent, order, category
- Titles in he/en/pt
- Source references (Artscroll key, legacy HTML id, docx section)
- childrenIds, contentId, ruleIds
- availability.modes, availability.requiresMinyan

## PrayerContent (text)
- id, prayerNodeId
- languageOrder: ['he', 'translit', 'pt']
- text.he[], text.translit[], text.pt[] — parallel arrays by line/verse
- display.direction, display.lineBreakStyle
- metadata.sourceType, status, transliterationScheme
- variants: Record<variantId, text> for short/full/minian variants

## PrayerCommentary (editorial)
- id, prayerNodeId
- kavana[], mussar[], kabbalah[], pedagogical[], practicalInstructions[]
- audience[]

## PrayerRule (logic)
- id, appliesToPrayerNodeIds[], priority
- conditions: dayType, isRoshChodesh, hasMinyan, prayerMode, userLevel
- action: show | hide | switch_variant | inject_sequence | annotate

## Transliteration Scheme (functional-pt)
- Uses Portuguese phonetics: ch=ch, tz=tz, ei=ei, ê=ê
- Kamatz/patach → a
- Tzere → ê
- Chirik → i
- Cholam → o
- Shuruk/kubbutz → u
- Shin → sh, Sin → s
- Tzadik → tz
- Chet → ch
- Ayin/aleph → silent (mark with ')
