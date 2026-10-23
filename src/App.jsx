import { useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Explore from './pages/Explore'
import TopicStory from './pages/TopicStory'
import Timelines from './pages/Timelines'
import About from './pages/About'
import { useRoute } from './utils/router'
import { useReveal } from './utils/useReveal'
import { getTopic } from './data/topics'

const TITLES = {
  home: 'Histomotion — Explore the Past. Discover the Story.',
  explore: 'Explore topics — Histomotion',
  timelines: 'Timelines — Histomotion',
  about: 'About — Histomotion',
  notfound: 'Page not found — Histomotion',
}

export default function App() {
  const route = useRoute()
  useReveal([route.name, route.slug])

  // Per-route document titles
  useEffect(() => {
    document.title = route.name === 'topic'
      ? `${getTopic(route.slug)?.title || 'Story'} — Histomotion`
      : TITLES[route.name] || TITLES.home
  }, [route])

  return (
    <>
      {/* Skip link must NOT route: it focuses the content wrapper directly.
          A plain hash href here would be parsed as a route and 404 the app. */}
      <a
        className="skip-link"
        href="#main-start"
        onClick={(e) => { e.preventDefault(); document.getElementById('main-start')?.focus() }}
      >
        Skip to content
      </a>
      <Header route={route} />
      <div id="main-start" tabIndex="-1">
        {route.name === 'home' && <Home />}
        {route.name === 'explore' && <Explore />}
        {route.name === 'topic' && <TopicStory slug={route.slug} />}
        {route.name === 'timelines' && <Timelines />}
        {route.name === 'about' && <About />}
        {route.name === 'notfound' && (
          <main className="page empty-state">
            <h1>Page not found</h1>
            <p>That corner of the past hasn&rsquo;t been mapped yet.</p>
            <a className="btn btn-primary" href="#/">Back to home</a>
          </main>
        )}
      </div>
      <Footer />
    </>
  )
}
