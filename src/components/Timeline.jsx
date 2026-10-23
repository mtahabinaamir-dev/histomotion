import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Vertical timeline with a living spine: as the reader scrolls, the spine
// draws itself (amber → coral) and each milestone's dot lights up when its
// moment arrives. Vertical at every width; static under reduced motion.
export default function Timeline({ milestones, preview = false }) {
  const listRef = useRef(null)
  const items = preview ? milestones.slice(0, 4) : milestones

  useLayoutEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        gsap.fromTo('.timeline-spine', { scaleY: 0 }, {
          scaleY: 1, ease: 'none',
          scrollTrigger: { trigger: listRef.current, start: 'top 78%', end: 'bottom 55%', scrub: 0.6 },
        })
        gsap.utils.toArray('.timeline-item').forEach((item) => {
          gsap.to(item.querySelector('.timeline-dot'), {
            backgroundColor: '#FFB86B', borderColor: '#FFB86B',
            scrollTrigger: { trigger: item, start: 'top 68%', toggleActions: 'play none none reverse' },
          })
        })
      }, listRef)
      return () => ctx.revert()
    })
    return () => mm.revert()
  }, [])

  return (
    <ol className="timeline" ref={listRef}>
      <span className="timeline-spine" aria-hidden="true" />
      {items.map((m, i) => (
        <li key={`${m.date}-${m.title}`} className="timeline-item reveal" style={{ transitionDelay: `${Math.min(i * 60, 240)}ms` }}>
          <span className="timeline-dot" aria-hidden="true" />
          <p className="timeline-date">{m.date}</p>
          <h3>{m.title}</h3>
          <p>{m.description}</p>
          {m.why && <p className="timeline-why"><strong>Why it mattered:</strong> {m.why}</p>}
        </li>
      ))}
    </ol>
  )
}
