import { useMemo, useState } from 'react'
import { TOPICS, FILTER_CATEGORIES } from '../data/topics'
import { filterTopics } from '../utils/search'
import TopicCard from '../components/TopicCard'

export default function Explore() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const results = useMemo(() => filterTopics(TOPICS, query, category), [query, category])

  return (
    <main className="page">
      <div className="page-head reveal is-visible">
        <p className="eyebrow">Explore</p>
        <h1>Find a story in the past.</h1>
        <p className="section-text">Search historical subjects — the full story text is searched, including milestones. Full stories are marked; samples are honest previews while their full versions are written.</p>
      </div>

      <div className="explore-tools">
        <label className="search-box">
          <span className="sr-only">Search topics by title or description</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" /><path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
          <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search topics — try “games”, “Rome”, “steam”…" aria-label="Search topics" />
        </label>
        <div className="filter-row" role="group" aria-label="Filter by category">
          {FILTER_CATEGORIES.map((c) => (
            <button key={c} type="button" className={`chip${category === c ? ' is-active' : ''}`} aria-pressed={category === c} onClick={() => setCategory(c)}>{c}</button>
          ))}
        </div>
      </div>

      <p className="result-count" role="status">{results.length} {results.length === 1 ? 'topic' : 'topics'} found</p>

      {results.length > 0 ? (
        <div className="topic-grid">
          {results.map((t) => <TopicCard key={t.slug} topic={t} />)}
        </div>
      ) : (
        <div className="empty-state">
          <h2>No stories match that search — yet.</h2>
          <p>Try a broader word, or clear the filters to see every topic Histomotion covers so far.</p>
          <button type="button" className="btn btn-primary" onClick={() => { setQuery(''); setCategory('All') }}>Clear search &amp; filters</button>
        </div>
      )}
    </main>
  )
}
