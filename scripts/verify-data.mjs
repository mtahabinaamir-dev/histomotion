// Data + routing integrity checks. Run: npm run verify
import { TOPICS, FILTER_CATEGORIES } from '../src/data/topics.js'
import { filterTopics } from '../src/utils/search.js'

let failures = 0
const fail = (msg) => { failures++; console.log('FAIL', msg) }

const slugs = new Set()
for (const t of TOPICS) {
  if (slugs.has(t.slug)) fail(`duplicate slug ${t.slug}`)
  slugs.add(t.slug)
  if (!t.milestones?.length) fail(`${t.slug}: no milestones`)
  if (!t.sources?.length) fail(`${t.slug}: no sources`)
  if (!['complete', 'sample'].includes(t.status)) fail(`${t.slug}: invalid status "${t.status}" (fails silently in 4 UI places if mistyped)`)
  for (const r of t.related || []) if (!TOPICS.find((x) => x.slug === r)) fail(`${t.slug}: related "${r}" does not exist`)
  for (const m of t.milestones) if (!m.date || !m.title || !m.description || !m.why) fail(`${t.slug}: incomplete milestone ${m.date || '?'}`)
}

// Every filter chip must have at least one topic (chips are derived, so this guards the derivation)
for (const c of FILTER_CATEGORIES.slice(1)) {
  if (!TOPICS.some((t) => t.category === c)) fail(`category chip "${c}" has zero topics`)
}

// Search behaviour, including full-text milestone search
// Full-text expectations: "games" also matches Technology (its iPhone milestone
// discusses mobile games) and Ancient Civilizations (Olympic Games); "steam"
// also matches Gaming (Valve's Steam, 2003).
const cases = [
  ['games', 'All', 3], ['Rome', 'All', 1], ['steam', 'All', 3], ['', 'Science', 1], ['zzzqqq', 'All', 0],
]
for (const [q, c, expected] of cases) {
  const got = filterTopics(TOPICS, q, c).length
  if (got !== expected) fail(`search "${q}" in ${c}: expected ${expected}, got ${got}`)
}

console.log(failures === 0 ? `VERIFY: all checks pass (${TOPICS.length} topics, ${FILTER_CATEGORIES.length - 1} categories)` : `VERIFY: ${failures} failure(s)`)
process.exit(failures ? 1 : 0)
