import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TOPICS, FEATURED } from '../data/topics'
import SectionHeading from '../components/SectionHeading'
import ScrollJourney from '../components/ScrollJourney'
import SmartImage from '../components/SmartImage'
import Timeline from '../components/Timeline'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const heroRef = useRef(null)

  // GSAP hero entrance + gentle background parallax (motion-safe only)
  useLayoutEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        gsap.from('.hero-content > *', { y: 36, opacity: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out', clearProps: 'transform,opacity' })
        gsap.to('.hero-bg', {
          yPercent: 14, ease: 'none',
          scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
        })
      }, heroRef)
      return () => ctx.revert()
    })
    return () => mm.revert()
  }, [])

  return (
    <main>
      <section className="hero" ref={heroRef}>
        <img className="hero-bg" src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1800&q=80" alt="" aria-hidden="true" />
        <div className="hero-overlay" aria-hidden="true" />
        <div className="hero-content">
          <p className="eyebrow hero-eyebrow">Histomotion · A visual journey through time</p>
          <h1>History wasn&rsquo;t made in a day. <span className="hero-accent">Discover how everything changed.</span></h1>
          <p className="hero-sub">From ancient civilizations to the technology in your hands, discover the events, inventions, and ideas that shaped our world.</p>
          <div className="hero-ctas">
            <a className="btn btn-primary" href="#/explore">Explore History</a>
            <a className="btn btn-ghost" href="#/timelines">Discover Timelines</a>
          </div>
          <ul className="hero-eras" aria-label="Eras covered">
            <li>Ancient world</li><li>Empires</li><li>Invention</li><li>Industry</li><li>Digital age</li>
          </ul>
        </div>
      </section>

      <ScrollJourney topics={TOPICS} />

      <section className="section featured">
        <div className="featured-grid reveal">
          <div className="featured-media">
            <SmartImage src={FEATURED.hero.src} alt={FEATURED.hero.alt} />
            <span className="status-badge complete">Featured journey · Full story</span>
          </div>
          <div className="featured-copy">
            <p className="eyebrow">Featured historical journey</p>
            <h2>{FEATURED.title}</h2>
            <p>{FEATURED.intro}</p>
            <p className="featured-meta">{FEATURED.period} · {FEATURED.readTime} · {FEATURED.milestones.length} milestones</p>
            <a className="btn btn-primary" href={`#/explore/${FEATURED.slug}`}>Explore the Journey</a>
          </div>
        </div>
      </section>

      <section className="section timeline-preview">
        <SectionHeading eyebrow="Discover through time" title="Milestones, in the order they changed things." text="A preview of the featured timeline — every date checked against published sources." />
        <Timeline milestones={FEATURED.milestones} preview />
        <div className="center-cta reveal">
          <a className="btn btn-ghost" href={`#/explore/${FEATURED.slug}`}>Open the complete timeline</a>
        </div>
      </section>

      <section className="section why">
        <SectionHeading eyebrow="Why Histomotion?" title="History, the way it actually happened — connected." />
        <div className="why-grid">
          <article className="why-item reveal"><h3>Stories, not isolated facts</h3><p>A date means little on its own. Histomotion shows what led to it, what it changed, and what it made possible next.</p></article>
          <article className="why-item reveal"><h3>Timelines that reveal evolution</h3><p>Follow a subject across decades or millennia and watch small steps compound into transformations.</p></article>
          <article className="why-item reveal"><h3>Visual exploration</h3><p>Imagery, chapters and milestones break history into a journey you move through — not a wall of text.</p></article>
          <article className="why-item reveal"><h3>Past, connected to present</h3><p>Every story ends where you live: in the devices, cities and ideas the past handed to you.</p></article>
        </div>
      </section>

      <section className="final-cta reveal">
        <h2>The past is full of stories waiting to be discovered.</h2>
        <a className="btn btn-primary btn-large" href="#/explore">Start Exploring</a>
      </section>
    </main>
  )
}
