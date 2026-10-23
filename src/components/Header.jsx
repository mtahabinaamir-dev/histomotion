import { useEffect, useState } from 'react'
import { go } from '../utils/router'

const LINKS = [
  { label: 'Home', path: '/', match: 'home' },
  { label: 'Explore', path: '/explore', match: 'explore' },
  { label: 'Timelines', path: '/timelines', match: 'timelines' },
  { label: 'About', path: '/about', match: 'about' },
]

export default function Header({ route }) {
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  // Hide on scroll down, reappear on scroll up — never hover-reveal
  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 24)
      setHidden(y > 320 && y > last)
      last = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [route.name, route.slug])

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const active = route.name === 'topic' ? 'explore' : route.name

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}${hidden && !open ? ' is-hidden' : ''}`}>
      <div className="header-inner">
        <a className="wordmark" href="#/" aria-label="Histomotion — home">
          <span className="wordmark-badge" aria-hidden="true">H</span>
          <span>Histomotion</span>
        </a>
        <nav className="main-nav" aria-label="Primary">
          {LINKS.map((l) => (
            <a key={l.path} href={`#${l.path}`} className={active === l.match ? 'is-active' : ''} aria-current={active === l.match ? 'page' : undefined}>{l.label}</a>
          ))}
          <button className="nav-search" type="button" onClick={() => go('/explore')} aria-label="Open topic search">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" /><path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
          </button>
        </nav>
        <button className="menu-btn" type="button" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen((v) => !v)}>
          <span aria-hidden="true">{open ? '✕' : '☰'}</span>
        </button>
      </div>
      {open && (
        <nav id="mobile-menu" className="mobile-menu" aria-label="Mobile">
          {LINKS.map((l) => (
            <a key={l.path} href={`#${l.path}`} className={active === l.match ? 'is-active' : ''}>{l.label}</a>
          ))}
        </nav>
      )}
    </header>
  )
}
