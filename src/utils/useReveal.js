import { useEffect } from 'react'

// Adds .is-visible to .reveal elements as they enter the viewport.
// A MutationObserver keeps watch for elements created AFTER this effect ran —
// e.g. cards re-rendered by search/filtering. Without it, dynamically added
// .reveal elements are never observed and stay invisible forever.
export function useReveal(deps = []) {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || !('IntersectionObserver' in window)) {
      const showAll = () => document.querySelectorAll('.reveal:not(.is-visible)').forEach((el) => el.classList.add('is-visible'))
      showAll()
      const mo = new MutationObserver(showAll)
      mo.observe(document.body, { childList: true, subtree: true })
      return () => mo.disconnect()
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target) }
      })
    }, { threshold: 0.12 })
    const collect = () => {
      document.querySelectorAll('.reveal:not(.is-visible):not([data-reveal-watched])').forEach((el) => {
        el.dataset.revealWatched = '1'
        io.observe(el)
      })
    }
    collect()
    const mo = new MutationObserver(collect)
    mo.observe(document.body, { childList: true, subtree: true })
    return () => { io.disconnect(); mo.disconnect() }
  }, deps) // deps are route identifiers supplied by App — intentionally not exhaustive
}
