import { useMemo, useState } from 'react'
import { TOPICS, FILTER_CATEGORIES } from '../data/topics'
import { filterTopics } from '../utils/search'
import SmartImage from '../components/SmartImage'

export default function Timelines() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const results = useMemo(() => filterTopics(TOPICS, query, category), [query, category])

  return (
    <main className="page">
      <div className="page-head reveal is-visible">
        <p className="eyebrow">Timelines</p>
        <h1>History, in chronological order.</h1>
        <p className="section-text">Every Histomotion story carries a timeline. Browse them here, preview the first milestones, then open the full story.</p>
      </div>
      <div className="explore-tools">
        <label className="search-box">
          <span className="sr-only">Search timelines</span>
          <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search timelines…" aria-label="Search timelines" />
        </label>
        <div className="filter-row" role="group" aria-label="Filter timelines by category">
          {FILTER_CATEGORIES.map((c) => (
            <button key={c} type="button" className={`chip${category === c ? ' is-active' : ''}`} aria-pressed={category === c} onClick={() => setCategory(c)}>{c}</button>
          ))}
        </div>
      </div>

      {results.length > 0 ? (
        <div className="timeline-cards">
          {results.map((t) => (
            <article key={t.slug} className="timeline-card reveal">
              <SmartImage src={t.cardImage.src} alt={t.cardImage.alt} />
              <div>
                <p className="topic-card-meta">{t.category} · {t.period} · {t.status === 'complete' ? 'Full timeline' : 'Sample timeline'}</p>
                <h2>{t.title}</h2>
                <ol className="mini-timeline">
                  {t.milestones.slice(0, 3).map((m) => (
                    <li key={m.date}><strong>{m.date}</strong> — {m.title}</li>
                  ))}
                </ol>
                <a className="btn btn-ghost" href={`#/explore/${t.slug}`}>Open full timeline</a>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>No timelines match that search.</h2>
          <p>Clear the search or choose a different category.</p>
          <button type="button" className="btn btn-primary" onClick={() => { setQuery(''); setCategory('All') }}>Clear search &amp; filters</button>
        </div>
      )}
    </main>
  )
}
