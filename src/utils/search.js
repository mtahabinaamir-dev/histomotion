// Shared topic search/filter — one implementation for Explore and Timelines.
// Search covers the full story text (intro, context, milestones), not just
// titles, so a search like "Rome" or "steam" finds the stories it should.
export function topicHaystack(t) {
  return [
    t.title, t.description, t.category, t.intro,
    ...(t.context || []),
    ...(t.milestones || []).flatMap((m) => [m.date, m.title, m.description, m.why]),
  ].join(' ').toLowerCase()
}

export function filterTopics(topics, query, category) {
  const q = (query || '').trim().toLowerCase()
  return topics.filter((t) => (category === 'All' || t.category === category) && (!q || topicHaystack(t).includes(q)))
}
