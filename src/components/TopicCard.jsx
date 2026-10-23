import SmartImage from './SmartImage'

export default function TopicCard({ topic }) {
  return (
    <a className="topic-card" href={`#/explore/${topic.slug}`} aria-label={`${topic.title} — ${topic.status === 'complete' ? 'full story' : 'sample story'}`}>
      <span className="topic-card-media">
        <SmartImage src={topic.cardImage.src} alt={topic.cardImage.alt} />
        <span className={`status-badge ${topic.status}`}>{topic.status === 'complete' ? 'Full story' : 'Sample'}</span>
      </span>
      <span className="topic-card-body">
        <span className="topic-card-meta">{topic.category} · {topic.period}</span>
        <span className="topic-card-title">{topic.title}</span>
        <span className="topic-card-desc">{topic.description}</span>
        <span className="topic-card-cta">Explore the journey <span aria-hidden="true">→</span></span>
      </span>
    </a>
  )
}
