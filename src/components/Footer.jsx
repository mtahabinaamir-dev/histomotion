export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="wordmark">
            <span className="wordmark-badge" aria-hidden="true">H</span>
            <span>Histomotion</span>
          </span>
          <p>A visual exploration of the past — the stories, timelines and turning points that show how the world became what it is today.</p>
        </div>
        <nav className="footer-links" aria-label="Footer">
          <a href="#/">Home</a>
          <a href="#/explore">Explore</a>
          <a href="#/timelines">Timelines</a>
          <a href="#/about">About</a>
        </nav>
        <p className="footer-note">Privacy Policy — Histomotion does not collect personal data on this site; there are no accounts, trackers or sign-ups.</p>
      </div>
      <p className="footer-copy">© {new Date().getFullYear()} Histomotion. Explore the past. Understand the present.</p>
    </footer>
  )
}
