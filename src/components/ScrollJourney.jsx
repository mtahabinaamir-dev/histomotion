import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SmartImage from './SmartImage'

gsap.registerPlugin(ScrollTrigger)

// Scroll-slide journey: on wide screens with motion allowed, the section pins
// and vertical scrolling slides the panels left (GSAP ScrollTrigger).
// On small screens or with reduced motion it is a native swipeable snap row —
// same content, no pin, no hijack.
export default function ScrollJourney({ topics }) {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const barRef = useRef(null)

  useLayoutEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
      const track = trackRef.current
      const amount = () => Math.max(0, track.scrollWidth - window.innerWidth)
      const tween = gsap.to(track, {
        x: () => -amount(),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${amount()}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => { if (barRef.current) barRef.current.style.transform = `scaleX(${self.progress})` },
        },
      })
      return () => { tween.scrollTrigger?.kill(); tween.kill() }
    })
    const onLoad = () => ScrollTrigger.refresh()
    window.addEventListener('load', onLoad)
    return () => { window.removeEventListener('load', onLoad); mm.revert() }
  }, [])

  return (
    <section className="sj" ref={sectionRef} aria-label="Journey through historical topics">
      <div className="sj-head">
        <p className="eyebrow">Explore by topic</p>
        <h2>Every subject has a story.</h2>
        <p className="sj-hint">Keep scrolling — the journey slides sideways. <span aria-hidden="true">⟶</span></p>
      </div>
      <div className="sj-viewport">
        <div className="sj-track" ref={trackRef}>
          <div className="sj-panel sj-intro" aria-hidden="true">
            <p className="sj-intro-big">Six journeys.<br />One timeline<br />of everything.</p>
            <p className="sj-intro-small">Ancient empires to the phone in your pocket — pick a panel and step in.</p>
          </div>
          {topics.map((t, i) => (
            <a key={t.slug} className="sj-panel" href={`#/explore/${t.slug}`} aria-label={`${t.title} — ${t.status === 'complete' ? 'full story' : 'sample story'}`}>
              <span className="sj-panel-media">
                <SmartImage src={t.cardImage.src} alt={t.cardImage.alt} />
                <span className={`status-badge ${t.status}`}>{t.status === 'complete' ? 'Full story' : 'Sample'}</span>
                <span className="sj-panel-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              </span>
              <span className="sj-panel-body">
                <span className="topic-card-meta">{t.category} · {t.period}</span>
                <span className="sj-panel-title">{t.title}</span>
                <span className="sj-panel-desc">{t.description}</span>
                <span className="topic-card-cta">Explore the journey <span aria-hidden="true">→</span></span>
              </span>
            </a>
          ))}
          <div className="sj-panel sj-end">
            <p className="sj-intro-big">That&rsquo;s just<br />the first shelf.</p>
            <p className="sj-intro-small">The full library — with search and categories — lives on the Explore page.</p>
            <a className="btn btn-primary" href="#/explore">Browse all topics</a>
          </div>
        </div>
      </div>
      <div className="sj-progress" aria-hidden="true"><span ref={barRef} /></div>
    </section>
  )
}
