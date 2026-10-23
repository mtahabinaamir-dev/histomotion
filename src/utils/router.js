import { useEffect, useState } from 'react'

// Tiny hash router: routes look like #/explore/evolution-of-gaming
// Hash routing needs no server rewrites, so the static build runs anywhere.
export function parseRoute(hash) {
  const clean = (hash || '#/').replace(/^#/, '') || '/'
  const parts = clean.split('/').filter(Boolean)
  if (parts.length === 0) return { name: 'home' }
  if (parts[0] === 'explore' && parts[1]) return { name: 'topic', slug: parts[1] }
  if (parts[0] === 'explore') return { name: 'explore' }
  if (parts[0] === 'timelines') return { name: 'timelines' }
  if (parts[0] === 'about') return { name: 'about' }
  return { name: 'notfound' }
}

export function useRoute() {
  const [route, setRoute] = useState(() => parseRoute(window.location.hash))
  useEffect(() => {
    const onChange = () => {
      setRoute(parseRoute(window.location.hash))
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  return route
}

export const go = (path) => { window.location.hash = path }
