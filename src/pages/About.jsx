export default function About() {
  return (
    <main className="page about">
      <div className="page-head reveal is-visible">
        <p className="eyebrow">About</p>
        <h1>What is Histomotion?</h1>
      </div>
      <div className="about-body reveal is-visible">
        <p className="lead">Histomotion is a visual exploration of the past. It brings together historical stories, timelines, inventions, and turning points to show how the world became what it is today.</p>
        <h2>Why it exists</h2>
        <p>History is usually taught as isolated dates to memorise. But the past didn&rsquo;t happen as a list — it happened as chains of causes, accidents and ideas building on each other. Histomotion exists to show those chains: how a laboratory experiment became an industry, how an ancient legal code still echoes in modern courts, how a game on an oscilloscope grew into the largest entertainment medium on Earth.</p>
        <h2>How stories are told here</h2>
        <p>Every topic is a journey: the context that made change possible, the milestones in the order they happened, and an honest account of why each one mattered. Claims are checked against published sources, which are listed on every story — and where historians disagree, the story says so instead of pretending certainty.</p>
        <h2>What it is not</h2>
        <p>Histomotion is not a textbook and not a trivia feed. It is a museum you walk through at your own pace — one where every exhibit explains not just what happened, but what it changed.</p>
        <a className="btn btn-primary" href="#/explore">Start exploring</a>
      </div>
    </main>
  )
}
