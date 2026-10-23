import { TOPICS, getTopic } from '../data/topics'
import Timeline from '../components/Timeline'
import SmartImage from '../components/SmartImage'

export default function TopicStory({ slug }) {
  const topic = getTopic(slug)
  if (!topic) {
    return (
      <main className="page empty-state">
        <h1>That story doesn&rsquo;t exist — yet.</h1>
        <p>The topic you followed isn&rsquo;t in Histomotion&rsquo;s library. It may be planned for a future story.</p>
        <a className="btn btn-primary" href="#/explore">Browse all topics</a>
      </main>
    )
  }
  const idx = TOPICS.findIndex((t) => t.slug === slug)
  const prev = TOPICS[idx - 1]
  const next = TOPICS[idx + 1]
  const related = (topic.related || []).map(getTopic).filter(Boolean)

  return (
    <main className="story">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <a href="#/">Home</a> <span aria-hidden="true">/</span> <a href="#/explore">Explore</a> <span aria-hidden="true">/</span> <span aria-current="page">{topic.title}</span>
      </nav>

      <header className="story-head reveal is-visible">
        <p className="eyebrow">{topic.category} · {topic.period} · {topic.readTime}</p>
        <h1>{topic.title}</h1>
        <p className="story-intro">{topic.intro}</p>
        {topic.status === 'sample' && <p className="sample-note">Sample story — this is a short, fact-checked preview. The full chapter-by-chapter story is in development.</p>}
      </header>

      <figure className="story-hero reveal is-visible">
        <SmartImage src={topic.hero.src} alt={topic.hero.alt} eager />
        <figcaption>Atmospheric imagery for this topic — illustrative, not a historical photograph.</figcaption>
      </figure>

      <section className="story-section reveal" aria-labelledby="context-h">
        <h2 id="context-h">The historical context</h2>
        {topic.context.map((p) => <p key={p.slice(0, 32)}>{p}</p>)}
      </section>

      <section className="story-section" aria-labelledby="milestones-h">
        <h2 id="milestones-h">Milestones</h2>
        <Timeline milestones={topic.milestones} />
      </section>

      <section className="story-section takeaways reveal" aria-labelledby="takeaways-h">
        <h2 id="takeaways-h">What it changed</h2>
        <ul>{topic.takeaways.map((t) => <li key={t.slice(0, 32)}>{t}</li>)}</ul>
      </section>

      <section className="story-section sources reveal" aria-labelledby="sources-h">
        <h2 id="sources-h">Sources &amp; further reading</h2>
        <ul>
          {topic.sources.map((s) => (
            <li key={s.url}><a href={s.url} target="_blank" rel="noreferrer">{s.label}</a></li>
          ))}
        </ul>
      </section>

      {related.length > 0 && (
        <section className="story-section reveal" aria-labelledby="related-h">
          <h2 id="related-h">Related topics</h2>
          <div className="related-row">
            {related.map((r) => (
              <a key={r.slug} className="related-card" href={`#/explore/${r.slug}`}>
                <SmartImage src={r.cardImage.src} alt="" />
                <span>{r.title}</span>
                <small>{r.category} · {r.period}</small>
              </a>
            ))}
          </div>
        </section>
      )}

      <nav className="prev-next" aria-label="More topics">
        {prev ? <a href={`#/explore/${prev.slug}`}><small>← Previous topic</small>{prev.title}</a> : <span />}
        {next ? <a href={`#/explore/${next.slug}`} className="next"><small>Next topic →</small>{next.title}</a> : <span />}
      </nav>
    </main>
  )
}
